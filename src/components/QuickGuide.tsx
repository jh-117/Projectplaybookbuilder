import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Sparkles, Library, FolderOpen, Search, Share2, CheckCircle2, ArrowRight, ArrowDown, Briefcase, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate?: (view: 'dashboard' | 'library' | 'my-entries' | 'new') => void;
}

export const QuickGuide: React.FC<Props> = ({ open, onClose, onNavigate }) => {
  const handleQuickAccess = (view: 'dashboard' | 'library' | 'my-entries') => {
    if (onNavigate) {
      onNavigate(view);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-950 border-2 border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-cyan-500 transition-all z-50"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-2xl text-white">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            Quick Start Guide
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-300">
            Get started in 4 simple steps
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 py-6 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto relative">
            <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-cyan-500 hover:border-cyan-400 transition-all shadow-xl">
              <div className="text-9xl mb-4">💼</div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">1</div>
              <h3 className="font-bold text-white text-2xl mb-1">Choose Industry</h3>
            </div>

            <ArrowRight className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-10 h-10 text-gray-300" />

            <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-emerald-500 hover:border-emerald-400 transition-all shadow-xl">
              <div className="text-9xl mb-4">📁</div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">2</div>
              <h3 className="font-bold text-white text-2xl mb-1">Create Entry</h3>
              <p className="text-base text-gray-200">Name + Summary</p>
            </div>

            <ArrowDown className="md:hidden w-10 h-10 text-gray-300 mx-auto" />
            <div className="hidden md:block absolute left-1/4 top-1/2 translate-y-4 w-0 h-16">
              <ArrowDown className="w-10 h-10 text-gray-300" />
            </div>
            <div className="hidden md:block absolute right-1/4 top-1/2 translate-y-4 w-0 h-16">
              <ArrowDown className="w-10 h-10 text-gray-300" />
            </div>

            <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-blue-500 hover:border-blue-400 transition-all shadow-xl">
              <div className="text-9xl mb-4">✨</div>
              <div className="text-4xl font-bold text-blue-400 mb-2">3</div>
              <h3 className="font-bold text-white text-2xl mb-1">Generate AI</h3>
              <p className="text-base text-gray-200">Auto-analyze</p>
            </div>

            <ArrowRight className="hidden md:block absolute bottom-1/4 left-1/2 -translate-x-1/2 w-10 h-10 text-gray-300" />

            <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-green-500 hover:border-green-400 transition-all shadow-xl">
              <div className="text-9xl mb-4">✅</div>
              <div className="text-4xl font-bold text-green-400 mb-2">4</div>
              <h3 className="font-bold text-white text-2xl mb-1">Save & Share</h3>
              <p className="text-base text-gray-200">Edit anytime</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-600">
            <h3 className="font-bold text-white mb-6 text-center text-xl">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <button
                onClick={() => handleQuickAccess('dashboard')}
                className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
              >
                <Search className="w-14 h-14 text-cyan-400 mb-3" />
                <span className="text-base font-bold text-white">Search</span>
              </button>
              <button
                onClick={() => handleQuickAccess('library')}
                className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
              >
                <Library className="w-14 h-14 text-cyan-400 mb-3" />
                <span className="text-base font-bold text-white">Library</span>
              </button>
              <button
                onClick={() => handleQuickAccess('my-entries')}
                className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 border-2 border-cyan-500 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
              >
                <FolderOpen className="w-14 h-14 text-cyan-400 mb-3" />
                <span className="text-base font-bold text-white">My Entries</span>
              </button>
              <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-2xl border-2 border-gray-700 opacity-40">
                <Share2 className="w-14 h-14 text-gray-500 mb-3" />
                <span className="text-base font-bold text-gray-400">Export</span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 max-w-3xl mx-auto shadow-xl border-2 border-orange-400">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-white flex-shrink-0 mt-1" />
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
