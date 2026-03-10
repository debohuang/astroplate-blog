import React, { useState } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import { translations, type Language } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Array<{ code: Language; name: string; flag: string }> = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border dark:border-darkmode-border hover:border-primary dark:hover:border-darkmode-primary transition"
        title="Switch language"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLang?.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkmode-bg border border-border dark:border-darkmode-border rounded-lg shadow-lg z-50">
          <div className="p-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 rounded text-left flex items-center gap-3 transition ${
                  language === lang.code
                    ? 'bg-primary/20 text-primary dark:text-darkmode-primary'
                    : 'hover:bg-light dark:hover:bg-darkmode-light'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
