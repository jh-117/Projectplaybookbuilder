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
}

export const QuickGuide: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            Quick Start Guide
          </DialogTitle>
          <DialogDescription className="text-sm">
            Get started in 4 simple steps
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-6 w-full">
              <div className="flex-1 flex flex-col items-center text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl border-2 border-indigo-200 hover:border-indigo-300 transition-all">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">1</div>
                <h3 className="font-bold text-gray-900 text-lg">Choose Industry</h3>
              </div>

              <ArrowDown className="w-6 h-6 text-gray-400 rotate-0 md:rotate-[-90deg]" />

              <div className="flex-1 flex flex-col items-center text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                  <PlusCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
                <h3 className="font-bold text-gray-900 text-lg">Create Entry</h3>
                <p className="text-xs text-gray-600 mt-1">Name + Summary</p>
              </div>
            </div>

            <ArrowDown className="w-6 h-6 text-gray-400" />

            <div className="flex flex-col md:flex-row items-center gap-6 w-full">
              <div className="flex-1 flex flex-col items-center text-center p-6 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-2xl border-2 border-violet-200 hover:border-violet-300 transition-all">
                <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-violet-600 mb-1">3</div>
                <h3 className="font-bold text-gray-900 text-lg">Generate AI</h3>
                <p className="text-xs text-gray-600 mt-1">Auto-analyze</p>
              </div>

              <ArrowDown className="w-6 h-6 text-gray-400 rotate-0 md:rotate-[-90deg]" />

              <div className="flex-1 flex flex-col items-center text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl border-2 border-teal-200 hover:border-teal-300 transition-all">
                <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-teal-600 mb-1">4</div>
                <h3 className="font-bold text-gray-900 text-lg">Save & Share</h3>
                <p className="text-xs text-gray-600 mt-1">Edit anytime</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-center">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Search className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">Search</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Library className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">Library</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <FolderOpen className="w-8 h-8 text-violet-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">My Entries</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Share2 className="w-8 h-8 text-teal-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">Export</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Pro Tip</h3>
                <p className="text-sm text-amber-900">
                  Be specific in summaries → Better AI results → Save time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4 border-t border-gray-200">
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
            Got it! Let's Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
