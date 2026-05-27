// ============================================
// VUNASHORTS — Internationalization (i18n) Service
// ============================================

const translations = {
  en: {
    // Nav
    home: 'Home', discover: 'Discover', fund: 'Fund', profile: 'Profile',
    // Splash
    tagline: "Africa's Stories. One Minute at a Time.",
    getStarted: 'Get Started',
    // Auth
    welcomeBack: 'Welcome Back', signInToContinue: 'Sign in to continue',
    email: 'Email', password: 'Password', signIn: 'Sign In',
    orContinueWith: 'OR', continueWithGoogle: 'Continue with Google',
    noAccount: "Don't have an account?", signUp: 'Sign Up',
    // Home Feed
    forYou: 'For You', trending: 'Trending', following: 'Following',
    save: 'Save', tip: 'Tip', follow: 'Follow',
    episodes: 'episodes', episode: 'Episode',
    // Discover
    discoverTitle: 'Discover', trendingNow: 'Trending Now', regions: 'Regions',
    searchPlaceholder: 'Search creators, series, or genres...',
    // Inbox
    inbox: 'Inbox', messages: 'Messages', activity: 'Activity',
    messagePlaceholder: 'Message...',
    // Premium / Subscription
    choosePlan: 'Choose Your Plan',
    planSubtitle: 'One subscription, unlimited African stories.',
    free: 'Free', pro: 'Pro', premium: 'Premium',
    perMonth: '/mo', perYear: '/yr', monthly: 'Monthly', yearly: 'Yearly',
    currentPlan: 'Current Plan', upgrade: 'Upgrade', subscribe: 'Subscribe',
    startTrial: 'Start 7-Day Free Trial',
    cancelAnytime: 'Cancel anytime. Auto-renews via M-PESA.',
    whyUpgrade: 'Why Upgrade?', feature: 'Feature',
    // Plan features
    freeFeature1: '3 free episodes per series', freeFeature2: 'Ad-supported viewing',
    freeFeature3: 'SD quality', freeFeature4: 'Basic recommendations',
    proFeature1: 'Unlimited episode unlocks', proFeature2: 'Ad-free experience',
    proFeature3: 'HD streaming', proFeature4: 'Offline downloads (5)',
    proFeature5: 'AI recommendations',
    premiumFeature1: 'Everything in Pro', premiumFeature2: 'Ultra-HD 4K streaming',
    premiumFeature3: 'Unlimited downloads', premiumFeature4: 'Early access to new series',
    premiumFeature5: 'Creator studio access', premiumFeature6: 'Priority support',
    // Episode Lock / Upgrade Gate
    contentLocked: 'Content Locked',
    upgradeRequired: 'This series requires a {tier} subscription.',
    upgradeNow: 'Upgrade Now', viewPlans: 'View All Plans',
    alreadySubscribed: 'Already subscribed? Restore purchase.',
    // Profile
    editProfile: 'Edit Profile', settings: 'Settings',
    watchHistory: 'Watch History', saved: 'Saved', downloads: 'Downloads',
    epsWatched: 'EPS WATCHED', hoursWatched: 'HOURS', seriesCompleted: 'COMPLETED',
    // General
    loading: 'Loading...', error: 'Error', retry: 'Retry', cancel: 'Cancel',
    success: 'Success', confirm: 'Confirm',
  },

  sw: {
    home: 'Nyumbani', discover: 'Gundua', fund: 'Fadhili', profile: 'Wasifu',
    tagline: 'Hadithi za Afrika. Dakika Moja kwa Wakati.',
    getStarted: 'Anza Sasa',
    welcomeBack: 'Karibu Tena', signInToContinue: 'Ingia kuendelea',
    email: 'Barua pepe', password: 'Neno la siri', signIn: 'Ingia',
    orContinueWith: 'AU', continueWithGoogle: 'Endelea na Google',
    noAccount: 'Huna akaunti?', signUp: 'Jisajili',
    forYou: 'Kwako', trending: 'Inayoongoza', following: 'Unawafuata',
    save: 'Hifadhi', tip: 'Tuzo', follow: 'Fuata',
    episodes: 'vipindi', episode: 'Kipindi',
    discoverTitle: 'Gundua', trendingNow: 'Inayoongoza Sasa', regions: 'Maeneo',
    searchPlaceholder: 'Tafuta wabunifu, mfululizo, au aina...',
    inbox: 'Kikasha', messages: 'Ujumbe', activity: 'Shughuli',
    messagePlaceholder: 'Ujumbe...',
    choosePlan: 'Chagua Mpango Wako',
    planSubtitle: 'Usajili mmoja, hadithi zisizo na kikomo za Afrika.',
    free: 'Bure', pro: 'Pro', premium: 'Premium',
    perMonth: '/mwezi', perYear: '/mwaka', monthly: 'Kila Mwezi', yearly: 'Kila Mwaka',
    currentPlan: 'Mpango wa Sasa', upgrade: 'Boresha', subscribe: 'Jiandikishe',
    startTrial: 'Anza Majaribio ya Siku 7',
    cancelAnytime: 'Ghairi wakati wowote.',
    whyUpgrade: 'Kwa Nini Uboreshe?', feature: 'Kipengele',
    freeFeature1: 'Vipindi 3 vya bure kwa kila mfululizo', freeFeature2: 'Kutazama na matangazo',
    freeFeature3: 'Ubora wa SD', freeFeature4: 'Mapendekezo ya msingi',
    proFeature1: 'Vipindi visivyo na kikomo', proFeature2: 'Bila matangazo',
    proFeature3: 'Utiririshaji wa HD', proFeature4: 'Pakua nje ya mtandao (5)',
    proFeature5: 'Mapendekezo ya AI',
    premiumFeature1: 'Kila kitu katika Pro', premiumFeature2: 'Utiririshaji wa 4K',
    premiumFeature3: 'Pakua zisizo na kikomo', premiumFeature4: 'Upatikanaji wa mapema',
    premiumFeature5: 'Studio ya muundaji', premiumFeature6: 'Msaada wa kipaumbele',
    contentLocked: 'Maudhui Yamefungwa',
    upgradeRequired: 'Mfululizo huu unahitaji usajili wa {tier}.',
    upgradeNow: 'Boresha Sasa', viewPlans: 'Angalia Mipango Yote',
    alreadySubscribed: 'Tayari umejisajili? Rejesha ununuzi.',
    editProfile: 'Hariri Wasifu', settings: 'Mipangilio',
    watchHistory: 'Historia', saved: 'Zilizohifadhiwa', downloads: 'Pakua',
    epsWatched: 'VIPINDI', hoursWatched: 'MASAA', seriesCompleted: 'ZILIZOKAMILIKA',
    loading: 'Inapakia...', error: 'Kosa', retry: 'Jaribu tena', cancel: 'Ghairi',
    success: 'Imefanikiwa', confirm: 'Thibitisha',
  },

  ha: {
    home: 'Gida', discover: 'Bincike', fund: 'Tallafi', profile: 'Bayani',
    tagline: 'Labaran Afrika. Minti Ɗaya a Lokaci.',
    getStarted: 'Fara Yanzu',
    welcomeBack: 'Barka da Dawowa', signInToContinue: 'Shiga don ci gaba',
    email: 'Imel', password: 'Kalmar sirri', signIn: 'Shiga',
    orContinueWith: 'KO', continueWithGoogle: 'Ci gaba da Google',
    noAccount: 'Ba ka da asusu?', signUp: 'Yi Rajista',
    forYou: 'Maka', trending: 'Abin da ke Tashe', following: 'Masu bin ka',
    save: 'Ajiye', tip: 'Kyauta', follow: 'Bi',
    episodes: 'sashe', episode: 'Sashe',
    discoverTitle: 'Bincike', trendingNow: 'Abin da ke Tashe Yanzu', regions: 'Yankuna',
    searchPlaceholder: 'Nemo masu ƙirƙira, jerin, ko nau\'i...',
    inbox: 'Akwatin', messages: 'Saƙonni', activity: 'Ayyuka',
    messagePlaceholder: 'Saƙo...',
    choosePlan: 'Zaɓi Shirinku', planSubtitle: 'Biyan kuɗi ɗaya, labaran Afrika marasa iyaka.',
    free: 'Kyauta', pro: 'Pro', premium: 'Premium',
    perMonth: '/wata', perYear: '/shekara', monthly: 'Kowane Wata', yearly: 'Kowace Shekara',
    currentPlan: 'Shirin Yanzu', upgrade: 'Inganta', subscribe: 'Yi rajista',
    startTrial: 'Fara Gwaji na Kwanaki 7',
    cancelAnytime: 'Soke a kowane lokaci.',
    whyUpgrade: 'Me ya sa za a inganta?', feature: 'Fasali',
    contentLocked: 'An Kulle Abun ciki',
    upgradeRequired: 'Wannan jerin yana buƙatar biyan kuɗi na {tier}.',
    upgradeNow: 'Inganta Yanzu', viewPlans: 'Duba Duk Shirye-shirye',
    loading: 'Ana ɗaukaka...', error: 'Kuskure', retry: 'Sake gwadawa', cancel: 'Soke',
    success: 'An yi nasara', confirm: 'Tabbatar',
  },

  fr: {
    home: 'Accueil', discover: 'Explorer', fund: 'Financer', profile: 'Profil',
    tagline: "Les Histoires d'Afrique. Une Minute à la Fois.",
    getStarted: 'Commencer',
    welcomeBack: 'Bon Retour', signInToContinue: 'Connectez-vous pour continuer',
    email: 'Email', password: 'Mot de passe', signIn: 'Se Connecter',
    orContinueWith: 'OU', continueWithGoogle: 'Continuer avec Google',
    noAccount: "Pas de compte ?", signUp: "S'inscrire",
    forYou: 'Pour Vous', trending: 'Tendances', following: 'Abonnements',
    save: 'Sauver', tip: 'Pourboire', follow: 'Suivre',
    episodes: 'épisodes', episode: 'Épisode',
    discoverTitle: 'Explorer', trendingNow: 'Tendances', regions: 'Régions',
    searchPlaceholder: 'Rechercher créateurs, séries ou genres...',
    inbox: 'Boîte', messages: 'Messages', activity: 'Activité',
    messagePlaceholder: 'Message...',
    choosePlan: 'Choisissez Votre Plan',
    planSubtitle: 'Un abonnement, des histoires africaines illimitées.',
    free: 'Gratuit', pro: 'Pro', premium: 'Premium',
    perMonth: '/mois', perYear: '/an', monthly: 'Mensuel', yearly: 'Annuel',
    currentPlan: 'Plan Actuel', upgrade: 'Améliorer', subscribe: "S'abonner",
    startTrial: 'Essai Gratuit de 7 Jours',
    cancelAnytime: 'Annulez à tout moment.',
    whyUpgrade: 'Pourquoi Améliorer ?', feature: 'Fonctionnalité',
    contentLocked: 'Contenu Verrouillé',
    upgradeRequired: 'Cette série nécessite un abonnement {tier}.',
    upgradeNow: 'Améliorer Maintenant', viewPlans: 'Voir Tous les Plans',
    loading: 'Chargement...', error: 'Erreur', retry: 'Réessayer', cancel: 'Annuler',
    success: 'Succès', confirm: 'Confirmer',
  },

  yo: {
    home: 'Ilé', discover: 'Ṣàwárí', fund: 'Ìrànwọ́', profile: 'Àkọsílẹ̀',
    tagline: 'Àwọn Ìtàn Áfríkà. Ìṣẹ́jú Kan ní Àkókò Kan.',
    getStarted: 'Bẹ̀rẹ̀',
    welcomeBack: 'Ẹ Kú Àbọ̀', signInToContinue: 'Wọlé láti tẹ̀síwájú',
    email: 'Ímeèlì', password: 'Ọ̀rọ̀ aṣínà', signIn: 'Wọlé',
    forYou: 'Fún Ẹ', trending: 'Àwọn Olókìkí', following: 'Ẹni tí o Tẹ̀lé',
    choosePlan: 'Yan Ètò Rẹ', free: 'Ọ̀fẹ́', pro: 'Pro', premium: 'Premium',
    contentLocked: 'Àkóónú Ti Wà ní Títì',
    loading: 'Ń ṣàkíyèsí...', error: 'Àṣìṣe', retry: 'Gbìyànjú lẹ́ẹ̀kan sí i',
  },

  ig: {
    home: 'Ụlọ', discover: 'Chọpụta', fund: 'Ego', profile: 'Profaịlụ',
    tagline: 'Akụkọ Afrịka. Otu Nkeji N\'otu Oge.',
    getStarted: 'Bido',
    welcomeBack: 'Nnọọ Azụ', signInToContinue: 'Banye iji gaa n\'ihu',
    email: 'Email', password: 'Okwuntughe', signIn: 'Banye',
    forYou: 'Maka Gị', trending: 'Na-ewu ewu', following: 'Ndị ị na-eso',
    choosePlan: 'Họrọ Atụmatụ Gị', free: 'N\'efu', pro: 'Pro', premium: 'Premium',
    contentLocked: 'Ọdịnaya Akpọchiri',
    loading: 'Na-ebu...', error: 'Njehie', retry: 'Nwaa ọzọ',
  },

  ar: {
    home: 'الرئيسية', discover: 'اكتشف', fund: 'تمويل', profile: 'الملف',
    tagline: 'قصص أفريقيا. دقيقة واحدة في كل مرة.',
    getStarted: 'ابدأ الآن',
    welcomeBack: 'مرحباً بعودتك', signInToContinue: 'سجل الدخول للمتابعة',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', signIn: 'تسجيل الدخول',
    forYou: 'لك', trending: 'الرائج', following: 'المتابعون',
    choosePlan: 'اختر خطتك', free: 'مجاني', pro: 'برو', premium: 'بريميوم',
    contentLocked: 'المحتوى مقفل',
    loading: 'جار التحميل...', error: 'خطأ', retry: 'أعد المحاولة',
  },

  pt: {
    home: 'Início', discover: 'Explorar', fund: 'Financiar', profile: 'Perfil',
    tagline: 'Histórias de África. Um Minuto de Cada Vez.',
    getStarted: 'Começar',
    welcomeBack: 'Bem-vindo de Volta', signInToContinue: 'Entre para continuar',
    email: 'Email', password: 'Senha', signIn: 'Entrar',
    forYou: 'Para Você', trending: 'Em Alta', following: 'Seguindo',
    choosePlan: 'Escolha Seu Plano', free: 'Grátis', pro: 'Pro', premium: 'Premium',
    contentLocked: 'Conteúdo Bloqueado',
    loading: 'Carregando...', error: 'Erro', retry: 'Tentar novamente',
  },

  sh: {
    home: 'Home', discover: 'Tafuta', fund: 'Fund', profile: 'Profile',
    tagline: 'Story za Africa. Minute Moja kwa Time.',
    getStarted: 'Anza',
    welcomeBack: 'Ukirudi', signInToContinue: 'Sign in uendelee',
    email: 'Email', password: 'Password', signIn: 'Ingia',
    forYou: 'Yako', trending: 'Trending', following: 'Wako',
    choosePlan: 'Chagua Plan', free: 'Free', pro: 'Pro', premium: 'Premium',
    contentLocked: 'Content Imefungwa',
    loading: 'Inapakia...', error: 'Error', retry: 'Jaribu tena',
  },
};

let currentLang = localStorage.getItem('vunashorts_language') || 'en';
const listeners = new Set();

export const i18n = {
  t(key, params = {}) {
    const dict = translations[currentLang] || translations.en;
    let str = dict[key] || translations.en[key] || key;
    // Replace {param} placeholders
    Object.entries(params).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, v);
    });
    return str;
  },

  getLang() {
    return currentLang;
  },

  setLang(code) {
    currentLang = code;
    localStorage.setItem('vunashorts_language', code);
    listeners.forEach(fn => fn(code));
  },

  onLangChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  getSupportedLangs() {
    return Object.keys(translations);
  },
};
