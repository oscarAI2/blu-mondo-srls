
import React from 'react';
import { Sparkles, Library, Layout as LayoutIcon, Zap, ArrowRight, Cpu, Boxes, Wand2, ShieldCheck, Rocket, Activity, Globe } from 'lucide-react';

interface PortalProps {
  onSelect: (engine: 'neural' | 'canvas' | 'registry') => void;
}

export const LandingPortal: React.FC<PortalProps> = ({ onSelect }) => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-12 bg-slate-950 relative overflow-hidden font-sans">
      {/* 24-COLUMN NEURAL GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="grid grid-cols-24 h-full w-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-r border-teal-500/30 h-full relative">
              <div className={`absolute top-0 left-0 w-full h-[1px] bg-teal-500/20 animate-pulse-slow`} style={{ animationDelay: `${i * 0.1}s` }} />
            </div>
          ))}
        </div>
      </div>

      {/* HIGH-FREQUENCY PULSE LIGHTS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* ALPHA HEADER */}
        <div className="text-center mb-24 animate-in fade-in slide-in-from-top-12 duration-1000">
           <div className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 border border-white/10 rounded-full mb-12 backdrop-blur-xl group cursor-default">
              <Cpu size={16} className="text-teal-500 animate-pulse" />
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-teal-400 uppercase tracking-[0.5em] italic">Optimer_v4.5_Alpha</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">System_Ready</span>
              </div>
           </div>
           
           <h1 className="text-8xl md:text-[11rem] font-black italic tracking-tighter uppercase text-white leading-[0.8] mb-12 select-none">
             Neural <br/> <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-400 via-indigo-400 to-emerald-400 drop-shadow-[0_0_30px_rgba(20,184,166,0.2)]">Materializer</span>
           </h1>
           
           <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.4em] max-w-3xl mx-auto italic opacity-80 leading-loose">
             Industrial UI Production Protocol. <br/> 
             <span className="text-white/40">Zero Latency. Atomic Precision. Neural Synthesis.</span>
           </p>
        </div>

        {/* PROTOCOL SELECTOR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* PROTOCOL 1: SYNTHESIS (Neural V0) */}
          <button 
            onClick={() => onSelect('neural')}
            className="group relative p-12 bg-white/5 border border-white/10 rounded-[5rem] text-left hover:bg-teal-500/10 hover:border-teal-500/30 transition-all duration-700 animate-in fade-in slide-in-from-bottom-12 delay-150 shadow-2xl overflow-hidden"
          >
            <div className="scanner-effect absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none rounded-[5rem]"></div>
            
            <div className="flex justify-between items-start mb-12">
              <div className="w-20 h-20 bg-teal-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_0_40px_rgba(20,184,166,0.3)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <Sparkles size={40} fill="currentColor" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/10 rounded-full border border-teal-500/20">
                <Activity size={12} className="text-teal-500 animate-pulse" />
                <span className="text-[8px] font-black text-teal-500 uppercase italic tracking-widest">Synthesis_Online</span>
              </div>
            </div>

            <h3 className="text-4xl font-black italic uppercase text-white mb-6 tracking-tighter">Protocol_Alpha</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-[0.2em] italic mb-12 opacity-60">
              [Auto-Synthesis] Materialize industrial interfaces from pure natural language input. The neural OS handles 100% of the materialization process.
            </p>
            
            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <span className="text-[11px] font-black text-teal-500 uppercase italic tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Launch_V0_Engine</span>
              <Rocket size={20} className="text-teal-500 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </div>
          </button>

          {/* PROTOCOL 2: REGISTRY (Module Library) */}
          <button 
            onClick={() => onSelect('registry')}
            className="group relative p-12 bg-white/5 border border-white/10 rounded-[5rem] text-left hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all duration-700 animate-in fade-in slide-in-from-bottom-12 delay-300 shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-start mb-12">
              <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_0_40px_rgba(79,70,229,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Library size={40} />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                <Globe size={12} className="text-indigo-400" />
                <span className="text-[8px] font-black text-indigo-400 uppercase italic tracking-widest">Registry_Loaded</span>
              </div>
            </div>

            <h3 className="text-4xl font-black italic uppercase text-white mb-6 tracking-tighter">Protocol_Beta</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-[0.2em] italic mb-12 opacity-60">
              [Artifact_Registry] Direct access to a curated vault of 1,000+ hand-crafted industrial modules. Atomic, themed, and production-ready.
            </p>
            
            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <span className="text-[11px] font-black text-indigo-400 uppercase italic tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Access_Artifacts</span>
              <ArrowRight size={24} className="text-indigo-400 group-hover:translate-x-4 transition-transform" />
            </div>
          </button>

          {/* PROTOCOL 3: ASSEMBLY (Canvas Studio) */}
          <button 
            onClick={() => onSelect('canvas')}
            className="group relative p-12 bg-white/5 border border-white/10 rounded-[5rem] text-left hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-700 animate-in fade-in slide-in-from-bottom-12 delay-500 shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-start mb-12">
              <div className="w-20 h-20 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_0_40px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-all duration-500">
                <LayoutIcon size={40} />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span className="text-[8px] font-black text-emerald-400 uppercase italic tracking-widest">Studio_Active</span>
              </div>
            </div>

            <h3 className="text-4xl font-black italic uppercase text-white mb-6 tracking-tighter">Protocol_Gamma</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-[0.2em] italic mb-12 opacity-60">
              [Semi-Auto_Studio] Hybrid construction workshop. Assemble modules manually and refine styles through the neural dialogue pipeline.
            </p>
            
            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <span className="text-[11px] font-black text-emerald-400 uppercase italic tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Open_Assembler</span>
              <Zap size={20} fill="currentColor" className="text-emerald-400 group-hover:scale-125 transition-transform" />
            </div>
          </button>
        </div>

        {/* INDUSTRIAL TELEMETRY FOOTER */}
        <div className="mt-32 pt-16 border-t border-white/10 flex flex-wrap items-center justify-between gap-10 opacity-50 select-none">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">OS_Status: Stable</span>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="flex items-center gap-4">
                <Activity size={16} className="text-indigo-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">Core_Throughput: 1.4TB/s</span>
              </div>
           </div>
           
           <div className="flex items-center gap-12 text-[10px] font-black text-white uppercase tracking-[0.5em] italic">
              <span className="hover:text-teal-400 cursor-help transition-colors">Nodes_Online: 1,420k</span>
              <span className="hover:text-indigo-400 cursor-help transition-colors">Latency: 0.04ms</span>
              <span className="text-white/20">v4.5.2_Alpha_Build</span>
           </div>
        </div>
      </div>
    </div>
  );
};
