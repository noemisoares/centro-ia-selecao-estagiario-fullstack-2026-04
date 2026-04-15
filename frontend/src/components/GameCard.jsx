import React from 'react';
import Badge from './Badge';
import Button from './Button';
import { ExternalLink, Tag } from 'lucide-react';

export default function GameCard({ game }) {
  const { 
    title, 
    thumb, 
    salePrice, 
    normalPrice, 
    savings, 
    cluster_label = 'COLD',
    dealID,
    storeID
  } = game;

  const floatSavings = parseFloat(savings || "0").toFixed(0);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full animate-fade-in relative">
      <div className={`absolute top-0 inset-x-0 h-1 ${
        cluster_label === 'HOT' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
        cluster_label === 'WARM' ? 'bg-gradient-to-r from-amber-400 to-yellow-500' :
        'bg-gradient-to-r from-blue-500 to-cyan-500'
      }`}></div>

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800">
        <img 
          src={thumb} 
          alt={title} 
          className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute top-3 right-3">
          <Badge cluster={cluster_label} />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-100 line-clamp-2 mb-4" title={title}>{title}</h3>
        
        <div className="mt-auto space-y-4">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 line-through block">
                ${normalPrice}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-indigo-400">
                  ${salePrice}
                </span>
                {floatSavings > 0 && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">
                    -{floatSavings}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {dealID && (
            <a href={`https://www.cheapshark.com/redirect?dealID=${dealID}`} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button variant="primary" className="w-full group/btn">
                <span>Ver Oferta</span>
                <ExternalLink size={16} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
