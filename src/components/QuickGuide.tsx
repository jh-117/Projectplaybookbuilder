import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { 
    Sparkles, 
    Library, 
    FolderOpen, 
    Search, 
    Share2, 
    CheckCircle2, 
    ArrowRight, 
    ArrowDown, 
    Briefcase, 
    FileText, 
    X 
} from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate?: (view: 'dashboard' | 'library' | 'my-entries' | 'new') => void; 
}

const StepIcon: React.FC<{ children: React.ReactNode, color: string, Icon: React.ElementType }> = ({ children, color, Icon }) => (
    <div className={`flex flex-col items-center text-center p-6 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl border-4 ${color} transition-all shadow-xl h-full`}>
        <div className={`mb-4 rounded-full p-4 md:p-5 bg-black/50 border-2 ${color}/50`}>
            <Icon className="w-10 h-10 md:w-16 md:h-16 text-white" />
        </div>
        {children}
    </div>
);

export const QuickGuide: React.FC<Props> = ({ open, onClose, onNavigate }) => {
  const handleQuickAccess = (view: 'dashboard' | 'library' | 'my-entries') => {
    if (onNavigate) {
      onNavigate(view);
    }
    onClose(); 
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* FIXES:
         1. Added 'bg-gray-900' as a solid fallback color.
         2. Changed gradient to 'from-black via-gray-900 to-black' (colors that definitely exist).
         3. 'sm:max-w-4xl' & 'h-[90vh]' fixes the scrolling/layout issue.
         4. '[&>button]:hidden' hides the default close button.
      */}
      <DialogContent className="w-[95vw] sm:max-w-4xl h-[90vh] p-0 flex flex-col gap-0 bg-gray-900 bg-gradient-to-br from-black via-gray-900 to-black border-2 border-gray-700 overflow-hidden [&>button]:hidden">
        
        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto relative p-6 md:p-8">
          
          {/* Custom Sticky Close Button */}
          <div className="sticky top-0 right-0 z-50 flex justify-end pointer-events-none mb-4 -mt-2">
              <button
                onClick={onClose}
                className="pointer-events-auto rounded-full p-2 bg-gray-900/90 backdrop-blur hover:bg-gray-700 border-2 border-gray-600 hover:border-cyan-500 transition-all shadow-lg"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>
          </div>

          <DialogHeader className="flex-shrink-0 pb-6 -mt-12 text-left">
            <DialogTitle className="flex items-center gap-3 text-2xl md:text-3xl text-white font-extrabold">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
              Quick Start Guide
            </DialogTitle>
            <DialogDescription className="text-md text-gray-300 ml-1">
              Follow these 4 simple steps to build your playbook.
            </DialogDescription>
          </DialogHeader>

          {/* Main Content Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto relative mt-4">
            
            {/* Step 1 */}
            <StepIcon color="border-cyan-500" Icon={Briefcase}>
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">1</div>
              <h3 className="font-bold text-white text-xl md:text-2xl mb-1">Choose Industry</h3>
            </StepIcon>

            <ArrowRight className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-10 h-10 text-gray-500 z-10" />
            <ArrowDown className="md:hidden w-8 h-8 text-gray-500 mx-auto" />

            {/* Step 2 */}
            <StepIcon color="border-emerald-500" Icon={FileText}>
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">2</div>
              <h3 className="font-bold text-white text-xl md:text-2xl mb-1">Create Entry</h3>
              <p className="text-sm md:text-base text-gray-200">Name + Summary</p>
            </StepIcon>

            <div className="hidden md:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 justify-around px-20 pointer-events-none">
              <ArrowDown className="w-10 h-10 text-gray-500" />
              <ArrowDown className="w-10 h-10 text-gray-500" />
            </div>
            <ArrowDown className="md:hidden w-8 h-8 text-gray-500 mx-auto" />

            {/* Step 3 */}
            <StepIcon color="border-blue-500" Icon={Sparkles}>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">3</div>
              <h3 className="font-bold text-white text-xl md:text-2xl mb-1">Generate AI</h3>
              <p className="text-sm md:text-base text-gray-200">Auto-analyze</p>
            </StepIcon>

            <ArrowRight className="hidden md:block absolute bottom-1/4 left-1/2 -translate-x-1/2 w-10 h-10 text-gray-500 z-10" />
            <ArrowDown className="md:hidden w-8 h-8 text-gray-500 mx-auto" />
            
            {/* Step 4 */}
            <StepIcon color="border-green-500" Icon={CheckCircle2}>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">4</div>
              <h3 className="font-bold text-white text-xl md:text-2xl mb-1">Save & Share</h3>
              <p className="text-sm md:text-base text-gray-200">Edit anytime</p>
            </StepIcon>
          </div>

          {/* Quick Access Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="font-bold text-white mb-6 text-center text-xl md:text-2xl">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <button onClick={() => handleQuickAccess('dashboard')} className="flex flex-col items-center p-4 bg-gray-900/50 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500/50 transition-all cursor-pointer shadow-lg">
                <Search className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mb-2" />
                <span className="text-sm font-bold text-white">Search</span>
              </button>
              <button onClick={() => handleQuickAccess('library')} className="flex flex-col items-center p-4 bg-gray-900/50 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500/50 transition-all cursor-pointer shadow-lg">
                <Library className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mb-2" />
                <span className="text-sm font-bold text-white">Library</span>
              </button>
              <button onClick={() => handleQuickAccess('my-entries')} className="flex flex-col items-center p-4 bg-gray-900/50 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500/50 transition-all cursor-pointer shadow-lg">
                <FolderOpen className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mb-2" />
                <span className="text-sm font-bold text-white">My Entries</span>
              </button>
              <div className="flex flex-col items-center p-4 bg-black/20 rounded-2xl border-2 border-gray-700 opacity-40">
                <Share2 className="w-8 h-8 md:w-10 md:h-10 text-gray-500 mb-2" />
                <span className="text-sm font-bold text-gray-500">Export</span>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-8 mb-4 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-2xl p-5 max-w-3xl mx-auto shadow-xl border-2 border-orange-500/30">
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-1 text-base">Pro Tip</h3>
                <p className="text-sm text-gray-200 font-medium">
                  Be specific in your summaries to help the AI generate more relevant tasks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};