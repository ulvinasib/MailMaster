const { google } = require('googleapis');
const {supabase} = require("../config/supabase");

class GmailService {
  /**
   * Sends a reply via Gmail
   */
  async sendMessage(accountId, { to, subject, body }) {
    // 1. Fetch the account's tokens from Supabase
    const { data: account, error } = await supabase
      .from("email_accounts")
      .select("*")
      .eq("id", accountId)
      .single();

    if (!account) throw new Error("Email account not found");

    // 2. Setup OAuth2 Client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // 3. Create the Raw Email (Gmail requires base64url encoded RFC 2822)
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      `To: ${to}`,
      `Subject: ${utf8Subject}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      body,
    ];
    const message = messageParts.join('\n');

    // The message needs to be base64url encoded
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // 4. Send it!
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log(`✅ Email transmitted via Gmail: ${res.data.id}`);
    return res.data;
  }
}

module.exports = new GmailService();