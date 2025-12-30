
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Copy, Check, Plus, Layers, Sparkles, Code2, Eye } from 'lucide-react';
import { Block } from '../types';
import Prism from 'prismjs';

// Register Prism components for the Neural Registry environment
import 'https://esm.sh/prismjs@1.29.0/components/prism-markup';
import 'https://esm.sh/prismjs@1.29.0/components/prism-javascript';
import 'https://esm.sh/prismjs@1.29.0/components/prism-css';
import 'https://esm.sh/prismjs@1.29.0/components/prism-json';

interface BlockCardProps {
  block: Block;
  onAddToPage?: (block: Block) => void;
}

export const BlockCard: React.FC<BlockCardProps> = ({ block, onAddToPage }) => {
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [showAddTooltip, setShowAddTooltip] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);
  
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipCopyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipAddTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (tooltipCopyTimerRef.current) clearTimeout(tooltipCopyTimerRef.current);
      if (tooltipAddTimerRef.current) clearTimeout(tooltipAddTimerRef.current);
    };
  }, []);

  // Neural materialization: Simulate high-fidelity rendering phase
  useEffect(() => {
    if (view === 'code') {
      setIsHighlighting(true);
      const timer = setTimeout(() => {
        setIsHighlighting(false);
      }, 600); 
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(block.code);
    setCopied(true);
    
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseEnterCopy = () => {
    setShowCopyTooltip(true);
    if (tooltipCopyTimerRef.current) clearTimeout(tooltipCopyTimerRef.current);
    tooltipCopyTimerRef.current = setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  const handleMouseEnterAdd = () => {
    setShowAddTooltip(true);
    if (tooltipAddTimerRef.current) clearTimeout(tooltipAddTimerRef.current);
    tooltipAddTimerRef.current = setTimeout(() => setShowAddTooltip(false), 2000);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToPage) {
      onAddToPage(block);
    }
  };

  // Analyze code structure for a accurate skeleton representation
  const codeMetadata = useMemo(() => {
    const lines = block.code.split('\n').filter(l => l.trim().length > 0).slice(0, 16);
    return lines.map(line => ({
      indent: (line.match(/^\s*/)?.[0].length || 0),
      length: Math.max(10, Math.min(95, line.trim().length * 1.5))
    }));
  }, [block.code]);

  // Syntax Highlighting Implementation via Prism.js
  const highlightedCode = useMemo(() => {
    try {
      // Use 'markup' for HTML/Tailwind snippets
      const grammar = Prism.languages.markup;
      if (!grammar) return block.code;
      return Prism.highlight(block.code, grammar, 'markup');
    } catch (err) {
      console.error('Neural Highlighting Error:', err);
      return block.code;
    }
  }, [block.code]);

  return (
    <article 
      className="group bg-white dark:bg-[#080808] rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col h-full"
      aria-labelledby={`title-${block.id}`}
    >
      {/* Artifact OS Header */}
      <header className="px-8 py-6 border-b dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-xl flex items-center justify-center border border-teal-500/20" aria-hidden="true">
             {block.category === 'Navbar' ? <Layers size={16} /> : <Sparkles size={16} />}
          </div>
          <div>
            <h3 id={`title-${block.id}`} className="text-[11px] font-black uppercase tracking-[0.15em] italic text-slate-900 dark:text-white block leading-none truncate max-w-[140px]">
              {block.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
               <span className="text-[7px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                 Sector: {block.category}
               </span>
               <div className="w-1 h-1 bg-teal-500 rounded-full animate-pulse" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* View Switcher (Tab Interface) */}
        <div className="flex bg-slate-200/50 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10" role="tablist" aria-label={`${block.name} mode`}>
           <button 
             role="tab"
             aria-selected={view === 'preview'}
             aria-controls={`panel-preview-${block.id}`}
             onClick={() => setView('preview')}
             className={`flex items-center gap-2 px-5 py-2 text-[9px] font-black rounded-[14px] transition-all uppercase italic tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
               view === 'preview' 
                ? 'bg-white dark:bg-white/10 shadow-lg text-teal-700 dark:text-teal-400 scale-100' 
                : 'text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
             }`}
           >
             <Eye size={12} aria-hidden="true" /> Preview
           </button>
           <button 
             role="tab"
             aria-selected={view === 'code'}
             aria-controls={`panel-code-${block.id}`}
             onClick={() => setView('code')}
             className={`flex items-center gap-2 px-5 py-2 text-[9px] font-black rounded-[14px] transition-all uppercase italic tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
               view === 'code' 
                ? 'bg-white dark:bg-white/10 shadow-lg text-teal-700 dark:text-teal-400 scale-100' 
                : 'text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
             }`}
           >
             <Code2 size={12} aria-hidden="true" /> Source
           </button>
        </div>
      </header>

      {/* Logic Matrix Viewport */}
      <div className="relative flex-1 min-h-[380px] flex flex-col bg-slate-50 dark:bg-[#050505] overflow-hidden group/viewport">
        {view === 'preview' ? (
          <div 
            id={`panel-preview-${block.id}`}
            role="tabpanel"
            className="flex-1 p-10 flex items-center justify-center overflow-hidden"
          >
             {/* Scaled Render */}
             <div className="w-full scale-[0.45] md:scale-[0.5] lg:scale-[0.55] origin-center pointer-events-none transform transition-all duration-700 group-hover/viewport:scale-[0.6]" dangerouslySetInnerHTML={{ __html: block.code }} />
          </div>
        ) : (
          <div 
            id={`panel-code-${block.id}`}
            role="tabpanel"
            tabIndex={0}
            className="flex-1 p-10 bg-[#010101] overflow-auto scrollbar-hide focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500 outline-none relative"
          >
            {isHighlighting ? (
              /* High-Fidelity Skeleton Pulse */
              <div className="space-y-4 animate-pulse pt-2" aria-hidden="true">
                {codeMetadata.map((meta, idx) => (
                  <div 
                    key={idx} 
                    className="flex" 
                    style={{ paddingLeft: `${meta.indent * 4}px` }}
                  >
                    <div 
                      className={`h-2 rounded-full ${idx % 4 === 0 ? 'bg-teal-500/20' : 'bg-white/10'}`} 
                      style={{ width: `${meta.length}%` }} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <pre className="language-markup m-0 p-0 bg-transparent h-full relative selection:bg-teal-500/30">
                <code 
                  className="language-markup block font-mono text-[10px] sm:text-[11px] leading-relaxed whitespace-pre-wrap dark:text-slate-300" 
                  dangerouslySetInnerHTML={{ __html: highlightedCode }} 
                />
              </pre>
            )}
            
            {/* Real-time Scanning Effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-teal-500/20 shadow-[0_0_20px_#14b8a6] animate-scan pointer-events-none" aria-hidden="true"></div>
          </div>
        )}

        {/* Global Interaction Controls */}
        <div className="absolute bottom-10 right-10 flex items-center gap-5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 z-20">
          <div className="relative">
            {showCopyTooltip && (
              <div 
                role="tooltip" 
                className="absolute -top-14 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest border border-teal-500/30 rounded-2xl shadow-2xl z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-200"
              >
                {copied ? 'Copied!' : 'Copy Code'}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black border-r border-b border-teal-500/30 rotate-45 -mt-[6px]"></div>
              </div>
            )}
            <button 
              onClick={handleCopy}
              onMouseEnter={handleMouseEnterCopy}
              onMouseLeave={() => setShowCopyTooltip(false)}
              className="w-14 h-14 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center hover:text-teal-600 hover:scale-110 active:scale-95 transition-all text-slate-800 dark:text-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              aria-label={`Copy code for ${block.name}`}
            >
              {copied ? <Check size={22} className="text-emerald-600 dark:text-emerald-500" /> : <Copy size={22} />}
            </button>
          </div>
          
          <div className="relative">
             {showAddTooltip && (
              <div role="tooltip" className="absolute -top-14 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 rounded-2xl shadow-2xl z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-200">
                Add to Project
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black border-r border-b border-emerald-500/30 rotate-45 -mt-[6px]"></div>
              </div>
            )}
            <button 
              onClick={handleAdd}
              onMouseEnter={handleMouseEnterAdd}
              onMouseLeave={() => setShowAddTooltip(false)}
              className="w-14 h-14 bg-teal-600 text-white rounded-3xl shadow-2xl hover:bg-teal-700 hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-teal-500/30 outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Inject ${block.name} into canvas`}
            >
              <Plus size={24} strokeWidth={3} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Telemetry Metadata Footer */}
      <footer className="px-10 py-6 bg-white dark:bg-black/50 border-t dark:border-white/10 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping" aria-hidden="true"></div>
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest italic truncate max-w-[220px]">
              INTENT: {block.description}
            </span>
         </div>
         <div className="flex gap-2">
            {block.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] font-black px-4 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-slate-300 uppercase italic tracking-tighter transition-colors hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-400">
                #{tag}
              </span>
            ))}
         </div>
      </footer>
    </article>
  );
};
