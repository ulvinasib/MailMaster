import { Mail } from 'lucide-react';

export default function Loader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Mail className="w-16 h-16 text-indigo-600 animate-bounce mx-auto mb-4" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-lg font-semibold text-gray-700">Loading MailMaster AI...</p>
      </div>
    </div>
  );
}