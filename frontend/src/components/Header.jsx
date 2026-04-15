import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Gamepad2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
            <Gamepad2 size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-100 flex items-center gap-1">
            GamePrice <span className="text-blue-500 flex items-center gap-1"><Bot size={18}/> AI</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
