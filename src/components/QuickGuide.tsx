import React from 'react';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from './ui/dialog';
import { Button } from './ui/button';
import { Sparkles, Library, FolderOpen, Search, Share2, CheckCircle2, ArrowRight, ArrowDown, Briefcase } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

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
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 border border-slate-700 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-2xl shadow-2xl p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
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
              <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-blue-900/90 to-blue-800/80 rounded-3xl border-2 border-blue-600/70 hover:border-blue-500 transition-all backdrop-blur-md shadow-xl">
                <div className="text-7xl mb-4">💼</div>
                <div className="text-3xl font-bold text-blue-300 mb-2">1</div>
                <h3 className="font-bold text-white text-xl mb-1">Choose Industry</h3>
              </div>

              <ArrowRight className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-8 text-blue-400" />

              <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-purple-900/90 to-purple-800/80 rounded-3xl border-2 border-purple-600/70 hover:border-purple-500 transition-all backdrop-blur-md shadow-xl">
                <div className="text-7xl mb-4">📁</div>
                <div className="text-3xl font-bold text-purple-300 mb-2">2</div>
                <h3 className="font-bold text-white text-xl mb-1">Create Entry</h3>
                <p className="text-sm text-slate-200">Name + Summary</p>
              </div>

              <ArrowDown className="md:hidden w-8 h-8 text-blue-400 mx-auto" />
              <div className="hidden md:block absolute left-1/4 top-1/2 translate-y-4 w-0 h-16">
                <ArrowDown className="w-8 h-8 text-blue-400" />
              </div>
              <div className="hidden md:block absolute right-1/4 top-1/2 translate-y-4 w-0 h-16">
                <ArrowDown className="w-8 h-8 text-blue-400" />
              </div>

              <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-indigo-900/90 to-indigo-800/80 rounded-3xl border-2 border-indigo-600/70 hover:border-indigo-500 transition-all backdrop-blur-md shadow-xl">
                <div className="text-7xl mb-4">✨</div>
                <div className="text-3xl font-bold text-indigo-300 mb-2">3</div>
                <h3 className="font-bold text-white text-xl mb-1">Generate AI</h3>
                <p className="text-sm text-slate-200">Auto-analyze</p>
              </div>

              <ArrowRight className="hidden md:block absolute bottom-1/4 left-1/2 -translate-x-1/2 w-8 h-8 text-blue-400" />

              <div className="relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-green-900/90 to-green-800/80 rounded-3xl border-2 border-green-600/70 hover:border-green-500 transition-all backdrop-blur-md shadow-xl">
                <div className="text-7xl mb-4">✅</div>
                <div className="text-3xl font-bold text-green-300 mb-2">4</div>
                <h3 className="font-bold text-white text-xl mb-1">Save & Share</h3>
                <p className="text-sm text-slate-200">Edit anytime</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-600">
              <h3 className="font-bold text-white mb-4 text-center text-lg">Quick Access</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                <button
                  onClick={() => handleQuickAccess('dashboard')}
                  className="flex flex-col items-center text-center p-6 bg-slate-800/90 rounded-2xl hover:bg-slate-700/90 border border-slate-600 hover:border-blue-500 transition-all cursor-pointer backdrop-blur-md shadow-lg"
                >
                  <Search className="w-10 h-10 text-blue-300 mb-2" />
                  <span className="text-sm font-semibold text-white">Search</span>
                </button>
                <button
                  onClick={() => handleQuickAccess('library')}
                  className="flex flex-col items-center text-center p-6 bg-slate-800/90 rounded-2xl hover:bg-slate-700/90 border border-slate-600 hover:border-blue-500 transition-all cursor-pointer backdrop-blur-md shadow-lg"
                >
                  <Library className="w-10 h-10 text-blue-300 mb-2" />
                  <span className="text-sm font-semibold text-white">Library</span>
                </button>
                <button
                  onClick={() => handleQuickAccess('my-entries')}
                  className="flex flex-col items-center text-center p-6 bg-slate-800/90 rounded-2xl hover:bg-slate-700/90 border border-slate-600 hover:border-blue-500 transition-all cursor-pointer backdrop-blur-md shadow-lg"
                >
                  <FolderOpen className="w-10 h-10 text-blue-300 mb-2" />
                  <span className="text-sm font-semibold text-white">My Entries</span>
                </button>
                <div className="flex flex-col items-center text-center p-6 bg-slate-800/60 rounded-2xl border border-slate-700 opacity-50 backdrop-blur-md shadow-lg">
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

          <div className="flex justify-center pt-4 border-t border-slate-600 flex-shrink-0 bg-slate-900/80 backdrop-blur-md">
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
              Got it! Let's Start
            </Button>
          </div>

          <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none bg-slate-800/80 p-2 hover:bg-slate-700/80">
            <XIcon className="w-4 h-4 text-white" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
