import { Department, TimeSlot, ClinicBookingRecord } from '../types';

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

const CLINIC_BOOKINGS_STORAGE_KEY = 'clinic_universal_bookings_v2';

/**
 * Retrieves all stored clinic bookings from localStorage across all departments.
 */
export function getStoredClinicBookings(): ClinicBookingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CLINIC_BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ClinicBookingRecord[];
  } catch (err) {
    console.error('Failed to read clinic bookings from storage', err);
    return [];
  }
}

/**
 * Records a new confirmed appointment into the universal clinic booking registry.
 * This lock is applied clinic-wide across ALL departments.
 */
export function recordClinicBooking(booking: {
  departmentId: string;
  selectedDate: string;
  selectedTime: string;
  patientName: string;
}): ClinicBookingRecord {
  const current = getStoredClinicBookings();
  const existingIndex = current.findIndex(
    b => b.selectedDate === booking.selectedDate && b.selectedTime === booking.selectedTime
  );

  const newRecord: ClinicBookingRecord = {
    id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    departmentId: booking.departmentId,
    selectedDate: booking.selectedDate,
    selectedTime: booking.selectedTime,
    patientName: booking.patientName,
    createdAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    current[existingIndex] = newRecord;
  } else {
    current.push(newRecord);
  }

  try {
    localStorage.setItem(CLINIC_BOOKINGS_STORAGE_KEY, JSON.stringify(current));
    // Dispatch custom event to notify any open components
    window.dispatchEvent(new CustomEvent('clinic-booking-updated', { detail: newRecord }));
  } catch (err) {
    console.error('Failed to write clinic booking to storage', err);
  }

  return newRecord;
}

/**
 * Checks if a specific date and time slot is booked anywhere in the clinic.
 * If booked in ANY department, returns isBooked: true so no department can pick it.
 */
export function isSlotBookedClinicWide(dateStr: string, timeStr: string): { isBooked: boolean; booking?: ClinicBookingRecord } {
  const bookings = getStoredClinicBookings();
  const found = bookings.find(b => b.selectedDate === dateStr && b.selectedTime === timeStr);
  if (found) {
    return { isBooked: true, booking: found };
  }

  return { isBooked: false };
}

/**
 * Generates uniform, reliable time slots strictly between 11:00 and 23:00.
 * Any booked slot is LOCKED CLINIC-WIDE across all departments and specialties.
 */
export function getDepartmentTimeSlots(deptId: string, dateStr: string): TimeSlot[] {
  const slots: TimeSlot[] = [];

  // Standardized clinic working hours: strictly 11:00 to 23:00 (every 30 minutes)
  const startHour = 11;
  const endHour = 23;

  // Check today's date for past hours filtering
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const localTodayStr = `${year}-${month}-${day}`;
  const isSelectedDateToday = dateStr === localTodayStr;
  const isPastDate = dateStr < localTodayStr;
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute of [0, 30]) {
      const hourStr = String(hour).padStart(2, '0');
      const minStr = String(minute).padStart(2, '0');
      const timeStr = `${hourStr}:${minStr}`;

      // Categorize period
      let period: 'morning' | 'afternoon' | 'evening' = 'morning';
      if (hour >= 18) {
        period = 'evening';
      } else if (hour >= 14) {
        period = 'afternoon';
      }

      // Check 1: If date is in the past
      if (isPastDate) {
        slots.push({
          time: timeStr,
          available: false,
          period,
          bookedReason: 'past'
        });
        continue;
      }

      // Check 2: If today, has this slot already passed?
      const slotTotalMinutes = hour * 60 + minute;
      const isPastToday = isSelectedDateToday && slotTotalMinutes <= currentTotalMinutes;

      // Check 3: Universal clinic-wide booking (locked across all departments)
      const clinicStatus = isSlotBookedClinicWide(dateStr, timeStr);

      let available = true;
      let bookedReason: 'past' | 'booked' | undefined = undefined;

      if (isPastToday) {
        available = false;
        bookedReason = 'past';
      } else if (clinicStatus.isBooked) {
        available = false;
        bookedReason = 'booked';
      }

      slots.push({
        time: timeStr,
        available,
        period,
        bookedReason
      });
    }
  }

  return slots;
}


