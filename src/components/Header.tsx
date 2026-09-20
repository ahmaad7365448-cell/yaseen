import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Clock, MapPin, Phone, Globe, ShieldCheck, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode
}) => {
  const t = translations[currentLang];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ];

  return (
    <header id="main-header" className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs sticky top-0 z-40 transition-colors">
      {/* Top micro-bar for quick clinic vital details */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{t.bursaLocation}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{t.workingHoursVal}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+905392268839"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span dir="ltr" className="font-mono font-medium">+90 539 226 88 39</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Clinic Header */}
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Clinic Identity */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-600 to-sky-800 text-white flex items-center justify-center shadow-md shadow-sky-600/20 shrink-0">
            {/* Medical Tooth / Stethoscope Emblem */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C8 2 5 4.5 5 8c0 3.5 1.5 5.5 2.5 8.5C8.5 19.5 9 22 10 22c1.2 0 1.5-3 2-3s.8 3 2 3c1 0 1.5-2.5 2.5-5.5C17.5 13.5 19 11.5 19 8c0-3.5-3-6-7-6z" />
              <path d="M9 7c1 1.5 5 1.5 6 0" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t.clinicName}
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full border border-sky-100 dark:border-sky-800">
                <ShieldCheck className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                Bursa
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.doctorTitle}
            </p>
          </div>
        </div>

        {/* Controls: Day/Night Toggle & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Day / Night Mode Toggle Icon Button */}
          <button
            type="button"
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-2xs"
            aria-label={isDarkMode ? t.themeLight : t.themeDark}
            title={isDarkMode ? t.themeLight : t.themeDark}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-sky-700 dark:text-sky-300 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden lg:flex items-center text-xs text-slate-400 dark:text-slate-500 font-medium gap-1 px-1">
              <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            </div>

            <div
              id="language-switcher"
              className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700"
              role="group"
              aria-label="Language selection"
            >
              {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`lang-btn-${lang.code}`}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-sky-200 shadow-xs font-bold border border-slate-200/80 dark:border-slate-600'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="text-sm leading-none">{lang.flag}</span>
                    <span className="hidden sm:inline">{lang.label}</span>
                    <span className="sm:hidden uppercase">{lang.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
