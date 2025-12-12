import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../locale/en';
import { fr } from '../locale/fr';
import { es } from '../locale/es';

type Locale = 'en' | 'fr' | 'es';
type Translations = typeof en;

const translations: Record<Locale, Translations> = {
  en,
  fr,
  es,
};

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Get from localStorage or default to 'en'
    const saved = localStorage.getItem('locale') as Locale;
    return saved && (saved === 'en' || saved === 'fr' || saved === 'es') ? saved : 'en';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  // Get nested value from object using dot notation
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

