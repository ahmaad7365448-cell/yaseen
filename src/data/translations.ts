import { Language } from '../types';

export interface Translations {
  clinicName: string;
  doctorTitle: string;
  clinicTagline: string;
  bursaLocation: string;
  bursaFullAddress: string;
  workingHoursLabel: string;
  workingHoursVal: string;
  workingHoursNotice: string;
  phoneLabel: string;
  phoneNumber: string;

  // Navigation & Stepper
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Common Actions
  btnContinue: string;
  btnBack: string;
  btnEdit: string;
  btnBookWhatsApp: string;
  btnBookingNow: string;
  btnStartOver: string;
  btnCopyMessage: string;
  messageCopied: string;

  // Step 1: Department
  chooseDepartmentHeading: string;
  chooseDepartmentSub: string;
  selectedLabel: string;
  durationLabel: string;
  minutesLabel: string;

  // Step 2: Date & Time
  chooseDateHeading: string;
  chooseDateSub: string;
  chooseTimeHeading: string;
  chooseTimeSub: string;
  timeSlotNotice: string;
  morningSlots: string;
  afternoonSlots: string;
  eveningSlots: string;
  noSlotsAvailable: string;
  selectDateFirst: string;
  slotBooked: string;
  slotAvailable: string;

  // Step 3: Patient Info
  patientInfoHeading: string;
  patientInfoSub: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  additionalNotesLabel: string;
  additionalNotesPlaceholder: string;
  optionalLabel: string;
  requiredError: string;

  // Step 4: Confirmation
  confirmationHeading: string;
  confirmationSub: string;
  appointmentSummary: string;
  patientFullName: string;
  selectedDepartment: string;
  appointmentDate: string;
  appointmentTime: string;
  clinicAddress: string;
  whatsappNoticeTitle: string;
  whatsappNoticeBody: string;
  openWhatsAppDirect: string;

  // Footer
  footerRights: string;
  directCall: string;

  // Theme
  themeLight: string;
  themeDark: string;

  // Days and Months
  weekDays: string[];
  months: string[];
}

export const translations: Record<Language, Translations> = {
  ar: {
    clinicName: 'د. ياسين الهاشمي',
    doctorTitle: 'عيادة طب وجراحة الأسنان',
    clinicTagline: 'خدمات طب أسنان متكاملة ورعاية متطورة',
    bursaLocation: 'بورصة، تركيا',
    bursaFullAddress: 'عثمان غازي، بورصة، تركيا',
    workingHoursLabel: 'ساعات العمل',
    workingHoursVal: '11:00 صباحاً – 11:00 مساءً',
    workingHoursNotice: 'العيادة تستقبل المواعيد يومياً من الساعة 11:00 صباحاً حتى 11:00 ليلاً',
    phoneLabel: 'رقم العيادة',
    phoneNumber: '+90 539 226 88 39',

    step1Title: 'اختيار القسم',
    step1Desc: 'حدد التخصص المطلوب',
    step2Title: 'التاريخ والوقت',
    step2Desc: 'اختر الموعد المناسب',
    step3Title: 'بيانات المريض',
    step3Desc: 'الاسم الأول واسم العائلة',
    step4Title: 'تأكيد الحجز',
    step4Desc: 'الإرسال عبر واتساب',

    btnContinue: 'متابعة الخطوة التالية',
    btnBack: 'العودة للخلف',
    btnEdit: 'تعديل',
    btnBookWhatsApp: 'تأكيد الموعد عبر واتساب',
    btnBookingNow: 'جارٍ فتح واتساب...',
    btnStartOver: 'حجز موعد جديد',
    btnCopyMessage: 'نسخ نص الرسالة',
    messageCopied: 'تم نسخ نص الحجز بنجاح!',

    chooseDepartmentHeading: 'اختر القسم الطبي المناسب',
    chooseDepartmentSub: 'يرجى تحديد تخصص طب الأسنان المطلوب لبدء عملية الحجز المنظمة',
    selectedLabel: 'تم الاختيار',
    durationLabel: 'المدة المقدرة للجلسة',
    minutesLabel: 'دقيقة',

    chooseDateHeading: 'حدد يوم الموعد',
    chooseDateSub: 'اختر يوماً مناسباً من التقويم التفاعلي (المواعيد متاحة للأيام القادمة)',
    chooseTimeHeading: 'حدد التوقيت المفضل',
    chooseTimeSub: 'أوقات العمل المعتمدة للقسم المختار من 11:00 صباحاً حتى 11:00 مساءً',
    timeSlotNotice: 'تتم جدولة أوقات المواعيد لكل تخصص بشكل مستقل وفق جاهزية العيادة والأجهزة',
    morningSlots: 'الفترة الصباحية والظهيرة (11:00 – 14:00)',
    afternoonSlots: 'فترة بعد الظهر (14:00 – 18:00)',
    eveningSlots: 'الفترة المسائية (18:00 – 23:00)',
    noSlotsAvailable: 'لا توجد خانات متاحة في هذا اليوم، يرجى اختيار تاريخ آخر',
    selectDateFirst: 'يرجى تحديد اليوم أولاً لعرض الفترات الزمنية الشاغرة',
    slotBooked: 'محجوز',
    slotAvailable: 'متاح',

    patientInfoHeading: 'معلومات المريض الأساسية',
    patientInfoSub: 'أدخل الاسم الأول واسم العائلة للتسجيل بدقة في ملف المراجعة',
    firstNameLabel: 'الاسم الأول',
    firstNamePlaceholder: 'مثال: أحمد',
    lastNameLabel: 'اسم العائلة',
    lastNamePlaceholder: 'مثال: العلي',
    additionalNotesLabel: 'ملاحظة أو شكوى محددة',
    additionalNotesPlaceholder: 'مثال: ألم في الضرس الخلفي، أو استشارة لتبييض الأسنان...',
    optionalLabel: 'اختياري',
    requiredError: 'هذا الحقل مطلوب لإتمام الحجز',

    confirmationHeading: 'مراجعة وتأكيد الموعد',
    confirmationSub: 'تحقق من صحة تفاصيل الموعد قبل التوجه إلى تطبيق واتساب لإرساله مباشرة للدكتور',
    appointmentSummary: 'بطاقة ملخص الموعد',
    patientFullName: 'اسم المريض',
    selectedDepartment: 'القسم الطبي',
    appointmentDate: 'تاريخ الموعد',
    appointmentTime: 'توقيت الموعد',
    clinicAddress: 'مقر العيادة',
    whatsappNoticeTitle: 'حجز فوري ومباشر عبر واتساب',
    whatsappNoticeBody: 'عند النقر على الزر أدناه، سيتم توليد رسالة الحجز تلقائياً وفتح محادثة واتساب الرسمية مع د. ياسين الهاشمي (+90 539 226 88 39) لتأكيد الموعد فوراً.',
    openWhatsAppDirect: 'فتح محادثة واتساب المباشرة',

    footerRights: 'جميع الحقوق محفوظة © عيادة د. ياسين الهاشمي لطب الأسنان',
    directCall: 'اتصال مباشر',
    themeLight: 'الوضع النهاري',
    themeDark: 'الوضع الليلي',

    weekDays: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    months: [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ]
  },

  tr: {
    clinicName: 'Dt. Yasin El-Haşimi',
    doctorTitle: 'Diş Hekimliği & Cerrahi Kliniği',
    clinicTagline: 'Bursa\'da ileri teknoloji ve modern diş sağlığı hizmeti',
    bursaLocation: 'Bursa, Türkiye',
    bursaFullAddress: 'Osmangazi, Bursa, Türkiye',
    workingHoursLabel: 'Çalışma Saatleri',
    workingHoursVal: '11:00 – 23:00',
    workingHoursNotice: 'Kliniğimiz haftanın her günü saat 11:00 ile 23:00 arasında hizmet vermektedir.',
    phoneLabel: 'Klinik İletişim',
    phoneNumber: '+90 539 226 88 39',

    step1Title: 'Bölüm Seçimi',
    step1Desc: 'Tedavi alanını belirleyin',
    step2Title: 'Tarih ve Saat',
    step2Desc: 'Uygun zamanı seçin',
    step3Title: 'Hasta Bilgileri',
    step3Desc: 'Ad ve Soyad girişi',
    step4Title: 'Randevu Onayı',
    step4Desc: 'WhatsApp ile gönder',

    btnContinue: 'Sonraki Adıma Geç',
    btnBack: 'Geri Dön',
    btnEdit: 'Düzenle',
    btnBookWhatsApp: 'WhatsApp ile Randevu Al',
    btnBookingNow: 'WhatsApp Açılıyor...',
    btnStartOver: 'Yeni Randevu Oluştur',
    btnCopyMessage: 'Mesaj Metnini Kopyala',
    messageCopied: 'Randevu mesajı panoya kopyalandı!',

    chooseDepartmentHeading: 'Lütfen Diş Tedavi Bölümünü Seçiniz',
    chooseDepartmentSub: 'Randevu sürecine başlamak için muayene veya tedavi talep ettiğiniz branşı seçiniz',
    selectedLabel: 'Seçildi',
    durationLabel: 'Tahmini Süre',
    minutesLabel: 'dakika',

    chooseDateHeading: 'Randevu Tarihini Seçiniz',
    chooseDateSub: 'Takvimden size en uygun günü belirleyiniz (Mevcut ve ileri tarihler açıktır)',
    chooseTimeHeading: 'Randevu Saatini Seçiniz',
    chooseTimeSub: 'Kliniğimiz çalışma saatleri 11:00 - 23:00 arasındadır',
    timeSlotNotice: 'Her bölümün randevu saatleri, sterilizasyon ve hekim planlamasına göre bağımsız yönetilmektedir.',
    morningSlots: 'Öğle Öncesi & Öğle (11:00 – 14:00)',
    afternoonSlots: 'Öğleden Sonra (14:00 – 18:00)',
    eveningSlots: 'Akşam Kuşağı (18:00 – 23:00)',
    noSlotsAvailable: 'Bu tarihte uygun randevu saati bulunamadı, lütfen başka bir gün seçiniz.',
    selectDateFirst: 'Müsait saatleri görüntülemek için lütfen önce bir tarih seçiniz',
    slotBooked: 'Dolu',
    slotAvailable: 'Müsait',

    patientInfoHeading: 'Hasta İletişim Bilgileri',
    patientInfoSub: 'Kayıt ve karşılama için lütfen adınızı ve soyadınızı eksiksiz giriniz',
    firstNameLabel: 'Adınız',
    firstNamePlaceholder: 'Örn: Mehmet',
    lastNameLabel: 'Soyadınız',
    lastNamePlaceholder: 'Örn: Yılmaz',
    additionalNotesLabel: 'Ek Şikayet veya Not',
    additionalNotesPlaceholder: 'Örn: Diş ağrısı, implant kontrolü veya diş beyazlatma danışmanlığı...',
    optionalLabel: 'İsteğe Bağlı',
    requiredError: 'Bu alan randevu kaydı için zorunludur',

    confirmationHeading: 'Randevu Detayları & WhatsApp Onayı',
    confirmationSub: 'Bilgilerinizi kontrol ediniz; onay butonuna bastığınızda WhatsApp üzerinden hekime doğrudan iletilecektir.',
    appointmentSummary: 'Randevu Özeti Fişi',
    patientFullName: 'Hasta Adı Soyadı',
    selectedDepartment: 'Seçilen Bölüm',
    appointmentDate: 'Randevu Tarihi',
    appointmentTime: 'Randevu Saati',
    clinicAddress: 'Klinik Adresi',
    whatsappNoticeTitle: 'Doğrudan WhatsApp İle Hızlı Randevu',
    whatsappNoticeBody: 'Butona tıkladığınızda randevu detaylarınız hazır bir mesaj formatında +90 539 226 88 39 numaralı Dt. Yasin El-Haşimi hattına yönlendirilecek ve anında teyit alacaksınız.',
    openWhatsAppDirect: 'WhatsApp Görüşmesini Başlat',

    footerRights: 'Tüm hakları saklıdır © Dt. Yasin El-Haşimi Diş Kliniği',
    directCall: 'Doğrudan Ara',
    themeLight: 'Gündüz Modu',
    themeDark: 'Gece Modu',

    weekDays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    months: [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ]
  },

  en: {
    clinicName: 'Dr. Yassin Al-Hashimi',
    doctorTitle: 'Dental & Oral Surgery Clinic',
    clinicTagline: 'Modern, comprehensive dental care in Bursa, Turkey',
    bursaLocation: 'Bursa, Turkey',
    bursaFullAddress: 'Osmangazi, Bursa, Turkey',
    workingHoursLabel: 'Working Hours',
    workingHoursVal: '11:00 AM – 11:00 PM',
    workingHoursNotice: 'Our clinic welcomes appointments daily strictly from 11:00 AM to 11:00 PM.',
    phoneLabel: 'Clinic Telephone',
    phoneNumber: '+90 539 226 88 39',

    step1Title: 'Department',
    step1Desc: 'Select dental specialty',
    step2Title: 'Date & Time',
    step2Desc: 'Pick your preferred slot',
    step3Title: 'Patient Info',
    step3Desc: 'First and Last name',
    step4Title: 'Confirmation',
    step4Desc: 'Send via WhatsApp',

    btnContinue: 'Continue to Next Step',
    btnBack: 'Go Back',
    btnEdit: 'Edit',
    btnBookWhatsApp: 'Book Appointment via WhatsApp',
    btnBookingNow: 'Opening WhatsApp...',
    btnStartOver: 'Book Another Appointment',
    btnCopyMessage: 'Copy Message Text',
    messageCopied: 'Appointment message copied to clipboard!',

    chooseDepartmentHeading: 'Select Dental Department',
    chooseDepartmentSub: 'Please choose the dental specialty required for your upcoming visit',
    selectedLabel: 'Selected',
    durationLabel: 'Est. Duration',
    minutesLabel: 'min',

    chooseDateHeading: 'Select Appointment Date',
    chooseDateSub: 'Choose an available day from the interactive calendar',
    chooseTimeHeading: 'Select Appointment Time',
    chooseTimeSub: 'Strict clinic working hours are 11:00 AM to 11:00 PM',
    timeSlotNotice: 'Each dental department operates independent appointment intervals and chair schedules.',
    morningSlots: 'Morning & Midday (11:00 AM – 2:00 PM)',
    afternoonSlots: 'Afternoon (2:00 PM – 6:00 PM)',
    eveningSlots: 'Evening (6:00 PM – 11:00 PM)',
    noSlotsAvailable: 'No open slots on this date, please choose another day.',
    selectDateFirst: 'Please select a date first to view available time slots',
    slotBooked: 'Booked',
    slotAvailable: 'Available',

    patientInfoHeading: 'Patient Information',
    patientInfoSub: 'Enter your First and Last Name for registration and medical records',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'e.g. John',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'e.g. Doe',
    additionalNotesLabel: 'Additional Notes or Concern',
    additionalNotesPlaceholder: 'e.g., Toothache in upper molar, or consultation for whitening...',
    optionalLabel: 'Optional',
    requiredError: 'This field is required to confirm your booking',

    confirmationHeading: 'Review & WhatsApp Booking',
    confirmationSub: 'Review your appointment summary before automatically dispatching it directly to Dr. Yassin Al-Hashimi via WhatsApp.',
    appointmentSummary: 'Appointment Summary Voucher',
    patientFullName: 'Patient Name',
    selectedDepartment: 'Department',
    appointmentDate: 'Appointment Date',
    appointmentTime: 'Appointment Time',
    clinicAddress: 'Clinic Location',
    whatsappNoticeTitle: 'Direct WhatsApp Automation',
    whatsappNoticeBody: 'Clicking the button will generate your appointment request and open WhatsApp directly with Dr. Yassin Al-Hashimi (+90 539 226 88 39) for instant confirmation.',
    openWhatsAppDirect: 'Open WhatsApp Chat',

    footerRights: 'All rights reserved © Dr. Yassin Al-Hashimi Dental Clinic',
    directCall: 'Direct Call',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',

    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  }
};
