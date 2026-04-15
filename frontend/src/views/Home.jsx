import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import Button from '../components/Button';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 z-10 w-full max-w-3xl flex flex-col items-center">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Encontre o melhor preço<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">sem perder tempo...</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Um motor que analisa os preços dos jogos e agrupa as ofertas em categorias.
          </p>
        </div>

        <form onSubmit={handleSearch} className="w-full glass-panel p-2 rounded-2xl flex flex-col sm:flex-row gap-2 animate-fade-in" style={{animationDelay: '100ms'}}>
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-4 text-slate-400" size={20} />
            <input
              type="text"
              className="w-full bg-transparent border-none text-white pl-12 pr-4 py-3 focus:outline-none placeholder:text-slate-500 text-lg"
              placeholder="Ex: Batman, Resident Evil, Stardew Valley..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" disabled={!query.trim()} className="w-full sm:w-auto px-8">
            Analisar Preços
          </Button>
        </form>
      </div>
    </div>
  );
}
