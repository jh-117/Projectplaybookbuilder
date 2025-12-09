import React, { useState } from 'react';
import { PlaybookEntry, Status } from '../types';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Edit3, CheckCircle2, Trash2, ArrowRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { cn } from './ui/utils';

interface Props {
  entries: PlaybookEntry[];
  onViewEntry: (entry: PlaybookEntry) => void;
  onDeleteEntry: (id: string) => void;
}

export const MyEntries: React.FC<Props> = ({ entries, onViewEntry, onDeleteEntry }) => {
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All');

  const filtered = entries.filter(e => filterStatus === 'All' || e.status === filterStatus);

  const StatusIcon = ({ status }: { status: Status }) => {
    switch (status) {
      case 'Draft': return <FileText className="w-4 h-4 text-gray-500" />;
      case 'Needs Edit': return <Edit3 className="w-4 h-4 text-amber-500" />;
      case 'Approved': return <CheckCircle2 className="w-4 h-4 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Entries</h1>
        <p className="text-gray-500 text-lg">Manage and review your personal contributions.</p>
      </div>

      <Tabs defaultValue="All" className="w-full" onValueChange={(v) => setFilterStatus(v as any)}>
        <TabsList className="bg-white border border-gray-200 p-1 rounded-xl h-auto w-full md:w-auto grid grid-cols-4 md:inline-flex">
          {['All', 'Draft', 'Needs Edit', 'Approved'].map((tab) => (
             <TabsTrigger 
                key={tab} 
                value={tab} 
                className="rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-none px-4 py-2 text-sm font-medium transition-all"
             >
                {tab === 'Needs Edit' ? 'Review' : tab}
             </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
               <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-900 font-medium">No entries found matching this filter.</p>
            <p className="text-gray-500 text-sm mt-1">Create a new entry to get started.</p>
          </div>
        ) : (
          filtered.map(entry => (
            <div 
              key={entry.id}
              className="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div 
                className="flex-1 cursor-pointer" 
                onClick={() => onViewEntry(entry)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    entry.status === 'Approved' ? 'bg-teal-50 text-teal-700' : 
                    entry.status === 'Needs Edit' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                  )}>
                    <StatusIcon status={entry.status} />
                    {entry.status}
                  </div>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-xs text-gray-500 font-medium">{new Date(entry.lastUpdated).toLocaleDateString()}</span>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">{entry.industry}</span>
                </div>
                
                <div className="flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
                  <h3 className="font-bold text-gray-900 text-lg">{entry.title}</h3>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-500" />
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{entry.summary}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                 <Button variant="outline" size="sm" onClick={() => onViewEntry(entry)} className="w-full md:w-auto hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">
                   View / Edit
                 </Button>
                 
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "<span className="font-semibold text-gray-900">{entry.title}</span>". This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteEntry(entry.id)} className="bg-red-600 hover:bg-red-700">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
