import React from 'react';
import {
  // Assuming these are imported from a UI framework like Shadcn/ui
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
// Assuming Button is a custom styled button component
import { Button } from './ui/button'; 
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
    FileText, // Used for 'Create Entry' step
    X 
} from 'lucide-react';

// --- TYPE DEFINITIONS (Based on App.tsx and component needs) ---

interface Props {
  open: boolean;
  onClose: () => void;
  // This type is used by the parent App.tsx to change the view when a quick access button is clicked
  onNavigate?: (view: 'dashboard' | 'library' | 'my-entries' | 'new') => void; 
}

// --- HELPER COMPONENT (For UI Consistency) ---

// Custom component to ensure visual consistency and high contrast for each step card.
const StepIcon: React.FC<{ children: React.ReactNode, color: string, Icon: React.ElementType }> = ({ children, color, Icon }) => (
    <div className={`flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 ${color} transition-all shadow-xl`}>
        {/* Styled icon container for better visual focus */}
        <div className={`mb-4 rounded-full p-6 bg-gray-950/70 border-2 ${color}/50`}>
            <Icon className="w-20 h-20 text-white" />
        </div>
        {children}
    </div>
);

// --- QUICK GUIDE COMPONENT ---

export const QuickGuide: React.FC<Props> = ({ open, onClose, onNavigate }) => {
  const handleQuickAccess = (view: 'dashboard' | 'library' | 'my-entries') => {
    if (onNavigate) {
      // The parent App.tsx handles navigation based on the 'view' argument
      onNavigate(view);
    }
    onClose(); // Close the modal after navigation is initiated
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* Increased contrast/visibility for the modal container itself */}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-950 border-2 border-gray-700">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-3 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-cyan-500 transition-all z-50"
          aria-label="Close"
        >
          <X className="w-8 h-8 text-white" />
        </button>

        {/* Header */}
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-3xl text-white font-extrabold">
            <Sparkles className="w-10 h-10 text-cyan-400" />
            Quick Start Guide
          </DialogTitle>
          <DialogDescription className="text-md text-gray-300">
            Get started in 4 simple steps
          </DialogDescription>
        </DialogHeader>

        {/* Content Body (Steps and Quick Access) */}
        <div className="overflow-y-auto flex-1 py-6 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto relative">
            
            {/* 1. Choose Industry */}
            <StepIcon color="border-cyan-500" Icon={Briefcase}>
              <div className="text-4xl font-bold text-cyan-400 mb-2">1</div>
              <h3 className="font-bold text-white text-2xl mb-1">Choose Industry</h3>
            </StepIcon>

            {/* Flow Arrows: Horizontal (Desktop) / Vertical (Mobile) */}
            <ArrowRight className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-12 h-12 text-gray-300 z-10" />
            <ArrowDown className="md:hidden w-12 h-12 text-gray-300 mx-auto" />

            {/* 2. Create Entry */}
            <StepIcon color="border-emerald-500" Icon={FileText}>
              <div className="text-4xl font-bold text-emerald-400 mb-2">2</div>
              <h3 className="font-bold text-white text-2xl mb-1">Create Entry</h3>
              <p className="text-base text-gray-200">Name + Summary</p>
            </StepIcon>

            {/* Down Arrows connecting rows (Desktop) */}
            <div className="hidden md:block absolute left-1/4 top-[48%] translate-y-4 w-0 h-16 z-10">
              <ArrowDown className="w-12 h-12 text-gray-300" />
            </div>
            <div className="hidden md:block absolute right-1/4 top-[48%] translate-y-4 w-0 h-16 z-10">
              <ArrowDown className="w-12 h-12 text-gray-300" />
            </div>
            <ArrowDown className="md:hidden w-12 h-12 text-gray-300 mx-auto" />

            {/* 3. Generate AI */}
            <StepIcon color="border-blue-500" Icon={Sparkles}>
              <div className="text-4xl font-bold text-blue-400 mb-2">3</div>
              <h3 className="font-bold text-white text-2xl mb-1">Generate AI</h3>
              <p className="text-base text-gray-200">Auto-analyze</p>
            </StepIcon>

            {/* Flow Arrows: Horizontal (Desktop) / Vertical (Mobile) */}
            <ArrowRight className="hidden md:block absolute bottom-1/4 left-1/2 -translate-x-1/2 w-12 h-12 text-gray-300 z-10" />
            <ArrowDown className="md:hidden w-12 h-12 text-gray-300 mx-auto" />
            
            {/* 4. Save & Share */}
            <StepIcon color="border-green-500" Icon={CheckCircle2}>
              <div className="text-4xl font-bold text-green-400 mb-2">4</div>
              <h3 className="font-bold text-white text-2xl mb-1">Save & Share</h3>
              <p className="text-base text-gray-200">Edit anytime</p>
            </StepIcon>
          </div>

          {/* Quick Access Section */}
          <div className="mt-12 pt-6 border-t border-gray-700">
            <h3 className="font-bold text-white mb-6 text-center text-2xl">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {/* Search */}
              <button
                onClick={() => handleQuickAccess('dashboard')}
                className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
              >
                <Search className="w-16 h-16 text-cyan-400 mb-3" />
                <span className="text-base font-bold text-white">Search</span>
              </button>
              {/* Library */}
              <button
                onClick={() => handleQuickAccess('library')}
                className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
              >
                <Library className="w-16 h-16 text-cyan-400 mb-3" />
                <span className="text-base font-bold text-white">Library</span>
              </button>
              {/* My Entries */}
              <button
                onClick={() => handleQuickAccess('my-entries')}
                className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
              >
                <FolderOpen className="w-16 h-16 text-cyan-400 mb-3" />
                <span className="text-base font-bold text-white">My Entries</span>
              </button>
              {/* Export (Disabled for illustrative purposes) */}
              <div className="flex flex-col items-center text-center p-6 bg-gray-900/50 rounded-2xl border-2 border-gray-700 opacity-60 pointer-events-none">
                <Share2 className="w-16 h-16 text-gray-500 mb-3" />
                <span className="text-base font-bold text-gray-400">Export</span>
              </div>
            </div>
          </div>

          {/* Pro Tip Section */}
          <div className="mt-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 max-w-3xl mx-auto shadow-xl border-2 border-orange-400">
            <div className="flex items-start gap-4">
              <Sparkles className="w-10 h-10 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2 text-lg">Pro Tip</h3>
                <p className="text-base text-white font-medium">
                  Be specific in summaries → Better AI results → Save time
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};