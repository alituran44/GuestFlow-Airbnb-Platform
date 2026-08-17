/* ==========================================================================
   HostifyOS - Global Digital Guest Guidebook & Ancillary Revenue Engine
   Role-Based Authentication Session Engine & Multi-User Isolation
   ========================================================================= */

// Global State
let currentCurrency = 'USD';
const currencyRates = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  CAD: { symbol: 'CA$', rate: 1.35 },
  AUD: { symbol: 'A$', rate: 1.52 },
  JPY: { symbol: '¥', rate: 155.0 },
  TRY: { symbol: '₺', rate: 33.0 }
};

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
    heroTitle: "Turn Every Guest Stay Into +$400+/mo Extra Income Per Property",
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
    ctaTitle: "Ready to Automate Your STR Operations & Boost Revenue?",
    ctaSub: "Join over 3,400+ hosts scaling their guest experience today.",
    btnCtaTrial: "Start Your 14-Day Free Trial ($0 Today)",
    startTrial: "Start 14-Day Free Trial",
    navHome: "Home",
    navGuest: "Guest View (PWA)",
    navHost: "Host Portal",
    navAdmin: "Super Admin",
    toastLang: "Language updated to English (USD)"
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
    ctaTitle: "Mülkünüzü Otomatikleştirmeye ve Ek Gelir Elde Etmeye Hazır Mısınız?",
    ctaSub: "Bugün misafir deneyimini üst seviyeye çıkaran 3.400'den fazla ev sahibine katılın.",
    btnCtaTrial: "14 Günlük Ücretsiz Denemeyi Başlat ($0 Bugün)",
    startTrial: "14 Günlük Ücretsiz Denemeyi Başlat",
    navHome: "Ana Sayfa",
    navGuest: "Misafir Görünümü (PWA)",
    navHost: "Ev Sahibi Portalı",
    navAdmin: "Süper Admin",
    toastLang: "Dil Türkçe olarak güncellendi (TRY)"
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
    ctaTitle: "¿Listo para automatizar tus alquileres y aumentar tus ingresos?",
    ctaSub: "Únete a más de 3,400+ anfitriones que escalan su experiencia hoy.",
    btnCtaTrial: "Comenzar prueba gratis de 14 días (0€ Hoy)",
    startTrial: "Comenzar prueba gratis de 14 días",
    navHome: "Inicio",
    navGuest: "Vista Huésped (PWA)",
    navHost: "Portal Anfitrión",
    navAdmin: "Super Admin",
    toastLang: "Idioma actualizado a Español (EUR)"
  }
};



function changeLanguage(langKey) {
  if (!i18nDict[langKey]) return;
  currentLanguage = langKey;
  
  const targetCurrency = languageCurrencyMap[langKey] || 'USD';
  changeCurrency(targetCurrency);
  
  const currSelect = document.getElementById('currency-select');
  if (currSelect) currSelect.value = targetCurrency;

  const t = i18nDict[langKey];
  
  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      // Preserve internal icons if present
      const icon = el.querySelector('i');
      if (icon) {
        el.innerHTML = `${icon.outerHTML} ${t[key]}`;
      } else {
        el.innerText = t[key];
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

  showToast(t.toastLang);
  lucide.createIcons();
}


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
  email: 'admin@hostifyos.com',
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
    plan: 'Pro Host Plan',
    status: 'trial_active',
    trialDays: 14,
    commissionRate: '0.0%',
    upsellsTotalUSD: 1480.0
  },
  {
    id: 'host-2',
    name: 'Marcus Vance',
    email: 'marcus@vancehospitality.com',
    propertiesCount: 1,
    plan: 'Starter Host',
    status: 'trial_active',
    trialDays: 11,
    commissionRate: '5.0%',
    upsellsTotalUSD: 420.0
  },
  {
    id: 'host-3',
    name: 'Elena Rostova',
    email: 'elena@santorini-suites.gr',
    propertiesCount: 18,
    plan: 'Enterprise & Hotel',
    status: 'subscribed',
    trialDays: 0,
    commissionRate: '0.0%',
    upsellsTotalUSD: 9450.0
  },
  {
    id: 'host-4',
    name: 'David Chen',
    email: 'david@bayareastays.com',
    propertiesCount: 2,
    plan: 'Starter Host',
    status: 'expired_locked',
    trialDays: 0,
    commissionRate: '5.0%',
    upsellsTotalUSD: 180.0
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
    date: 'Aug 18, 2026', 
    priceUSD: 75.0, 
    hostPayoutUSD: 71.25,
    platformFeeUSD: 3.75,
    status: 'Confirmed', 
    payMethod: 'Card Checkout' 
  },
  { 
    id: 'ORD-9822', 
    guest: 'Sophia Martinez', 
    property: 'Malibu Beachfront Villa & Suite', 
    service: 'Late Check-out (2:00 PM)', 
    date: 'Aug 19, 2026', 
    priceUSD: 45.0, 
    hostPayoutUSD: 42.75,
    platformFeeUSD: 2.25,
    status: 'Completed', 
    payMethod: 'Custom Host Link' 
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
    payoutBank: 'Chase Bank (****4821 - USD)',
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
  renderHostInvoicesTable();
  updateTrialStatusUI();

  updateRoiCalculator(3);
  updateTopNavAuthUI();
  
  // Fetch live real-time daily currency exchange rates from API
  fetchLiveExchangeRates();

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
          <span class="user-pill-badge"><i data-lucide="user-check"></i> ${hostAuth.name} (Host)</span>
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


// HANDLE USER LOGIN & AUTOMATIC PAGE ROUTING
function handleUserLogin(role) {
  if (role === 'admin') {
    const email = document.getElementById('input-admin-email').value;
    adminAuth.isLoggedIn = true;
    adminAuth.email = email || 'admin@hostifyos.com';
    currentUserRole = 'admin';

    updateTopNavAuthUI();
    checkAdminAuthStatus();
    switchView('admin'); // AUTO-OPEN SUPER ADMIN CONSOLE
    showToast("Logged in as Super Admin! Master Admin Console Opened.");
  } else {
    const email = document.getElementById('input-host-email').value;
    hostAuth.isLoggedIn = true;
    hostAuth.email = email || 'sarah@malibuvillas.com';
    hostAuth.subscriptionStatus = 'trial_active';
    currentUserRole = 'host';

    updateTopNavAuthUI();
    checkHostAuthStatus();
    switchView('host'); // AUTO-OPEN HOST OPERATING PORTAL
    showToast(`Welcome back, ${hostAuth.name}! Host Dashboard Opened.`);
  }
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
        <p style="font-size:11px; color:var(--text-muted);">${h.email}</p>
      </td>
      <td><strong>${h.propertiesCount} Units</strong></td>
      <td><span class="badge-tag">${h.plan}</span></td>
      <td>
        <span class="badge-tag" style="${h.status === 'subscribed' ? 'background:rgba(16,185,129,0.15); color:var(--accent-emerald);' : h.status === 'trial_active' ? 'background:rgba(99,102,241,0.15); color:var(--accent-indigo);' : 'background:rgba(239,68,68,0.15); color:#EF4444;'}">
          ● ${h.status.replace('_', ' ').toUpperCase()}
        </span>
      </td>
      <td><strong>${h.commissionRate}</strong></td>
      <td><strong class="text-emerald">${formatPrice(h.upsellsTotalUSD)}</strong></td>
      <td>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn-primary-sm" style="padding:4px 8px; font-size:10px;" onclick="openLemonSqueezyCheckout('${h.plan === 'Pro Host Plan' ? 'Enterprise Plan' : 'Pro Host Plan'}', '${h.plan === 'Pro Host Plan' ? '$29.00 / mo' : '$14.00 / mo'}')">
            <i data-lucide="shopping-bag"></i> Buy Package
          </button>
          <button class="btn-secondary-sm" style="padding:4px 8px; font-size:10px;" onclick="adminActionLockHost('${h.id}')">
            ${h.status === 'expired_locked' ? 'Unlock' : 'Lock'}
          </button>
          <button class="btn-secondary-sm" style="padding:4px 8px; font-size:10px;" onclick="adminActionUpgradeHost('${h.id}')">
            Set Pro
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
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

function changeGlobalCommissionRate(newRate) {
  const ratePct = (parseFloat(newRate) * 100).toFixed(1);
  hostAuth.commissionRate = parseFloat(newRate);
  renderCommissionAggregator();
  showToast(`Global Default Platform Commission updated to ${ratePct}%!`);
}

function triggerGlobalFeeSweep() {
  showToast("Master Sweep Triggered: $4,820.00 in platform fees swept across all 1,420 host accounts!");
}

function downloadAdminMasterReport() {
  showToast("Exporting Master Platform Report (CSV) containing all host accounts & SaaS billing histories...");
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
}

function triggerInstantFeeSweep() {
  const summary = calculateCommissionSummary();
  showToast(`Auto-Swept ${formatPrice(summary.totalPlatformFees)} in platform commissions directly to HostifyOS Master Account!`);

}

function downloadCommissionStatement() {
  showToast("Downloading Monthly Commission Statement (PDF / CSV) for Host Accounting...");
}

// HOST SUBSCRIPTION CHECKOUT MODAL
function openLemonSqueezyCheckout(tierName, priceStr) {
  document.getElementById('lemon-plan-name').textContent = tierName;
  document.getElementById('lemon-plan-price').textContent = priceStr;
  document.getElementById('modal-lemon-checkout').classList.add('active');
}

let hostInvoices = [
  {
    id: 'INV-2026-8801',
    date: 'Aug 17, 2026',
    issuer: 'Ali Turan Inc.',
    plan: 'Pro Host (Annual Plan - $14/mo rate)',
    amountStr: '$168.00 / yr',
    status: 'Paid & Emailed',
    card: 'Visa (•••• 4242)',
    email: 'sarah@malibuvillas.com'
  },
  {
    id: 'INV-2026-7209',
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
  showToast(`📄 Downloading official Tax Invoice #${invId} issued by Ali Turan Inc. (PDF format)...`);
}

function resendInvoiceEmail(invId, email) {
  showToast(`📧 Invoice & Payment Receipt #${invId} resent to ${email}!`);
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

    const newInvId = `INV-2026-${Math.floor(8000 + Math.random() * 1000)}`;
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


// HOST CUSTOM PAYMENT LINK & AUTO TAKE-RATE MANAGEMENT
function openEditCustomPayLinkModal() {
  const prop = getActiveProperty();
  document.getElementById('custom-pay-url-input').value = prop.customPayUrl || hostAuth.customPaymentLink;
  document.getElementById('modal-edit-pay-link').classList.add('active');
}

function submitCustomPayLink() {
  const url = document.getElementById('custom-pay-url-input').value;
  if (!url) return;

  const prop = getActiveProperty();
  prop.customPayUrl = url;
  hostAuth.customPaymentLink = url;

  document.getElementById('host-custom-link-display').textContent = url;
  closeModal('modal-edit-pay-link');
  showToast("Updated Host Custom Payment Link! Guests can now pay via your link.");
}

function updateTrialStatusUI() {
  const statusBanner = document.getElementById('trial-status-banner');
  const daysBadge = document.getElementById('trial-days-badge');
  const cardText = document.getElementById('trial-card-text');

  if (!statusBanner) return;

  if (hostAuth.subscriptionStatus === 'trial_active') {
    statusBanner.className = 'trial-status-bar active-trial';
    daysBadge.textContent = `${hostAuth.trialDaysLeft} Days Remaining`;
    cardText.textContent = `Card on file: ${hostAuth.cardOnFile} - Auto-charge on ${hostAuth.autoChargeDate}.`;
  } else if (hostAuth.subscriptionStatus === 'cancelled') {
    statusBanner.className = 'trial-status-bar cancelled-trial';
    daysBadge.textContent = 'Trial Cancelled';
    cardText.textContent = 'Your card will NOT be charged. Access ends when trial period expires.';
  } else if (hostAuth.subscriptionStatus === 'subscribed') {
    statusBanner.className = 'trial-status-bar subscribed-active';
    daysBadge.textContent = 'Pro Active (0% Commission)';
    cardText.textContent = `Active Subscription (${hostAuth.cardOnFile}). 0% Commission Tier.`;
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

// Host Orders Table Renderer with Take-Rate Calculation
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
        <strong style="color:var(--accent-emerald);">${formatPrice(o.priceUSD)}</strong>
        <p style="font-size:10px; color:var(--accent-amber);">Net Host: ${formatPrice(o.hostPayoutUSD)} | Platform Fee: ${formatPrice(o.platformFeeUSD)}</p>
      </td>
      <td>${o.date}</td>
      <td>
        <span class="badge-tag" style="${o.status === 'Completed' ? 'background:rgba(16,185,129,0.15); color:var(--accent-emerald);' : 'background:rgba(99,102,241,0.15); color:var(--accent-indigo);'}">
          ● ${o.status}
        </span>
      </td>
      <td>
        <button class="btn-primary-sm" onclick="toggleOrderStatus('${o.id}')">
          ${o.status === 'Completed' ? 'Re-open' : 'Mark Complete'}
        </button>
      </td>
    </tr>
  `).join('');

  renderCommissionAggregator();
  lucide.createIcons();
}

function toggleOrderStatus(orderId) {
  const ord = hostOrders.find(o => o.id === orderId);
  if (ord) {
    ord.status = ord.status === 'Completed' ? 'Confirmed' : 'Completed';
    renderHostOrdersTable();
    showToast(`Updated Order ${ord.id} to ${ord.status}`);
  }
}

// Quick Inline Edit Credentials
function openEditWifiModal() {
  const prop = getActiveProperty();
  document.getElementById('edit-wifi-ssid').value = prop.wifiName;
  document.getElementById('edit-wifi-pass').value = prop.wifiPass;
  document.getElementById('modal-edit-wifi').classList.add('active');
}

function submitEditWifi() {
  const name = document.getElementById('edit-wifi-ssid').value;
  const pass = document.getElementById('edit-wifi-pass').value;

  if (!name) return;

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
  if (!pin) return;

  const prop = getActiveProperty();
  prop.doorPin = pin;
  loadActivePropertyData();
  closeModal('modal-edit-pin');
  showToast("Updated door access PIN code for " + prop.title);
}

function openEditBankModal() {
  const prop = getActiveProperty();
  document.getElementById('edit-bank-name').value = prop.payoutBank || 'Chase Bank (****4821 - USD)';
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
  document.getElementById('btn-bill-annual').classList.toggle('active', type === 'annual');
  document.getElementById('btn-bill-monthly').classList.toggle('active', type === 'monthly');

  const proPriceEl = document.getElementById('price-pro-val');
  const entPriceEl = document.getElementById('price-ent-val');
  const proNoteEl = document.getElementById('price-pro-note');
  const entNoteEl = document.getElementById('price-ent-note');

  if (type === 'annual') {
    if (proPriceEl) proPriceEl.textContent = formatPrice(14.0);
    if (entPriceEl) entPriceEl.textContent = formatPrice(29.0);
    if (proNoteEl) proNoteEl.textContent = 'Billed annually at $168/yr (Save 20%)';
    if (entNoteEl) entNoteEl.textContent = 'Billed annually at $348/yr (Save 20%)';
  } else {
    if (proPriceEl) proPriceEl.textContent = formatPrice(18.0);
    if (entPriceEl) entPriceEl.textContent = formatPrice(36.0);
    if (proNoteEl) proNoteEl.textContent = 'Billed monthly at $18/mo';
    if (entNoteEl) entNoteEl.textContent = 'Billed monthly at $36/mo';
  }
}

function selectPricingTier(tierName) {
  if (tierName === 'Starter') {
    openLemonSqueezyCheckout('Starter Free Plan', '$0.00 / month');
    return;
  }

  let priceStr = '';
  if (billingCycle === 'annual') {
    priceStr = tierName === 'Enterprise' ? '$348.00 / year ($29/mo)' : '$168.00 / year ($14/mo)';
  } else {
    priceStr = tierName === 'Enterprise' ? '$36.00 / month' : '$18.00 / month';
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
  if (addrEl) addrEl.innerHTML = `<i data-lucide="map-pin"></i> ${prop.address}`;
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
  if (hostBankDisplay) hostBankDisplay.textContent = prop.payoutBank || 'Chase Bank (****4821 - USD)';
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
      payoutBank: 'Chase Bank (****4821 - USD)',
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
  const doorPin = document.getElementById('new-p-pin').value;

  if (!title || !address) return;

  const newProp = {
    id: `prop-${Date.now()}`,
    platform: platform,
    title: title,
    address: address,
    wifiName: wifiName || 'Guest_WiFi_5G',
    wifiPass: 'Welcome2026!',
    doorPin: doorPin || '1234',
    payoutBank: 'Chase Bank (****4821 - USD)',
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

function changeCurrency(newCurrency) {
  currentCurrency = newCurrency;
  updateCurrencyDisplays();
}


function formatPrice(amountUSD) {
  const info = currencyRates[currentCurrency] || currencyRates.USD;
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
