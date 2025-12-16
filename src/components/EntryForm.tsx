import React, { useState } from 'react'
import { Industry, PlaybookEntry } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Card } from './ui/card'
import {
  Loader2,
  Wand2,
  Save,
  FileText,
  AlertTriangle,
  Check,
  Sparkles,
  X,
} from 'lucide-react'
import { PlaybookCard } from './PlaybookCard'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface Props {
  industry: Industry
  onSave: (entry: PlaybookEntry) => void
  onCancel: () => void
}

export const EntryForm: React.FC<Props> = ({
  industry,
  onSave,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [errorDialog, setErrorDialog] = useState({
    open: false,
    title: '',
    message: '',
  })

  const [formData, setFormData] = useState({
    title: '',
    category: 'Process Improvement',
    summary: '',
    rootCause: '',
    impact: '',
  })

  const [generatedEntry, setGeneratedEntry] =
    useState<PlaybookEntry | null>(null)

  /** ---------------- VALIDATION ---------------- */
  const isTitleValid = formData.title.trim().length >= 3
  const isSummaryValid = formData.summary.trim().length >= 20
  const canGenerate = isTitleValid && isSummaryValid && !loading

  /** ---------------- HELPERS ---------------- */
  const showError = (title: string, message: string) =>
    setErrorDialog({ open: true, title, message })

  /** ---------------- GENERATE ---------------- */
  const generateCard = async () => {
    if (!canGenerate) return

    setLoading(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-playbook`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            industry,
          }),
        }
      )

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Generation failed')
      }

      const ai = await response.json()

      const entry: PlaybookEntry = {
        id: crypto.randomUUID(),
        dateCreated: Date.now(),
        lastUpdated: Date.now(),
        industry,
        status: 'Draft',
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        rootCause: ai.rootCause,
        impact: ai.impact,
        tags: [industry, formData.category, 'AI Generated'],
        recommendation: ai.recommendation,
        doList: ai.doList,
        dontList: ai.dontList,
        preventionChecklist: ai.preventionChecklist,
      }

      setGeneratedEntry(entry)
      setShowPreview(true)
      toast.success('Playbook generated!')
    } catch (e) {
      showError(
        'Generation Failed',
        e instanceof Error ? e.message : 'Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  /** ---------------- LOADING SCREEN ---------------- */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-blue-100 animate-pulse" />
          <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin" />
          <Wand2 className="absolute inset-0 m-auto w-8 h-8 text-blue-600" />
        </div>
        <p className="text-gray-600">Generating playbook…</p>
      </div>
    )
  }

  /** ---------------- FORM ---------------- */
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {!showPreview ? (
        <Card className="p-8 space-y-10">
          {/* Title */}
          <div>
            <Label>Project / Initiative Name *</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {!isTitleValid && (
              <p className="text-xs text-red-500 mt-1">
                Minimum 3 characters
              </p>
            )}
          </div>

          {/* Category */}
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
            </SelectContent>
          </Select>

          {/* Summary */}
          <div>
            <Label>What Happened? *</Label>
            <Textarea
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.summary.length} / 20 characters
            </p>
          </div>

          {/* Optional */}
          <div className="grid md:grid-cols-2 gap-6">
            <Textarea
              placeholder="Root Cause (optional)"
              value={formData.rootCause}
              onChange={(e) =>
                setFormData({ ...formData, rootCause: e.target.value })
              }
            />
            <Textarea
              placeholder="Impact (optional)"
              value={formData.impact}
              onChange={(e) =>
                setFormData({ ...formData, impact: e.target.value })
              }
            />
          </div>

          {/* ACTION BAR */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>

            <Button
              variant="ghost"
              disabled={!canGenerate}
              onClick={generateCard}
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
        </Card>
      ) : (
        generatedEntry && (
          <PlaybookCard
            entry={generatedEntry}
            onSave={onSave}
            onStatusChange={(s) =>
              setGeneratedEntry({ ...generatedEntry, status: s })
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
          <AlertDialogCancel className="absolute top-4 right-4">
            <X />
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {errorDialog.title}
            </AlertDialogTitle>
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
  )
}
