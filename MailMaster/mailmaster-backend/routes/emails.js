const express = require('express');
const router = express.Router();
const emailSync = require('../services/emailSync');
// Add the curly braces!
const { supabase } = require('../config/supabase.js');
const gmailService = require('../services/gmailService');





// Sync emails for an account
router.post('/sync/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log(`📥 Sync request for account: ${accountId}`);

    // Get account
    const { data: account } = await supabase
      .from('email_accounts')
      .select('provider')
      .eq('id', accountId)
      .single();

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    let count = 0;
    if (account.provider === 'gmail') {
      count = await emailSync.syncGmail(accountId);
    } else if (account.provider === 'outlook') {
      count = await emailSync.syncOutlook(accountId);
    }

    res.json({ 
      success: true, 
      count,
      message: `Synced ${count} emails`
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ 
      error: 'Sync failed',
      message: error.message 
    });
  }
});

// Get emails list with filters
router.get('/list', async (req, res) => {
  try {
    const { accountId, category, search, page = 1, limit = 20, unread } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('emails')
      .select('*', { count: 'exact' })
      .order('received_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    if (accountId) {
      query = query.eq('account_id', accountId);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (unread === 'true') {
      query = query.eq('is_read', false);
    }

    if (search) {
      query = query.or(`subject.ilike.%${search}%,from_email.ilike.%${search}%,from_name.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({ 
      emails: data || [],
      total: count || 0,
      page: parseInt(page),
      pages: Math.ceil((count || 0) / parseInt(limit))
    });
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

// Get single email
router.get('/:emailId', async (req, res) => {
  try {
    const { emailId } = req.params;

    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .eq('id', emailId)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Email not found' });

    res.json({ email: data });
  } catch (error) {
    console.error('Get email error:', error);
    res.status(500).json({ error: 'Failed to fetch email' });
  }
});

// Mark as read/unread
router.patch('/:emailId/read', async (req, res) => {
  try {
    const { emailId } = req.params;
    const { isRead } = req.body;

    const { data, error } = await supabase
      .from('emails')
      .update({ is_read: isRead })
      .eq('id', emailId)
      .select()
      .single();

    if (error) throw error;

    res.json({ email: data });
  } catch (error) {
    console.error('Update read status error:', error);
    res.status(500).json({ error: 'Failed to update email' });
  }
});

// Star/unstar email
router.patch('/:emailId/star', async (req, res) => {
  try {
    const { emailId } = req.params;
    const { isStarred } = req.body;

    const { data, error } = await supabase
      .from('emails')
      .update({ is_starred: isStarred })
      .eq('id', emailId)
      .select()
      .single();

    if (error) throw error;

    res.json({ email: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update email' });
  }
});

// Archive email
router.patch('/:emailId/archive', async (req, res) => {
  try {
    const { emailId } = req.params;
    const { isArchived } = req.body;

    const { data, error } = await supabase
      .from('emails')
      .update({ is_archived: isArchived })
      .eq('id', emailId)
      .select()
      .single();

    if (error) throw error;

    res.json({ email: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to archive email' });
  }
});

// Delete email
router.delete('/:emailId', async (req, res) => {
  try {
    const { emailId } = req.params;

    const { error } = await supabase
      .from('emails')
      .delete()
      .eq('id', emailId);

    if (error) throw error;

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete email' });
  }
});

// POST /emails/send
router.post('/send', async (req, res) => {
  try {
    const { to, subject, body, accountId } = req.body;

    if (!to || !body || !accountId) {
      return res.status(400).json({ error: "Missing required fields: to, body, or accountId" });
    }

    // Trigger the transmission
    const result = await gmailService.sendMessage(accountId, { to, subject, body });

    res.json({ 
      success: true, 
      message: 'Transmission complete', 
      messageId: result.id 
    });
  } catch (error) {
    console.error('Email Transmission Error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
});



module.exports = router;