import React from 'react';
import { WizardStep, Language } from '../types';
import { translations } from '../data/translations';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: WizardStep;
  currentLang: Language;
  onStepClick: (step: WizardStep) => void;
  isStepAccessible: (step: WizardStep) => boolean;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  currentLang,
  onStepClick,
  isStepAccessible,
}) => {
  const t = translations[currentLang];

  const steps: { step: WizardStep; title: string; desc: string }[] = [
    { step: 1, title: t.step1Title, desc: t.step1Desc },
    { step: 2, title: t.step2Title, desc: t.step2Desc },
    { step: 3, title: t.step3Title, desc: t.step3Desc },
    { step: 4, title: t.step4Title, desc: t.step4Desc },
  ];

  return (
    <div id="step-indicator" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-4 mb-6 transition-colors">
      {/* Mobile Step Header (compact summary) */}
      <div className="md:hidden flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
        <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-200/60 dark:border-sky-800">
          {currentLang === 'ar' ? `الخطوة ${currentStep} من 4` : currentLang === 'tr' ? `Adım ${currentStep} / 4` : `Step ${currentStep} of 4`}
        </span>
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
          {steps[currentStep - 1].title}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-10">
          {steps.map((item) => {
            const isCurrent = currentStep === item.step;
            const isCompleted = currentStep > item.step;
            const canClick = isStepAccessible(item.step);

            return (
              <button
                key={item.step}
                id={`wizard-step-${item.step}`}
                disabled={!canClick}
                onClick={() => canClick && onStepClick(item.step)}
                className={`text-start flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 p-2 rounded-xl transition-all ${
                  canClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/70' : 'cursor-not-allowed opacity-75'
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-4 ring-sky-100 dark:ring-sky-950'
                      : isCompleted
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  ) : (
                    item.step
                  )}
                </div>

                {/* Step Details (hidden or minimal on very small screens) */}
                <div className="hidden sm:block min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p
                      className={`text-xs sm:text-sm font-bold truncate leading-tight ${
                        isCurrent
                          ? 'text-sky-900 dark:text-sky-300'
                          : isCompleted
                          ? 'text-slate-800 dark:text-slate-200'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate hidden lg:block mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Connecting Progress Line (behind circles on desktop) */}
        <div className="hidden sm:block absolute top-6 left-6 right-6 h-0.5 bg-slate-100 dark:bg-slate-800 -z-0 pointer-events-none" />
      </div>
    </div>
  );
};
