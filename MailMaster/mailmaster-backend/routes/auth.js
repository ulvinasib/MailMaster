const express = require('express');
const { google } = require('googleapis');
const msal = require('@azure/msal-node');
const axios = require('axios');
const supabase = require('../config/supabase');

const router = express.Router();

// ============================================
// GMAIL OAUTH
// ============================================

// Step 1: Get Gmail authorization URL
router.get('/google', (req, res) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
      state: req.query.userId || '' // Pass userId if user is already logged in
    });

    console.log('📧 Gmail auth URL generated');
    res.json({ url: authUrl });
  } catch (error) {
    console.error('Gmail auth URL error:', error);
    res.status(500).json({ error: 'Failed to generate Gmail auth URL' });
  }
});

// Step 2: Gmail OAuth callback
router.get('/google/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=gmail_no_code`);
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log('✅ Gmail tokens received');

    // Get user's email address
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: 'me' });
    const userEmail = profile.data.emailAddress;

    console.log(`📧 Gmail account: ${userEmail}`);

    // Get user info from Google
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    // Check if user exists in Supabase Auth
    let userId = state; // If state has userId, user is already logged in
    
    if (!userId) {
      // Create or get Supabase user
      const { data: existingUsers } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (existingUsers) {
        userId = existingUsers.id;
      } else {
        // Create new user in Supabase Auth
        const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
          email: userEmail,
          email_confirm: true,
          user_metadata: {
            full_name: userInfo.data.name,
            avatar_url: userInfo.data.picture
          }
        });

        if (signUpError) {
          console.error('Error creating user:', signUpError);
          throw signUpError;
        }

        userId = newUser.user.id;
        console.log(`✅ Created new user: ${userId}`);
      }
    }

    // Store email account in database
    const { data: emailAccount, error: insertError } = await supabase
      .from('email_accounts')
      .upsert({
        user_id: userId,
        provider: 'gmail',
        email: userEmail,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
        is_active: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,email',
        returning: 'minimal'
      });

    if (insertError) {
      console.error('Error storing email account:', insertError);
      throw insertError;
    }

    console.log('✅ Gmail account connected successfully');

    // Create a session token for the user
    const { data: session, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: userEmail
    });

    if (sessionError) {
      console.error('Error creating session:', sessionError);
    }

    // Redirect back to frontend
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?connected=gmail&email=${encodeURIComponent(userEmail)}`);
  } catch (error) {
    console.error('Gmail callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=gmail_failed&message=${encodeURIComponent(error.message)}`);
  }
});

// ============================================
// OUTLOOK/MICROSOFT OAUTH
// ============================================

// Step 1: Get Microsoft authorization URL
router.get('/microsoft', (req, res) => {
  try {
    const msalConfig = {
      auth: {
        clientId: process.env.MICROSOFT_CLIENT_ID,
        authority: 'https://login.microsoftonline.com/common',
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET
      }
    };

    const pca = new msal.ConfidentialClientApplication(msalConfig);

    const authCodeUrlParameters = {
      scopes: [
        'https://graph.microsoft.com/Mail.Read',
        'https://graph.microsoft.com/Mail.ReadWrite',
        'https://graph.microsoft.com/Mail.Send',
        'https://graph.microsoft.com/User.Read'
      ],
      redirectUri: process.env.MICROSOFT_REDIRECT_URI,
      state: req.query.userId || ''
    };

    pca.getAuthCodeUrl(authCodeUrlParameters).then((authUrl) => {
      console.log('📧 Microsoft auth URL generated');
      res.json({ url: authUrl });
    }).catch((error) => {
      console.error('Microsoft auth URL error:', error);
      res.status(500).json({ error: 'Failed to generate Microsoft auth URL' });
    });
  } catch (error) {
    console.error('Microsoft auth error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Step 2: Microsoft OAuth callback
router.get('/microsoft/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=outlook_no_code`);
  }

  try {
    const msalConfig = {
      auth: {
        clientId: process.env.MICROSOFT_CLIENT_ID,
        authority: 'https://login.microsoftonline.com/common',
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET
      }
    };

    const pca = new msal.ConfidentialClientApplication(msalConfig);

    const tokenRequest = {
      code: code,
      scopes: [
        'https://graph.microsoft.com/Mail.Read',
        'https://graph.microsoft.com/Mail.ReadWrite',
        'https://graph.microsoft.com/Mail.Send',
        'https://graph.microsoft.com/User.Read'
      ],
      redirectUri: process.env.MICROSOFT_REDIRECT_URI
    };

    // Exchange code for token
    const response = await pca.acquireTokenByCode(tokenRequest);
    console.log('✅ Microsoft tokens received');

    // Get user info
    const userResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${response.accessToken}`
      }
    });

    const userEmail = userResponse.data.mail || userResponse.data.userPrincipalName;
    console.log(`📧 Outlook account: ${userEmail}`);

    // Check if user exists
    let userId = state;
    
    if (!userId) {
      const { data: existingUsers } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (existingUsers) {
        userId = existingUsers.id;
      } else {
        // Create new user
        const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
          email: userEmail,
          email_confirm: true,
          user_metadata: {
            full_name: userResponse.data.displayName
          }
        });

        if (signUpError) throw signUpError;
        userId = newUser.user.id;
        console.log(`✅ Created new user: ${userId}`);
      }
    }

    // Store email account
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + response.expiresOn);

    await supabase
      .from('email_accounts')
      .upsert({
        user_id: userId,
        provider: 'outlook',
        email: userEmail,
        access_token: response.accessToken,
        refresh_token: response.refreshToken || null,
        token_expires_at: expiresAt.toISOString(),
        is_active: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,email'
      });

    console.log('✅ Outlook account connected successfully');

    res.redirect(`${process.env.FRONTEND_URL}/dashboard?connected=outlook&email=${encodeURIComponent(userEmail)}`);
  } catch (error) {
    console.error('Microsoft callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=outlook_failed&message=${encodeURIComponent(error.message)}`);
  }
});

// ============================================
// GET CONNECTED ACCOUNTS
// ============================================

router.get('/accounts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: accounts, error } = await supabase
      .from('email_accounts')
      .select('id, provider, email, is_active, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ accounts: accounts || [] });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

// ============================================
// DISCONNECT ACCOUNT
// ============================================

router.delete('/accounts/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;

    const { error } = await supabase
      .from('email_accounts')
      .delete()
      .eq('id', accountId);

    if (error) throw error;

    console.log(`✅ Account ${accountId} disconnected`);
    res.json({ success: true, message: 'Account disconnected' });
  } catch (error) {
    console.error('Error disconnecting account:', error);
    res.status(500).json({ error: 'Failed to disconnect account' });
  }
});

module.exports = router;