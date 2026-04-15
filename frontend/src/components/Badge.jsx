import React from 'react';
import { Flame, Sun, Snowflake } from 'lucide-react';

const clusterConfig = {
  HOT: {
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: Flame,
    label: 'HOT',
    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]'
  },
  WARM: {
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: Sun,
    label: 'WARM',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]'
  },
  COLD: {
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: Snowflake,
    label: 'COLD',
    glow: ''
  }
};

export default function Badge({ cluster = 'COLD' }) {
  const config = clusterConfig[cluster] || clusterConfig['COLD'];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm transition-all duration-300 ${config.bg} ${config.color} ${config.border} ${config.glow}`}>
      <Icon size={14} className="animate-pulse" />
      {config.label}
    </div>
  );
}
