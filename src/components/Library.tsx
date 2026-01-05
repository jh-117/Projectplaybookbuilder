import React, { useState } from 'react';
import { PlaybookEntry, Industry, INDUSTRIES, CATEGORIES } from '../types';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, Filter, X, ArrowRight } from 'lucide-react';

interface Props {
  entries: PlaybookEntry[];
  currentIndustry: Industry;
  onViewEntry: (entry: PlaybookEntry) => void;
}

export const Library: React.FC<Props> = ({ entries, currentIndustry, onViewEntry }) => {
  const [search, setSearch] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [customIndustry, setCustomIndustry] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const publishedEntries = entries.filter(entry => entry.isPublished);

  const filteredEntries = publishedEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(search.toLowerCase()) ||
                          entry.summary.toLowerCase().includes(search.toLowerCase());

    const activeIndustry = filterIndustry === 'Other' ? customIndustry : filterIndustry;
    const matchesIndustry = filterIndustry === 'All' || entry.industry.toLowerCase() === activeIndustry.toLowerCase();

    const activeCategory = filterCategory === 'Other' ? customCategory : filterCategory;
    const matchesCategory = filterCategory === 'All' || entry.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesIndustry && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(publishedEntries.map(e => e.category)));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Knowledge Library</h1>
          <p className="text-gray-500 text-lg">Browse and search standardized playbooks across industries.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 space-y-4 md:space-y-0 md:flex gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">Search</label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors w-4 h-4" />
            <Input 
              placeholder="Search by keywords..." 
              className="pl-10 h-10 border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:w-56 space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">Industry</label>
          <Select value={filterIndustry} onValueChange={(v) => { setFilterIndustry(v); setCustomIndustry(''); }}>
            <SelectTrigger className="h-10 border-gray-200 bg-white focus:bg-white">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="All">All Industries</SelectItem>
              {INDUSTRIES.map(i => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
              <SelectItem value="Other">Other (specify)</SelectItem>
            </SelectContent>
          </Select>
          {filterIndustry === 'Other' && (
            <Input
              placeholder="Enter industry..."
              className="h-9 border-gray-200 bg-gray-50/50 focus:bg-white text-sm"
              value={customIndustry}
              onChange={(e) => setCustomIndustry(e.target.value)}
            />
          )}
        </div>

        <div className="w-full md:w-56 space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">Category</label>
          <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v); setCustomCategory(''); }}>
            <SelectTrigger className="h-10 border-gray-200 bg-white focus:bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="All">All Categories</SelectItem>
              {CATEGORIES.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
              <SelectItem value="Other">Other (specify)</SelectItem>
            </SelectContent>
          </Select>
          {filterCategory === 'Other' && (
            <Input
              placeholder="Enter category..."
              className="h-9 border-gray-200 bg-gray-50/50 focus:bg-white text-sm"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}
        </div>
        
        <Button
          variant="ghost"
          onClick={() => {
            setSearch('');
            setFilterIndustry('All');
            setFilterCategory('All');
            setCustomIndustry('');
            setCustomCategory('');
          }}
          className="h-10 px-4 text-gray-500 hover:text-red-500 hover:bg-red-50"
        >
          <X className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.length === 0 ? (
           <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
             <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
               <Filter className="w-8 h-8 text-gray-300" />
             </div>
             <h3 className="text-lg font-medium text-gray-900">No results found</h3>
             <p className="text-gray-500 mt-1">Try adjusting your search or filters to find what you're looking for.</p>
           </div>
        ) : (
          filteredEntries.map(entry => (
            <div 
              key={entry.id}
              onClick={() => onViewEntry(entry)}
              className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                <ArrowRight className="w-5 h-5 text-indigo-500" />
              </div>

              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                  entry.industry === currentIndustry ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {entry.industry}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                   entry.status === 'Human Approved' ? 'text-teal-700 bg-teal-50' : 'text-amber-700 bg-amber-50'
                }`}>
                  {entry.status}
                </span>
              </div>
              
              <div className="flex-1">
                 <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {entry.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-6 leading-relaxed">
                  {entry.summary}
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-medium text-gray-400 mt-auto">
                <span className="bg-gray-50 px-2 py-1 rounded text-gray-500">{entry.category}</span>
                <span>{new Date(entry.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
