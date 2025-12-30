
import React, { useState, useRef } from 'react';
import { Sparkles, Play, Terminal, Zap, Brain, Loader2, X, Command, Code2, Cpu } from 'lucide-react';
import { planArchitecture, materializer } from '../services/geminiService';
import { Block } from '../types';

interface AIGeneratorProps {
  onClose: () => void;
  onPageGenerated: (blocks: Block[]) => void;
  embedded?: boolean;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ onClose, onPageGenerated, embedded = false }) => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<'idle' | 'thinking' | 'compiling' | 'success'>('idle');
  const [logs, setLogs] = useState<{msg: string, type: 'info' | 'success' | 'warn'}[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setLogs(prev => [...prev, { msg, type }]);
    setTimeout(() => {
      if (logContainerRef.current) logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }, 50);
  };

  const handleCompile = async () => {
    if (!prompt.trim()) return;
    setStatus('thinking');
    setLogs([{ msg: '>> INITIALIZING_NEURAL_CORE_v4.5', type: 'info' }]);
    
    try {
      addLog('🧠 Engaging Architecture Planner (Thinking Budget Active)...', 'info');
      const plan = await planArchitecture(prompt);
      
      if (!plan || plan.length === 0) {
        addLog('!! PLAN_HALTED: Architectural entropy too high.', 'warn');
        setStatus('idle');
        return;
      }

      addLog(`📈 Blueprint mapped: ${plan.length} nodes scheduled for synthesis.`, 'success');
      setStatus('compiling');

      const generatedBlocks: Block[] = [];
      for (const call of plan) {
        if (call.name === 'add_section') {
          const { category, description, style } = call.args as any;
          addLog(`🛠️ Synthesizing ${category} node [${style}]...`, 'info');
          
          const artifact = await materializer(category, description, style || 'industrial-ultra');
          generatedBlocks.push({
            id: `gen-${Date.now()}-${generatedBlocks.length}`,
            name: artifact.name || 'Untitled Artifact',
            category: category as any,
            description: artifact.description || 'Neural generated node.',
            code: artifact.code || '',
            isFree: true,
            tags: ['AI_GENERATED', 'NEURAL_OS', style || 'industrial']
          });
          addLog(`✅ Artifact ${artifact.name} materialized.`, 'success');
        }
      }

      setStatus('success');
      addLog('>> SYNTHESIS_COMPLETE: Page ready for deployment.', 'success');
      setTimeout(() => onPageGenerated(generatedBlocks), 800);

    } catch (e) {
      addLog(`❌ KERNEL_PANIC: ${(e as any).message}`, 'warn');
      setStatus('idle');
    }
  };

  const UIWrapper = ({ children }: { children: React.ReactNode }) => (
    embedded 
      ? <div className="w-full h-full bg-white dark:bg-[#050505] rounded-[4rem] border-4 border-slate-200 dark:border-white/5 shadow-2xl flex flex-col overflow-hidden">{children}</div>
      : <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="w-full max-w-5xl bg-white dark:bg-[#050505] rounded-[4rem] border-4 border-slate-200 dark:border-white/5 shadow-2xl flex flex-col h-[85vh] overflow-hidden">{children}</div>
        </div>
  );

  return (
    <UIWrapper>
      {/* OS Header */}
      <div className="p-8 border-b dark:border-white/5 flex items-center justify-between bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30">
            <Brain size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none dark:text-white">Neural Synthesis Engine</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 italic">Phase: {status.toUpperCase()}</p>
          </div>
        </div>
        {!embedded && (
          <button onClick={onClose} className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl hover:bg-slate-200 transition-all dark:text-white">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {status === 'idle' ? (
          <div className="flex-1 p-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-950/30 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner">
              <Zap className="text-indigo-600" size={48} />
            </div>
            <h3 className="text-4xl font-black tracking-tighter mb-4 italic uppercase dark:text-white leading-none">Command the Grid</h3>
            <p className="text-slate-500 max-w-lg mb-12 font-bold uppercase text-[10px] tracking-[0.2em] opacity-60">
              Input natural language instructions. The engine will compile an industrial architecture using atomic blocks.
            </p>
            
            <div className="w-full max-w-3xl relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-[3rem] opacity-20 blur-xl group-focus-within:opacity-40 transition-all"></div>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision (e.g. A futuristic bento-style analytics dashboard with real-time trading nodes...)"
                className="relative w-full h-48 px-10 py-8 bg-white dark:bg-[#0c0c0c] border-2 border-slate-100 dark:border-white/10 rounded-[3rem] text-lg font-bold outline-none transition-all placeholder:italic placeholder:text-slate-300 dark:text-white resize-none shadow-xl"
              />
              <button 
                onClick={handleCompile}
                className="absolute bottom-8 right-8 px-10 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 italic uppercase tracking-widest text-xs"
              >
                <Play size={20} fill="white" /> Execute Synthesis
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Console Log */}
            <div className="flex-1 p-12 overflow-y-auto scrollbar-hide space-y-6 bg-slate-50/50 dark:bg-black/30" ref={logContainerRef}>
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4 animate-in slide-in-from-left-4 duration-300">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    log.type === 'success' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 
                    log.type === 'warn' ? 'bg-red-500' : 'bg-indigo-500 animate-pulse'
                  }`} />
                  <p className={`text-[11px] font-black uppercase tracking-tight ${
                    log.type === 'success' ? 'text-emerald-600 italic' : 
                    log.type === 'warn' ? 'text-red-500' : 'text-slate-500 dark:text-slate-300'
                  }`}>
                    {log.msg}
                  </p>
                </div>
              ))}
              {status !== 'success' && (
                 <div className="flex items-center gap-4 text-indigo-500 font-black italic text-[10px] animate-pulse pl-6 uppercase tracking-widest">
                    <Loader2 size={14} className="animate-spin" /> Materializing High-Fidelity Artifacts...
                 </div>
              )}
            </div>
            
            {/* Stats Panel */}
            <div className="w-80 bg-white dark:bg-[#0c0c0c] border-l dark:border-white/5 p-10 flex flex-col gap-10">
               <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Registry Health</h4>
                  <div className="space-y-6">
                    {[
                      { l: 'Stability', v: '99.9%', c: 'text-emerald-500' },
                      { l: 'Context', v: 'Neural', c: 'text-indigo-500' },
                      { l: 'Budget', v: '16,000', c: 'text-teal-500' }
                    ].map(s => (
                      <div key={s.l} className="flex justify-between items-center border-b dark:border-white/5 pb-4">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{s.l}</span>
                        <span className={`text-[10px] font-black italic uppercase ${s.c}`}>{s.v}</span>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="mt-auto p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem]">
                  <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
                     <Cpu size={18} /> <span className="text-[10px] font-black uppercase">V0.PRO_SPEC</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase">
                    Utilizing <span className="text-indigo-500">Gemini 3 Pro</span> for reasoning and <span className="text-teal-500">Flash</span> for high-speed materialization.
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </UIWrapper>
  );
};
