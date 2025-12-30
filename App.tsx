
import React, { useState, useEffect } from 'react';
import { Layout } from './components/ui/Layout';
import { AIGenerator } from './components/AIGenerator';
import { EcosystemConsole } from './components/v0/EcosystemConsole';
import { GatewayMonitor } from './components/v0/GatewayMonitor';
import { FunctionsRegistry } from './components/v0/FunctionsRegistry';
import { LandingPortal } from './components/LandingPortal';
import { BlockCard } from './components/BlockCard';
import { StudioProvider, useStudio } from './context/StudioContext';
import { BLOCKS } from './data/blocks';
import { Category, Block } from './types';
import { 
  Sparkles, Layout as LayoutIcon, Zap, Trash2, 
  ChevronUp, ChevronDown, Wand2, Loader2, Send, Plus, Boxes,
  Library, Terminal, Server, Braces, Layers, Home, Rocket
} from 'lucide-react';
import { planArchitecture, materializer } from './services/geminiService';

type MainEngine = 'neural' | 'function' | 'canvas' | 'gateway' | 'console' | 'registry' | 'portal';

function AppContent() {
  const { 
    artifacts, addArtifact, removeArtifact, moveArtifact, 
    addLog, recordRequest, telemetry 
  } = useStudio();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isDark, setIsDark] = useState(true);
  const [currentEngine, setCurrentEngine] = useState<MainEngine>('portal');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [refinePrompt, setRefinePrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const filteredBlocks = BLOCKS.filter((block) => {
    const matchesSearch = block.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || block.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRefineDialogue = async () => {
    if (!refinePrompt.trim() || isRefining) return;
    setIsRefining(true);
    addLog('NEURAL_REFINEMENT_INITIALIZED', 'info');
    recordRequest('/api/v4/neural/refine', 'AI');
    
    try {
      const context = artifacts.map(b => b.code).join('\n\n');
      const plan = await planArchitecture(`Refine project: ${refinePrompt}`, context);
      
      if (plan) {
        for (const call of plan) {
          if (call.name === 'add_section') {
             const { category, description, style } = call.args as any;
             const res = await materializer(category, description, style);
             addArtifact({
               id: `gen-${Date.now()}`,
               name: res.name || 'REFINED_NODE',
               category: category as any,
               description: res.description || 'Refined artifact.',
               code: res.code || '',
               isFree: true,
               tags: ['REFINED', 'NEURAL']
             });
          }
        }
      }
      setRefinePrompt('');
      addLog('REFINEMENT_APPLIED_SUCCESSFULLY', 'success');
    } catch (e) {
      addLog('KERNEL_HALT: REFINEMENT_FAILURE', 'error');
    } finally {
      setIsRefining(false);
    }
  };

  // If in portal view, show the high-impact landing page
  if (currentEngine === 'portal') {
    return <LandingPortal onSelect={(engine) => {
      addLog(`ENGINE_PROTOCOL_SELECTED: ${engine.toUpperCase()}`, 'info');
      setCurrentEngine(engine);
    }} />;
  }

  return (
    <Layout 
      onSearch={setSearchQuery} 
      onAdd={() => setCurrentEngine('neural')}
      activeCategory={activeCategory}
      setCategory={(c) => {
        setActiveCategory(c);
        if (c === 'Gateway') setCurrentEngine('gateway');
        else if (c === 'Config') setCurrentEngine('console');
        else if (c === 'Function') setCurrentEngine('function');
        else setCurrentEngine('registry');
      }}
      isDark={isDark}
      toggleDark={() => setIsDark(!isDark)}
    >
      <div className="h-full flex flex-col gap-6 relative">
        {/* Top Control Bar (Neural Navigation) */}
        <div className="flex items-center justify-between px-2 bg-white/50 dark:bg-black/50 backdrop-blur-md p-3 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm">
           <div className="flex items-center gap-2">
             <button
               onClick={() => setCurrentEngine('portal')}
               className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
             >
               <Home size={14}/> Home
             </button>
             <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-2" />
             {[
               { id: 'canvas', label: 'Canvas', icon: <LayoutIcon size={14}/> },
               { id: 'neural', label: 'Neural V0', icon: <Sparkles size={14}/> },
               { id: 'registry', label: 'Artifacts', icon: <Library size={14}/> },
               { id: 'gateway', label: 'Gateway', icon: <Server size={14}/> }
             ].map(engine => (
               <button
                 key={engine.id}
                 onClick={() => {
                    setCurrentEngine(engine.id as MainEngine);
                    addLog(`SWITCHED_ENGINE: ${engine.label.toUpperCase()}`, 'info');
                 }}
                 className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   currentEngine === engine.id 
                     ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
                     : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                 }`}
               >
                 {engine.icon} {engine.label}
               </button>
             ))}
           </div>

           <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest italic">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Nodes: {artifacts.length}
              </span>
              <button className="p-2.5 bg-slate-900 dark:bg-white/5 rounded-xl text-white dark:text-slate-400" onClick={() => setCurrentEngine('console')}>
                <Terminal size={14} />
              </button>
           </div>
        </div>

        {/* Dynamic Sector Rendering */}
        <div className="flex-1 overflow-hidden relative rounded-[3rem] border border-slate-200 dark:border-white/5 bg-slate-100/30 dark:bg-black/20">
          
          {/* SECTOR 1: SEMI-AUTO CANVAS (Assembly Mode) */}
          {currentEngine === 'canvas' && (
            <div className="h-full flex gap-6 p-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="w-80 h-full flex flex-col bg-white dark:bg-black rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl shrink-0 overflow-hidden">
                 <div className="p-6 border-b dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                    <span className="text-[10px] font-black uppercase tracking-widest italic opacity-50">Local_Module_Pool</span>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                    {filteredBlocks.map(block => (
                      <button 
                        key={block.id}
                        onClick={() => addArtifact(block)}
                        className="w-full p-5 bg-slate-50 dark:bg-white/[0.02] hover:bg-teal-500/10 border border-slate-100 dark:border-white/5 rounded-2xl text-left transition-all group flex items-center justify-between"
                      >
                         <div className="min-w-0">
                            <span className="text-[11px] font-black uppercase truncate block dark:text-white mb-1 tracking-tighter">{block.name}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{block.category}</span>
                         </div>
                         <Plus size={16} className="text-teal-500 opacity-0 group-hover:opacity-100 transition-all" />
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex-1 bg-white dark:bg-black/60 rounded-[3.5rem] border-4 border-slate-200 dark:border-white/5 shadow-2xl overflow-y-auto scrollbar-hide relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                 {artifacts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-20">
                       <Boxes className="text-slate-300 dark:text-white/10 mb-10" size={72} />
                       <h3 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white mb-6">Canvas_Awaiting_Nodes</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12">Drag modules from the pool or use Neural refinement</p>
                       <div className="flex gap-4">
                         <button onClick={() => setCurrentEngine('registry')} className="px-10 py-5 bg-white dark:bg-white/5 border dark:border-white/10 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            Browse Registry
                         </button>
                         <button onClick={() => setCurrentEngine('neural')} className="px-10 py-5 bg-teal-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20">
                            Neural Synthesis
                         </button>
                       </div>
                    </div>
                 ) : (
                    <div className="p-0">
                       {artifacts.map((block) => (
                         <div 
                           key={block.id} 
                           onClick={() => setSelectedBlockId(block.id)} 
                           className={`group relative border-b dark:border-white/5 transition-all ${selectedBlockId === block.id ? 'bg-teal-500/[0.03] outline outline-2 outline-teal-500/30' : ''}`}
                         >
                           <div className="absolute top-8 right-10 flex gap-3 opacity-0 group-hover:opacity-100 transition-all z-20">
                              <button onClick={(e) => { e.stopPropagation(); moveArtifact(block.id, 'up'); }} className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl hover:text-teal-500 transition-colors"><ChevronUp size={16}/></button>
                              <button onClick={(e) => { e.stopPropagation(); moveArtifact(block.id, 'down'); }} className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl hover:text-teal-500 transition-colors"><ChevronDown size={16}/></button>
                              <button onClick={(e) => { e.stopPropagation(); removeArtifact(block.id); }} className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                           </div>
                           {/* Render the block code directly as industrial snippet */}
                           <div className="w-full pointer-events-none" dangerouslySetInnerHTML={{ __html: block.code }} />
                         </div>
                       ))}
                    </div>
                 )}
              </div>

              {/* Neural Refinement Panel */}
              <div className="w-96 flex flex-col gap-6 shrink-0 animate-in slide-in-from-right-10 duration-700">
                 <div className="p-10 bg-white dark:bg-black border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-indigo-500 mb-8 font-black uppercase text-[12px] tracking-widest italic">
                       <Wand2 size={20} className="animate-pulse" /> Neural_Studio_Refiner
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 leading-relaxed italic">
                      Talk to the neural OS to refine the current assembly. Changes will be materialized into atomic updates.
                    </p>
                    <div className="relative flex-1">
                      <textarea 
                        value={refinePrompt}
                        onChange={(e) => setRefinePrompt(e.target.value)}
                        placeholder="e.g. Add a dashboard below the hero with dark industrial colors..."
                        className="w-full h-full bg-slate-50 dark:bg-white/[0.03] rounded-3xl p-8 text-[12px] font-bold outline-none dark:text-white placeholder:italic resize-none border-2 border-transparent focus:border-indigo-500/30 transition-all"
                      />
                      <button 
                        onClick={handleRefineDialogue}
                        disabled={isRefining || !refinePrompt}
                        className="absolute bottom-6 right-6 p-6 bg-indigo-600 text-white rounded-[1.5rem] shadow-2xl disabled:opacity-30 hover:scale-110 active:scale-95 transition-all shadow-indigo-600/30"
                      >
                        {isRefining ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                      </button>
                    </div>
                    <div className="mt-8 pt-8 border-t dark:border-white/5 flex items-center justify-between">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Model: Gemini_3_Pro</span>
                       <div className="flex gap-1">
                         {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: `${i*0.2}s`}} />)}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* SECTOR 2: FULLY AUTOMATIC (Neural Synthesis Mode) */}
          {currentEngine === 'neural' && (
             <div className="h-full p-6 animate-in fade-in zoom-in-95 duration-700">
                <AIGenerator 
                  onClose={() => setCurrentEngine('canvas')} 
                  onPageGenerated={(blocks) => {
                    blocks.forEach(b => addArtifact(b));
                    setCurrentEngine('canvas');
                  }}
                  embedded={true}
                />
             </div>
          )}

          {/* SECTOR 3: MODULE REGISTRY (Artifact Mode) */}
          {currentEngine === 'registry' && (
            <div className="h-full p-12 overflow-y-auto scrollbar-hide animate-in fade-in slide-in-from-top-10 duration-700">
              <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8 bg-white/50 dark:bg-black/50 p-12 rounded-[4rem] border border-slate-200 dark:border-white/5">
                 <div>
                    <h2 className="text-7xl font-black italic uppercase tracking-tighter dark:text-white leading-none mb-6">Master_Registry</h2>
                    <p className="text-[12px] font-black text-teal-500 uppercase tracking-[0.6em] italic">Access 1,000+ atomic industrial-grade nodes for shadcn/ui.</p>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="px-8 py-4 bg-white dark:bg-black border border-slate-200 dark:border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest italic dark:text-white shadow-xl">
                      Synced: {filteredBlocks.length} Nodes
                    </div>
                    <button className="p-4 bg-teal-500 text-white rounded-2xl shadow-xl shadow-teal-500/20">
                       <Rocket size={24} />
                    </button>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                 {filteredBlocks.map(block => (
                   <BlockCard key={block.id} block={block} onAddToPage={(b) => {
                      addArtifact(b);
                      addLog(`PUSHED_TO_CANVAS: ${b.name}`, 'success');
                   }} />
                 ))}
              </div>
            </div>
          )}

          {/* MISC SECTORS (Functions, Gateway, Telemetry) */}
          {currentEngine === 'function' && <div className="h-full p-10 overflow-y-auto scrollbar-hide"><FunctionsRegistry blocks={BLOCKS} onAddToPage={addArtifact} /></div>}
          {currentEngine === 'gateway' && <div className="h-full p-10"><GatewayMonitor /></div>}
          {currentEngine === 'console' && <div className="h-full p-10"><EcosystemConsole /></div>}
        </div>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <AppContent />
    </StudioProvider>
  );
}
