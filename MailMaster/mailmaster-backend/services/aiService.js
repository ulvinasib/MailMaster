const OpenAI = require('openai');

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Missing OPENAI_API_KEY in .env');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIService {
  /**
   * Categorize email into one of 5 categories
   * Solves Pain Point #1: Inbox Overload
   */
  async categorizeEmail(subject, body, from) {
    const prompt = `You are an email categorization expert. Categorize this email into EXACTLY ONE category:

Categories:
- important: Urgent business matters, boss emails, client requests, time-sensitive, action required
- newsletter: Marketing emails, newsletters, updates, subscriptions, promotional content
- sales: Cold outreach, product promotions, sales pitches, advertising
- support: Customer service, help requests, technical support, account issues
- spam: Unwanted emails, suspicious content, obvious junk

Email Details:
From: ${from}
Subject: ${subject}
Body Preview: ${body?.substring(0, 500) || '(empty)'}

Respond with ONLY the category name in lowercase. No explanation, no punctuation.`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Faster + cheaper for categorization
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 10
      });

      const category = completion.choices[0].message.content.trim().toLowerCase();

      const validCategories = ['important', 'newsletter', 'sales', 'support', 'spam'];
      if (!validCategories.includes(category)) {
        console.warn(`⚠️ Invalid category "${category}", defaulting to "important"`);
        return 'important';
      }

      console.log(`✅ Categorized as: ${category}`);
      return category;
    } catch (error) {
      console.error('❌ AI categorization error:', error.message);
      return 'important'; // Safe fallback
    }
  }

  /**
   * Calculate priority score 1-10 based on urgency/importance
   * Solves Pain Point #4: Missing Important Emails
   */
  async calculatePriorityScore(subject, body, from, category) {
    const prompt = `You are an email priority expert. Score this email's urgency/importance from 1-10.

Scoring Guide:
10: Critical/Urgent - CEO, legal, security, deadlines TODAY
9: Very Important - Client issues, urgent requests, team blockers
8: Important - Manager requests, important meetings, key decisions
7: Moderate-High - Team updates, project progress, schedule changes
6: Moderate - Regular work emails, routine questions
5: Low-Moderate - FYI emails, optional meetings, general updates
4: Low - Newsletters you care about, useful resources
3: Very Low - Marketing, promotions, non-urgent subscriptions
2: Minimal - Spam-adjacent, very low priority marketing
1: Ignore - Pure spam, irrelevant content

Email:
Category: ${category}
From: ${from}
Subject: ${subject}
Body Preview: ${body?.substring(0, 400) || '(empty)'}

Respond with ONLY a number 1-10. No explanation.`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 5
      });

      const score = parseInt(completion.choices[0].message.content.trim());

      if (isNaN(score) || score < 1 || score > 10) {
        console.warn(`⚠️ Invalid score "${score}", defaulting to 5`);
        return 5;
      }

      console.log(`✅ Priority score: ${score}/10`);
      return score;
    } catch (error) {
      console.error('❌ Priority scoring error:', error.message);
      return 5; // Medium priority fallback
    }
  }

  /**
   * Generate AI response in specified tone
   * Solves Pain Point #5 & #7: Response Pressure & Slow Response Times
   */
  async generateResponse(email, tone = 'professional', context = '') {
    const toneInstructions = {
      professional: 'Be formal, courteous, and concise. Use business language.',
      casual: 'Be friendly and conversational but still appropriate for work.',
      friendly: 'Be warm, personable, and enthusiastic while remaining professional.'
    };

    const prompt = `You are an expert email assistant. Write a response to this email.

Tone: ${tone.toUpperCase()} - ${toneInstructions[tone]}

Original Email:
From: ${email.from_name || email.from_email}
Subject: ${email.subject}
Body: ${email.body_text?.substring(0, 1000) || '(no content)'}

${context ? `Additional Context: ${context}` : ''}

Generate a response that:
1. Acknowledges their message professionally
2. Addresses the main point clearly
3. Is 2-4 sentences (keep it brief!)
4. Ends with an appropriate closing

Write ONLY the email body. No subject line, no signature.`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o', // Better quality for responses
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 250
      });

      const response = completion.choices[0].message.content.trim();
      console.log(`✅ Generated ${tone} response (${response.length} chars)`);
      return response;
    } catch (error) {
      console.error('❌ Response generation error:', error.message);
      throw new Error('Failed to generate response: ' + error.message);
    }
  }

  /**
   * Analyze if email needs a response
   * Bonus: Saves time by identifying FYI emails
   */
  async needsResponse(subject, body) {
    const prompt = `Does this email require a response? Answer YES or NO.

Email:
Subject: ${subject}
Body: ${body?.substring(0, 500)}

Respond with ONLY "YES" or "NO".`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 5
      });

      const answer = completion.choices[0].message.content.trim().toUpperCase();
      return answer === 'YES';
    } catch (error) {
      console.error('❌ Response check error:', error.message);
      return true; // Assume needs response if AI fails
    }
  }

  /**
   * Generate a brief summary (for quick scanning)
   * Bonus feature for long emails
   */
  async summarizeEmail(body) {
    if (!body || body.length < 200) return null; // Don't summarize short emails

    const prompt = `Summarize this email in ONE sentence (max 20 words). Be specific about the action or information.

Email: ${body.substring(0, 1500)}

Summary:`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 50
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('❌ Summary error:', error.message);
      return null;
    }
  }


  /**
   * Generates a reply using a specific Neural Blueprint
   * This bridges the Templates module to the Inbox
   */
  async generateFromBlueprint(incomingEmail, blueprint, context = '') {

    //  Enhanced Mock Check: This catches the exact string OpenAI is complaining about
    const isInvalidKey = !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY.includes('your-key-here') ||
      process.env.OPENAI_API_KEY.includes('ActualKeyStartsHere');

    if (isInvalidKey) {
      console.log("🧪 AI Service: Entering Mock Mode to prevent 401 error");
      await new Promise(resolve => setTimeout(resolve, 2000));

      return `[NEURAL DRAFT - MOCK MODE]\n\nHello ${incomingEmail.from_name || 'there'},\n\nThis is a synthesis of the "${blueprint.name}" blueprint.\n\nContext detected: "${incomingEmail.subject}"\nOverride applied: "${context || 'None'}"\n\n[System: Connect a valid OpenAI Key to see live AI generations.]`;
    }
    const prompt = `You are an expert executive assistant. Your task is to draft a reply using a specific "Neural Blueprint" (template).

INSTRUCTIONS:
1. Use the provided BLUEPRINT as your structural guide.
2. Identify the variables in the blueprint (e.g., {{name}}, {{company}}, {{specific_detail}}).
3. Fill in those variables accurately using information from the INCOMING EMAIL.
4. If a variable's information is not available, use your best professional judgment or a placeholder.
5. Maintain the exact tone of the Blueprint.

INCOMING EMAIL:
From: ${incomingEmail.from_name}
Subject: ${incomingEmail.subject}
Body: ${incomingEmail.body_text}

NEURAL BLUEPRINT:
${blueprint.content}

${context ? `ADDITIONAL USER CONTEXT: ${context}` : ''}

Write ONLY the final filled-out email body. No subject line, no signature.`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o', // Higher intelligence for better variable mapping
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
      });


      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('❌ Blueprint generation error:', error.message);
      // If you don't have tokens yet, uncomment the line below for testing:
      // return blueprint.content.replace(/{{(.*?)}}/g, "(Neural AI Draft)");
      throw error;
    }
  }


}

module.exports = new AIService();