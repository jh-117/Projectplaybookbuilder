import React, { useState } from 'react';
import { Industry, PlaybookEntry } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Loader2, Wand2, Save, FileText, AlertTriangle, ArrowRight, ChevronRight, Check, Sparkles } from 'lucide-react';
import { PlaybookCard } from './PlaybookCard';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface Props {
  industry: Industry;
  onSave: (entry: PlaybookEntry) => void;
  onCancel: () => void;
}

export const EntryForm: React.FC<Props> = ({ industry, onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errorDialog, setErrorDialog] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: '',
    message: '',
  });

  const [formData, setFormData] = useState({
    title: '',
    category: 'Process Improvement',
    summary: '',
    rootCause: '',
    impact: '',
  });

  const [generatedEntry, setGeneratedEntry] = useState<PlaybookEntry | null>(null);

  const showError = (title: string, message: string) => {
    setErrorDialog({ open: true, title, message });
  };

  const generateCard = async () => {
    if (!formData.title || !formData.summary) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.title.trim().length < 3) {
      showError(
        'Title Too Short',
        'Please provide a more descriptive project title (at least 3 characters).'
      );
      return;
    }

    if (formData.summary.trim().length < 20) {
      showError(
        'Summary Too Short',
        'Please provide a more detailed summary of what happened (at least 20 characters).'
      );
      return;
    }

    const hasOnlyRandomChars = /^[a-z]{1,5}$/i.test(formData.summary.trim());
    if (hasOnlyRandomChars) {
      showError(
        'Invalid Input',
        'Please provide a meaningful description of the incident, not just random characters.'
      );
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-playbook`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          summary: formData.summary,
          rootCause: formData.rootCause,
          impact: formData.impact,
          industry: industry,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate playbook');
      }

      const generatedContent = await response.json();

      const newEntry: PlaybookEntry = {
        id: crypto.randomUUID(),
        dateCreated: Date.now(),
        lastUpdated: Date.now(),
        industry: industry,
        status: 'Draft',
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        rootCause: generatedContent.rootCause,
        impact: generatedContent.impact,
        tags: [industry, formData.category, "AI Generated"],
        recommendation: generatedContent.recommendation,
        doList: generatedContent.doList,
        dontList: generatedContent.dontList,
        preventionChecklist: generatedContent.preventionChecklist,
      };

      setGeneratedEntry(newEntry);
      setShowPreview(true);
      toast.success('Playbook generated successfully!');
    } catch (error) {
      console.error('Error generating playbook:', error);
      showError(
        'Generation Failed',
        error instanceof Error ? error.message : 'Failed to generate playbook. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, label: 'Details', icon: FileText },
    { id: 2, label: 'Analysis', icon: AlertTriangle },
    { id: 3, label: 'Generate', icon: Wand2 },
  ];

  if (loading) {
     return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
           <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-blue-100 animate-pulse" />
              <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin" />
              <Wand2 className="absolute inset-0 m-auto text-blue-600 w-8 h-8 animate-pulse" />
           </div>
           <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">AI is analyzing your input...</h2>
              <p className="text-gray-500">Identifying root causes and generating prevention strategies.</p>
           </div>
           <div className="max-w-md w-full space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                 <Check className="w-4 h-4 text-green-500" />
                 <span>Parsing incident summary</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                 <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                 <span>Matching with industry best practices</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                 <div className="w-4 h-4 rounded-full border border-gray-200" />
                 <span>Drafting playbook card</span>
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      {!showPreview ? (
        <>
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create New Entry</h1>
            <p className="text-gray-500 max-w-lg mx-auto">Capture the details of your lesson learned. Our AI will help structure the solution.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
            {/* Form Header / Progress */}
            <div className="bg-gray-50/50 border-b border-gray-100 p-4 flex justify-between items-center">
               <div className="flex gap-2">
                 <span className="w-3 h-3 rounded-full bg-red-400" />
                 <span className="w-3 h-3 rounded-full bg-yellow-400" />
                 <span className="w-3 h-3 rounded-full bg-green-400" />
               </div>
               <div className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                  Draft Mode
               </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Section 1: Core Info */}
              <div className="space-y-6">
                 <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Incident Details</h3>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Project / Initiative Name <span className="text-red-500">*</span></Label>
                      <Input
                        className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                        placeholder="e.g. Q4 Cloud Migration"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={v => setFormData({...formData, category: v})}
                      >
                        <SelectTrigger className="bg-gray-50/50 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Process Improvement">Process Improvement</SelectItem>
                          <SelectItem value="Risk Management">Risk Management</SelectItem>
                          <SelectItem value="Technical Issue">Technical Issue</SelectItem>
                          <SelectItem value="Communication">Communication</SelectItem>
                          <SelectItem value="Compliance">Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-gray-700">What Happened? (Summary) <span className="text-red-500">*</span></Label>
                    <Textarea
                      className="min-h-[120px] bg-gray-50/50 border-gray-200 focus:bg-white transition-all resize-y"
                      placeholder="Describe the incident in detail. For example: 'During our Q4 cloud migration, we experienced 2 hours of downtime due to misconfigured load balancers...' (minimum 20 characters)"
                      value={formData.summary}
                      onChange={e => setFormData({...formData, summary: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">{formData.summary.length} / 20 characters minimum</p>
                 </div>
              </div>

              {/* Section 2: Analysis (Optional) */}
              <div className="space-y-6 pt-4">
                 <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="font-bold text-gray-900">Initial Analysis (Optional)</h3>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Root Cause</Label>
                      <Textarea 
                        className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                        placeholder="Why did this happen? (Leave blank for AI)"
                        value={formData.rootCause}
                        onChange={e => setFormData({...formData, rootCause: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Impact</Label>
                      <Textarea 
                        className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                        placeholder="What was the effect? (Leave blank for AI)"
                        value={formData.impact}
                        onChange={e => setFormData({...formData, impact: e.target.value})}
                      />
                    </div>
                 </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
                <Button variant="ghost" onClick={onCancel} className="text-gray-500 hover:text-gray-900 sm:w-auto">
                  Cancel
                </Button>
                <Button
                  onClick={generateCard}
                  disabled={loading || !formData.title || !formData.summary}
                  className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700 text-white min-w-[240px] shadow-xl shadow-blue-500/30 rounded-full h-14 text-lg font-semibold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:hover:scale-100 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                  Generate Playbook with AI
                  <Wand2 className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm sticky top-20 z-10">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Preview Generated Card</h2>
              <p className="text-xs text-gray-500">Review and edit before saving to library.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Back to Edit
              </Button>
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20"
                onClick={() => generatedEntry && onSave(generatedEntry)}
              >
                <Save className="w-4 h-4 mr-2" />
                Save to Library
              </Button>
            </div>
          </div>

          {generatedEntry && (
            <PlaybookCard 
              entry={generatedEntry} 
              onStatusChange={(status) => setGeneratedEntry({...generatedEntry, status})}
              onSave={(updated) => setGeneratedEntry(updated)}
            />
          )}
        </div>
      )}

      <AlertDialog open={errorDialog.open} onOpenChange={(open) => setErrorDialog({ ...errorDialog, open })}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-center text-xl font-bold">{errorDialog.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base text-gray-600">
              {errorDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={() => setErrorDialog({ ...errorDialog, open: false })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
