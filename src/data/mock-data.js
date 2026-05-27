// ============================================
// VUNASHORTS — Mock Data
// ============================================
import { Icons } from '../components/icons.js';

export const POSTERS = {
  siri: '/src/assets/poster_siri_ya_mitaa_1779551564849.png',
  campus: '/src/assets/poster_campus_kings_1779552046165.png',
  love: '/src/assets/poster_love_in_joburg_1779552327295.png',
  hustle: '/src/assets/poster_the_hustle_1779552765501.png',
  ancestors: '/src/assets/poster_ancestors_rising_1779552785473.png',
  blood: '/src/assets/poster_blood_ties_1779552852298.png',
};

export const GENRES = [
  { id: 'drama', name: 'Drama', icon: Icons.Film(), color: '#F85149' },
  { id: 'romance', name: 'Romance', icon: Icons.Heart(), color: '#BC8CFF' },
  { id: 'crime', name: 'Crime', icon: Icons.Search(), color: '#58A6FF' },
  { id: 'comedy', name: 'Comedy', icon: Icons.Sparkles(), color: '#F0883E' },
  { id: 'campus', name: 'Campus', icon: Icons.Bookmark(), color: '#3FB950' },
  { id: 'family', name: 'Family', icon: Icons.Users(), color: '#D4A853' },
  { id: 'mythology', name: 'Mythology', icon: Icons.Zap(), color: '#39D2C0' },
  { id: 'scifi', name: 'AI Sci-Fi', icon: Icons.Server(), color: '#58A6FF' },
  { id: 'hustle', name: 'Urban Hustle', icon: Icons.Coins(), color: '#3FB950' },
  { id: 'music', name: 'Music', icon: Icons.Play(), color: '#BC8CFF' },
  { id: 'spiritual', name: 'Spiritual', icon: Icons.HandHeart(), color: '#D4A853' },
  { id: 'street', name: 'Street Culture', icon: Icons.Fire(), color: '#F85149' },
];

export const CREATORS = [
  { id: 'c1', name: 'Amara Osei', handle: '@amaraosei', avatar: 'AO', country: 'GH', followers: '245K', verified: true, bio: 'Award-winning Ghanaian filmmaker' },
  { id: 'c2', name: 'Kwame Asante', handle: '@kwameasante', avatar: 'KA', country: 'NG', followers: '189K', verified: true, bio: 'Lagos storyteller | Creator of Campus Kings' },
  { id: 'c3', name: 'Zuri Ndlovu', handle: '@zurindlovu', avatar: 'ZN', country: 'ZA', followers: '312K', verified: true, bio: 'Joburg romance queen | 50M+ views' },
  { id: 'c4', name: 'Jabari Mwangi', handle: '@jabarimwangi', avatar: 'JM', country: 'KE', followers: '178K', verified: true, bio: 'Nairobi nights | Street stories' },
  { id: 'c5', name: 'Fatima Hassan', handle: '@fatimahassan', avatar: 'FH', country: 'TZ', followers: '156K', verified: false, bio: 'Dar es Salaam drama | Rising star' },
  { id: 'c6', name: 'Chidi Okonkwo', handle: '@chidiokonkwo', avatar: 'CO', country: 'NG', followers: '98K', verified: false, bio: 'Nollywood next-gen' },
];

export const SERIES = [
  {
    id: 's1', title: 'Siri Ya Mitaa', subtitle: 'Secrets of the Streets',
    poster: POSTERS.siri, creator: CREATORS[3], genre: 'drama',
    country: 'KE', language: 'Swahili', rating: 4.9, views: '12.5M',
    episodes: 18, freeEpisodes: 3, pricePerEpisode: 10, currency: 'KSh',
    requiredTier: 'free',
    description: 'In the dark alleys of Nairobi, secrets never stay buried. When a journalist uncovers a web of corruption, she must choose between the truth and her survival.',
    tags: ['trending', 'editors-pick'], completionRate: 94,
  },
  {
    id: 's2', title: 'Campus Kings', subtitle: 'Rule or Be Ruled',
    poster: POSTERS.campus, creator: CREATORS[1], genre: 'campus',
    country: 'NG', language: 'English', rating: 4.7, views: '8.3M',
    episodes: 24, freeEpisodes: 3, pricePerEpisode: 50, currency: '₦',
    requiredTier: 'free',
    description: 'Four friends navigate love, betrayal, and ambition at the University of Lagos. Who will rise, and who will fall?',
    tags: ['trending', 'new'], completionRate: 87,
  },
  {
    id: 's3', title: 'Love in Joburg', subtitle: 'Hearts on the Skyline',
    poster: POSTERS.love, creator: CREATORS[2], genre: 'romance',
    country: 'ZA', language: 'English', rating: 4.8, views: '15.1M',
    episodes: 20, freeEpisodes: 3, pricePerEpisode: 5, currency: 'R',
    requiredTier: 'free',
    description: 'A chance encounter on a Johannesburg rooftop changes two lives forever. But love in the city of gold comes with a price.',
    tags: ['editors-pick', 'most-watched'], completionRate: 96,
  },
  {
    id: 's4', title: 'The Hustle', subtitle: 'Every City Has Its Toll',
    poster: POSTERS.hustle, creator: CREATORS[0], genre: 'crime',
    country: 'GH', language: 'English', rating: 4.6, views: '6.7M',
    episodes: 16, freeEpisodes: 3, pricePerEpisode: 15, currency: 'GH₵',
    requiredTier: 'pro',
    description: 'A detective with a troubled past hunts a ghost in the rain-soaked streets of Accra. But the closer he gets, the more dangerous the truth becomes.',
    tags: ['new'], completionRate: 82,
  },
  {
    id: 's5', title: 'Ancestors Rising', subtitle: 'Her Heritage Is Her Power',
    poster: POSTERS.ancestors, creator: CREATORS[4], genre: 'mythology',
    country: 'TZ', language: 'Swahili', rating: 4.9, views: '9.8M',
    episodes: 14, freeEpisodes: 3, pricePerEpisode: 10, currency: 'KSh',
    requiredTier: 'pro',
    description: 'A young warrior queen discovers she carries the power of her ancestors. An epic tale of magic, duty, and the fight for her kingdom.',
    tags: ['trending', 'editors-pick'], completionRate: 91,
  },
  {
    id: 's6', title: 'Blood Ties', subtitle: 'Some Bonds Can\'t Be Broken',
    poster: POSTERS.blood, creator: CREATORS[5], genre: 'family',
    country: 'NG', language: 'Igbo', rating: 4.5, views: '4.2M',
    episodes: 12, freeEpisodes: 3, pricePerEpisode: 50, currency: '₦',
    requiredTier: 'pro',
    description: 'When a family patriarch falls ill, old secrets and rivalries threaten to tear the Okonkwo family apart. A gripping family saga.',
    tags: ['new'], completionRate: 78,
  },
  {
    id: 's7', title: 'Digital Tribe', subtitle: 'Code Is the New Currency',
    poster: null, creator: CREATORS[3], genre: 'scifi',
    country: 'KE', language: 'English', rating: 4.4, views: '3.1M',
    episodes: 10, freeEpisodes: 3, pricePerEpisode: 10, currency: 'KSh',
    requiredTier: 'premium',
    description: 'In a futuristic Nairobi, a young hacker discovers an AI conspiracy that threatens all of Africa. The digital revolution has begun.',
    tags: ['new'], completionRate: 72, gradientPoster: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
  },
  {
    id: 's8', title: 'Oga Boss', subtitle: 'Hustle Never Sleeps',
    poster: null, creator: CREATORS[1], genre: 'comedy',
    country: 'NG', language: 'Pidgin', rating: 4.3, views: '5.6M',
    episodes: 22, freeEpisodes: 3, pricePerEpisode: 50, currency: '₦',
    requiredTier: 'premium',
    description: 'A market trader with big dreams and bigger schemes tries to make it in Lagos. Comedy, chaos, and unforgettable characters.',
    tags: ['trending'], completionRate: 85, gradientPoster: 'linear-gradient(135deg, #ff6b35, #f7c59f, #1a535c)',
  },
];

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: Icons.Globe() },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: Icons.Globe() },
  { code: 'ha', name: 'Hausa', native: 'Hausa', flag: Icons.Globe() },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá', flag: Icons.Globe() },
  { code: 'ig', name: 'Igbo', native: 'Igbo', flag: Icons.Globe() },
  { code: 'fr', name: 'French', native: 'Français', flag: Icons.Globe() },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: Icons.Globe() },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: Icons.Globe() },
  { code: 'sh', name: 'Sheng', native: 'Sheng', flag: Icons.Globe() },
];

export const CURRENCIES = [
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: Icons.Globe() },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: Icons.Globe() },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: Icons.Globe() },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', flag: Icons.Globe() },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', flag: Icons.Globe() },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', flag: Icons.Globe() },
];

export const PAYMENT_METHODS = [
  { id: 'mpesa', name: 'M-PESA', icon: Icons.Zap(), color: '#4CAF50' },
  { id: 'flutterwave', name: 'Flutterwave', icon: Icons.Globe(), color: '#F5A623' },
  { id: 'paystack', name: 'Paystack', icon: Icons.CreditCard(), color: '#00C3F7' },
  { id: 'card', name: 'Card', icon: Icons.CreditCard(), color: '#8B949E' },
];

export const CROWDFUNDING_PROJECTS = [
  { id: 'cf1', title: 'Mama Africa: Season 2', creator: CREATORS[0], goal: 500000, raised: 387000, currency: 'KSh', backers: 1243, daysLeft: 12, poster: POSTERS.ancestors, description: 'Help us bring the epic continuation of Mama Africa to life.' },
  { id: 'cf2', title: 'Lagos After Dark', creator: CREATORS[1], goal: 2000000, raised: 1450000, currency: '₦', backers: 3567, daysLeft: 8, poster: POSTERS.hustle, description: 'A gritty crime series set in the heart of Lagos nightlife.' },
  { id: 'cf3', title: 'Township Tales', creator: CREATORS[2], goal: 75000, raised: 42000, currency: 'R', backers: 876, daysLeft: 21, poster: POSTERS.love, description: 'Stories from South Africa\'s vibrant townships.' },
];

export const BRAND_CAMPAIGNS = [
  { id: 'b1', brand: 'Safaricom', logo: Icons.Zap(), budget: 'KSh 2M', reach: '5M viewers', type: 'Product Placement', status: 'active', description: 'Integrate M-PESA usage naturally into drama storylines.' },
  { id: 'b2', brand: 'GTBank', logo: Icons.Server(), budget: '₦15M', reach: '8M viewers', type: 'Branded Series', status: 'open', description: 'Create a business ambition series sponsored by GTBank.' },
  { id: 'b3', brand: 'Tusker Lager', logo: Icons.Heart(), budget: 'KSh 1.5M', reach: '3M viewers', type: 'Sponsorship', status: 'active', description: 'Sponsor social viewing events and watch parties.' },
  { id: 'b4', brand: 'MTN', logo: Icons.Signal(), budget: 'GH₵500K', reach: '4M viewers', type: 'Interactive Campaign', status: 'open', description: 'Data bundle giveaways during live watch parties.' },
];

export const ANALYTICS_DATA = {
  totalViews: '47.2M',
  totalCreators: '12,845',
  totalRevenue: 'KSh 23.4M',
  activeUsers: '1.2M',
  avgWatchTime: '18 min',
  completionRate: '87%',
  monthlyGrowth: '+23%',
  topCountries: [
    { name: 'Kenya', flag: Icons.Globe(), users: '420K', percentage: 35 },
    { name: 'Nigeria', flag: Icons.Globe(), users: '350K', percentage: 29 },
    { name: 'South Africa', flag: Icons.Globe(), users: '180K', percentage: 15 },
    { name: 'Ghana', flag: Icons.Globe(), users: '120K', percentage: 10 },
    { name: 'Tanzania', flag: Icons.Globe(), users: '78K', percentage: 6.5 },
    { name: 'Uganda', flag: Icons.Globe(), users: '52K', percentage: 4.5 },
  ],
  revenueByMonth: [
    { month: 'Jan', value: 1200000 },
    { month: 'Feb', value: 1450000 },
    { month: 'Mar', value: 1800000 },
    { month: 'Apr', value: 2100000 },
    { month: 'May', value: 2650000 },
    { month: 'Jun', value: 3200000 },
    { month: 'Jul', value: 3800000 },
    { month: 'Aug', value: 4200000 },
    { month: 'Sep', value: 4800000 },
    { month: 'Oct', value: 5400000 },
    { month: 'Nov', value: 6100000 },
    { month: 'Dec', value: 7400000 },
  ],
  viewsByDay: [320, 410, 380, 520, 680, 740, 620, 550, 490, 710, 830, 900, 780, 650],
};

export const USER_PROFILE = {
  name: 'Brian Kimathi',
  handle: '@briankimathi',
  avatar: 'AO',
  country: 'KE',
  tier: 'free', // 'free' | 'pro' | 'premium'
  premium: false,
  watchHistory: ['s1', 's3', 's5'],
  saved: ['s2', 's4'],
  downloads: ['s1'],
  preferredLanguage: 'en',
  currency: 'KES',
};

export const PREMIUM_PLANS = [
  { id: 'free', name: 'Free', price: 0, features: ['3 free episodes per series', 'Ad-supported', 'SD quality', 'Basic recommendations'] },
  { id: 'basic', name: 'VunaShorts+', price: { KES: 299, NGN: 1500, ZAR: 49, GHS: 25 }, period: 'month', features: ['Unlimited episode unlocks', 'Ad-free experience', 'HD streaming', 'Offline downloads (5)', 'AI recommendations'], popular: true },
  { id: 'premium', name: 'VunaShorts Pro', price: { KES: 599, NGN: 3000, ZAR: 99, GHS: 50 }, period: 'month', features: ['Everything in VunaShorts+', 'Ultra-HD streaming', 'Unlimited downloads', 'Early access to new series', 'Creator studio access', 'AI story tools', 'Priority support'] },
];
