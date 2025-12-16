import React, { useState } from 'react';
import { Industry, PlaybookEntry, CATEGORIES } from '../types';
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
    customCategory: '',
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

      const finalCategory = formData.category === 'Other' ? formData.customCategory : formData.category;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: finalCategory,
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
        category: finalCategory,
        summary: formData.summary,
        rootCause: generatedContent.rootCause,
        impact: generatedContent.impact,
        tags: [industry, finalCategory, "AI Generated"],
        recommendation: generatedContent.recommendation,
        doList: generatedContent.doList,
        dontList: generatedContent.dontList,
        preventionChecklist: generatedContent.preventionChecklist,
        isPublished: false,
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
                        onValueChange={v => setFormData({...formData, category: v, customCategory: ''})}
                      >
                        <SelectTrigger className="bg-gray-50/50 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                          <SelectItem value="Other">Other (specify below)</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.category === 'Other' && (
                        <Input
                          className="bg-gray-50/50 border-gray-200 focus:bg-white transition-all mt-2"
                          placeholder="Enter custom category..."
                          value={formData.customCategory}
                          onChange={e => setFormData({...formData, customCategory: e.target.value})}
                        />
                      )}
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

                <div className="relative group/wrapper">
                  {/* Animated glow ring */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 rounded-full opacity-70 group-hover/wrapper:opacity-100 blur-lg group-hover/wrapper:blur-xl transition-all duration-500 animate-pulse"></div>

                  <Button
  onClick={generateCard}
  disabled={loading || !formData.title || !formData.summary || (formData.category === 'Other' && !formData.customCategory)}
  className="
    relative
    bg-white
    hover:bg-gradient-to-r hover:from-blue-600 hover:via-violet-600 hover:to-blue-600
    hover:from-blue-700 hover:via-violet-700 hover:to-blue-700
    text-black
    hover:text-white
    min-w-[280px] h-16 rounded-full
    shadow-2xl shadow-blue-500/50
    text-lg font-bold tracking-wide
    transition-all duration-300
    hover:scale-105 hover:shadow-blue-600/60
    disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed
    group overflow-hidden
    border-2 border-gray-200 hover:border-white/20
  "
>
                    {/* Animated gradient overlay */}
                    <span className="
                      absolute inset-0
                      bg-gradient-to-r from-transparent via-white/30 to-transparent
                      translate-x-[-200%] group-hover:translate-x-[200%]
                      transition-transform duration-1000 ease-in-out
                    "></span>

                    {/* Sparkle particles */}
                    <span className="absolute top-2 left-8 w-1 h-1 bg-white rounded-full animate-ping opacity-75"></span>
                    <span className="absolute bottom-3 right-12 w-1 h-1 bg-white rounded-full animate-ping opacity-75 animation-delay-300"></span>
                    <span className="absolute top-4 right-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>

                    {/* Button content */}
                   <span className="relative z-10 flex items-center justify-center gap-2 text-black group-hover:text-white transition-colors duration-300">
  <Sparkles className="w-5 h-5 animate-pulse group-hover:rotate-12 transition-transform duration-300" />
  <span className="font-extrabold">
    Generate Playbook with AI
  </span>
  <Wand2 className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
</span>
                  </Button>
                </div>
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
              className="bg-blue-600 hover:bg-blue-700 text-black px-8"
            >
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
