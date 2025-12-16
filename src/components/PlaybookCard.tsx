import React from 'react';
import { PlaybookEntry } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { cn } from './ui/utils';
import { toast } from 'sonner';
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
  Lock,
  ExternalLink,
  Calendar,
  User,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  X as XIcon,
  ChevronRight,
  BookOpen,
  Eye
} from 'lucide-react';

interface Props {
  entry: PlaybookEntry;
  onEdit?: () => void;
  onStatusChange?: (status: PlaybookEntry['status']) => void;
  onSave?: (entry: PlaybookEntry) => void;
  onPublishToggle?: (isPublished: boolean) => void;
  readOnly?: boolean;
}

export const PlaybookCard: React.FC<Props> = ({
  entry,
  onEdit,
  onStatusChange,
  onSave,
  onPublishToggle,
  readOnly = false
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedEntry, setEditedEntry] = React.useState(entry);
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isEditing) setEditedEntry(entry);
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
      console.error('Error sharing:', err);
      toast.error('Failed to share playbook');
    }
  };

  const handleExport = async () => {
    if (!cardRef.current) {
      toast.error('Failed to export playbook');
      return;
    }

    setIsExporting(true);
    toast.loading('Preparing PDF…');

    try {
      const clonedHTML = cardRef.current.outerHTML;

      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = '210mm';
      iframe.style.height = '297mm';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error('Cannot access iframe document');

      // Collect styles
      const styleSheets = Array.from(document.styleSheets);
      let allStyles = '';
      styleSheets.forEach((sheet) => {
        try {
          if (sheet.href) {
            allStyles += `<link rel="stylesheet" href="${sheet.href}">`;
          } else if (sheet.cssRules) {
            const rules = Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
            allStyles += `<style>${rules}</style>`;
          }
        } catch (e) {
          console.warn('Cannot access stylesheet:', e);
        }
      });

      const printCSS = `
        <style>
          @media print {
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body { margin: 0; padding: 20px; }
            button { display: none !important; }
            .print-hide { display: none !important; }
            .print-show { display: block !important; }
            .print-page-break { page-break-before: always; }
          }
        </style>
      `;

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

      await new Promise(resolve => setTimeout(resolve, 500));

      // UX: only reliable signal
      window.onafterprint = () => {
        toast.success('PDF ready. Check your saved location!');
        setIsExporting(false);
        window.onafterprint = null;
        document.body.removeChild(iframe);
      };

      iframe.contentWindow?.print();

    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Failed to open print dialog');
      setIsExporting(false);
    }
  };

  const handlePublishToggle = () => {
    const newPublishStatus = !entry.isPublished;
    onPublishToggle?.(newPublishStatus);
    toast.success(newPublishStatus ? 'Playbook published to library!' : 'Playbook unpublished from library');
  };

  // Helper function for editing text areas
  const renderEditableSection = (
    title: string,
    content: string,
    icon: React.ReactNode,
    field: keyof PlaybookEntry,
    isTextArea = false
  ) => {
    if (isEditing) {
      return (
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {icon}
            {title}
          </label>
          {isTextArea ? (
            <textarea
              className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
              value={editedEntry[field] as string}
              onChange={e => setEditedEntry({...editedEntry, [field]: e.target.value})}
              placeholder={`Enter ${title.toLowerCase()}...`}
            />
          ) : (
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={editedEntry[field] as string}
              onChange={e => setEditedEntry({...editedEntry, [field]: e.target.value})}
              placeholder={`Enter ${title.toLowerCase()}...`}
            />
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <p className="text-gray-600 whitespace-pre-wrap">{content}</p>
      </div>
    );
  };

  return (
    <div className="group relative">
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
                    <Calendar className="w-3 h-3" />
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

          {/* Main Content Section */}
          <div className="p-6 md:p-8 space-y-8">
            {/* What Happened Section */}
            <div className="space-y-4">
              {renderEditableSection(
                "What Happened",
                entry.summary,
                <AlertTriangle className="w-4 h-4 text-amber-600" />,
                'summary',
                true
              )}
            </div>

            {/* Root Cause Analysis */}
            <div className="space-y-4">
              {renderEditableSection(
                "Root Cause Analysis",
                entry.rootCause,
                <Target className="w-4 h-4 text-indigo-600" />,
                'rootCause',
                true
              )}
            </div>

            {/* Strategic Recommendation */}
            <div className="space-y-4">
              {renderEditableSection(
                "Strategic Recommendation",
                entry.recommendation,
                <Lightbulb className="w-4 h-4 text-amber-600" />,
                'recommendation',
                true
              )}
            </div>

            {/* Do & Don't Lists Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recommended Actions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    Recommended Actions
                  </h3>
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    {entry.doList.length} items
                  </span>
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    {editedEntry.doList.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-2 py-1 rounded-full mt-1">
                          {index + 1}
                        </span>
                        <input
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          value={item}
                          onChange={e => {
                            const newList = [...editedEntry.doList];
                            newList[index] = e.target.value;
                            setEditedEntry({...editedEntry, doList: newList});
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-600"
                          onClick={() => {
                            const newList = editedEntry.doList.filter((_, i) => i !== index);
                            setEditedEntry({...editedEntry, doList: newList});
                          }}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      onClick={() => setEditedEntry({
                        ...editedEntry,
                        doList: [...editedEntry.doList, '']
                      })}
                    >
                      + Add Action
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {entry.doList.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Pitfalls to Avoid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Avoid These Pitfalls
                  </h3>
                  <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {entry.dontList.length} items
                  </span>
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    {editedEntry.dontList.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded-full mt-1">
                          {index + 1}
                        </span>
                        <input
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          value={item}
                          onChange={e => {
                            const newList = [...editedEntry.dontList];
                            newList[index] = e.target.value;
                            setEditedEntry({...editedEntry, dontList: newList});
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-600"
                          onClick={() => {
                            const newList = editedEntry.dontList.filter((_, i) => i !== index);
                            setEditedEntry({...editedEntry, dontList: newList});
                          }}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => setEditedEntry({
                        ...editedEntry,
                        dontList: [...editedEntry.dontList, '']
                      })}
                    >
                      + Add Pitfall
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {entry.dontList.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                          <XIcon className="w-3 h-3 text-red-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Prevention Protocol */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-indigo-600" />
                    Prevention Protocol
                  </h3>
                  <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    {entry.preventionChecklist.length} items
                  </span>
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    {editedEntry.preventionChecklist.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-bold text-indigo-600">{index + 1}</span>
                        </div>
                        <input
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          value={item}
                          onChange={e => {
                            const newList = [...editedEntry.preventionChecklist];
                            newList[index] = e.target.value;
                            setEditedEntry({...editedEntry, preventionChecklist: newList});
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-600"
                          onClick={() => {
                            const newList = editedEntry.preventionChecklist.filter((_, i) => i !== index);
                            setEditedEntry({...editedEntry, preventionChecklist: newList});
                          }}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                      onClick={() => setEditedEntry({
                        ...editedEntry,
                        preventionChecklist: [...editedEntry.preventionChecklist, '']
                      })}
                    >
                      + Add Prevention Item
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {entry.preventionChecklist.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-bold text-indigo-600">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50/50 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {editedEntry.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-3 py-1">
                      <input
                        className="text-xs bg-transparent border-none focus:outline-none min-w-[60px]"
                        value={tag}
                        onChange={e => {
                          const newTags = [...editedEntry.tags];
                          newTags[index] = e.target.value;
                          setEditedEntry({...editedEntry, tags: newTags});
                        }}
                      />
                      <button
                        onClick={() => {
                          const newTags = editedEntry.tags.filter((_, i) => i !== index);
                          setEditedEntry({...editedEntry, tags: newTags});
                        }}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-gray-500 border-dashed"
                    onClick={() => setEditedEntry({
                      ...editedEntry,
                      tags: [...editedEntry.tags, '']
                    })}
                  >
                    + Add Tag
                  </Button>
                </div>
              ) : (
                <>
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-end">
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
              <div className="flex gap-2">
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
                <div className="flex flex-col items-start">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                    onClick={handleExport}
                    disabled={isExporting}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isExporting ? 'Exporting…' : 'Export'}
                  </Button>
                  <span className="text-xs text-gray-400 mt-1">
                    After clicking Export, choose "Save as PDF" in the print dialog.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};