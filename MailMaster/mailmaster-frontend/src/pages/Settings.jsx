import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <SettingsIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings Coming Soon</h2>
        <p className="text-gray-600">We'll build this in Day 5!</p>
      </div>
    </div>
  );
}