const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const {supabase} = require('../config/supabase');
const { queueEmailForAI } = require('../jobs/processEmailsAI');

// Generate AI response for an email
router.post('/generate-response', async (req, res) => {
  try {
    const { emailId, tone = 'professional', context = '' } = req.body;

    const { data: email, error } = await supabase
      .from('emails')
      .select('*')
      .eq('id', emailId)
      .single();

    if (error || !email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const response = await aiService.generateResponse(email, tone, context);

    res.json({ 
      response,
      tone,
      email_subject: email.subject
    });
  } catch (error) {
    console.error('Generate response error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Manually trigger AI processing for an email
router.post('/process/:emailId', async (req, res) => {
  try {
    const { emailId } = req.params;

    await queueEmailForAI(emailId);

    res.json({ 
      success: true,
      message: 'Email queued for AI processing'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Batch process all unprocessed emails
router.post('/process-batch', async (req, res) => {
  try {
    const { data: emails, error } = await supabase
      .from('emails')
      .select('id')
      .eq('ai_processed', false)
      .limit(100); // Process 100 at a time

    if (error) throw error;

    for (const email of emails) {
      await queueEmailForAI(email.id);
    }

    res.json({ 
      success: true,
      count: emails.length,
      message: `Queued ${emails.length} emails for processing`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/generate-from-blueprint', async (req, res) => {
  try {
    const { emailId, templateId, context = '' } = req.body;

    // 1. Fetch the specific Email context
    const { data: email, error: eError } = await supabase
      .from('emails')
      .select('*')
      .eq('id', emailId)
      .single();

    if (eError || !email) return res.status(404).json({ error: 'Email context not found' });

    // 2. Fetch the Neural Blueprint (Template)
    const { data: blueprint, error: bError } = await supabase
      .from('response_templates')
      .select('*')
      .eq('id', templateId)
      .single();

    if (bError || !blueprint) return res.status(404).json({ error: 'Blueprint not found' });

    // 3. Call the specialized AI Service method
    // If you haven't added this method to aiService yet, we'll need to do that!
    const response = await aiService.generateFromBlueprint(email, blueprint, context);

    res.json({ 
      response,
      blueprint_name: blueprint.name,
      email_subject: email.subject
    });
  } catch (error) {
    console.error('Blueprint synthesis error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;