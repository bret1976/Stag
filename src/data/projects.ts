import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'morrow',
    number: '01',
    title: 'MORROW',
    category: 'SUSTAINABLE FURNITURE / DIGITAL COMMERCE',
    client: 'Morrow Objects Inc.',
    year: '2026',
    tagline: 'OBJECTS FOR A BETTER TOMORROW.',
    description:
      'MORROW is a conceptual furniture brand exploring thoughtful materials, expressive craftsmanship, and timeless forms. Its digital experience combines quiet editorial design, contemporary product photography, and an intuitive approach to commerce.',
    heroImage: '/src/assets/images/project_morrow_interior_1792095167176.jpg',
    accentColor: '#D97706',
    palette: ['#1C1917', '#E7E5E4', '#78716C', '#D97706'],
    capabilities: [
      'Brand direction',
      'E-commerce design',
      'Product storytelling',
      'Creative development'
    ],
    challenge:
      'Contemporary luxury furniture often defaults to cold, clinical product grids that fail to convey the tactile warmth, weight, and sustainable provenance of solid-timber craftsmanship.',
    solution:
      'We designed an editorial e-commerce sanctuary with slow-scroll transitions, architectural framing, and material zoom studies that make online purchasing feel as deliberate as bespoke commissioning.',
    approach:
      'Spatial hierarchy guided by natural light and negative space, letting tactile wood grains and sculptural joinery anchor every interaction.',
    websitePreview: {
      heroTitle: 'DESIGNED TO STAY.',
      heroSubtitle: 'Thoughtful furniture for spaces that evolve with the people who live in them.',
      navigation: ['SEATING', 'TABLES', 'STORAGE', 'OBJECTS'],
      statement: 'LESS NOISE. MORE MEANING.',
      highlightMetric: '100% FSC',
      highlightLabel: 'Certified Nordic Timber',
      taglineBottom: 'Sustainable Architectural Solutions For Every Space'
    }
  },
  {
    id: 'aura-table',
    number: '02',
    title: 'AURA TABLE',
    category: 'HOSPITALITY / EXPERIENTIAL BRANDING',
    client: 'Aura Hospitality Group',
    year: '2026',
    tagline: 'MORE THAN A PLACE TO EAT.',
    description:
      'AURA TABLE is a conceptual hospitality brand built around atmosphere, culinary imagination, and the moments people share around a table. The digital identity brings editorial photography, cinematic food imagery, and immersive storytelling into one expressive experience.',
    heroImage: '/src/assets/images/project_aura_table_1792095167207.jpg',
    accentColor: '#E11D48',
    palette: ['#0A0A0A', '#1C1917', '#991B1B', '#F59E0B'],
    capabilities: [
      'Brand identity',
      'Art direction',
      'Digital experience',
      'Motion design'
    ],
    challenge:
      'Fine dining hospitality websites are almost universally static reservation engines detached from the sensory theater of candlelit dining rooms and seasonal tasting menus.',
    solution:
      'We developed an immersive chiaroscuro experience featuring nocturnal video backdrops, bespoke typography, and a reservation flow modeled after a theater seating booking.',
    approach:
      'Deep black canvas punctuated by intimate candle glow, dramatic plating angles, and quiet micro-interactions that evoke anticipation before the first course.',
    websitePreview: {
      heroTitle: 'EVERY DETAIL MATTERS.',
      heroSubtitle: 'An experience shaped by ingredients, craft, atmosphere, and connection.',
      navigation: ['MENU', 'EXPERIENCE', 'STORY', 'RESERVATIONS'],
      statement: 'TASTE IS JUST THE BEGINNING.',
      highlightMetric: '12-COURSE',
      highlightLabel: 'Seasonal Tasting Journey',
      taglineBottom: 'Intelligence in Every Detail. Soul in Every Dish.'
    }
  },
  {
    id: 'kora',
    number: '03',
    title: 'KORA',
    category: 'FINANCIAL TECHNOLOGY / PRODUCT EXPERIENCE',
    client: 'Kora Capital Labs',
    year: '2026',
    tagline: 'MONEY, WITHOUT THE NOISE.',
    description:
      'KORA is a conceptual financial technology platform designed to make complex financial information feel accessible, organized, and actionable. Its product experience focuses on clarity, meaningful interfaces, and a distinctly contemporary digital identity.',
    heroImage: '/src/assets/images/project_kora_fintech_1792095169415.jpg',
    accentColor: '#2563EB',
    palette: ['#090D16', '#1E293B', '#38BDF8', '#2563EB'],
    capabilities: [
      'Product design',
      'UX strategy',
      'Design systems',
      'Creative development'
    ],
    challenge:
      'Modern fintech apps suffer from either chaotic crypto-bro maximalism or sterile neo-banking cards that obscure portfolio risk and macro insights.',
    solution:
      'We engineered a high-precision Swiss financial workstation with fluid data curves, predictive cashflow modeling, and typography-first analytics that prioritize signal over noise.',
    approach:
      'Zero-latency financial ergonomics with monospaced tabular numerals, dark-mode optical compensation, and multi-currency position telemetry.',
    websitePreview: {
      heroTitle: 'YOUR MONEY. A CLEARER VIEW.',
      heroSubtitle: 'Everything important, together in one thoughtful financial experience.',
      navigation: ['OVERVIEW', 'INSIGHTS', 'PLANNING', 'ACCOUNT'],
      statement: 'PRECISION OVER PROMISES.',
      highlightMetric: '$2,490',
      highlightLabel: 'Pro Annual Tier',
      taglineBottom: 'Autonomous Treasury & Global Portfolio Telemetry'
    }
  },
  {
    id: 'fieldnotes',
    number: '04',
    title: 'FIELDNOTES',
    category: 'OUTDOOR CULTURE / EDITORIAL PLATFORM',
    client: 'Fieldnotes Exploration',
    year: '2026',
    tagline: 'GO FURTHER. LOOK CLOSER.',
    description:
      'FIELDNOTES is a conceptual outdoor lifestyle platform celebrating exploration, photography, and the places that remind us there is more beyond the screen. Its digital environment combines cinematic landscapes, careful editorial storytelling, and a clear sense of adventure.',
    heroImage: '/src/assets/images/project_fieldnotes_expedition_1792095168868.jpg',
    accentColor: '#10B981',
    palette: ['#0C1410', '#1C2E24', '#2D4A3E', '#A7F3D0'],
    capabilities: [
      'Brand direction',
      'Editorial web design',
      'Interactive storytelling',
      'Creative development'
    ],
    challenge:
      'Outdoor lifestyle portals often feel like cookie-cutter blogs with generic gear-review roundups, losing the raw poetry and contemplative solitude of wilderness terrain.',
    solution:
      'We crafted an expansive digital journal featuring panoramic photography, altitude and barometric data cards, and interactive expedition dispatches.',
    approach:
      'Unrushed visual pacing, topographic cartography motifs, and atmospheric field audio cues that bring the quiet scale of alpine landscapes to life.',
    websitePreview: {
      heroTitle: 'THE WORLD IS STILL OUT THERE.',
      heroSubtitle: 'Stories, landscapes, and ideas for people who never stop exploring.',
      navigation: ['EXPLORE', 'STORIES', 'PLACES', 'ABOUT'],
      statement: 'THE LONG WAY IS OFTEN THE BEST WAY.',
      highlightMetric: '3,842M',
      highlightLabel: 'Mont Blanc Ridge Dispatch',
      taglineBottom: 'Topographic Expedition Journals & Field Gear'
    }
  }
];
