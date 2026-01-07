// // import { useNavigate } from 'react-router-dom';
// // import { Mail, Zap, Brain, Clock, ArrowRight, Check, Star } from 'lucide-react';

// // export default function Landing() {
// //   const navigate = useNavigate();

// //   const features = [
// //     {
// //       icon: <Brain className="w-8 h-8" />,
// //       title: 'AI Categorization',
// //       description: 'Automatically sorts emails into Important, Newsletter, Sales, Support, and Spam using GPT-4.'
// //     },
// //     {
// //       icon: <Zap className="w-8 h-8" />,
// //       title: 'One-Click Responses',
// //       description: 'AI drafts perfect replies in your tone. Edit and send in seconds, not minutes.'
// //     },
// //     {
// //       icon: <Clock className="w-8 h-8" />,
// //       title: 'Save 2+ Hours Daily',
// //       description: 'Automate repetitive email tasks and focus on what actually matters to your business.'
// //     }
// //   ];

// //   const benefits = [
// //     'Connect Gmail & Outlook in 30 seconds',
// //     'AI categorizes 100% of incoming emails',
// //     'Generate responses in 3 tones',
// //     '5 powerful automation rules',
// //     'Beautiful dashboard with analytics',
// //     '14-day free trial, no credit card'
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
// //       {/* Navigation */}
// //       <nav className="container mx-auto px-6 py-6">
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             <Mail className="w-8 h-8 text-indigo-600" />
// //             <span className="text-2xl font-bold text-gray-900">MailMaster AI</span>
// //           </div>
// //           <button
// //             onClick={() => navigate('/login')}
// //             className="px-6 py-2 text-indigo-600 font-semibold hover:text-indigo-700"
// //           >
// //             Sign In
// //           </button>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <div className="container mx-auto px-6 py-20">
// //         <div className="text-center max-w-4xl mx-auto">
// //           <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
// //             <Star className="w-4 h-4 fill-current" />
// //             <span>Launched on Product Hunt - #3 Product of the Day</span>
// //           </div>

// //           <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
// //             Your Inbox, Finally{' '}
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
// //               Under Control
// //             </span>
// //           </h1>

// //           <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
// //             AI sorts, drafts & automates your email in seconds. Save 2+ hours every single day.
// //           </p>

// //           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
// //             <button
// //               onClick={() => navigate('/login')}
// //               className="group bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl"
// //             >
// //               Start Free Trial
// //               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
// //             </button>
// //             <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition">
// //               Watch Demo (90s)
// //             </button>
// //           </div>

// //           <p className="text-sm text-gray-500">
// //             ✨ No credit card required • 14-day free trial • Cancel anytime
// //           </p>
// //         </div>

// //         {/* Hero Image Placeholder */}
// //         <div className="mt-16 max-w-5xl mx-auto">
// //           <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
// //             <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
// //               <p className="text-gray-500 text-lg">📸 Product Screenshot/Demo Video Here</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Features Section */}
// //       <div className="bg-white py-20">
// //         <div className="container mx-auto px-6">
// //           <div className="text-center mb-16">
// //             <h2 className="text-4xl font-bold text-gray-900 mb-4">
// //               Everything You Need to Master Email
// //             </h2>
// //             <p className="text-xl text-gray-600">
// //               Powered by GPT-4. Built for productivity ninjas.
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
// //             {features.map((feature, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 hover:border-indigo-300 transition hover:shadow-lg"
// //               >
// //                 <div className="w-16 h-16 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6">
// //                   {feature.icon}
// //                 </div>
// //                 <h3 className="text-2xl font-bold mb-3 text-gray-900">
// //                   {feature.title}
// //                 </h3>
// //                 <p className="text-gray-600 leading-relaxed">
// //                   {feature.description}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //       {/* Benefits Section */}
// //       <div className="py-20">
// //         <div className="container mx-auto px-6">
// //           <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-12">
// //             <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
// //               What You Get with MailMaster AI
// //             </h2>

// //             <div className="grid md:grid-cols-2 gap-6">
// //               {benefits.map((benefit, index) => (
// //                 <div key={index} className="flex items-start gap-3">
// //                   <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
// //                     <Check className="w-4 h-4 text-green-600" />
// //                   </div>
// //                   <span className="text-gray-700 text-lg">{benefit}</span>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="mt-10 text-center">
// //               <button
// //                 onClick={() => navigate('/login')}
// //                 className="bg-indigo-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
// //               >
// //                 Get Started Free →
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Social Proof */}
// //       <div className="bg-gray-50 py-16">
// //         <div className="container mx-auto px-6 text-center">
// //           <p className="text-gray-600 mb-8 text-lg">Trusted by professionals at:</p>
// //           <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
// //             <div className="text-2xl font-bold text-gray-400">Google</div>
// //             <div className="text-2xl font-bold text-gray-400">Amazon</div>
// //             <div className="text-2xl font-bold text-gray-400">Microsoft</div>
// //             <div className="text-2xl font-bold text-gray-400">Shopify</div>
// //             <div className="text-2xl font-bold text-gray-400">Stripe</div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Final CTA */}
// //       <div className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
// //         <div className="container mx-auto px-6 text-center text-white">
// //           <h2 className="text-4xl md:text-5xl font-bold mb-6">
// //             Ready to Take Control of Your Inbox?
// //           </h2>
// //           <p className="text-xl mb-10 opacity-90">
// //             Join hundreds of professionals saving 10+ hours per week.
// //           </p>
// //           <button
// //             onClick={() => navigate('/login')}
// //             className="bg-white text-indigo-600 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition shadow-2xl"
// //           >
// //             Start Your Free Trial
// //           </button>
// //           <p className="mt-6 text-sm opacity-75">
// //             14 days free • No credit card • Cancel anytime
// //           </p>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <footer className="bg-gray-900 text-gray-400 py-12">
// //         <div className="container mx-auto px-6 text-center">
// //           <div className="flex items-center justify-center gap-2 mb-4">
// //             <Mail className="w-6 h-6 text-indigo-400" />
// //             <span className="text-xl font-bold text-white">MailMaster AI</span>
// //           </div>
// //           <p className="mb-4">© 2026 MailMaster AI. All rights reserved.</p>
// //           <div className="flex justify-center gap-6 text-sm">
// //             <a href="#" className="hover:text-white transition">Privacy Policy</a>
// //             <a href="#" className="hover:text-white transition">Terms of Service</a>
// //             <a href="#" className="hover:text-white transition">Contact</a>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }


// import { useNavigate } from 'react-router-dom';
// import { Mail, Zap, Brain, Clock, ArrowRight, Check, Star, Sparkles, TrendingUp, Shield, Globe, MessageSquare, BarChart3, Rocket } from 'lucide-react';
// import { useState, useEffect } from 'react';

// export default function Landing() {
//   const navigate = useNavigate();
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);

//   // Parallax effect
//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   const features = [
//     {
//       icon: <Brain className="w-10 h-10" />,
//       title: 'AI-Powered Categorization',
//       description: 'GPT-4 instantly sorts every email into smart categories. No more manual sorting, ever.',
//       gradient: 'from-purple-500 to-pink-500',
//       delay: '0ms'
//     },
//     {
//       icon: <Zap className="w-10 h-10" />,
//       title: 'Lightning-Fast Responses',
//       description: 'Generate perfect replies in 3 seconds. Choose your tone, edit if needed, send. Done.',
//       gradient: 'from-yellow-500 to-orange-500',
//       delay: '100ms'
//     },
//     {
//       icon: <Clock className="w-10 h-10" />,
//       title: 'Reclaim Your Time',
//       description: 'Save 2+ hours daily with smart automation. Let AI handle the boring stuff.',
//       gradient: 'from-green-500 to-teal-500',
//       delay: '200ms'
//     },
//     {
//       icon: <Shield className="w-10 h-10" />,
//       title: 'Bank-Level Security',
//       description: 'Enterprise-grade encryption. Your emails are private, always. Zero data selling.',
//       gradient: 'from-blue-500 to-indigo-500',
//       delay: '300ms'
//     },
//     {
//       icon: <Globe className="w-10 h-10" />,
//       title: 'Works Everywhere',
//       description: 'Gmail, Outlook, any inbox. One dashboard to rule them all. Multi-account ready.',
//       gradient: 'from-red-500 to-pink-500',
//       delay: '400ms'
//     },
//     {
//       icon: <BarChart3 className="w-10 h-10" />,
//       title: 'Smart Analytics',
//       description: 'See where your time goes. Optimize your email habits. Get better every week.',
//       gradient: 'from-cyan-500 to-blue-500',
//       delay: '500ms'
//     }
//   ];

//   const stats = [
//     { number: '10,000+', label: 'Emails Processed' },
//     { number: '2.5hrs', label: 'Saved Daily' },
//     { number: '99.9%', label: 'Accuracy Rate' },
//     { number: '500+', label: 'Happy Users' }
//   ];

//   const testimonials = [
//     {
//       text: "This literally changed how I work. I used to spend 3 hours a day on email. Now it's 30 minutes.",
//       author: "Sarah Chen",
//       role: "Product Manager @ Stripe",
//       image: "SC"
//     },
//     {
//       text: "The AI responses are scary good. I barely edit them anymore. It's like having an assistant.",
//       author: "Marcus Johnson",
//       role: "Founder @ TechStartup",
//       image: "MJ"
//     },
//     {
//       text: "Best $19/month I've ever spent. ROI is insane. Paid for itself in the first week.",
//       author: "Lisa Park",
//       role: "Consultant",
//       image: "LP"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div 
//           className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
//           style={{
//             left: `${mousePosition.x / 20}px`,
//             top: `${mousePosition.y / 20}px`,
//             transition: 'all 0.3s ease-out'
//           }}
//         />
//         <div 
//           className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl right-0 bottom-0"
//           style={{
//             right: `${mousePosition.x / 30}px`,
//             bottom: `${mousePosition.y / 30}px`,
//             transition: 'all 0.3s ease-out'
//           }}
//         />
//         <div className="absolute w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//       </div>

//       {/* Navigation */}
//       <nav className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-black/50">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 group cursor-pointer">
//               <div className="relative">
//                 <Mail className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition" />
//                 <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition" />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                 MailMaster AI
//               </span>
//             </div>
//             <button
//               onClick={() => navigate('/login')}
//               className="px-6 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition font-semibold"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
//         <div className="text-center max-w-5xl mx-auto">
//           {/* Badge */}
//           <div 
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-5 py-2 rounded-full mb-8 animate-pulse"
//             style={{ animationDuration: '3s' }}
//           >
//             <Sparkles className="w-4 h-4 text-yellow-400" />
//             <span className="text-sm font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
//               #1 Product of the Week on Product Hunt
//             </span>
//           </div>

//           {/* Main Headline */}
//           <h1 className="text-7xl md:text-8xl font-black mb-8 leading-[1.1]">
//             <span className="block">Email, But</span>
//             <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
//               Actually Smart
//             </span>
//           </h1>

//           <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Stop drowning in your inbox. AI sorts, drafts, and automates everything. 
//             <span className="text-white font-semibold"> Reclaim 2+ hours every single day.</span>
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
//             <button
//               onClick={() => navigate('/login')}
//               className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-xl font-bold hover:scale-105 transition-transform shadow-2xl shadow-purple-500/50"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition" />
//               <div className="relative flex items-center gap-3">
//                 Start Free Trial
//                 <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
//               </div>
//             </button>
//             <button 
//               className="px-10 py-5 rounded-2xl border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition text-xl font-bold"
//             >
//               Watch Demo
//             </button>
//           </div>

//           <p className="text-gray-500 flex items-center justify-center gap-2 text-sm">
//             <Check className="w-4 h-4 text-green-400" />
//             No credit card • 14-day trial • Cancel anytime
//           </p>
//         </div>

//         {/* Hero Visual */}
//         <div 
//           className="mt-20 max-w-6xl mx-auto"
//           style={{
//             transform: `translateY(${scrollY * 0.1}px)`,
//             transition: 'transform 0.1s linear'
//           }}
//         >
//           <div className="relative group">
//             <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition" />
//             <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-8 shadow-2xl">
//               <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                 <div className="text-center">
//                   <Rocket className="w-20 h-20 text-purple-400 mx-auto mb-4 animate-bounce" />
//                   <p className="text-2xl font-bold text-white/80">Your Inbox, Supercharged</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Bar */}
//       <section className="relative z-10 border-y border-white/10 bg-white/5 backdrop-blur-xl py-16">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Grid - CINEMATIC VERSION */}
//       <section className="relative z-10 py-32 container mx-auto px-6 overflow-hidden">
//         <div className="text-center mb-32">
//           <div className="inline-block mb-6">
//             <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">
//               Superpowers Included
//             </span>
//           </div>
//           <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
//             Everything You Need.
//             <br />
//             <span className="relative inline-block">
//               <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
//                 Nothing You Don't.
//               </span>
//               <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full" />
//             </span>
//           </h2>
//           <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
//             Six game-changing features. One beautiful interface. Zero learning curve.
//           </p>
//         </div>

//         {/* 3D Card Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto perspective-1000">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group relative h-full"
//               style={{
//                 animation: `fadeInUp 0.6s ease-out ${parseInt(feature.delay)}ms both`,
//               }}
//             >
//               {/* Glow effect */}
//               <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700 animate-pulse`} />

//               {/* Card */}
//               <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
//                 {/* Icon Container */}
//                 <div className="relative mb-8">
//                   <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-500`} />
//                   <div className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
//                     <div className="text-white group-hover:scale-110 transition-transform duration-300">
//                       {feature.icon}
//                     </div>
//                   </div>

//                   {/* Floating particles */}
//                   <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
//                   <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-150" />
//                 </div>

//                 {/* Content */}
//                 <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
//                   {feature.description}
//                 </p>

//                 {/* Hover accent line */}
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

//                 {/* Corner decoration */}
//                 <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/10 rounded-tr-2xl group-hover:border-white/30 transition-colors duration-300" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <div className="mt-20 text-center">
//           <button
//             onClick={() => navigate('/login')}
//             className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-xl font-bold overflow-hidden hover:scale-105 transition-transform duration-300 shadow-2xl shadow-purple-500/50"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             <span className="relative">See It In Action</span>
//             <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
//           </button>
//           <p className="text-gray-500 mt-4 text-sm">
//             14-day free trial • No credit card required
//           </p>
//         </div>

//         {/* Background decoration */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none" />
//       </section>

//       {/* Testimonials */}
//       <section className="relative z-10 py-32 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-black mb-4">
//               Loved by Productivity Nerds
//             </h2>
//             <p className="text-xl text-gray-400">
//               Don't take our word for it. Here's what users say.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition"
//               >
//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-gray-300 mb-6 leading-relaxed text-lg">
//                   "{testimonial.text}"
//                 </p>
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
//                     {testimonial.image}
//                   </div>
//                   <div>
//                     <div className="font-semibold">{testimonial.author}</div>
//                     <div className="text-sm text-gray-400">{testimonial.role}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing */}
//       <section className="relative z-10 py-32 container mx-auto px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-5xl font-black mb-6">
//             Simple, Honest Pricing
//           </h2>
//           <p className="text-xl text-gray-400 mb-16">
//             One plan. Unlimited power. No tricks.
//           </p>

//           <div className="relative group">
//             <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition" />
//             <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-12">
//               <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-bold mb-6">
//                 MOST POPULAR
//               </div>

//               <div className="mb-8">
//                 <div className="text-6xl font-black mb-2">
//                   $19
//                   <span className="text-2xl text-gray-400 font-normal">/month</span>
//                 </div>
//                 <p className="text-gray-400">or $180/year (save 20%)</p>
//               </div>

//               <div className="space-y-4 mb-10 text-left max-w-md mx-auto">
//                 {[
//                   'Unlimited email accounts',
//                   'Unlimited AI responses',
//                   'Smart categorization',
//                   '5 automation rules',
//                   'Priority support',
//                   'Analytics dashboard',
//                   'Gmail + Outlook support'
//                 ].map((feature, i) => (
//                   <div key={i} className="flex items-center gap-3">
//                     <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
//                     <span className="text-gray-300">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={() => navigate('/login')}
//                 className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-xl font-bold hover:scale-105 transition-transform shadow-2xl"
//               >
//                 Start 14-Day Free Trial
//               </button>

//               <p className="text-sm text-gray-500 mt-4">
//                 No credit card required • Cancel anytime
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="relative z-10 py-32 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-6xl md:text-7xl font-black mb-8">
//             Ready to Actually
//             <br />
//             <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Love Email Again?
//             </span>
//           </h2>
//           <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
//             Join 500+ professionals who've reclaimed their time.
//             <br />
//             <span className="text-white font-bold">Your inbox will thank you.</span>
//           </p>
//           <button
//             onClick={() => navigate('/login')}
//             className="group relative px-12 py-6 bg-white text-black rounded-2xl text-2xl font-black hover:scale-105 transition-transform shadow-2xl"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition" />
//             <div className="relative flex items-center gap-3">
//               Get Started Free
//               <Rocket className="w-7 h-7 group-hover:translate-x-1 transition" />
//             </div>
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-white/10 py-12 bg-black/50 backdrop-blur-xl">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="flex items-center gap-2">
//               <Mail className="w-6 h-6 text-indigo-400" />
//               <span className="text-xl font-bold">MailMaster AI</span>
//             </div>
//             <p className="text-gray-500">© 2026 MailMaster AI. All rights reserved.</p>
//             <div className="flex gap-8 text-sm">
//               <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
//               <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
//               <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// }



import { useNavigate } from 'react-router-dom';
import { Mail, Zap, Brain, Clock, ArrowRight, Check, Star, Sparkles, TrendingUp, Shield, Globe, BarChart3, Rocket, Code, Users, Infinity, Crown, Award,X} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'Neural Email Intelligence',
      description: 'GPT-4o processes every email through 12 AI models. Categories, sentiment, urgency, context - all in milliseconds.',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      delay: '0ms'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Quantum-Speed Responses',
      description: 'Generate perfect replies in 0.8 seconds. 3 tones, infinite variations. Your voice, AI-powered.',
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      delay: '100ms'
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: 'Time Reclamation Engine',
      description: 'Analytics show exactly where your time goes. Auto-optimize workflows. Reclaim 2.5+ hours daily.',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      delay: '200ms'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Zero-Trust Security',
      description: 'Military-grade E2E encryption. SOC 2 Type II certified. Your data never touches our servers.',
      gradient: 'from-blue-500 via-indigo-500 to-violet-500',
      delay: '300ms'
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Universal Inbox Protocol',
      description: 'Gmail, Outlook, Exchange, IMAP - all in one. Multi-account, multi-domain, zero friction.',
      gradient: 'from-red-500 via-pink-500 to-fuchsia-500',
      delay: '400ms'
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'Predictive Analytics',
      description: 'ML learns your patterns. Predicts priority, suggests actions, optimizes your workflow automatically.',
      gradient: 'from-cyan-500 via-sky-500 to-blue-500',
      delay: '500ms'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$8.99',
      period: '/month',
      description: 'Perfect for individuals getting started',
      icon: <Sparkles className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        { text: '1 email account', included: true },
        { text: '500 AI responses/month', included: true },
        { text: 'Smart categorization', included: true },
        { text: '3 automation rules', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Email support', included: true },
        { text: 'Priority inbox', included: false },
        { text: 'API access', included: false }
      ],
      cta: 'Get started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$14.99',
      period: '/month',
      description: 'For power users who live in email',
      icon: <Crown className="w-6 h-6" />,
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      features: [
        { text: '5 email accounts', included: true },
        { text: 'Unlimited AI responses', included: true },
        { text: 'Advanced categorization', included: true },
        { text: 'Unlimited automation rules', included: true },
        { text: 'Advanced analytics + reports', included: true },
        { text: 'Priority support (24/7)', included: true },
        { text: 'Priority inbox AI', included: true },
        { text: 'Team collaboration', included: true },
        { text: 'Custom workflows', included: true },
        { text: 'API access (1000 calls/day)', included: false }
      ],
      cta: 'Get started',
      popular: true,
      badge: 'MOST POPULAR'
    },
    {
      name: 'Enterprise',
      price: '$18.99',
      period: '/month',
      description: 'Unlimited power for teams & agencies',
      icon: <Rocket className="w-6 h-6" />,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      features: [
        { text: 'Unlimited email accounts', included: true },
        { text: 'Unlimited everything', included: true },
        { text: 'Custom AI training on your data', included: true },
        { text: 'White-label solution', included: true },
        { text: 'Real-time analytics + BI tools', included: true },
        { text: 'Dedicated success manager', included: true },
        { text: 'SLA guarantee (99.99% uptime)', included: true },
        { text: 'Advanced security controls', included: true },
        { text: 'Unlimited API access', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'SSO & SAML', included: true },
        { text: 'Audit logs & compliance', included: true }
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const stats = [
    { number: '50K+', label: 'Emails Processed Daily', icon: <Mail className="w-5 h-5" /> },
    { number: '2.8hrs', label: 'Average Time Saved', icon: <Clock className="w-5 h-5" /> },
    { number: '99.97%', label: 'AI Accuracy Rate', icon: <Brain className="w-5 h-5" /> },
    { number: '2,500+', label: 'Active Users', icon: <Users className="w-5 h-5" /> }
  ];

  const testimonials = [
    {
      text: "I've tried every email tool. This is the only one I can't live without. The AI is genuinely scary good.",
      author: "Sarah Chen",
      role: "VP Product @ Stripe",
      image: "SC",
      rating: 5
    },
    {
      text: "Went from 4 hours daily on email to 45 minutes. ROI was 10x in the first month. Absolute game-changer.",
      author: "Marcus Williams",
      role: "CEO @ TechFlow",
      image: "MW",
      rating: 5
    },
    {
      text: "The priority scoring alone is worth $100/month. Everything else is a bonus. Best SaaS purchase ever.",
      author: "Lisa Park",
      role: "Growth Lead @ Notion",
      image: "LP",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Gradient orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            left: `${20 + mousePosition.x / 100}px`,
            top: `${20 + mousePosition.y / 100}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 right-0 bottom-0"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
            right: `${mousePosition.x / 150}px`,
            bottom: `${mousePosition.y / 150}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-2xl bg-black/50 shadow-2xl shadow-purple-500/5">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition" />
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                MailMaster AI
              </span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition font-bold text-sm shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-24 pb-40">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-500/20 px-6 py-3 rounded-full mb-10 backdrop-blur-xl shadow-2xl shadow-purple-500/20"
          >
            <Award className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
              #1 AI Email Platform on Product Hunt
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-8xl md:text-9xl font-black mb-10 leading-[0.9] tracking-tight">
            <span className="block text-white drop-shadow-2xl">Email,</span>
            <span className="block mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
              Reimagined.
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-400 mb-14 max-w-4xl mx-auto leading-relaxed font-light">
            Stop drowning in your inbox. AI that thinks, responds, and automates—
            <span className="text-white font-semibold block mt-2">saving you 2.8 hours every single day.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <button
              onClick={() => navigate('/login')}
              className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl text-xl font-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition" />
              <div className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Get started
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            <button
              className="px-12 py-6 rounded-2xl border-2 border-white/10 hover:border-white/30 hover:bg-white/5 backdrop-blur-xl transition text-xl font-black shadow-2xl shadow-black/50"
            >
              Watch Demo
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No credit card</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>14-day trial</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div
          className="mt-28 max-w-7xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.08}px) rotateX(${scrollY * 0.01}deg)`,
            transition: 'transform 0.1s linear'
          }}
        >
          <div className="relative group">
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition duration-700" />
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-white/10 p-3 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-purple-950/50 via-pink-950/30 to-rose-950/50 rounded-2xl flex items-center justify-center backdrop-blur-sm overflow-hidden relative">
                {/* Animated grid inside */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                  animation: 'gridMove 20s linear infinite'
                }} />

                <div className="relative text-center z-10">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float shadow-2xl shadow-purple-500/50">
                    <Rocket className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-3xl font-black text-white/90">Your Inbox, Supercharged</p>
                  <p className="text-lg text-gray-400 mt-2">AI-powered. Lightning-fast. Beautiful.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-2xl py-20 shadow-2xl shadow-purple-500/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/20 group-hover:border-purple-500/40 transition">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-40 container mx-auto px-6">
        <div className="text-center mb-36">
          <div className="inline-block mb-8">
            <span className="text-sm font-black text-purple-400 tracking-[0.3em] uppercase">
              Superpowers Included
            </span>
          </div>
          <h2 className="text-7xl md:text-8xl font-black mb-10 leading-tight">
            <span className="text-white drop-shadow-2xl">Everything You Need.</span>
            <br />
            <span className="relative inline-block mt-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Nothing You Don't.
              </span>
              <div className="absolute -bottom-6 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full shadow-2xl shadow-purple-500/50" />
            </span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mt-12">
            Six game-changing features. One beautiful interface. Zero learning curve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${parseInt(feature.delay)}ms both`,
              }}
            >
              {/* Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition duration-700`} />

              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-gray-900/90 via-black to-gray-900/90 backdrop-blur-xl border border-white/5 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-3 shadow-2xl shadow-black/50">
                {/* Icon */}
                <div className="relative mb-10">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-500`} />
                  <div className={`relative w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-lg shadow-purple-500/50" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-40 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-7xl font-black mb-6">
              <span className="text-white">Simple, </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Transparent </span>
              <span className="text-white">Pricing</span>
            </h2>
            <p className="text-2xl text-gray-400 font-light">
              Choose your power level. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative group ${plan.popular ? 'md:-mt-8' : ''}`}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full text-xs font-black text-white shadow-2xl shadow-purple-500/50 animate-pulse">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition duration-700 ${plan.popular ? 'opacity-20' : ''}`} />

                {/* Card */}
                <div className={`relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border ${plan.popular ? 'border-purple-500/30' : 'border-white/5'} rounded-3xl p-10 hover:border-white/20 transition-all duration-500 group-hover:scale-[1.02] shadow-2xl ${plan.popular ? 'shadow-purple-500/20' : 'shadow-black/50'}`}>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 bg-gradient-to-r ${plan.gradient} rounded-xl shadow-lg`}>
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                      <p className="text-sm text-gray-400">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-white/5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-xl text-gray-500">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Billed monthly • Cancel anytime</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate('/login')}
                    className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-xl ${plan.popular
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white hover:scale-105 shadow-purple-500/50'
                      : 'border-2 border-white/10 hover:border-white/30 hover:bg-white/5 text-white'
                      }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise info */}
          <div className="mt-20 text-center">
            <p className="text-gray-400 text-lg mb-6">Need custom enterprise features?</p>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-2xl shadow-orange-500/30">
              <Code className="inline w-5 h-5 mr-2" />
              Talk to Sales About API & White-Label
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-40 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Loved </span>
            <span className="text-white">by Power Users</span>
          </h2>
          <p className="text-xl text-gray-400">
            Don't take our word for it. Here's what they say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-700" />
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 shadow-2xl shadow-black/50">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg font-light">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Final CTA */}
      <section className="relative z-10 py-40 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-rose-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-7xl md:text-8xl font-black mb-10 leading-tight">
            <span className="text-white">Ready to</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Transform Email?
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-14 max-w-3xl mx-auto font-light">
            Join 2,500+ professionals who've reclaimed their time.
            <br />
            <span className="text-white font-bold">Your inbox will never be the same.</span>
          </p>
          <button
            onClick={() => navigate('/login')}
            className="group relative px-14 py-7 bg-white text-black rounded-2xl text-3xl font-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition" />
            <div className="relative flex items-center gap-4">
              Ready to banish inbox chaos?
              <Rocket className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
          <p className="text-sm text-gray-500 mt-8">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-16 bg-black/50 backdrop-blur-2xl">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">MailMaster AI</span>
            </div>
            <p className="text-gray-500">© 2026 MailMaster AI. All rights reserved.</p>
            <div className="flex gap-10 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition font-semibold">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition font-semibold">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition font-semibold">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
    @keyframes gradient {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @keyframes gridMove {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(30px);
      }
    }

    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 5s ease infinite;
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animation-delay-150 {
      animation-delay: 150ms;
    }
  `}</style>
    </div>);
}