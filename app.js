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
    heroTitle: "The Modern Hosting OS for Airbnb & Vacation Rentals",
    heroSub: "Turn your property guidebook into a 24/7 digital concierge. Eliminate guest calls, automate Wi-Fi & door PINs, and generate +$420/mo in upsells.",
    startTrial: "Start 14-Day Free Trial",
    viewDemo: "View Live Demo",
    navHome: "Home",
    navGuest: "Guest View (PWA)",
    navHost: "Host Portal",
    navAdmin: "Super Admin",
    toastLang: "Language updated to English (USD)"
  },
  ES: {
    heroTitle: "El sistema operativo moderno para anfitriones de Airbnb",
    heroSub: "Convierte tu guía de alojamiento en un conserje digital 24/7. Elimina llamadas de huéspedes, automatiza Wi-Fi y genera +420€/mes.",
    startTrial: "Comenzar prueba gratis de 14 días",
    viewDemo: "Ver demostración en vivo",
    navHome: "Inicio",
    navGuest: "Vista Huésped (PWA)",
    navHost: "Portal Anfitrión",
    navAdmin: "Super Admin",
    toastLang: "Idioma actualizado a Español (EUR)"
  },
  FR: {
    heroTitle: "Le système d'exploitation moderne pour hôtes Airbnb",
    heroSub: "Transformez votre livret d'accueil en conciergerie numérique 24/7. Éliminez les appels, automatisez le Wi-Fi et générez +420€/mois.",
    startTrial: "Démarrer l'essai gratuit de 14 jours",
    viewDemo: "Voir la démo en direct",
    navHome: "Accueil",
    navGuest: "Vue Invité (PWA)",
    navHost: "Portail Hôte",
    navAdmin: "Super Admin",
    toastLang: "Langue mise à jour en Français (EUR)"
  },
  DE: {
    heroTitle: "Das moderne Betriebssystem für Airbnb-Gastgeber",
    heroSub: "Verwandeln Sie Ihren Gästeführer in einen digitalen Concierge 24/7. Automatisch WLAN & PIN-Codes bereitstellen und +420€/Monat verdienen.",
    startTrial: "14 Tage kostenlos testen",
    viewDemo: "Live-Demo ansehen",
    navHome: "Startseite",
    navGuest: "Gast-Ansicht (PWA)",
    navHost: "Gastgeber-Portal",
    navAdmin: "Super Admin",
    toastLang: "Sprache geändert zu Deutsch (EUR)"
  },
  IT: {
    heroTitle: "Il sistema operativo moderno per host di Airbnb",
    heroSub: "Trasforma la tua guida per gli ospiti in un concierge digitale 24/7. Elimina le chiamate, automatizza il Wi-Fi e guadagna +420€/mese.",
    startTrial: "Inizia la prova gratuita di 14 giorni",
    viewDemo: "Guarda la demo dal vivo",
    navHome: "Home",
    navGuest: "Vista Ospite (PWA)",
    navHost: "Portale Host",
    navAdmin: "Super Admin",
    toastLang: "Lingua aggiornata in Italiano (EUR)"
  },
  PT: {
    heroTitle: "O sistema operacional moderno para anfitriões da Airbnb",
    heroSub: "Transforme o seu guia em um concierge digital 24/7. Elimine chamadas, automatize o Wi-Fi e gere +420€/mês em vendas extras.",
    startTrial: "Iniciar teste gratuito de 14 dias",
    viewDemo: "Ver demonstração ao vivo",
    navHome: "Início",
    navGuest: "Vista Hóspede (PWA)",
    navHost: "Portal Anfitrião",
    navAdmin: "Super Admin",
    toastLang: "Idioma atualizado para Português (EUR)"
  },
  JA: {
    heroTitle: "AirbnbホストのためのモダンホスピタリティOS",
    heroSub: "デジタルガイドブックを24時間年中無休のコンシェルジュに。Wi-FiとドアPINを自動化し、月額+$420の追加収益を達成。",
    startTrial: "14日間無料トライアルを開始",
    viewDemo: "ライブデモを見る",
    navHome: "ホーム",
    navGuest: "ゲストビュー (PWA)",
    navHost: "ホストポータル",
    navAdmin: "スーパー管理者",
    toastLang: "言語を日本語に更新しました (JPY)"
  },
  TR: {
    heroTitle: "Airbnb ve Tatil Evleri İçin Modern Ev Sahibi İşletim Sistemi",
    heroSub: "Dijital rehberinizi 7/24 canlı bir konsiyerje dönüştürün. Gece aramalarını bitirin, Wi-Fi ve kapı PIN kodlarını otomatikleştirelim.",
    startTrial: "14 Günlük Ücretsiz Denemeyi Başlat",
    viewDemo: "Canlı Demoyu İncele",
    navHome: "Ana Sayfa",
    navGuest: "Misafir Görünümü (PWA)",
    navHost: "Ev Sahibi Portalı",
    navAdmin: "Süper Admin",
    toastLang: "Dil Türkçe olarak güncellendi (TRY)"
  }
};


function changeLanguage(langKey) {
  if (!i18nDict[langKey]) return;
  currentLanguage = langKey;
  
  // Auto-switch currency based on country/language
  const targetCurrency = languageCurrencyMap[langKey] || 'USD';
  changeCurrency(targetCurrency);
  
  // Sync currency dropdown value
  const currSelect = document.getElementById('currency-select');
  if (currSelect) currSelect.value = targetCurrency;

  const t = i18nDict[langKey];
  
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) heroTitle.innerText = t.heroTitle;
  
  const heroSub = document.querySelector('.hero-content p');
  if (heroSub) heroSub.innerText = t.heroSub;
  
  const btnStartTrial = document.querySelector('.btn-hero-primary span');
  if (btnStartTrial) btnStartTrial.innerText = t.startTrial;

  const btnViewDemo = document.querySelector('.btn-hero-secondary span');
  if (btnViewDemo) btnViewDemo.innerText = t.viewDemo;

  const navHomeSpan = document.querySelector('#btn-view-landing span');
  if (navHomeSpan) navHomeSpan.innerText = t.navHome;

  const navGuestSpan = document.querySelector('#btn-view-guest span');
  if (navGuestSpan) navGuestSpan.innerText = t.navGuest;

  const navHostSpan = document.querySelector('#btn-view-host span');
  if (navHostSpan) navHostSpan.innerText = t.navHost;

  const navAdminSpan = document.querySelector('#btn-view-admin span');
  if (navAdminSpan) navAdminSpan.innerText = t.navAdmin;

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
    c.style.display = 'none';
  });

  const targetContent = document.getElementById(`h-tab-${tabName}`);
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
    hostAuth.plan = 'Pro Host Plan (0% Platform Commission)';
    hostAuth.commissionRate = 0.0;
    currentUserRole = 'host';

    updateTopNavAuthUI();
    updateTrialStatusUI();
    renderCommissionAggregator();
    closeModal('modal-lemon-checkout');
    btn.innerHTML = `<i data-lucide="shield-check"></i> Complete 14-Day Free Registration`;
    
    switchView('host');
    showToast("Upgraded to Pro Host Plan! 0% Platform Commission active.");
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
