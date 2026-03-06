import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load language from localStorage or browser preference
    try {
      const stored = localStorage.getItem('language') as Language;
      if (stored && stored in translations) {
        setLanguageState(stored);
      } else {
        const browserLang = navigator.language?.split('-')[0]?.toLowerCase() as Language;
        const lang = (browserLang && browserLang in translations) ? browserLang : 'en';
        setLanguageState(lang);
      }
    } catch (error) {
      // localStorage might not be available, use default
      setLanguageState('en');
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      // localStorage might not be available, ignore
    }
  };

  const translate = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    if (!value && language !== 'en') {
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
      }
    }

    return value || key;
  };

  if (!mounted) return <>{children}</>;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
