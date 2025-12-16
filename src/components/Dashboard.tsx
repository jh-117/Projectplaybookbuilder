import React, { useState } from 'react';
import { PlaybookEntry, Industry } from '../types';
import { PlaybookCard } from './PlaybookCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Sparkles, Clock, ArrowRight, TrendingUp, ShieldCheck, Filter } from 'lucide-react';
import { cn } from './ui/utils';

interface Props {
  industry: Industry;
  entries: PlaybookEntry[];
  onViewEntry: (entry: PlaybookEntry) => void;
  onNewEntry: () => void;
}

const MOCK_SUGGESTIONS: Partial<PlaybookEntry>[] = [
  {
    id: 'sugg-1',
    title: 'Cloud Migration Rollback Protocol',
    category: 'Technical Issue',
    summary: 'Standard procedure for reverting cloud infrastructure changes when critical errors are detected during deployment windows.',
    industry: 'IT & Technology',
    status: 'Approved',
    lastUpdated: Date.now() - 100000000,
    tags: ['Cloud', 'DevOps', 'Emergency'],
    rootCause: 'Lack of automated rollback testing',
    recommendation: 'Implement automated canary deployments',
    doList: ['Test rollback scripts', 'Monitor error rates'],
    dontList: ['Deploy on Fridays', 'Ignore alerts'],
    preventionChecklist: ['Check logs', 'Notify stakeholders']
  },
  {
    id: 'sugg-2',
    title: 'Compliance Audit Preparation',
    category: 'Compliance',
    summary: 'Best practices for preparing for annual financial audits to reduce findings and team stress levels.',
    industry: 'Finance & Banking',
    status: 'Approved',
    lastUpdated: Date.now() - 200000000,
    tags: ['Audit', 'Finance', 'Compliance'],
    rootCause: 'Scattered documentation',
    recommendation: 'Centralize audit trail evidence',
    doList: ['Maintain daily logs', 'Review access monthly'],
    dontList: ['Wait until audit week', 'Share passwords'],
    preventionChecklist: ['Update policy docs', 'Conduct mock audit']
  }
];

export const Dashboard: React.FC<Props> = ({ industry, entries, onViewEntry, onNewEntry }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const suggestions = MOCK_SUGGESTIONS.filter(s => s.industry === industry || !s.industry);
  const displaySuggestions = suggestions.length > 0 ? suggestions : MOCK_SUGGESTIONS;
  const recentEntries = entries.slice(0, 5);

  const allSearchableEntries = [...entries, ...displaySuggestions.map(s => s as PlaybookEntry)];

  const searchResults = searchTerm.trim()
    ? allSearchableEntries.filter(entry =>
        entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const showSearchResults = searchTerm.trim().length > 0;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" />
        
        <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-sm font-medium animate-in fade-in slide-in-from-top-4">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{industry} Hub Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Turn hindsight into <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-cyan-200">foresight.</span>
            </h1>
            <p className="text-lg text-indigo-100/80 max-w-lg mx-auto">
              Capture critical lessons, generate standardized playbooks instantly, and build a smarter organization.
            </p>
          </div>
          
          <div className="w-full max-w-xl relative group/search">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="h-5 w-5 text-indigo-300 group-focus-within/search:text-indigo-500 transition-colors" />
            </div>
            <Input
              placeholder="Search playbooks, lessons, or tags..."
              className="w-full pl-12 py-6 bg-white/10 border-indigo-400/30 text-white placeholder:text-indigo-200/50 rounded-2xl focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 focus:ring-0 shadow-lg backdrop-blur-sm transition-all text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-20">
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {searchResults.slice(0, 10).map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => {
                          onViewEntry(entry);
                          setSearchTerm('');
                        }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                              {entry.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{entry.summary}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
                                {entry.industry}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 uppercase">
                                {entry.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Filter className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No results found for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-4">
            <Button 
              onClick={onNewEntry} 
              className="bg-white hover:bg-gray-50 text-indigo-600 font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-base"
            >
              Start New Entry
            </Button>
          </div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
            </div>
            <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700">View All</Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {displaySuggestions.map((entry) => (
              <div 
                key={entry.id}
                onClick={() => onViewEntry(entry as PlaybookEntry)}
                className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-indigo-500" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {entry.category}
                  </span>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                      {entry.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2">
                  {entry.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your Activity</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {recentEntries.length === 0 ? (
              <div className="p-10 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">No recent activity</h3>
                <p className="text-sm text-gray-500 mt-1 mb-6">Start capturing your first lesson learned.</p>
                <Button onClick={onNewEntry} variant="outline" size="sm">Create Entry</Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                 {recentEntries.map((entry) => (
                    <div 
                      key={entry.id}
                      onClick={() => onViewEntry(entry)}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-2 h-2 mt-2 rounded-full shrink-0",
                          entry.status === 'Approved' ? 'bg-teal-500' : 
                          entry.status === 'Needs Edit' ? 'bg-amber-500' : 'bg-gray-300'
                        )} />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                            {entry.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">{entry.category}</p>
                        </div>
                        
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                          entry.status === 'Approved' ? 'bg-teal-50 text-teal-700' : 
                          entry.status === 'Needs Edit' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-700'
                        )}>
                          {entry.status}
                        </span>
                      </div>
                    </div>
                 ))}
                 <div className="p-3 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">View All Activity</span>
                 </div>
              </div>
            )}
          </div>
          
          {/* Mini Stats or Info Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-indigo-200" />
              <h3 className="font-bold text-lg">Pro Tip</h3>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed mb-4">
              Approved playbooks are 40% more likely to be reused by other teams. Make sure to complete the "Prevention Checklist" section.
            </p>
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
               <div className="w-2/3 h-full bg-white/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
