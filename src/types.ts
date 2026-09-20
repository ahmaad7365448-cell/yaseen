export type Language = 'ar' | 'tr' | 'en';

export interface Department {
  id: string;
  iconName: string;
  durationMinutes: number;
  titles: Record<Language, string>;
  descriptions: Record<Language, string>;
  badge: Record<Language, string>;
  slotOffset: number; // For independent department slot scheduling
}

export interface TimeSlot {
  time: string; // e.g. "11:00", "11:30"
  available: boolean;
  period: 'morning' | 'afternoon' | 'evening';
}

export interface BookingData {
  departmentId: string;
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:mm
  firstName: string;
  lastName: string;
  notes?: string;
}

export type WizardStep = 1 | 2 | 3 | 4;

export interface FAQItem {
  id: string;
  category: Record<Language, string>;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface ClinicalCase {
  id: string;
  image: string;
  departmentId: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  description: Record<Language, string>;
  duration: Record<Language, string>;
  highlights: Record<Language, string[]>;
}

