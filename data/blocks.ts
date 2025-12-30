
import { Block } from '../types';

export const BLOCKS: Block[] = [
  // --- NAVIGATION ---
  {
    id: 'alpine-nav-ultra',
    name: 'NAV.FLUID_MATRIX_v4',
    category: 'Navbar',
    description: 'High-performance fluid navigation with neural status indicator.',
    isFree: true,
    tags: ['Navbar', 'Glass', 'Neural'],
    code: `<nav class="sticky top-0 z-50 px-8 py-6">
  <div class="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl">
    <div class="flex items-center gap-4">
      <div class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-black italic shadow-lg shadow-teal-500/20">O</div>
      <span class="text-sm font-black italic uppercase tracking-tighter dark:text-white">Studio_OS</span>
    </div>
    <div class="hidden md:flex items-center gap-8">
      <a href="#" class="text-[10px] font-black text-slate-500 hover:text-teal-500 uppercase tracking-widest transition-colors italic">Artifacts</a>
      <a href="#" class="text-[10px] font-black text-slate-500 hover:text-teal-500 uppercase tracking-widest transition-colors italic">Gateway</a>
      <a href="#" class="text-[10px] font-black text-slate-500 hover:text-teal-500 uppercase tracking-widest transition-colors italic">Network</a>
    </div>
    <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
      <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
      <span class="text-[8px] font-black text-emerald-500 uppercase">SYS_STABLE</span>
    </div>
  </div>
</nav>`
  },

  // --- HERO SECTIONS ---
  {
    id: 'opt-hero-alpha',
    name: 'HERO.NEURAL_SYNTH_v1',
    category: 'Hero',
    description: 'Industrial-grade landing module with neural grid background.',
    isFree: true,
    tags: ['Hero', 'Dark', 'Bento'],
    code: `<section class="relative py-24 px-10 overflow-hidden bg-slate-950">
  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:40px_40px]"></div>
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="grid grid-cols-24 gap-12 items-center">
      <div class="col-span-full lg:col-span-14">
        <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full mb-8">
          <span class="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping"></span>
          <span class="text-[9px] font-black text-teal-500 uppercase tracking-widest italic">Core_Pipeline_Online</span>
        </div>
        <h1 class="text-6xl lg:text-8xl font-black italic tracking-tighter uppercase text-white leading-none mb-8">
          Deploy <br/> <span class="text-teal-500">The_Future</span>
        </h1>
        <p class="text-slate-400 text-base font-bold uppercase tracking-tight max-w-lg mb-10 italic leading-relaxed">
          The secret weapon for rapid high-performance building. Orchestrated by neural intelligence.
        </p>
        <div class="flex flex-wrap gap-4">
          <button class="px-10 py-5 bg-teal-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest italic shadow-xl shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all">Get_Started</button>
          <button class="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest italic backdrop-blur-xl hover:bg-white/10 transition-all">Docs_Registry</button>
        </div>
      </div>
      <div class="col-span-full lg:col-span-10">
         <div class="p-1.5 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 rounded-[3rem] border border-white/5 shadow-2xl">
            <div class="bg-black rounded-[2.9rem] aspect-square flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
               <div class="absolute top-0 left-0 w-full h-full scanner-effect opacity-10"></div>
               <div class="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/10">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
               </div>
               <span class="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">V4_Core</span>
               <span class="text-[8px] font-bold text-slate-500 uppercase tracking-[0.4em]">Optimized_Build</span>
            </div>
         </div>
      </div>
    </div>
  </div>
</section>`
  },

  // --- GATEWAY MONITORING ---
  {
    id: 'gateway-node-active',
    name: 'GATEWAY.NODE_MONITOR',
    category: 'Gateway',
    description: 'Industrial API gateway monitor with real-time throughput metrics.',
    isFree: true,
    tags: ['Gateway', 'API', 'Monitoring'],
    code: `<div class="p-10 bg-slate-950 rounded-[3rem] border border-white/10 overflow-hidden relative group">
  <div class="flex items-center justify-between mb-10">
    <div>
      <h4 class="text-2xl font-black italic tracking-tighter uppercase text-white leading-none mb-2">Node_Alpha_7</h4>
      <p class="text-[9px] font-bold text-teal-500 uppercase tracking-widest">Active_Cluster: US-EAST-1</p>
    </div>
    <div class="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center border border-teal-500/20">
      <div class="w-3 h-3 bg-teal-500 rounded-full animate-ping"></div>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-6 mb-10">
    <div class="p-5 bg-white/5 rounded-2xl border border-white/5">
      <span class="text-[8px] font-black text-slate-500 uppercase block mb-2">Latency</span>
      <span class="text-xl font-black text-white italic tracking-tighter">12ms</span>
    </div>
    <div class="p-5 bg-white/5 rounded-2xl border border-white/5">
      <span class="text-[8px] font-black text-slate-500 uppercase block mb-2">Throughput</span>
      <span class="text-xl font-black text-white italic tracking-tighter">4.2k/s</span>
    </div>
    <div class="p-5 bg-white/5 rounded-2xl border border-white/5">
      <span class="text-[8px] font-black text-slate-500 uppercase block mb-2">Uptime</span>
      <span class="text-xl font-black text-white italic tracking-tighter">99.9%</span>
    </div>
  </div>
  <div class="h-2 bg-white/5 rounded-full overflow-hidden">
    <div class="h-full bg-teal-500 w-3/4 shadow-[0_0_15px_#14b8a6]"></div>
  </div>
</div>`
  },

  // --- FUNCTIONS / LOGIC ---
  {
    id: 'auth-interceptor-v4',
    name: 'LOGIC.AUTH_SHIELD',
    category: 'Function',
    description: 'Zero-trust authentication interceptor with neural fingerprinting.',
    isFree: true,
    tags: ['Auth', 'Logic', 'Security'],
    code: `<div class="p-8 bg-indigo-950/20 border-2 border-dashed border-indigo-500/30 rounded-[3rem] flex items-center gap-8 group hover:border-indigo-500 transition-all">
  <div class="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  </div>
  <div class="flex-1">
    <div class="flex items-center justify-between mb-2">
      <h5 class="text-lg font-black italic tracking-tighter uppercase text-white">Auth_Pipeline_v4</h5>
      <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[8px] font-black uppercase rounded-lg border border-indigo-500/20">Active_Shield</span>
    </div>
    <p class="text-[10px] font-bold text-indigo-300/60 uppercase tracking-widest leading-relaxed">
      Intercepting incoming requests for cryptographic validation and JWT payload inspection.
    </p>
  </div>
</div>`
  },

  // --- DASHBOARDS ---
  {
    id: 'tax-bento-analytics',
    name: 'BENTO.NEURAL_TELEMETRY',
    category: 'Dashboard',
    description: 'High-density telemetry dashboard with reactive grid components.',
    isFree: true,
    tags: ['Bento', 'Dashboard', 'Data'],
    code: `<section class="py-20 px-10 bg-slate-50 dark:bg-black">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-24 gap-6">
      <div class="col-span-full lg:col-span-16 h-[380px] p-10 bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden group">
         <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-xl font-black italic tracking-tighter uppercase dark:text-white leading-none">Network_Traffic</h3>
              <p class="text-[9px] font-bold text-teal-500 uppercase tracking-widest mt-2">Active_Routing_Table</p>
            </div>
            <div class="p-3 bg-teal-500/10 text-teal-500 rounded-xl"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
         </div>
         <div class="flex items-end gap-1.5 h-32">
            <div class="flex-1 bg-slate-100 dark:bg-white/5 rounded-full h-24"></div>
            <div class="flex-1 bg-slate-100 dark:bg-white/5 rounded-full h-16"></div>
            <div class="flex-1 bg-teal-500 rounded-full h-32 shadow-[0_0_10px_#14b8a6]"></div>
            <div class="flex-1 bg-slate-100 dark:bg-white/5 rounded-full h-20"></div>
            <div class="flex-1 bg-slate-100 dark:bg-white/5 rounded-full h-28"></div>
            <div class="flex-1 bg-teal-500/50 rounded-full h-24"></div>
         </div>
      </div>
      <div class="col-span-full lg:col-span-8 h-[380px] p-10 bg-teal-600 rounded-[2.5rem] shadow-xl relative overflow-hidden text-white flex flex-col justify-between">
         <div class="absolute top-0 right-0 p-8 opacity-10"><svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg></div>
         <div>
            <span class="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 mb-3 block">System_Integrity</span>
            <h3 class="text-5xl font-black italic tracking-tighter uppercase leading-none">99.8%</h3>
         </div>
         <p class="text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-80 italic">
            Ensuring absolute structural continuity across all nodes in the neural matrix.
         </p>
      </div>
    </div>
  </div>
</section>`
  }
];
