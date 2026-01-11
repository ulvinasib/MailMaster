const AIService = require('../services/aiService');
const supabase = require('../config/supabase'); // Or your db config
// Assuming you have a way to fetch the email context (Redis/Upstash)
const EmailService = require('../services/EmailService'); 

class AIController {
  async generateFromBlueprint(req, res) {
    try {
      const { emailId, templateId, context } = req.body;
      const userId = req.user.id; // From your auth middleware

      // 1. Fetch the Neural Blueprint from Supabase
      const { data: blueprint, error: tError } = await supabase
        .from('response_templates')
        .select('*')
        .eq('id', templateId)
        .eq('user_id', userId)
        .single();

      if (tError || !blueprint) {
        return res.status(404).json({ error: 'Neural Blueprint not found' });
      }

      // 2. Fetch the Email Context (The incoming message)
      // This is where you pull from your Upstash/Redis sync
      const email = await EmailService.getEmailById(emailId);
      if (!email) {
        return res.status(404).json({ error: 'Original email not found' });
      }

      // 3. Check for OpenAI Key (Mocking logic if missing)
      if (!process.env.OPENAI_API_KEY) {
        console.log("🧪 Mock Mode: No API Key detected");
        await new Promise(r => setTimeout(r, 1500));
        return res.json({ 
          response: `[DEMO MODE]\n\nHello ${email.from_name || 'there'},\n\nThis is a mock response using your "${blueprint.name}" blueprint. Once you add your OpenAI key, the Synthesis Engine will automatically fill in variables and address your notes: "${context || 'None'}".`
        });
      }

      // 4. Execute Synthesis
      const draft = await AIService.generateFromBlueprint(email, blueprint, context);

      res.json({ response: draft });

    } catch (error) {
      console.error('AI Controller Error:', error);
      res.status(500).json({ error: 'Synthesis failed at the neural level' });
    }
  }
}

module.exports = new AIController();