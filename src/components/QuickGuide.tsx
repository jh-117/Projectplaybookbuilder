import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Sparkles, Library, FolderOpen, Search, Share2, CheckCircle2, ArrowRight, ArrowDown, Briefcase } from 'lucide-react';

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 border-slate-700">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-2xl text-white">
            <Sparkles className="w-6 h-6 text-blue-400" />
            Quick Start Guide
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-300">
            Get started in 4 simple steps
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 py-6 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto relative">
            <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-3xl border-2 border-blue-600/50 hover:border-blue-500 transition-all backdrop-blur-sm">
              <div className="text-7xl mb-4">💼</div>
              <div className="text-3xl font-bold text-blue-400 mb-2">1</div>
              <h3 className="font-bold text-white text-xl mb-1">Choose Industry</h3>
            </div>

            <ArrowRight className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-8 text-blue-400" />

            <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-3xl border-2 border-purple-600/50 hover:border-purple-500 transition-all backdrop-blur-sm">
              <div className="text-7xl mb-4">📁</div>
              <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
              <h3 className="font-bold text-white text-xl mb-1">Create Entry</h3>
              <p className="text-sm text-slate-300">Name + Summary</p>
            </div>

            <ArrowDown className="md:hidden w-8 h-8 text-blue-400 mx-auto" />
            <div className="hidden md:block absolute left-1/4 top-1/2 translate-y-4 w-0 h-16">
              <ArrowDown className="w-8 h-8 text-blue-400" />
            </div>
            <div className="hidden md:block absolute right-1/4 top-1/2 translate-y-4 w-0 h-16">
              <ArrowDown className="w-8 h-8 text-blue-400" />
            </div>

            <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-indigo-900/50 to-indigo-800/30 rounded-3xl border-2 border-indigo-600/50 hover:border-indigo-500 transition-all backdrop-blur-sm">
              <div className="text-7xl mb-4">✨</div>
              <div className="text-3xl font-bold text-indigo-400 mb-2">3</div>
              <h3 className="font-bold text-white text-xl mb-1">Generate AI</h3>
              <p className="text-sm text-slate-300">Auto-analyze</p>
            </div>

            <ArrowRight className="hidden md:block absolute bottom-1/4 left-1/2 -translate-x-1/2 w-8 h-8 text-blue-400" />

            <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-3xl border-2 border-green-600/50 hover:border-green-500 transition-all backdrop-blur-sm">
              <div className="text-7xl mb-4">✅</div>
              <div className="text-3xl font-bold text-green-400 mb-2">4</div>
              <h3 className="font-bold text-white text-xl mb-1">Save & Share</h3>
              <p className="text-sm text-slate-300">Edit anytime</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <h3 className="font-bold text-white mb-4 text-center text-lg">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <button
                onClick={() => handleQuickAccess('dashboard')}
                className="flex flex-col items-center text-center p-6 bg-slate-800/60 rounded-2xl hover:bg-slate-700/60 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer backdrop-blur-sm"
              >
                <Search className="w-10 h-10 text-blue-400 mb-2" />
                <span className="text-sm font-semibold text-white">Search</span>
              </button>
              <button
                onClick={() => handleQuickAccess('library')}
                className="flex flex-col items-center text-center p-6 bg-slate-800/60 rounded-2xl hover:bg-slate-700/60 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer backdrop-blur-sm"
              >
                <Library className="w-10 h-10 text-blue-400 mb-2" />
                <span className="text-sm font-semibold text-white">Library</span>
              </button>
              <button
                onClick={() => handleQuickAccess('my-entries')}
                className="flex flex-col items-center text-center p-6 bg-slate-800/60 rounded-2xl hover:bg-slate-700/60 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer backdrop-blur-sm"
              >
                <FolderOpen className="w-10 h-10 text-blue-400 mb-2" />
                <span className="text-sm font-semibold text-white">My Entries</span>
              </button>
              <div className="flex flex-col items-center text-center p-6 bg-slate-800/40 rounded-2xl border border-slate-700 opacity-50 backdrop-blur-sm">
                <Share2 className="w-10 h-10 text-slate-500 mb-2" />
                <span className="text-sm font-semibold text-slate-400">Export</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-600 to-amber-500 rounded-2xl p-4 max-w-3xl mx-auto shadow-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-100 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-50 mb-1">Pro Tip</h3>
                <p className="text-sm text-yellow-50">
                  Be specific in summaries → Better AI results → Save time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4 border-t border-slate-700 flex-shrink-0 bg-slate-900/50 backdrop-blur-sm">
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
            Got it! Let's Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
