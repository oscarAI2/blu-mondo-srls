
import React, { useState } from 'react';
import { X, Rocket, ShieldCheck, FileCode, CheckCircle2, Globe, Clock, Sparkles, UploadCloud } from 'lucide-react';

interface PublishModalProps {
  onClose: () => void;
  componentCode: string;
}

export const PublishModal: React.FC<PublishModalProps> = ({ onClose, componentCode }) => {
  const [step, setStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-[#080808] rounded-[3rem] border-4 border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col">
        {/* Progress Header */}
        <div className="p-8 border-b dark:border-white/5 flex items-center justify-between bg-white dark:bg-black/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-500/30">
              <Rocket size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black italic tracking-tighter uppercase">Ship to Registry</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">1-Minute Publishing Protocol</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl hover:bg-slate-200 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 flex-1 overflow-y-auto scrollbar-hide">
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Component Name</label>
                  <input type="text" placeholder="e.g. Neural_Dock_v2" className="w-full px-6 py-4 bg-slate-100 dark:bg-white/5 border-2 border-transparent focus:border-teal-500/30 rounded-2xl text-xs font-bold outline-none uppercase tracking-tighter" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                  <select className="w-full px-6 py-4 bg-slate-100 dark:bg-white/5 border-2 border-transparent focus:border-teal-500/30 rounded-2xl text-xs font-bold outline-none uppercase tracking-tighter appearance-none">
                    <option>Hero</option>
                    <option>DashboardPro</option>
                    <option>Visuals</option>
                  </select>
                </div>
              </div>

              <div className="p-6 bg-teal-500/5 border border-teal-500/10 rounded-[2rem] flex items-start gap-4">
                <div className="p-3 bg-teal-500/20 rounded-xl">
                  <ShieldCheck size={20} className="text-teal-600" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.1em] mb-1">Quality Guidelines</h4>
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase">
                    We follow the <span className="text-teal-600">shadcn/ui pattern</span>. Ensure your code is modular, uses HSL variables, and supports dark mode.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Implementation Preview</label>
                <div className="aspect-video bg-slate-950 rounded-[2.5rem] p-6 overflow-hidden border border-white/5">
                  <pre className="text-[9px] font-mono text-teal-300 leading-relaxed">{componentCode.substring(0, 400)}...</pre>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-5 bg-teal-600 text-white rounded-[2rem] font-black uppercase italic tracking-[0.2em] shadow-2xl shadow-teal-600/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                PROCEED TO SHIP <Clock size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-teal-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                  <UploadCloud size={40} className="text-teal-500" />
                </div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Final Verification</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest max-w-sm mx-auto">Deploying to the Community Registry in high-performance mode.</p>
              </div>

              <div className="space-y-3">
                 {['Separation of Props', 'HSL Variable Sync', 'Radix Primitives', 'Responsive Checks'].map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-100 dark:bg-white/5 rounded-2xl">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{t}</span>
                       <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                 ))}
              </div>

              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full py-5 bg-black dark:bg-teal-500 text-white rounded-[2rem] font-black uppercase italic tracking-[0.2em] shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                {isPublishing ? (
                  <>OPTIMIZING_ARTIFACTS <Sparkles className="animate-spin" size={18} /></>
                ) : (
                  <>DEPLOY COMPONENT NOW <Globe size={18} /></>
                )}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <div className="w-32 h-32 bg-emerald-500 rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40">
                <CheckCircle2 size={64} className="text-white" />
              </div>
              <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">POSTED_SUCCESSFULLY</h3>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest max-w-md mx-auto mb-10 leading-relaxed">
                Your component is now <span className="text-teal-500 italic">ON_REVIEW</span>. It will be live on the community registry within minutes.
              </p>
              <button 
                onClick={onClose}
                className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase italic tracking-[0.2em] hover:scale-105 transition-all"
              >
                BACK TO CANVAS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
