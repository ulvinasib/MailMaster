//fetch emails from gmail and outlook
const { google } = require('googleapis');
const axios = require('axios');
const supabase = require("../config/supabase")
const { parseHeaders, extractBodyFromParts, stripHtml } = require("../utils/emailParser")
const { queueEmailForAI } = require('../jobs/processEmailsAI');
const { tryCatch } = require('bullmq');


class EmailSyncService {
    async syncGmail(accountId) {
        console.log("Syncing Gmail for account:", accountId)

        const { data: account, error } = await supabase
            .from("email_accounts")
            .select("*")
            .eq("id", accountId)
            .single()
        if (!account) {
            console.error("Account not found:", error)
            return
        }


        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        )

        oauth2Client.setCredentials({
            access_token: account.access_token,
            refresh_token: account.refresh_token
        })

        const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

        //Fetching last 50 emails
        const response = await gmail.users.messages.list({
            userId: "me",
            maxResults: 50,
            q: 'in:inbox'
        })


        const messages = response.data.messages || '[]'
        console.log(`Fetched ${messages.length} messages from Gmail for account ${accountId}`)

        for (const message of messages) {
            const details = await gmail.users.messages.get({
                userId: "me",
                id: message.id,
                format: "full"
            })

            await this.saveEmail(accountId, details.data)
        }

        return messages.length
    }

    async saveEmail(accountId, messageData) {
        const headers = messageData.payload.headers || [];

        // Helper to get header value by name
        const getHeader = (name) => headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || '';

        const subject = getHeader('Subject') || '(No Subject)';
        const from = getHeader('From') || '';
        const to = getHeader('To') || '';
        const date = getHeader('Date');

        // Parse from email and name
        const fromMatch = from.match(/<(.+?)>/) || from.match(/([^\s]+@[^\s]+)/);
        const fromEmail = fromMatch ? fromMatch[1] : from;
        const fromName = from.replace(/<.+?>/, '').replace(fromEmail, '').trim().replace(/^["']|["']$/g, '');

        // Helper to decode Gmail's base64url
        const decodeBase64 = (data) => Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');

        // Recursive function to extract text and html from parts
        function extractBody(parts) {
            let text = '';
            let html = '';

            for (const part of parts) {
                if (part.mimeType === 'text/plain' && part.body?.data) {
                    text += decodeBase64(part.body.data);
                } else if (part.mimeType === 'text/html' && part.body?.data) {
                    html += decodeBase64(part.body.data);
                } else if (part.parts) {
                    const inner = extractBody(part.parts);
                    text += inner.text;
                    html += inner.html;
                }
            }

            return { text, html };
        }

        let bodyText = '';
        let bodyHtml = '';

        if (messageData.payload.body?.data) {
            bodyText = decodeBase64(messageData.payload.body.data);
        } else if (messageData.payload.parts) {
            const body = extractBody(messageData.payload.parts);
            bodyText = body.text;
            bodyHtml = body.html;
        }

        // If only HTML exists, strip tags to create text
        if (!bodyText && bodyHtml) {
            bodyText = bodyHtml.replace(/<[^>]+>/g, '').trim();
        }

        // Check if email already exists
        const { data: existing, error: existingError } = await supabase
            .from('emails')
            .select('id')
            .eq('message_id', messageData.id)
            .single();

        if (existing) {
            console.log("Email already exists:", messageData.id);
            return;
        }

        // Insert email into database
        const { data: newEmail, error: InsertError } = await supabase
            .from('emails')
            .insert({
                account_id: accountId,
                message_id: messageData.id,
                thread_id: messageData.threadId,
                subject,
                from_email: fromEmail,
                from_name: fromName,
                to_email: to.split(',').map(t => t.trim()), // store as array
                body_text: bodyText?.substring(0, 5000),    // limit to 5000 chars
                body_html: bodyHtml?.substring(0, 10000),  // limit to 10000 chars
                is_read: !messageData.labelIds?.includes('UNREAD'),
                received_at: date ? new Date(date).toISOString() : new Date(parseInt(messageData.internalDate)).toISOString(),
                ai_processed: false
            })
            .select("id")
            .single();

        if (InsertError) {
            console.error("Error saving email:", error);
            return;
        } else {
            console.log("Saved email:", messageData.id);
        }

        //Queing for ai Processing only after DB insert is confirmed
        try {
            await queueEmailForAI(newEmail.id);
            console.log("Queued email for AI processing:", newEmail.id);
        }catch(err){
            console.error("Error queuing email for AI processing:", err);
        }
    }


    async syncOutlook(accountId) {
        console.log(`🔄 Syncing Outlook for account: ${accountId}`);

        const { data: account } = await supabase
            .from('email_accounts')
            .select('*')
            .eq('id', accountId)
            .single();

        if (!account) throw new Error('Account not found');

        const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
            headers: {
                'Authorization': `Bearer ${account.access_token}`
            },
            params: {
                '$top': 50,
                '$orderby': 'receivedDateTime DESC',
                '$select': 'id,subject,from,toRecipients,receivedDateTime,bodyPreview,body,isRead'
            }
        });

        const messages = response.data.value || [];
        console.log(`📧 Found ${messages.length} Outlook emails`);

        for (const message of messages) {
            await this.saveOutlookEmail(accountId, message);
        }

        return messages.length;
    }

    async saveOutlookEmail(accountId, message) {
        // Check if exists
        const { data: existing } = await supabase
            .from('emails')
            .select('id')
            .eq('message_id', message.id)
            .single();

        await queueEmailForAI(newEmail.id);

        if (existing) return;

        const { error } = await supabase
            .from('emails')
            .insert({
                account_id: accountId,
                message_id: message.id,
                subject: message.subject || '(No Subject)',
                from_email: message.from?.emailAddress?.address || '',
                from_name: message.from?.emailAddress?.name || '',
                to_email: message.toRecipients?.map(r => r.emailAddress.address) || [],
                body_text: message.bodyPreview?.substring(0, 5000) || '',
                body_html: message.body?.content?.substring(0, 10000) || '',
                is_read: message.isRead || false,
                received_at: new Date(message.receivedDateTime).toISOString()
            });

        if (error) {
            console.error('❌ Error saving Outlook email:', error);
        } else {
            console.log(`✅ Saved email: ${message.subject}`);
        }
    }
}


module.exports = new EmailSyncService();  