import { useState, useMemo } from 'react';
import { Language } from '../types';
import { FAQ_DATA, FAQ_CATEGORIES, FAQ_UI_TEXT } from '../data/faq';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowUpRight
} from 'lucide-react';

interface FAQSectionProps {
  currentLang: Language;
}

export function FAQSection({ currentLang }: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Set the first item expanded by default for instant affordance
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'faq-1': true
  });

  const uiText = FAQ_UI_TEXT[currentLang];
  const isRtl = currentLang === 'ar';

  // Toggle item accordion state
  const toggleItem = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand or collapse all
  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    FAQ_DATA.forEach(item => {
      allExpanded[item.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  // Filter questions based on category and search query
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      // Category match
      if (activeCategory !== 'all') {
        const catObj = FAQ_CATEGORIES.find(c => c.id === activeCategory);
        if (catObj && item.category[currentLang] !== catObj.labels[currentLang]) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const q = item.question[currentLang]?.toLowerCase() || '';
        const a = item.answer[currentLang]?.toLowerCase() || '';
        return q.includes(query) || a.includes(query);
      }

      return true;
    });
  }, [activeCategory, searchQuery, currentLang]);

  return (
    <section
      id="clinic-faq-section"
      aria-labelledby="faq-main-heading"
      className="mt-12 sm:mt-16 pt-10 border-t border-slate-200/80 dark:border-slate-800 transition-colors"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
          <span>{uiText.sectionBadge}</span>
        </div>
        <h2
          id="faq-main-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3"
        >
          {uiText.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {uiText.sectionSubtitle}
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="faq-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={uiText.searchPlaceholder}
            className="w-full ps-10 pe-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              id="faq-clear-search-btn"
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Clear search"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div
          id="faq-category-pills"
          className="flex flex-wrap items-center justify-center gap-2 pt-1"
        >
          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`faq-cat-btn-${cat.id}`}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-2xs font-semibold'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.labels[currentLang]}
              </button>
            );
          })}
        </div>

        {/* Results Info & Expand/Collapse shortcuts */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 px-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredFAQs.length}</span>
            <span>{uiText.openCount}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="faq-expand-all-btn"
              onClick={expandAll}
              className="hover:text-sky-700 dark:hover:text-sky-400 font-medium hover:underline cursor-pointer"
            >
              {currentLang === 'ar' ? 'توسيع الكل' : currentLang === 'tr' ? 'Tümünü Aç' : 'Expand All'}
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              type="button"
              id="faq-collapse-all-btn"
              onClick={collapseAll}
              className="hover:text-sky-700 dark:hover:text-sky-400 font-medium hover:underline cursor-pointer"
            >
              {currentLang === 'ar' ? 'طي الكل' : currentLang === 'tr' ? 'Tümünü Kapat' : 'Collapse All'}
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="max-w-4xl mx-auto space-y-3">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => {
            const isExpanded = Boolean(expandedIds[faq.id]);
            return (
              <div
                key={faq.id}
                id={`faq-card-${faq.id}`}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-sky-300 dark:border-sky-700 shadow-sm ring-1 ring-sky-100 dark:ring-sky-950/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                <h3>
                  <button
                    id={`faq-btn-${faq.id}`}
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-4 cursor-pointer group focus:outline-hidden focus:bg-slate-50/50 dark:focus:bg-slate-800/50"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-colors mt-0.5 ${
                          isExpanded
                            ? 'bg-sky-600 text-white shadow-2xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/80 group-hover:text-sky-700 dark:group-hover:text-sky-300'
                        }`}
                      >
                        Q{index + 1}
                      </span>
                      <div>
                        <span className="inline-block text-[11px] font-medium text-sky-700 dark:text-sky-300 mb-1 bg-sky-50 dark:bg-sky-950/70 px-2 py-0.5 rounded-md">
                          {faq.category[currentLang]}
                        </span>
                        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-900 dark:group-hover:text-sky-300 leading-snug">
                          {faq.question[currentLang]}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isExpanded
                          ? 'rotate-180 bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {/* Animated Answer Body */}
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className={`grid transition-all duration-200 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 ps-14 sm:ps-16 text-slate-700 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40">
                      {faq.answer[currentLang]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div
            id="faq-empty-state"
            className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 sm:p-12 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {uiText.noResultsTitle}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              {uiText.noResultsDesc}
            </p>
            <button
              type="button"
              id="faq-reset-filter-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {uiText.clearFilter}
            </button>
          </div>
        )}
      </div>

      {/* Still Have Questions? / Contact Helper Card */}
      <div
        id="faq-support-card"
        className="max-w-4xl mx-auto mt-8 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-start">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {currentLang === 'ar' ? 'فريق خدمة المراجعين جاهز لمساعدتكم' : currentLang === 'tr' ? 'Hasta İletişim Ekibimiz Hazır' : 'Patient Support Desk Ready'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {uiText.needMoreHelpTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              {uiText.needMoreHelpDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              id="faq-whatsapp-btn"
              href="https://wa.me/905392268839"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{uiText.askOnWhatsApp}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              id="faq-call-btn"
              href="tel:+905392268839"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all backdrop-blur-xs border border-white/10 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-sky-300" />
              <span>{uiText.callClinic}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
