import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <BarChart3 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Coming Soon</h2>
        <p className="text-gray-600">We'll build this in Day 5!</p>
      </div>
    </div>
  );
}