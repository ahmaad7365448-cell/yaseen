import React from 'react';
import { Department, Language } from '../types';
import { translations } from '../data/translations';
import {
  ShieldCheck,
  Smile,
  Sparkles,
  SunMedium,
  Activity,
  HeartHandshake,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface StepDepartmentProps {
  departments: Department[];
  selectedDepartmentId: string;
  onSelectDepartment: (id: string) => void;
  onContinue: () => void;
  currentLang: Language;
}

export const StepDepartment: React.FC<StepDepartmentProps> = ({
  departments,
  selectedDepartmentId,
  onSelectDepartment,
  onContinue,
  currentLang
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const renderIcon = (name: string, isSelected: boolean) => {
    const className = `w-6 h-6 sm:w-7 sm:h-7 transition-colors ${
      isSelected ? 'text-sky-600' : 'text-slate-600'
    }`;
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Smile':
        return <Smile className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'SunMedium':
        return <SunMedium className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      default:
        return <ShieldCheck className={className} />;
    }
  };

  return (
    <div id="step-department-section" className="space-y-6">
      {/* Step Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex items-center gap-2.5 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          {t.step1Title}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t.chooseDepartmentHeading}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          {t.chooseDepartmentSub}
        </p>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept) => {
          const isSelected = selectedDepartmentId === dept.id;

          return (
            <div
              key={dept.id}
              id={`dept-card-${dept.id}`}
              onClick={() => onSelectDepartment(dept.id)}
              className={`group relative text-start p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-600 bg-sky-50/40 dark:bg-sky-950/30 shadow-md shadow-sky-600/10 ring-1 ring-sky-600/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/60 shadow-xs'
              }`}
            >
              <div>
                {/* Card Top: Icon, Badge, Selection Indicator */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 ring-4 ring-sky-200/50 dark:ring-sky-900/40'
                        : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200/80 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {renderIcon(dept.iconName, isSelected)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                      {dept.badge[currentLang]}
                    </span>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-sky-600 text-white'
                          : 'border-2 border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4 fill-white text-sky-600" />}
                    </div>
                  </div>
                </div>

                {/* Department Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-800 dark:group-hover:text-sky-400 transition-colors">
                  {dept.titles[currentLang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {dept.descriptions[currentLang]}
                </p>
              </div>

              {/* Card Footer: Estimated Duration & Select prompt */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>{t.durationLabel}:</span>
                  <strong className="text-slate-700 dark:text-slate-300 font-semibold">
                    {dept.durationMinutes} {t.minutesLabel}
                  </strong>
                </span>

                <span
                  className={`font-semibold transition-colors ${
                    isSelected ? 'text-sky-700 dark:text-sky-400 font-bold' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                  }`}
                >
                  {isSelected ? t.selectedLabel : isRtl ? 'اختر القسم' : currentLang === 'tr' ? 'Seç' : 'Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-end pt-4">
        <button
          id="btn-continue-step1"
          disabled={!selectedDepartmentId}
          onClick={onContinue}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
            selectedDepartmentId
              ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/25 active:scale-[0.98]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
          }`}
        >
          <span>{t.btnContinue}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
