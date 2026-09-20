import React, { useState, useMemo, useEffect } from 'react';
import { Department, Language } from '../types';
import { translations } from '../data/translations';
import { getDepartmentTimeSlots } from '../data/departments';
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Lock
} from 'lucide-react';

interface StepDateTimeProps {
  department: Department;
  selectedDate: string;
  selectedTime: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onContinue: () => void;
  onBack: () => void;
  currentLang: Language;
}

export const StepDateTime: React.FC<StepDateTimeProps> = ({
  department,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onContinue,
  onBack,
  currentLang
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  // Base date calculation
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => today.toISOString().split('T')[0], [today]);

  // Calendar month state
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  // Handle month navigation
  const prevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prev >= minMonth) {
      setCurrentMonthDate(prev);
    }
  };

  const nextMonth = () => {
    const next = new Date(year, month + 1, 1);
    const maxMonth = new Date(today.getFullYear(), today.getMonth() + 4, 1);
    if (next <= maxMonth) {
      setCurrentMonthDate(next);
    }
  };

  const canGoPrev = useMemo(() => {
    const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return new Date(year, month, 1) > minMonth;
  }, [year, month, today]);

  // Calendar grid computation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const days: { dateStr: string; dayNum: number; isPast: boolean; isToday: boolean }[] = [];

    for (let i = 1; i <= totalDaysInMonth; i++) {
      const mStr = String(month + 1).padStart(2, '0');
      const dStr = String(i).padStart(2, '0');
      const dateStr = `${year}-${mStr}-${dStr}`;

      const dateObj = new Date(year, month, i);
      const isPast = dateStr < todayStr;
      const isToday = dateStr === todayStr;

      days.push({
        dateStr,
        dayNum: i,
        isPast,
        isToday
      });
    }

    return { firstDayIndex, days };
  }, [year, month, todayStr]);

  // Listen for clinic booking storage updates so slots update reactively
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const handleUpdate = () => setRefreshKey(k => k + 1);
    window.addEventListener('clinic-booking-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('clinic-booking-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Generate department-specific slots for the selected date (unified clinic schedule)
  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return getDepartmentTimeSlots(department.id, selectedDate);
  }, [department.id, selectedDate, refreshKey]);

  // If a previously selected slot is no longer available (e.g. booked or past), reset it
  useEffect(() => {
    if (selectedTime && selectedDate && slots.length > 0) {
      const match = slots.find(s => s.time === selectedTime);
      if (!match || !match.available) {
        onSelectTime('');
      }
    }
  }, [slots, selectedTime, selectedDate, onSelectTime]);

  // Group slots into time periods
  const morningSlots = useMemo(() => slots.filter(s => s.period === 'morning'), [slots]);
  const afternoonSlots = useMemo(() => slots.filter(s => s.period === 'afternoon'), [slots]);
  const eveningSlots = useMemo(() => slots.filter(s => s.period === 'evening'), [slots]);

  // Quick date jump suggestions (Today, Tomorrow, Day after)
  const quickDates = useMemo(() => {
    const list = [];
    for (let i = 0; i < 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const str = `${y}-${m}-${day}`;
      const dayName = t.weekDays[d.getDay()];
      const monthName = t.months[d.getMonth()];
      const label =
        i === 0
          ? (currentLang === 'ar' ? 'اليوم' : currentLang === 'tr' ? 'Bugün' : 'Today')
          : i === 1
          ? (currentLang === 'ar' ? 'غداً' : currentLang === 'tr' ? 'Yarın' : 'Tomorrow')
          : `${dayName} ${d.getDate()}`;
      list.push({ dateStr: str, label, sub: `${d.getDate()} ${monthName}` });
    }
    return list;
  }, [currentLang, t]);

  return (
    <div id="step-datetime-section" className="space-y-6">
      {/* Step Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              {t.step2Title}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.chooseDateHeading} & {t.chooseTimeHeading}
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-sky-800 dark:text-sky-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{department.titles[currentLang]}</span>
          </div>
        </div>

        {/* Appointment Information Alert */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
          <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-800 dark:text-slate-200">{t.workingHoursNotice}</p>
            <p className="text-slate-500 dark:text-slate-400">{t.timeSlotNotice}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Calendar (6 cols on large) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{t.chooseDateHeading}</span>
            </h3>

            {/* Month Navigation */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                id="btn-prev-month"
                onClick={prevMonth}
                disabled={!canGoPrev}
                className={`p-1.5 rounded-lg border transition-colors ${
                  canGoPrev
                    ? 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer'
                    : 'border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                }`}
                aria-label="Previous month"
              >
                {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>

              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 min-w-[120px] text-center">
                {t.months[month]} {year}
              </span>

              <button
                type="button"
                id="btn-next-month"
                onClick={nextMonth}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label="Next month"
              >
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Date Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {quickDates.map((item) => {
              const isSelected = selectedDate === item.dateStr;
              return (
                <button
                  key={item.dateStr}
                  type="button"
                  id={`quick-date-${item.dateStr}`}
                  onClick={() => onSelectDate(item.dateStr)}
                  className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="block font-bold">{item.label}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-sky-100' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Calendar Table */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-2 bg-slate-50/50 dark:bg-slate-800/40">
            {/* Weekdays Row */}
            <div className="grid grid-cols-7 text-center gap-1 mb-2">
              {t.weekDays.map((w, idx) => (
                <div
                  key={idx}
                  className={`text-[11px] font-bold py-1 ${
                    idx === 5 || idx === 0 ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {w}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Blank leading slots */}
              {Array.from({ length: calendarDays.firstDayIndex }).map((_, idx) => (
                <div key={`blank-${idx}`} className="h-9 sm:h-10" />
              ))}

              {/* Month Days */}
              {calendarDays.days.map((item) => {
                const isSelected = selectedDate === item.dateStr;

                return (
                  <button
                    key={item.dateStr}
                    type="button"
                    id={`cal-day-${item.dateStr}`}
                    disabled={item.isPast}
                    onClick={() => onSelectDate(item.dateStr)}
                    className={`h-9 sm:h-10 rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/30 ring-2 ring-sky-300'
                        : item.isPast
                        ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed bg-transparent'
                        : item.isToday
                        ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold border border-sky-300 dark:border-sky-700 hover:bg-sky-100 dark:hover:bg-sky-900/60 cursor-pointer'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:shadow-xs cursor-pointer'
                    }`}
                  >
                    <span>{item.dayNum}</span>
                    {item.isToday && !isSelected && (
                      <span className="w-1 h-1 rounded-full bg-sky-500 absolute bottom-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Time Slots strictly 11:00 AM to 11:00 PM (6 cols on large) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{t.chooseTimeHeading}</span>
            </h3>

            {/* Time Slot Availability Legend */}
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" />
                {t.slotAvailable}
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-rose-500 dark:text-rose-400 shrink-0" />
                {t.slotBookedAllDepts}
              </span>
            </div>
          </div>

          {/* Universal Booking Lock Notice */}
          <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-2 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
            <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>{t.unifiedBookingNotice}</span>
          </div>

          {!selectedDate ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs">
              <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="font-semibold">{t.selectDateFirst}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
              {/* Morning & Midday (11:00 - 14:00) */}
              {morningSlots.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {t.morningSlots}
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {morningSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      const isBooked = !slot.available && slot.bookedReason === 'booked';
                      const isPast = !slot.available && slot.bookedReason === 'past';
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          id={`slot-btn-${slot.time.replace(':', '-')}`}
                          disabled={!slot.available}
                          onClick={() => onSelectTime(slot.time)}
                          title={
                            isBooked
                              ? t.lockedAllDeptsTooltip
                              : isPast
                              ? t.slotPassed
                              : `${slot.time} - ${t.slotAvailable}`
                          }
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all border flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-md shadow-sky-600/20'
                              : isBooked
                              ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border-slate-200/80 dark:border-slate-800 cursor-not-allowed opacity-75'
                              : isPast
                              ? 'bg-slate-100/60 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 border-dashed border-slate-200 dark:border-slate-800 line-through cursor-not-allowed opacity-50'
                              : 'bg-white dark:bg-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-sky-50/50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs'
                          }`}
                        >
                          <span className="font-mono">{slot.time}</span>
                          {isBooked && (
                            <Lock className="w-3 h-3 text-rose-500 dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Afternoon (14:00 - 18:00) */}
              {afternoonSlots.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {t.afternoonSlots}
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {afternoonSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      const isBooked = !slot.available && slot.bookedReason === 'booked';
                      const isPast = !slot.available && slot.bookedReason === 'past';
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          id={`slot-btn-${slot.time.replace(':', '-')}`}
                          disabled={!slot.available}
                          onClick={() => onSelectTime(slot.time)}
                          title={
                            isBooked
                              ? t.lockedAllDeptsTooltip
                              : isPast
                              ? t.slotPassed
                              : `${slot.time} - ${t.slotAvailable}`
                          }
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all border flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-md shadow-sky-600/20'
                              : isBooked
                              ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border-slate-200/80 dark:border-slate-800 cursor-not-allowed opacity-75'
                              : isPast
                              ? 'bg-slate-100/60 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 border-dashed border-slate-200 dark:border-slate-800 line-through cursor-not-allowed opacity-50'
                              : 'bg-white dark:bg-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-sky-50/50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs'
                          }`}
                        >
                          <span className="font-mono">{slot.time}</span>
                          {isBooked && (
                            <Lock className="w-3 h-3 text-rose-500 dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Evening (18:00 - 23:00) */}
              {eveningSlots.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {t.eveningSlots}
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {eveningSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      const isBooked = !slot.available && slot.bookedReason === 'booked';
                      const isPast = !slot.available && slot.bookedReason === 'past';
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          id={`slot-btn-${slot.time.replace(':', '-')}`}
                          disabled={!slot.available}
                          onClick={() => onSelectTime(slot.time)}
                          title={
                            isBooked
                              ? t.lockedAllDeptsTooltip
                              : isPast
                              ? t.slotPassed
                              : `${slot.time} - ${t.slotAvailable}`
                          }
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all border flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-md shadow-sky-600/20'
                              : isBooked
                              ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border-slate-200/80 dark:border-slate-800 cursor-not-allowed opacity-75'
                              : isPast
                              ? 'bg-slate-100/60 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 border-dashed border-slate-200 dark:border-slate-800 line-through cursor-not-allowed opacity-50'
                              : 'bg-white dark:bg-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-sky-50/50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs'
                          }`}
                        >
                          <span className="font-mono">{slot.time}</span>
                          {isBooked && (
                            <Lock className="w-3 h-3 text-rose-500 dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Selected Slot Confirmation strip */}
          {selectedDate && selectedTime && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  <strong>{selectedDate}</strong> @ <strong className="font-mono">{selectedTime}</strong>
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                {t.selectedLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          id="btn-back-step2"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{t.btnBack}</span>
        </button>

        <button
          type="button"
          id="btn-continue-step2"
          disabled={!selectedDate || !selectedTime}
          onClick={onContinue}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
            selectedDate && selectedTime
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
