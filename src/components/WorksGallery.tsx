import { useState, useEffect } from 'react';
import { ClinicalCase, Language } from '../types';
import { CLINICAL_CASES, GALLERY_UI_TEXT } from '../data/cases';
import {
  Sparkles,
  Maximize2,
  X,
  CalendarCheck,
  Clock,
  CheckCircle2,
  UserCheck,
  MapPin,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface WorksGalleryProps {
  currentLang: Language;
  onSelectDepartmentForBooking: (departmentId: string) => void;
}

export function WorksGallery({
  currentLang,
  onSelectDepartmentForBooking
}: WorksGalleryProps) {
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const uiText = GALLERY_UI_TEXT[currentLang];
  const isRtl = currentLang === 'ar';

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCase) {
        setSelectedCase(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCase]);

  // Unique categories for filtering if desired
  const filteredCases = activeFilter === 'all'
    ? CLINICAL_CASES
    : CLINICAL_CASES.filter(c => c.departmentId === activeFilter);

  const handleBookCase = (deptId: string) => {
    onSelectDepartmentForBooking(deptId);
    if (selectedCase) {
      setSelectedCase(null);
    }
    // Smoothly scroll to the booking wizard container
    const wizardEl = document.getElementById('booking-wizard-card') || document.getElementById('step-wizard-container');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="clinic-works-gallery"
      aria-labelledby="works-gallery-heading"
      className="mt-12 sm:mt-16 pt-10 border-t border-slate-200/80 dark:border-slate-800 transition-colors"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{uiText.badge}</span>
        </div>
        <h2
          id="works-gallery-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3"
        >
          {uiText.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {uiText.subtitle}
        </p>
      </div>

      {/* Grid of 4 Case Works */}
      <div
        id="cases-grid"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
      >
        {filteredCases.map((item) => (
          <article
            key={item.id}
            id={`case-card-${item.id}`}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Image Container with Zoom & Badge */}
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer">
              <img
                src={item.image}
                alt={item.title[currentLang]}
                referrerPolicy="no-referrer"
                onClick={() => setSelectedCase(item)}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Overlay Gradient */}
              <div
                onClick={() => setSelectedCase(item)}
                className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity"
              />

              {/* Top Category Badge */}
              <div className="absolute top-3.5 start-3.5 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-slate-100 text-xs font-semibold shadow-xs">
                  {item.category[currentLang]}
                </span>
              </div>

              {/* Top Right Zoom Button */}
              <button
                type="button"
                id={`zoom-btn-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCase(item);
                }}
                className="absolute top-3.5 end-3.5 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label={uiText.viewDetails}
                title={uiText.viewDetails}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Card Image Overlay Info */}
              <div className="absolute bottom-3 start-3.5 end-3.5 text-white pointer-events-none">
                <div className="flex items-center gap-1.5 text-xs text-sky-200 font-medium mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                  <span>{uiText.doctorName}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/80">{uiText.bursaLocation}</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span>{item.duration[currentLang]}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-800 dark:group-hover:text-sky-400 transition-colors leading-snug mb-2.5">
                  {item.title[currentLang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {item.description[currentLang]}
                </p>

                {/* Highlights Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.highlights[currentLang].slice(0, 3).map((hl, hlIdx) => (
                    <span
                      key={hlIdx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{hl}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  id={`case-view-btn-${item.id}`}
                  onClick={() => setSelectedCase(item)}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-sky-700 dark:hover:text-sky-400 transition-colors cursor-pointer py-2"
                >
                  {uiText.viewDetails}
                </button>

                <button
                  type="button"
                  id={`case-book-btn-${item.id}`}
                  onClick={() => handleBookCase(item.departmentId)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer group/btn"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{uiText.bookService}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Case Lightbox / Detail Modal */}
      {selectedCase && (
        <div
          id="case-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-title"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedCase(null)}
        >
          <div
            id="case-modal-card"
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-16/9 sm:aspect-21/9 bg-slate-900 overflow-hidden">
              <img
                src={selectedCase.image}
                alt={selectedCase.title[currentLang]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

              {/* Close Button */}
              <button
                type="button"
                id="close-case-modal-btn"
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 end-4 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-10"
                aria-label={uiText.closeModal}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Badge on Image */}
              <div className="absolute bottom-4 start-5 end-5 text-white">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-sky-500/90 backdrop-blur-md text-white text-xs font-semibold mb-2">
                  {selectedCase.category[currentLang]}
                </span>
                <h3
                  id="modal-case-title"
                  className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-sm"
                >
                  {selectedCase.title[currentLang]}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Doctor & Location Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-sky-50/80 dark:bg-slate-805 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-sky-950 dark:text-sky-300 font-semibold">
                  <UserCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>{uiText.doctorInCharge}</span>
                  <span className="text-sky-800 dark:text-sky-400">{uiText.doctorName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{uiText.bursaLocation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>{selectedCase.duration[currentLang]}</span>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedCase.description[currentLang]}
                </p>
              </div>

              {/* Highlights List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  {uiText.highlightsLabel}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCase.highlights[currentLang].map((hl, hlIdx) => (
                    <div
                      key={hlIdx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  id="modal-cancel-btn"
                  onClick={() => setSelectedCase(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {uiText.closeModal}
                </button>

                <button
                  type="button"
                  id="modal-book-dept-btn"
                  onClick={() => handleBookCase(selectedCase.departmentId)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{uiText.bookService}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
