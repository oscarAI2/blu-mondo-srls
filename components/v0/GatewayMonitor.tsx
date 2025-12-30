import React from 'react';
import { Wifi, Zap, Globe, Cpu, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

export const GatewayMonitor: React.FC = () => {
  const { traffic } = useStudio();

  return (
    <div className="p-12 bg-white dark:bg-[#030303] rounded-[4rem] border border-slate-200 dark:border-white/5 shadow-2xl h-full flex flex-col animate-in fade-in zoom-in-95 duration-700">
      <div className="flex items-center justify-between mb-16 pb-10 border-b dark:border-white/5">
        <div>
          <h2 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white leading-none">Neural_Gateway.v4</h2>
          <p className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.5em] mt-5 italic">Traffic_Routing_Matrix</p>
        </div>
        <div className="flex items-center gap-4 px-8 py-4 bg-emerald-500/10 text-emerald-500 rounded-3xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
          <Wifi size={18} className="animate-pulse" /> LIVE_NODE_STABLE
        </div>
      </div>

      <div className="grid grid-cols-24 gap-12 flex-1 overflow-hidden">
        <div className="col-span-24 lg:col-span-16 space-y-6 overflow-y-auto pr-4 scrollbar-hide">
          <div className="flex items-center justify-between px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">
             <span>Endpoint_Identifier</span>
             <span>Metric / Status</span>
          </div>
          {traffic.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-10 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] group hover:border-indigo-500 transition-all animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-8">
                <div className={`p-4 rounded-2xl ${r.status.includes('200') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                   {r.type === 'AI' ? <Zap size={20}/> : r.type === 'SEC' ? <Globe size={20}/> : <Cpu size={20}/>}
                </div>
                <div>
                  <span className="text-sm font-black uppercase italic dark:text-white block tracking-tighter">{r.route}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{r.timestamp} • {r.status}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-black italic text-teal-500 block">{r.latency}</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Latency_Metric</span>
              </div>
            </div>
          ))}
          {traffic.length === 0 && (
            <div className="text-center py-20 opacity-20">
              <ArrowRightLeft size={64} className="mx-auto mb-6" />
              <p className="text-[11px] font-black uppercase tracking-widest">Awaiting traffic events...</p>
            </div>
          )}
        </div>

        <div className="col-span-24 lg:col-span-8 space-y-12">
           <div className="p-10 bg-indigo-600 rounded-[4rem] text-white flex flex-col justify-between relative overflow-hidden shadow-2xl h-80">
              <div className="absolute -top-10 -right-10 opacity-20 scale-150 rotate-12"><ArrowRightLeft size={180} /></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-4">Security_Shield</h3>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 leading-relaxed italic">
                  Active rate limiting.<br/>Zero-trust engaged.<br/>Neural firewall active.
                </p>
              </div>
           </div>
           <div className="p-10 bg-white dark:bg-white/5 border dark:border-white/10 rounded-[4rem] flex-1">
              <div className="flex items-center gap-4 mb-8">
                <ShieldAlert className="text-amber-500" size={24} />
                <h4 className="text-[12px] font-black uppercase tracking-widest italic dark:text-white">Threat_Matrix</h4>
              </div>
              <div className="grid grid-cols-12 gap-1 opacity-20">
                {Array.from({length: 36}).map((_, i) => (
                   <div key={i} className={`h-8 rounded-sm ${Math.random() > 0.9 ? 'bg-red-500' : 'bg-slate-200 dark:bg-white/10'}`}></div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
