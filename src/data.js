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
  location: 'Eviva Ground, beside Gurudwara, Lodha Palava Phase 2',
}

export const NIRGHANTA = [
  {
    id: 'shashthi',
    day: '16th Oct',
    weekday: 'Friday',
    tithi: 'Shashthi',
    sacred: false,
    times: ['08:30–09:30 AM', '09:15 AM', '06:30–07:30 PM'],
    rituals: ['Sosti Pujo', 'Pushpanjali', 'Bodhon', 'Amantran & Adhibash'],
  },
  {
    id: 'saptami',
    day: '17th Oct',
    weekday: 'Saturday',
    tithi: 'Saptami',
    sacred: false,
    times: ['08:04 AM', '09:30 AM', '10:00 AM', '10:15 AM', '06:15 PM'],
    rituals: [
      'Nabo Patrika Probesh & Sthapona',
      'Saptumi Pujo arambho',
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
      'Astumi Pujo arambho',
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
    tithi: 'Sandhi Puja',
    sacred: true,
    times: ['07:26–09:15 AM', '06:15 PM'],
    rituals: [
      'Sondhi Pujo arambho',
      'Bolidan',
      'Bhog Nibedan',
      'Devi Aarati',
      'Sondhi Pujo somapti',
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
      'Home / Yagna / Havan',
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
    rituals: ['Dasumi Pujo', 'Doshikorma', 'Devi Niranjan (Bisarjan)'],
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
export const DONATION_CATEGORIES = [
  {
    title: 'Durga Idol',
    featured: true,
    items: [
      { name: 'Durga Idol', amount: 120000 },
      { name: 'Dhaki', amount: 30000 },
      { name: 'Thakur Moshai', amount: 50000 },
    ],
  },
  {
    title: 'Maha Shoshthi',
    items: [
      { name: 'Shoshthi Pujo', amount: 10001 },
      { name: 'Saree', amount: 7001 },
      { name: 'Pujo Samagree', amount: 8001 },
      { name: 'Fruits', amount: 8001 },
      { name: 'Mishti', amount: 7001 },
      { name: 'Flower', amount: 7001 },
    ],
  },
  {
    title: 'Maha Soptomi',
    items: [
      { name: 'Soptomi Pujo', amount: 15001 },
      { name: 'Saree', amount: 11001 },
      { name: 'Pujo Samagree', amount: 9001 },
      { name: 'Fruits', amount: 8001 },
      { name: 'Mishti', amount: 7001 },
      { name: 'Flower', amount: 8001 },
      { name: 'Public Bhog', amount: 15001 },
    ],
  },
  {
    title: 'Maha Ashtomi',
    items: [
      { name: 'Ashtomi Pujo', amount: 20001 },
      { name: 'Saree', amount: 15001 },
      { name: 'Pujo Samagree', amount: 12001 },
      { name: 'Fruits', amount: 9001 },
      { name: 'Mishti', amount: 7001 },
      { name: 'Flower', amount: 8001 },
      { name: 'Public Bhog', amount: 20001 },
    ],
  },
  {
    title: 'Sondhi Pujo',
    items: [
      { name: 'Pujo', amount: 25001 },
      { name: 'Lotus', amount: 12001 },
      { name: 'Prodip & Pujo Samagree', amount: 7001 },
      { name: 'Belpata & Flowers', amount: 9001 },
      { name: 'Mishti', amount: 8001 },
      { name: 'Mayer Bhog', amount: 20001 },
    ],
  },
  {
    title: 'Maha Nabomi',
    items: [
      { name: 'Nabomi Pujo', amount: 20001 },
      { name: 'Saree', amount: 15001 },
      { name: 'Pujo Samagree', amount: 12001 },
      { name: 'Fruits', amount: 9001 },
      { name: 'Mishti', amount: 7001 },
      { name: 'Flower', amount: 8001 },
      { name: 'Public Bhog', amount: 20001 },
    ],
  },
  {
    title: 'Dashomi',
    items: [
      { name: 'Dashomi Pujo', amount: 12001 },
      { name: 'Mishti', amount: 7001 },
    ],
  },
  {
    title: 'Lokhi Pujo',
    items: [
      { name: 'Lokhi Idol', amount: 20001 },
      { name: 'Pujo', amount: 15001 },
      { name: 'Saree', amount: 7001 },
      { name: 'Pujo Samagree', amount: 7001 },
      { name: 'Fruits', amount: 9001 },
      { name: 'Mishti', amount: 8001 },
      { name: 'Flower', amount: 7001 },
      { name: 'Public Bhog', amount: 12001 },
    ],
  },
  {
    title: 'Kali Pujo',
    items: [
      { name: 'Kali Idol', amount: 30000 },
      { name: 'Pujo', amount: 15001 },
      { name: 'Saree', amount: 7001 },
      { name: 'Prodip', amount: 7001 },
      { name: 'Pujo Samagree', amount: 7001 },
      { name: 'Fruits & Mishti', amount: 9001 },
      { name: 'Flower', amount: 7001 },
      { name: 'Public Bhog', amount: 12001 },
    ],
  },
]

export const DONATION_NOTE =
  'All contributions are voluntary and directly support the celebration and welfare initiatives.'

// ── Annadan 2026 appeal — items required (per the appeal poster) ──
export const ANNADAN_2026 = {
  presenter: 'Palava Kalibari Trust Durga Puja presents',
  title: 'Annadan 2026',
  subtitle: 'A Devotional Appeal for Maha Prasad',
  intro:
    'Palava Kalibari Trust warmly welcomes all devotees of Maa Durga to contribute towards Annadan 2026. With your generous support, we are destined to arrange Mahaprasad for all devotees from 17–20 October, serving an average of 800+ people every day.',
  shloka: 'अन्न ब्रह्म — अन्नदानं महादानम्',
  quote: 'Where food is offered with devotion, there the Divine is served.',
  date: '17 – 20 October 2026',
  time: '12:30 PM onwards',
  venue: 'Eviva Ground, Palava Phase 2 (Inside)',
  contacts: [
    { name: 'Arnab', phone: '7021982317' },
    { name: 'Sinchita', phone: '9967361693' },
    { name: 'Sonal', phone: '8056551774' },
  ],
  items: [
    ['Potato', '220 kg'],
    ['Ambemohar Rice', '150 kg'],
    ['Green Pumpkin', '110 kg'],
    ['Sugar', '80 kg'],
    ['Moong Dal', '80 kg'],
    ['Cow / Buffalo Milk', '70 liter'],
    ['Tomato', '70 kg'],
    ['Gemini Sunflower Oil', '60 liter'],
    ['India Gate Basmati Rice', '60 kg'],
    ['Sunrise Mustard Oil', '40 liter'],
    ['Brinjal / Eggplant', '40 kg'],
    ['Paneer (Cottage Cheese)', '25 kg'],
    ['Amul Milk Powder', '20 kg'],
    ['Safal Green Peas (Frozen)', '20 kg'],
    ['Besan (Gram Flour)', '20 kg'],
    ['Cashew Nuts', '20 kg'],
    ['Raisins (Kismis)', '20 kg'],
    ['Carrot', '22 kg'],
    ['Ginger', '15 kg'],
    ['Batasa (Sugar Drops)', '15 kg'],
    ['Green Chillies', '12 kg'],
    ['Ghee', '10 kg'],
    ['Amul Butter', '10 kg'],
    ['Khoya Kheer / Mawa', '10 kg'],
    ['Capsicum (Bell Pepper)', '2 kg'],
    ['Arrowroot Powder', '3 kg'],
    ['Bori (Lentil Dumplings)', '4 kg'],
    ['Ridge Gourd (Jhinge)', '5 kg'],
    ['Coriander Leaves', '3 kg'],
    ['Pointed Gourd (Potol)', '13 kg'],
    ['Cauliflower', '80 pcs'],
    ['Cabbage', '80 pcs'],
    ['Radish', '7 kg'],
    ['Yardlong Beans (Borboti)', '6 kg'],
    ['Bottle Gourd Greens', '5 kg'],
    ['Sweet Potato (Red Potato)', '5 kg'],
    ['Celery / Salad Leaves', '1 kg'],
    ['Pineapple', '10 pcs'],
    ['Raw Tamarind', '2 kg'],
    ['Raw Mango', '2 kg'],
    ['Aamsotto (Mango Fruit Roll)', '2 kg'],
    ['Aloo Bukhara (Dried Prunes)', '1 kg'],
    ['Dates', '12 kg'],
    ['Sugar', '80 kg'],
    ['Curd / Sour Curd', '1 kg'],
    ['Tata Salt', '25 gm'],
    ['Nigella Seeds (Kalonji)', '50 gm'],
    ['Whole Cumin', '1 kg'],
    ['Whole Dry Red Chilli', '500 gm'],
    ['Black Peppercorns', '500 gm'],
    ['Green Cardamom', '350 gm'],
    ['Bay Leaves', '500 gm'],
    ['Cinnamon', '500 gm'],
    ['Panch Phoron', '300 gm'],
    ['Poppy Seeds (Posto)', '500 gm'],
    ['Black Cardamom', '25 gm'],
    ['Magaj (Watermelon / Melon Seeds)', '2 kg'],
    ['Fennel Seeds', '500 gm'],
    ['Cloves', '500 gm'],
    ['Sunrise Cumin Powder', '3 kg'],
    ['Sunrise Turmeric Powder', '3 kg'],
    ['Coriander Powder', '500 gm'],
    ['Sunrise Alur Dom Masala', '100 gm'],
    ['Sunrise Kashmiri Mirch / Mix', '3 kg'],
    ['Sunrise Chaat Masala', '350 gm'],
    ['Sunrise Paneer Masala', '500 gm'],
    ['Sunrise Shahi Garam Masala', '500 gm'],
    ['Sunrise Mustard Powder', '200 gm'],
    ['Sunrise Asafoetida (Hing)', '300 gm'],
    ['Baking Soda', '200 gm'],
    ['Rose Water', '4 pcs'],
    ['Tomato Sauce', '2 kg'],
    ['Sunrise Big Papad', '15 kg'],
    ['Disposal Plates (10 inch)', '3000 pcs'],
    ['Disposal Glass', '3500 pcs'],
    ['Water Bottle (225 ml)', '4000 pcs'],
  ],
}

// ── Durga Puja 2026 event schedule (per the schedule poster) ─
// Times are IST, 24h. end: null = "onwards".
export const EVENT_SCHEDULE = [
  {
    date: '2026-10-16', day: '16', weekday: 'Friday', color: ['#8b0f1e', '#c2410c'],
    slots: [
      { start: '19:00', end: '22:00', title: 'Anondomela', icon: 'food' },
      { start: '19:00', end: '20:00', title: 'Agomoni', icon: 'music' },
      { start: '20:00', end: '21:00', title: 'Internal Performances', icon: 'people' },
    ],
  },
  {
    date: '2026-10-17', day: '17', weekday: 'Saturday', color: ['#9d174d', '#db2777'],
    slots: [
      { start: '10:00', end: '12:00', title: 'Drawing Competition', icon: 'art' },
      { start: '19:30', end: '20:15', title: 'Navdurga Dance', icon: 'dance' },
      { start: '20:30', end: '22:30', title: 'Dance Competition', icon: 'people' },
    ],
  },
  {
    date: '2026-10-18', day: '18', weekday: 'Sunday', color: ['#1e3a8a', '#2563eb'],
    slots: [
      { start: '20:00', end: '20:30', title: "PKT Kids' Band", icon: 'drum' },
      { start: '20:30', end: '22:00', title: 'External Band Performances', icon: 'guitar' },
    ],
  },
  {
    date: '2026-10-19', day: '19', weekday: 'Monday', color: ['#92400e', '#d97706'],
    slots: [
      { start: '20:00', end: '21:00', title: 'Bangla Natok', icon: 'drama' },
    ],
  },
  {
    date: '2026-10-20', day: '20', weekday: 'Tuesday', color: ['#5b21b6', '#9333ea'],
    slots: [
      { start: '19:00', end: '20:00', title: 'Shankha Protijogita & Dhaak Protijogita', icon: 'drum' },
      { start: '20:00', end: '20:30', title: 'Dance Performances', icon: 'dance' },
      { start: '20:30', end: null, title: 'Magic Show', icon: 'magic' },
    ],
  },
  {
    date: '2026-10-21', day: '21', weekday: 'Wednesday', color: ['#166534', '#16a34a'],
    slots: [
      { start: '10:00', end: '13:00', title: 'Sindoor Khela & Dhunochi Naach', icon: 'flame' },
    ],
  },
]
