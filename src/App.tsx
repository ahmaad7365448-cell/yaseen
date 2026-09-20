import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StepIndicator } from './components/StepIndicator';
import { StepDepartment } from './components/StepDepartment';
import { StepDateTime } from './components/StepDateTime';
import { StepPatientInfo } from './components/StepPatientInfo';
import { StepConfirmation } from './components/StepConfirmation';
import { WorksGallery } from './components/WorksGallery';
import { FAQSection } from './components/FAQSection';
import { DEPARTMENTS } from './data/departments';
import { translations } from './data/translations';
import { Language, WizardStep, BookingData } from './types';
import { Sparkles, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clinic_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Booking state
  const [bookingData, setBookingData] = useState<BookingData>({
    departmentId: '',
    selectedDate: '',
    selectedTime: '',
    firstName: '',
    lastName: '',
    notes: ''
  });

  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  // Sync dark mode class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('clinic_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('clinic_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Sync document direction and lang attribute
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [currentLang, isRtl]);

  // Selected department object
  const selectedDepartment = useMemo(() => {
    return DEPARTMENTS.find(d => d.id === bookingData.departmentId);
  }, [bookingData.departmentId]);

  // Check step accessibility
  const isStepAccessible = (step: WizardStep): boolean => {
    if (step === 1) return true;
    if (step === 2) return Boolean(bookingData.departmentId);
    if (step === 3) return Boolean(bookingData.departmentId && bookingData.selectedDate && bookingData.selectedTime);
    if (step === 4) {
      return Boolean(
        bookingData.departmentId &&
        bookingData.selectedDate &&
        bookingData.selectedTime &&
        bookingData.firstName.trim() &&
        bookingData.lastName.trim()
      );
    }
    return false;
  };

  // Stepper jumps
  const handleStepJump = (step: WizardStep) => {
    if (isStepAccessible(step)) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset booking
  const handleStartOver = () => {
    setBookingData({
      departmentId: '',
      selectedDate: '',
      selectedTime: '',
      firstName: '',
      lastName: '',
      notes: ''
    });
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for booking directly from clinical works gallery
  const handleSelectDepartmentFromGallery = (deptId: string) => {
    setBookingData(prev => ({
      ...prev,
      departmentId: deptId,
      selectedDate: '',
      selectedTime: ''
    }));
    setCurrentStep(2);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors ${isRtl ? 'font-arabic' : ''}`}>
      {/* Header with clinic identity, dark mode toggle, and language switcher */}
      <Header
        currentLang={currentLang}
        onLanguageChange={(lang) => setCurrentLang(lang)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Booking Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Modern Clinic Appointment Banner */}
        <div
          id="booking-wizard-card"
          className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white p-4 sm:p-5 rounded-2xl shadow-sm border border-sky-800/30"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs uppercase tracking-widest text-sky-200 font-semibold">
                {currentLang === 'ar' ? 'نظام الحجز الإلكتروني المباشر' : currentLang === 'tr' ? 'Çevrimiçi Randevu Sistemi' : 'Online Appointment System'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {currentLang === 'ar'
                ? 'احجز موعدك مع د. ياسين الهاشمي في بورصة'
                : currentLang === 'tr'
                ? 'Bursa Dt. Yasin El-Haşimi Diş Randevusu'
                : 'Book Your Visit with Dr. Yassin Al-Hashimi (Bursa)'}
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-sky-100 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-xs shrink-0">
            <Clock className="w-4 h-4 text-sky-300 shrink-0" />
            <div>
              <span className="text-[10px] uppercase block text-sky-300">{t.workingHoursLabel}</span>
              <span className="font-semibold">{t.workingHoursVal}</span>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          currentLang={currentLang}
          onStepClick={handleStepJump}
          isStepAccessible={isStepAccessible}
        />

        {/* Active Booking Summary Strip (visible on steps 2, 3, 4) */}
        {currentStep > 1 && selectedDepartment && (
          <div
            id="active-summary-strip"
            className="mb-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs transition-colors"
          >
            <div className="flex items-center flex-wrap gap-4 sm:gap-6">
              {/* Department Choice */}
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-[11px]">
                  1
                </span>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">{t.step1Title}</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">
                    {selectedDepartment.titles[currentLang]}
                  </strong>
                </div>
              </div>

              {/* Date/Time Choice if chosen */}
              {bookingData.selectedDate && bookingData.selectedTime && (
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-[11px]">
                    2
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">{t.step2Title}</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-bold">
                      {bookingData.selectedDate} @ {bookingData.selectedTime}
                    </strong>
                  </div>
                </div>
              )}

              {/* Patient Name if filled */}
              {bookingData.firstName && bookingData.lastName && (
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[11px]">
                    3
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">{t.step3Title}</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-bold">
                      {bookingData.firstName} {bookingData.lastName}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              id="btn-edit-current-flow"
              onClick={() => handleStepJump(1)}
              className="text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 font-semibold hover:underline cursor-pointer"
            >
              {t.btnEdit}
            </button>
          </div>
        )}

        {/* Wizard Step Content */}
        {currentStep === 1 && (
          <StepDepartment
            departments={DEPARTMENTS}
            selectedDepartmentId={bookingData.departmentId}
            onSelectDepartment={(id) => {
              setBookingData(prev => ({
                ...prev,
                departmentId: id,
                // Reset time slot when department changes since slots are independent
                selectedTime: ''
              }));
            }}
            onContinue={() => {
              if (bookingData.departmentId) {
                setCurrentStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            currentLang={currentLang}
          />
        )}

        {currentStep === 2 && selectedDepartment && (
          <StepDateTime
            department={selectedDepartment}
            selectedDate={bookingData.selectedDate}
            selectedTime={bookingData.selectedTime}
            onSelectDate={(date) => {
              setBookingData(prev => ({
                ...prev,
                selectedDate: date,
                selectedTime: '' // reset time slot when date changes
              }));
            }}
            onSelectTime={(time) => {
              setBookingData(prev => ({
                ...prev,
                selectedTime: time
              }));
            }}
            onBack={() => {
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContinue={() => {
              if (bookingData.selectedDate && bookingData.selectedTime) {
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            currentLang={currentLang}
          />
        )}

        {currentStep === 3 && selectedDepartment && (
          <StepPatientInfo
            department={selectedDepartment}
            selectedDate={bookingData.selectedDate}
            selectedTime={bookingData.selectedTime}
            firstName={bookingData.firstName}
            lastName={bookingData.lastName}
            notes={bookingData.notes || ''}
            onChangeFirstName={(val) => setBookingData(prev => ({ ...prev, firstName: val }))}
            onChangeLastName={(val) => setBookingData(prev => ({ ...prev, lastName: val }))}
            onChangeNotes={(val) => setBookingData(prev => ({ ...prev, notes: val }))}
            onBack={() => {
              setCurrentStep(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContinue={() => {
              if (bookingData.firstName.trim() && bookingData.lastName.trim()) {
                setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            currentLang={currentLang}
          />
        )}

        {currentStep === 4 && selectedDepartment && (
          <StepConfirmation
            bookingData={bookingData}
            department={selectedDepartment}
            onEditStep={(step) => handleStepJump(step)}
            onStartOver={handleStartOver}
            currentLang={currentLang}
          />
        )}

        {/* Real Cases & Clinical Works Gallery */}
        <WorksGallery
          currentLang={currentLang}
          onSelectDepartmentForBooking={handleSelectDepartmentFromGallery}
        />

        {/* Dynamic Patient FAQ Section */}
        <FAQSection currentLang={currentLang} />
      </main>

      {/* Clinic Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
}
