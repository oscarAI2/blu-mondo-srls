import React, { useState } from 'react';
import { 
  Search, Zap, ChevronDown, 
  Sun, Moon, Cpu, ShieldCheck, Library, 
  Layout as TemplateIcon, Layers, Braces, Sparkles,
  LayoutDashboard, Server, Settings, Plus, Info, ChevronRight, Menu
} from 'lucide-react';
import { Category } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  onSearch: (q: string) => void;
  onAdd: () => void;
  activeCategory: Category;
  setCategory: (c: Category) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const SIDEBAR_SECTIONS = [
  {
    label: 'CORE MODULES',
    items: [
      { id: 'Hero', icon: <Layers size={14} />, label: 'Hero Sections' },
      { id: 'Navbar', icon: <Menu size={14} />, label: 'Navigation' },
      { id: 'Dashboard', icon: <LayoutDashboard size={14} />, label: 'Dashboards' },
      { id: 'Footer', icon: <Info size={14} />, label: 'Footers' }
    ]
  },
  {
    label: 'NEURAL SYSTEM',
    items: [
      { id: 'Gateway', icon: <Server size={14} />, label: 'API Gateways' },
      { id: 'Function', icon: <Braces size={14} />, label: 'Logic Nodes' },
      { id: 'Visuals', icon: <Sparkles size={14} />, label: 'Visual Effects' }
    ]
  },
  {
    label: 'CONFIG',
    items: [
      { id: 'Config', icon: <Settings size={14} />, label: 'System Settings' }
    ]
  }
];

export const Layout: React.FC<LayoutProps> = ({ 
  children, onSearch, onAdd, activeCategory, setCategory, isDark, toggleDark 
}) => {
  return (
    <div className={`h-screen flex overflow-hidden ${isDark ? 'dark bg-[#020617]' : 'bg-slate-50'}`}>
      {/* AI Studio Style Sidebar */}
      <aside className="w-[280px] h-full flex flex-col bg-white dark:bg-black border-r border-slate-200 dark:border-white/5 z-50 shrink-0">
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <Cpu size={18} />
             </div>
             <span className="font-black italic tracking-tighter text-lg uppercase dark:text-white">Optimer <span className="text-teal-500">v4</span></span>
          </div>
        </div>

        <div className="px-4 py-4">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="Search blocks..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-teal-500/30 rounded-xl text-[11px] font-semibold outline-none transition-all dark:text-white"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-6 scrollbar-hide">
          <button
            onClick={() => setCategory('All')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all mb-2 ${
              activeCategory === 'All' 
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3"><Library size={14} /> All Nodes</div>
            <ChevronRight size={12} className={activeCategory === 'All' ? 'opacity-100' : 'opacity-20'} />
          </button>

          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.label} className="mt-6 mb-2 px-4">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{section.label}</span>
              <div className="space-y-1 mt-3 -mx-2">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCategory(item.id as Category)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                      activeCategory === item.id 
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">{item.icon} {item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
           <button 
             onClick={onAdd}
             className="w-full py-3.5 bg-slate-900 dark:bg-teal-600 text-white rounded-xl text-[11px] font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10 uppercase italic"
           >
             <Zap size={14} fill="currentColor" /> Neural Synthesis
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#020617] overflow-hidden">
        <header className="h-[60px] border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-teal-500/20">
                Studio_Active
             </div>
             <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse shadow-[0_0_8px_#14b8a6]" />
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pipeline: Neural-v4</span>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={toggleDark} 
               className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-all"
             >
                {isDark ? <Sun size={16}/> : <Moon size={16}/>}
             </button>
             <button className="px-5 py-2 bg-teal-500 text-white rounded-lg text-[10px] font-black uppercase italic shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all">
                Export Project
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          {children}
        </div>
      </main>
    </div>
  );
};