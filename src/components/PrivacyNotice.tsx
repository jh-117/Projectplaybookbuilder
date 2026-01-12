import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { Button } from './ui/button';

const PRIVACY_NOTICE_KEY = 'playbook_privacy_notice_dismissed';

export const PrivacyNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(PRIVACY_NOTICE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(PRIVACY_NOTICE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-blue-50 border border-blue-200 rounded-xl shadow-lg p-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-gray-900 text-sm">Privacy Notice</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your entries are private and stored in your browser. Only you can see your entries.
            Clearing browser data will remove access to your entries permanently.
          </p>
          <Button
            onClick={handleDismiss}
            size="sm"
            variant="ghost"
            className="h-7 px-3 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 -ml-2"
          >
            Got it
          </Button>
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
