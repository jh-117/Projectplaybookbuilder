import { useState, useEffect } from 'react';
import { PlaybookEntry, Industry, INDUSTRIES } from '../types';

export function useStore() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(() => {
    const saved = localStorage.getItem('pp_selected_industry');
    return saved ? (saved as Industry) : null;
  });

  const [entries, setEntries] = useState<PlaybookEntry[]>(() => {
    const saved = localStorage.getItem('pp_entries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (selectedIndustry) {
      localStorage.setItem('pp_selected_industry', selectedIndustry);
    } else {
      localStorage.removeItem('pp_selected_industry');
    }
  }, [selectedIndustry]);

  useEffect(() => {
    localStorage.setItem('pp_entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: PlaybookEntry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const updateEntry = (id: string, updates: Partial<PlaybookEntry>) => {
    setEntries((prev) => prev.map(e => e.id === id ? { ...e, ...updates, lastUpdated: Date.now() } : e));
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter(e => e.id !== id));
  };

  return {
    selectedIndustry,
    setSelectedIndustry,
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    INDUSTRIES
  };
}
