
import React, { useState } from 'react';
import { Rocket, Layers, ArrowRight, Eye, Download, Code2, Heart, Share2, Plus, Sparkles, ShieldCheck } from 'lucide-react';
import { Template } from '../types';

interface TemplateCardProps {
  template: Template;
  onDeploy: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onDeploy }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group flex flex-col gap-4 bg-transparent animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Visual Preview Area */}
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 bg-slate-100 dark:bg-slate-900">
        <img 
          src={template.thumbnail} 
          alt={template.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
          <button 
            onClick={() => onDeploy(template)}
            className="px-10 py-4 bg-teal-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 italic"
          >
            <Plus size={16} /> Use Template
          </button>
          <div className="flex gap-3">
            <button className="p-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl hover:bg-white hover:text-slate-900 transition-all">
              <Eye size={18} />
            </button>
            <button className="p-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl hover:bg-white hover:text-slate-900 transition-all">
              <Code2 size={18} />
            </button>
          </div>
        </div>

        {/* Status Badges */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
           <div className="flex flex-col gap-2">
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-[9px] font-black text-white uppercase rounded-full shadow-2xl flex items-center gap-2">
                <Layers size={12} className="text-teal-400" /> {template.blocks.length} MODULES
              </span>
              {template.isFeatured && (
                <span className="px-4 py-1.5 bg-teal-500 text-white text-[9px] font-black uppercase rounded-full shadow-2xl flex items-center gap-2">
                  <Sparkles size={10} fill="white" /> FEATURED
                </span>
              )}
           </div>
           <button 
             onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
             className={`pointer-events-auto p-3 rounded-2xl transition-all ${isLiked ? 'bg-red-500 text-white shadow-xl shadow-red-500/20' : 'bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20'}`}
           >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
           </button>
        </div>

        {/* Deployment Info */}
        <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 duration-300">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                 {template.blocks.slice(0, 3).map((b, i) => b && (
                    <div key={i} className="w-8 h-8 rounded-full bg-teal-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-black text-white uppercase">
                       {b.category ? b.category[0] : '?'}
                    </div>
                 ))}
              </div>
              <div>
                <span className="text-[10px] font-black text-white uppercase tracking-tighter block italic leading-none">Industrial OS</span>
                <span className="text-[8px] font-bold text-teal-500 uppercase tracking-widest">Shadcn Ready</span>
              </div>
           </div>
           <ShieldCheck size={18} className="text-teal-400 opacity-80" />
        </div>
      </div>

      {/* Info & Metadata Area */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-3">
           <h3 className="text-base font-black dark:text-white tracking-tighter uppercase italic">{template.name}</h3>
           <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase italic">
              <span className="flex items-center gap-1.5"><Download size={12} className="text-teal-500"/> {template.stats?.installs || '0'}</span>
              <span className="flex items-center gap-1.5"><Eye size={12} className="text-indigo-500"/> {template.stats?.views || '0'}</span>
           </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
           <div className="flex items-center gap-3 group/author cursor-pointer">
              <div className="relative">
                <img src={template.author?.avatar} alt={template.author?.name} className="w-6 h-6 rounded-full border border-slate-200 dark:border-white/10" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-teal-500 border border-white dark:border-slate-900 rounded-full" />
              </div>
              <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 group-hover:text-teal-500 transition-colors uppercase italic tracking-tighter">@{template.author?.name?.replace(' ', '_').toLowerCase() || 'anonymous'}</span>
           </div>
           <div className="flex gap-2">
              <div className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase">React</div>
              <div className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-500 text-[8px] font-black uppercase">Tailwind</div>
           </div>
        </div>
      </div>
    </div>
  );
};
