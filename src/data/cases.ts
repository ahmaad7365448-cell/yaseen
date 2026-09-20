import { ClinicalCase, Language } from '../types';
import smileMakeoverImg from '../assets/images/smile_makeover_result_1789915659723.jpg';
import dentalImplantImg from '../assets/images/dental_implant_crown_1789915672813.jpg';
import orthoAlignmentImg from '../assets/images/orthodontic_alignment_work_1789915684243.jpg';
import teethWhiteningImg from '../assets/images/teeth_whitening_results_1789915697206.jpg';

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-hollywood-smile',
    image: smileMakeoverImg,
    departmentId: 'teeth-whitening',
    title: {
      ar: 'ابتسامة هوليوود وتجميل الأسنان بعدسات الإيماكس',
      tr: 'Hollywood Gülüş Tasarımı & E-Max Porselen Lamina',
      en: 'Hollywood Smile Makeover & E-Max Porcelain Veneers'
    },
    category: {
      ar: 'تجميل الأسنان والفينير',
      tr: 'Estetik Diş Hekimliği',
      en: 'Cosmetic Dentistry'
    },
    description: {
      ar: 'تصميم ابتسامة رقمي متكامل (DSD) باستخدام قشور إيماكس الألمانية فائقة الدقة. تم إغلاق الفراغات الأمامية وتوحيد اللون والاصطفاف بمظهر طبيعي مشرق يحاكي الأسنان الطبيعية بدقة تامة.',
      tr: 'Dijital Gülüş Tasarımı (DSD) ile kişiye özel hazırlanan ultra ince E-Max porselen laminalar. Dişler arasındaki boşluklar kapatılarak doğal renk ve ışık geçirgenliğine sahip kusursuz bir gülümseme elde edildi.',
      en: 'Digital Smile Design (DSD) using custom precision E-Max porcelain veneers. Corrected gaps and alignment with lifelike natural translucency, tailored to facial symmetry.'
    },
    duration: {
      ar: 'جلستان (خلال 5 أيام)',
      tr: '2 Seans (5 gün içinde)',
      en: '2 Sessions (Within 5 days)'
    },
    highlights: {
      ar: ['قشور إيماكس ألمانية', 'تصميم رقمي ثلاثي الأبعاد', 'ضمان طويل الأمد', 'تطابق لوني فائق الطبيعية'],
      tr: ['Alman E-Max Porselen', '3D Dijital Tasarım', 'Uzun Ömürlü Garanti', 'Doğal Işık Geçirgenliği'],
      en: ['German E-Max Porcelain', '3D Digital Design', 'Long-term Warranty', 'Natural Translucency']
    }
  },
  {
    id: 'case-dental-implant',
    image: dentalImplantImg,
    departmentId: 'dental-implants',
    title: {
      ar: 'زراعة سن فوري مع تاج زركونيا عالي الصلابة',
      tr: 'İleri İmplant Cerrahisi & Zirkonyum Porselen Kuron',
      en: 'Immediate Dental Implant & Aesthetic Zirconia Crown'
    },
    category: {
      ar: 'زراعة وجراحة الفم',
      tr: 'İmplantoloji & Cerrahi',
      en: 'Implants & Surgery'
    },
    description: {
      ar: 'تعويض دائم لسن مفقود باستخدام زرعة تيتانيوم طبية سويسرية الصنع مع تكامل عظمي سريع، وتتويج بتاج زركونيا متطابق تماماً مع الأسنان المجاورة في القوة والشكل.',
      tr: 'Eksik diş bölgesine uygulanan İsviçre menşeili biyolojik titanyum implant ve üzerine yerleştirilen bilgisayar destekli (CAD/CAM) estetik zirkonyum kaplama ile çiğneme fonksiyonu ve estetik tam sağlandı.',
      en: 'Permanent tooth replacement utilizing a premium Swiss titanium implant with rapid osseointegration, capped with a biocompatible monolithic zirconia crown restored to 100% bite functionality.'
    },
    duration: {
      ar: 'جلسة زراعة سريعة بدون ألم',
      tr: 'Ağrısız Hızlı Cerrahi Seansı',
      en: 'Painless Gentle Surgical Session'
    },
    highlights: {
      ar: ['زرعة تيتانيوم سويسرية', 'تاج زركونيا CAD/CAM', 'ثبات مضغ 100%', 'تخدير موضعي مريح'],
      tr: ['İsviçre Titanyum İmplant', 'CAD/CAM Zirkonyum', '%100 Çiğneme Gücü', 'Ağrısız Lokal Anestezi'],
      en: ['Swiss Titanium Implant', 'CAD/CAM Zirconia', '100% Chewing Strength', 'Comfortable Local Anesthesia']
    }
  },
  {
    id: 'case-orthodontics',
    image: orthoAlignmentImg,
    departmentId: 'orthodontics',
    title: {
      ar: 'تقويم الأسنان وتصحيح العضة والازدحام',
      tr: 'Ortodontik Çene & Diş Çapraşıklığı Düzeltimi',
      en: 'Orthodontic Alignment & Bite Correction'
    },
    category: {
      ar: 'تقويم وتعديل الإطباق',
      tr: 'Ortodonti Tedavisi',
      en: 'Orthodontics'
    },
    description: {
      ar: 'علاج ازدحام الأسنان الحاد في الفكين العلوي والسفلي، وتصحيح العضة العميقة لتحقيق تطابق مثالي وظيفي وجمالي يبرز جمال الابتسامة ويحمي المينا من التآكل.',
      tr: 'Üst ve alt çenedeki yoğun diş çapraşıklığı ve derin kapanış bozukluğunun estetik braketler ve modern tellerle başarılı şekilde hizalanması; ideal çene ve diş oklüzyonu sağlandı.',
      en: 'Treatment of severe dental crowding and deep overbite. Realigned dental arches and bite symmetry, safeguarding enamel while creating an evenly proportioned smile arc.'
    },
    duration: {
      ar: 'متابعة دورية منتظمة',
      tr: 'Düzenli Periyodik Takip',
      en: 'Regular Periodic Adjustments'
    },
    highlights: {
      ar: ['اصطفاف أسنان متناسق', 'تعديل الإطباق الوظيفي', 'حماية الفك والمينا', 'ابتسامة واثقة دائمة'],
      tr: ['Kusursuz Diş Dizilimi', 'İdeal Fonksiyonel Kapanış', 'Çene Eklemi Koruması', 'Kalıcı Özgüvenli Gülüş'],
      en: ['Harmonious Dental Alignment', 'Functional Bite Harmony', 'Joint & Enamel Protection', 'Confident Lasting Smile']
    }
  },
  {
    id: 'case-teeth-whitening',
    image: teethWhiteningImg,
    departmentId: 'teeth-whitening',
    title: {
      ar: 'تبييض الأسنان بالليزر وإزالة التصبغات العميقة',
      tr: 'Klinik Lazer Diş Beyazlatma & Derin Parlatma',
      en: 'Advanced Laser Teeth Whitening & Polishing'
    },
    category: {
      ar: 'تبييض وتنظيف تجميلي',
      tr: 'Diş Beyazlatma & Hijyen',
      en: 'Whitening & Hygiene'
    },
    description: {
      ar: 'جلسة تبييض متطورة بتقنية الليزر البارد في العيادة، أزالت تراكمات القهوة والتدخين وفتحت لون الأسنان بمقدار 5 إلى 7 درجات في جلسة واحدة مع حماية حساسية اللثة والأسنان.',
      tr: 'Klinik ortamında soğuk lazer ve özel beyazlatma jeliyle uygulanan güvenli seans. Çay, kahve ve sigara lekeleri derinlemesine temizlenerek dişler 5-7 ton daha beyaz ve ışıltılı hale getirildi.',
      en: 'In-office clinical cold laser whitening with protective gingival barrier. Eradicated stubborn tea, coffee, and smoking stains, elevating the shade by 5–7 tones in a single session without sensitivity.'
    },
    duration: {
      ar: 'جلسة واحدة (45 دقيقة)',
      tr: 'Tek Seans (45 dakika)',
      en: 'Single Session (45 mins)'
    },
    highlights: {
      ar: ['تفتيح من 5 إلى 7 درجات', 'جلسة سريعة في 45 دقيقة', 'حماية تامة للثة والمينا', 'نتائج فورية ملموسة'],
      tr: ['5-7 Ton Beyazlama', '45 Dakikalık Hızlı Seans', 'Diş Eti Koruma Bariyeri', 'Anında Gözle Görülür Sonuç'],
      en: ['5–7 Shades Brighter', 'Rapid 45-min Session', 'Gum & Enamel Shield', 'Instant Visible Results']
    }
  }
];

export const GALLERY_UI_TEXT: Record<Language, {
  badge: string;
  title: string;
  subtitle: string;
  filterAll: string;
  bookService: string;
  viewDetails: string;
  closeModal: string;
  doctorInCharge: string;
  doctorName: string;
  durationLabel: string;
  highlightsLabel: string;
  bursaLocation: string;
  zoomHint: string;
}> = {
  ar: {
    badge: 'معرض الأعمال والنتائج السريرية',
    title: 'نماذج من أعمالنا وابتسامات مرضانا',
    subtitle: 'شاهد نماذج حقيقية وموثقة من العلاجات والتحولات التجميلية المنفذة في عيادة د. ياسين الهاشمي في عثمان غازي، بورصة',
    filterAll: 'جميع الأعمال',
    bookService: 'احجز موعداً لهذا العلاج',
    viewDetails: 'عرض التفاصيل والصورة الكاملة',
    closeModal: 'إغلاق',
    doctorInCharge: 'الطبيب المعالج:',
    doctorName: 'د. ياسين الهاشمي',
    durationLabel: 'مدة الإجراء:',
    highlightsLabel: 'مميزات العلاج:',
    bursaLocation: 'عيادة د. ياسين الهاشمي - عثمان غازي، بورصة',
    zoomHint: 'انقر للتكبير والتفاصيل'
  },
  tr: {
    badge: 'Klinik Vaka & Başarı Galerisi',
    title: 'Tedavi Örneklerimiz & Mutlu Gülüşler',
    subtitle: 'Bursa Osmangazi\'de Dt. Yasin El-Haşimi kliniğinde gerçekleştirilen estetik diş ve cerrahi tedavilerden gerçek vaka sonuçları',
    filterAll: 'Tüm Çalışmalar',
    bookService: 'Bu Tedavi İçin Randevu Al',
    viewDetails: 'Detayları ve Fotoğrafı İncele',
    closeModal: 'Kapat',
    doctorInCharge: 'Uygulayan Hekim:',
    doctorName: 'Dt. Yasin El-Haşimi',
    durationLabel: 'Uygulama Süresi:',
    highlightsLabel: 'Öne Çıkan Özellikler:',
    bursaLocation: 'Dt. Yasin El-Haşimi Kliniği - Osmangazi, Bursa',
    zoomHint: 'Büyütmek ve detaylar için tıklayın'
  },
  en: {
    badge: 'Clinical Work & Smile Transformations',
    title: 'Patient Cases & Real Results',
    subtitle: 'Explore documented clinical outcomes and aesthetic dental restorations achieved at Dr. Yassin Al-Hashimi Clinic in Osmangazi, Bursa',
    filterAll: 'All Cases',
    bookService: 'Book Appointment for this Treatment',
    viewDetails: 'View Full Details & Photo',
    closeModal: 'Close',
    doctorInCharge: 'Lead Dentist:',
    doctorName: 'Dr. Yassin Al-Hashimi',
    durationLabel: 'Procedure Duration:',
    highlightsLabel: 'Case Highlights:',
    bursaLocation: 'Dr. Yassin Al-Hashimi Clinic - Osmangazi, Bursa',
    zoomHint: 'Click to enlarge & view details'
  }
};
