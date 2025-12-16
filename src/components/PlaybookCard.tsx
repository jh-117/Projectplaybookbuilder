import React from 'react';
import { PlaybookEntry } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { cn } from './ui/utils';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Share2,
  Copy,
  Edit2,
  Download,
  Save,
  X,
  Lightbulb,
  ShieldAlert,
  ArrowRight,
  Globe,
  Lock
} from 'lucide-react';

interface Props {
  entry: PlaybookEntry;
  onEdit?: () => void;
  onStatusChange?: (status: PlaybookEntry['status']) => void;
  onSave?: (entry: PlaybookEntry) => void;
  onPublishToggle?: (isPublished: boolean) => void;
  readOnly?: boolean;
}

export const PlaybookCard: React.FC<Props> = ({ entry, onEdit, onStatusChange, onSave, onPublishToggle, readOnly = false }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedEntry, setEditedEntry] = React.useState(entry);
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Update internal state when prop changes, unless currently editing
  React.useEffect(() => {
    if (!isEditing) {
      setEditedEntry(entry);
    }
  }, [entry, isEditing]);

  const statusColors = {
    'Draft': 'bg-gray-100 text-gray-700 border-gray-200',
    'Needs Edit': 'bg-amber-50 text-amber-700 border-amber-200',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  const handleSave = () => {
    onSave?.(editedEntry);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedEntry(entry);
  };

  const formatPlaybookText = () => {
    return `# ${entry.title}

**Industry:** ${entry.industry}
**Category:** ${entry.category}
**Status:** ${entry.status}
**Last Updated:** ${new Date(entry.lastUpdated).toLocaleDateString()}

## What Happened
${entry.summary}

## Root Cause Analysis
${entry.rootCause}

## Strategic Recommendation
${entry.recommendation}

## Recommended Actions
${entry.doList.map((item, i) => `${i + 1}. ${item}`).join('\n')}

## Avoid These Pitfalls
${entry.dontList.map((item, i) => `${i + 1}. ${item}`).join('\n')}

## Prevention Protocol
${entry.preventionChecklist.map((item, i) => `☐ ${item}`).join('\n')}

---
Tags: ${entry.tags.join(', ')}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatPlaybookText());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      toast.success('Playbook copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Playbook: ${entry.title}`,
      text: formatPlaybookText(),
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Playbook shared successfully!');
      } else {
        await navigator.clipboard.writeText(formatPlaybookText());
        toast.info('Content copied to clipboard (Share not supported on this device)');
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        return;
      }

      try {
        await navigator.clipboard.writeText(formatPlaybookText());
        toast.info('Content copied to clipboard');
      } catch (clipboardErr) {
        console.error('Error sharing:', err);
        toast.error('Failed to share playbook');
      }
    }
  };

 const handleExport = () => {
  toast.loading("Preparing PDF…")

  window.onafterprint = () => {
    toast.success("PDF saved. Check your desktop or chosen folder.")
    window.onafterprint = null
  }
      return;
    }

    setIsExporting(true);
    toast.info('Opening print dialog...');

    try {
      // Clone the preview DOM using outerHTML
      const clonedHTML = cardRef.current.outerHTML;

      // Create a hidden iframe
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = '210mm'; // A4 width
      iframe.style.height = '297mm'; // A4 height
      document.body.appendChild(iframe);

      // Wait for iframe to be ready
      await new Promise<void>((resolve) => {
        iframe.onload = () => resolve();
        if (!iframe.contentDocument) {
          iframe.onload = () => resolve();
        } else {
          resolve();
        }
      });

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error('Failed to access iframe document');
      }

      // Collect all stylesheets from the main document
      const styleSheets = Array.from(document.styleSheets);
      let allStyles = '';

      styleSheets.forEach((sheet) => {
        try {
          if (sheet.href) {
            // External stylesheet - create link tag
            allStyles += `<link rel="stylesheet" href="${sheet.href}">`;
          } else if (sheet.cssRules) {
            // Inline stylesheet - extract rules
            const rules = Array.from(sheet.cssRules)
              .map((rule) => rule.cssText)
              .join('\n');
            allStyles += `<style>${rules}</style>`;
          }
        } catch (e) {
          // Skip stylesheets we can't access (CORS)
          console.warn('Could not access stylesheet:', e);
        }
      });

      // Add print CSS for exact color printing
      const printCSS = `
        <style>
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 20px;
            }
            button {
              display: none !important;
            }
          }
        </style>
      `;

      // Build the complete HTML document for the iframe
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Playbook - ${entry.title}</title>
            ${allStyles}
            ${printCSS}
          </head>
          <body>
            ${clonedHTML}
          </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for styles and images to load
      await new Promise(resolve => setTimeout(resolve, 500));

      // Trigger print dialog
      iframe.contentWindow?.print();

      // Clean up: remove iframe after print dialog closes
      // Use a longer delay to ensure print dialog has time to render
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);

      toast.success('Print dialog opened!');
    } catch (err) {
      console.error('Failed to export:', err);
      toast.error('Failed to open print dialog');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePublishToggle = () => {
    const newPublishStatus = !entry.isPublished;
    onPublishToggle?.(newPublishStatus);
    toast.success(newPublishStatus ? 'Playbook published to library!' : 'Playbook unpublished from library');
  };

  return (
    <div className="group relative">
      {/* Decorative background blur */}
      <div className={cn(
        "gradient-ignore absolute -inset-0.5 rounded-2xl transition duration-500 blur-lg",
        isExporting ? "bg-white opacity-0" : "bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20"
      )} />

      <div ref={cardRef}>
        <Card className="relative overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/50 rounded-xl bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Top Status Bar */}
        <div className={cn(
          "h-1.5 w-full",
          isExporting ? "bg-indigo-600" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        )} />

        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-gray-100 bg-white">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                 <Badge variant="outline" className="text-indigo-700 border-indigo-100 bg-indigo-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {entry.industry}
                </Badge>
                <Badge className={cn("border px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-none", statusColors[entry.status])}>
                  {entry.status}
                </Badge>
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                  Last updated {new Date(entry.lastUpdated).toLocaleDateString()}
                </span>
              </div>

              {!readOnly && (
                <div className="flex items-center gap-2 self-start md:self-auto">
                  {entry.status !== 'Approved' && !isEditing && (
                    <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                      onClick={() => onStatusChange?.('Approved')}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  
                  {!isEditing ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="text-gray-600 hover:text-indigo-600 hover:border-indigo-200">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                  ) : (
                      <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={handleCancel} className="text-gray-500">
                            Cancel
                          </Button>
                          <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm" onClick={handleSave}>
                            Save Changes
                          </Button>
                      </div>
                  )}
                </div>
              )}
            </div>

            <div>
               {isEditing ? (
                   <input 
                      className="text-3xl font-extrabold text-gray-900 w-full border-b border-gray-200 focus:border-indigo-500 focus:outline-none bg-transparent placeholder:text-gray-300 transition-colors"
                      value={editedEntry.title}
                      onChange={e => setEditedEntry({...editedEntry, title: e.target.value})}
                      placeholder="Enter playbook title..."
                   />
              ) : (
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{entry.title}</h1>
              )}
              <div className="mt-2 flex items-center gap-2 text-gray-500 font-medium">
                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase tracking-wider text-gray-600">{entry.category}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8 bg-white">
          {/* Executive Summary */}
          <section className="relative">
             <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-100" />
             <div className="pl-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  What Happened
                </h3>
                {isEditing ? (
                  <textarea 
                      className="w-full min-h-[120px] p-4 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-y text-base leading-relaxed"
                      value={editedEntry.summary}
                      onChange={e => setEditedEntry({...editedEntry, summary: e.target.value})}
                  />
                ) : (
                  <p className="text-lg text-gray-600 leading-relaxed font-light">{entry.summary}</p>
                )}
             </div>
          </section>

          {/* Root Cause & Fix Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group/card bg-gradient-to-br from-amber-50 to-[#FFFBF0] p-6 rounded-2xl border border-amber-100/50 shadow-sm hover:shadow-md transition-all">
               <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-amber-900 mb-2">Root Cause Analysis</h3>
                    {isEditing ? (
                      <textarea 
                          className="w-full bg-white/80 p-3 border border-amber-200/50 rounded-lg text-amber-900 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm min-h-[100px]"
                          value={editedEntry.rootCause}
                          onChange={e => setEditedEntry({...editedEntry, rootCause: e.target.value})}
                      />
                    ) : (
                      <p className="text-amber-800/80 leading-relaxed text-sm">{entry.rootCause}</p>
                    )}
                  </div>
               </div>
            </div>

            <div className="group/card bg-gradient-to-br from-indigo-50 to-[#F5F3FF] p-6 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all">
               <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-indigo-900 mb-2">Strategic Recommendation</h3>
                     {isEditing ? (
                      <textarea 
                          className="w-full bg-white/80 p-3 border border-indigo-200/50 rounded-lg text-indigo-900 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm min-h-[100px]"
                          value={editedEntry.recommendation}
                          onChange={e => setEditedEntry({...editedEntry, recommendation: e.target.value})}
                      />
                    ) : (
                      <p className="text-indigo-800/80 leading-relaxed text-sm">{entry.recommendation}</p>
                    )}
                  </div>
               </div>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            {/* DO List */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b-2 border-emerald-100">
                <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-emerald-900">Recommended Actions</h3>
              </div>
              <ul className="space-y-3">
                {entry.doList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 group-hover/item:scale-125 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

             {/* DON'T List */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b-2 border-rose-100">
                <div className="p-1.5 bg-rose-100 rounded-full text-rose-600">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-rose-900">Avoid These Pitfalls</h3>
              </div>
              <ul className="space-y-3">
                {entry.dontList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0 group-hover/item:scale-125 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Prevention Checklist */}
          <section className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              Prevention Protocol
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {entry.preventionChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-indigo-200 transition-all cursor-default">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 text-white flex items-center justify-center">
                    {/* Placeholder for checked state logic if interactive later */}
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50/50 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {entry.tags.map(tag => (
              <span key={tag} className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            {!readOnly && onPublishToggle && (
              <Button
                variant={entry.isPublished ? "outline" : "default"}
                size="sm"
                className={entry.isPublished
                  ? "text-gray-600 border-gray-300 hover:bg-gray-50"
                  : "bg-teal-600 hover:bg-teal-700 text-white"}
                onClick={handlePublishToggle}
              >
                {entry.isPublished ? (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Unpublish</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Publish to Library</span>
                  </>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all",
                copySuccess && "text-emerald-600 bg-emerald-50"
              )}
              onClick={handleCopy}
            >
              {copySuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-amber-600 hover:bg-amber-50"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </div>
        </Card>
      </div>
    </div>
  );
};