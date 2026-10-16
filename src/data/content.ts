import { ServiceItem, ProcessPhase } from '../types';

export const STUDIO_MANIFESTO = {
  eyebrow: '01 / OUR INSTINCT',
  primaryHeadline: 'SAFE ISN\'T A DESIGN STRATEGY.',
  paragraphs: [
    'A brand should have a point of view. A website should have a pulse. A digital experience should make people feel something.',
    'We work where design, imagination, motion, and technology collide. Not to be different for the sake of it—to create something people remember.',
    'Good work gets noticed. Great work changes expectations.'
  ],
  closing: 'WE DON\'T FOLLOW THE FORMAT. WE QUESTION IT.'
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'brand-identity',
    number: '01',
    title: 'BRAND IDENTITY',
    headline: 'BECOME IMPOSSIBLE TO CONFUSE.',
    description:
      'We build distinctive visual identities through strategy, bespoke typography, art-directed imagery, design systems, and an unapologetic creative point of view.',
    tags: ['Brand Architecture', 'Custom Typography', 'Visual Systems', 'Art Direction']
  },
  {
    id: 'web-experiences',
    number: '02',
    title: 'WEB EXPERIENCES',
    headline: 'THE WEB SHOULD FEEL ALIVE.',
    description:
      'We create responsive digital experiences where expressive design, clear spatial interactions, and thoughtful engineering work together seamlessly.',
    tags: ['Flagship Sites', 'Editorial Platforms', 'Digital Showrooms', 'Interactive Portals']
  },
  {
    id: 'motion-interaction',
    number: '03',
    title: 'MOTION & INTERACTION',
    headline: 'GIVE EVERYTHING A REASON TO MOVE.',
    description:
      'Motion brings rhythm, tactile tension, and personality to digital storytelling. We make animation part of the core experience, not just cosmetic decoration.',
    tags: ['Choreographed Scroll', '3D Transforms', 'Micro-Interactions', 'Kinetic Typography']
  },
  {
    id: 'creative-development',
    number: '04',
    title: 'CREATIVE DEVELOPMENT',
    headline: 'FROM VISION TO REALITY.',
    description:
      'We translate ambitious design systems into reliable, high-performance, and responsive digital products with flawless browser rendering.',
    tags: ['WebGL / Canvas', 'Shader Effects', 'Headless Architectures', 'Optimized Builds']
  },
  {
    id: 'campaign-experiences',
    number: '05',
    title: 'CAMPAIGN EXPERIENCES',
    headline: 'MAKE THE MOMENT MATTER.',
    description:
      'We develop campaign-led digital work designed to capture global attention, drive cultural resonance, and create unforgettable brand moments.',
    tags: ['Product Drops', 'Interactive Teasers', 'Global Launches', 'Cultural Activations']
  },
  {
    id: 'experimental-digital',
    number: '06',
    title: 'EXPERIMENTAL DIGITAL',
    headline: 'MAKE ROOM FOR WHAT\'S NEXT.',
    description:
      'We explore the boundary where emerging creative tools, procedural algorithms, and unexpected interfaces redefine human interaction with screens.',
    tags: ['Procedural Systems', 'Audio-Visual Reactive', 'Creative Prototyping', 'R&D']
  }
];

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    id: 'discover',
    number: '01',
    title: 'DISCOVER',
    headline: 'FIND THE REAL IDEA.',
    description:
      'We learn about the brand, the audience, the opportunity, and the ambition behind the project. The goal is to understand what truly deserves to exist.',
    deliverables: ['Brand Immersion', 'Audience Insights', 'Market Defamiliarization', 'Opportunity Matrix']
  },
  {
    id: 'define',
    number: '02',
    title: 'DEFINE',
    headline: 'GIVE IT DIRECTION.',
    description:
      'We turn research, imagination, and strategic thinking into an audacious creative thesis with clear aesthetic boundaries and technical targets.',
    deliverables: ['Creative Proposition', 'Art Direction Moods', 'Information Architecture', 'Interaction Thesis']
  },
  {
    id: 'design',
    number: '03',
    title: 'DESIGN',
    headline: 'MAKE IT DISTINCT.',
    description:
      'We explore bespoke typography, spatial layout, tactile interaction, custom photography, and motion until every detail feels inevitable.',
    deliverables: ['Design Systems', 'Choreographed Prototypes', 'Typographic Frameworks', 'Responsive Layouts']
  },
  {
    id: 'develop',
    number: '04',
    title: 'DEVELOP',
    headline: 'BRING IT TO LIFE.',
    description:
      'We build, animate, stress-test, and refine the experience across real devices and screen dimensions with obsessive attention to 60fps fluidity.',
    deliverables: ['Production Engineering', 'Shader / Canvas Tuning', 'Accessibility Audits', 'Performance Optimization']
  },
  {
    id: 'release',
    number: '05',
    title: 'RELEASE',
    headline: 'LET THE WORLD SEE IT.',
    description:
      'We launch, monitor, and support the work to ensure it cuts through noise and evolves dynamically beyond its opening premiere.',
    deliverables: ['Global Deployment', 'Telemetry Verification', 'Ongoing Evolution', 'Archival Documentation']
  }
];

export const PHILOSOPHY = {
  eyebrow: '05 / OUR THINKING',
  headline: 'WE BELIEVE DIGITAL DESERVES MORE.',
  intro:
    'More originality. More confidence. More consideration. More experimentation. And more respect for the people using what we create.',
  quote: 'A strong website isn\'t a collection of fashionable components. It\'s a clear idea expressed through every decision.',
  principles: [
    {
      title: 'DESIGN WITH INTENT',
      desc: 'Make every aesthetic decision serve the narrative. Nothing is decorative filler.'
    },
    {
      title: 'EXPERIMENT WITH PURPOSE',
      desc: 'Try unexpected interactive approaches when they create unforgettable engagement.'
    },
    {
      title: 'BUILD FOR REALITY',
      desc: 'Ground audacious visual thinking in rock-solid responsive performance and accessibility.'
    }
  ],
  closing: 'IF IT LOOKS LIKE EVERYTHING ELSE, IT\'S TIME TO THINK AGAIN.'
};

// Subtle Web Audio sound effects
export function playStudioSound(type: 'click' | 'shuffle' | 'hover' | 'submit') {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'shuffle') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'submit') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch {
    // Audio context may be restricted before user gesture
  }
}
