export const SPORTS_CATEGORIES = [
  {
    name: 'Cricket',
    icon: 'Trophy',
    count: 14,
    color: '#F7D358',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'T20 & One-Day Premier Leagues',
    tags: ['T20 Knockout', 'Corporate Cup', 'Live Scoring', 'Pro Turf']
  },
  {
    name: 'Football',
    icon: 'Activity',
    count: 22,
    color: '#4ADE80',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
    subtitle: '7-a-side & 11v11 State Championships',
    tags: ['Floodlit Turf', '7-a-side', 'Golden Boot', 'Knockout']
  },
  {
    name: 'Running',
    icon: 'Zap',
    count: 18,
    color: '#60A5FA',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Full & Half Coastal Marathons',
    tags: ['21K Half Marathon', 'Timing Chip', 'Gold Medal', '5K Fun Run']
  },
  {
    name: 'Volleyball',
    icon: 'Target',
    count: 9,
    color: '#F472B6',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Indoor Pro League & Beach Spike Cup',
    tags: ['Indoor Stadium', 'Mikasa Ball', 'Pro Net', 'Inter-College']
  },
  {
    name: 'Kabaddi',
    icon: 'Flame',
    count: 11,
    color: '#FB923C',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'State Pro-Mat Raid Showdowns',
    tags: ['Pro-Mat Rules', 'Super Raid', 'Under-80kg', 'Mat Referees']
  },
  {
    name: 'Athletics',
    icon: 'Award',
    count: 16,
    color: '#A78BFA',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'National Track & Field Invitational',
    tags: ['100m Sprint', 'Long Jump', 'Relay 4x100', 'Synthetic Track']
  },
  {
    name: 'Badminton',
    icon: 'Feather',
    count: 15,
    color: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Open Singles & Mixed Doubles',
    tags: ['Yonex Feather', 'Wooden Court', '21-Point System', 'State Ranking']
  },
  {
    name: 'Chess',
    icon: 'Crown',
    count: 8,
    color: '#FACC15',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'FIDE Rated Blitz & Rapid Masters',
    tags: ['FIDE Rated', 'Swiss System', '3min Blitz', 'Grandmaster']
  },
  {
    name: 'Table Tennis',
    icon: 'Circle',
    count: 7,
    color: '#E879F9',
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Pro Table Tennis Super Series',
    tags: ['Stiga Tables', 'Spin Masters', 'Singles & Doubles', 'ITTF Approved']
  },
  {
    name: 'Cycling',
    icon: 'Compass',
    count: 10,
    color: '#34D399',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Inter-City 50K & 100K Endurance',
    tags: ['50K Route', 'Support Vehicle', 'Hydration Stop', 'Road & MTB']
  },
  {
    name: 'Swimming',
    icon: 'Waves',
    count: 6,
    color: '#67E8F9',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Olympic Size Aquatic Championships',
    tags: ['50m Olympic Pool', 'Freestyle', 'Butterfly', 'Touchpad Timing']
  },
  {
    name: 'Basketball',
    icon: 'Dribble',
    count: 12,
    color: '#F97316',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    subtitle: '3x3 Urban & 5v5 Full Court Cups',
    tags: ['FIBA 3x3', 'Hardwood Court', 'Slam Dunk', 'Shot Clock']
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-001',
    title: 'SRV National Marathon Championship 2026',
    sport: 'Running',
    city: 'Mumbai',
    state: 'Maharashtra',
    venue: 'Bandra-Worli Sea Link Promenade, Mumbai',
    date: '2026-08-15',
    time: '05:30 AM',
    regCloseDate: '2026-08-10',
    fee: 499,
    maxSeats: 1500,
    registeredCount: 1140,
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80',
    organizer: 'SRV Sports Federation',
    organizerContact: '+91 98765 43210',
    organizerEmail: 'marathon@srvsports.in',
    description: 'Join over 1,500 runners in India’s premier coastal marathon featuring 21K Half Marathon, 10K Timed Run, and 5K Fun Run across the iconic Sea Link.',
    eligibility: 'Open to all fitness enthusiasts aged 16 and above. Medical certificate required for 21K.',
    rules: [
      'Official timing chips provided at bib distribution.',
      'Water stations available at every 2.5 kilometers.',
      'Finishers receive gold-embossed medals and digital certificates.',
      'Cutoff time for 21K is 3 hours 30 minutes.'
    ],
    prizes: [
      '1st Place: ₹1,50,000 + Gold Trophy',
      '2nd Place: ₹75,000 + Silver Trophy',
      '3rd Place: ₹35,000 + Bronze Trophy'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'evt-002',
    title: 'All-India Premier Cricket T20 Cup',
    sport: 'Cricket',
    city: 'Bengaluru',
    state: 'Karnataka',
    venue: 'M. Chinnaswamy Stadium Grounds, Bengaluru',
    date: '2026-09-01',
    time: '08:00 AM',
    regCloseDate: '2026-08-25',
    fee: 2500,
    maxSeats: 32,
    registeredCount: 28,
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Karnataka State Sports League',
    organizerContact: '+91 98765 11223',
    organizerEmail: 'cricket@srvsports.in',
    description: 'High-octane T20 tournament featuring 32 elite corporate and club teams vying for the coveted SRV Golden Trophy and cash prizes.',
    eligibility: 'Registered cricket clubs & corporate squads (15 players max per squad).',
    rules: [
      'White leather ball match; official BCCI accredited umpires.',
      'Knockout format with powerplays and Super Over rules.',
      'Professional livestreaming on SRV Sports Network.'
    ],
    prizes: [
      'Champions: ₹3,00,000 + SRV Gold Cup',
      'Runners Up: ₹1,50,000',
      'Man of the Tournament: ₹25,000 + Custom Bat'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'evt-003',
    title: 'Gold Cup Invitational Football Championship',
    sport: 'Football',
    city: 'Goa',
    state: 'Goa',
    venue: 'Fatorda Stadium Turf, Margao',
    date: '2026-08-01',
    time: '04:00 PM',
    regCloseDate: '2026-07-28',
    fee: 1999,
    maxSeats: 64,
    registeredCount: 64,
    status: 'Ongoing',
    banner: '/football-banner.jpg',
    organizer: 'Goa Football Association',
    organizerContact: '+91 98111 22334',
    organizerEmail: 'football@srvsports.in',
    description: '7-a-side electric football showdown on floodlit turf. Watch 64 teams battle with speed, flair, and coastal energy.',
    eligibility: 'Open category. Team size: 7 starters + 3 substitutes.',
    rules: [
      '20-minute halves with rolling substitutions.',
      'FIFA match balls provided.',
      'Yellow/Red card disciplinary regulations apply.'
    ],
    prizes: [
      '1st Place: ₹2,00,000 + Championship Shield',
      '2nd Place: ₹1,00,000',
      'Golden Boot: ₹20,000'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'evt-004',
    title: 'National Pro Volleyball League 2026',
    sport: 'Volleyball',
    city: 'Hyderabad',
    state: 'Telangana',
    venue: 'Gachibowli Indoor Stadium, Hyderabad',
    date: '2026-09-12',
    time: '09:00 AM',
    regCloseDate: '2026-09-05',
    fee: 1200,
    maxSeats: 24,
    registeredCount: 18,
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Telangana Volleyball Board',
    organizerContact: '+91 94444 55667',
    organizerEmail: 'volleyball@srvsports.in',
    description: 'Indoor 6v6 championship bringing high spikes, intense blocks, and international court setup to Hyderabad.',
    eligibility: 'College & open mens/womens teams.',
    rules: [
      'Best of 3 sets for group matches, Best of 5 for Finals.',
      'Official Mikasa indoor balls.'
    ],
    prizes: [
      'Winners: ₹1,20,000',
      'Runners Up: ₹60,000'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'evt-005',
    title: 'SRV State Kabaddi Clash 2026',
    sport: 'Kabaddi',
    city: 'Chennai',
    state: 'Tamil Nadu',
    venue: 'Jawaharlal Nehru Indoor Stadium, Chennai',
    date: '2026-08-28',
    time: '10:00 AM',
    regCloseDate: '2026-08-20',
    fee: 800,
    maxSeats: 32,
    registeredCount: 29,
    status: 'Upcoming',
    banner: '/kabaddi-banner.jpg',
    organizer: 'Tamil Nadu Kabaddi Council',
    organizerContact: '+91 97777 88990',
    organizerEmail: 'kabaddi@srvsports.in',
    description: 'High-voltage Pro-Mat Kabaddi tournament showcasing super raids, ankles holds, and raw endurance.',
    eligibility: 'Men under 80kg weight category.',
    rules: [
      'Pro Kabaddi League standard mat and line referees.',
      '30-second raid clock & Super Tackle scoring.'
    ],
    prizes: [
      '1st Prize: ₹1,00,000 + Golden Mat Shield',
      'Best Raider: ₹15,000'
    ],
    gallery: []
  },
  {
    id: 'evt-006',
    title: 'Super Smash Badminton Open',
    sport: 'Badminton',
    city: 'Pune',
    state: 'Maharashtra',
    venue: 'Balewadi Sports Complex, Pune',
    date: '2026-09-20',
    time: '08:30 AM',
    regCloseDate: '2026-09-15',
    fee: 600,
    maxSeats: 128,
    registeredCount: 94,
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Pune Badminton Academy',
    organizerContact: '+91 93333 44556',
    organizerEmail: 'badminton@srvsports.in',
    description: 'Singles and Doubles tournament played on international wooden floor synthetic courts with Yonex feather shuttles.',
    eligibility: 'Open Category (Men, Women, Mixed Doubles).',
    rules: [
      '21-point 3-set system.',
      'Yonex AS-30 feather shuttles used.'
    ],
    prizes: [
      'Singles Champion: ₹50,000',
      'Doubles Champions: ₹75,000'
    ],
    gallery: []
  },
  {
    id: 'evt-007',
    title: 'Grandmaster Chess Masters Blitz 2026',
    sport: 'Chess',
    city: 'Kolkata',
    state: 'West Bengal',
    venue: 'Khudiram Anushilan Kendra, Kolkata',
    date: '2026-09-25',
    time: '09:30 AM',
    regCloseDate: '2026-09-20',
    fee: 500,
    maxSeats: 200,
    registeredCount: 160,
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Bengal Chess Association',
    organizerContact: '+91 92222 33445',
    organizerEmail: 'chess@srvsports.in',
    description: 'FIDE rated 9-round Swiss System Blitz tournament featuring rated players and budding grandmasters.',
    eligibility: 'All chess players with FIDE ID or state registration.',
    rules: [
      '3 min + 2 sec increment per move.',
      'FIDE Laws of Chess apply.'
    ],
    prizes: [
      '1st Place: ₹75,00,000 Trophy',
      'Top 15 players rewarded.'
    ],
    gallery: []
  },
  {
    id: 'evt-008',
    title: 'All-India Inter-City Cycling Rally 50K',
    sport: 'Cycling',
    city: 'Chandigarh',
    state: 'Punjab',
    venue: 'Sukhna Lake Promenade, Chandigarh',
    date: '2026-07-10',
    time: '06:00 AM',
    regCloseDate: '2026-07-05',
    fee: 750,
    maxSeats: 300,
    registeredCount: 300,
    status: 'Completed',
    banner: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Chandigarh Cycling Club',
    organizerContact: '+91 91111 22233',
    organizerEmail: 'cycling@srvsports.in',
    description: '50-kilometer scenic endurance ride through Chandigarh wide avenues with support vehicles and hydration stations.',
    eligibility: 'Road bikes, MTBs, and hybrid cycles.',
    rules: ['Helmets compulsory.', 'Timing bib required.'],
    prizes: ['Gold Finisher Medal to all participants.'],
    gallery: []
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-101',
    title: 'Registration Opened: SRV National Marathon 2026',
    category: 'Upcoming Events',
    date: '2026-07-28',
    time: '10:00 AM',
    unread: true,
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=600&q=80',
    content: 'Early bird registration is officially live for the SRV National Marathon in Mumbai. Over 1,100 bibs claimed already!'
  },
  {
    id: 'notif-102',
    title: 'Registration Deadline Alert: Premier Cricket T20',
    category: 'Registration Deadlines',
    date: '2026-07-27',
    time: '04:30 PM',
    unread: true,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
    content: 'Only 4 team spots remaining for the Bengaluru T20 Cup. Registrations close strictly on August 25th.'
  },
  {
    id: 'notif-103',
    title: 'Winners Announced: All-India Cycling 50K Rally',
    category: 'Winners Announcements',
    date: '2026-07-26',
    time: '06:00 PM',
    unread: false,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=600&q=80',
    content: 'Check out the official timing leaderboard and photo gallery for the Chandigarh 50K Cycling Rally in the Reviews tab.'
  },
  {
    id: 'notif-104',
    title: 'Platform Maintenance & New Digital Receipt Feature',
    category: 'Platform News',
    date: '2026-07-24',
    time: '11:15 AM',
    unread: false,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    content: 'We have upgraded SRV with instant downloadable QR registration receipts and real-time SMS notifications.'
  },
  {
    id: 'notif-105',
    title: 'Gold Cup Football Semi-Finals Schedule Out',
    category: 'Upcoming Events',
    date: '2026-07-22',
    time: '02:00 PM',
    unread: false,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    content: 'The official match schedule for the Gold Cup Invitational Football Championship semi-finals in Goa has been published.'
  },
  {
    id: 'notif-106',
    title: 'Pro-Mat Kabaddi Roster Verification Active',
    category: 'Important Alerts',
    date: '2026-07-20',
    time: '09:30 AM',
    unread: false,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80',
    content: 'All team captains for SRV State Kabaddi Clash 2026 must submit player weight certificates before August 20th.'
  }
];

export const USER_REVIEWS = [
  {
    id: 'rev-001',
    name: 'Rajesh Sharma',
    role: 'Marathon Runner',
    eventAttended: 'SRV National Marathon 2025',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    text: 'The organization by SRV was world-class. From hydration stations to timing chips and gold finisher medals, everything felt like a major international marathon!'
  },
  {
    id: 'rev-002',
    name: 'Priya Venkatesh',
    role: 'Badminton Champion',
    eventAttended: 'Super Smash Open 2025',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    text: 'SRV platform made registration effortless. Match schedules were published on time with zero delay. Highly recommend for serious athletes!'
  },
  {
    id: 'rev-003',
    name: 'Vikramaditya Singh',
    role: 'Team Manager, Royal Strikers',
    eventAttended: 'All-India Premier Cricket T20',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    text: 'As an event organizer using SRV Pay Per Event plan, settlements were instant and the admin dashboard gives total clarity over player rosters.'
  }
];

export const SPONSORS = [
  { name: 'RedBull India', logoText: 'RED BULL' },
  { name: 'Yonex Sports', logoText: 'YONEX' },
  { name: 'Fast&Up Nutrition', logoText: 'FAST&UP' },
  { name: 'Decathlon', logoText: 'DECATHLON' },
  { name: 'SG Cricket', logoText: 'SG SPORTS' },
  { name: 'Puma India', logoText: 'PUMA' }
];

export const PRICING_PLANS = [
  {
    id: 'plan-basic',
    name: 'Basic Plan',
    badge: 'Most Popular for New Organizers',
    price: 'Free',
    period: 'For First 100 Registrations',
    description: 'Perfect for local clubs, school events, and non-profit tournaments starting out.',
    features: [
      'First 100 registrations 100% free',
      'Publish unlimited events',
      'Basic organizer analytics dashboard',
      'Automated email confirmations',
      'Downloadable CSV participant list',
      'Standard 24/7 organizer support'
    ],
    cta: 'Get Started Free',
    highlighted: false
  },
  {
    id: 'plan-event',
    name: 'Pay Per Event',
    badge: 'Recommended for 2,000+ Participants',
    price: '₹4,999',
    period: 'Per Event Flat Fee',
    description: 'Designed for large-scale marathons and national leagues with high ticket volume.',
    features: [
      '0% commission on ticket sales',
      'Direct payouts to organizer bank account',
      'Unlimited ticket sales & custom tiers',
      'Dedicated event manager support',
      'Custom branding & gold certificate design',
      'Real-time live leaderboards & QR check-in'
    ],
    cta: 'Choose Pay Per Event',
    highlighted: true
  },
  {
    id: 'plan-ticket',
    name: 'Pay Per Ticket',
    badge: 'Zero Upfront Expense',
    price: '3% - 5%',
    period: 'Per Ticket Sold',
    description: 'No upfront investment required. Fee is added seamlessly during participant checkout.',
    features: [
      'Small configurable fee per ticket',
      'No upfront cost or platform charge',
      'Automatic payment gateway settlements',
      'Integrated SMS & WhatsApp reminders',
      'Full participant management portal',
      'Review & photo gallery hosting'
    ],
    cta: 'Start Selling Tickets',
    highlighted: false
  }
];

export const PAST_WINNERS = [
  {
    id: 'win-01',
    name: 'Rohan Deshmukh',
    username: '@rohan_runner',
    userType: 'SRV Verified Athlete',
    eventTitle: 'SRV National Marathon Championship 2026',
    sport: 'Running',
    medal: 'Gold',
    rank: '1st Place / Champion',
    timeScore: '1h 08m 12s (New Record)',
    prize: '₹1,50,000 + Gold Medal',
    venue: 'Jawaharlal Nehru Stadium',
    city: 'New Delhi',
    eventDate: 'July 15, 2026',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'win-02',
    name: 'Vikram Mehta & Team',
    username: '@mumbaistrikers',
    userType: 'SRV Registered Captain',
    eventTitle: 'Gold Cup Invitational Football Championship',
    sport: 'Football',
    medal: 'Gold',
    rank: '1st Place Champions',
    timeScore: '3 - 1 Final Score',
    prize: '₹2,00,000 + Trophy',
    venue: 'Fatorda Stadium Turf',
    city: 'Goa',
    eventDate: 'July 20, 2026',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'win-03',
    name: 'Priya Sharma',
    username: '@priya_smash',
    userType: 'SRV Verified Athlete',
    eventTitle: 'All India Open Badminton Masters 2026',
    sport: 'Badminton',
    medal: 'Gold',
    rank: 'Women Singles Champion',
    timeScore: '21-18, 21-16 Final Set',
    prize: '₹80,000 + Gold Medal',
    venue: 'Pardivala Indoor Arena',
    city: 'Mumbai',
    eventDate: 'July 22, 2026',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'win-04',
    name: 'Tamil Panthers Kabaddi Team',
    username: '@panthers_kabaddi',
    userType: 'SRV Registered Club',
    eventTitle: 'SRV State Kabaddi Clash 2026',
    sport: 'Kabaddi',
    medal: 'Silver',
    rank: '2nd Place / Runners Up',
    timeScore: '42 - 38 Final Raid',
    prize: '₹1,00,000 + Silver Medal',
    venue: 'Nehru Indoor Stadium',
    city: 'Chennai',
    eventDate: 'July 18, 2026',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'win-05',
    name: 'Ananya Roy',
    username: '@ananya_chess',
    userType: 'SRV Verified Athlete',
    eventTitle: 'Bengal Grandmaster Blitz Chess Tournament',
    sport: 'Chess',
    medal: 'Gold',
    rank: '1st Place Blitz Champion',
    timeScore: '8.5 / 9 Points',
    prize: '₹75,000 + Gold Medal',
    venue: 'Khudiram Anushilan Kendra',
    city: 'Kolkata',
    eventDate: 'July 12, 2026',
    image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'win-06',
    name: 'Karthik Subramanian',
    username: '@karthik_swift',
    userType: 'SRV Verified Athlete',
    eventTitle: 'Deccan Athletics Championship 2026',
    sport: 'Athletics',
    medal: 'Bronze',
    rank: '3rd Place 100m Sprint',
    timeScore: '10.42 Seconds',
    prize: '₹35,000 + Bronze Medal',
    venue: 'Kanteerava Outdoor Stadium',
    city: 'Bengaluru',
    eventDate: 'July 08, 2026',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'
  }
];
