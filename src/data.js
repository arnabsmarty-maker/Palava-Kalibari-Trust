// ─────────────────────────────────────────────────────────────
// Grounding data for Palava Kalibari Trust (PKT)
// All values are exact per the Trust's records.
// ─────────────────────────────────────────────────────────────

export const TRUST = {
  name: 'Palava Kalibari Trust',
  short: 'PKT',
  registration: 'F – 8722 Under Maharashtra Govt. Trust Act 1950',
  address:
    '1204, Casa Urbano R, Downtown, Palava Phase 2',
  emails: ['info@palavakalibaritrust.in', 'contact@palavakalibaritrust.com'],
  contacts: [
    { name: 'Rajat', phone: '97691 45597' },
    { name: 'Debashish', phone: '98332 64167' },
    { name: 'Sinchita', phone: '99673 61693' },
  ],
  whoWeAre:
    'The absence of a Kali Bari in and around Palava brought together like-minded people with a shared dream and a unified vision: to build a Kali Bari for all. What started as an idea has now grown into a vibrant and growing family of 95+ members, united by our love for Maa Kali, our culture, traditions, and the spirit of community. We believe this dream belongs to everyone. We look forward to welcoming more individuals, families, and organizations to join us, contribute their ideas and support, and become part of this journey. Together, let us turn our shared vision into a reality — a Kali Bari for all, built by the community, for the community.',
}

export const ILISH_PLATTERS = [
  {
    id: 'ilish',
    name: 'Ilish Utsav Platter',
    member: 830,
    nonMember: 880,
    accent: 'from-maroon to-maroon-deep',
    items: [
      'Aam Panna (Welcome Drink)',
      'Steamed Basmati Rice',
      'Mach Bhaja (1pc)',
      'Machar Tel (with green chilies)',
      'Kochu sakh / pui sakh ilish macher matha dia',
      'Ilish Bharta',
      'Dal',
      'Jhuri Alu Bhaja',
      'Ilish Shorse (with mustard and coconut) (1pc)',
      'Aam or Tomato Kheur Chutney',
      'Papad',
      'Rosogolla (2 nos)',
    ],
  },
  {
    id: 'mutton',
    name: 'Mutton Lovers Platter',
    member: 830,
    nonMember: 880,
    accent: 'from-maroon-light to-maroon',
    items: [
      'Aam Panna (Welcome Drink)',
      'Steam Basmati Rice',
      'Alu Posto',
      'Shukto',
      'Dal',
      'Jhuri Alu Bhaja',
      "Mutton Kosha (Chef's Special)",
      'Aam or Tomato Kheur Chutney',
      'Papad',
      'Rosogolla (2 nos)',
    ],
  },
  {
    id: 'veg',
    name: 'Veg Special Platter',
    member: 630,
    nonMember: 680,
    accent: 'from-gold-deep to-maroon-soft',
    items: [
      'Aam Panna (Welcome Drink)',
      'Steam Basmati Rice',
      'Alu Bhate',
      'Shukto',
      'Dal',
      'Jhuri Alu Bhaja',
      'Dhokar Dalna',
      'Paneer Paturi / Bhapa',
      'Aam or Tomato Kheur Chutney',
      'Papad',
      'Rosogolla (2 nos)',
    ],
  },
]

export const ILISH_EVENT = {
  title: 'Ilish Utsav 2026',
  date: 'Sunday, 9th August 2026',
  time: '12:00 PM – 3:00 PM',
  venue: 'Serenity Hall, Phase 2, Palava',
  note: 'Kids under 7 are free of charge, but registration is mandatory.',
}

export const DURGA_EVENT = {
  title: 'Durga Puja 2026',
  dates: '16th – 21st October 2026',
  location: 'Inside Gate No. 2, Lodha Palava Phase 2',
}

export const NIRGHANTA = [
  {
    id: 'shashthi',
    day: '16th Oct',
    weekday: 'Friday',
    tithi: 'Shashthi',
    sacred: false,
    times: ['08:30–09:30 AM', '09:15 AM', '06:30–07:30 PM'],
    rituals: ['Shashthi Puja', 'Bodhon', 'Amantran & Adhibas', 'Pushpanjali'],
  },
  {
    id: 'saptami',
    day: '17th Oct',
    weekday: 'Saturday',
    tithi: 'Saptami',
    sacred: false,
    times: ['08:04 AM', '09:30 AM', '10:00 AM', '10:15 AM', '06:15 PM'],
    rituals: [
      'Nabapatrika Probesh & Sthapan',
      'Saptami Puja Arambha',
      'Pushpanjali',
      'Bhog Nibedan',
      'Devi Aarati',
      'Sandhya Aarati',
    ],
  },
  {
    id: 'ashtami',
    day: '18th Oct',
    weekday: 'Sunday',
    tithi: 'Ashtami',
    sacred: false,
    times: ['08:00 AM', '09:30 AM', '10:00 AM', '10:15 AM', '06:15 PM'],
    rituals: [
      'Ashtami Puja Arambha',
      'Pushpanjali',
      'Bhog Nibedan',
      'Devi Aarati',
      'Sandhya Aarati',
    ],
  },
  {
    id: 'sandhi',
    day: '19th Oct',
    weekday: 'Monday',
    tithi: 'Ashtami (Sandhi)',
    sacred: true,
    times: [
      '07:26 AM',
      '07:50 AM',
      '07:55 AM',
      '08:00 AM',
      '08:14 AM',
      '08:15 AM',
      '09:15 AM',
      '06:15 PM',
    ],
    rituals: [
      'Sandhi Puja Arambha',
      'Bolidan',
      'Bhog Nibedan',
      'Devi Aarati',
      'Sandhi Puja Samapti',
      'Pushpanjali',
      'Sandhya Aarati',
    ],
    note: 'Sandhi Puja falls at the junction of the Ashtami and Nabami tithis — the most sacred moment of the Puja.',
  },
  {
    id: 'nabami',
    day: '20th Oct',
    weekday: 'Tuesday',
    tithi: 'Nabami',
    sacred: false,
    times: [
      '07:00 AM',
      '07:45 AM',
      '08:00 AM',
      '08:15 AM',
      '10:00 AM',
      '11:30 AM',
      '06:15 PM',
    ],
    rituals: [
      'Nabami Puja',
      'Bhog Nibedan',
      'Devi Aarati',
      'Pushpanjali',
      'Kumari Puja',
      'Hom / Yagna (Havan)',
      'Sandhya Aarati',
    ],
  },
  {
    id: 'dashami',
    day: '21st Oct',
    weekday: 'Wednesday',
    tithi: 'Dashami',
    sacred: false,
    times: ['08:00 AM', '08:45 AM', '09:00 AM'],
    rituals: ['Dashami Puja', 'Dodhikorma', 'Devi Niranjan (Bisarjan)'],
  },
]

export const MEMBERSHIP_PLANS = [
  {
    id: 'life',
    name: 'Life Member',
    joining: 500,
    fee: 2500,
    feeLabel: 'one-time fee',
    total: 3000,
    highlight: true,
    tagline: 'A lifelong seat at every celebration',
  },
  {
    id: 'annual',
    name: 'Annual Member',
    joining: 500,
    fee: 1000,
    feeLabel: 'annual fee',
    total: 1500,
    highlight: false,
    tagline: 'Full access for the festive year',
  },
]

export const MEMBER_PERKS = [
  'Priority puja access',
  'Reserved Bhog seating',
  'Member-Only Lounge',
  'Year-round engagement',
  'Brand & partner discounts',
]

// ── Annadan / Maha Bhog ──────────────────────────────────────
export const ANNADAN = {
  eyebrow: 'The Heart of the Festival',
  title: 'Annadan',
  stats: [
    { value: '800', label: 'People Served Daily' },
    { value: '4', label: 'Days of Continuous Service' },
    { value: '100%', label: 'Integrated Community Reach' },
  ],
  body:
    'The Maha Bhog is more than a meal — it is our highest act of service. For four consecutive days, we proudly serve hot bhog to over 800 individuals daily, uniting all residents of Palava, the local needy, and our integrated community in a shared moment of grace and equality.',
}

// ── Individual Donation Options ──────────────────────────────
export const FEATURED_CONTRIBUTIONS = [
  { name: 'Durga Protima / Idol', amount: 100000 },
  { name: 'Dhaki', amount: 20000 },
  { name: 'Thakur Moshai', amount: 10000 },
]

export const DONATION_COLUMNS = [
  'Puja Samagri',
  'Fruits',
  'Mishti',
  'Flowers',
  'Maha Bhog',
]

export const DONATION_ROWS = [
  { puja: 'Shashthi', values: [10001, 7001, 6001, 7001, 20001] },
  { puja: 'Saptami', values: [9001, 8001, 7001, 7001, 20001] },
  { puja: 'Ashtami', values: [10001, 9001, 7001, 8001, 25001] },
  { puja: 'Nabami', values: [9001, 8001, 7001, 7001, 20001] },
  { puja: 'Sandhi Puja', values: [15001, 12001, 7001, 6001, 9510] },
]

export const DONATION_NOTE =
  'All contributions are voluntary and directly support the celebration and welfare initiatives.'
