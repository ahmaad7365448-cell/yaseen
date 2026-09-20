import { Department, TimeSlot } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'general-dentistry',
    iconName: 'ShieldCheck',
    durationMinutes: 30,
    slotOffset: 0,
    titles: {
      ar: 'طب الأسنان العام والفحص',
      tr: 'Genel Diş Hekimliği & Muayene',
      en: 'General Dentistry & Checkup'
    },
    descriptions: {
      ar: 'فحص شامل، تنظيف الأسنان وإزالة الجير، الحشوات التجميلية، وعلاج اللثة.',
      tr: 'Kapsamlı diş muayenesi, diş taşı temizliği, estetik dolgular ve diş eti bakımı.',
      en: 'Comprehensive oral examination, scaling & polishing, composite fillings, and gum health.'
    },
    badge: {
      ar: 'شائع وموصى به',
      tr: 'Popüler & Rutin',
      en: 'Popular & Routine'
    }
  },
  {
    id: 'orthodontics',
    iconName: 'Smile',
    durationMinutes: 45,
    slotOffset: 1,
    titles: {
      ar: 'تقويم وتعديل الأسنان',
      tr: 'Ortodonti (Tel & Şeffaf Plak)',
      en: 'Orthodontics (Braces & Aligners)'
    },
    descriptions: {
      ar: 'تصحيح إطباق الفكين، تقويم الأسنان المعدني والشفاف (Invisalign) لابتسامة متناسقة.',
      tr: 'Çene kapanış düzeltmesi, klasik diş teli ve şeffaf plak (telsiz) ortodonti tedavileri.',
      en: 'Bite correction, traditional braces, and clear aligners for all ages.'
    },
    badge: {
      ar: 'أخصائي تقويم',
      tr: 'Uzman Hekim',
      en: 'Specialist'
    }
  },
  {
    id: 'dental-implants',
    iconName: 'Sparkles',
    durationMinutes: 60,
    slotOffset: 2,
    titles: {
      ar: 'زراعة وجراحة الأسنان',
      tr: 'İmplant Tedavisi & Cerrahi',
      en: 'Dental Implants & Surgery'
    },
    descriptions: {
      ar: 'تعويض الأسنان المفقودة بأحدث زرعات التيتانيوم الألمانية والسويسرية، وجراحة الفم.',
      tr: 'Eksik dişlerin ileri implant teknolojisi ile giderilmesi, kemik grefti ve çene cerrahisi.',
      en: 'Permanent tooth replacement using premium titanium implants and advanced oral surgery.'
    },
    badge: {
      ar: 'جراحة متطورة',
      tr: 'İleri Cerrahi',
      en: 'Advanced Surgery'
    }
  },
  {
    id: 'teeth-whitening',
    iconName: 'SunMedium',
    durationMinutes: 45,
    slotOffset: 3,
    titles: {
      ar: 'تبييض وتجميل الابتسامة',
      tr: 'Diş Beyazlatma & Gülüş Tasarımı',
      en: 'Teeth Whitening & Smile Design'
    },
    descriptions: {
      ar: 'تبييض الأسنان بالليزر، عدسات الأسنان (الفينير واللومينير)، وتصميم ابتسامة هوليوود.',
      tr: 'Klinik tipi lazer beyazlatma, porselen lamine, zirkonyum kaplama ve Hollywood gülüşü.',
      en: 'In-office laser whitening, porcelain veneers, zirconia crowns, and aesthetic smile makeover.'
    },
    badge: {
      ar: 'نتائج فورية',
      tr: 'Aynı Gün Sonuç',
      en: 'Same-day Results'
    }
  },
  {
    id: 'endodontics',
    iconName: 'Activity',
    durationMinutes: 50,
    slotOffset: 4,
    titles: {
      ar: 'علاج جذور وأعصاب الأسنان',
      tr: 'Kanal Tedavisi (Endodonti)',
      en: 'Root Canal & Endodontics'
    },
    descriptions: {
      ar: 'معالجة فورية للآلام الشديدة، تنظيف وتعقيم قنوات الجذور بأحدث الأجهزة الميكروسكوبية.',
      tr: 'Akut ağrıların dindirilmesi, tek seansta dijital döner aletlerle ağrısız kanal tedavisi.',
      en: 'Pain relief, digital rotary root canal treatment, preserving natural teeth from extraction.'
    },
    badge: {
      ar: 'تسكين فوري للألم',
      tr: 'Ağrısız & Hızlı',
      en: 'Pain Relief'
    }
  },
  {
    id: 'pediatric-dentistry',
    iconName: 'HeartHandshake',
    durationMinutes: 30,
    slotOffset: 5,
    titles: {
      ar: 'طب أسنان الأطفال (بيدودونتي)',
      tr: 'Çocuk Diş Hekimliği (Pedodonti)',
      en: 'Pediatric Dentistry'
    },
    descriptions: {
      ar: 'بيئة مريحة وودودة للأطفال، وقاية بالفلورايد، سد شقوق الأسنان، وعلاج أسنان الحليب.',
      tr: 'Çocuklara özel sevecen yaklaşım, flor uygulamaları, fissür örtücü ve süt dişi tedavileri.',
      en: 'Gentle, child-friendly care, fluoride varnish, dental sealants, and primary teeth care.'
    },
    badge: {
      ar: 'صديق للأطفال',
      tr: 'Çocuk Dostu',
      en: 'Kids Friendly'
    }
  }
];

/**
 * Generates independent department-specific time slots strictly between 11:00 and 23:00.
 */
export function getDepartmentTimeSlots(deptId: string, dateStr: string): TimeSlot[] {
  const dept = DEPARTMENTS.find(d => d.id === deptId) || DEPARTMENTS[0];
  const slots: TimeSlot[] = [];

  // Generate slots depending on department duration
  let currentHour = 11;
  let currentMinute = 0;
  const endHour = 23;

  // Pediatric closes slightly earlier at 21:00
  const maxHour = dept.id === 'pediatric-dentistry' ? 21 : endHour;
  const stepMinutes = dept.durationMinutes === 60 ? 60 : dept.durationMinutes === 45 ? 45 : dept.durationMinutes === 50 ? 50 : 30;

  let slotIndex = 0;
  while (currentHour < maxHour || (currentHour === maxHour && currentMinute === 0)) {
    // If end boundary reached, break
    if (currentHour === maxHour && currentMinute > 0) break;
    if (currentHour >= 23) break;

    const hourStr = String(currentHour).padStart(2, '0');
    const minStr = String(currentMinute).padStart(2, '0');
    const timeStr = `${hourStr}:${minStr}`;

    // Categorize period
    let period: 'morning' | 'afternoon' | 'evening' = 'morning';
    if (currentHour >= 18) {
      period = 'evening';
    } else if (currentHour >= 14) {
      period = 'afternoon';
    }

    // Deterministic booked slots simulation based on date + deptId + slot
    // Structured appointment schedule: some slots are occupied, some are open
    const hash = simpleHash(`${dateStr}-${dept.id}-${timeStr}`);
    // ~25% booked rate, deterministic for repeatability
    const isBooked = (hash % 100) < 26;

    slots.push({
      time: timeStr,
      available: !isBooked,
      period
    });

    // Advance time
    currentMinute += stepMinutes;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
    slotIndex++;
    if (slotIndex > 30) break; // safety guard
  }

  return slots;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}
