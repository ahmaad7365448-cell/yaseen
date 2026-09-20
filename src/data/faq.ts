import { FAQItem, Language } from '../types';

export const FAQ_CATEGORIES: { id: string; labels: Record<Language, string> }[] = [
  {
    id: 'all',
    labels: {
      ar: 'جميع الأسئلة',
      tr: 'Tüm Sorular',
      en: 'All Questions'
    }
  },
  {
    id: 'appointments',
    labels: {
      ar: 'المواعيد والحجز',
      tr: 'Randevu & Rezervasyon',
      en: 'Appointments & Booking'
    }
  },
  {
    id: 'clinic',
    labels: {
      ar: 'العيادة وساعات العمل',
      tr: 'Klinik & Çalışma Saatleri',
      en: 'Clinic & Hours'
    }
  },
  {
    id: 'treatments',
    labels: {
      ar: 'العلاجات والخدمات',
      tr: 'Tedaviler & Hizmetler',
      en: 'Treatments & Care'
    }
  },
  {
    id: 'payment',
    labels: {
      ar: 'طرق الدفع والتأمين',
      tr: 'Ödeme & Fiyatlandırma',
      en: 'Payment & Pricing'
    }
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: {
      ar: 'المواعيد والحجز',
      tr: 'Randevu & Rezervasyon',
      en: 'Appointments & Booking'
    },
    question: {
      ar: 'كيف يتم تأكيد موعدي بعد إرسال رسالة الواتساب؟',
      tr: 'WhatsApp mesajı gönderdikten sonra randevum nasıl onaylanır?',
      en: 'How is my appointment confirmed after sending the WhatsApp message?'
    },
    answer: {
      ar: 'بمجرد الضغط على زر "تأكيد الحجز عبر واتساب"، سيتم توجيهك مباشرةً إلى محادثة العيادة مع رسالة منسقة وجاهزة تحتوي على كامل بياناتك (الاسم، القسم، التاريخ، والوقت). يقوم فريق الاستقبال في عيادة د. ياسين الهاشمي بالرد الفوري لتأكيد حجز مقعدك وتقديم أي إرشادات تسبق الزيارة.',
      tr: '"WhatsApp ile Randevuyu Onayla" butonuna tıkladığınızda, adınız, seçilen bölüm, tarih ve saati içeren hazır bir mesajla doğrudan klinik sohbetimize yönlendirilirsiniz. Dt. Yasin El-Haşimi kliniği resepsiyon ekibimiz randevunuzu anında teyit eder ve gerekli ön bilgilendirmeyi sağlar.',
      en: 'Once you click "Confirm Booking via WhatsApp", you will be directed to the clinic chat with a pre-filled message detailing your name, selected department, date, and time. Dr. Yassin Al-Hashimi\'s reception desk will promptly verify your slot and share any pre-visit guidance.'
    }
  },
  {
    id: 'faq-2',
    category: {
      ar: 'العيادة وساعات العمل',
      tr: 'Klinik & Çalışma Saatleri',
      en: 'Clinic & Hours'
    },
    question: {
      ar: 'ما هي أوقات وساعات العمل في عيادة د. ياسين الهاشمي في بورصة؟',
      tr: 'Dt. Yasin El-Haşimi Bursa kliniğinin çalışma saatleri nelerdir?',
      en: 'What are the operating hours at Dr. Yassin Al-Hashimi clinic in Bursa?'
    },
    answer: {
      ar: 'تستقبل العيادة المرضى يومياً من الساعة 11:00 صباحاً وحتى 11:00 مساءً (11:00 – 23:00). تتيح هذه الساعات المسائية الممتدة للمرضى وأصحاب الأعمال والطلاب زيارتنا في أوقات مريحة بعد انتهاء ساعات الدوام الرسمي.',
      tr: 'Kliniğimiz haftanın her günü sabah 11:00 ile akşam 23:00 (11:00 AM – 11:00 PM) saatleri arasında hizmet vermektedir. Bu esnek ve uzun çalışma saatleri sayesinde çalışanlar ve öğrenciler mesai sonrası rahatlıkla randevu alabilirler.',
      en: 'The clinic is open daily from 11:00 AM to 11:00 PM (11:00 – 23:00). These extended evening hours provide convenient flexibility for working professionals and families to visit after standard working hours.'
    }
  },
  {
    id: 'faq-3',
    category: {
      ar: 'المواعيد والحجز',
      tr: 'Randevu & Rezervasyon',
      en: 'Appointments & Booking'
    },
    question: {
      ar: 'هل يمكنني تغيير موعدي أو إلغاؤه في حال طرأ ظرف طارئ؟',
      tr: 'Acil bir durumda randevumu erteleyebilir veya iptal edebilir miyim?',
      en: 'Can I reschedule or cancel my appointment if needed?'
    },
    answer: {
      ar: 'نعم بكل تأكيد. نرجو إخطارنا قبل 3 ساعات على الأقل من موعدك عبر الواتساب على الرقم 05392268839 أو عبر الاتصال المباشر حتى نتمكن من تعديل الموعد لوقت آخر يناسبك وإتاحة المقعد لمرضى آخرين.',
      tr: 'Evet, kesinlikle. Randevu saatinden en az 3 saat önce 0539 226 88 39 numaralı WhatsApp hattımızdan veya doğrudan arayarak bilgi vermeniz durumunda randevunuzu uygun yeni bir zamana erteleyebiliriz.',
      en: 'Yes, absolutely. Please notify us at least 3 hours prior to your scheduled time via WhatsApp (+90 539 226 88 39) or by phone so we can reschedule your visit to a convenient slot.'
    }
  },
  {
    id: 'faq-4',
    category: {
      ar: 'العيادة وساعات العمل',
      tr: 'Klinik & Çalışma Saatleri',
      en: 'Clinic & Hours'
    },
    question: {
      ar: 'أين تقع العيادة في بورصة، وهل تتوفر مواقف للسيارات؟',
      tr: 'Klinik Bursa\'da tam olarak nerede ve otopark imkanı var mı?',
      en: 'Where is the clinic located in Bursa, and is parking available?'
    },
    answer: {
      ar: 'تقع عيادتنا في عثمان غازي في موقع حيوي ومركزي في مدينة بورصة يسهل الوصول إليه عبر وسائل المواصلات العامة ومترو بورصة. كما تتوفر مواقف مخصصة وقريبة لسيارات مراجعي العيادة. يمكنك طلب رابط الموقع الجغرافي المباشر عبر الواتساب.',
      tr: 'Kliniğimiz Bursa Osmangazi merkezinde, toplu taşıma ve metro hatlarına yakın, kolay ulaşılabilir bir noktada yer almaktadır. Ayrıca hastalarımız için yakın otopark alanları mevcuttur. Konum bilgisi için WhatsApp hattımızdan canlı konum talep edebilirsiniz.',
      en: 'Our clinic is conveniently located in Osmangazi, central Bursa with rapid access via public transit and Bursa metro. Dedicated and nearby parking spaces are readily available for patients. You can request a live GPS pin via our WhatsApp line.'
    }
  },
  {
    id: 'faq-5',
    category: {
      ar: 'العلاجات والخدمات',
      tr: 'Tedaviler & Hizmetler',
      en: 'Treatments & Care'
    },
    question: {
      ar: 'ماذا أحضر معي في زيارتي الأولى لطبيب الأسنان؟',
      tr: 'İlk muayeneye gelirken yanımda ne getirmeliyim?',
      en: 'What should I bring with me on my first dental consultation?'
    },
    answer: {
      ar: 'يُفضل إحضار بطاقة الهوية الشخصية (الكملك أو الإقامة أو جواز السفر)، وأي صور أشعة سينية أو تقارير سابقة للأسنان إن وُجدت، بالإضافة إلى قائمة بأي أدوية مزمنة أو حالات صحية عامة (مثل السكري أو الضغط) لإحاطة الطبيب بها بدقة.',
      tr: 'Kimlik belgeniz (T.C. kimlik, ikametgah veya pasaport), varsa son 6 aya ait panoramik diş röntgenleriniz ve düzenli kullandığınız ilaçların (diyabet, tansiyon vb.) bilgisini hekimimizle paylaşmak üzere yanınızda bulundurmanız yeterlidir.',
      en: 'Please bring your valid ID (Kimlik, residence permit, or passport), any recent dental panoramic X-rays or treatment records if available, and a list of current medications or general health conditions (e.g. diabetes or hypertension).'
    }
  },
  {
    id: 'faq-6',
    category: {
      ar: 'العلاجات والخدمات',
      tr: 'Tedaviler & Hizmetler',
      en: 'Treatments & Care'
    },
    question: {
      ar: 'كيف يتم التعامل مع الحالات الطارئة والآلام الحادة؟',
      tr: 'Şiddetli diş ağrısı veya acil durumlarda nasıl yardımcı oluyorsunuz?',
      en: 'How are dental emergencies and acute toothaches handled?'
    },
    answer: {
      ar: 'نولي حالات الألم الحاد والكسور الطارئة أولوية قصوى. نظراً لعملنا حتى الساعة 11:00 ليلاً، نوفر استجابة سريعة للسيطرة الفورية على الألم وإجراء الإسعاف السني اللازم بعد التواصل الفوري عبر هاتف العيادة أو الواتساب.',
      tr: 'Şiddetli ağrı, travma veya kırık diş gibi acil durumlara öncelik veriyoruz. Akşam saat 23:00\'e kadar açık olmamız sayesinde, WhatsApp veya telefon üzerinden acil durumunuzu bildirdiğinizde sizi beklemeden ilk müdahaleye alıyoruz.',
      en: 'We prioritize acute pain, dental trauma, and broken teeth. Operating until 11:00 PM allows us to provide rapid relief and urgent care; please notify us via WhatsApp or phone so the team can prepare for your immediate arrival.'
    }
  },
  {
    id: 'faq-7',
    category: {
      ar: 'العلاجات والخدمات',
      tr: 'Tedaviler & Hizmetler',
      en: 'Treatments & Care'
    },
    question: {
      ar: 'ما هي اللغات التي يتحدث بها د. ياسين الهاشمي وفريق العمل؟',
      tr: 'Dt. Yasin El-Haşimi ve klinik ekibi hangi dilleri konuşmaktadır?',
      en: 'Which languages are spoken by Dr. Yassin Al-Hashimi and the clinic staff?'
    },
    answer: {
      ar: 'يتحدث الدكتور ياسين الهاشمي وفريق العيادة اللغات العربية والتركية والإنجليزية بطلاقة تامة، مما يضمن تواصلاً مريحاً ودقيقاً للمرضى المقيمين والوافدين في تركيا وفهماً كاملاً لكافة تفاصيل الخطة العلاجية.',
      tr: 'Dt. Yasin El-Haşimi ve kliniğimiz personeli Türkçe, Arapça ve İngilizce dillerini akıcı bir şekilde konuşmaktadır. Bu sayede hem yerli hem yabancı hastalarımız tedavi planlarını kendi dillerinde rahatça tartışabilir.',
      en: 'Dr. Yassin Al-Hashimi and the clinic staff are fully fluent in Arabic, Turkish, and English, ensuring smooth, clear communication and complete comfort regarding all treatment plans and procedures.'
    }
  },
  {
    id: 'faq-8',
    category: {
      ar: 'طرق الدفع والتأمين',
      tr: 'Ödeme & Fiyatlandırma',
      en: 'Payment & Pricing'
    },
    question: {
      ar: 'ما هي طرق الدفع المتاحة داخل العيادة؟',
      tr: 'Klinikte geçerli olan ödeme yöntemleri nelerdir?',
      en: 'What payment methods are accepted at the clinic?'
    },
    answer: {
      ar: 'نقبل الدفع النقدي (بالليرة التركية أو العملات الأجنبية الرئيسية)، وكافة البطاقات الائتمانية والبنكية التركية والدولية (Visa وMastercard)، بالإضافة إلى إمكانية التحويل البنكي المباشر (Havale / EFT).',
      tr: 'Nakit ödeme (Türk Lirası ve başlıca dövizler), tüm yerli ve uluslararası kredi kartları / banka kartları (Visa & MasterCard) ve banka havalesi / EFT ile ödeme kabul edilmektedir.',
      en: 'We accept cash payments (in Turkish Lira and major currencies), all domestic and international credit/debit cards (Visa & MasterCard), as well as direct bank wire transfers (Havale / EFT).'
    }
  },
  {
    id: 'faq-9',
    category: {
      ar: 'العلاجات والخدمات',
      tr: 'Tedaviler & Hizmetler',
      en: 'Treatments & Care'
    },
    question: {
      ar: 'ما هي معايير التعقيم والسلامة المتبعة في العيادة؟',
      tr: 'Klinikte uygulanan hijyen ve sterilizasyon standartları nelerdir?',
      en: 'What sterilization and hygiene standards are followed in the clinic?'
    },
    answer: {
      ar: 'نلتزم بأعلى معايير التعقيم الطبي العالمية باستخدام أجهزة الأوتوكلاف الحديثة الفئة (Class B Autoclave)، مع تغليف الأدوات حرارياً واستخدام أدوات فردية معقمة ذات الاستخدام الواحد لكل مريض لضمان أقصى درجات الأمان والوقاية.',
      tr: 'En yüksek tıbbi sterilizasyon standartlarını uyguluyoruz. Tüm aletler modern Class B otoklav cihazlarında sterilize edilip tek tek paketlenir. Her hastada kişiye özel tek kullanımlık steril sarf malzemeleri kullanılır.',
      en: 'We adhere to the highest global dental hygiene protocols using advanced Class B autoclaves, thermal pouch sealing, and single-use disposable consumables for every patient to guarantee total safety.'
    }
  }
];

export const FAQ_UI_TEXT: Record<Language, {
  sectionBadge: string;
  sectionTitle: string;
  sectionSubtitle: string;
  searchPlaceholder: string;
  noResultsTitle: string;
  noResultsDesc: string;
  clearFilter: string;
  needMoreHelpTitle: string;
  needMoreHelpDesc: string;
  askOnWhatsApp: string;
  callClinic: string;
  openCount: string;
}> = {
  ar: {
    sectionBadge: 'الأسئلة الشائعة والمعلومات',
    sectionTitle: 'الأسئلة الأكثر تكراراً للمرضى',
    sectionSubtitle: 'إجابات شاملة ومباشرة على استفساراتكم المتعلقة بحجز المواعيد والعلاجات في عيادة د. ياسين الهاشمي في بورصة',
    searchPlaceholder: 'ابحث في الأسئلة الشائعة...',
    noResultsTitle: 'لم يتم العثور على نتائج مطابقة',
    noResultsDesc: 'جرب استخدام كلمات بحث مختلفة أو اختر فئة أخرى من القائمة.',
    clearFilter: 'عرض جميع الأسئلة',
    needMoreHelpTitle: 'هل لديك استفسار آخر لم تجد إجابته؟',
    needMoreHelpDesc: 'فريق الاستقبال متواجد يومياً من 11:00 صباحاً حتى 11:00 مساءً للرد المباشر على كافة استفساراتكم.',
    askOnWhatsApp: 'تواصل مباشرة عبر واتساب',
    callClinic: 'اتصال هاتفي مباشر',
    openCount: 'سؤال مع إجابته'
  },
  tr: {
    sectionBadge: 'Sıkça Sorulan Sorular',
    sectionTitle: 'Hastalarımızdan Gelen Sorular',
    sectionSubtitle: 'Bursa Dt. Yasin El-Haşimi kliniğinde randevu süreci, çalışma saatleri ve tedaviler hakkında merak edilenler',
    searchPlaceholder: 'Sorularda ara...',
    noResultsTitle: 'Eşleşen soru bulunamadı',
    noResultsDesc: 'Lütfen farklı bir arama terimi deneyin veya kategori filtrelerini temizleyin.',
    clearFilter: 'Tüm Soruları Göster',
    needMoreHelpTitle: 'Başka bir sorunuz veya özel durumunuz mu var?',
    needMoreHelpDesc: 'Ekibimiz haftanın her günü 11:00 - 23:00 saatleri arasında sorularınızı yanıtlamaktan memnuniyet duyar.',
    askOnWhatsApp: 'WhatsApp\'tan Hemen Danışın',
    callClinic: 'Kliniği Doğrudan Arayın',
    openCount: 'soru ve yanıtı'
  },
  en: {
    sectionBadge: 'Frequently Asked Questions',
    sectionTitle: 'Common Patient Questions',
    sectionSubtitle: 'Direct answers to help you prepare for your dental visit with Dr. Yassin Al-Hashimi in Bursa',
    searchPlaceholder: 'Search common questions...',
    noResultsTitle: 'No matching questions found',
    noResultsDesc: 'Try searching for different keywords or reset the category filter.',
    clearFilter: 'Show all questions',
    needMoreHelpTitle: 'Have a question that isn\'t answered here?',
    needMoreHelpDesc: 'Our clinic reception desk is available daily from 11:00 AM to 11:00 PM to assist you immediately.',
    askOnWhatsApp: 'Chat on WhatsApp',
    callClinic: 'Call Clinic Directly',
    openCount: 'questions & answers'
  }
};
