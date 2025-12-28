const { createClient } = require('@supabase/supabase-js');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials!');
  console.log('Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  }
);

supabase.from('email_accounts').select('count').limit(1)
  .then(() => console.log('✅ Supabase connected (service role)'))
  .catch(err => console.error('❌ Supabase connection failed:', err.message));

module.exports = supabase;