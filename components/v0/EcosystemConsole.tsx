import React from 'react';
import { Terminal, Cpu, Activity, Zap, Database, HardDrive } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

export const EcosystemConsole: React.FC = () => {
  const { logs, telemetry } = useStudio();

  return (
    <div className="h-full flex flex-col gap-10 animate-in fade-in duration-700 pb-10">
      <div className="grid grid-cols-24 gap-8">
        {[
          { label: 'Neural_Load', value: `${telemetry.cpu}%`, icon: <Cpu />, color: 'text-indigo-500' },
          { label: 'Artifacts', value: telemetry.artifacts, icon: <Database />, color: 'text-emerald-500' },
          { label: 'Memory_Use', value: `${telemetry.memory}GB`, icon: <Activity />, color: 'text-teal-500' },
          { label: 'Storage_Active', value: '4.2 TB', icon: <HardDrive />, color: 'text-amber-500' }
        ].map((stat, i) => (
          <div key={i} className="col-span-24 md:col-span-6 p-10 bg-white dark:bg-black border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl">
             <div className="flex items-center gap-4 mb-5 opacity-40">
                {stat.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
             </div>
             <div className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-slate-950 rounded-[4rem] border-4 border-white/5 p-12 overflow-hidden flex flex-col relative shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <Zap size={200} className="text-indigo-500" />
        </div>
        <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8 relative z-10">
           <div className="flex items-center gap-5">
              <Terminal className="text-teal-500" size={28} />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Kernel_Telemetry_Stream</h3>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto font-mono text-[12px] space-y-4 scrollbar-hide relative z-10">
           {logs.map((log, i) => (
             <div key={i} className="flex gap-6 items-start animate-in slide-in-from-left-4">
               <span className="text-white/20 shrink-0">[{log.timestamp}]</span>
               <span className={`${
                 log.type === 'success' ? 'text-emerald-400' : 
                 log.type === 'warn' ? 'text-amber-400' : 
                 log.type === 'error' ? 'text-red-500 font-bold' : 'text-teal-400/80'
               } italic uppercase font-black tracking-tight`}>
                 >> {log.msg}
               </span>
             </div>
           ))}
           <div className="text-teal-400 animate-pulse font-black mt-4">_ AWAITING_INPUT_SIGNAL</div>
        </div>
      </div>
    </div>
  );
};
