import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Sparkles, FileText, Library, FolderOpen, Search, Share2, CheckCircle2 } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const QuickGuide: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            Quick Start Guide
          </DialogTitle>
          <DialogDescription className="text-base">
            Learn how to capture lessons learned and create AI-powered playbooks in minutes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Select Your Industry
                </h3>
                <p className="text-sm text-gray-600">
                  Choose your industry on the landing page. This helps tailor recommendations and AI-generated content to your specific field. You can change it anytime from the header.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Create a New Entry
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Click "Start New Entry" from the dashboard. Fill in the incident details:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <strong>Project Name</strong>: What was the initiative? (minimum 3 characters)</li>
                  <li>• <strong>Summary</strong>: What happened? Be specific (minimum 20 characters)</li>
                  <li>• <strong>Category</strong>: Select from predefined options or create custom</li>
                  <li>• <strong>Root Cause & Impact</strong>: Optional, AI will analyze if left blank</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-violet-50 rounded-xl border border-violet-100">
              <div className="flex-shrink-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  Generate with AI
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Click "Generate Playbook with AI" and watch the magic happen! The AI will:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Analyze your incident and identify root causes</li>
                  <li>• Generate actionable recommendations</li>
                  <li>• Create Do and Don't lists</li>
                  <li>• Provide a prevention checklist</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Review & Save
                </h3>
                <p className="text-sm text-gray-600">
                  Preview your playbook card, make any edits you want, then save it to your library. You can always edit it later!
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900 mb-3">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm">
                <Search className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Search:</strong> Find playbooks instantly from the dashboard search bar
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Library className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Library:</strong> Browse all published playbooks across industries
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <FolderOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>My Entries:</strong> Manage your personal contributions and drafts
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Share2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Export:</strong> Download playbooks as PDF or copy to clipboard
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Pro Tips
            </h3>
            <ul className="text-sm text-amber-900 space-y-1.5">
              <li>• Be specific in your summaries for better AI-generated recommendations</li>
              <li>• Use the status system: Draft → Needs Edit → Approved to track quality</li>
              <li>• Publish entries to the Library to share knowledge with your team</li>
              <li>• Filter and search the Library to learn from similar incidents</li>
              <li>• Edit any field after generation to customize the playbook</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
            Got it, let's start!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
