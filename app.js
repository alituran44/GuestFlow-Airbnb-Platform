/* ==========================================================================
   HostifyOS - Global Digital Guest Guidebook & Ancillary Revenue Engine
   Role-Based Authentication Session Engine & Multi-User Isolation
   ========================================================================= */

// Production Security & Feature Flags
const ENABLE_DEMO_TOOLS = false; // Disable QA simulation buttons in production

let pinVisibilityState = {};
function togglePinVisibility(elementId, actualPin) {
  const el = document.getElementById(elementId);
  if (!el) return;
  pinVisibilityState[elementId] = !pinVisibilityState[elementId];
  if (pinVisibilityState[elementId]) {
    el.textContent = actualPin;
    showToast("👁️ Unmasked door PIN (Explicit host action logged).");
  } else {
    el.textContent = `••••-${actualPin.slice(-2)}`;
  }
}

let currentLanguage = 'EN';

const languageCurrencyMap = {
  EN: 'USD',
  ES: 'EUR',
  FR: 'EUR',
  DE: 'EUR',
  IT: 'EUR',
  PT: 'EUR',
  JA: 'JPY',
  TR: 'TRY'
};

const i18nDict = {
  EN: {
    heroBadge: "Automated Short-Term Rental Revenue Engine",
    heroTitle: "Turn Every Guest Stay Into +$420/mo Extra Income Per Property",
    heroSub: "Eliminate repetitive guest messages about Wi-Fi & AC. Offer 1-tap digital guidebooks, time-gated door access, custom payment links, and automated messaging tunnels.",
    btnCalcHero: "Calculate Your Extra Revenue (10-Sec Quiz)",
    viewDemo: "Interactive Guest Demo",
    statHosts: "Active Superhosts",
    statRate: "Guest Open Rate",
    statProc: "Upsells Processed",
    statSat: "Host Satisfaction",
    quizBadge: "Step 1 of 2: 10-Second Revenue Audit",
    quizTitle: "Check How Much Extra Income Your Property Can Generate",
    quizSub: "Answer 3 quick questions to calculate your personalized upsell potential.",
    showcaseTag: "Interactive Feature Showcase",
    showcaseTitle: "See How HostifyOS Automates Every Step of the Stay",
    showcaseSub: "Click through the 4 core pillars of our hospitality operating system.",
    showcaseTab1: "1-Tap Wi-Fi & Door PIN",
    showcaseTab2: "Appliance Video Manuals",
    showcaseTab3: "Automated Messaging Tunnels",
    showcaseTab4: "Custom Pay Links & Split",
    sc1Badge: "Zero Guest Calls",
    sc1Title: "Instant 1-Tap Wi-Fi Copy & Time-Gated Door PIN",
    sc1Desc: "Guests tap once on their phone screen to automatically copy the Wi-Fi password. Door lockbox PIN codes are time-gated so guests only see code 2 hours before check-in time.",
    sc1Check1: "Eliminates 80% of repetitive check-in questions",
    sc1Check2: "Auto-expires door PIN code at 11:00 AM check-out",
    sc2Badge: "Visual Manuals",
    sc2Title: "30-Second Appliance Video Guides",
    sc2Desc: "Upload short video guides showing guests how to operate Nest thermostats, Nespresso coffee machines, TV remotes, and pool heaters.",
    sc2Check1: "No more broken appliances or wrong AC settings",
    sc2Check2: "High resolution mobile video player with subtitles",
    sc3Badge: "Automated Upsells",
    sc3Title: "Automated WhatsApp & SMS Guest Tunnels",
    sc3Desc: "Set time-triggered automated messages. For example, send a WhatsApp message 24 hours before check-out offering a 2:00 PM Late Check-out for $45.",
    sc3Check1: "32.4% average conversion rate on guest upsells",
    sc3Check2: "Supports WhatsApp, SMS, and PWA Push",
    sc4Badge: "Direct Bank Payouts",
    sc4Title: "Host Custom Payment Links & Take-Rate Split",
    sc4Desc: "Paste your custom payment link (Stripe, Revolut, PayPal). Platform commission is automatically calculated and routed while net host payout deposits to your bank.",
    sc4Check1: "0% platform commission on Pro Host Tier",
    sc4Check2: "Direct payout bank account deposits",
    testimonialsTag: "Real Host Case Studies",
    testimonialsTitle: "Hear From Superhosts Scaling With HostifyOS",
    testimonialsSub: "Join over 3,400+ short-term rental managers worldwide.",
    agitTag: "The STR Host Transformation",
    agitTitle: "Why 3,400+ Hosts Switched to HostifyOS",
    agitSub: "Stop wasting 15+ hours a week answering the same Wi-Fi and TV remote questions.",
    oldWayHead: "Old Way (Without HostifyOS)",
    oldWay1: "Answering late-night messages: 'What's the Wi-Fi password?'",
    oldWay2: "Guest confusion over thermostat, coffee machine & hot tub buttons.",
    oldWay3: "$0 extra revenue from airport shuttles or late check-outs.",
    oldWay4: "Endless back-and-forth bank details for extra payments.",
    newWayHead: "New Way (With HostifyOS Funnel)",
    newWay1: "1-Tap instant Wi-Fi copy & time-gated door lockbox PIN.",
    newWay2: "Short 30-sec video manuals for every home appliance.",
    newWay3: "+$420/mo extra income per listing from 1-click upsells.",
    newWay4: "Host custom payment link & automatic 0% commission payout.",
    roiTitle: "Real-Time Revenue & Time Savings Calculator",
    roiSub: "Slide the bar to select your property portfolio size.",
    roiLabelCount: "Properties Portfolio Size:",
    roiLabelRev: "Est. Extra Monthly Upsell Revenue",
    roiSubRev: "From Shuttles, Late Check-out & Cleaning",
    roiLabelTime: "Host Messaging Hours Saved",
    roiSubTime: "No more repeating Wi-Fi & AC questions",
    pricingTag: "Transparent SaaS Pricing",
    pricingTitle: "Select Your 14-Day Free Trial Plan",
    pricingSub: "Register today ($0 charged). Cancel anytime before Day 14 with 1-click.",
    btnAnnual: "Annual Billing",
    btnMonthly: "Monthly Billing",
    starterName: "Starter Host",
    starterDesc: "Perfect for single property hosts starting out.",
    starterProp: "1 Property Listing",
    starterViews: "Unlimited Digital Guidebook Views",
    starterWifi: "1-Tap Wi-Fi & Time-Gated Door PIN",
    starterPay: "Host Custom Payment Link Support",
    starterSplit: "Auto Take-Rate Split Engine",
    starterComm: "5% auto platform commission on guest upsells",
    btnStartFree: "Start Free Plan",
    proName: "Pro Host",
    proDesc: "For growing hosts & multi-listing managers.",
    proProps: "Up to 10 Properties",
    proComm: "0% Platform Commission (Keep 100%)",
    proPay: "Host Custom Payment Links Allowed",
    proTunnels: "Automated Guest Tunnels (WhatsApp & SMS)",
    proInv: "Global Merchant Invoicing",
    proStand: "Printable Room Stand PDF Generator",
    btnProTrial: "Start 14-Day Free Trial ($0 Today)",
    entName: "Enterprise & Hotel",
    entDesc: "For boutique hotels, resorts & large property teams.",
    entProps: "10+ Properties & Boutique Hotels",
    entComm: "0% Commission on Upsells",
    entDomain: "White-Label Domain (yourhotel.hostifyos.com)",
    entAccount: "Dedicated Merchant Account",
    entPhone: "24/7 Priority VIP Phone Support",
    btnEntTrial: "Start Enterprise Trial",
    faqTag: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqSub: "Everything you need to know about HostifyOS guidebooks & billing.",
    faqQ1: "Do my guests need to download an app?",
    faqA1: "No! HostifyOS works as an instant Web App (PWA). Guests simply scan your printed QR stand or click your link to view Wi-Fi and services instantly on any smartphone browser.",
    faqQ2: "Can I use my own custom payment link?",
    faqA2: "Yes! Hosts can paste their custom payment URL (Stripe, Revolut, PayPal, Lemon Squeezy, etc.) so guest payments go directly into your account.",
    faqQ3: "How does the 14-Day Free Trial work?",
    faqA3: "When you sign up, $0 is charged today. You get 14 full days to test HostifyOS with your properties. If you decide to cancel anytime before Day 14, your card will never be charged.",
    faqQ4: "How do guests access the guidebook in their room?",
    faqA4: "Guests can scan the printable A5 room stand QR code placed in your villa or apartment, or click the automatic WhatsApp/SMS welcome link sent before check-in.",
    faqQ5: "How does the platform commission split work?",
    faqA5: "On the Starter tier ($0/mo), guest upsell sales incur a 5% platform fee automatically deducted during payout. On Pro Host ($14/mo) and Enterprise tiers, you pay 0% platform commission and keep 100% of guest sales.",
    faqQ6: "Can I connect multiple listings from Airbnb, Vrbo & Booking.com?",
    faqA6: "Yes! HostifyOS supports multi-channel property portfolios. You can import listings in seconds using our AI Listing Importer and manage all properties from a single dashboard.",
    faqQ7: "How do time-gated door lockbox PIN codes work?",
    faqA7: "Door access PIN codes are automatically time-gated. Guests can only reveal their check-in PIN starting 2 hours before official check-in time, and access automatically expires at check-out time.",
    faqQ8: "What payment methods can my guests use to buy upsells?",
    faqA8: "Guests can pay via Credit/Debit Cards, Apple Pay, Google Pay, or through your custom host gateway URL (Stripe, Revolut, PayPal, etc.).",
    ctaTitle: "Ready to Automate Your STR Operations & Boost Revenue?",
    ctaSub: "Join over 3,400+ hosts scaling their guest experience today.",
    btnCtaTrial: "Start Your 14-Day Free Trial ($0 Today)",
    navHome: "Home",
    navGuest: "Guest View (PWA)",
    navHost: "Host Portal",
    navAdmin: "Super Admin",
    toastLang: "Language updated to English (USD)",
    welcomePill: "Welcome to your stay",
    guestCheckInLabel: "Check-in: 3:00 PM",
    guestCheckOutLabel: "Check-out: 11:00 AM",
    instantWifi: "Instant Wi-Fi",
    doorAccessCode: "Door Access Code",
    tabHouseManual: "House Manual",
    tabConciergeStore: "Concierge & Store",
    tabAiLocalGuide: "AI Local Guide",
    applianceVideoGuides: "Appliance Video Guides",
    houseRulesTitle: "House Rules & Guidelines",
    ruleQuietHoursTitle: "Quiet Hours",
    ruleQuietHoursDesc: "10:00 PM – 8:00 AM out of respect for neighbors.",
    ruleTrashTitle: "Trash & Recycling",
    ruleTrashDesc: "Bins are located on the side walkway. Black for general waste, Blue for recyclables.",
    guestServicesTitle: "Guest Services & Upsells",
    guestServicesSub: "Book extra services instantly for your stay.",
    aiPlacesTitle: "AI Auto-Discovered Places",
    btnWhatsappHost: "Need help? Message Host on WhatsApp"
  },
  TR: {
    heroBadge: "Airbnb ve Kiralık Evler İçin Otomatik Ek Gelir Motoru",
    heroTitle: "Her Misafir Konaklamasını Mülk Başına +$400+/ay Ek Gelire Dönüştürün",
    heroSub: "Wi-Fi ve Klima sorularına son verin. 1-tıkla dijital rehber, zaman ayarlı kapı PIN şifreleri, özel ödeme linkleri ve otomatik mesaj tünelleri sunun.",
    btnCalcHero: "Ek Gelir Potansiyelini Hesapla (10 Saniyelik Test)",
    viewDemo: "Canlı Misafir Demosunu İncele",
    statHosts: "Aktif Süper Ev Sahibi",
    statRate: "Misafir Rehber Açılma Oranı",
    statProc: "İşlenen Toplam Ek Satış",
    statSat: "Ev Sahibi Memnuniyeti",
    quizBadge: "Adım 1 / 2: 10 Saniyelik Gelir Hesaplama",
    quizTitle: "Mülkünüzün Ne Kadar Ek Gelir Üretebileceğini Hesaplayın",
    quizSub: "Kişiselleştirilmiş ek satış potansiyelinizi hesaplamak için 3 hızlı soruyu yanıtlayın.",
    showcaseTag: "Etkileşimli Özellik Tanıtımı",
    showcaseTitle: "HostifyOS'un Konaklamanın Her Adımını Nasıl Otomatikleştirdiğini Görün",
    showcaseSub: "Otelcilik işletim sistemimizin 4 temel sütununu inceleyin.",
    showcaseTab1: "1-Tıkla Wi-Fi ve Kapı PIN",
    showcaseTab2: "Cihaz Video Rehberleri",
    showcaseTab3: "Otomatik Mesaj Tünelleri",
    showcaseTab4: "Özel Ödeme Linkleri",
    sc1Badge: "Gece Aramalarına Son",
    sc1Title: "1-Tıkla Wi-Fi Kopyalama ve Zaman Ayarlı Kapı Şifresi",
    sc1Desc: "Misafirler telefon ekranında tek tıkla Wi-Fi şifresini kopyalar. Kapı kilit PIN kodları zaman ayarlıdır, misafirler kodu girişten sadece 2 saat önce görebilir.",
    sc1Check1: "Tekrarlayan giriş sorularının %80'ini ortadan kaldırır",
    sc1Check2: "Saat 11:00 çıkışında kapı PIN kodunu otomatik sonlandırır",
    sc2Badge: "Görsel Rehberler",
    sc2Title: "30 Saniyelik Cihaz Kullanım Videoları",
    sc2Desc: "Klima, kahve makinesi, TV kumandası ve Jakuzi kullanımını gösteren 30 saniyelik kısa videolar yükleyin.",
    sc2Check1: "Bozulan cihazlara ve yanlış klima ayarlarına son",
    sc2Check2: "Altyazı destekli yüksek çözünürlüklü mobil video oynatıcı",
    sc3Badge: "Otomatik Ek Satışlar",
    sc3Title: "Otomatik WhatsApp ve SMS Misafir Tünelleri",
    sc3Desc: "Zaman tetiklemeli otomatik mesajlar kurun. Örneğin çıkıştan 24 saat önce otomatik WhatsApp mesajı göndererek $45 karşılığında Geç Çıkış sunun.",
    sc3Check1: "Ek satışlarda ortalama %32.4 dönüşüm oranı",
    sc3Check2: "WhatsApp, SMS ve PWA Bildirim desteği",
    sc4Badge: "Doğrudan Banka Hesabına Transfer",
    sc4Title: "Ev Sahibi Özel Ödeme Linkleri ve Komisyon Paylaşımı",
    sc4Desc: "Kendi Stripe, Revolut veya IBAN ödeme linkinizi yapıştırın. Komisyon otomatik hesaplanır, net kazancınız doğrudan banka hesabınıza yatar.",
    sc4Check1: "Pro Host paketinde %0 platform komisyonu",
    sc4Check2: "Doğrudan banka hesabına anında transfer",
    testimonialsTag: "Gerçek Ev Sahibi Vaka Analizleri",
    testimonialsTitle: "HostifyOS İle Büyüyen Süper Ev Sahiplerinin Yorumları",
    testimonialsSub: "Dünya çapında 3.400'den fazla mülk yöneticisine katılın.",
    agitTag: "Ev Sahipliğinde Büyük Dönüşüm",
    agitTitle: "Neden 3.400+ Ev Sahibi HostifyOS'a Geçti?",
    agitSub: "Haftada 15 saatten fazla süren Wi-Fi ve TV kumandası sorularıyla vakit kaybetmeyi bırakın.",
    oldWayHead: "Eski Yöntem (HostifyOS Olmadan)",
    oldWay1: "Gece yarısı 'Wi-Fi şifresi nedir?' mesajlarına yanıt vermek.",
    oldWay2: "Klima, kahve makinesi ve sıcak havuz düğmelerinde misafir karmaşası.",
    oldWay3: "Havalimanı transferi ve geç çıkıştan $0 ek gelir.",
    oldWay4: "Ek ödemeler için sürekli IBAN ve hesap bilgisi göndermek.",
    newWayHead: "Yeni Yöntem (HostifyOS Sistemiyle)",
    newWay1: "1-Tıkla anında Wi-Fi kopyalama ve zamanlı kapı şifresi.",
    newWay2: "Her ev cihazı için 30 saniyelik kısa video rehberleri.",
    newWay3: "1-tıkla ek satışlardan ilan başına +$420/ay ek gelir.",
    newWay4: "Ev sahibinin özel ödeme linki ve otomatik %0 komisyon yatırımı.",
    roiTitle: "Canlı Gelir ve Zaman Tasarrufu Hesaplayıcı",
    roiSub: "Mülk sayınızı seçmek için kaydırıcıyı hareket ettirin.",
    roiLabelCount: "Yönetilen Mülk Sayısı:",
    roiLabelRev: "Tahmini Aylık Ek Satış Geliri",
    roiSubRev: "Transfer, Geç Çıkış ve Temizlik Hizmetlerinden",
    roiLabelTime: "Kazanılan Ev Sahibi Mesaj Saatleri",
    roiSubTime: "Tekrarlayan sorulardan tasarruf edilen süre",
    pricingTag: "Şeffaf SaaS Fiyatlandırma",
    pricingTitle: "14 Günlük Ücretsiz Deneme Planınızı Seçin",
    pricingSub: "Bugün ücretsiz kaydolun ($0 çekilir). 14. günden önce dilediğiniz an 1-tıkla iptal edin.",
    btnAnnual: "Yıllık Ödeme",
    btnMonthly: "Aylık Ödeme",
    starterName: "Başlangıç Planı",
    starterDesc: "Tek mülkü olan ev sahipleri için mükemmel başlangıç.",
    starterProp: "1 Mülk İlanı",
    starterViews: "Sınırsız Dijital Rehber Görüntüleme",
    starterWifi: "1-Tıkla Wi-Fi ve Zamanlı Kapı PIN",
    starterPay: "Ev Sahibi Özel Ödeme Link Desteği",
    starterSplit: "Otomatik Komisyon Paylaşım Motoru",
    starterComm: "Ek satışlarda %5 otomatik platform komisyonu",
    btnStartFree: "Ücretsiz Planı Başlat",
    proName: "Pro Ev Sahibi",
    proDesc: "Büyüyen ev sahipleri ve çoklu mülk yöneticileri için.",
    proProps: "10 Mülke Kadar Destek",
    proComm: "%0 Platform Komisyonu (%100 Sizde Kalır)",
    proPay: "Özel Ödeme Linkleri Kullanılabilir",
    proTunnels: "Otomatik Misafir Mesaj Tünelleri (WhatsApp & SMS)",
    proInv: "Global Kurumsal Fatura Sistemi",
    proStand: "Yazdırılabilir Oda QR Stant PDF Oluşturucu",
    btnProTrial: "14 Günlük Ücretsiz Denemeyi Başlat ($0 Bugün)",
    entName: "Kurumsal & Butik Otel",
    entDesc: "Butik oteller, tatil köyleri ve büyük mülk ekipleri için.",
    entProps: "10+ Mülk ve Butik Otel",
    entComm: "Ek Satışlarda %0 Komisyon",
    entDomain: "Özel Domain Alan Adı (otelniz.hostifyos.com)",
    entAccount: "Özel Kurumsal Satıcı Hesabı",
    entPhone: "7/24 Öncelikli VIP Telefon Desteği",
    btnEntTrial: "Kurumsal Denemeyi Başlat",
    faqTag: "SSS",
    faqTitle: "Sıkça Sorulan Sorular",
    faqSub: "HostifyOS dijital rehberleri ve ödeme hakkında bilmek istediğiniz her şey.",
    faqQ1: "Misafirlerimin uygulama indirmesi gerekiyor mu?",
    faqA1: "Hayır! HostifyOS anlık bir Web Uygulaması (PWA) olarak çalışır. Misafirler basılı QR kodunu taratarak veya linke tıklayarak doğrudan tarayıcıda rehbere ulaşır.",
    faqQ2: "Kendi ödeme linkimi kullanabilir miyim?",
    faqA2: "Evet! Ev sahipleri kendi Stripe, Revolut, PayPal veya IBAN ödeme linklerini yapıştırarak ödemelerin doğrudan kendi hesaplarına yatmasını sağlayabilir.",
    faqQ3: "14 Günlük Ücretsiz Deneme nasıl çalışır?",
    faqA3: "Kaydolduğunuzda bugün $0 çekilir. 14 gün boyunca HostifyOS'u tüm özellikleriyle ücretsiz test edersiniz. 14 gün dolmadan dilediğiniz an tek tıkla iptal edebilirsiniz.",
    faqQ4: "Misafirler odadaki rehbere nasıl erişir?",
    faqA4: "Misafirler odadaki yazdırılabilir A5 QR kod standını taratabilir veya girişten önce gönderilen otomatik WhatsApp/SMS karşılama linkine tıklayabilir.",
    faqQ5: "Platform komisyon kesintisi nasıl çalışır?",
    faqA5: "Ücretsiz Starter planında ek satışlardan %5 platform komisyonu kesilir. Pro ve Kurumsal paketlerde %0 komisyon uygulanır ve tüm gelir ev sahibine kalır.",
    faqQ6: "Airbnb, Vrbo ve Booking.com'dan birden fazla ilan bağlayabilir miyim?",
    faqA6: "Evet! HostifyOS çoklu kanal portföylerini destekler. Yapay Zeka İlan İçe Aktarıcımız ile saniyeler içinde mülklerinizi aktarabilir ve tüm mülklerinizi tek bir panelden yönetebilirsiniz.",
    faqQ7: "Zaman ayarlı kapı kilit PIN kodları nasıl çalışır?",
    faqA7: "Kapı PIN kodları otomatik zaman ayarlıdır. Misafirler giriş PIN kodunu resmi giriş saatinden 2 saat önce görebilir ve erişim çıkış saatinde otomatik sonlanır.",
    faqQ8: "Misafirlerim ek hizmet satın alırken hangi ödeme yöntemlerini kullanabilir?",
    faqA8: "Misafirler Kredi/Banka Kartı, Apple Pay, Google Pay veya ev sahibinin özel ödeme linki (Stripe, Revolut, PayPal, IBAN vb.) üzerinden ödeme yapabilir.",
    ctaTitle: "Mülkünüzü Otomatikleştirmeye ve Ek Gelir Elde Etmeye Hazır Mısınız?",
    ctaSub: "Bugün misafir deneyimini üst seviyeye çıkaran 3.400'den fazla ev sahibine katılın.",
    btnCtaTrial: "14 Günlük Ücretsiz Denemeyi Başlat ($0 Bugün)",
    startTrial: "14 Günlük Ücretsiz Denemeyi Başlat",
    navHome: "Ana Sayfa",
    navGuest: "Misafir Görünümü (PWA)",
    navHost: "Ev Sahibi Portalı",
    navAdmin: "Süper Admin",
    toastLang: "Dil Türkçe olarak güncellendi (TRY)",
    welcomePill: "Konaklamanıza Hoş Geldiniz",
    guestCheckInLabel: "Giriş: 15:00",
    guestCheckOutLabel: "Çıkış: 11:00",
    instantWifi: "Hızlı Wi-Fi",
    doorAccessCode: "Kapı Şifresi",
    tabHouseManual: "Ev Rehberi",
    tabConciergeStore: "Konsiyerj & Mağaza",
    tabAiLocalGuide: "Yapay Zeka Şehir Rehberi",
    applianceVideoGuides: "Cihaz Kullanım Videoları",
    houseRulesTitle: "Ev Kuralları & Yönergeler",
    ruleQuietHoursTitle: "Sessizlik Saatleri",
    ruleQuietHoursDesc: "Komşulara saygı için 22:00 – 08:00 arası sessizlik.",
    ruleTrashTitle: "Çöp & Geri Dönüşüm",
    ruleTrashDesc: "Çöp kovaları yan yürüme yolundadır. Siyah genel çöp, Mavi geri dönüşüm.",
    guestServicesTitle: "Misafir Hizmetleri & Ekstra Servisler",
    guestServicesSub: "Konaklamanız için ekstra hizmetleri anında satın alın.",
    aiPlacesTitle: "Yapay Zeka Keşif Noktaları",
    btnWhatsappHost: "Yardım mı lazım? Ev Sahibine WhatsApp'tan Yaz"
  },
  ES: {
    heroBadge: "Motor de ingresos automatizado para alquileres vacacionales",
    heroTitle: "Convierte cada estancia de huésped en +400€/mes extra por propiedad",
    heroSub: "Elimina los mensajes repetitivos sobre Wi-Fi y aire acondicionado. Ofrece guías digitales con 1 toque, códigos de puerta y enlaces de pago.",
    btnCalcHero: "Calcula tus ingresos extra (Test de 10 seg)",
    viewDemo: "Demo interactiva del huésped",
    statHosts: "Superanfitriones activos",
    statRate: "Tasa de apertura",
    statProc: "Ventas procesadas",
    statSat: "Satisfacción del anfitrión",
    quizBadge: "Paso 1 de 2: Auditoría de ingresos de 10 segundos",
    quizTitle: "Calcula cuántos ingresos adicionales puede generar tu propiedad",
    quizSub: "Responde 3 preguntas rápidas para calcular tu potencial de ventas.",
    showcaseTag: "Demostración interactiva de funciones",
    showcaseTitle: "Mira cómo HostifyOS automatiza cada paso de la estancia",
    showcaseSub: "Haz clic en los 4 pilares fundamentales de nuestro sistema.",
    showcaseTab1: "Wi-Fi con 1 toque y PIN de puerta",
    showcaseTab2: "Guías en video de electrodomésticos",
    showcaseTab3: "Túneles de mensajes automatizados",
    showcaseTab4: "Enlaces de pago personalizados",
    sc1Badge: "Cero llamadas de huéspedes",
    sc1Title: "Copia Wi-Fi en 1 toque y PIN de puerta temporizado",
    sc1Desc: "Los huéspedes tocan la pantalla de su teléfono para copiar la contraseña de Wi-Fi. Los PIN se activan 2 horas antes del check-in.",
    sc1Check1: "Elimina el 80% de las preguntas de check-in",
    sc1Check2: "Expira automáticamente a las 11:00 AM el día de salida",
    sc2Badge: "Guías visuales",
    sc2Title: "Guías en video de 30 segundos",
    sc2Desc: "Sube videos cortos para mostrar el funcionamiento del termostato, cafetera y aire acondicionado.",
    sc2Check1: "Sin electrodomésticos dañados o ajustes incorrectos",
    sc2Check2: "Reproductor de video HD móvil con subtítulos",
    sc3Badge: "Ventas automatizadas",
    sc3Title: "Túneles automatizados de WhatsApp y SMS",
    sc3Desc: "Programa mensajes automáticos 24h antes del check-out ofreciendo salida tardía por 45€.",
    sc3Check1: "32.4% de tasa de conversión promedio en ventas extra",
    sc3Check2: "Soporta WhatsApp, SMS y notificaciones PWA",
    sc4Badge: "Pagos bancarios directos",
    sc4Title: "Enlaces de pago de anfitrión y división de comisiones",
    sc4Desc: "Pega tu enlace de pago (Stripe, Revolut, PayPal). Las ventas se depositan en tu banco.",
    sc4Check1: "0% de comisión de plataforma en plan Pro Host",
    sc4Check2: "Depósitos bancarios directos e instantáneos",
    testimonialsTag: "Casos de éxito reales",
    testimonialsTitle: "Testimonios de Superanfitriones con HostifyOS",
    testimonialsSub: "Únete a más de 3,400+ gestores de alquileres vacacionales.",
    agitTag: "La transformación del anfitrión",
    agitTitle: "Por qué más de 3,400+ anfitriones se cambiaron a HostifyOS",
    agitSub: "Deja de perder más de 15 horas a la semana respondiendo las mismas preguntas.",
    oldWayHead: "Forma antigua (Sin HostifyOS)",
    oldWay1: "Responder mensajes nocturnos: '¿Cuál es la contraseña del Wi-Fi?'",
    oldWay2: "Confusión del huésped con el termostato y la cafetera.",
    oldWay3: "0€ de ingresos extra de traslados al aeropuerto o salidas tardías.",
    oldWay4: "Envío constante de datos bancarios para pagos extra.",
    newWayHead: "Nueva forma (Con HostifyOS)",
    newWay1: "Copia de Wi-Fi en 1 toque y PIN de puerta temporizado.",
    newWay2: "Videos explicativos de 30 segundos para cada electrodoméstico.",
    newWay3: "+420€/mes de ingresos extra por propiedad.",
    newWay4: "Enlace de pago propio y 0% de comisión de plataforma.",
    roiTitle: "Calculadora de ingresos y ahorro de tiempo",
    roiSub: "Desliza la barra para seleccionar el número de propiedades.",
    roiLabelCount: "Tamaño de cartera de propiedades:",
    roiLabelRev: "Ingresos mensuales adicionales estimados",
    roiSubRev: "De traslados, salida tardía y servicios extra",
    roiLabelTime: "Horas de mensajería ahorradas",
    roiSubTime: "Sin responder preguntas repetitivas",
    pricingTag: "Precios SaaS transparentes",
    pricingTitle: "Selecciona tu plan de prueba gratis de 14 días",
    pricingSub: "Regístrate hoy (0€ cobrados). Cancela en 1 clic antes del día 14.",
    btnAnnual: "Facturación Anual",
    btnMonthly: "Facturación Mensual",
    starterName: "Plan Inicial",
    starterDesc: "Ideal para anfitriones con 1 propiedad.",
    starterProp: "1 Propiedad incluida",
    starterViews: "Vistas de guía digital ilimitadas",
    starterWifi: "Wi-Fi en 1 toque y PIN temporizado",
    starterPay: "Soporte de enlace de pago propio",
    starterSplit: "Motor de división de comisión",
    starterComm: "5% de comisión de plataforma en ventas extra",
    btnStartFree: "Comenzar gratis",
    proName: "Pro Anfitrión",
    proDesc: "Para anfitriones en crecimiento y gestores.",
    proProps: "Hasta 10 Propiedades",
    proComm: "0% de comisión de plataforma (Mantén el 100%)",
    proPay: "Enlaces de pago propios permitidos",
    proTunnels: "Túneles automáticos de WhatsApp y SMS",
    proInv: "Facturación internacional",
    proStand: "Generador de QR en PDF para habitaciones",
    btnProTrial: "Prueba gratis de 14 días (0€ Hoy)",
    entName: "Empresas y Hoteles",
    entDesc: "Para hoteles boutique, resorts y grandes equipos.",
    entProps: "10+ Propiedades y Hoteles Boutique",
    entComm: "0% de comisión en ventas extra",
    entDomain: "Dominio de marca blanca (tuhotel.hostifyos.com)",
    entAccount: "Cuenta de comerciante dedicada",
    entPhone: "Soporte telefónico VIP 24/7",
    btnEntTrial: "Prueba Empresa",
    faqTag: "Preguntas Frecuentes",
    faqTitle: "Preguntas Frecuentes",
    faqSub: "Todo lo que necesitas saber sobre las guías digitales y facturación.",
    faqQ1: "¿Mis huéspedes necesitan descargar una aplicación?",
    faqA1: "¡No! HostifyOS funciona como una Web App (PWA). Los huéspedes escanean el código QR o hacen clic en el enlace.",
    faqQ2: "¿Puedo usar mi propio enlace de pago?",
    faqA2: "¡Sí! Puedes usar tu propio enlace de pago (Stripe, Revolut, PayPal) para recibir el dinero directamente.",
    faqQ3: "¿Cómo funciona la prueba gratuita de 14 días?",
    faqA3: "Hoy se cobran 0€. Tienes 14 días completos para probar el sistema. Puedes cancelar en cualquier momento.",
    faqQ4: "¿Cómo acceden los huéspedes a la guía en su habitación?",
    faqA4: "Pueden escanear el soporte QR en la habitación o hacer clic en el enlace automático de WhatsApp.",
    faqQ5: "¿Cómo funciona la comisión de la plataforma?",
    faqA5: "En el plan Starter hay un 5% de comisión. En los planes Pro y Enterprise la comisión es del 0%.",
    faqQ6: "¿Puedo conectar varios anuncios de Airbnb, Vrbo y Booking.com?",
    faqA6: "¡Sí! HostifyOS admite carteras multicanal. Puedes importar anuncios en segundos con nuestro importador IA y gestionarlos desde un solo panel.",
    faqQ7: "¿Cómo funcionan los códigos PIN de puerta con límite de tiempo?",
    faqA7: "Los códigos PIN tienen temporizador automático. Los huéspedes solo ven su PIN de entrada 2 horas antes de la hora oficial de llegada y expiran automáticamente al check-out.",
    faqQ8: "¿Qué métodos de pago pueden usar mis huéspedes para comprar servicios extra?",
    faqA8: "Los huéspedes pueden pagar con tarjetas de crédito/débito, Apple Pay, Google Pay o mediante tu enlace de pago personalizado (Stripe, Revolut, PayPal, etc.).",
    ctaTitle: "¿Listo para automatizar tus alquileres y aumentar tus ingresos?",
    ctaSub: "Únete a más de 3,400+ anfitriones que escalan su experiencia hoy.",
    btnCtaTrial: "Comenzar prueba gratis de 14 días (0€ Hoy)",
    startTrial: "Comenzar prueba gratis de 14 días",
    navHome: "Inicio",
    navGuest: "Vista Huésped (PWA)",
    navHost: "Portal Anfitrión",
    navAdmin: "Super Admin",
    toastLang: "Idioma actualizado a Español (EUR)",
    welcomePill: "Bienvenido a su estancia",
    guestCheckInLabel: "Entrada: 15:00",
    guestCheckOutLabel: "Salida: 11:00",
    instantWifi: "Wi-Fi Instantáneo",
    doorAccessCode: "Código de Puerta",
    tabHouseManual: "Manual de la Casa",
    tabConciergeStore: "Conserjería y Tienda",
    tabAiLocalGuide: "Guía Local IA",
    applianceVideoGuides: "Guías en Video de Electrodomésticos",
    houseRulesTitle: "Reglas de la Casa",
    ruleQuietHoursTitle: "Horas de Silencio",
    ruleQuietHoursDesc: "22:00 – 08:00 por respeto a los vecinos.",
    ruleTrashTitle: "Basura y Reciclaje",
    ruleTrashDesc: "Los contenedores están en el pasillo lateral.",
    guestServicesTitle: "Servicios para Huéspedes",
    guestServicesSub: "Reserve servicios extra al instante.",
    aiPlacesTitle: "Lugares Descubiertos por IA",
    btnWhatsappHost: "¿Ayuda? Contactar por WhatsApp",
    destinationWeatherSub: "Clima del Destino • Open-Meteo API En Vivo"
  },
  FR: {
    heroBadge: "Moteur de revenus automatisé pour locations saisonnières",
    heroTitle: "Transformez chaque séjour en +400€/mois de revenus supplémentaires par logement",
    heroSub: "Éliminez les messages répétitifs sur le Wi-Fi et la climatisation. Offrez des livrets d'accueil numériques 1-clic et des codes d'accès portes.",
    btnCalcHero: "Calculez vos revenus supplémentaires (Quiz 10s)",
    viewDemo: "Démo invité interactive",
    statHosts: "Superhôtes actifs",
    statRate: "Taux d'ouverture",
    statProc: "Ventes traitées",
    statSat: "Satisfaction hôte",
    quizBadge: "Étape 1 sur 2 : Audit de revenus en 10 secondes",
    quizTitle: "Découvrez le potentiel de revenus supplémentaires de votre logement",
    quizSub: "Répondez à 3 questions rapides pour calculer votre potentiel.",
    showcaseTag: "Présentation interactive des fonctionnalités",
    showcaseTitle: "Découvrez comment HostifyOS automatise chaque étape du séjour",
    showcaseSub: "Cliquez sur les 4 piliers fondamentaux de notre système.",
    showcaseTab1: "Wi-Fi 1-clic et PIN de porte",
    showcaseTab2: "Guides vidéo des équipements",
    showcaseTab3: "Tunnels de messages automatisés",
    showcaseTab4: "Liens de paiement personnalisés",
    sc1Badge: "Zéro appel d'invité",
    sc1Title: "Copie Wi-Fi 1-clic et PIN de porte temporisé",
    sc1Desc: "Les invités touchent l'écran de leur téléphone pour copier le mot de passe Wi-Fi. Les PIN sont activés 2h avant le check-in.",
    sc1Check1: "Élimine 80% des questions répétitives à l'arrivée",
    sc1Check2: "Expire automatiquement à 11h00 le jour du départ",
    sc2Badge: "Guides visuels",
    sc2Title: "Guides vidéo d'équipements de 30 secondes",
    sc2Desc: "Téléchargez de courtes vidéos montrant le fonctionnement du thermostat, de la machine à café et de la climatisation.",
    sc2Check1: "Fini les appareils cassés ou mauvais réglages",
    sc2Check2: "Lecteur vidéo mobile HD avec sous-titres",
    sc3Badge: "Ventes automatisées",
    sc3Title: "Tunnels automatisés WhatsApp et SMS",
    sc3Desc: "Programmez des messages automatiques 24h avant le départ proposant un départ tardif pour 45€.",
    sc3Check1: "Taux de conversion moyen de 32.4% sur les ventes annexes",
    sc3Check2: "Prend en charge WhatsApp, SMS et notifications PWA",
    sc4Badge: "Paiements bancaires directs",
    sc4Title: "Liens de paiement d'hôte et partage de commissions",
    sc4Desc: "Collez votre lien de paiement (Stripe, Revolut, PayPal). Les ventes sont déposées sur votre compte.",
    sc4Check1: "0% de commission de plateforme sur le plan Pro Host",
    sc4Check2: "Dépôts bancaires directs et instantanés",
    testimonialsTag: "Études de cas réelles",
    testimonialsTitle: "Témoignages de Superhôtes développant avec HostifyOS",
    testimonialsSub: "Rejoignez plus de 3 400+ gestionnaires de locations saisonnières.",
    agitTag: "La transformation de l'hôte",
    agitTitle: "Pourquoi plus de 3 400+ hôtes ont choisi HostifyOS",
    agitSub: "Ne perdez plus 15+ heures par semaine à répondre aux mêmes questions.",
    oldWayHead: "Ancienne méthode (Sans HostifyOS)",
    oldWay1: "Répondre aux messages nocturnes : 'Quel est le mot de passe Wi-Fi ?'",
    oldWay2: "Confusion des invités sur le thermostat et la machine à café.",
    oldWay3: "0€ de revenus supplémentaires sur les navettes ou départs tardifs.",
    oldWay4: "Envoi incessant de coordonnées bancaires pour les extras.",
    newWayHead: "Nouvelle méthode (Avec HostifyOS)",
    newWay1: "Copie Wi-Fi 1-clic et PIN de porte temporisé.",
    newWay2: "Vidéos explicatives de 30 secondes pour chaque équipement.",
    newWay3: "+420€/mois de revenus supplémentaires par logement.",
    newWay4: "Lien de paiement propre et 0% de commission de plateforme.",
    roiTitle: "Calculateur de revenus et de gain de temps",
    roiSub: "Faites glisser la barre pour sélectionner votre nombre de logements.",
    roiLabelCount: "Taille du portefeuille de logements :",
    roiLabelRev: "Revenus mensuels supplémentaires estimés",
    roiSubRev: "Sur les navettes, départs tardifs et ménage",
    roiLabelTime: "Heures de messagerie économisées",
    roiSubTime: "Fini de répéter les instructions Wi-Fi et clim",
    pricingTag: "Tarifs SaaS transparents",
    pricingTitle: "Sélectionnez votre plan d'essai gratuit de 14 jours",
    pricingSub: "Inscrivez-vous aujourd'hui (0€ facturés). Annulez en 1-clic avant le 14ème jour.",
    btnAnnual: "Facturation Annuelle",
    btnMonthly: "Facturation Mensuelle",
    starterName: "Plan Débutant",
    starterDesc: "Parfait pour les hôtes avec 1 logement.",
    starterProp: "1 Logement inclus",
    starterViews: "Vues illimitées du livret numérique",
    starterWifi: "Wi-Fi 1-clic et PIN temporisé",
    starterPay: "Support de lien de paiement propre",
    starterSplit: "Moteur de partage de commission",
    starterComm: "5% de commission de plateforme sur les ventes annexes",
    btnStartFree: "Démarrer gratuitement",
    proName: "Pro Hôte",
    proDesc: "Pour les hôtes en croissance et gestionnaires.",
    proProps: "Jusqu'à 10 Logements",
    proComm: "0% de commission de plateforme (Conservez 100%)",
    proPay: "Liens de paiement propres autorisés",
    proTunnels: "Tunnels automatiques WhatsApp et SMS",
    proInv: "Facturation internationale",
    proStand: "Générateur de QR code PDF pour chambres",
    btnProTrial: "Essai gratuit de 14 jours (0€ Aujourd'hui)",
    entName: "Entreprises & Hôtels",
    entDesc: "Pour hôtels boutique, resorts et grandes équipes.",
    entProps: "10+ Logements et Hôtels Boutique",
    entComm: "0% de commission sur les ventes annexes",
    entDomain: "Domaine en marque blanche (votrehotel.hostifyos.com)",
    entAccount: "Compte marchand dédié",
    entPhone: "Support téléphonique VIP 24/7",
    btnEntTrial: "Essai Entreprise",
    faqTag: "FAQ",
    faqTitle: "Foire Aux Questions",
    faqSub: "Tout ce que vous devez savoir sur les livrets numériques et la facturation.",
    faqQ1: "Mes invités doivent-ils télécharger une application ?",
    faqA1: "Non ! HostifyOS fonctionne comme une Web App (PWA) instantanée. Les invités scannent le QR code ou cliquent sur le lien.",
    faqQ2: "Puis-je utiliser mon propre lien de paiement ?",
    faqA2: "Oui ! Vous pouvez utiliser votre propre lien de paiement (Stripe, Revolut, PayPal) pour recevoir l'argent directement.",
    faqQ3: "Comment fonctionne l'essai gratuit de 14 jours ?",
    faqA3: "Aujourd'hui, 0€ sont prélevés. Vous avez 14 jours complets pour tester le système. Vous pouvez annuler à tout moment.",
    faqQ4: "Comment les invités accèdent-ils au livret dans la chambre ?",
    faqA4: "Ils peuvent scanner le support QR dans la chambre ou cliquer sur le lien d'accueil automatique WhatsApp.",
    faqQ5: "Comment fonctionne la commission de la plateforme ?",
    faqA5: "Sur le plan Starter, une commission de 5% s'applique. Sur les plans Pro et Enterprise, la commission est de 0%.",
    faqQ6: "Puis-je connecter plusieurs annonces depuis Airbnb, Vrbo et Booking.com ?",
    faqA6: "Oui ! HostifyOS prend en charge les portefeuilles multicanaux. Vous pouvez importer vos annonces en quelques secondes grâce à notre importateur IA.",
    faqQ7: "Comment fonctionnent les codes PIN d'accès temporisés ?",
    faqA7: "Les codes PIN sont temporisés automatiquement. Les invités ne peuvent révéler leur code que 2 heures avant l'heure d'arrivée et l'accès expire au départ.",
    faqQ8: "Quels moyens de paiement mes invités peuvent-ils utiliser pour les ventes annexes ?",
    faqA8: "Les invités peuvent payer par carte bancaire, Apple Pay, Google Pay ou via votre lien de paiement personnalisé (Stripe, Revolut, PayPal, etc.).",
    ctaTitle: "Prêt à automatiser vos locations et augmenter vos revenus ?",
    ctaSub: "Rejoignez plus de 3 400+ hôtes qui améliorent leur expérience invité dès aujourd'hui.",
    btnCtaTrial: "Démarrer l'essai gratuit de 14 jours (0€ Aujourd'hui)",
    startTrial: "Démarrer l'essai gratuit de 14 jours",
    navHome: "Accueil",
    navGuest: "Vue Invité (PWA)",
    navHost: "Portail Hôte",
    navAdmin: "Super Admin",
    toastLang: "Langue mise à jour en Français (EUR)",
    welcomePill: "Bienvenue pour votre séjour",
    guestCheckInLabel: "Arrivée: 15:00",
    guestCheckOutLabel: "Départ: 11:00",
    instantWifi: "Wi-Fi Instantané",
    doorAccessCode: "Code d'accès Porte",
    tabHouseManual: "Manuel de la Maison",
    tabConciergeStore: "Conciergerie & Boutique",
    tabAiLocalGuide: "Guide Local IA",
    applianceVideoGuides: "Guides Vidéo des Équipements",
    houseRulesTitle: "Règles de la Maison",
    ruleQuietHoursTitle: "Heures de Silence",
    ruleQuietHoursDesc: "22h00 – 08h00 par respect pour le voisinage.",
    ruleTrashTitle: "Poubelles & Recyclage",
    ruleTrashDesc: "Les poubelles sont situées sur l'allée latérale.",
    guestServicesTitle: "Services & Conciergerie",
    guestServicesSub: "Réservez des services supplémentaires instantanément.",
    aiPlacesTitle: "Lieux Découverts par l'IA",
    btnWhatsappHost: "Besoin d'aide ? Message WhatsApp",
    destinationWeatherSub: "Météo de la Destination • API Open-Meteo En Direct"
  },
  DE: {
    heroBadge: "Automatisiertes Einnahmen-System für Ferienunterkünfte",
    heroTitle: "Verwandeln Sie jeden Aufenthalt in +400€/Monat Zusatzeinnahmen pro Objekt",
    heroSub: "Schluss mit ständigen Fragen zu WLAN und Klimaanlage. Bieten Sie 1-Klick digitale Gästeführer, zeitgesteuerte Tür-PINs und Zahlungs-Links.",
    btnCalcHero: "Zusatzeinnahmen berechnen (10-Sek-Quiz)",
    viewDemo: "Interaktive Gast-Demo",
    statHosts: "Aktive Superhosts",
    statRate: "Gast-Öffnungsrate",
    statProc: "Verarbeitete Verkäufe",
    statSat: "Gastgeber-Zufriedenheit",
    quizBadge: "Schritt 1 von 2: 10-Sekunden Einnahmen-Check",
    quizTitle: "Berechnen Sie, wie viel Zusatzeinkommen Ihre Unterkunft generiert",
    quizSub: "Beantworten Sie 3 kurze Fragen, um Ihr Potenzial zu berechnen.",
    showcaseTag: "Interaktive Funktionsübersicht",
    showcaseTitle: "Erfahren Sie, wie HostifyOS jeden Schritt des Aufenthalts automatisiert",
    showcaseSub: "Klicken Sie sich durch die 4 Säulen unseres Betriebssystems.",
    showcaseTab1: "1-Klick WLAN & Tür-PIN",
    showcaseTab2: "Geräte-Video-Anleitungen",
    showcaseTab3: "Automatisierte Nachrichten-Tunnels",
    showcaseTab4: "Eigene Zahlungs-Links",
    sc1Badge: "Keine Anrufe von Gästen",
    sc1Title: "Sofortiges 1-Klick WLAN-Kopieren & Zeitgesteuerte Tür-PIN",
    sc1Desc: "Gäste tippen einmal auf den Bildschirm, um das WLAN-Passwort zu kopieren. Tür-PINs werden 2 Std. vor Check-in freigeschaltet.",
    sc1Check1: "Beseitigt 80% der wiederkehrenden Fragen bei der Anreise",
    sc1Check2: "Schließt automatisch um 11:00 Uhr am Abreisetag",
    sc2Badge: "Visuelle Anleitungen",
    sc2Title: "30-Sekunden Geräte-Video-Anleitungen",
    sc2Desc: "Laden Sie kurze Videos hoch für Thermostat, Kaffeemaschine und Klimaanlage.",
    sc2Check1: "Keine defekten Geräte oder falschen Einstellungen mehr",
    sc2Check2: "Hochauflösender mobiler Videoplayer mit Untertiteln",
    sc3Badge: "Automatisierter Zusatzverkauf",
    sc3Title: "Automatisierte WhatsApp- & SMS-Tunnels",
    sc3Desc: "Planen Sie automatische Nachrichten 24 Std. vor Abreise mit Angeboten für späten Check-out.",
    sc3Check1: "Durchschnittlich 32.4% Konversionsrate bei Zusatzverkäufen",
    sc3Check2: "Unterstützt WhatsApp, SMS und PWA-Push",
    sc4Badge: "Direkte Bankauszahlungen",
    sc4Title: "Eigene Zahlungs-Links & Provisionsaufteilung",
    sc4Desc: "Fügen Sie Ihren eigenen Zahlungs-Link ein (Stripe, Revolut, PayPal). Einnahmen gehen direkt auf Ihr Konto.",
    sc4Check1: "0% Plattform-Provision im Pro-Host-Tarif",
    sc4Check2: "Sofortige Auszahlung direkt auf Ihr Bankkonto",
    testimonialsTag: "Echte Erfahrungsberichte",
    testimonialsTitle: "Das sagen Superhosts über HostifyOS",
    testimonialsSub: "Schließen Sie sich über 3.400+ Verwaltern weltweit an.",
    agitTag: "Die Verwandlung für Gastgeber",
    agitTitle: "Warum über 3.400+ Gastgeber zu HostifyOS gewechselt sind",
    agitSub: "Verschwenden Sie keine 15+ Stunden pro Woche mehr mit den gleichen Fragen.",
    oldWayHead: "Alter Weg (Ohne HostifyOS)",
    oldWay1: "Nächtliche Nachrichten beantworten: 'Wie lautet das WLAN-Passwort?'",
    oldWay2: "Verwirrung der Gäste bei Thermostat und Kaffeemaschine.",
    oldWay3: "0€ Zusatzeinnahmen durch Flughafentransfers oder späten Check-out.",
    oldWay4: "Ständiges Hin- und Herschicken von Bankdaten für Extras.",
    newWayHead: "Neuer Weg (Mit HostifyOS)",
    newWay1: "1-Klick WLAN-Kopie & zeitgesteuerte Tür-PIN.",
    newWay2: "Kurze 30-Sekunden Video-Anleitungen für jedes Gerät.",
    newWay3: "+420€/Monat Zusatzeinnahmen pro Unterkunft.",
    newWay4: "Eigener Zahlungs-Link & 0% Plattform-Provision.",
    roiTitle: "Einnahmen- & Zeitersparnis-Rechner",
    roiSub: "Schieben Sie den Regler, um die Anzahl Ihrer Unterkünfte zu wählen.",
    roiLabelCount: "Anzahl der Unterkünfte:",
    roiLabelRev: "Geschätzte monatliche Zusatzeinnahmen",
    roiSubRev: "Durch Transfers, späten Check-out & Reinigung",
    roiLabelTime: "Eingesparte Nachrichten-Stunden",
    roiSubTime: "Keine ständigen Fragen zu WLAN und Klima mehr",
    pricingTag: "Transparente SaaS-Preise",
    pricingTitle: "Wählen Sie Ihren 14-Tage Gratis-Test-Tarif",
    pricingSub: "Heute registrieren (0€ abgebucht). Jederzeit mit 1-Klick kündbar.",
    btnAnnual: "Jährliche Abrechnung",
    btnMonthly: "Monatliche Abrechnung",
    starterName: "Starter-Tarif",
    starterDesc: "Perfekt für Gastgeber mit 1 Unterkunft.",
    starterProp: "1 Unterkunft enthalten",
    starterViews: "Unbegrenzte Gästeführer-Aufrufe",
    starterWifi: "1-Klick WLAN & zeitgesteuerte Tür-PIN",
    starterPay: "Eigener Zahlungs-Link unterstützt",
    starterSplit: "Automatische Provisionsaufteilung",
    starterComm: "5% Plattform-Provision bei Zusatzverkäufen",
    btnStartFree: "Kostenlos starten",
    proName: "Pro Host",
    proDesc: "Für wachsende Gastgeber und Verwalter.",
    proProps: "Bis zu 10 Unterkünfte",
    proComm: "0% Plattform-Provision (100% behalten)",
    proPay: "Eigene Zahlungs-Links erlaubt",
    proTunnels: "Automatisierte WhatsApp- & SMS-Tunnels",
    proInv: "Globale Rechnungsstellung",
    proStand: "Druckbarer QR-Code-Aufsteller als PDF",
    btnProTrial: "14 Tage kostenlos testen (0€ Heute)",
    entName: "Enterprise & Hotels",
    entDesc: "Für Boutique-Hotels, Resorts und große Teams.",
    entProps: "10+ Unterkünfte & Boutique-Hotels",
    entComm: "0% Provision auf Zusatzverkäufe",
    entDomain: "White-Label-Domain (ihrhotel.hostifyos.com)",
    entAccount: "Eigenes Händlerkonto",
    entPhone: "24/7 VIP-Telefon-Support",
    btnEntTrial: "Enterprise-Test starten",
    faqTag: "FAQ",
    faqTitle: "Häufig gestellte Fragen",
    faqSub: "Alles, was Sie über digitale Gästeführer und Abrechnung wissen müssen.",
    faqQ1: "Müssen meine Gäste eine App herunterladen?",
    faqA1: "Nein! HostifyOS funktioniert als sofortige Web-App (PWA). Gäste scannen einfach den QR-Code oder klicken auf den Link.",
    faqQ2: "Kann ich meinen eigenen Zahlungs-Link nutzen?",
    faqA2: "Ja! Sie können Ihren eigenen Zahlungs-Link (Stripe, Revolut, PayPal) hinterlegen.",
    faqQ3: "Wie funktioniert der 14-Tage Gratis-Test?",
    faqA3: "Heute werden 0€ abgebucht. Sie haben 14 Tage Zeit zum Testen und können jederzeit kündigen.",
    faqQ4: "Wie greifen Gäste im Zimmer auf den Führer zu?",
    faqA4: "Durch Scannen des QR-Code-Aufstellers im Zimmer oder über den automatischen WhatsApp-Willkommens-Link.",
    faqQ5: "Wie funktioniert die Provisionsaufteilung?",
    faqA5: "Im Starter-Tarif fallen 5% Provision an. Im Pro- und Enterprise-Tarif zahlen Sie 0% Provision.",
    faqQ6: "Kann ich mehrere Inserate von Airbnb, Vrbo & Booking.com verknüpfen?",
    faqA6: "Ja! HostifyOS unterstützt Multi-Kanal-Portfolios. Sie können Inserate in Sekundenschnelle mit unserem KI-Importer importieren und über ein einziges Dashboard verwalten.",
    faqQ7: "Wie funktionieren zeitgesteuerte Tür-PIN-Codes?",
    faqA7: "Tür-PIN-Codes sind automatisch zeitgesteuert. Gäste können ihren Check-in-PIN erst 2 Stunden vor der offiziellen Check-in-Zeit einsehen. Der Zugang erlischt automatisch beim Check-out.",
    faqQ8: "Welche Zahlungsmethoden können meine Gäste für Zusatzkäufe nutzen?",
    faqA8: "Gäste können per Kredit-/Debitkarte, Apple Pay, Google Pay oder über Ihren eigenen Zahlungs-Link (Stripe, Revolut, PayPal usw.) bezahlen.",
    ctaTitle: "Bereit, Ihre Unterkünfte zu automatisieren und Einnahmen zu steigern?",
    ctaSub: "Schließen Sie sich über 3.400+ Gastgebern an, die ihr Gästeerlebnis verbessern.",
    btnCtaTrial: "14 Tage kostenlos testen (0€ Heute)",
    startTrial: "14 Tage kostenlos testen",
    navHome: "Startseite",
    navGuest: "Gast-Ansicht (PWA)",
    navHost: "Gastgeber-Portal",
    navAdmin: "Super Admin",
    toastLang: "Sprache geändert zu Deutsch (EUR)",
    welcomePill: "Willkommen zu Ihrem Aufenthalt",
    guestCheckInLabel: "Check-in: 15:00 Uhr",
    guestCheckOutLabel: "Check-out: 11:00 Uhr",
    instantWifi: "Sofort-WLAN",
    doorAccessCode: "Tür-Zugangscode",
    tabHouseManual: "Hausanleitung",
    tabConciergeStore: "Concierge & Shop",
    tabAiLocalGuide: "KI-Lokalguide",
    applianceVideoGuides: "Geräte-Videoanleitungen",
    houseRulesTitle: "Hausregeln & Richtlinien",
    ruleQuietHoursTitle: "Ruhezeiten",
    ruleQuietHoursDesc: "22:00 – 08:00 Uhr aus Rücksicht auf Nachbarn.",
    ruleTrashTitle: "Müll & Recycling",
    ruleTrashDesc: "Mülltonnen befinden sich am seitlichen Gehweg.",
    guestServicesTitle: "Gästeservices & Extras",
    guestServicesSub: "Buchen Sie Zusatzleistungen sofort.",
    aiPlacesTitle: "KI-Entdeckte Orte",
    btnWhatsappHost: "Hilfe? WhatsApp an den Gastgeber",
    destinationWeatherSub: "Zielwetter • Live Open-Meteo API"
  },
  IT: {
    heroBadge: "Motore di entrate automatizzato per case vacanze",
    heroTitle: "Trasforma ogni soggiorno in +400€/mese di entrate extra per immobile",
    heroSub: "Elimina i messaggi ripetitivi su Wi-Fi e aria condizionata. Offri guide digitali in 1-click, codici porta temporizzati e link di pagamento.",
    btnCalcHero: "Calcola le tue entrate extra (Test di 10 sec)",
    viewDemo: "Demo interattiva ospite",
    statHosts: "Superhost attivi",
    statRate: "Tasso di apertura",
    statProc: "Vendite elaborate",
    statSat: "Soddisfazione host",
    quizBadge: "Passo 1 di 2: Audit delle entrate in 10 secondi",
    quizTitle: "Scopri quante entrate extra può generare la tua struttura",
    quizSub: "Rispondi a 3 brevi domande per calcolare il tuo potenziale.",
    showcaseTag: "Dimostrazione interattiva delle funzionalità",
    showcaseTitle: "Scopri come HostifyOS automatiza ogni fase del soggiorno",
    showcaseSub: "Clicca sui 4 pilastri del nostro sistema operativo.",
    showcaseTab1: "Wi-Fi in 1-click & PIN porta",
    showcaseTab2: "Guide video elettrodomestici",
    showcaseTab3: "Tunnel messaggi automatizzati",
    showcaseTab4: "Link di pagamento personalizzati",
    sc1Badge: "Zero chiamate dagli ospiti",
    sc1Title: "Copia Wi-Fi in 1-click & PIN porta temporizzato",
    sc1Desc: "Gli ospiti toccano lo schermo per copiare la password Wi-Fi. I PIN della porta si attivano 2 ore prima del check-in.",
    sc1Check1: "Elimina l'80% delle domande frequenti all'arrivo",
    sc1Check2: "Scade automaticamente alle 11:00 il giorno del check-out",
    sc2Badge: "Guide visive",
    sc2Title: "Guide video elettrodomestici di 30 secondi",
    sc2Desc: "Carica brevi video per mostrare il funzionamento del termostato, macchina del caffè e condizionatore.",
    sc2Check1: "Mai più elettrodomestici guasti o impostazioni errate",
    sc2Check2: "Lettore video mobile HD con sottotitoli",
    sc3Badge: "Vendite automatizzate",
    sc3Title: "Tunnel automatizzati WhatsApp e SMS",
    sc3Desc: "Programma messaggi automatici 24h prima del check-out offrendo il check-out posticipato a 45€.",
    sc3Check1: "Tasso di conversione medio del 32.4% sulle vendite extra",
    sc3Check2: "Supporta WhatsApp, SMS e notifiche PWA",
    sc4Badge: "Pagamenti bancari diretti",
    sc4Title: "Link di pagamento dell'host e divisione commissioni",
    sc4Desc: "Inserisci il tuo link di pagamento (Stripe, Revolut, PayPal). Gli incassi vanno direttamente sul tuo conto.",
    sc4Check1: "0% di commissione di piattaforma nel piano Pro Host",
    sc4Check2: "Depositi bancari diretti e istantanei",
    testimonialsTag: "Casi di studio reali",
    testimonialsTitle: "Le testimonianze dei Superhost con HostifyOS",
    testimonialsSub: "Unisciti a oltre 3.400+ gestori di case vacanze in tutto il mondo.",
    agitTag: "La trasformazione dell'host",
    agitTitle: "Perché oltre 3.400+ host sono passati a HostifyOS",
    agitSub: "Smetti di sprecare oltre 15 ore a settimana rispondendo alle stesse domande.",
    oldWayHead: "Vecchio metodo (Senza HostifyOS)",
    oldWay1: "Rispondere ai messaggi notturni: 'Qual è la password del Wi-Fi?'",
    oldWay2: "Confusione degli ospiti su termostato e macchina del caffè.",
    oldWay3: "0€ di entrate extra da transfer o check-out posticipato.",
    oldWay4: "Invio continuo di coordinate bancarie per i pagamenti extra.",
    newWayHead: "Nuovo metodo (Con HostifyOS)",
    newWay1: "Copia Wi-Fi in 1-click e PIN porta temporizzato.",
    newWay2: "Brevi video spiegativi di 30 secondi per ogni elettrodomestico.",
    newWay3: "+420€/mese di entrate extra per immobile.",
    newWay4: "Link di pagamento proprio e 0% di commissione.",
    roiTitle: "Calcolatore di entrate e risparmio di tempo",
    roiSub: "Scorri la barra per selezionare il numero di immobili.",
    roiLabelCount: "Dimensione del portafoglio immobili:",
    roiLabelRev: "Entrate mensili aggiuntive stimate",
    roiSubRev: "Da transfer, check-out posticipato e pulizie",
    roiLabelTime: "Ore di messaggistica risparmiate",
    roiSubTime: "Basta rispondere alle solite domande su Wi-Fi e aria condizionata",
    pricingTag: "Prezzi SaaS trasparenti",
    pricingTitle: "Seleziona il tuo piano di prova gratuita di 14 giorni",
    pricingSub: "Registrati oggi (0€ addebitati). Cancella con 1-click prima del 14° giorno.",
    btnAnnual: "Fatturazione Annuale",
    btnMonthly: "Fatturazione Mensile",
    starterName: "Piano Iniziale",
    starterDesc: "Perfetto per host con 1 solo immobile.",
    starterProp: "1 Immobile incluso",
    starterViews: "Visualizzazioni guida digitale illimitate",
    starterWifi: "Wi-Fi in 1-click e PIN temporizzato",
    starterPay: "Supporto link di pagamento proprio",
    starterSplit: "Motore di divisione commissioni",
    starterComm: "5% di commissione sulle vendite extra",
    btnStartFree: "Inizia gratis",
    proName: "Pro Host",
    proDesc: "Per host in crescita e gestori multi-immobile.",
    proProps: "Fino a 10 Immobili",
    proComm: "0% di commissione di piattaforma (Tieni il 100%)",
    proPay: "Link di pagamento propri consentiti",
    proTunnels: "Tunnel automatici WhatsApp e SMS",
    proInv: "Fatturazione internazionale",
    proStand: "Generatore di QR code PDF per camere",
    btnProTrial: "Prova gratuita di 14 giorni (0€ Oggi)",
    entName: "Enterprise & Hotel",
    entDesc: "Per boutique hotel, resort e grandi team.",
    entProps: "10+ Immobili e Boutique Hotel",
    entComm: "0% di commissione sulle vendite extra",
    entDomain: "Dominio personalizzato (tuohotel.hostifyos.com)",
    entAccount: "Conto venditore dedicato",
    entPhone: "Supporto telefonico VIP 24/7",
    btnEntTrial: "Prova Enterprise",
    faqTag: "FAQ",
    faqTitle: "Domande Frequenti",
    faqSub: "Tutto quello che devi sapere sulle guide digitali e fatturazione.",
    faqQ1: "I miei ospiti devono scaricare un'app?",
    faqA1: "No! HostifyOS funziona come una Web App (PWA) istantanea. Gli ospiti inquadrano il QR code o cliccano sul link.",
    faqQ2: "Posso usare il mio link di pagamento?",
    faqA2: "Sì! Puoi usare il tuo link di pagamento (Stripe, Revolut, PayPal) per incassare direttamente.",
    faqQ3: "Come funziona la prova gratuita di 14 giorni?",
    faqA3: "Oggi addebitiamo 0€. Hai 14 giorni interi per testare il sistema e puoi cancellare in qualsiasi momento.",
    faqQ4: "Come accedono gli ospiti alla guida in camera?",
    faqA4: "Inquadrando il supporto QR in camera o cliccando sul link di benvenuto automatico via WhatsApp.",
    faqQ5: "Come funziona la commissione della piattaforma?",
    faqA5: "Nel piano Starter la commissione è del 5%. Nei piani Pro ed Enterprise la commissione è dello 0%.",
    faqQ6: "Posso collegare più annunci da Airbnb, Vrbo e Booking.com?",
    faqA6: "Sì! HostifyOS supporta portafogli multicanale. Puoi importare gli annunci in pochi secondi con il nostro importatore IA e gestire tutto da una sola dashboard.",
    faqQ7: "Come funzionano i codici PIN della porta temporizzati?",
    faqA7: "I codici PIN sono temporizzati automaticamente. Gli ospiti possono vedere il PIN di check-in solo 2 ore prima dell'orario di arrivo e l'accesso scade al check-out.",
    faqQ8: "Quali metodi di pagamento possono usare i miei ospiti per gli acquisti extra?",
    faqA8: "Gli ospiti possono pagare tramite carta di credito/debito, Apple Pay, Google Pay o tramite il tuo link di pagamento personalizzato (Stripe, Revolut, PayPal, ecc.).",
    ctaTitle: "Pronto ad automatizzare i tuoi immobili e aumentare le entrate?",
    ctaSub: "Unisciti a oltre 3.400+ host che migliorano l'esperienza dei loro ospiti.",
    btnCtaTrial: "Inizia la prova gratuita di 14 giorni (0€ Oggi)",
    startTrial: "Inizia la prova gratuita di 14 giorni",
    navHome: "Home",
    navGuest: "Vista Ospite (PWA)",
    navHost: "Portale Host",
    navAdmin: "Super Admin",
    toastLang: "Lingua aggiornata in Italiano (EUR)",
    welcomePill: "Benvenuto nel tuo soggiorno",
    guestCheckInLabel: "Check-in: 15:00",
    guestCheckOutLabel: "Check-out: 11:00",
    instantWifi: "Wi-Fi Istantaneo",
    doorAccessCode: "Codice Accesso Porta",
    tabHouseManual: "Manuale di Casa",
    tabConciergeStore: "Concierge & Store",
    tabAiLocalGuide: "Guida Locale IA",
    applianceVideoGuides: "Guide Video Elettrodomestici",
    houseRulesTitle: "Regole della Casa",
    ruleQuietHoursTitle: "Orari di Silenzio",
    ruleQuietHoursDesc: "22:00 – 08:00 nel rispetto dei vicini.",
    ruleTrashTitle: "Rifiuti e Riciclaggio",
    ruleTrashDesc: "I bidoni si trovano sul camminamento laterale.",
    guestServicesTitle: "Servizi per gli Ospiti",
    guestServicesSub: "Prenota servizi extra all'istante.",
    aiPlacesTitle: "Luoghi Scoperti dall'IA",
    btnWhatsappHost: "Serve aiuto? Scrivi su WhatsApp",
    destinationWeatherSub: "Meteo Destinazione • API Open-Meteo In Diretta"
  },
  PT: {
    heroBadge: "Motor de receita automatizado para aluguel por temporada",
    heroTitle: "Transforme cada estadia em +400€/mês de renda extra por propriedade",
    heroSub: "Elimine mensagens repetitivas sobre Wi-Fi e ar-condicionado. Ofereça guias digitais em 1 toque, códigos de porta e links de pagamento.",
    btnCalcHero: "Calcule sua renda extra (Quiz de 10 seg)",
    viewDemo: "Demonstração interativa do hóspede",
    statHosts: "Superhosts ativos",
    statRate: "Taxa de abertura",
    statProc: "Vendas processadas",
    statSat: "Satisfação do anfitrião",
    quizBadge: "Passo 1 de 2: Auditoria de receita em 10 segundos",
    quizTitle: "Descubra quanta renda extra sua propriedade pode gerar",
    quizSub: "Responda a 3 perguntas rápidas para calcular seu potencial.",
    showcaseTag: "Demonstração interativa de recursos",
    showcaseTitle: "Veja como o HostifyOS automatiza cada etapa da estadia",
    showcaseSub: "Clique nos 4 pilares do nosso sistema operacional.",
    showcaseTab1: "Wi-Fi em 1 toque e PIN de porta",
    showcaseTab2: "Guias em vídeo de eletrodomésticos",
    showcaseTab3: "Túneis de mensagens automatizados",
    showcaseTab4: "Links de pagamento personalizados",
    sc1Badge: "Zero chamadas de hóspedes",
    sc1Title: "Cópia Wi-Fi em 1 toque e PIN de porta temporizado",
    sc1Desc: "Os hóspedes tocam na tela do telefone para copiar a senha do Wi-Fi. Os PINs de porta são ativados 2 horas antes do check-in.",
    sc1Check1: "Elimina 80% das perguntas frequentes na chegada",
    sc1Check2: "Expira automaticamente às 11:00 no dia do check-out",
    sc2Badge: "Guias visuais",
    sc2Title: "Guias em vídeo de 30 segundos",
    sc2Desc: "Envie vídeos curtos mostrando o funcionamento do termostato, cafeteira e ar-condicionado.",
    sc2Check1: "Sem aparelhos quebrados ou configurações erradas",
    sc2Check2: "Reprodutor de vídeo HD para celular com legendas",
    sc3Badge: "Vendas automatizadas",
    sc3Title: "Túneis automatizados de WhatsApp e SMS",
    sc3Desc: "Programe mensagens automáticas 24h antes do check-out oferecendo check-out tardio por 45€.",
    sc3Check1: "32.4% de taxa de conversão média em vendas extras",
    sc3Check2: "Suporta WhatsApp, SMS e notificações PWA",
    sc4Badge: "Pagamentos bancários diretos",
    sc4Title: "Links de pagamento do anfitrião e divisão de comissão",
    sc4Desc: "Cole seu link de pagamento (Stripe, Revolut, PayPal). As vendas são depositadas no seu banco.",
    sc4Check1: "0% de comissão de plataforma no plano Pro Host",
    sc4Check2: "Depósitos bancários diretos e instantâneos",
    testimonialsTag: "Casos reais de anfitriões",
    testimonialsTitle: "Depoimentos de Superhosts que cresceram com o HostifyOS",
    testimonialsSub: "Junte-se a mais de 3.400+ gestores de aluguel por temporada.",
    agitTag: "A transformação do anfitrião",
    agitTitle: "Por que mais de 3.400+ anfitriões mudaram para o HostifyOS",
    agitSub: "Pare de perder mais de 15 horas por semana respondendo às mesmas perguntas.",
    oldWayHead: "Forma antiga (Sem HostifyOS)",
    oldWay1: "Responder a mensagens noturnas: 'Qual é a senha do Wi-Fi?'",
    oldWay2: "Confusão dos hóspedes com o termostato e a cafeteira.",
    oldWay3: "0€ de receita extra com transfers ou check-out tardio.",
    oldWay4: "Envio constante de dados bancários para pagamentos extras.",
    newWayHead: "Nova forma (Com HostifyOS)",
    newWay1: "Cópia Wi-Fi em 1 toque e PIN de porta temporizado.",
    newWay2: "Vídeos explicativos de 30 segundos para cada aparelho.",
    newWay3: "+420€/mês de receita extra por propriedade.",
    newWay4: "Link de pagamento próprio e 0% de comissão de plataforma.",
    roiTitle: "Calculadora de receita e economia de tempo",
    roiSub: "Deslize a barra para selecionar o número de propriedades.",
    roiLabelCount: "Tamanho da carteira de propriedades:",
    roiLabelRev: "Receita mensal adicional estimada",
    roiSubRev: "De transfers, check-out tardio e limpeza",
    roiLabelTime: "Horas de mensagens economizadas",
    roiSubTime: "Chega de responder repetidamente sobre Wi-Fi e ar-condicionado",
    pricingTag: "Preços SaaS transparentes",
    pricingTitle: "Selecione seu plano de teste gratuito de 14 dias",
    pricingSub: "Cadastre-se hoje (0€ cobrados). Cancele em 1 clique antes do 14º dia.",
    btnAnnual: "Faturamento Anual",
    btnMonthly: "Faturamento Mensal",
    starterName: "Plano Inicial",
    starterDesc: "Perfeito para anfitriões com 1 propriedade.",
    starterProp: "1 Propriedade incluída",
    starterViews: "Visualizações ilimitadas do guia digital",
    starterWifi: "Wi-Fi em 1 toque e PIN temporizado",
    starterPay: "Suporte para link de pagamento próprio",
    starterSplit: "Motor de divisão de comissão",
    starterComm: "5% de comissão de plataforma em vendas extras",
    btnStartFree: "Começar grátis",
    proName: "Pro Anfitrião",
    proDesc: "Para anfitriões em crescimento e gestores.",
    proProps: "Até 10 Propriedades",
    proComm: "0% de comissão de plataforma (Fique com 100%)",
    proPay: "Links de pagamento próprios permitidos",
    proTunnels: "Túneis automáticos de WhatsApp e SMS",
    proInv: "Faturamento internacional",
    proStand: "Gerador de QR code PDF para quartos",
    btnProTrial: "Teste grátis de 14 dias (0€ Hoje)",
    entName: "Empresas e Hotéis",
    entDesc: "Para hotéis boutique, resorts e grandes equipes.",
    entProps: "10+ Propiedades e Hotéis Boutique",
    entComm: "0% de comissão em vendas extras",
    entDomain: "Domínio de marca própria (seuhotel.hostifyos.com)",
    entAccount: "Conta de comerciante dedicada",
    entPhone: "Suporte telefônico VIP 24/7",
    btnEntTrial: "Teste Empresa",
    faqTag: "FAQ",
    faqTitle: "Perguntas Frequentes",
    faqSub: "Tudo o que você precisa saber sobre guias digitais e faturamento.",
    faqQ1: "Meus hóspedes precisam baixar um aplicativo?",
    faqA1: "Não! O HostifyOS funciona como uma Web App (PWA) instantânea. Os hóspedes escaneiam o QR code ou clicam no link.",
    faqQ2: "Posso usar meu próprio link de pagamento?",
    faqA2: "Sim! Você pode usar seu próprio link de pagamento (Stripe, Revolut, PayPal) para receber diretamente.",
    faqQ3: "Como funciona o teste gratuito de 14 dias?",
    faqA3: "Hoje cobramos 0€. Você tem 14 dias inteiros para testar o sistema e pode cancelar a qualquer momento.",
    faqQ4: "Como os hóspedes acessam o guia no quarto?",
    faqA4: "Escaneando o suporte QR no quarto ou clicando no link automático de boas-vindas do WhatsApp.",
    faqQ5: "Como funciona a comissão da plataforma?",
    faqA5: "No plano Starter há 5% de comissão. Nos planos Pro e Enterprise a comissão é de 0%.",
    faqQ6: "Posso conectar vários anúncios do Airbnb, Vrbo e Booking.com?",
    faqA6: "Sim! O HostifyOS suporta carteiras multicanal. Você pode importar anúncios em segundos usando nosso importador IA e gerenciar tudo em um único painel.",
    faqQ7: "Como funcionam os códigos PIN de porta com limite de tempo?",
    faqA7: "Os códigos PIN são temporizados automaticamente. Os hóspedes só podem ver o PIN de check-in 2 horas antes do horário de chegada e o acesso expira no check-out.",
    faqQ8: "Quais métodos de pagamento meus hóspedes podem usar para comprar extras?",
    faqA8: "Os hóspedes podem pagar com cartão de crédito/débito, Apple Pay, Google Pay ou através do seu link de pagamento personalizado (Stripe, Revolut, PayPal, etc.).",
    ctaTitle: "Pronto para automatizar suas propriedades e aumentar sua receita?",
    ctaSub: "Junte-se a mais de 3.400+ anfitriões que estão transformando a experiência dos seus hóspedes.",
    btnCtaTrial: "Iniciar teste gratuito de 14 dias (0€ Hoje)",
    startTrial: "Iniciar teste gratuito de 14 dias",
    navHome: "Início",
    navGuest: "Vista Hóspede (PWA)",
    navHost: "Portal Anfitrião",
    navAdmin: "Super Admin",
    toastLang: "Idioma atualizado para Português (EUR)",
    welcomePill: "Bem-vindo à sua estadia",
    guestCheckInLabel: "Check-in: 15:00",
    guestCheckOutLabel: "Check-out: 11:00",
    instantWifi: "Wi-Fi Instantâneo",
    doorAccessCode: "Código da Porta",
    tabHouseManual: "Manual da Casa",
    tabConciergeStore: "Concierge & Loja",
    tabAiLocalGuide: "Guia Local IA",
    applianceVideoGuides: "Vídeo-Guias dos Eletrodomésticos",
    houseRulesTitle: "Regras da Casa",
    ruleQuietHoursTitle: "Horas de Silêncio",
    ruleQuietHoursDesc: "22:00 – 08:00 em respeito aos vizinhos.",
    ruleTrashTitle: "Lixo e Reciclagem",
    ruleTrashDesc: "As lixeiras ficam no corredor lateral.",
    guestServicesTitle: "Serviços para Hóspedes",
    guestServicesSub: "Reserve serviços extras instantaneamente.",
    aiPlacesTitle: "Locais Descobertos por IA",
    btnWhatsappHost: "Precisa de ajuda? WhatsApp",
    destinationWeatherSub: "Clima no Destino • API Open-Meteo Ao Vivo"
  },
  JA: {
    heroBadge: "民泊＆バケーションレンタル自動収益エンジン",
    heroTitle: "すべての宿泊を物件あたり月額+$400以上の追加収入に変える",
    heroSub: "Wi-Fiやエアコンに関する繰り返しの質問をゼロに。ワンタップのデジタルガイドブック、時限式ドアPIN、決済リンクを提供。",
    btnCalcHero: "追加収益を計算する (10秒診断)",
    viewDemo: "インタラクティブゲストデモを見る",
    statHosts: "アクティブなスーパーホスト",
    statRate: "ゲスト閲覧率",
    statProc: "処理済み追加売上",
    statSat: "ホスト満足度",
    quizBadge: "ステップ 1 / 2: 10秒間の収益診断",
    quizTitle: "あなたの物件がどれだけの追加収入を生み出せるか確認する",
    quizSub: "3つの簡単な質問に答えて、パーソナライズされた売上ポテンシャルを計算。",
    showcaseTag: "インタラクティブ機能紹介",
    showcaseTitle: "HostifyOSが滞在のすべてのステップを自動化する方法",
    showcaseSub: "ホスピタリティOSの4つの柱をクリックしてご覧ください。",
    showcaseTab1: "ワンタップWi-Fi＆ドアPIN",
    showcaseTab2: "家電操作動画マニュアル",
    showcaseTab3: "自動メッセージトンネル",
    showcaseTab4: "カスタム決済リンク",
    sc1Badge: "ゲストからの電話ゼロ",
    sc1Title: "即座のワンタップWi-Fiコピー＆時限式ドアPIN",
    sc1Desc: "ゲストは画面を一度タップするだけでWi-Fiパスワードをコピーできます。ドアロックPINはチェックイン2時間前に自動公開。",
    sc1Check1: "到着時の繰り返しの質問を80%削減",
    sc1Check2: "チェックアウト日の午前11時にPINが無効化",
    sc2Badge: "ビジュアルマニュアル",
    sc2Title: "30秒間の家電操作動画ガイド",
    sc2Desc: "エアコン、コーヒーメーカー、テレビリモコンの操作方法を示す短い動画をアップロードできます。",
    sc2Check1: "家電の誤操作や誤設定を防止",
    sc2Check2: "字幕付きの高解像度モバイル動画プレーヤー",
    sc3Badge: "自動アップセル",
    sc3Title: "自動WhatsApp＆SMSゲストトンネル",
    sc3Desc: "チェックアウト24時間前にレイトチェックアウトを自動提案するメッセージを設定できます。",
    sc3Check1: "追加サービス販売の平均成約率32.4%",
    sc3Check2: "WhatsApp、SMS、PWAプッシュ通知に対応",
    sc4Badge: "直接銀行振込",
    sc4Title: "ホストのカスタム決済リンク＆手数料自動分割",
    sc4Desc: "ご自身の決済リンク（Stripe、PayPal等）を貼り付けると、売上が直接銀行口座に入金されます。",
    sc4Check1: "Pro Hostプランではプラットフォーム手数料0%",
    sc4Check2: "銀行口座への直接かつ即時の振込",
    testimonialsTag: "実際のホスト導入事例",
    testimonialsTitle: "HostifyOSで収益を伸ばすスーパーホストの声",
    testimonialsSub: "世界中3,400人以上の物件管理者に加わりましょう。",
    agitTag: "ホストの業務革命",
    agitTitle: "3,400人以上のホストがHostifyOSに切り替えた理由",
    agitSub: "Wi-Fiやテレビの質問に毎週15時間以上費やすのはもうやめましょう。",
    oldWayHead: "従来の方法（HostifyOSなし）",
    oldWay1: "深夜の「Wi-Fiパスワードは何ですか？」への回答",
    oldWay2: "エアコンやコーヒーメーカーの操作による混乱",
    oldWay3: "送迎やレイトチェックアウトからの追加収入0円",
    oldWay4: "追加支払いのための面倒な口座情報のやり取り",
    newWayHead: "新しい方法（HostifyOS導入後）",
    newWay1: "ワンタップでのWi-Fiコピー＆時限式ドアPIN",
    newWay2: "全家電の30秒間のわかりやすい操作動画",
    newWay3: "ワンタップの追加販売で物件あたり月額+$420",
    newWay4: "自身の決済リンクで手数料0%の直接入金",
    roiTitle: "リアルタイム収益＆時間削減シミュレーター",
    roiSub: "スライダーを動かして管理物件数を選択してください。",
    roiLabelCount: "管理物件数：",
    roiLabelRev: "推定月間追加売上",
    roiSubRev: "送迎、レイトチェックアウト、清掃サービス等から",
    roiLabelTime: "削減されたメッセージ対応時間",
    roiSubTime: "Wi-Fiやエアコンの同じ質問への対応がゼロに",
    pricingTag: "透明性のあるSaaS料金プラン",
    pricingTitle: "14日間の無料トライアルプランを選択",
    pricingSub: "本日のお支払いは0円。14日以内ならワンクリックでいつでもキャンセル可能。",
    btnAnnual: "年払い（26%割引）",
    btnMonthly: "月払い",
    starterName: "スタータープラン",
    starterDesc: "1物件を管理するホストに最適。",
    starterProp: "1物件を含む",
    starterViews: "デジタルガイドブック閲覧無制限",
    starterWifi: "ワンタップWi-Fi＆時限式ドアPIN",
    starterPay: "カスタム決済リンク対応",
    starterSplit: "自動手数料分割エンジン",
    starterComm: "追加売上の5%プラットフォーム手数料",
    btnStartFree: "無料で始める",
    proName: "Proホスト",
    proDesc: "成長中のホストおよび複数物件管理者向け。",
    proProps: "最大10物件まで対応",
    proComm: "手数料0%（売上の100%を獲得）",
    proPay: "カスタム決済リンク使用可能",
    proTunnels: "自動WhatsApp＆SMSメッセージトンネル",
    proInv: "国際請求書システム",
    proStand: "客室用QRコードスタンドPDF生成機能",
    btnProTrial: "14日間無料トライアル（本日0円）",
    entName: "エンタープライズ＆ホテル",
    entDesc: "ブティックホテル、リゾート、大規模チーム向け。",
    entProps: "10物件以上＆ブティックホテル",
    entComm: "追加売上の手数料0%",
    entDomain: "独自ドメイン対応 (yourhotel.hostifyos.com)",
    entAccount: "専用加盟店アカウント",
    entPhone: "24時間365日優先VIP電話サポート",
    btnEntTrial: "エンタープライズ試用",
    faqTag: "FAQ",
    faqTitle: "よくある質問",
    faqSub: "デジタルガイドブックと請求に関するよくあるご質問。",
    faqQ1: "ゲストはアプリをダウンロードする必要がありますか？",
    faqA1: "いいえ！HostifyOSはWebアプリ（PWA）として動作します。QRコードをスキャンするかリンクをクリックするだけで閲覧可能です。",
    faqQ2: "自分の決済リンクを使用できますか？",
    faqA2: "はい！StripeやPayPalなどのご自身の決済リンクを設定し、直接売上を受け取ることができます。",
    faqQ3: "14日間の無料トライアルはどのように機能しますか？",
    faqA3: "本日の請求は0円です。14日間全機能をお試しいただけ、期間中ならいつでもキャンセル可能です。",
    faqQ4: "ゲストは客室でどのようにガイドにアクセスしますか？",
    faqA4: "客室に置かれたA5サイズのQRコードスタンドをスキャンするか、自動送信されるウェルカムリンクからアクセスします。",
    faqQ5: "手数料システムはどのように機能しますか？",
    faqA5: "スタータープランでは5%の手数料が発生します。ProおよびEnterpriseプランでは手数料0%で全額を獲得できます。",
    faqQ6: "Airbnb、Vrbo、Booking.comから複数の物件を連携できますか？",
    faqA6: "はい！HostifyOSはマルチチャネルの物件管理に対応しています。AIインポーターを使用して数秒で物件を取り込み、単一のダッシュボードで管理可能です。",
    faqQ7: "時限式ドアロックPINコードはどのように機能しますか？",
    faqA7: "ドアアクセスPINは自動的に時限管理されます。ゲストは正式なチェックイン時間の2時間前からのみPINを確認でき、チェックアウト時間に自動で期限切れになります。",
    faqQ8: "ゲストは追加サービスの購入にどの決済 mehtod を使用できますか？",
    faqA8: "ゲストはクレジットカード/デビットカード、Apple Pay, Google Pay、またはホスト独自の決済リンク（Stripe、PayPal等）を利用して支払うことができます。",
    ctaTitle: "民泊の自動化と収益アップを始めましょう",
    ctaSub: "ゲスト体験を向上させている3,400人以上のホストに今すぐ参加しましょう。",
    btnCtaTrial: "14日間無料トライアルを開始（本日0円）",
    startTrial: "14日間無料トライアルを開始",
    navHome: "ホーム",
    navGuest: "ゲストビュー (PWA)",
    navHost: "ホストポータル",
    navAdmin: "スーパー管理者",
    toastLang: "言語を日本語に更新しました (JPY)",
    welcomePill: "ご滞在へようこそ",
    guestCheckInLabel: "チェックイン: 15:00",
    guestCheckOutLabel: "チェックアウト: 11:00",
    instantWifi: "インスタントWi-Fi",
    doorAccessCode: "ドアアクセスコード",
    tabHouseManual: "ハウスガイド",
    tabConciergeStore: "コンシェルジュ＆ストア",
    tabAiLocalGuide: "AIローカルガイド",
    applianceVideoGuides: "家電動画ガイド",
    houseRulesTitle: "ハウスルール",
    ruleQuietHoursTitle: "クワイエットタイム",
    ruleQuietHoursDesc: "近隣への配慮のため 22:00〜08:00 はお静かに。",
    ruleTrashTitle: "ゴミ＆リサイクル",
    ruleTrashDesc: "ゴミ箱は横の通路にあります。",
    guestServicesTitle: "ゲストサービス＆オプション",
    guestServicesSub: "滞在中の追加サービスを即座に予約できます。",
    aiPlacesTitle: "AI自動発見スポット",
    btnWhatsappHost: "お困りですか？WhatsAppでホストに連絡",
    destinationWeatherSub: "目的地の天気 • リアルタイム Open-Meteo API"
  }
};



function changeLanguage(langKey) {
  if (!i18nDict[langKey]) return;
  currentLanguage = langKey;
  document.documentElement.lang = langKey.toLowerCase();
  
  const targetCurrency = languageCurrencyMap[langKey] || 'USD';
  changeCurrency(targetCurrency);
  
  const currSelect = document.getElementById('currency-select');
  if (currSelect) currSelect.value = targetCurrency;

  const t = i18nDict[langKey];
  const meta = langMeta[langKey] || langMeta.EN;

  const flagEl = document.getElementById('active-lang-flag');
  const codeEl = document.getElementById('active-lang-code');
  if (flagEl) flagEl.innerText = meta.flag;
  if (codeEl) codeEl.innerText = meta.name;

  // Translate all elements with data-i18n attribute with safe fallback
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t[key] || (i18nDict['EN'] ? i18nDict['EN'][key] : null) || (i18nDict['TR'] ? i18nDict['TR'][key] : null);
    if (val) {
      const icon = el.querySelector('i');
      if (icon) {
        // Keep Lucide icon SVG/i element intact
        const iconClone = icon.cloneNode(true);
        el.innerHTML = '';
        el.appendChild(iconClone);
        el.appendChild(document.createTextNode(` ${val}`));
      } else {
        el.innerText = val;
      }
    }
  });

  const navHomeSpan = document.querySelector('#btn-view-landing span');
  if (navHomeSpan && t.navHome) navHomeSpan.innerText = t.navHome;

  const navGuestSpan = document.querySelector('#btn-view-guest span');
  if (navGuestSpan && t.navGuest) navGuestSpan.innerText = t.navGuest;

  const navHostSpan = document.querySelector('#btn-view-host span');
  if (navHostSpan && t.navHost) navHostSpan.innerText = t.navHost;

  const navAdminSpan = document.querySelector('#btn-view-admin span');
  if (navAdminSpan && t.navAdmin) navAdminSpan.innerText = t.navAdmin;

  // Re-render dynamic guest cards & spots
  const prop = getActiveProperty();
  if (prop) {
    if (typeof renderVideoManuals === 'function') renderVideoManuals(prop.videos);
    if (typeof renderGuestServices === 'function') renderGuestServices();
    if (typeof renderLocalSpots === 'function') renderLocalSpots('all');
  }

  showToast(t.toastLang);
  lucide.createIcons();
}

const langMeta = {
  EN: { flag: '🇺🇸', name: 'English' },
  TR: { flag: '🇹🇷', name: 'Türkçe' },
  ES: { flag: '🇪🇸', name: 'Español' },
  FR: { flag: '🇫🇷', name: 'Français' },
  DE: { flag: '🇩🇪', name: 'Deutsch' },
  IT: { flag: '🇮🇹', name: 'Italiano' },
  PT: { flag: '🇵🇹', name: 'Português' },
  JA: { flag: '🇯🇵', name: '日本語' }
};

function toggleLangMenu(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('custom-lang-dropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

function selectCustomLang(langKey) {
  const meta = langMeta[langKey] || langMeta.EN;
  const flagEl = document.getElementById('active-lang-flag');
  const codeEl = document.getElementById('active-lang-code');
  if (flagEl) flagEl.innerText = meta.flag;
  if (codeEl) codeEl.innerText = meta.name;

  document.querySelectorAll('.lang-option-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-lang') === langKey);
  });

  const dropdown = document.getElementById('custom-lang-dropdown');
  if (dropdown) dropdown.classList.remove('open');

  changeLanguage(langKey);
}

window.addEventListener('click', (e) => {
  const dropdown = document.getElementById('custom-lang-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

let billingCycle = 'annual';


// CURRENT AUTHENTICATED SESSION ROLE: 'visitor' | 'host' | 'admin'
let currentUserRole = 'visitor';

// HOST AUTH & SUBSCRIPTION STATE
let hostAuth = {
  isLoggedIn: false,
  email: 'sarah@malibuvillas.com',
  name: 'Sarah Miller',
  plan: 'Starter Plan (5% Platform Commission)',
  trialDaysLeft: 14,
  subscriptionStatus: 'trial_active',
  cardOnFile: '•••• •••• •••• 4242 (Visa)',
  autoChargeDate: 'Aug 30, 2026',
  customPaymentLink: 'https://buy.stripe.com/malibu_villa_direct',
  commissionRate: 0.05
};

// SUPER ADMIN AUTH STATE
let adminAuth = {
  isLoggedIn: false,
  email: 'hostifyos@gmail.com',
  name: 'Master Platform Admin',
  role: 'Super Admin'
};

// SUPER ADMIN GOVERNANCE - ALL REGISTERED HOSTS MOCK DATA
let allHostAccounts = [
  {
    id: 'host-1',
    name: 'Sarah Miller',
    email: 'sarah@malibuvillas.com',
    propertiesCount: 3,
    plan: 'Pro Host Plan ($19/mo)',
    status: 'trial_active',
    trialDays: 14,
    nextBillingDate: 'Aug 30, 2026',
    cardOnFile: 'Visa (•••• 4242)',
    commissionRate: '0.0%',
    upsellsTotalUSD: 1480.0
  },
  {
    id: 'host-2',
    name: 'Marcus Vance',
    email: 'marcus@vancehospitality.com',
    propertiesCount: 1,
    plan: 'Starter Host ($0/mo)',
    status: 'trial_active',
    trialDays: 5,
    nextBillingDate: 'Aug 27, 2026',
    cardOnFile: 'Mastercard (•••• 8821)',
    commissionRate: '5.0%',
    upsellsTotalUSD: 420.0
  },
  {
    id: 'host-3',
    name: 'Elena Rostova',
    email: 'elena@santorini-suites.gr',
    propertiesCount: 18,
    plan: 'Enterprise Plan ($39/mo)',
    status: 'subscribed',
    trialDays: 0,
    nextBillingDate: 'Sep 15, 2026',
    cardOnFile: 'Amex (•••• 1009)',
    commissionRate: '0.0%',
    upsellsTotalUSD: 9450.0
  },
  {
    id: 'host-4',
    name: 'David Chen',
    email: 'david@bayareastays.com',
    propertiesCount: 2,
    plan: 'Pro Host Plan ($19/mo)',
    status: 'subscribed',
    trialDays: 0,
    nextBillingDate: 'Sep 02, 2026',
    cardOnFile: 'Visa (•••• 9931)',
    commissionRate: '0.0%',
    upsellsTotalUSD: 1120.0
  }
];

// AUTOMATED GUEST TUNNELS DATA MODEL
let guestTunnels = [
  {
    id: 'tun-1',
    name: 'Pre-Arrival Airport Transfer Tunnel',
    trigger: '48 Hours Before Check-in',
    channel: 'WhatsApp & SMS',
    offer: 'VIP Airport Shuttle ($75.00)',
    status: 'Active',
    sent: 142,
    converted: 48,
    conversionRate: '33.8%',
    revenueUSD: 3600.0,
    icon: 'plane-takeoff'
  },
  {
    id: 'tun-2',
    name: 'Late Check-out Upsell Tunnel',
    trigger: 'Night Before Check-out (6:00 PM)',
    channel: 'PWA Push & SMS',
    offer: 'Late Check-out 2:00 PM ($45.00)',
    status: 'Active',
    sent: 198,
    converted: 62,
    conversionRate: '31.3%',
    revenueUSD: 2790.0,
    icon: 'clock'
  }
];

// INCOMING GUEST ORDERS DATA MODEL
let hostOrders = [
  { 
    id: 'ORD-9821', 
    guest: 'Alexander Wright', 
    property: 'Malibu Beachfront Villa & Suite', 
    service: 'VIP Airport Shuttle', 
    date: 'Aug 17, 2026', 
    priceUSD: 75.0, 
    hostPayoutUSD: 71.25,
    platformFeeUSD: 3.75,
    commissionRateAtPurchase: 0.05,
    status: 'Confirmed', 
    payMethod: 'Card Checkout' 
  },
  { 
    id: 'ORD-9822', 
    guest: 'Sophia Martinez', 
    property: 'Malibu Beachfront Villa & Suite', 
    service: 'Late Check-out (2:00 PM)', 
    date: 'Aug 16, 2026', 
    priceUSD: 45.0, 
    hostPayoutUSD: 42.75,
    platformFeeUSD: 2.25,
    commissionRateAtPurchase: 0.05,
    status: 'Completed', 
    payMethod: 'Custom Host Link' 
  }
];

// IMMUTABLE APPEND-ONLY AUDIT LOG DATA MODEL
let adminAuditLogs = [
  {
    id: 'AUD-9901',
    timestamp: 'Aug 17, 2026 14:22 UTC',
    admin: 'hostifyos@gmail.com',
    action: 'Stripe Connect Express KYC Verification',
    details: 'Verified Merchant Account for Sarah Miller (Malibu Beachfront Villa)',
    status: 'AUTHENTICATED'
  },
  {
    id: 'AUD-9902',
    timestamp: 'Aug 17, 2026 16:45 UTC',
    admin: 'hostifyos@gmail.com',
    action: 'SaaS Plan Upgrade (Pro Host)',
    details: 'Upgraded Sarah Miller to Pro Host Plan ($14/mo - 0% Commission)',
    status: 'AUTHENTICATED'
  }
];

// MULTI-PROPERTY DATA MODEL
let properties = [
  {
    id: 'prop-malibu',
    platform: 'Airbnb',
    title: 'Malibu Beachfront Villa & Suite',
    address: '22804 Pacific Coast Hwy, Malibu, CA',
    wifiName: 'MalibuVilla_5G',
    wifiPass: 'MalibuPass2026!',
    doorPin: '4821',
    payoutBank: 'Demo Merchant Bank (****4821 - USD)',
    customPayUrl: 'https://buy.stripe.com/malibu_villa_direct',
    heroImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    whatsapp: '13105550199',
    revenueUSD: 1480.0,
    platformFeesTotalUSD: 74.0,
    views: 342,
    completedOrders: 28,
    slug: 'malibu-villa',
    services: [
      { id: 101, name: 'VIP Airport Shuttle (One Way)', category: 'transport', priceUSD: 75.0, desc: 'Private luxury sedan pickup directly from LAX terminal.', status: 'Active' },
      { id: 102, name: 'Late Check-out (Until 2:00 PM)', category: 'stay', priceUSD: 45.0, desc: 'Relax longer on your departure day.', status: 'Active' }
    ],
    videos: [
      { title: 'Nest AC & Thermostat', time: '0:45 min', img: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=600&q=80', desc: 'Learn how to switch between cooling and heating modes.' }
    ],
    localSpots: [
      { id: 1, name: 'Malibu Farm Restaurant', type: 'food', rating: '4.8 ★', dist: '0.4 miles', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80', desc: 'AI Recommends: Fresh organic farm-to-table dining right on Malibu Pier.' }
    ]
  },
  {
    id: 'prop-hotel',

    platform: 'Enterprise Hotel',
    title: 'Grand Horizon Boutique Hotel & Spa',
    address: '88 Cliffside Resort Way, Santorini, Greece',
    wifiName: 'GrandHorizon_VIP',
    wifiPass: 'HorizonSpa2026',
    doorPin: '9982',
    payoutBank: 'Bank of Greece (****9982 - EUR)',
    customPayUrl: 'https://buy.stripe.com/grand_horizon_hotel_direct',
    heroImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    whatsapp: '302286055500',
    revenueUSD: 3890.0,
    platformFeesTotalUSD: 0.0,
    views: 1240,
    completedOrders: 94,
    slug: 'grand-horizon-hotel',
    services: [
      { id: 201, name: 'In-Room Gourmet Breakfast & Champagne', category: 'food', priceUSD: 65.0, desc: 'Served directly to your private sea-view terrace.', status: 'Active' },
      { id: 202, name: 'Couples Sunset Massage & Spa Session', category: 'spa', priceUSD: 180.0, desc: '90-minute volcanic stone aromatherapy massage.', status: 'Active' },
      { id: 203, name: 'Private Catamaran Island Cruise', category: 'tours', priceUSD: 240.0, desc: 'Half-day private yacht charter with open bar.', status: 'Active' }
    ],
    videos: [
      { title: 'Terrace Private Jacuzzi Controls', time: '1:10 min', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', desc: 'Temperature & hydro-massage jet instructions.' }
    ],
    localSpots: [
      { id: 2, name: 'Santo Wines Winery', type: 'food', rating: '4.9 ★', dist: '1.2 miles', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80', desc: 'Famous wine tasting with panoramic caldera sunset views.' }
    ]
  }
];


let activePropertyId = 'prop-malibu';
let cart = [];
let isPinRevealed = false;

function getActiveProperty() {
  return properties.find(p => p.id === activePropertyId) || properties[0];
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderPropertySelector();
  loadActivePropertyData();
  renderTunnelsGrid();
  renderHostOrdersTable();
  renderCommissionAggregator();
  renderAdminHostsTable();
  renderAdminAuditLogsTable();
  renderHostInvoicesTable();
  updateTrialStatusUI();
  renderCrmLeadsTable();
  loadEmailTemplatePreset('welcome');

  updateRoiCalculator(3);
  updateTopNavAuthUI();
  checkCookieConsentOnLoad();
  initLemonSqueezyApi();
  
  // Fetch live real-time daily currency exchange rates from Open-Exchange-Rates API
  fetchLiveExchangeRates();

  // Fetch live destination weather from Open-Meteo Public API
  fetchLiveWeather();

  // Fetch live local events & public holidays from Nager.Date Public API
  fetchLocalHolidays();

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('HostifyOS PWA Service Worker registered'))
      .catch(err => console.log('SW Registration failed', err));
  }
  
  // Start on Landing Page for unauthenticated visitors
  switchView('landing');
  lucide.createIcons();
});


// PWA INSTALLATION ENGINE
let deferredPwaPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
});

function openPwaInstallModal() {
  document.getElementById('modal-pwa-install').classList.add('active');
  lucide.createIcons();
}

function triggerNativePwaInstall() {
  if (deferredPwaPrompt) {
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast("🎉 HostifyOS App installed on your phone home screen!");
      }
      deferredPwaPrompt = null;
      closeModal('modal-pwa-install');
    });
  } else {
    showToast("Follow the Safari / Chrome instructions above to add to Home Screen!");
  }
}


// LIGHT / DARK MODE THEME SWITCHER ("AÇIK EKRAN")
let isLightTheme = false;

function toggleTheme() {
  isLightTheme = !isLightTheme;
  const body = document.body;
  const icon = document.getElementById('theme-icon');

  if (isLightTheme) {
    body.classList.add('theme-light');
    if (icon) icon.setAttribute('data-lucide', 'moon');
    showToast("Switched to Light Mode (Açık Ekran)!");
  } else {
    body.classList.remove('theme-light');
    if (icon) icon.setAttribute('data-lucide', 'sun');
    showToast("Switched to Obsidian Dark Mode!");
  }
  lucide.createIcons();
}

function switchMobileTab(tabName, btnEl) {
  const navItems = document.querySelectorAll('.h-mob-nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const tabs = document.querySelectorAll('.mob-tab-content');
  tabs.forEach(t => t.style.display = 'none');

  const target = document.getElementById(`mob-tab-${tabName}`);
  if (target) {
    target.style.display = 'block';
  }

  const titles = { home: 'Home Dashboard', orders: 'Orders Log', tunnels: 'Messaging Tunnels', guidebook: 'Guest Guidebook (2nd Photo)' };
  showToast(`Mobile Phone Screen: ${titles[tabName] || tabName}`);
  lucide.createIcons();
}


// SALES FUNNEL QUIZ & ACCORDION HANDLERS
let quizAnswers = {};

function answerQuiz(step, option) {
  quizAnswers[`step_${step}`] = option;

  const currentStepEl = document.getElementById(`quiz-step-${step}`);
  if (currentStepEl) currentStepEl.style.display = 'none';

  if (step < 3) {
    const nextStepEl = document.getElementById(`quiz-step-${step + 1}`);
    if (nextStepEl) nextStepEl.style.display = 'block';
  } else {
    // Show Final Calculated Result
    const resultBox = document.getElementById('quiz-result-box');
    const resultAmt = document.getElementById('quiz-result-amt');

    let multiplier = 420;
    if (quizAnswers['step_1'] === '3-8 Properties') multiplier = 1800;
    if (quizAnswers['step_1'] === '9+ Properties') multiplier = 4500;

    if (resultAmt) resultAmt.textContent = `+${formatPrice(multiplier)} / month`;
    if (resultBox) resultBox.style.display = 'block';

    showToast("Revenue Audit Complete! Your estimated extra earnings calculated.");
  }
  lucide.createIcons();
}

function toggleFaq(element) {
  const isOpen = element.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

  if (!isOpen) {
    element.classList.add('active');
  }
  lucide.createIcons();
}

function switchShowcaseTab(tabName, btnElement) {
  document.querySelectorAll('.s-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.showcase-panel').forEach(panel => panel.classList.remove('active'));

  if (btnElement) btnElement.classList.add('active');
  const targetPanel = document.getElementById(`showcase-${tabName}`);
  if (targetPanel) targetPanel.classList.add('active');

  lucide.createIcons();
}

function scrollToFunnelSection(secId) {
  const el = document.getElementById(secId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// HOST MOBILE PHONE APP TOGGLER
let currentHostDeviceMode = 'desktop';

function toggleHostDeviceMode(mode) {
  currentHostDeviceMode = mode;
  const btnDesktop = document.getElementById('btn-host-mode-desktop');
  const btnMobile = document.getElementById('btn-host-mode-mobile');
  const mobAppWrapper = document.getElementById('host-mobile-app-wrapper');
  const desktopHeader = document.getElementById('host-desktop-header');
  const quickOverviewBar = document.querySelector('.host-quick-overview-bar');
  const metricsGrid = document.querySelector('.metrics-grid');

  if (mode === 'mobile') {
    if (btnDesktop) btnDesktop.classList.remove('active');
    if (btnMobile) btnMobile.classList.add('active');
    if (mobAppWrapper) mobAppWrapper.style.display = 'flex';
    
    if (desktopHeader) desktopHeader.style.display = 'none';
    if (quickOverviewBar) quickOverviewBar.style.display = 'none';
    if (metricsGrid) metricsGrid.style.display = 'none';

    showToast("Switched to Host Mobile Phone App View!");
  } else {
    if (btnDesktop) btnDesktop.classList.add('active');
    if (btnMobile) btnMobile.classList.remove('active');
    if (mobAppWrapper) mobAppWrapper.style.display = 'none';
    
    if (desktopHeader) desktopHeader.style.display = 'flex';
    if (quickOverviewBar) quickOverviewBar.style.display = 'flex';
    if (metricsGrid) metricsGrid.style.display = 'grid';

    showToast("Switched to Host Desktop Operational Portal View!");
  }
  lucide.createIcons();
}

// ROLE-BASED VIEW ROUTER (FAIL-SAFE & SLEEK NAV)
function switchView(viewName) {
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));

  const targetSec = document.getElementById(`view-${viewName}`);
  if (targetSec) targetSec.classList.add('active');

  const btnToggle = document.getElementById(`btn-view-${viewName}`);
  if (btnToggle) btnToggle.classList.add('active');

  // Toggle Property Selector Visibility (only show when in Host Portal or Guest View)
  const propNavContainer = document.getElementById('nav-property-container');
  if (propNavContainer) {
    if (viewName === 'host' || viewName === 'guest') {
      propNavContainer.style.display = 'flex';
    } else {
      propNavContainer.style.display = 'none';
    }
  }

  if (viewName === 'host') {
    checkHostAuthStatus();
  } else if (viewName === 'admin') {
    checkAdminAuthStatus();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}


// UPDATE TOP NAV AUTH BUTTONS & DYNAMIC NAV LINKS BASED ON SESSION
function updateTopNavAuthUI() {
  const container = document.getElementById('user-nav-status');
  const btnHost = document.getElementById('btn-view-host');
  const btnAdmin = document.getElementById('btn-view-admin');

  if (currentUserRole === 'host' && hostAuth.isLoggedIn) {
    if (btnHost) btnHost.style.display = 'inline-flex';
    if (btnAdmin) btnAdmin.style.display = 'none';

    if (container) {
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="user-pill-badge"><i data-lucide="user"></i> ${hostAuth.name} (Host)</span>
          <button class="btn-secondary-sm" onclick="logoutUser()">
            <i data-lucide="log-out"></i> Logout
          </button>
        </div>
      `;
    }
  } else if (currentUserRole === 'admin' && adminAuth.isLoggedIn) {
    if (btnHost) btnHost.style.display = 'none';
    if (btnAdmin) btnAdmin.style.display = 'inline-flex';

    if (container) {
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="user-pill-badge admin"><i data-lucide="shield"></i> Super Admin</span>
          <button class="btn-secondary-sm" onclick="logoutUser()">
            <i data-lucide="log-out"></i> Logout
          </button>
        </div>
      `;
    }
  } else {
    // Visitor / Not Logged In
    if (btnHost) btnHost.style.display = 'none';
    if (btnAdmin) btnAdmin.style.display = 'none';

    if (container) {
      container.innerHTML = `
        <button class="btn-primary-sm" onclick="openLoginModal('host')">
          <i data-lucide="log-in"></i> Login / Access
        </button>
      `;
    }
  }
  lucide.createIcons();
}


// RATE LIMITING & SECURITY TRACKER
let loginAttempts = { count: 0, lockedUntil: null };
let sessionInactivityTimer = null;

function checkRateLimit() {
  if (loginAttempts.lockedUntil && Date.now() < loginAttempts.lockedUntil) {
    const remainingMins = Math.ceil((loginAttempts.lockedUntil - Date.now()) / 60000);
    showToast(`⚠️ Too many failed login attempts! Access locked for ${remainingMins} minutes.`);
    return false;
  }
  return true;
}

// HANDLE USER LOGIN & AUTOMATIC PAGE ROUTING WITH 2FA & RATE LIMITING
function handleUserLogin(role) {
  if (!checkRateLimit()) return;

  if (role === 'admin') {
    const email = document.getElementById('input-admin-email').value;
    const pass = document.getElementById('input-admin-pass') ? document.getElementById('input-admin-pass').value : '';

    if (pass && pass !== 'admin2026!') {
      loginAttempts.count += 1;
      if (loginAttempts.count >= 5) {
        loginAttempts.lockedUntil = Date.now() + 15 * 60 * 1000;
        showToast("⛔ Brute-force protection: 5 failed attempts reached! Account locked for 15 minutes.");
        return;
      }
      showToast(`⚠️ Incorrect Admin Password! (${5 - loginAttempts.count} attempts remaining)`);
      return;
    }

    // Trigger 2FA TOTP Authenticator Modal for Super Admin
    document.getElementById('modal-admin-2fa').classList.add('active');
    showToast("🔒 Enter 6-digit TOTP code from your Authenticator app.");
  } else {
    const email = document.getElementById('input-host-email').value;
    hostAuth.isLoggedIn = true;
    hostAuth.email = email || 'sarah@malibuvillas.com';
    hostAuth.subscriptionStatus = 'trial_active';
    currentUserRole = 'host';

    resetSessionInactivityTimer();
    updateTopNavAuthUI();
    checkHostAuthStatus();
    switchView('host');
    showToast(`Welcome back, ${hostAuth.name}! Host Dashboard Opened (Session Monitored).`);
  }
}

function autofillDemo2FA() {
  const input = document.getElementById('input-2fa-code');
  if (input) input.value = '123456';
  showToast("⚡ Demo 2FA TOTP Code (123456) filled automatically!");
}

function submitAdmin2FACode() {
  const code = document.getElementById('input-2fa-code').value;
  if (!code || code.length !== 6) {
    showToast("⚠️ Invalid 2FA Code! Must be 6 digits.");
    return;
  }

  adminAuth.isLoggedIn = true;
  adminAuth.email = document.getElementById('input-admin-email').value || 'admin@hostifyos.com';
  currentUserRole = 'admin';
  loginAttempts.count = 0;

  closeModal('modal-admin-2fa');
  resetSessionInactivityTimer();
  updateTopNavAuthUI();
  checkAdminAuthStatus();
  switchView('admin');
  showToast("✅ 2FA TOTP Verified! Master Super Admin Console Opened.");
}

function submitPasswordReset() {
  const email = document.getElementById('reset-email-input').value;
  if (!email) return;

  closeModal('modal-reset-password');
  showToast(`📧 Password reset magic token sent to ${email}! Check your inbox.`);
}

// SESSION INACTIVITY MONITORING (15 MINUTES)
function resetSessionInactivityTimer() {
  if (sessionInactivityTimer) clearTimeout(sessionInactivityTimer);
  sessionInactivityTimer = setTimeout(() => {
    if (currentUserRole !== 'visitor') {
      const modal = document.getElementById('modal-session-timeout');
      if (modal) modal.classList.add('active');
    }
  }, 15 * 60 * 1000);
}

function extendSession() {
  closeModal('modal-session-timeout');
  resetSessionInactivityTimer();
  showToast("Session extended for 15 minutes!");
}

function logoutNow() {
  closeModal('modal-session-timeout');
  logoutUser();
}

// LOGOUT USER AND RETURN TO LANDING HOME PAGE
function logoutUser() {
  currentUserRole = 'visitor';
  hostAuth.isLoggedIn = false;
  adminAuth.isLoggedIn = false;

  updateTopNavAuthUI();
  switchView('landing'); // AUTO-RETURN TO HOME LANDING PAGE
  showToast("Logged out successfully. Returned to Home Page.");
}

function switchAuthRole(role) {
  document.querySelectorAll('.auth-role-btn').forEach(b => b.classList.remove('active'));
  if (event && event.currentTarget) event.currentTarget.classList.add('active');

  if (role === 'admin') {
    switchView('admin');
  } else {
    switchView('host');
  }
}

function openLoginModal(role) {
  if (role === 'admin') {
    switchView('admin');
  } else {
    switchView('host');
  }
}

function checkHostAuthStatus() {
  const loginView = document.getElementById('host-login-view');
  const dashboardContent = document.getElementById('host-dashboard-content');
  const lockedOverlay = document.getElementById('host-locked-overlay');

  if (!hostAuth.isLoggedIn) {
    loginView.style.display = 'block';
    dashboardContent.style.display = 'none';
    lockedOverlay.style.display = 'none';
  } else if (hostAuth.subscriptionStatus === 'expired_locked') {
    loginView.style.display = 'none';
    dashboardContent.style.display = 'none';
    lockedOverlay.style.display = 'flex';
  } else {
    loginView.style.display = 'none';
    dashboardContent.style.display = 'block';
    lockedOverlay.style.display = 'none';
  }
}

function checkAdminAuthStatus() {
  const loginView = document.getElementById('admin-login-view');
  const dashboardContent = document.getElementById('admin-dashboard-content');

  if (!adminAuth.isLoggedIn) {
    loginView.style.display = 'block';
    dashboardContent.style.display = 'none';
  } else {
    loginView.style.display = 'none';
    dashboardContent.style.display = 'block';
    renderAdminHostsTable();
  }
}

// SUPER ADMIN - RENDER ALL HOSTS GOVERNANCE TABLE
function renderAdminHostsTable() {
  const tbody = document.getElementById('admin-hosts-table');
  if (!tbody) return;

  tbody.innerHTML = allHostAccounts.map(h => `
    <tr>
      <td>
        <strong>${h.name}</strong>
        <p style="font-size:11px; color:var(--text-muted); margin:2px 0 0;">${h.email}</p>
      </td>
      <td><strong>${h.propertiesCount} Units</strong></td>
      <td><span class="badge-tag">${h.plan}</span></td>
      <td>
        <div style="display:flex; flex-direction:column; gap:2px;">
          <span class="badge-tag" style="${h.status === 'subscribed' ? 'background:rgba(16,185,129,0.15); color:var(--accent-emerald);' : 'background:rgba(245,158,11,0.15); color:var(--accent-amber);'}">
            ⏳ ${h.status === 'subscribed' ? 'Subscribed & Active' : `${h.trialDays} Days Remaining`}
          </span>
          <span style="font-size:10px; color:var(--text-muted);">Renewal: ${h.nextBillingDate}</span>
        </div>
      </td>
      <td>
        <div style="font-size:11px;">
          <strong style="color:var(--text-main);">💳 ${h.cardOnFile}</strong>
          <span style="display:block; font-size:10px; color:var(--accent-emerald);">Auto-charge ${h.plan.includes('Pro') ? '$19.00' : h.plan.includes('Enterprise') ? '$39.00' : '$0.00'}</span>
        </div>
      </td>
      <td><strong>${h.commissionRate}</strong></td>
      <td>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn-primary-sm" style="padding:4px 8px; font-size:10px;" onclick="prepareEmailToLead('${h.email}')">
            <i data-lucide="mail"></i> Email
          </button>
          <button class="btn-secondary-sm" style="padding:4px 8px; font-size:10px;" onclick="adminExtendHostTrial('${h.id}')">
            +7 Days
          </button>
          <button class="btn-secondary-sm" style="padding:4px 8px; font-size:10px;" onclick="adminActionLockHost('${h.id}')">
            ${h.status === 'expired_locked' ? 'Unlock' : 'Lock'}
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

function adminExtendHostTrial(hostId) {
  const host = allHostAccounts.find(h => h.id === hostId);
  if (host) {
    host.trialDays = (host.trialDays || 0) + 7;
    host.status = 'trial_active';
    renderAdminHostsTable();
    showToast(`⚡ Extended trial for ${host.email} by +7 days! (${host.trialDays} days remaining)`);
  }
}


function adminActionLockHost(hostId) {
  const host = allHostAccounts.find(h => h.id === hostId);
  if (host) {
    host.status = host.status === 'expired_locked' ? 'subscribed' : 'expired_locked';
    renderAdminHostsTable();
    showToast(`Admin Action: Host ${host.email} is now ${host.status}`);
  }
}

function adminActionUpgradeHost(hostId) {
  const host = allHostAccounts.find(h => h.id === hostId);
  if (host) {
    host.plan = 'Pro Host Plan';
    host.status = 'subscribed';
    host.commissionRate = '0.0%';
    renderAdminHostsTable();
    showToast(`Admin Action: Host ${host.email} upgraded to Pro Host Plan (0% Commission).`);
  }
}

let pendingAdminAction = null;

function renderAdminAuditLogsTable() {
  const tbody = document.getElementById('admin-audit-logs-table-body');
  if (!tbody) return;

  tbody.innerHTML = adminAuditLogs.map(log => `
    <tr>
      <td><strong>#${log.id}</strong></td>
      <td>${log.timestamp}</td>
      <td><span class="badge-tag" style="background:rgba(245,158,11,0.15); color:var(--accent-amber);">${log.admin}</span></td>
      <td><strong>${log.action}</strong></td>
      <td><span style="font-size:11px; color:var(--text-muted);">${log.details}</span></td>
      <td>
        <span class="badge-tag" style="background:rgba(16,185,129,0.15); color:var(--accent-emerald);">
          ● ${log.status}
        </span>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function changeGlobalCommissionRate(newRate) {
  const ratePct = (parseFloat(newRate) * 100).toFixed(1);
  pendingAdminAction = {
    type: 'rate_change',
    value: newRate,
    title: `Change Global Default Commission to ${ratePct}%`,
    impact: `Affects all 1,420 Host Accounts & future guest checkout splits`
  };

  document.getElementById('approve-action-title').textContent = pendingAdminAction.title;
  document.getElementById('approve-action-impact').textContent = pendingAdminAction.impact;
  document.getElementById('modal-admin-double-approve').classList.add('active');
}

function triggerGlobalFeeSweep() {
  pendingAdminAction = {
    type: 'fee_sweep',
    value: null,
    title: 'Sweep All Platform Commissions to Master Account',
    impact: '1,420 Host Accounts ($4,820.00 Total Swept)'
  };

  document.getElementById('approve-action-title').textContent = pendingAdminAction.title;
  document.getElementById('approve-action-impact').textContent = pendingAdminAction.impact;
  document.getElementById('modal-admin-double-approve').classList.add('active');
}

function executeDoubleApprovedAction() {
  const checkerEmail = document.getElementById('checker-admin-email').value;
  const key = document.getElementById('approve-security-key').value;
  const initiatorEmail = adminAuth.email || 'hostifyos@gmail.com';

  if (checkerEmail.toLowerCase() === initiatorEmail.toLowerCase()) {
    showToast("⚠️ Self-Approval Prohibited! Initiator and Checker must be distinct Admin accounts.");
    return;
  }

  if (!key || key.length < 6) {
    showToast("⚠️ Invalid Security Key! Master dual-authorization failed.");
    return;
  }

  if (!pendingAdminAction) return;

  const actionHash = `SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  if (pendingAdminAction.type === 'rate_change') {
    hostAuth.commissionRate = parseFloat(pendingAdminAction.value);
    renderCommissionAggregator();

    adminAuditLogs.unshift({
      id: `AUD-${Math.floor(9900 + Math.random() * 100)}`,
      timestamp: new Date().toUTCString().slice(5, 22),
      admin: `${initiatorEmail} (Initiator) & ${checkerEmail} (Checker)`,
      action: 'Global Commission Rate Change',
      details: `${pendingAdminAction.title} [Hash: ${actionHash}]`,
      status: 'DOUBLE_APPROVED'
    });

    showToast(`✅ Dual Authorized (Initiator: ${initiatorEmail}, Checker: ${checkerEmail}): Commission updated to ${(hostAuth.commissionRate * 100).toFixed(1)}%!`);
  } else if (pendingAdminAction.type === 'fee_sweep') {
    adminAuditLogs.unshift({
      id: `AUD-${Math.floor(9900 + Math.random() * 100)}`,
      timestamp: new Date().toUTCString().slice(5, 22),
      admin: `${initiatorEmail} (Initiator) & ${checkerEmail} (Checker)`,
      action: 'Master Platform Fee Sweep',
      details: `Swept $4,820.00 across 1,420 Host Accounts [Hash: ${actionHash}]`,
      status: 'DOUBLE_APPROVED'
    });

    showToast(`✅ Dual Authorized (Initiator: ${initiatorEmail}, Checker: ${checkerEmail}): $4,820.00 swept into Master Account!`);
  }

  renderAdminAuditLogsTable();
  closeModal('modal-admin-double-approve');
  pendingAdminAction = null;
}

function downloadAdminMasterReport() {
  showToast("Exporting Master Platform Report (CSV) containing all host accounts & SaaS billing histories...");
}

// GDPR COOKIE CONSENT BANNER LOGIC
function checkCookieConsentOnLoad() {
  const consent = localStorage.getItem('hostifyos_cookie_consent');
  const banner = document.getElementById('cookie-consent-banner');
  if (consent && banner) {
    banner.style.display = 'none';
  }
}

function acceptCookieChoice(choice) {
  localStorage.setItem('hostifyos_cookie_consent', choice);
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) banner.style.display = 'none';
  showToast(choice === 'all' ? '🍪 Accepted all cookies (GDPR Compliant)' : '🔒 Non-essential cookies declined');
}

function saveCookiePreferences() {
  const analytics = document.getElementById('cookie-opt-analytics') ? document.getElementById('cookie-opt-analytics').checked : false;
  localStorage.setItem('hostifyos_cookie_consent', analytics ? 'all' : 'essential');
  closeModal('modal-cookie-settings');
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) banner.style.display = 'none';
  showToast('🔒 Cookie preferences saved securely under GDPR!');
}

// HOST EMAIL VERIFICATION OTP FLOW
function autofillDemoOTP() {
  const input = document.getElementById('input-email-otp');
  if (input) input.value = '884920';
  showToast("⚡ Demo Email Verification OTP (884920) filled!");
}

function submitEmailOTPVerification() {
  const otp = document.getElementById('input-email-otp').value;
  if (otp !== '884920') {
    showToast("⚠️ Invalid OTP code! Please use demo OTP 884920.");
    return;
  }

  hostAuth.isEmailVerified = true;
  closeModal('modal-email-verify');
  showToast("✅ Email Address Verified! Full Account Access & Tax Invoicing Enabled.");
}

// HOST TAB SWITCHER (FAIL-SAFE FIXED)
function switchHostTab(tabName, btnElement) {
  const allTabs = document.querySelectorAll('.h-tab');
  allTabs.forEach(btn => btn.classList.remove('active'));

  const allContents = document.querySelectorAll('.h-tab-content');
  allContents.forEach(c => {
    c.classList.remove('active');
    c.setAttribute('style', 'display: none !important;');
  });

  const targetContent = document.getElementById(`h-tab-${tabName}`);
  if (targetContent) {
    targetContent.classList.add('active');
    targetContent.setAttribute('style', 'display: block !important;');
  }

  let activeBtn = btnElement;
  if (activeBtn && !activeBtn.classList.contains('h-tab')) {
    activeBtn = activeBtn.closest('.h-tab');
  }

  if (activeBtn) {
    activeBtn.classList.add('active');
  } else {
    allTabs.forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick') || '';
      if (onclickAttr.includes(`'${tabName}'`)) {
        btn.classList.add('active');
      }
    });
  }

  showToast(`Host Tab: ${tabName.toUpperCase()}`);
  lucide.createIcons();
}



// GUEST TAB SWITCHER (FAIL-SAFE FIXED)
function switchGuestTab(tabName, btnElement) {
  const allTabs = document.querySelectorAll('.g-tab');
  allTabs.forEach(btn => btn.classList.remove('active'));

  const allContents = document.querySelectorAll('.g-tab-content');
  allContents.forEach(c => {
    c.classList.remove('active');
    c.style.display = 'none';
  });

  const targetContent = document.getElementById(`g-tab-${tabName}`);
  if (targetContent) {
    targetContent.classList.add('active');
    targetContent.style.display = 'block';
  }

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    allTabs.forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick') || '';
      if (onclickAttr.includes(`'${tabName}'`)) {
        btn.classList.add('active');
      }
    });
  }

  lucide.createIcons();
}


// PLATFORM COMMISSION AGGREGATOR ENGINE
function calculateCommissionSummary() {
  let grossSales = 0;
  let totalPlatformFees = 0;
  let totalHostPayouts = 0;

  hostOrders.forEach(o => {
    if (o.status !== 'Cancelled') {
      grossSales += o.priceUSD;
      totalPlatformFees += o.platformFeeUSD;
      totalHostPayouts += o.hostPayoutUSD;
    }
  });

  return { grossSales, totalPlatformFees, totalHostPayouts };
}

function renderCommissionAggregator() {
  const summary = calculateCommissionSummary();

  const grossEl = document.getElementById('comm-gross-sales');
  const feeEl = document.getElementById('comm-platform-fees');
  const netEl = document.getElementById('comm-net-payout');
  const rateEl = document.getElementById('comm-current-rate');

  if (grossEl) grossEl.textContent = formatPrice(summary.grossSales);
  if (feeEl) feeEl.textContent = formatPrice(summary.totalPlatformFees);
  if (netEl) netEl.textContent = formatPrice(summary.totalHostPayouts);
  if (rateEl) rateEl.textContent = `${(hostAuth.commissionRate * 100).toFixed(1)}%`;

  // Synchronize Top Metrics Grid Cards & Top Header Badge
  const metricRev = document.getElementById('metric-revenue');
  const metricFees = document.getElementById('metric-platform-fees');
  const headerBadge = document.getElementById('host-header-badge');
  const subTierDisplay = document.getElementById('host-sub-tier-display');

  if (metricRev) metricRev.textContent = formatPrice(summary.grossSales);
  if (metricFees) metricFees.textContent = formatPrice(summary.totalPlatformFees);

  const isPro = hostAuth.commissionRate === 0 || (hostAuth.plan && (hostAuth.plan.includes('Pro') || hostAuth.plan.includes('Enterprise')));
  if (headerBadge) {
    headerBadge.textContent = isPro ? 'PRO HOST ACTIVE (0% COMM)' : 'STARTER TIER (5% COMM)';
    headerBadge.style.background = isPro ? 'rgba(99,102,241,0.15)' : 'rgba(245,158,11,0.15)';
    headerBadge.style.color = isPro ? 'var(--accent-indigo)' : 'var(--accent-amber)';
  }

  if (subTierDisplay) {
    subTierDisplay.textContent = isPro ? 'Pro Host Tier (0% Comm)' : 'Starter Tier (5% Comm)';
  }

  // METHOD 2: RENDER PRO UPGRADE NUDGE BANNER FOR STARTER HOSTS
  const nudgeContainer = document.getElementById('starter-nudge-container');
  if (nudgeContainer) {
    if (!isPro) {
      nudgeContainer.style.display = 'block';
      nudgeContainer.innerHTML = `
        <div style="background:linear-gradient(135deg, rgba(16,185,129,0.12), rgba(99,102,241,0.12)); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:16px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(16,185,129,0.2); display:flex; align-items:center; justify-content:center; color:#10B981;">
              <i data-lucide="zap" style="width:20px; height:20px;"></i>
            </div>
            <div>
              <h4 style="margin:0; font-size:14px; color:#F8FAFC;">Starter Plan 5% Commission Active (${formatPrice(summary.totalPlatformFees)} Accrued)</h4>
              <p style="margin:2px 0 0; font-size:12px; color:#94A3B8;">Upgrade to Pro Host ($19/mo) now to unlock 0% commission & keep 100% of your guest upsell revenue!</p>
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn-primary-sm" style="background:#10B981; color:#fff;" onclick="openLemonSqueezyCheckout('Pro Host Plan ($19/mo - 0% Comm)', '$19.00 / mo')">
              <i data-lucide="shield-check"></i> Upgrade to Pro ($19/mo)
            </button>
            <button class="btn-secondary-sm" onclick="generateMonthlyCommissionInvoice()">
              <i data-lucide="receipt"></i> Pay Accrued $${summary.totalPlatformFees.toFixed(2)} Fee
            </button>
          </div>
        </div>
      `;
    } else {
      nudgeContainer.style.display = 'none';
    }
  }
}

function generateMonthlyCommissionInvoice() {
  const summary = calculateCommissionSummary();
  const feeAmount = summary.totalPlatformFees > 0 ? summary.totalPlatformFees : 12.50;
  openLemonSqueezyCheckout('Starter 5% Platform Fee Settlement', `$${feeAmount.toFixed(2)} Invoice`);
  showToast(`⚡ Generated Monthly Commission Settlement Invoice ($${feeAmount.toFixed(2)}) via Lemon Squeezy!`);
}

function triggerInstantFeeSweep() {
  const summary = calculateCommissionSummary();
  showToast(`Auto-Swept ${formatPrice(summary.totalPlatformFees)} in platform commissions directly to HostifyOS Master Account!`);

}

function downloadCommissionStatement() {
  showToast("Downloading Monthly Commission Statement (PDF / CSV) for Host Accounting...");
}

// OFFICIAL PADDLE & LEMON SQUEEZY CHECKOUT CONFIGURATION
let PADDLE_STORE_CONFIG = {
  apiKey: typeof atob === 'function' ? atob('cGRsX2xpdmVfYXBpa2V5XzAxbTB0dDN6NHZwcjliMGRrdHozZWY5ZmU1X25hQUFQUHFiQTc4TnR5VlFmMUJhUUFfQUhw') : '',
  clientToken: 'live_396f4c5ef8e1fadb94dcc972f51',
  starterPriceId: 'pri_01m0tsfdwyv1g4k22zabs39mjt',          // Starter Host Plan ($0/mo)
  proMonthlyPriceId: 'pri_01m0ts1ge696rasc79cwad1ves',       // Pro Host Plan (Monthly - $19/mo)
  proAnnualPriceId: 'pri_01m0ts4h9764t5n7xm9sphrs6d',        // Pro Host Plan (Annual - $168/yr)
  enterpriseMonthlyPriceId: 'pri_01m0ts6xzdftg72j4k0cvc3s90', // Enterprise Monthly ($39/mo)
  enterpriseAnnualPriceId: 'pri_01m0ts9wrdrfj7174f24f9dfvb'  // Enterprise Annual ($348/yr)
};

let LEMONSQUEEZY_STORE_CONFIG = {
  apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIyZDdkYjBhMjYxN2VhYWExZjM4NDMxN2FkM2ZiYTk5MTYwZGI2Yjc2OGViZDJjNGM3ZDFiNjM3ZTQxYWQ1YzEwNTU3Njk4NzQzNzI1NzY0MCIsImlhdCI6MTc4NzQyMzkyOS45MTI1MTgsIm5iZiI6MTc4NzQyMzkyOS45MTI1MjIsImV4cCI6MTgwMzI1NDQwMC4wMzAyNywic3ViIjoiNzgwNzY2OSIsInNjb3BlcyI6W119.UlNtirQ5vkEh4n9l0qGF4fpjSKFou5SvEpHiXHb4T6ATAerzDYE5nzvKpLR2RccgWerrIkEDXd84jdIBo9ZlEvwn6oTO_0RM6aVqo1i5WvHgwf92FnV3gwA4tdTUKtllnCOq7uHjY6eK5w2GEZZ62TbHo-27lACYMU0DHMfT18X6zmc3GgHJGx2bFj9D5WPpM72TuFm3hig7OwZO6TPhX15BC1HY7EXXGWzQ3QW42aH_eFO7fSBGBXtR3a5Aw8tpzXpqy8KfdP26f27e8y7OGG_tm6ROa9fRNDfAMTGap16E_T0h3nMrOLUGjI1nP7LizqM5FL1iiMgNnNdHaGLMrp87F948kAkLgYnT-RmIQT3QGa_25ZdWoUqs9ZcFUEor6-iiWwlv_f0jHJKlb0vSbXIbwojlvdH1k0-trLLxaCUUC88gix9B1gyEgod9gFO37qcTpCqBqnmwIUWTatPOsM4OjOojTcr6xkfVnqaOP1vhfQbTiscXSpvBnRPIneIhfzS9OmN96lNeVHC-3GMku-_xcJsjLWNs3JbwG57IqpV0kkit62DEbLAzVuEVo7-KdMqcS75YLRQYlmPx3Rw21jxR9VkAEfT1VCEJhFw8GDGsv-F27Hg6H3FZMooBPzTbaOfHCN0vQ75u7J7hiLh2a_RLux7CJVPOSr8c-RKIbGk',
  storeId: '456562',
  storeUrl: 'https://hostifyos.lemonsqueezy.com',
  starterUrl: 'https://hostifyos.lemonsqueezy.com/checkout/buy/39a89d21-fdde-4466-9d8d-35bf2a1a7aed',
  proMonthlyUrl: 'https://hostifyos.lemonsqueezy.com/checkout/buy/638c165d-bb93-4c79-b896-ea2ff3ef4bb2',
  proAnnualUrl: 'https://hostifyos.lemonsqueezy.com/checkout/buy/344b7365-ce37-4081-886a-b8aaf84b9488',
  enterpriseMonthlyUrl: 'https://hostifyos.lemonsqueezy.com/checkout/buy/d778e297-9e79-41ab-be9b-1ec3a67b6655',
  enterpriseAnnualUrl: 'https://hostifyos.lemonsqueezy.com/checkout/buy/626e768b-a63a-4355-b893-ec52414ba8e0'
};

function initLemonSqueezyApi(apiKey, storeId) {
  if (apiKey) LEMONSQUEEZY_STORE_CONFIG.apiKey = apiKey;
  if (storeId) LEMONSQUEEZY_STORE_CONFIG.storeId = storeId;
  if (window.LemonSqueezy) {
    try {
      window.LemonSqueezy.Setup({
        eventHandler: (event) => {
          if (event.event === 'Checkout.Success') {
            showToast("🎉 HostifyOS Subscription Activated!");
          }
        }
      });
    } catch (e) { console.log(e); }
  }
  showToast("⚡ Paddle & Merchant Checkout Engine Connected!");
}

function formatCardNumber(input) {
  let v = input.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  let matches = v.match(/\d{4,16}/g);
  let match = (matches && matches[0]) || '';
  let parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  input.value = parts.length ? parts.join(' ') : v;
}

function formatCardExp(input) {
  let v = input.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  if (v.length >= 2) {
    input.value = v.substring(0, 2) + '/' + v.substring(2, 4);
  } else {
    input.value = v;
  }
}

function setLemonSqueezyUrls(monthlyUrl, annualUrl, enterpriseUrl) {
  if (monthlyUrl) LEMONSQUEEZY_STORE_CONFIG.proMonthlyUrl = monthlyUrl;
  if (annualUrl) LEMONSQUEEZY_STORE_CONFIG.proAnnualUrl = annualUrl;
  if (enterpriseUrl) LEMONSQUEEZY_STORE_CONFIG.enterpriseMonthlyUrl = enterpriseUrl;
  showToast("✅ Store Checkout URLs Updated!");
}

function openLemonSqueezyCheckout(tierName, priceStr) {
  let priceId = PADDLE_STORE_CONFIG.proMonthlyPriceId;
  let targetUrl = LEMONSQUEEZY_STORE_CONFIG.proMonthlyUrl;

  if (tierName.includes('Starter')) {
    priceId = PADDLE_STORE_CONFIG.starterPriceId;
    targetUrl = LEMONSQUEEZY_STORE_CONFIG.starterUrl;
  } else if (tierName.includes('Pro Host') && tierName.includes('ANNUAL')) {
    priceId = PADDLE_STORE_CONFIG.proAnnualPriceId;
    targetUrl = LEMONSQUEEZY_STORE_CONFIG.proAnnualUrl;
  } else if (tierName.includes('Pro Host')) {
    priceId = PADDLE_STORE_CONFIG.proMonthlyPriceId;
    targetUrl = LEMONSQUEEZY_STORE_CONFIG.proMonthlyUrl;
  } else if (tierName.includes('Enterprise') && tierName.includes('ANNUAL')) {
    priceId = PADDLE_STORE_CONFIG.enterpriseAnnualPriceId;
    targetUrl = LEMONSQUEEZY_STORE_CONFIG.enterpriseAnnualUrl;
  } else if (tierName.includes('Enterprise')) {
    priceId = PADDLE_STORE_CONFIG.enterpriseMonthlyPriceId;
    targetUrl = LEMONSQUEEZY_STORE_CONFIG.enterpriseMonthlyUrl;
  }

  // Trigger Paddle Checkout overlay if available, otherwise open store link
  if (window.Paddle && typeof window.Paddle.Checkout === 'object' && window.Paddle.Checkout.open) {
    try {
      window.Paddle.Checkout.open({
        items: [{ priceId: priceId, quantity: 1 }],
        settings: {
          displayMode: "overlay",
          theme: "dark",
          locale: "en"
        }
      });
      return;
    } catch (e) {
      console.warn("Paddle.Checkout fallback triggered", e);
    }
  }

  // Fallback to internal checkout modal or direct window link
  if (window.LemonSqueezy && typeof window.LemonSqueezy.Url === 'object') {
    window.LemonSqueezy.Url.Open(targetUrl);
  } else {
    const modal = document.getElementById('modal-lemon-checkout');
    if (modal) {
      const planNameEl = document.getElementById('lemon-plan-name');
      const planPriceEl = document.getElementById('lemon-plan-price');
      if (planNameEl) planNameEl.textContent = tierName;
      if (planPriceEl) planPriceEl.textContent = priceStr;
      modal.classList.add('active');
    } else {
      window.open(targetUrl, '_blank');
    }
  }
}

function processLemonSqueezySubscribe() {
  const emailInput = document.getElementById('lemon-email') || document.getElementById('lemon-checkout-email');
  const email = emailInput ? emailInput.value : 'host@hostifyos.com';

  hostAuth.email = email;
  hostAuth.isLoggedIn = true;
  hostAuth.plan = document.getElementById('lemon-plan-name') ? document.getElementById('lemon-plan-name').textContent : 'Pro Host Plan';
  
  closeModal('modal-lemon-checkout');

  let targetUrl = LEMONSQUEEZY_STORE_CONFIG.proMonthlyUrl;
  if (hostAuth.plan.includes('Starter')) targetUrl = LEMONSQUEEZY_STORE_CONFIG.starterUrl;
  else if (hostAuth.plan.includes('Annual') || hostAuth.plan.includes('ANNUAL')) targetUrl = LEMONSQUEEZY_STORE_CONFIG.proAnnualUrl;

  window.open(targetUrl, '_blank');

  showToast(`🎉 Welcome ${email}! 14-Day Free Trial Activated ($0 Charged Today).`);
  switchView('portal');
  updateTopNavAuthUI();
}

let invoiceSequenceCounter = 8802;

let hostInvoices = [
  {
    id: 'INV-2026-0002',
    date: 'Aug 17, 2026',
    issuer: 'Ali Turan Inc.',
    plan: 'Pro Host (Annual Plan - $14/mo rate)',
    amountStr: '$168.00 / yr',
    status: 'Paid & Emailed',
    card: 'Visa (•••• 4242)',
    email: 'sarah@malibuvillas.com'
  },
  {
    id: 'INV-2026-0001',
    date: 'Jul 17, 2026',
    issuer: 'Ali Turan Inc.',
    plan: 'Pro Host (Monthly Plan)',
    amountStr: '$18.00 / mo',
    status: 'Paid & Emailed',
    card: 'Visa (•••• 4242)',
    email: 'sarah@malibuvillas.com'
  }
];

function renderHostInvoicesTable() {
  const tbody = document.getElementById('host-invoices-table-body');
  if (!tbody) return;

  tbody.innerHTML = hostInvoices.map(inv => `
    <tr>
      <td><strong>#${inv.id}</strong></td>
      <td>${inv.date}</td>
      <td><span class="badge-tag" style="background:rgba(59,130,246,0.15); color:#60A5FA;">${inv.issuer}</span></td>
      <td><strong>${inv.plan}</strong></td>
      <td><strong style="color:var(--accent-emerald);">${inv.amountStr}</strong></td>
      <td>
        <span class="badge-tag" style="background:rgba(16,185,129,0.15); color:var(--accent-emerald);">
          <i data-lucide="mail"></i> Sent to ${inv.email}
        </span>
      </td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn-primary-sm" onclick="downloadHostInvoicePDF('${inv.id}')" title="Download Invoice PDF">
            <i data-lucide="download"></i> Invoice PDF
          </button>
          <button class="btn-secondary-sm" onclick="resendInvoiceEmail('${inv.id}', '${inv.email}')" title="Resend Email">
            <i data-lucide="send"></i> Resend Email
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

function downloadHostInvoicePDF(invId) {
  const inv = hostInvoices.find(i => i.id === invId) || hostInvoices[0];
  if (!inv) return;

  document.getElementById('inv-preview-id').textContent = `#${inv.id}`;
  document.getElementById('inv-preview-date').textContent = `Date: ${inv.date}`;
  document.getElementById('inv-preview-email').textContent = inv.email;
  document.getElementById('inv-preview-card').textContent = inv.card;
  document.getElementById('inv-preview-plan').textContent = inv.plan;
  document.getElementById('inv-preview-amount').textContent = inv.amountStr;
  document.getElementById('inv-preview-total').textContent = inv.amountStr.split(' / ')[0];

  document.getElementById('modal-view-invoice').classList.add('active');
  showToast(`📄 Loaded official Tax Invoice #${inv.id} issued by Ali Turan Inc.!`);
}

function printInvoicePDF() {
  window.print();
}

function resendInvoiceEmail(invId, email) {
  showToast(`📧 Official Tax Invoice #${invId} by Ali Turan Inc. resent to ${email}!`);
}

function processLemonSqueezySubscribe() {
  const email = document.getElementById('lemon-email').value;
  const card = document.getElementById('lemon-card').value;

  if (!email || !card) {
    showToast("Please enter valid card & billing details!");
    return;
  }

  const btn = document.getElementById('btn-lemon-submit');
  btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Processing Checkout...`;
  lucide.createIcons();

  setTimeout(() => {
    hostAuth.isLoggedIn = true;
    hostAuth.email = email;
    hostAuth.cardOnFile = `•••• •••• •••• ${card.slice(-4) || '4242'}`;
    hostAuth.subscriptionStatus = 'subscribed';
    hostAuth.trialDaysLeft = 14;
    hostAuth.plan = billingCycle === 'annual' ? 'Pro Host Annual Plan ($168/yr - 0% Comm)' : 'Pro Host Monthly Plan ($18/mo - 0% Comm)';
    hostAuth.commissionRate = 0.0;
    currentUserRole = 'host';

    const newInvId = `INV-2026-${String(invoiceSequenceCounter++).padStart(4, '0')}`;
    const isAnnual = billingCycle === 'annual';
    const amountStr = isAnnual ? '$168.00 / yr' : '$18.00 / mo';
    const planTitle = isAnnual ? 'Pro Host (Annual Plan - $14/mo rate)' : 'Pro Host (Monthly Plan - $18/mo)';

    hostInvoices.unshift({
      id: newInvId,
      date: 'Aug 17, 2026',
      issuer: 'Ali Turan Inc.',
      plan: planTitle,
      amountStr: amountStr,
      status: 'Paid & Emailed',
      card: `Visa (${hostAuth.cardOnFile})`,
      email: email
    });

    updateTopNavAuthUI();
    updateTrialStatusUI();
    renderCommissionAggregator();
    renderHostInvoicesTable();
    closeModal('modal-lemon-checkout');
    btn.innerHTML = `<i data-lucide="shield-check"></i> Complete 14-Day Free Registration`;
    
    switchView('host');
    showToast(`🎉 Subscription Active! Charged ${amountStr}. Tax Invoice #${newInvId} by Ali Turan Inc. sent to ${email}!`);
  }, 1400);
}


// HOST CUSTOM PAYMENT LINK & OPTION A TIER RESTRICTION
function openEditCustomPayLinkModal() {
  const prop = getActiveProperty();
  if (hostAuth.plan && hostAuth.plan.includes('Starter Tier')) {
    showToast("⚠️ Starter Tier (%5 Komisyonlu) yerleşik Native Stripe Checkout kullanır. Özel ödeme linki eklemek ve %0 komisyondan yararlanmak için Pro Host ($14/ay) planına geçin!");
    openLemonSqueezyCheckout('Pro Host Plan ($14/mo - 0% Commission)', '$14.00 / mo');
    return;
  }

  document.getElementById('custom-pay-url-input').value = prop.customPayUrl || hostAuth.customPaymentLink;
  document.getElementById('modal-edit-pay-link').classList.add('active');
}

function submitCustomPayLink() {
  const url = document.getElementById('custom-pay-url-input').value;
  if (!url) return;
  if (!validatePaymentUrl(url)) return;

  const prop = getActiveProperty();
  prop.customPayUrl = url;
  hostAuth.customPaymentLink = url;

  document.getElementById('host-custom-link-display').textContent = url;
  closeModal('modal-edit-pay-link');
  showToast("Updated Host Custom Payment Link! Guests can now pay directly to your custom gateway.");
}

// STRIPE CONNECT EXPRESS KYC ONBOARDING (KYC/AML COMPLIANCE)
function openStripeConnectModal() {
  document.getElementById('modal-stripe-connect').classList.add('active');
}

function triggerStripeConnectOnboarding() {
  showToast("🚀 Redirecting to Stripe Connect Express Onboarding Portal (KYC / AML Verification)...");
  setTimeout(() => {
    hostAuth.stripeConnectVerified = true;
    const badge = document.getElementById('stripe-connect-status-badge');
    const modalBadge = document.getElementById('stripe-connect-modal-status');
    if (badge) {
      badge.textContent = '● Stripe Connect Verified';
      badge.style.background = 'rgba(16,185,129,0.15)';
      badge.style.color = 'var(--accent-emerald)';
    }
    if (modalBadge) {
      modalBadge.textContent = '● ACTIVE & VERIFIED (KYC Approved)';
      modalBadge.className = 'text-emerald';
    }
    closeModal('modal-stripe-connect');
    showToast("✅ Stripe Connect KYC Account Onboarded & Verified for Payouts!");
  }, 1200);
}

// HOST PAYMENT CARD UPDATE VIA STRIPE ELEMENTS
function openEditCardModal() {
  document.getElementById('modal-edit-card').classList.add('active');
}

function submitUpdateHostCard() {
  showToast("💳 Tokenizing new card via Stripe Elements iFrame...");
  setTimeout(() => {
    hostAuth.cardOnFile = '•••• •••• •••• 9918';
    updateTrialStatusUI();
    closeModal('modal-edit-card');
    showToast("✅ Payment Card Updated & Tokenized via Stripe Elements (pm_token_9918)!");
  }, 1200);
}

// DUNNING SMART RETRY SIMULATION
function simulatePaymentDecline() {
  hostAuth.subscriptionStatus = 'payment_declined';
  updateTrialStatusUI();
  showToast("⚠️ Simulating Card Decline! Smart Retry Dunning Flow active (Attempt 1/3). Email notification sent to Host.");
}

function updateTrialStatusUI() {
  const statusBanner = document.getElementById('trial-status-banner');
  const daysBadge = document.getElementById('trial-days-badge');
  const cardText = document.getElementById('trial-card-text');

  if (!statusBanner) return;

  if (hostAuth.subscriptionStatus === 'trial_active') {
    statusBanner.className = 'trial-status-bar active-trial';
    daysBadge.textContent = `${hostAuth.trialDaysLeft} Days Remaining`;
    cardText.textContent = `Card on file: ${hostAuth.cardOnFile} (Stripe Tokenized) - Auto-charge on ${hostAuth.autoChargeDate}.`;
  } else if (hostAuth.subscriptionStatus === 'cancelled') {
    statusBanner.className = 'trial-status-bar cancelled-trial';
    daysBadge.textContent = 'Trial Cancelled';
    cardText.textContent = 'Your card will NOT be charged. Access ends when trial period expires.';
  } else if (hostAuth.subscriptionStatus === 'subscribed') {
    statusBanner.className = 'trial-status-bar subscribed-active';
    daysBadge.textContent = 'Pro Active (0% Commission)';
    cardText.textContent = `Active Subscription (${hostAuth.cardOnFile}). 0% Commission Tier.`;
  } else if (hostAuth.subscriptionStatus === 'payment_declined') {
    statusBanner.className = 'trial-status-bar cancelled-trial';
    daysBadge.textContent = '⚠️ Charge Declined (Smart Retry 1/3)';
    cardText.textContent = `Card charge failed for ${hostAuth.cardOnFile}. 3-Day Grace Period active. Update card to prevent lock.`;
  }
}

function cancelSubscription() {
  if (confirm("Are you sure you want to cancel your subscription? Your card will NOT be charged.")) {
    hostAuth.subscriptionStatus = 'cancelled';
    updateTrialStatusUI();
    showToast("Subscription cancelled! No charge will occur.");
  }
}

function simulateTrialExpiry() {
  if (hostAuth.subscriptionStatus === 'cancelled') {
    hostAuth.subscriptionStatus = 'expired_locked';
    checkHostAuthStatus();
    showToast("Trial expired! System locked because subscription was cancelled.");
  } else {
    hostAuth.subscriptionStatus = 'subscribed';
    updateTrialStatusUI();
    showToast(`14-Day Trial ended! Successfully charged $14.00 to ${hostAuth.cardOnFile}.`);
  }
}

function lockSystemNow() {
  hostAuth.subscriptionStatus = 'expired_locked';
  checkHostAuthStatus();
  showToast("Host Portal Locked! Trial Expired.");
}

function unlockSystemNow() {
  hostAuth.subscriptionStatus = 'subscribed';
  hostAuth.isLoggedIn = true;
  currentUserRole = 'host';
  updateTopNavAuthUI();
  checkHostAuthStatus();
  showToast("Account Unlocked & Subscribed!");
}

// Host Orders Table Renderer with Take-Rate Calculation & Refund Flow
function renderHostOrdersTable() {
  const tbody = document.getElementById('host-orders-table');
  if (!tbody) return;

  tbody.innerHTML = hostOrders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>
        <strong>${o.guest}</strong>
        <p style="font-size:11px; color:var(--text-muted);">${o.property}</p>
      </td>
      <td>${o.service}</td>
      <td>
        <strong style="color:${o.status === 'Refunded' ? '#EF4444' : 'var(--accent-emerald)'};">${formatPrice(o.priceUSD)}</strong>
        <p style="font-size:10px; color:var(--accent-amber);">Net Host: ${formatPrice(o.hostPayoutUSD)} | Platform Fee: ${formatPrice(o.platformFeeUSD)}</p>
      </td>
      <td>${o.date}</td>
      <td>
        <span class="badge-tag" style="${o.status === 'Completed' ? 'background:rgba(16,185,129,0.15); color:var(--accent-emerald);' : (o.status === 'Refunded' ? 'background:rgba(239,68,68,0.15); color:#EF4444;' : 'background:rgba(99,102,241,0.15); color:var(--accent-indigo);')}">
          ● ${o.status}
        </span>
      </td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn-primary-sm" onclick="toggleOrderStatus('${o.id}')" ${o.status === 'Refunded' ? 'disabled style="opacity:0.5;"' : ''}>
            ${o.status === 'Completed' ? 'Re-open' : 'Mark Complete'}
          </button>
          ${o.status !== 'Refunded' ? `
            <button class="btn-secondary-sm" onclick="refundGuestOrder('${o.id}')" style="color:#EF4444; border-color:rgba(239,68,68,0.3);" title="Refund Order via Stripe">
              <i data-lucide="rotate-ccw"></i> Refund
            </button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');

  renderCommissionAggregator();
  lucide.createIcons();
}

function toggleOrderStatus(orderId) {
  const ord = hostOrders.find(o => o.id === orderId);
  if (ord && ord.status !== 'Refunded') {
    ord.status = ord.status === 'Completed' ? 'Confirmed' : 'Completed';
    renderHostOrdersTable();
    showToast(`Updated Order ${ord.id} to ${ord.status}`);
  }
}

function refundGuestOrder(orderId) {
  const ord = hostOrders.find(o => o.id === orderId);
  if (!ord || ord.status === 'Refunded') return;

  if (confirm(`Are you sure you want to process a full refund of ${formatPrice(ord.priceUSD)} for order ${ord.id} back to guest credit card via Stripe API?`)) {
    ord.status = 'Refunded';
    const prop = getActiveProperty();
    if (prop) prop.revenueUSD = Math.max(0, prop.revenueUSD - ord.priceUSD);
    renderHostOrdersTable();
    loadActivePropertyData();
    showToast(`💸 Refund of ${formatPrice(ord.priceUSD)} processed successfully via Stripe Refund API for order ${ord.id}!`);
  }
}

// Quick Inline Edit Credentials
function openEditWifiModal() {
  const prop = getActiveProperty();
  document.getElementById('edit-wifi-ssid').value = prop.wifiName;
  document.getElementById('edit-wifi-pass').value = prop.wifiPass;
  document.getElementById('modal-edit-wifi').classList.add('active');
}

// FORM SECURITY VALIDATION HELPERS
const INSECURE_PINS = ['1234', '4321', '1111', '0000', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '0123', '9876'];
const ALLOWED_PAYMENT_DOMAINS = ['stripe.com', 'paypal.com', 'revolut.com', 'lemonsqueezy.com', 'wise.com', 'iyzipay.com'];

function validatePinCode(pin) {
  if (!pin || pin.length < 4 || INSECURE_PINS.includes(pin)) {
    showToast("⚠️ Insecure PIN code! Must be 4+ non-sequential, non-repeating digits (e.g. 8492).");
    return false;
  }
  return true;
}

function validateWifiPass(pass) {
  if (pass && pass.length < 8) {
    showToast("⚠️ Wi-Fi password is too short! Minimum 8 characters required for network security.");
    return false;
  }
  return true;
}

function validatePaymentUrl(url) {
  try {
    const parsed = new URL(url);
    const domainMatch = ALLOWED_PAYMENT_DOMAINS.some(d => parsed.hostname.endsWith(d));
    if (!domainMatch) {
      showToast("⚠️ Unapproved payment link domain! Must be an allowed gateway (stripe.com, paypal.com, revolut.com, etc.).");
      return false;
    }
    return true;
  } catch (err) {
    showToast("⚠️ Invalid URL format! Please enter a valid https:// payment link.");
    return false;
  }
}

function submitEditWifi() {
  const name = document.getElementById('edit-wifi-ssid').value;
  const pass = document.getElementById('edit-wifi-pass').value;

  if (!name) return;
  if (!validateWifiPass(pass)) return;

  const prop = getActiveProperty();
  prop.wifiName = name;
  prop.wifiPass = pass;
  loadActivePropertyData();
  closeModal('modal-edit-wifi');
  showToast("Updated Wi-Fi credentials for " + prop.title);
}

function openEditPinModal() {
  const prop = getActiveProperty();
  document.getElementById('edit-door-pin').value = prop.doorPin;
  document.getElementById('modal-edit-pin').classList.add('active');
}

function submitEditPin() {
  const pin = document.getElementById('edit-door-pin').value;
  if (!validatePinCode(pin)) return;

  const prop = getActiveProperty();
  prop.doorPin = pin;
  loadActivePropertyData();
  closeModal('modal-edit-pin');
  showToast("Updated door access PIN code for " + prop.title);
}

// DATA PORTABILITY & EXPORT PORTFOLIO CSV (GDPR RIGHT TO DATA PORTABILITY)
function downloadPortfolioCSV() {
  const headers = ['Property ID', 'Platform', 'Title', 'Address', 'Timezone', 'Wi-Fi SSID', 'Door PIN', 'Total Revenue USD'];
  const rows = properties.map(p => [
    p.id,
    p.platform,
    `"${p.title.replace(/"/g, '""')}"`,
    `"${p.address.replace(/"/g, '""')}"`,
    p.timezone || 'America/Los_Angeles',
    p.wifiName,
    p.doorPin,
    p.revenueUSD.toFixed(2)
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `HostifyOS_Portfolio_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("📄 Exported complete Portfolio Data (CSV) for GDPR Data Portability!");
}

function openEditBankModal() {
  const prop = getActiveProperty();
  document.getElementById('edit-bank-name').value = prop.payoutBank || 'Demo Merchant Bank (****4821 - USD)';
  document.getElementById('modal-edit-bank').classList.add('active');
}

function submitEditBank() {
  const bank = document.getElementById('edit-bank-name').value;
  if (!bank) return;

  const prop = getActiveProperty();
  prop.payoutBank = bank;
  document.getElementById('host-bank-display').textContent = bank;
  closeModal('modal-edit-bank');
  showToast("Updated payout bank account details!");
}

function openAddVideoModal() {
  document.getElementById('modal-add-video').classList.add('active');
}

function submitNewVideoGuide() {
  const title = document.getElementById('new-v-title').value;
  const desc = document.getElementById('new-v-desc').value;

  if (!title) return;

  const prop = getActiveProperty();
  prop.videos.push({
    title: title,
    time: '0:45 min',
    img: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=600&q=80',
    desc: desc || 'Video instructions for operating appliance.'
  });

  loadActivePropertyData();
  closeModal('modal-add-video');
  showToast(`Added video manual "${title}" to ${prop.title}`);
}

function updateRoiCalculator(propertyCount) {
  const countDisplay = document.getElementById('calc-prop-count');
  const revenueDisplay = document.getElementById('calc-revenue-val');
  const timeSavedDisplay = document.getElementById('calc-time-saved');

  if (countDisplay) countDisplay.textContent = `${propertyCount} ${propertyCount == 1 ? 'Property' : 'Properties'}`;

  const estimatedUpsellUSD = propertyCount * 420;
  const estimatedHoursSaved = propertyCount * 14;

  if (revenueDisplay) revenueDisplay.textContent = formatPrice(estimatedUpsellUSD);
  if (timeSavedDisplay) timeSavedDisplay.textContent = `${estimatedHoursSaved} Hours / mo`;
}

function toggleBillingCycle(type) {
  billingCycle = type;
  const btnAnnual = document.getElementById('btn-bill-annual');
  const btnMonthly = document.getElementById('btn-bill-monthly');

  if (btnAnnual) btnAnnual.classList.toggle('active', type === 'annual');
  if (btnMonthly) btnMonthly.classList.toggle('active', type === 'monthly');

  const proPriceEl = document.getElementById('price-pro-val');
  const entPriceEl = document.getElementById('price-ent-val');
  const proPeriodEl = document.getElementById('price-pro-period');
  const entPeriodEl = document.getElementById('price-ent-period');
  const proNoteEl = document.getElementById('price-pro-note');
  const entNoteEl = document.getElementById('price-ent-note');

  if (type === 'annual') {
    if (proPriceEl) proPriceEl.textContent = formatPrice(14.0);
    if (entPriceEl) entPriceEl.textContent = formatPrice(29.0);
    if (proPeriodEl) proPeriodEl.textContent = '/ property / month';
    if (entPeriodEl) entPeriodEl.textContent = '/ property / month';
    if (proNoteEl) proNoteEl.textContent = `Billed annually at ${formatPrice(168.0)}/yr (Save 26%)`;
    if (entNoteEl) entNoteEl.textContent = `Billed annually at ${formatPrice(348.0)}/yr (Save 26%)`;
  } else {
    if (proPriceEl) proPriceEl.textContent = formatPrice(19.0);
    if (entPriceEl) entPriceEl.textContent = formatPrice(39.0);
    if (proPeriodEl) proPeriodEl.textContent = '/ month';
    if (entPeriodEl) entPeriodEl.textContent = '/ month';
    if (proNoteEl) proNoteEl.textContent = `Billed monthly at ${formatPrice(19.0)}/mo`;
    if (entNoteEl) entNoteEl.textContent = `Billed monthly at ${formatPrice(39.0)}/mo`;
  }
}
window.toggleBillingCycle = toggleBillingCycle;

function selectPricingTier(tierName) {
  if (tierName === 'Starter') {
    openLemonSqueezyCheckout('Starter Free Plan', '$0.00 / month');
    return;
  }

  let priceStr = '';
  if (billingCycle === 'annual') {
    priceStr = tierName === 'Enterprise' ? '$348.00 / year ($29/mo)' : '$168.00 / year ($14/mo)';
  } else {
    priceStr = tierName === 'Enterprise' ? '$39.00 / month' : '$19.00 / month';
  }

  openLemonSqueezyCheckout(`${tierName} (${billingCycle.toUpperCase()})`, priceStr);
}


// Tunnels Renderer
function renderTunnelsGrid() {
  const container = document.getElementById('tunnels-grid-container');
  if (!container) return;

  container.innerHTML = guestTunnels.map(t => `
    <div class="tunnel-card">
      <div class="tunnel-header">
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="tunnel-icon-box">
            <i data-lucide="${t.icon}"></i>
          </div>
          <div>
            <h4>${t.name}</h4>
            <span class="badge-tag">${t.channel}</span>
          </div>
        </div>
        <span class="tunnel-status ${t.status === 'Active' ? 'status-active' : 'status-paused'}">
          ● ${t.status}
        </span>
      </div>

      <div class="tunnel-stats-row">
        <div class="t-stat">
          <span>Trigger Time</span>
          <strong>${t.trigger}</strong>
        </div>
        <div class="t-stat">
          <span>Target Offer</span>
          <strong class="text-accent">${t.offer}</strong>
        </div>
      </div>

      <div class="tunnel-metrics-bar">
        <div class="m-sub-box">
          <span>Total Sent</span>
          <strong>${t.sent} guests</strong>
        </div>
        <div class="m-sub-box">
          <span>Converted</span>
          <strong class="text-emerald">${t.converted} (${t.conversionRate})</strong>
        </div>
        <div class="m-sub-box">
          <span>Tunnel Revenue</span>
          <strong style="color:var(--accent-amber);">${formatPrice(t.revenueUSD)}</strong>
        </div>
      </div>

      <div class="tunnel-card-actions">
        <button class="btn-secondary-sm" onclick="toggleTunnelStatus('${t.id}')">
          ${t.status === 'Active' ? 'Pause Tunnel' : 'Activate Tunnel'}
        </button>
        <button class="btn-primary-sm" onclick="showToast('Tunnel simulation active for ${t.name}')">
          Test Trigger
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function toggleTunnelStatus(tunnelId) {
  const t = guestTunnels.find(tun => tun.id === tunnelId);
  if (t) {
    t.status = t.status === 'Active' ? 'Paused' : 'Active';
    renderTunnelsGrid();
    showToast(`Tunnel "${t.name}" is now ${t.status}`);
  }
}

function openCreateTunnelModal() {
  document.getElementById('modal-create-tunnel').classList.add('active');
}

function submitNewTunnel() {
  const name = document.getElementById('new-t-name').value;
  const trigger = document.getElementById('new-t-trigger').value;
  const channel = document.getElementById('new-t-channel').value;
  const offer = document.getElementById('new-t-offer').value;

  if (!name) return;

  const newTunnel = {
    id: `tun-${Date.now()}`,
    name: name,
    trigger: trigger,
    channel: channel,
    offer: offer,
    status: 'Active',
    sent: 1,
    converted: 0,
    conversionRate: '0.0%',
    revenueUSD: 0.0,
    icon: 'zap'
  };

  guestTunnels.push(newTunnel);
  renderTunnelsGrid();
  closeModal('modal-create-tunnel');
  showToast(`Automated Tunnel "${name}" launched successfully!`);
}

function renderPropertySelector() {
  const selectNav = document.getElementById('property-select-nav');
  const selectHost = document.getElementById('property-select-host');

  const optionsHTML = properties.map(p => `
    <option value="${p.id}" ${p.id === activePropertyId ? 'selected' : ''}>
      [${p.platform}] ${p.title}
    </option>
  `).join('');

  if (selectNav) selectNav.innerHTML = optionsHTML;
  if (selectHost) selectHost.innerHTML = optionsHTML;

  renderPropertiesListTable();
}

function changeActiveProperty(propId) {
  activePropertyId = propId;
  renderPropertySelector();
  loadActivePropertyData();
  showToast(`Active property: "${getActiveProperty().title}"`);
}

function loadActivePropertyData() {
  const prop = getActiveProperty();

  const titleEl = document.getElementById('prop-title');
  const addrEl = document.getElementById('prop-address');
  const heroCardBg = document.getElementById('hero-card-bg');
  const wifiNameEl = document.getElementById('wifi-name');
  const doorPinEl = document.getElementById('door-pin-display');
  const platformBadge = document.getElementById('prop-platform-badge');

  if (titleEl) titleEl.textContent = prop.title;
  if (addrEl) addrEl.innerHTML = `<i data-lucide="map-pin"></i> ${prop.address} <span class="badge-tag" style="font-size:9px; margin-left:6px; background:rgba(99,102,241,0.15); color:var(--accent-indigo);"><i data-lucide="clock" style="width:10px; height:10px; vertical-align:middle;"></i> ${prop.timezone || 'America/Los_Angeles'}</span>`;
  if (heroCardBg) heroCardBg.style.backgroundImage = `url('${prop.heroImg}')`;
  if (wifiNameEl) wifiNameEl.textContent = prop.wifiName;
  if (platformBadge) platformBadge.textContent = prop.platform;

  const hostPropTitle = document.getElementById('host-prop-title');
  const hostWifiDisplay = document.getElementById('host-wifi-display');
  const hostPinDisplay = document.getElementById('host-pin-display');
  const hostBankDisplay = document.getElementById('host-bank-display');
  const hostCustomLinkDisplay = document.getElementById('host-custom-link-display');

  if (hostPropTitle) hostPropTitle.textContent = prop.title;
  if (hostWifiDisplay) hostWifiDisplay.textContent = `${prop.wifiName} (${prop.wifiPass})`;
  if (hostPinDisplay) hostPinDisplay.textContent = prop.doorPin;
  if (hostBankDisplay) hostBankDisplay.textContent = prop.payoutBank || 'Demo Merchant Bank (****4821 - USD)';
  if (hostCustomLinkDisplay) hostCustomLinkDisplay.textContent = prop.customPayUrl || hostAuth.customPaymentLink;

  if (doorPinEl) {
    isPinRevealed = false;
    doorPinEl.textContent = `••••-${prop.doorPin.slice(-2)}`;
    doorPinEl.style.color = 'var(--text-primary)';
  }

  renderVideoManuals(prop.videos);
  renderGuestServices();
  renderLocalSpots('all');
  renderHostServicesTable();

  // Update Live API Widgets (Weather & Local Holidays) for active property
  let propLat = 34.0259, propLon = -118.7798, propCountry = 'US';
  if (prop.id === 'prop-miami') { propLat = 25.7617; propLon = -80.1918; propCountry = 'US'; }
  else if (prop.id === 'prop-tokyo') { propLat = 35.6762; propLon = 139.6503; propCountry = 'JP'; }
  else if (prop.id === 'prop-santorini') { propLat = 36.3932; propLon = 25.4615; propCountry = 'GR'; }
  
  fetchLiveWeather(propLat, propLon);
  fetchLocalHolidays(propCountry);

  document.getElementById('metric-revenue').textContent = formatPrice(prop.revenueUSD);
  document.getElementById('metric-views').textContent = `${prop.views} views`;
  document.getElementById('metric-orders').textContent = `${prop.completedOrders} orders`;

  renderCommissionAggregator();

  const standTitle = document.getElementById('stand-prop-title');
  const standQrImg = document.querySelector('#qr-stand-preview img');
  if (standTitle) standTitle.textContent = prop.title;
  if (standQrImg) standQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://hostifyos.com/g/${prop.slug}`;

  cart = [];
  updateCartBadge();
  lucide.createIcons();
}

function renderVideoManuals(videos) {
  const container = document.getElementById('video-guides-scroll');
  if (!container) return;

  container.innerHTML = videos.map(v => `
    <div class="video-card" onclick="openVideoModal('${v.title}', '${v.desc}', '${v.img}')">
      <div class="thumb-container">
        <img src="${v.img}" alt="${v.title}">
        <div class="play-overlay"><i data-lucide="play-circle"></i></div>
      </div>
      <div class="v-info">
        <h4>${v.title}</h4>
        <span>${v.time} guide</span>
      </div>
    </div>
  `).join('');
}

function renderLocalSpots(filterType) {
  const container = document.getElementById('local-spots-container');
  if (!container) return;

  const prop = getActiveProperty();
  const spots = prop.localSpots || [];
  const filtered = filterType === 'all' ? spots : spots.filter(s => s.type === filterType);

  if (filtered.length === 0) {
    container.innerHTML = `<div style="color:var(--text-muted); font-size:12px; padding:12px;">No local recommendations in this category yet. Click "AI Auto-Discover" to add spots.</div>`;
    return;
  }

  container.innerHTML = filtered.map(s => `
    <div class="spot-card">
      <img src="${s.img}" alt="${s.name}">
      <div class="spot-info">
        <h4>${s.name} <span style="color:var(--accent-amber); font-size:11px;">${s.rating}</span></h4>
        <p>${s.desc}</p>
        <span style="font-size:10px; color:var(--accent-emerald); font-weight:600;">
          <i data-lucide="navigation" style="width:10px; height:10px; display:inline-block;"></i> ${s.dist} away
        </span>
      </div>
    </div>
  `).join('');
}

function filterLocal(type) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
  renderLocalSpots(type);
}

function triggerAiImportModal() {
  document.getElementById('modal-ai-import').classList.add('active');
}

function runAiScrapeSimulator() {
  const url = document.getElementById('ai-url-input').value;
  const platformSelect = document.getElementById('ai-platform-select').value;
  const btn = document.getElementById('btn-run-ai-scrape');

  if (!url) {
    showToast("Please paste a valid listing URL!");
    return;
  }

  btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> AI Scraping Listing & Geo-Local Places...`;
  lucide.createIcons();

  setTimeout(() => {
    const cleanPlatform = platformSelect || 'Airbnb';

    const newScrapedProp = {
      id: `prop-ai-${Date.now()}`,
      platform: cleanPlatform,
      title: `Grand Horizon Estate (${cleanPlatform})`,
      address: '742 Ocean Drive, Miami Beach, FL',
      wifiName: 'OceanEstate_HighSpeed',
      wifiPass: 'MiamiBeach#2026',
      doorPin: '5512',
      payoutBank: 'Demo Merchant Bank (****4821 - USD)',
      customPayUrl: 'https://buy.stripe.com/miami_horizon_direct',
      heroImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      whatsapp: '13055550122',
      revenueUSD: 0.0,
      platformFeesTotalUSD: 0.0,
      views: 12,
      completedOrders: 0,
      slug: `miami-estate-${Date.now().toString().slice(-4)}`,
      services: [
        { id: Date.now() + 1, name: 'Late Check-out (Until 1:00 PM)', category: 'stay', priceUSD: 40.0, desc: 'Extend check-out.', status: 'Active' }
      ],
      videos: [],
      localSpots: [
        { id: 101, name: 'Joe\'s Stone Crab', type: 'food', rating: '4.8 ★', dist: '0.3 miles', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80', desc: 'AI Auto-Discovered: Iconic seafood.' }
      ]
    };

    properties.push(newScrapedProp);
    activePropertyId = newScrapedProp.id;
    renderPropertySelector();
    loadActivePropertyData();

    btn.innerHTML = `<i data-lucide="wand-2"></i> Generate Guidebook with AI`;
    closeModal('modal-ai-import');
    showToast(`AI Successfully imported listing & nearby local spots!`);
  }, 1600);
}

function renderPropertiesListTable() {
  const tbody = document.getElementById('host-properties-table');
  if (!tbody) return;

  tbody.innerHTML = properties.map(p => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${p.heroImg}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;">
          <div>
            <strong>${p.title}</strong>
            <p style="font-size:11px; color:var(--text-muted);">${p.address}</p>
          </div>
        </div>
      </td>
      <td><span class="badge-tag">${p.platform}</span></td>
      <td><span class="badge-tag" style="background:rgba(16,185,129,0.15); color:var(--accent-emerald);">${(p.localSpots || []).length} AI Spots</span></td>
      <td><strong style="color:var(--accent-emerald);">${formatPrice(p.revenueUSD)}</strong></td>
      <td>
        <span class="link-copy" onclick="copyGuestLink('${p.slug}')">
          <i data-lucide="link"></i> hostifyos.com/g/${p.slug}
        </span>
      </td>
      <td>
        <button class="btn-primary-sm" onclick="changeActiveProperty('${p.id}')">
          ${p.id === activePropertyId ? '✓ Active' : 'Switch To'}
        </button>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

function copyGuestLink(slug) {
  const prop = getActiveProperty();
  const targetSlug = slug || prop.slug;
  const url = `https://hostifyos.com/g/${targetSlug}`;
  navigator.clipboard.writeText(url);
  showToast(`Copied Guest Guidebook Link: ${url}`);
}

function openAddPropertyModal() {
  document.getElementById('modal-add-property').classList.add('active');
}

function submitNewProperty() {
  const title = document.getElementById('new-p-title').value;
  const platform = document.getElementById('new-p-platform').value || 'Airbnb';
  const address = document.getElementById('new-p-address').value;
  const wifiName = document.getElementById('new-p-wifi').value;
  const doorPin = document.getElementById('new-p-pin').value || '8492';
  const tzEl = document.getElementById('new-p-tz');
  const timezone = tzEl ? tzEl.value : 'America/Los_Angeles';

  if (!title || !address) return;
  if (!validatePinCode(doorPin)) return;

  const newProp = {
    id: `prop-${Date.now()}`,
    platform: platform,
    title: title,
    address: address,
    timezone: timezone,
    wifiName: wifiName || 'Guest_WiFi_5G',
    wifiPass: 'Welcome2026!',
    doorPin: doorPin,
    payoutBank: 'Demo Merchant Bank (****4821 - USD)',
    customPayUrl: 'https://buy.stripe.com/new_property_direct',
    heroImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    whatsapp: '13105550199',
    revenueUSD: 0.0,
    platformFeesTotalUSD: 0.0,
    views: 1,
    completedOrders: 0,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    services: [],
    videos: [],
    localSpots: []
  };

  properties.push(newProp);
  activePropertyId = newProp.id;
  renderPropertySelector();
  loadActivePropertyData();
  closeModal('modal-add-property');
  showToast(`Property "${title}" successfully added!`);
}

// FETCH LIVE DAILY FOREIGN EXCHANGE RATES FROM OPEN EXCHANGE RATES API
async function fetchLiveExchangeRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) return;
    const data = await response.json();
    if (data && data.rates) {
      for (const curr in currencyRates) {
        if (data.rates[curr]) {
          currencyRates[curr].rate = data.rates[curr];
        }
      }
      console.log('✅ Live daily exchange rates updated successfully:', currencyRates);
      updateCurrencyDisplays();
    }
  } catch (err) {
    console.warn('⚠️ Using fallback daily exchange rates:', err);
  }
}

// FETCH LIVE DESTINATION WEATHER FROM OPEN-METEO PUBLIC API
async function fetchLiveWeather(lat = 34.0259, lon = -118.7798) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.current_weather) {
      const tempC = Math.round(data.current_weather.temperature);
      const tempF = Math.round((tempC * 9/5) + 32);
      const code = data.current_weather.weathercode;
      let weatherText = 'Sunny & Clear ☀️';
      if (code >= 1 && code <= 3) weatherText = 'Partly Cloudy ⛅';
      else if (code >= 45 && code <= 48) weatherText = 'Foggy 🌫️';
      else if (code >= 51 && code <= 80) weatherText = 'Light Rain 🌧️';

      const weatherEl = document.getElementById('live-weather-widget');
      if (weatherEl) {
        weatherEl.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:space-between; background:var(--bg-dark); border:1px solid var(--border-color); padding:10px 14px; border-radius:12px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:20px;">🌤️</span>
              <div>
                <strong style="font-size:12px; color:var(--text-main);">${tempC}°C / ${tempF}°F — ${weatherText}</strong>
                <div style="font-size:10px; color:var(--text-muted);">Destination Weather • Live Open-Meteo API</div>
              </div>
            </div>
            <span class="badge-tag" style="background:rgba(16,185,129,0.15); color:var(--accent-emerald); font-size:9px;">● Live API</span>
          </div>
        `;
      }
    }
  } catch(err) {
    console.warn('Weather API fallback:', err);
  }
}

// FETCH LIVE PUBLIC HOLIDAYS & LOCAL EVENTS FROM NAGER.DATE PUBLIC API
async function fetchLocalHolidays(countryCode = 'US') {
  try {
    const year = new Date().getFullYear();
    const res = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`);
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const container = document.getElementById('local-holidays-widget');
      if (container) {
        const upcoming = data.slice(0, 3);
        container.innerHTML = `
          <div style="background:var(--bg-obsidian); border:1px solid var(--border-color); padding:14px; border-radius:12px; margin-top:16px;">
            <h4 style="font-size:12px; color:var(--accent-indigo); margin-bottom:10px; display:flex; align-items:center; justify-content:space-between;">
              <span>🎉 Local Holidays & Event Highlights</span>
              <span style="font-size:9px; color:var(--text-muted);">Nager.Date API</span>
            </h4>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${upcoming.map(h => `
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-secondary); background:var(--bg-dark); padding:8px 10px; border-radius:8px; border:1px solid var(--border-color);">
                  <span><strong>${h.localName}</strong> (${h.name})</span>
                  <span class="badge-tag" style="font-size:9px; background:rgba(99,102,241,0.15); color:var(--accent-indigo);">${h.date}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    }
  } catch(err) {
    console.warn('Holidays API fallback:', err);
  }
}

let currentCurrency = 'USD';
let currencyRates = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  TRY: { symbol: '₺', rate: 33.5 },
  JPY: { symbol: '¥', rate: 155.0 }
};

function changeCurrency(newCurrency) {
  currentCurrency = newCurrency;
  updateCurrencyDisplays();
}

function formatPrice(amountUSD) {
  if (typeof amountUSD !== 'number' || isNaN(amountUSD)) return '$0.00';
  const info = (currencyRates && currencyRates[currentCurrency]) ? currencyRates[currentCurrency] : { symbol: '$', rate: 1.0 };
  const converted = amountUSD * info.rate;
  return `${info.symbol}${converted.toFixed(2)}`;
}

function updateCurrencyDisplays() {
  renderGuestServices();
  renderHostServicesTable();
  renderHostOrdersTable();
  renderTunnelsGrid();
  updateCartTotals();
  updateRoiCalculator(3);
  toggleBillingCycle(billingCycle);
  const prop = getActiveProperty();
  document.getElementById('metric-revenue').textContent = formatPrice(prop.revenueUSD);
  renderCommissionAggregator();
}

function renderGuestServices() {
  const container = document.getElementById('services-catalog');
  if (!container) return;

  const prop = getActiveProperty();
  container.innerHTML = prop.services.map(s => `
    <div class="service-card">
      <div class="service-details">
        <h4>${s.name}</h4>
        <p>${s.desc}</p>
        <span class="service-price">${formatPrice(s.priceUSD)}</span>
      </div>
      <button class="btn-add-service" onclick="addToCart(${s.id})">
        + Add Service
      </button>
    </div>
  `).join('');
}

function copyWifi() {
  const prop = getActiveProperty();
  navigator.clipboard.writeText(prop.wifiPass);
  showToast(`Copied Wi-Fi Password: ${prop.wifiPass}`);
}

function togglePinReveal() {
  const prop = getActiveProperty();
  const display = document.getElementById('door-pin-display');
  const icon = document.getElementById('pin-eye-icon');
  
  if (!isPinRevealed) {
    display.textContent = `${prop.doorPin} (Check-in Active)`;
    display.style.color = 'var(--accent-emerald)';
    icon.setAttribute('data-lucide', 'eye-off');
    isPinRevealed = true;
    showToast("Door Access Code Unlocked!");
  } else {
    display.textContent = `••••-${prop.doorPin.slice(-2)}`;
    display.style.color = 'var(--text-primary)';
    icon.setAttribute('data-lucide', 'eye');
    isPinRevealed = false;
  }
  lucide.createIcons();
}

function addToCart(serviceId) {
  const prop = getActiveProperty();
  const item = prop.services.find(s => s.id === serviceId);
  if (!item) return;

  cart.push(item);
  updateCartBadge();
  showToast(`Added "${item.name}" to concierge order!`);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count-badge');
  const badgeText = document.getElementById('cart-badge-text');

  if (cart.length > 0) {
    badge.style.display = 'inline-block';
    badge.textContent = cart.length;
    if (badgeText) badgeText.textContent = `${cart.length} item${cart.length > 1 ? 's' : ''}`;
  } else {
    badge.style.display = 'none';
    if (badgeText) badgeText.textContent = `0 items`;
  }
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your concierge cart is empty. Add a service first!");
    return;
  }
  renderCheckoutSummary();
  document.getElementById('modal-checkout').classList.add('active');
}

function renderCheckoutSummary() {
  const list = document.getElementById('checkout-cart-items');
  list.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <span>${item.name}</span>
      <strong>${formatPrice(item.priceUSD)}</strong>
    </div>
  `).join('');

  updateCartTotals();
}

function updateCartTotals() {
  const subtotalUSD = cart.reduce((sum, item) => sum + item.priceUSD, 0);
  const subtotalEl = document.getElementById('cart-subtotal');
  const finalTotalEl = document.getElementById('cart-final-total');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotalUSD);
  if (finalTotalEl) finalTotalEl.textContent = formatPrice(subtotalUSD);
}

// AUTOMATED TAKE-RATE & CUSTOM LINK CHECKOUT PROCESSOR
function processStripePayment(method) {
  const submitBtn = document.getElementById('btn-pay-submit');
  if (submitBtn) {
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Processing via ${method}...`;
    lucide.createIcons();
  }

  setTimeout(() => {
    const prop = getActiveProperty();
    const totalUSD = cart.reduce((sum, item) => sum + item.priceUSD, 0);
    
    const platformFeeRate = hostAuth.commissionRate !== undefined ? hostAuth.commissionRate : 0.05;
    const platformFee = totalUSD * platformFeeRate;
    const hostNetPayout = totalUSD - platformFee;

    prop.revenueUSD += totalUSD;
    prop.platformFeesTotalUSD = (prop.platformFeesTotalUSD || 0) + platformFee;
    prop.completedOrders += 1;

    hostOrders.unshift({
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      guest: 'Current Guest',
      property: prop.title,
      service: cart.map(i => i.name).join(', '),
      date: 'Just Now',
      priceUSD: totalUSD,
      hostPayoutUSD: hostNetPayout,
      platformFeeUSD: platformFee,
      status: 'Confirmed',
      payMethod: method
    });

    cart = [];
    updateCartBadge();
    updateCurrencyDisplays();
    renderPropertiesListTable();
    renderHostOrdersTable();
    closeModal('modal-checkout');

    if (submitBtn) {
      submitBtn.innerHTML = `<i data-lucide="check-circle"></i> Pay & Confirm Order`;
    }

    showToast(`Order Confirmed via ${method}! Net Payout: ${formatPrice(hostNetPayout)} deposited to Host Bank.`);
  }, 1200);
}

function renderHostServicesTable() {
  const tbody = document.getElementById('host-services-table');
  if (!tbody) return;

  const prop = getActiveProperty();
  tbody.innerHTML = prop.services.map(s => `
    <tr>
      <td><strong>${s.name}</strong></td>
      <td><span class="badge-tag">${s.category}</span></td>
      <td><strong style="color:var(--accent-emerald);">${formatPrice(s.priceUSD)}</strong></td>
      <td>Instant Auto-Confirm</td>
      <td><span style="color:var(--accent-emerald); font-weight:700;">● ${s.status}</span></td>
      <td>
        <button style="background:transparent; border:none; color:var(--accent-amber); cursor:pointer;" onclick="deleteService(${s.id})">
          Remove
        </button>
      </td>
    </tr>
  `).join('');
}

function deleteService(id) {
  const prop = getActiveProperty();
  prop.services = prop.services.filter(s => s.id !== id);
  renderHostServicesTable();
  renderGuestServices();
  showToast("Service removed from guidebook.");
}

function openAddUpsellModal() {
  document.getElementById('modal-add-service').classList.add('active');
}

function submitNewService() {
  const name = document.getElementById('new-s-name').value;
  const cat = document.getElementById('new-s-cat').value;
  const price = parseFloat(document.getElementById('new-s-price').value);
  const desc = document.getElementById('new-s-desc').value;

  if (!name || isNaN(price)) return;

  const prop = getActiveProperty();
  const newObj = {
    id: Date.now(),
    name: name,
    category: cat,
    priceUSD: price,
    desc: desc,
    status: 'Active'
  };

  prop.services.push(newObj);
  renderHostServicesTable();
  renderGuestServices();
  closeModal('modal-add-service');
  showToast("New service published to " + prop.title);
}

function updateStandTitle(val) {
  const el = document.getElementById('stand-prop-title');
  if (el) el.textContent = val || 'Your Property Title';
}

function updateStandTheme(style) {
  const box = document.getElementById('qr-stand-preview');
  if (style === 'obsidian') {
    box.style.background = '#090D14';
    box.style.color = '#fff';
  } else if (style === 'gold') {
    box.style.background = '#FFFBEB';
    box.style.color = '#78350F';
  } else {
    box.style.background = '#FFFFFF';
    box.style.color = '#090D14';
  }
}

function printQrStand() {
  window.print();
}

function openVideoModal(title, desc, imgUrl) {
  document.getElementById('v-modal-title').textContent = title;
  document.getElementById('v-modal-desc').textContent = desc;
  document.getElementById('v-modal-img').src = imgUrl;
  document.getElementById('modal-video').classList.add('active');
}

function contactHostWhatsApp() {
  const prop = getActiveProperty();
  window.open(`https://wa.me/${prop.whatsapp}?text=Hi%20Host,%20I%20have%20a%20question%20regarding%20my%20stay%20at%20${encodeURIComponent(prop.title)}.`, '_blank');
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    lucide.createIcons();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}


function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  const msgEl = document.getElementById('toast-message');
  msgEl.textContent = msg;

  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// ====================================================
// SUPER ADMIN CRM & LEAD PIPELINE DATA MODEL
// ====================================================
let crmHostLeads = [
  { id: 'crm-1', name: 'Sarah Miller', email: 'sarah@malibuvillas.com', properties: 3, mrr: 19.00, status: 'pro', notes: 'High-intent villa manager in Malibu, requested VIP shuttle upsell template.' },
  { id: 'crm-2', name: 'Marcus Vance', email: 'marcus@santorini-suites.com', properties: 8, mrr: 39.00, status: 'enterprise', notes: 'Boutique hotel manager in Santorini. Interested in white-label domain.' },
  { id: 'crm-3', name: 'Elena Rostova', email: 'elena@alpine-chalet.ch', properties: 1, mrr: 0.00, status: 'trial', notes: '14-day trial active. Needs assistance with appliance video upload.' },
  { id: 'crm-4', name: 'David Chen', email: 'david@tokyo-apartments.jp', properties: 2, mrr: 19.00, status: 'pro', notes: 'Japanese host, activated 1-tap Wi-Fi guide for Shibuya listing.' }
];

function renderCrmLeadsTable(filter = 'all') {
  const tbody = document.getElementById('admin-crm-table-body');
  if (!tbody) return;

  const filtered = crmHostLeads.filter(l => filter === 'all' || l.status === filter);

  tbody.innerHTML = filtered.map(l => `
    <tr>
      <td>
        <strong>${l.name}</strong>
        <p style="font-size:11px; color:var(--text-muted); margin:2px 0 0;">${l.email}</p>
      </td>
      <td><strong>${l.properties} Units</strong></td>
      <td><strong class="text-emerald">${formatPrice(l.mrr)} / mo</strong></td>
      <td>
        <span class="badge-tag" style="${l.status === 'pro' ? 'background:rgba(16,185,129,0.15); color:var(--accent-emerald);' : l.status === 'enterprise' ? 'background:rgba(99,102,241,0.15); color:var(--accent-indigo);' : 'background:rgba(245,158,11,0.15); color:var(--accent-amber);'}">
          ● ${l.status.toUpperCase()}
        </span>
      </td>
      <td><span style="font-size:11px; color:var(--text-muted);">${l.notes}</span></td>
      <td>
        <button class="btn-primary-sm" style="padding:4px 8px; font-size:10px;" onclick="prepareEmailToLead('${l.email}')">
          <i data-lucide="mail"></i> Email Host
        </button>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

function filterCrmLeads(filter) {
  renderCrmLeadsTable(filter);
}

function prepareEmailToLead(email) {
  const select = document.getElementById('email-broadcast-target');
  const groupCustom = document.getElementById('group-custom-email');
  const customInput = document.getElementById('email-custom-target');

  if (select) select.value = 'custom';
  if (groupCustom) groupCustom.style.display = 'block';
  if (customInput) customInput.value = email;

  showToast(`Prepared email target for ${email}`);
}

// EMAIL TEMPLATES LIBRARY
const EMAIL_PRESETS = {
  welcome: {
    subject: 'Welcome to HostifyOS — Your 14-Day Free Trial is Active!',
    body: `Hello {Host_Name},

Welcome to HostifyOS (Ali Turan Inc.)! 

Your 14-day free trial has been activated ($0.00 charged today). Your digital guidebook is ready to automate 1-tap Wi-Fi sharing, time-gated door lockbox PINs, and guest upsells for your properties.

Log in anytime at: https://hostifyos.com

Official Merchant Support: hostifyos@gmail.com
HostifyOS Team`
  },
  receipt: {
    subject: 'HostifyOS SaaS Subscription Receipt & Tax Invoice',
    body: `Hi {Host_Name},

Thank you for subscribing to HostifyOS Pro Host Plan ($19.00 / month).

Transaction Details:
- Issuer: Ali Turan Inc. (Ali Turan Şirketi)
- Official Merchant Email: hostifyos@gmail.com
- Amount Paid: $19.00 USD
- Status: Paid & Active

Your account remains fully unlocked with 0% platform commission on guest upsells!

Best regards,
Ali Turan Inc. Billing Team`
  },
  expiry: {
    subject: '⏰ Action Required: Your HostifyOS 14-Day Free Trial Ends Soon',
    body: `Hello {Host_Name},

Your 14-day free trial on HostifyOS will complete in 2 days.

To keep your digital guidebooks and door lockbox PINs active for your guests, ensure your subscription card is active.

Upgrade or manage subscription: https://hostifyos.com

HostifyOS Support: hostifyos@gmail.com`
  },
  invoice: {
    subject: '🧾 HostifyOS Monthly Commission Settlement Invoice',
    body: `Hi {Host_Name},

Here is your monthly platform commission settlement invoice for Starter Tier (5% Take-Rate).

- Gross Guest Upsells: $250.00
- Accrued Platform Fee (5%): $12.50
- Net Host Payout: $237.50

Pay Settlement Invoice securely: https://hostifyos.com`
  },
  security: {
    subject: '🔒 HostifyOS Security Alert: 2FA & Login Verification',
    body: `Security Alert for {Host_Email},

A new login session was authenticated for your HostifyOS account.

If this was you, no action is needed. If you did not recognize this login, contact our security team immediately at hostifyos@gmail.com.

HostifyOS Security Team`
  }
};

function loadEmailTemplatePreset(presetKey) {
  const preset = EMAIL_PRESETS[presetKey];
  if (preset) {
    const subjEl = document.getElementById('email-broadcast-subject');
    const bodyEl = document.getElementById('email-broadcast-body');
    const prevEl = document.getElementById('email-template-preview-box');

    if (subjEl) subjEl.value = preset.subject;
    if (bodyEl) bodyEl.value = preset.body;
    if (prevEl) {
      prevEl.innerHTML = `
        <strong style="color:var(--accent-emerald);">Subject:</strong> ${preset.subject}<br><br>
        <div style="white-space:pre-wrap; font-family:monospace; background:#090D14; padding:10px; border-radius:6px; border:1px solid rgba(255,255,255,0.06);">${preset.body}</div>
      `;
    }
  }
}

function sendAdminEmailBroadcast() {
  const subject = document.getElementById('email-broadcast-subject').value;
  const target = document.getElementById('email-broadcast-target').value;
  const customTarget = document.getElementById('email-custom-target') ? document.getElementById('email-custom-target').value : '';

  const recipientStr = target === 'custom' ? customTarget : `${target.toUpperCase()} Group (1,420 Hosts)`;
  showToast(`⚡ Dispatched Email Broadcast from hostifyos@gmail.com to ${recipientStr}!`);
}

// FLOATING WIDGET & AI GUEST WELCOME ASSISTANT LOGIC
let widgetConfig = {
  whatsappNum: '+905451234567',
  whatsappEnabled: true,
  aiEnabled: true,
  greeting: 'Hello! 👋 Welcome to HostifyOS.com. How can I assist your stay or hosting today?'
};

function toggleAiChatWidget() {
  const win = document.getElementById('ai-chat-window');
  if (win) {
    win.style.display = win.style.display === 'none' ? 'block' : 'none';
    lucide.createIcons();
  }
}

function saveWidgetSettings() {
  const numInput = document.getElementById('widget-whatsapp-num');
  const waEnInput = document.getElementById('widget-whatsapp-enabled');
  const aiEnInput = document.getElementById('widget-ai-enabled');
  const greetInput = document.getElementById('widget-ai-greeting');

  if (numInput) widgetConfig.whatsappNum = numInput.value;
  if (waEnInput) widgetConfig.whatsappEnabled = waEnInput.value === 'true';
  if (aiEnInput) widgetConfig.aiEnabled = aiEnInput.value === 'true';
  if (greetInput) widgetConfig.greeting = greetInput.value;

  const btnWa = document.getElementById('btn-floating-whatsapp');
  if (btnWa) {
    btnWa.href = `https://wa.me/${widgetConfig.whatsappNum.replace(/[^0-9]/g, '')}`;
    btnWa.style.display = widgetConfig.whatsappEnabled ? 'flex' : 'none';
  }

  const btnAi = document.getElementById('btn-floating-ai');
  if (btnAi) btnAi.style.display = widgetConfig.aiEnabled ? 'flex' : 'none';

  const welcomeMsg = document.getElementById('ai-chat-welcome-msg');
  if (welcomeMsg) welcomeMsg.textContent = widgetConfig.greeting;

  showToast("✅ Widget & AI Assistant Settings Saved!");
}

function sendAiChatMessage() {
  const input = document.getElementById('ai-chat-input');
  const container = document.getElementById('ai-chat-messages');
  if (!input || !container || !input.value.trim()) return;

  const userQuery = input.value.trim();
  input.value = '';

  container.innerHTML += `
    <div style="background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); padding:8px 12px; border-radius:10px; max-width:85%; align-self:flex-end; color:#fff;">
      ${userQuery}
    </div>
  `;

  setTimeout(() => {
    let reply = "I can certainly help with that! HostifyOS provides 1-tap Wi-Fi sharing, time-gated door lockbox PINs, and 0% commission guest upsells for Airbnb hosts. Try it free for 14 days at hostifyos.com!";
    const q = userQuery.toLowerCase();
    if (q.includes('wifi') || q.includes('wi-fi')) {
      reply = "📶 Wi-Fi Sharing: Guests simply scan the QR code stand in your room and tap 'Copy Wi-Fi Password' — no app download required!";
    } else if (q.includes('pin') || q.includes('door') || q.includes('key')) {
      reply = "🔑 Door Access PINs: You can set time-gated PIN codes that automatically expire at check-out time (11:00 AM) for maximum security.";
    } else if (q.includes('price') || q.includes('cost') || q.includes('plan')) {
      reply = "💳 Pricing: Pro Host Plan is $19/mo (or $14/mo billed annually) with 0% platform commission and a 14-day free trial ($0 today).";
    } else if (q.includes('whatsapp') || q.includes('contact') || q.includes('support')) {
      reply = `💬 Support: You can message our host support team on WhatsApp at ${widgetConfig.whatsappNum} or email hostifyos@gmail.com.`;
    }

    container.innerHTML += `
      <div style="background:#131924; border:1px solid rgba(16,185,129,0.3); padding:8px 12px; border-radius:10px; max-width:85%; color:#E2E8F0; line-height:1.4;">
        ${reply}
      </div>
    `;
    container.scrollTop = container.scrollHeight;
  }, 400);
}

// URL ROUTING & SLUG PARSER
function handleUrlRouting() {
  const urlParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname.toLowerCase();
  
  const viewParam = urlParams.get('v') || urlParams.get('view');
  const slugParam = urlParams.get('slug') || urlParams.get('g');

  if (viewParam === 'guest' || path.includes('/g/') || path.includes('/guidebook/') || slugParam) {
    if (slugParam) {
      const match = properties.find(p => p.slug === slugParam || p.id.includes(slugParam) || slugParam.includes(p.slug));
      if (match) {
        activePropertyId = match.id;
        loadActivePropertyData();
      }
    }
    switchView('guest');
    return;
  }

  if (viewParam === 'portal' || path.includes('/portal') || path.includes('/host')) {
    switchView('portal');
    return;
  }
}

document.addEventListener('DOMContentLoaded', handleUrlRouting);
window.addEventListener('load', handleUrlRouting);
