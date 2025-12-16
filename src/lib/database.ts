import { supabase } from './supabase';
import { PlaybookEntry } from '../types';

export interface DbPlaybookEntry {
  id: string;
  title: string;
  industry: string;
  status: string;
  date_created: number;
  last_updated: number;
  summary: string;
  root_cause: string;
  impact: string;
  category: string;
  recommendation: string;
  do_list: string[];
  dont_list: string[];
  prevention_checklist: string[];
  tags: string[];
  is_published: boolean;
}

function dbToEntry(db: DbPlaybookEntry): PlaybookEntry {
  return {
    id: db.id,
    title: db.title,
    industry: db.industry,
    status: db.status as any,
    dateCreated: db.date_created,
    lastUpdated: db.last_updated,
    summary: db.summary,
    rootCause: db.root_cause,
    impact: db.impact,
    category: db.category,
    recommendation: db.recommendation,
    doList: db.do_list,
    dontList: db.dont_list,
    preventionChecklist: db.prevention_checklist,
    tags: db.tags,
    isPublished: db.is_published
  };
}

function entryToDb(entry: PlaybookEntry): Omit<DbPlaybookEntry, 'id'> {
  return {
    title: entry.title,
    industry: entry.industry,
    status: entry.status,
    date_created: entry.dateCreated,
    last_updated: entry.lastUpdated,
    summary: entry.summary,
    root_cause: entry.rootCause,
    impact: entry.impact,
    category: entry.category,
    recommendation: entry.recommendation,
    do_list: entry.doList,
    dont_list: entry.dontList,
    prevention_checklist: entry.preventionChecklist,
    tags: entry.tags,
    is_published: entry.isPublished
  };
}

export async function getAllEntries(): Promise<PlaybookEntry[]> {
  const { data, error } = await supabase
    .from('playbook_entries')
    .select('*')
    .order('last_updated', { ascending: false });

  if (error) {
    console.error('Error fetching entries:', error);
    return [];
  }

  return (data || []).map(dbToEntry);
}

export async function getPublishedEntries(): Promise<PlaybookEntry[]> {
  const { data, error } = await supabase
    .from('playbook_entries')
    .select('*')
    .eq('is_published', true)
    .order('last_updated', { ascending: false });

  if (error) {
    console.error('Error fetching published entries:', error);
    return [];
  }

  return (data || []).map(dbToEntry);
}

export async function createEntry(entry: PlaybookEntry): Promise<PlaybookEntry | null> {
  const { data, error } = await supabase
    .from('playbook_entries')
    .insert([entryToDb(entry)])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating entry:', error);
    return null;
  }

  return data ? dbToEntry(data) : null;
}

export async function updateEntry(id: string, updates: Partial<PlaybookEntry>): Promise<PlaybookEntry | null> {
  const dbUpdates: any = {};

  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.summary !== undefined) dbUpdates.summary = updates.summary;
  if (updates.rootCause !== undefined) dbUpdates.root_cause = updates.rootCause;
  if (updates.impact !== undefined) dbUpdates.impact = updates.impact;
  if (updates.category !== undefined) dbUpdates.category = updates.category;
  if (updates.recommendation !== undefined) dbUpdates.recommendation = updates.recommendation;
  if (updates.doList !== undefined) dbUpdates.do_list = updates.doList;
  if (updates.dontList !== undefined) dbUpdates.dont_list = updates.dontList;
  if (updates.preventionChecklist !== undefined) dbUpdates.prevention_checklist = updates.preventionChecklist;
  if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
  if (updates.isPublished !== undefined) dbUpdates.is_published = updates.isPublished;
  if (updates.lastUpdated !== undefined) dbUpdates.last_updated = updates.lastUpdated;

  const { data, error } = await supabase
    .from('playbook_entries')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating entry:', error);
    return null;
  }

  return data ? dbToEntry(data) : null;
}

export async function deleteEntry(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('playbook_entries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting entry:', error);
    return false;
  }

  return true;
}

export async function togglePublishEntry(id: string, isPublished: boolean): Promise<PlaybookEntry | null> {
  return updateEntry(id, { isPublished, lastUpdated: Date.now() });
}
