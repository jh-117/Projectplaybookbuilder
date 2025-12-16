import React, { useState } from 'react';
import { Industry, PlaybookEntry } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import {
  Loader2,
  Wand2,
  Save,
  FileText,
  AlertTriangle,
  Check,
  Sparkles,
  X,
} from 'lucide-react';
import { PlaybookCard } from './PlaybookCard';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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
  const [errorDialog, setErrorDialog] = useState({
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

  /* ---------------- VALIDATION ---------------- */
  const isTitleValid = formData.title.trim().length >= 3;
  const isSummaryValid = formData.summary.trim().length >= 20;
  const canGenerate = isTitleValid && isSummaryValid && !loading;

  const showError = (title: string, message: string) =>
    setErrorDialog({ open: true, title, message });

  const generateCard = async () => {
    if (!canGenerate) {
      showError(
        'Missing Information',
        'Please provide a valid title and a detailed summary (at least 20 characters).'
      );
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-playbook`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          summary: formData.summary,
          rootCause: formData.rootCause,
          impact: formData.impact,
          industry,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate playbook');
      }

      const generatedContent = await response.json();

      const newEntry: PlaybookEntry = {
        id: crypto.randomUUID(),
        dateCreated: Date.now(),
        lastUpdated: Date.now(),
        industry,
        status: 'Draft',
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        rootCause: generatedContent.rootCause,
        impact: generatedContent.impact,
        tags: [industry, formData.category, 'AI Generated'],
        recommendation: generatedContent.recommendation,
        doList: generatedContent.doList,
        dontList: generatedContent.dontList,
        preventionChecklist: generatedContent.preventionChecklist,
      };

      setGeneratedEntry(newEntry);
      setShowPreview(true);
      toast.success('Playbook generated successfully!');
    } catch (error) {
      console.error(error);
      showError(
        'Generation Failed',
        error instanceof Error ? error.message : 'Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADING SCREEN ---------------- */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-blue-100 animate-pulse" />
          <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin" />
          <Wand2 className="absolute inset-0 m-auto text-blue-600 w-8 h-8 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">AI is analyzing your input…</h2>
          <p className="text-gray-500">
            Identifying root causes and prevention strategies.
          </p>
        </div>
        <div className="max-w-md w-full space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500" />
            <span>Parsing incident summary</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            <span>Matching industry best practices</span>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- FORM ---------------- */
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!showPreview ? (
        <>
          {/* HEADER */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-extrabold">Create New Entry</h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Capture your lesson learned. AI will help structure the solution.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
            <div className="p-8 space-y-8">
              {/* INCIDENT DETAILS */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold">Incident Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>
                      Project / Initiative Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(v) =>
                        setFormData({ ...formData, category: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Process Improvement">
                          Process Improvement
                        </SelectItem>
                        <SelectItem value="Risk Management">
                          Risk Management
                        </SelectItem>
                        <SelectItem value="Technical Issue">
                          Technical Issue
                        </SelectItem>
                        <SelectItem value="Communication">
                          Communication
                        </SelectItem>
                        <SelectItem value="Compliance">Compliance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    What Happened? (Summary) <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    className="min-h-[120px]"
                    value={formData.summary}
                    onChange={(e) =>
                      setFormData({ ...formData, summary: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    {formData.summary.length} / 20 characters minimum
                  </p>
                </div>
              </div>

              {/* OPTIONAL ANALYSIS */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold">Initial Analysis (Optional)</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Textarea
                    placeholder="Root Cause"
                    value={formData.rootCause}
                    onChange={(e) =>
                      setFormData({ ...formData, rootCause: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Impact"
                    value={formData.impact}
                    onChange={(e) =>
                      setFormData({ ...formData, impact: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* ACTION BAR */}
              <div className="flex justify-between items-center pt-6 border-t">
                <Button variant="ghost" onClick={onCancel}>
                  Cancel
                </Button>

                <Button
                  variant="ghost"
                  onClick={generateCard}
                  disabled={!canGenerate}
                  className="relative isolate
                             bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600
                             hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700
                             text-white min-w-[240px]
                             rounded-full h-14 text-lg font-semibold
                             transition-all hover:scale-105
                             disabled:opacity-80 disabled:cursor-not-allowed
                             group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                   translate-x-[-100%] group-hover:translate-x-[100%]
                                   transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Playbook with AI
                    <Wand2 className="w-5 h-5 ml-2" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        generatedEntry && (
          <PlaybookCard
            entry={generatedEntry}
            onSave={onSave}
            onStatusChange={(status) =>
              setGeneratedEntry({ ...generatedEntry, status })
            }
          />
        )
      )}

      {/* ERROR DIALOG */}
      <AlertDialog
        open={errorDialog.open}
        onOpenChange={(open) =>
          setErrorDialog({ ...errorDialog, open })
        }
      >
        <AlertDialogContent>
          <AlertDialogCancel className="absolute right-4 top-4">
            <X />
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle>{errorDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {errorDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
