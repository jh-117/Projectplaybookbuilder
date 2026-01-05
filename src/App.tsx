import React, { useState, useEffect } from 'react';
import { useStore } from './hooks/useStore';
import { IndustryLanding } from './components/IndustryLanding';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { EntryForm } from './components/EntryForm';
import { Library } from './components/Library';
import { MyEntries } from './components/MyEntries';
import { PlaybookCard } from './components/PlaybookCard';
import PrivacyPolicy from './components/PrivacyPolicy';
import { QuickGuide } from './components/QuickGuide';
import { MOCK_LIBRARY } from './data/mockLibrary';
import { PlaybookEntry, Industry } from './types';
import { Button } from './components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Toaster } from 'sonner';

type View = 'landing' | 'dashboard' | 'new' | 'library' | 'my-entries' | 'view-entry' | 'privacy-policy';

export default function App() {
  const {
    selectedIndustry,
    setSelectedIndustry,
    entries,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    togglePublish
  } = useStore();

  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedEntry, setSelectedEntry] = useState<PlaybookEntry | null>(null);
  const [previousView, setPreviousView] = useState<View>('landing');
  const [showQuickGuide, setShowQuickGuide] = useState(false);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('pp_has_seen_guide');
    if (!hasSeenGuide && selectedIndustry) {
      setTimeout(() => setShowQuickGuide(true), 800);
    }
  }, [selectedIndustry]);

  const handleCloseGuide = () => {
    setShowQuickGuide(false);
    localStorage.setItem('pp_has_seen_guide', 'true');
  };

  const handleHelpClick = () => {
    setShowQuickGuide(true);
  };

  // Handle Privacy Policy navigation
  const handlePrivacyPolicyClick = () => {
    console.log('Privacy policy clicked, current view:', currentView);
    if (currentView !== 'privacy-policy') {
      setPreviousView(currentView);
    }
    setCurrentView('privacy-policy');
  };

  const handlePrivacyPolicyBack = () => {
    console.log('Going back to:', previousView);
    setCurrentView(previousView);
  };

  const handleHomeClick = () => {
    if (selectedIndustry) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('landing');
    }
  };

  const handleNavigate = (view: Exclude<View, 'landing' | 'privacy-policy'>) => {
    setCurrentView(view);
    if (view !== 'view-entry') setSelectedEntry(null);
  };

  const handleViewEntry = (entry: PlaybookEntry) => {
    setPreviousView(currentView);
    setSelectedEntry(entry);
    setCurrentView('view-entry');
  };

  const handleSaveEntry = async (entry: PlaybookEntry) => {
    await addEntry(entry);
    handleViewEntry(entry);
  };

  const handlePublishToggle = async (id: string, isPublished: boolean) => {
    await togglePublish(id, isPublished);
    if (selectedEntry && selectedEntry.id === id) {
      setSelectedEntry({ ...selectedEntry, isPublished });
    }
  };

  const libraryEntries = [...entries, ...MOCK_LIBRARY];

  // Show Privacy Policy
  if (currentView === 'privacy-policy') {
    return (
      <>
        <Toaster position="top-right" richColors />
        <PrivacyPolicy 
          onBack={handlePrivacyPolicyBack}
          onHomeClick={handleHomeClick}
        />
      </>
    );
  }

  // Show landing page if no industry selected or explicitly on landing view
  if (!selectedIndustry || currentView === 'landing') {
    return (
      <>
        <Toaster position="top-right" richColors />
        <QuickGuide
          open={showQuickGuide}
          onClose={handleCloseGuide}
          onNavigate={(view) => {
            if (selectedIndustry) {
              handleNavigate(view);
            }
          }}
        />
        <IndustryLanding
          onSelect={(ind) => {
            setSelectedIndustry(ind);
            setCurrentView('dashboard');
          }}
          onPrivacyPolicyClick={handlePrivacyPolicyClick}
          onHelpClick={handleHelpClick}
        />
      </>
    );
  }

  // Show main app with Layout
  return (
    <>
      <Toaster position="top-right" richColors />
      <QuickGuide
        open={showQuickGuide}
        onClose={handleCloseGuide}
        onNavigate={handleNavigate}
      />
      <Layout
        currentIndustry={selectedIndustry}
        onIndustryChange={(ind) => {
          setSelectedIndustry(ind);
          handleNavigate('dashboard');
        }}
        currentView={currentView === 'view-entry' ? 'dashboard' : currentView}
        onNavigate={handleNavigate}
        onPrivacyPolicyClick={handlePrivacyPolicyClick}
        onHelpClick={handleHelpClick}
      >
        {currentView === 'dashboard' && (
          <Dashboard
            industry={selectedIndustry}
            entries={entries}
            onViewEntry={handleViewEntry}
            onNewEntry={() => handleNavigate('new')}
          />
        )}

        {currentView === 'new' && (
          <EntryForm 
            industry={selectedIndustry}
            onSave={handleSaveEntry}
            onCancel={() => handleNavigate('dashboard')}
          />
        )}

        {currentView === 'library' && (
          <Library 
            entries={libraryEntries}
            currentIndustry={selectedIndustry}
            onViewEntry={handleViewEntry}
          />
        )}

        {currentView === 'my-entries' && (
          <MyEntries 
            entries={entries}
            onViewEntry={handleViewEntry}
            onDeleteEntry={deleteEntry}
          />
        )}

        {currentView === 'view-entry' && selectedEntry && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              variant="ghost"
              onClick={() => handleNavigate(previousView as any)}
              className="group gap-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 pl-2 pr-4"
            >
              <div className="bg-white border border-gray-200 rounded-full p-1 group-hover:border-indigo-200 transition-colors">
                 <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-medium">
                Back to {previousView === 'library' ? 'Library' : previousView === 'my-entries' ? 'My Entries' : 'Dashboard'}
              </span>
            </Button>
            
            <PlaybookCard
              entry={selectedEntry}
              onStatusChange={
                entries.some(e => e.id === selectedEntry.id)
                  ? async (status) => await updateEntry(selectedEntry.id, { status })
                  : undefined
              }
              onSave={
                entries.some(e => e.id === selectedEntry.id)
                  ? async (updatedEntry) => {
                      await updateEntry(updatedEntry.id, updatedEntry);
                      setSelectedEntry(updatedEntry);
                    }
                  : undefined
              }
              onPublishToggle={
                entries.some(e => e.id === selectedEntry.id)
                  ? (isPublished) => handlePublishToggle(selectedEntry.id, isPublished)
                  : undefined
              }
              readOnly={!entries.some(e => e.id === selectedEntry.id)}
            />
          </div>
        )}
      </Layout>
    </>
  );
}