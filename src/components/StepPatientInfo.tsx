import React, { useState } from 'react';
import { Department, Language } from '../types';
import { translations } from '../data/translations';
import {
  User,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

interface StepPatientInfoProps {
  department: Department;
  selectedDate: string;
  selectedTime: string;
  firstName: string;
  lastName: string;
  notes: string;
  onChangeFirstName: (val: string) => void;
  onChangeLastName: (val: string) => void;
  onChangeNotes: (val: string) => void;
  onContinue: () => void;
  onBack: () => void;
  currentLang: Language;
}

export const StepPatientInfo: React.FC<StepPatientInfoProps> = ({
  department,
  selectedDate,
  selectedTime,
  firstName,
  lastName,
  notes,
  onChangeFirstName,
  onChangeLastName,
  onChangeNotes,
  onContinue,
  onBack,
  currentLang
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const [touched, setTouched] = useState({ firstName: false, lastName: false });

  const firstNameError = touched.firstName && !firstName.trim();
  const lastNameError = touched.lastName && !lastName.trim();
  const isValid = firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true });
    if (isValid) {
      onContinue();
    }
  };

  return (
    <div id="step-patient-info-section" className="space-y-6">
      {/* Step Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex items-center gap-2.5 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          {t.step3Title}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t.patientInfoHeading}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          {t.patientInfoSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Form (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="patient-first-name"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  {t.firstNameLabel} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="patient-first-name"
                    value={firstName}
                    onChange={(e) => onChangeFirstName(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, firstName: true }))}
                    placeholder={t.firstNamePlaceholder}
                    required
                    className={`w-full ps-10 pe-4 py-3 rounded-xl text-sm bg-slate-50/50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-hidden ${
                      firstNameError
                        ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900'
                        : 'border-slate-300 dark:border-slate-700 focus:border-sky-600 dark:focus:border-sky-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950'
                    }`}
                  />
                </div>
                {firstNameError && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{t.requiredError}</span>
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="patient-last-name"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  {t.lastNameLabel} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="patient-last-name"
                    value={lastName}
                    onChange={(e) => onChangeLastName(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, lastName: true }))}
                    placeholder={t.lastNamePlaceholder}
                    required
                    className={`w-full ps-10 pe-4 py-3 rounded-xl text-sm bg-slate-50/50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-hidden ${
                      lastNameError
                        ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900'
                        : 'border-slate-300 dark:border-slate-700 focus:border-sky-600 dark:focus:border-sky-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950'
                    }`}
                  />
                </div>
                {lastNameError && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{t.requiredError}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="patient-notes"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  {t.additionalNotesLabel}
                </label>
                <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                  {t.optionalLabel}
                </span>
              </div>
              <div className="relative">
                <div className="absolute top-3.5 start-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                  <FileText className="w-4 h-4" />
                </div>
                <textarea
                  id="patient-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => onChangeNotes(e.target.value)}
                  placeholder={t.additionalNotesPlaceholder}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl text-sm bg-slate-50/50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-600 dark:focus:border-sky-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 outline-hidden transition-all resize-none"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Summary Card (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-colors">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              {t.appointmentSummary}
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-400 block mb-0.5">{t.selectedDepartment}</span>
                <strong className="text-slate-900 dark:text-white font-bold text-sm block">
                  {department.titles[currentLang]}
                </strong>
                <span className="text-[11px] text-sky-700 dark:text-sky-400 mt-1 inline-block">
                  {department.durationMinutes} {t.minutesLabel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{selectedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span className="font-mono font-bold text-sky-900 dark:text-sky-300">{selectedTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <p className="leading-relaxed">
              {currentLang === 'ar'
                ? 'الخطوة القادمة ستقوم بإنشاء تذكرة الموعد وفتح تطبيق واتساب فورياً للتأكيد.'
                : currentLang === 'tr'
                ? 'Sonraki adımda randevu fişiniz üretilecek ve WhatsApp üzerinden hekime tek tıkla iletilecektir.'
                : 'The next step will generate your appointment voucher and open WhatsApp for instant doctor confirmation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          id="btn-back-step3"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{t.btnBack}</span>
        </button>

        <button
          type="button"
          id="btn-continue-step3"
          disabled={!isValid}
          onClick={() => {
            setTouched({ firstName: true, lastName: true });
            if (isValid) onContinue();
          }}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
            isValid
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
