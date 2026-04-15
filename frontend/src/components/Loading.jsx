import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading({ message = "Analisando preços com IA..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 animate-fade-in text-slate-400">
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-md bg-blue-500/30 animate-pulse"></div>
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 relative z-10" />
      </div>
      <p className="text-sm font-medium animate-pulse">{message}</p>
    </div>
  );
}
