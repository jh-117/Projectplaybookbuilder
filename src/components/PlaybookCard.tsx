import React from 'react';
import { PlaybookEntry } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Share2, Copy, Edit2, Download, Save, X, Lightbulb, ShieldAlert, ArrowRight, Globe, Lock } from 'lucide-react';
import { cn } from './ui/utils';
import { toast } from 'sonner';
import { toPng as htmlToImage } from 'html-to-image';
import jsPDF from 'jspdf';

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

  const handleExport = async () => {
    if (!cardRef.current) {
      toast.error('Failed to export playbook');
      return;
    }

    setIsExporting(true);
    toast.info('Generating PDF...');

    try {
      const element = cardRef.current;
      
      // Create a simple fallback version for export
      const exportElement = element.cloneNode(true) as HTMLElement;
      
      // Apply export-specific styles to replace modern color functions
      const applyExportStyles = (node: HTMLElement) => {
        // Get computed styles
        const computed = window.getComputedStyle(node);
        
        // Common CSS properties that might contain color functions
        const colorProperties = [
          'color',
          'backgroundColor',
          'background',
          'borderColor',
          'borderTopColor',
          'borderRightColor',
          'borderBottomColor',
          'borderLeftColor',
          'outlineColor',
          'textDecorationColor',
          'fill',
          'stroke'
        ];
        
        // Check each property for modern color functions
        colorProperties.forEach(prop => {
          const value = computed.getPropertyValue(prop);
          if (value && (value.includes('oklch') || value.includes('oklab') || value.includes('color-mix'))) {
            // Replace with safe fallback colors
            let fallbackColor = '#000000';
            
            if (prop.includes('background')) {
              // Light backgrounds
              if (value.includes('from-amber-50') || value.includes('bg-amber-50')) {
                fallbackColor = '#fffbeb';
              } else if (value.includes('from-indigo-50') || value.includes('bg-indigo-50')) {
                fallbackColor = '#eef2ff';
              } else if (value.includes('bg-gray-50')) {
                fallbackColor = '#f9fafb';
              } else if (value.includes('bg-emerald-50')) {
                fallbackColor = '#ecfdf5';
              } else if (value.includes('bg-rose-50')) {
                fallbackColor = '#fff1f2';
              } else {
                fallbackColor = '#ffffff';
              }
            } else if (prop === 'color') {
              // Text colors
              if (value.includes('text-indigo-700') || value.includes('text-indigo-600')) {
                fallbackColor = '#4338ca';
              } else if (value.includes('text-emerald')) {
                fallbackColor = '#059669';
              } else if (value.includes('text-amber')) {
                fallbackColor = '#d97706';
              } else if (value.includes('text-rose')) {
                fallbackColor = '#e11d48';
              } else if (value.includes('text-gray-900')) {
                fallbackColor = '#111827';
              } else if (value.includes('text-gray-600')) {
                fallbackColor = '#4b5563';
              } else if (value.includes('text-gray-500')) {
                fallbackColor = '#6b7280';
              } else if (value.includes('text-gray-400')) {
                fallbackColor = '#9ca3af';
              }
            } else if (prop.includes('border')) {
              // Border colors
              fallbackColor = '#e5e7eb'; // gray-200
            }
            
            node.style.setProperty(prop, fallbackColor, 'important');
          }
        });
        
        // Handle gradient backgrounds
        const backgroundImage = computed.getPropertyValue('background-image');
        if (backgroundImage && (backgroundImage.includes('gradient') || backgroundImage.includes('oklch'))) {
          // Replace gradients with solid colors
          let solidColor = '#ffffff';
          
          if (backgroundImage.includes('from-amber-50')) {
            solidColor = '#fffbeb';
          } else if (backgroundImage.includes('from-indigo-50')) {
            solidColor = '#eef2ff';
          } else if (backgroundImage.includes('from-gray-50')) {
            solidColor = '#f9fafb';
          }
          
          node.style.backgroundImage = 'none';
          node.style.backgroundColor = solidColor;
        }
        
        // Process children
        for (const child of Array.from(node.children)) {
          if (child instanceof HTMLElement) {
            applyExportStyles(child);
          }
        }
      };
      
      // Apply styles to all child elements
      applyExportStyles(exportElement);
      
      // Create a container for the export element
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = `${element.offsetWidth}px`;
      container.style.height = `${element.offsetHeight}px`;
      container.style.backgroundColor = '#ffffff';
      container.style.padding = '20px';
      container.style.boxSizing = 'border-box';
      
      // Style the export element itself
      exportElement.style.width = '100%';
      exportElement.style.boxSizing = 'border-box';
      exportElement.style.backgroundColor = '#ffffff';
      exportElement.style.borderRadius = '12px';
      exportElement.style.border = '1px solid #e5e7eb';
      exportElement.style.overflow = 'hidden';
      
      container.appendChild(exportElement);
      document.body.appendChild(container);
      
      // Render with html2canvas
      const canvas = await html2canvas(exportElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: exportElement.offsetWidth,
        height: exportElement.offsetHeight,
      });
      
      // Clean up
      document.body.removeChild(container);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`playbook-${entry.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      
      toast.success('Playbook exported as PDF!');
    } catch (err) {
      console.error('Failed to export:', err);
      toast.error('Failed to export playbook. Please try again.');
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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg" />

      <Card ref={cardRef} className="relative overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/50 rounded-xl bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Top Status Bar - Using simple RGB colors for export compatibility */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]" />

        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-gray-100 bg-white">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                 <Badge variant="outline" className="text-[#4338ca] border-[#e0e7ff] bg-[#eef2ff]/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
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
                      className="bg-[#059669] hover:bg-[#047857] text-white shadow-sm transition-all"
                      onClick={() => onStatusChange?.('Approved')}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  
                  {!isEditing ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="text-gray-600 hover:text-[#4338ca] hover:border-[#c7d2fe]">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                  ) : (
                      <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={handleCancel} className="text-gray-500">
                            Cancel
                          </Button>
                          <Button size="sm" className="bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-sm" onClick={handleSave}>
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
                      className="text-3xl font-extrabold text-gray-900 w-full border-b border-gray-200 focus:border-[#4338ca] focus:outline-none bg-transparent placeholder:text-gray-300 transition-colors"
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
             <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e0e7ff]" />
             <div className="pl-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  What Happened
                </h3>
                {isEditing ? (
                  <textarea 
                      className="w-full min-h-[120px] p-4 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[#4338ca]/20 focus:border-[#4338ca] outline-none resize-y text-base leading-relaxed"
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
            <div className="group/card bg-[#fffbeb] p-6 rounded-2xl border border-[#fef3c7]/50 shadow-sm hover:shadow-md transition-all">
               <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#fef3c7] text-[#d97706] rounded-lg shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-[#92400e] mb-2">Root Cause Analysis</h3>
                    {isEditing ? (
                      <textarea 
                          className="w-full bg-white/80 p-3 border border-[#fde68a]/50 rounded-lg text-[#92400e] focus:ring-2 focus:ring-[#d97706]/20 outline-none text-sm min-h-[100px]"
                          value={editedEntry.rootCause}
                          onChange={e => setEditedEntry({...editedEntry, rootCause: e.target.value})}
                      />
                    ) : (
                      <p className="text-[#92400e]/80 leading-relaxed text-sm">{entry.rootCause}</p>
                    )}
                  </div>
               </div>
            </div>

            <div className="group/card bg-[#eef2ff] p-6 rounded-2xl border border-[#e0e7ff]/50 shadow-sm hover:shadow-md transition-all">
               <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#e0e7ff] text-[#4f46e5] rounded-lg shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-[#3730a3] mb-2">Strategic Recommendation</h3>
                     {isEditing ? (
                      <textarea 
                          className="w-full bg-white/80 p-3 border border-[#c7d2fe]/50 rounded-lg text-[#3730a3] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none text-sm min-h-[100px]"
                          value={editedEntry.recommendation}
                          onChange={e => setEditedEntry({...editedEntry, recommendation: e.target.value})}
                      />
                    ) : (
                      <p className="text-[#3730a3]/80 leading-relaxed text-sm">{entry.recommendation}</p>
                    )}
                  </div>
               </div>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            {/* DO List */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b-2 border-[#d1fae5]">
                <div className="p-1.5 bg-[#d1fae5] rounded-full text-[#059669]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#065f46]">Recommended Actions</h3>
              </div>
              <ul className="space-y-3">
                {entry.doList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-2 shrink-0 group-hover/item:scale-125 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

             {/* DON'T List */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b-2 border-[#ffe4e6]">
                <div className="p-1.5 bg-[#ffe4e6] rounded-full text-[#e11d48]">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#be123c]">Avoid These Pitfalls</h3>
              </div>
              <ul className="space-y-3">
                {entry.dontList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] mt-2 shrink-0 group-hover/item:scale-125 transition-transform" />
                    <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Prevention Checklist */}
          <section className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              Prevention Protocol
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {entry.preventionChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-[#e0e7ff] transition-all cursor-default">
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
                  : "bg-[#0d9488] hover:bg-[#0f766e] text-white"}
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
                "text-gray-500 hover:text-[#4338ca] hover:bg-[#eef2ff] transition-all",
                copySuccess && "text-[#059669] bg-[#d1fae5]"
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
              className="text-gray-500 hover:text-[#d97706] hover:bg-[#fffbeb]"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-[#4338ca] border-[#e0e7ff] hover:bg-[#eef2ff]"
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
  );
};