import { useState, useEffect } from 'react';
import { PlaybookEntry, Industry, INDUSTRIES } from '../types';
import * as db from '../lib/database';

export function useStore() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(() => {
    const saved = localStorage.getItem('pp_selected_industry');
    return saved ? (saved as Industry) : null;
  });

  const [entries, setEntries] = useState<PlaybookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedIndustry) {
      localStorage.setItem('pp_selected_industry', selectedIndustry);
    } else {
      localStorage.removeItem('pp_selected_industry');
    }
  }, [selectedIndustry]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setIsLoading(true);
    const loadedEntries = await db.getAllEntries();
    setEntries(loadedEntries);
    setIsLoading(false);
  };

  const addEntry = async (entry: PlaybookEntry) => {
    const created = await db.createEntry(entry);
    if (created) {
      setEntries((prev) => [created, ...prev]);
    }
    return created;
  };

  const updateEntry = async (id: string, updates: Partial<PlaybookEntry>) => {
    const updated = await db.updateEntry(id, { ...updates, lastUpdated: Date.now() });
    if (updated) {
      setEntries((prev) => prev.map(e => e.id === id ? updated : e));
    }
    return updated;
  };

  const deleteEntry = async (id: string) => {
    const success = await db.deleteEntry(id);
    if (success) {
      setEntries((prev) => prev.filter(e => e.id !== id));
    }
    return success;
  };

  const togglePublish = async (id: string, isPublished: boolean) => {
    const updated = await db.togglePublishEntry(id, isPublished);
    if (updated) {
      setEntries((prev) => prev.map(e => e.id === id ? updated : e));
    }
    return updated;
  };

  return {
    selectedIndustry,
    setSelectedIndustry,
    entries,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    togglePublish,
    INDUSTRIES
  };
}
