'use client';

import { Loader2 } from 'lucide-react';

interface LanguageLoaderProps {
  isLoading: boolean;
  language: string;
}

const LanguageLoader = ({ isLoading, language }: LanguageLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-[#C11E2B] animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Switching to {language === 'AR' ? 'Arabic' : 'English'}
        </h2>
        <p className="text-gray-600">Please wait a moment...</p>
      </div>
    </div>
  );
};

export default LanguageLoader;
