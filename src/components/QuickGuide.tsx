import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Sparkles, FileText, Library, FolderOpen, Search, Share2, CheckCircle2, ArrowDown, Edit, PlusCircle, Briefcase } from 'lucide-react';

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
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Quick Start Guide
          </DialogTitle>
          <DialogDescription className="text-xs">
            Get started in 4 simple steps
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 py-4 px-1">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="flex-1 flex flex-col items-center text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-all min-h-[140px]">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-indigo-600 mb-0.5">1</div>
                <h3 className="font-bold text-gray-900 text-base">Choose Industry</h3>
              </div>

              <ArrowDown className="w-5 h-5 text-gray-400 rotate-0 md:rotate-[-90deg] flex-shrink-0" />

              <div className="flex-1 flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all min-h-[140px]">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <PlusCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-blue-600 mb-0.5">2</div>
                <h3 className="font-bold text-gray-900 text-base">Create Entry</h3>
                <p className="text-xs text-gray-600 mt-0.5">Name + Summary</p>
              </div>
            </div>

            <ArrowDown className="w-5 h-5 text-gray-400" />

            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="flex-1 flex flex-col items-center text-center p-4 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl border-2 border-violet-200 hover:border-violet-300 transition-all min-h-[140px]">
                <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-violet-600 mb-0.5">3</div>
                <h3 className="font-bold text-gray-900 text-base">Generate AI</h3>
                <p className="text-xs text-gray-600 mt-0.5">Auto-analyze</p>
              </div>

              <ArrowDown className="w-5 h-5 text-gray-400 rotate-0 md:rotate-[-90deg] flex-shrink-0" />

              <div className="flex-1 flex flex-col items-center text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl border-2 border-teal-200 hover:border-teal-300 transition-all min-h-[140px]">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-teal-600 mb-0.5">4</div>
                <h3 className="font-bold text-gray-900 text-base">Save & Share</h3>
                <p className="text-xs text-gray-600 mt-0.5">Edit anytime</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3 text-center text-sm">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => handleQuickAccess('dashboard')}
                className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 border border-transparent transition-all cursor-pointer"
              >
                <Search className="w-7 h-7 text-indigo-600 mb-1.5" />
                <span className="text-xs font-semibold text-gray-700">Search</span>
              </button>
              <button
                onClick={() => handleQuickAccess('library')}
                className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all cursor-pointer"
              >
                <Library className="w-7 h-7 text-blue-600 mb-1.5" />
                <span className="text-xs font-semibold text-gray-700">Library</span>
              </button>
              <button
                onClick={() => handleQuickAccess('my-entries')}
                className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg hover:bg-violet-50 hover:border-violet-200 border border-transparent transition-all cursor-pointer"
              >
                <FolderOpen className="w-7 h-7 text-violet-600 mb-1.5" />
                <span className="text-xs font-semibold text-gray-700">My Entries</span>
              </button>
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg opacity-60">
                <Share2 className="w-7 h-7 text-teal-600 mb-1.5" />
                <span className="text-xs font-semibold text-gray-700">Export</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1 text-sm">Pro Tip</h3>
                <p className="text-xs text-amber-900">
                  Be specific in summaries → Better AI results → Save time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-3 border-t border-gray-200 flex-shrink-0">
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-5 text-base rounded-lg shadow-lg hover:shadow-xl transition-all">
            Got it! Let's Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
