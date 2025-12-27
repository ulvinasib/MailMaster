import { useNavigate } from 'react-router-dom';
import { Mail, Zap, Brain, Clock, ArrowRight, Check, Star } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Categorization',
      description: 'Automatically sorts emails into Important, Newsletter, Sales, Support, and Spam using GPT-4.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'One-Click Responses',
      description: 'AI drafts perfect replies in your tone. Edit and send in seconds, not minutes.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Save 2+ Hours Daily',
      description: 'Automate repetitive email tasks and focus on what actually matters to your business.'
    }
  ];

  const benefits = [
    'Connect Gmail & Outlook in 30 seconds',
    'AI categorizes 100% of incoming emails',
    'Generate responses in 3 tones',
    '5 powerful automation rules',
    'Beautiful dashboard with analytics',
    '14-day free trial, no credit card'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">MailMaster AI</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 text-indigo-600 font-semibold hover:text-indigo-700"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Launched on Product Hunt - #3 Product of the Day</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Inbox, Finally{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Under Control
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            AI sorts, drafts & automates your email in seconds. Save 2+ hours every single day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => navigate('/login')}
              className="group bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition">
              Watch Demo (90s)
            </button>
          </div>

          <p className="text-sm text-gray-500">
            ✨ No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
            <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-lg">📸 Product Screenshot/Demo Video Here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Master Email
            </h2>
            <p className="text-xl text-gray-600">
              Powered by GPT-4. Built for productivity ninjas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 hover:border-indigo-300 transition hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Benefits Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
              What You Get with MailMaster AI
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
              >
                Get Started Free →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 mb-8 text-lg">Trusted by professionals at:</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Google</div>
            <div className="text-2xl font-bold text-gray-400">Amazon</div>
            <div className="text-2xl font-bold text-gray-400">Microsoft</div>
            <div className="text-2xl font-bold text-gray-400">Shopify</div>
            <div className="text-2xl font-bold text-gray-400">Stripe</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Control of Your Inbox?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join hundreds of professionals saving 10+ hours per week.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-indigo-600 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition shadow-2xl"
          >
            Start Your Free Trial
          </button>
          <p className="mt-6 text-sm opacity-75">
            14 days free • No credit card • Cancel anytime
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-6 h-6 text-indigo-400" />
            <span className="text-xl font-bold text-white">MailMaster AI</span>
          </div>
          <p className="mb-4">© 2026 MailMaster AI. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}