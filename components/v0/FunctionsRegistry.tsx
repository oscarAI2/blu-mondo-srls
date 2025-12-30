
import React, { useState } from 'react';
import { Braces, Search, Filter } from 'lucide-react';
import { Block } from '../../types';
import { BlockCard } from '../BlockCard';

interface FunctionsRegistryProps {
  blocks: Block[];
  onAddToPage: (block: Block) => void;
}

export const FunctionsRegistry: React.FC<FunctionsRegistryProps> = ({ blocks, onAddToPage }) => {
  const [filter, setFilter] = useState<'All' | 'Logic' | 'Middleware'>('All');
  
  const functionBlocks = blocks.filter(b => 
    b.category === 'Function' || b.category === 'API' || b.category === 'MicroUtils' || b.category === 'CloudOps'
  );

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8">
        <div>
          <h2 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white leading-none">Registry.Logic</h2>
          <p className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.5em] mt-4 italic">Atomic Enterprise Logic & Middleware Artifacts</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl border dark:border-white/10">
              <button 
                onClick={() => setFilter('All')}
                className={`px-6 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase italic tracking-widest ${filter === 'All' ? 'bg-white dark:bg-white/10 shadow-lg text-teal-600 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                All_Nodes
              </button>
              <button 
                onClick={() => setFilter('Logic')}
                className={`px-6 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase italic tracking-widest ${filter === 'Logic' ? 'bg-white dark:bg-white/10 shadow-lg text-teal-600 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Logic
              </button>
              <button 
                onClick={() => setFilter('Middleware')}
                className={`px-6 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase italic tracking-widest ${filter === 'Middleware' ? 'bg-white dark:bg-white/10 shadow-lg text-teal-600 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Middleware
              </button>
           </div>
           <button className="p-4 bg-slate-900 text-white dark:bg-teal-600 rounded-2xl hover:scale-105 transition-all shadow-xl">
             <Filter size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {functionBlocks.length > 0 ? (
          functionBlocks.map(block => (
            <BlockCard key={block.id} block={block} onAddToPage={onAddToPage} />
          ))
        ) : (
          <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-950/20 rounded-[2.5rem] flex items-center justify-center mb-8 border-2 border-dashed border-indigo-500/30">
              <Braces size={40} className="text-indigo-500" />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white mb-4">No_Artifacts_Detected</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic max-w-sm">The logical registry is currently vacant in this matrix sector.</p>
          </div>
        )}
      </div>
    </div>
  );
};
