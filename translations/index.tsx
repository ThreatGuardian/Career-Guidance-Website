import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from './en';
import hi from './hi';
import mr from './mr';

export type Language = 'en' | 'hi' | 'mr';

const dictionaries: Record<Language, Record<string, string>> = { en, hi, mr };

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useTranslation = () => useContext(TranslationContext);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_language');
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'mr')) {
        return saved as Language;
      }
    } catch {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
    } catch {}
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang === 'en' ? 'en' : lang === 'hi' ? 'hi' : 'mr';
  };

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : language === 'hi' ? 'hi' : 'mr';
  }, []);

  /**
   * Translate a key with optional parameter interpolation.
   * Usage: t('hero.stat_students') or t('booking.success_msg', { name: 'Rahul' })
   */
  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = dictionaries[language] || dictionaries.en;
    let text = dict[key] || dictionaries.en[key] || key;

    // Interpolate params: {name} -> value
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value));
      });
    }

    return text;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationContext;
