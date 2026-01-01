const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const aiService = require('../services/aiService');
const supabase = require('../config/supabase');

const connection = new Redis(process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false, // Essential for Upstash
});

const aiQueue = new Queue('email-ai-processing', { connection });

/**
 * Add email to AI processing queue
 */
async function queueEmailForAI(emailId) {
  await aiQueue.add('process', { emailId }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
  console.log(`📥 Queued email ${emailId} for AI processing`);
}

/**
 * Worker: Process email with AI
 */
const worker = new Worker('email-ai-processing', async (job) => {
  const { emailId } = job.data;
  console.log(`🤖 Processing email ${emailId} with AI...`);

  try {
    // Get email
    const { data: email, error } = await supabase
      .from('emails')
      .select('*')
      .eq('id', emailId)
      .single();

    if (error || !email) {
      throw new Error('Email not found');
    }

    // Skip if already processed
    if (email.ai_processed) {
      console.log(`⏭️  Email ${emailId} already processed`);
      return;
    }

    // 1. Categorize
    const category = await aiService.categorizeEmail(
      email.subject,
      email.body_text,
      email.from_email
    );

    // 2. Calculate priority score
    const priorityScore = await aiService.calculatePriorityScore(
      email.subject,
      email.body_text,
      email.from_email,
      category
    );

    // 3. Check if needs response
    const needsResponse = await aiService.needsResponse(
      email.subject,
      email.body_text
    );

    // 4. Generate summary (if email is long)
    const summary = await aiService.summarizeEmail(email.body_text);

    // Update email
    const { error: updateError } = await supabase
      .from('emails')
      .update({
        category,
        priority_score: priorityScore,
        needs_response: needsResponse,
        ai_summary: summary,
        ai_processed: true,
        ai_processed_at: new Date().toISOString()
      })
      .eq('id', emailId);

    if (updateError) throw updateError;

    console.log(`✅ Email ${emailId} processed: ${category}, priority ${priorityScore}/10`);
  } catch (error) {
    console.error(`❌ Error processing email ${emailId}:`, error);
    throw error; // Will trigger retry
  }
}, { 
  connection,
  concurrency: 5 // Process 5 emails at once
});

worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

module.exports = { queueEmailForAI, worker };