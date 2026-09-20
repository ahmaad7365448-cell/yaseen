import React, { useState, useEffect } from 'react';
import { Department, Language, BookingData, WizardStep } from '../types';
import { translations } from '../data/translations';
import { recordClinicBooking } from '../data/departments';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  MapPin,
  Sparkles,
  Phone,
  Copy,
  Check,
  RotateCcw,
  Edit3,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface StepConfirmationProps {
  bookingData: BookingData;
  department: Department;
  onEditStep: (step: WizardStep) => void;
  onStartOver: () => void;
  currentLang: Language;
}

export const StepConfirmation: React.FC<StepConfirmationProps> = ({
  bookingData,
  department,
  onEditStep,
  onStartOver,
  currentLang
}) => {
  const t = translations[currentLang];
  const [copied, setCopied] = useState(false);
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);

  // Doctor's WhatsApp number strictly per requirement
  const clinicPhoneRaw = '905392268839';
  const clinicPhoneFormatted = '+90 539 226 88 39';

  const patientFullName = `${bookingData.firstName.trim()} ${bookingData.lastName.trim()}`;
  const departmentName = department.titles[currentLang];

  // Dynamic WhatsApp Message generator per language
  const buildWhatsAppMessage = (): string => {
    if (currentLang === 'ar') {
      let msg = `السلام عليكم د. ياسين الهاشمي،\nأود حجز وتأكيد موعد لطب الأسنان في عيادتكم الموقرة بعثمان غازي، بورصة:\n\n`;
      msg += `👤 اسم المريض: ${patientFullName}\n`;
      msg += `🦷 التخصص / القسم: ${departmentName}\n`;
      msg += `📅 تاريخ الموعد: ${bookingData.selectedDate}\n`;
      msg += `⏰ توقيت الموعد: ${bookingData.selectedTime}\n`;
      msg += `📍 المدينة: عثمان غازي، بورصة، تركيا (Osmangazi, Bursa, Türkiye)\n`;
      if (bookingData.notes?.trim()) {
        msg += `📝 ملاحظات إضافية: ${bookingData.notes.trim()}\n`;
      }
      msg += `\nيرجى تأكيد موعدي في العيادة. جزاكم الله خيراً!`;
      return msg;
    } else if (currentLang === 'tr') {
      let msg = `Merhaba Dt. Yasin El-Haşimi Kliniği,\nBursa Osmangazi kliniğinizden diş randevusu oluşturmak istiyorum:\n\n`;
      msg += `👤 Hasta Adı Soyadı: ${patientFullName}\n`;
      msg += `🦷 Tedavi Bölümü: ${departmentName}\n`;
      msg += `📅 Randevu Tarihi: ${bookingData.selectedDate}\n`;
      msg += `⏰ Randevu Saati: ${bookingData.selectedTime}\n`;
      msg += `📍 Konum: Osmangazi, Bursa, Türkiye\n`;
      if (bookingData.notes?.trim()) {
        msg += `📝 Not / Şikayet: ${bookingData.notes.trim()}\n`;
      }
      msg += `\nRandevumu onaylamanızı rica ederim. İyi çalışmalar!`;
      return msg;
    } else {
      let msg = `Hello Dr. Yassin Al-Hashimi Dental Clinic,\nI would like to book a dental appointment at your clinic in Osmangazi, Bursa:\n\n`;
      msg += `👤 Patient Name: ${patientFullName}\n`;
      msg += `🦷 Department: ${departmentName}\n`;
      msg += `📅 Date: ${bookingData.selectedDate}\n`;
      msg += `⏰ Time: ${bookingData.selectedTime}\n`;
      msg += `📍 Location: Osmangazi, Bursa, Turkey\n`;
      if (bookingData.notes?.trim()) {
        msg += `📝 Notes: ${bookingData.notes.trim()}\n`;
      }
      msg += `\nPlease confirm my appointment slot. Thank you!`;
      return msg;
    }
  };

  const rawMessage = buildWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${clinicPhoneRaw}?text=${encodeURIComponent(rawMessage)}`;

  // Automatically lock this slot clinic-wide across all departments upon reaching confirmation
  useEffect(() => {
    if (bookingData.selectedDate && bookingData.selectedTime && department.id) {
      recordClinicBooking({
        departmentId: department.id,
        selectedDate: bookingData.selectedDate,
        selectedTime: bookingData.selectedTime,
        patientName: patientFullName
      });
    }
  }, [bookingData.selectedDate, bookingData.selectedTime, department.id, patientFullName]);

  const handleOpenWhatsApp = () => {
    setHasOpenedWhatsApp(true);
    if (bookingData.selectedDate && bookingData.selectedTime && department.id) {
      recordClinicBooking({
        departmentId: department.id,
        selectedDate: bookingData.selectedDate,
        selectedTime: bookingData.selectedTime,
        patientName: patientFullName
      });
    }
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div id="step-confirmation-section" className="space-y-6">
      {/* Step Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex items-center gap-2.5 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {t.step4Title}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t.confirmationHeading}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          {t.confirmationSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official Appointment Voucher (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            {/* Voucher Top Ribbon */}
            <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">
                    {t.clinicName}
                  </h3>
                  <p className="text-xs text-sky-200">
                    {t.doctorTitle} • {t.bursaLocation}
                  </p>
                </div>
              </div>

              <div className="text-end">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-200 block">
                  STATUS
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Ready
                </span>
              </div>
            </div>

            {/* Voucher Details Grid */}
            <div className="p-5 sm:p-6 divide-y divide-slate-100 dark:divide-slate-800 space-y-4">
              {/* Patient Name */}
              <div className="flex items-start justify-between gap-4 pt-2 first:pt-0">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      {t.patientFullName}
                    </span>
                    <strong className="text-base sm:text-lg text-slate-900 dark:text-white font-bold">
                      {patientFullName}
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  id="btn-edit-patient"
                  onClick={() => onEditStep(3)}
                  className="inline-flex items-center gap-1 text-xs text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 font-semibold p-1 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title={t.btnEdit}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.btnEdit}</span>
                </button>
              </div>

              {/* Department */}
              <div className="flex items-start justify-between gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      {t.selectedDepartment}
                    </span>
                    <strong className="text-base text-slate-900 dark:text-white font-bold block">
                      {departmentName}
                    </strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {department.durationMinutes} {t.minutesLabel} {t.durationLabel.toLowerCase()}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  id="btn-edit-department"
                  onClick={() => onEditStep(1)}
                  className="inline-flex items-center gap-1 text-xs text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 font-semibold p-1 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title={t.btnEdit}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.btnEdit}</span>
                </button>
              </div>

              {/* Date & Time */}
              <div className="flex items-start justify-between gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      {t.appointmentDate} & {t.appointmentTime}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <span className="text-base font-bold text-slate-900 dark:text-white">
                        {bookingData.selectedDate}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-sky-100 dark:bg-sky-900/60 text-sky-900 dark:text-sky-200 font-mono font-bold px-2.5 py-0.5 rounded-lg text-sm border border-sky-200 dark:border-sky-800">
                        <Clock className="w-3.5 h-3.5 text-sky-700 dark:text-sky-300" />
                        {bookingData.selectedTime}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800/60 w-fit">
                      <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>
                        {currentLang === 'ar'
                          ? 'تم قفل هذا التوقيت في كافة أقسام ومجالات العيادة'
                          : currentLang === 'tr'
                          ? 'Bu saat tüm bölümlerde kilitlendi'
                          : 'Locked across all clinic departments'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  id="btn-edit-datetime"
                  onClick={() => onEditStep(2)}
                  className="inline-flex items-center gap-1 text-xs text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 font-semibold p-1 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title={t.btnEdit}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.btnEdit}</span>
                </button>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 pt-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    {t.clinicAddress}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.bursaFullAddress}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.workingHoursLabel}: {t.workingHoursVal}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Perforated Edge styling for voucher look */}
            <div className="relative h-4 bg-slate-100 dark:bg-slate-800 border-y border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between px-2">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono">
                DR. YASSIN AL-HASHIMI DENTAL CLINIC • BURSA
              </span>
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 font-bold">
                WA-LINK READY
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: WhatsApp Automation CTA & Quick Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 transition-colors">
            {/* WhatsApp Branding Box */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  {/* WhatsApp SVG logo */}
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.773-5.766zm3.364 8.163c-.144.405-.837.774-1.17.825-.311.05-.712.063-2.18-.544-1.748-.722-2.883-2.495-2.97-2.611-.088-.116-.713-.949-.713-1.809 0-.86.449-1.282.609-1.456.16-.174.349-.217.466-.217.116 0 .233.002.335.006.107.005.252-.041.394.3.144.347.494 1.203.537 1.29.043.087.073.189.015.305-.058.116-.087.189-.174.29-.087.102-.184.227-.263.305-.088.087-.18.182-.077.359.102.176.454.749.974 1.213.669.596 1.233.78 1.408.868.175.087.277.073.379-.044.102-.116.438-.508.555-.682.117-.174.233-.145.394-.087.16.058 1.018.48 1.193.567.175.087.291.13.335.203.044.072.044.42-.1.825z" />
                  </svg>
                </div>
                <span>{t.whatsappNoticeTitle}</span>
              </div>
              <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                {t.whatsappNoticeBody}
              </p>
            </div>

            {/* PRIMARY CALL TO ACTION BUTTON: Strictly WhatsApp link */}
            <button
              type="button"
              id="btn-book-whatsapp-main"
              onClick={handleOpenWhatsApp}
              className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white py-4 px-5 rounded-xl font-bold text-base shadow-lg shadow-emerald-600/30 transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.773-5.766zm3.364 8.163c-.144.405-.837.774-1.17.825-.311.05-.712.063-2.18-.544-1.748-.722-2.883-2.495-2.97-2.611-.088-.116-.713-.949-.713-1.809 0-.86.449-1.282.609-1.456.16-.174.349-.217.466-.217.116 0 .233.002.335.006.107.005.252-.041.394.3.144.347.494 1.203.537 1.29.043.087.073.189.015.305-.058.116-.087.189-.174.29-.087.102-.184.227-.263.305-.088.087-.18.182-.077.359.102.176.454.749.974 1.213.669.596 1.233.78 1.408.868.175.087.277.073.379-.044.102-.116.438-.508.555-.682.117-.174.233-.145.394-.087.16.058 1.018.48 1.193.567.175.087.291.13.335.203.044.072.044.42-.1.825z" />
                </svg>
              </div>
              <span>{t.btnBookWhatsApp}</span>
            </button>

            {hasOpenedWhatsApp && (
              <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-sky-900 dark:text-sky-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>
                  {currentLang === 'ar'
                    ? 'تم توجيهك إلى واتساب. اضغط إرسال داخل المحادثة ليتم اعتماد الحجز فوراً.'
                    : currentLang === 'tr'
                    ? 'WhatsApp açıldı. Açılan sohbette Gönder tuşuna basarak randevunuzu teyit ettiriniz.'
                    : 'WhatsApp opened. Press Send in the chat to immediately confirm your appointment with Dr. Yassin.'}
                </span>
              </div>
            )}

            {/* Secondary Action: Copy text if needed */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                id="btn-copy-booking-msg"
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">{t.messageCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>{t.btnCopyMessage}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:+${clinicPhoneRaw}`}
                  id="btn-call-doctor"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.directCall}</span>
                </a>

                <button
                  type="button"
                  id="btn-start-over"
                  onClick={onStartOver}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.btnStartOver}</span>
                </button>
              </div>
            </div>

            {/* Direct WhatsApp link fallback preview */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 space-y-1 font-mono break-all">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block font-sans">
                DIRECT WHATSAPP ENDPOINT
              </span>
              <span className="text-slate-700 dark:text-slate-300 select-all block">
                https://wa.me/{clinicPhoneRaw}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
