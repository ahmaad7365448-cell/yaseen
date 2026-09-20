import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer id="main-footer" className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Clinic Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                {t.clinicName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.clinicTagline}
            </p>
          </div>

          {/* Working Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{t.workingHoursLabel}</span>
            </h4>
            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{t.workingHoursVal}</p>
              <p className="text-slate-500 dark:text-slate-400">{t.workingHoursNotice}</p>
            </div>
          </div>

          {/* Location & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{t.bursaLocation}</span>
            </h4>
            <div className="text-xs space-y-2">
              <p className="text-slate-700 dark:text-slate-300 font-medium">{t.bursaFullAddress}</p>
              <a
                href="https://wa.me/905392268839"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span dir="ltr">{t.phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p>{t.footerRights}</p>
          <p className="flex items-center gap-1">
            <span>Bursa, Turkey</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Dr. Yassin Al-Hashimi Dental Clinic
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
