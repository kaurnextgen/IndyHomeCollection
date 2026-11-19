import { TargetBuilder, ThemeId } from '../types';

export interface PromptConfig {
  builder: TargetBuilder;
  theme: ThemeId;
  primaryGoal: string;
  regionalFocus: string;
}

export const THEMES_INFO = {
  editorial: {
    name: 'Warm Editorial',
    primary: '#0F172A (Deep Obsidian Navy)',
    accent: '#C5A880 (Warm Champagne Gold)',
    bg: '#F8F6F0 (Sand Linen)',
    font: 'Playfair Display + Plus Jakarta Sans',
  },
  earthy: {
    name: 'Modern Earthy',
    primary: '#1E3A2F (Deep Forest Sage)',
    accent: '#C26D53 (Warm Terracotta)',
    bg: '#F6F4EE (Linen White)',
    font: 'Plus Jakarta Sans + DM Sans',
  },
  luxury: {
    name: 'Classic Luxury',
    primary: '#111113 (Obsidian Charcoal)',
    accent: '#D4AF37 (Brushed Muted Gold)',
    bg: '#FCFCFD (Crisp Marble)',
    font: 'Playfair Display + DM Sans',
  },
  midwestern: {
    name: 'Fresh Midwestern',
    primary: '#1E293B (Slate Indigo)',
    accent: '#D97706 (Amber Glow)',
    bg: '#F5F7FA (Crisp Mist)',
    font: 'Plus Jakarta Sans + DM Sans',
  },
};

export const BUILDER_DETAILS: Record<TargetBuilder, { name: string; tag: string; description: string; bestFor: string }> = {
  bolt: {
    name: 'Bolt.new',
    tag: 'Full-Stack Vite + React + Tailwind v4',
    description: 'Generates full-stack code with React 19, Tailwind CSS, Lucide icons, and interactive client state.',
    bestFor: 'Rapid interactive prototyping and instant sandbox execution',
  },
  lovable: {
    name: 'Lovable.dev',
    tag: 'Supabase + shadcn/ui + React SPA',
    description: 'Optimized for Lovable.dev component scaffolding with clean semantic tokens and state hooks.',
    bestFor: 'Design-centric web apps with integrated database hooks',
  },
  v0: {
    name: 'v0 by Vercel',
    tag: 'Next.js App Router + Tailwind + shadcn',
    description: 'Formatted for v0 generation with modular React components, clean JSX, and accessible ARIA.',
    bestFor: 'Next.js components and polished landing page blocks',
  },
  framer: {
    name: 'Framer AI',
    tag: 'Canvas Layout + Micro-Interactions + CMS',
    description: 'Structured with section layout hierarchies, typography tokens, and responsive break-points.',
    bestFor: 'Visual design, fluid editorial transitions, and CMS binding',
  },
  replit: {
    name: 'Replit Agent',
    tag: 'Full-Stack Node/Express + React',
    description: 'Engineered with client routes, Express proxy endpoints, and persistent storage templates.',
    bestFor: 'Full-stack applications with custom backend integrations',
  },
};

export function generateMasterPrompt(config: PromptConfig): string {
  const currentTheme = THEMES_INFO[config.theme];
  const builder = BUILDER_DETAILS[config.builder];

  return `<!-- ==============================================================================
     MASTER WEBSITE GENERATION PROMPT: INDY HOME COLLECTION (REAL ESTATE)
     TARGET BUILDER: ${builder.name} (${builder.tag})
     METHODOLOGY: UNDERSTAND → RESEARCH → ANALYSE → STRATEGIZE → STRUCTURE → DESIGN → WRITE → VALIDATE
     STRICT NO-FABRICATION RULE: Strictly active (No fake awards, fake statistics, or invented reviews)
============================================================================== -->

You are an award-winning Senior Website Strategist, Creative Director, and Conversion-Focused Lead Architect.
Your task is to build the complete, high-converting, production-ready website for **Indy Home Collection**.

Follow every instruction below with extreme precision. Do not skip sections, do not use dead buttons, and do not invent fake business credentials.

---

### 1. CORE BUSINESS PROFILE & TRUTH GROUNDING
- **Brand Name**: Indy Home Collection
- **Industry / Category**: Real Estate (Residential & Investment)
- **Primary Market / Location**: Indiana, USA (Focusing on ${config.regionalFocus || 'Greater Indianapolis, Carmel, Fishers, Zionsville, Westfield, and statewide Indiana'})
- **Trust Anchor & Slogan**: "Your Neighbour Realtor" (Accessible, authentic, hyper-local guidance without intimidating corporate jargon)
- **Direct Contact Phone**: (317) 408-9532 (Click-to-call must be primary and active everywhere)
- **Primary Core Services**:
  1. Buying a Home (First-time buyers, move-up homes, neighborhood matching)
  2. Selling a Home (Precision pricing, staging guidance, stress-free negotiations)
  3. Investment Properties (Indiana rental yields, cash flow modeling, multi-unit & turnkey single-family)
  4. Relocating to Indiana (School districts, commute corridors, turnkey neighborhood orientation)
- **Primary Conversion Goal**: ${config.primaryGoal || 'High-intent direct phone calls to (317) 408-9532, consultation bookings, and instant home valuation lead captures'}

> **CRITICAL RULE ON BUSINESS FACTS**:
> Never fabricate testimonials, star counts ("4.9/5 based on 200 reviews"), awards ("#1 Realtor in Indiana 2024"), founding dates, or fake transaction numbers ("$50M+ Sold"). 
> If a testimonial slot or license number is rendered, use explicit placeholder syntax: \`[Client Testimonial — Available upon verified closing]\` or \`[Indiana Real Estate License # Pending]\`.
> Ground all authority strictly in: local Indiana neighborhood mastery, personalized neighbor-first accessibility, transparent market data, and immediate direct line to us.

---

### 2. DESIGN CONSTITUTION & VISUAL IDENTITY (${currentTheme.name})
- **Aesthetic Direction**: High-end Midwestern warmth meets refined editorial elegance. Quiet confidence, clean architectural lines, generous breathing room.
- **Color Palette Allocation (Strict 60-30-10 Distribution)**:
  - **60% Dominant Canvas**: ${currentTheme.bg}
  - **30% Structural Surfaces & Typography**: ${currentTheme.primary}
  - **10% High-Intent Accent**: ${currentTheme.accent} (Reserved strictly for primary action buttons, focused inputs, and interactive highlights)
- **Typography Rules**:
  - Display / Hero Headings: \`${currentTheme.font.split('+')[0].trim()}\` (Tight tracking, text-wrap balance, clamp(2.25rem, 4vw, 3.75rem))
  - Body Copy & Navigation: \`${currentTheme.font.split('+')[1]?.trim() || 'DM Sans'}\` (15px-16px, 1.6 line height, 65-75ch measure)
  - Data / Metrics / Phone: Tabular figures (\`font-mono tabular-nums\`)
- **Zero-Pill Discipline**:
  - Never place static metadata (tags, dates, counts) inside capsule pills or candy-colored badges. Use clean unboxed text separated by \`·\` or \`/\`.
  - Buttons and interactive filter tabs may use clean rounded rectangles, never pill sandwiches on cards.
- **Top Navigation Bar Contract**:
  - Exactly 3 zones on a single row:
    1. Brand Wordmark ("Indy Home Collection" in display face)
    2. 4-5 single-line nav links ("Buy", "Sell", "Invest", "Relocate", "Valuation")
    3. Exactly 1 primary CTA button ("Call (317) 408-9532" or "Book Consultation")
  - No location pills or subtitle clutter attached to the logo mark in the header.

---

### 3. CONVERSION ARCHITECTURE & PAGE FLOW

Sequence the page as a cohesive persuasion funnel:
\`\`\`
[1. Hero with Direct Call] → [2. Real Estate Pillars] → [3. Indiana Community Guide] → [4. Interactive Home Valuation] → [5. Investment ROI Calculator] → [6. Neighbour Promise / Trust] → [7. Consultation Booking & Direct Call CTA] → [8. Quiet Footer]
\`\`\`

#### Section 1: Hero Section
- **Headline**: "Your Trusted Indiana Neighbor in Every Real Estate Move."
- **Sub-headline**: "Guiding you through buying, selling, investing, and relocating across Greater Indianapolis and Central Indiana with genuine local care and dedicated one-on-one attention."
- **Primary CTA**: Button with phone icon linking to \`tel:3174089532\` — \`"Call (317) 408-9532"\`.
- **Secondary CTA**: \`"Schedule Consultation"\` (triggers booking modal).
- **Hero Image**: Cinematic high-resolution Indiana residence at twilight with glowing interior warmth and manicured landscape.
- **Proof Strip**: Simple unboxed trust points: \`Indiana Residential & Investment Specialist · Direct Line to Your Realtor · Personalized Market Strategies\`.

#### Section 2: Core Real Estate Pillars (Interactive Service Switcher)
Implement 4 dedicated tabs or asymmetric bento cards:
1. **Buying a Home**:
   - Scope: First-time buyers, luxury moves, and school-district targeting.
   - Deliverables: Custom MLS alerts, private off-market scouting, step-by-step closing timeline.
   - Action: "Start Buyer Consultation".
2. **Selling Your Home**:
   - Scope: Maximizing net proceeds with zero guessing.
   - Deliverables: In-depth Comparative Market Analysis (CMA), professional staging recommendations, targeted digital marketing.
   - Action: "Request Free Home Valuation".
3. **Investment Properties**:
   - Scope: Building generational wealth in Indiana's stable rental markets.
   - Deliverables: Cash-on-cash return modeling, cap rate analysis, turnkey vs. value-add vetting.
   - Action: "Explore Investment Opportunities".
4. **Relocating to Indiana**:
   - Scope: Seamless out-of-state transition.
   - Deliverables: Curated community guides (Carmel, Fishers, Zionsville, Indy), commute analysis, virtual FaceTime walkthroughs.
   - Action: "Request Relocation Packet".

#### Section 3: Indiana Communities & Neighborhood Explorer
Interactive neighborhood filter highlighting key Indiana areas:
- **Carmel (Hamilton Co.)**: Nationally ranked schools, Arts & Design District, Monon Trail, luxury custom estates.
- **Fishers (Hamilton Co.)**: Thriving tech hub, Geist Reservoir waterfront, Nickel Plate District, family communities.
- **Zionsville (Boone Co.)**: Historic brick Main Street, equestrian properties, charming village atmosphere.
- **Westfield (Hamilton Co.)**: Grand Park sports campus, rapid growth, premier planned neighborhoods.
- **Noblesville (Hamilton Co.)**: Historic courthouse square, Morse Reservoir, blend of historic charm and modern living.
- **Avon (Hendricks Co.)**: Four-star Avon schools, Washington Township Park, US-36 retail corridor, friendly family subdivisions.
- **Plainfield (Hendricks Co.)**: 30+ miles of paved trails, Hummel Park, Splash Island, rapid airport & I-70 logistics access.
- **Brownsburg (Hendricks Co.)**: Ranked safest town in Indiana, top 5% academic performance, motorsport heritage, Arbuckle Acres.
- **Greenwood (Johnson Co.)**: Center Grove schools, revitalized Old Town dining, Freedom Springs Aquatics, southside retail hub.
- **Whiteland (Johnson Co.)**: Peaceful southern suburb, Clark-Pleasant schools, large lots, exceptional appreciation potential.
- **Southport (Marion Co.)**: Close-knit historic southside enclave, mature tree canopies, 15-minute commute to downtown Indianapolis.
- **McCordsville (Hancock Co.)**: Rapidly growing northeast boomtown near Geist Reservoir, Mt. Vernon schools, new McCord Square downtown.
- **Indianapolis (Marion Co.)**: Historic Meridian-Kessler estates, cultural trails, urban vitality, Mass Ave & Fountain Square.
- **Bloomington & Statewide**: Indiana University flagship campus, limestone architecture, Lake Monroe, strong rental investment yields.
*Each card must include: Vibe summary, key highlights, and an interactive "Inquire About This Area" action.*

#### Section 4: Interactive Indiana Home Valuation Estimator
A functional, conversion-optimized valuation calculator:
- **Inputs**: Property Address, Indiana City/ZIP, Property Type (Single Family, Townhome, Condo), Square Footage slider (1,000–6,000 sq ft), Bed/Bath count, Condition status.
- **Live Output**: Real-time estimated price range calculation based on regional Indiana square-foot benchmarks.
- **Conversion Trigger**: "Get Our Personalized In-Depth CMA Report" with clean input fields for Name, Phone, and Email.

#### Section 5: Indiana Real Estate Investment & ROI Estimator
- **Inputs**: Purchase Price slider, Down Payment %, Estimated Monthly Rent, Interest Rate.
- **Outputs**: Estimated Monthly Mortgage, Net Cash Flow, Estimated Cap Rate (tabular figures).
- **CTA**: "Review Off-Market Investment Deals with Us".

#### Section 6: "The Neighbour Realtor Promise" (Authentic Trust)
- Focus on authentic, approachable value:
  - **No High-Pressure Sales**: Transparent guidance focused on your long-term family and financial well-being.
  - **Direct Accessibility**: You work directly with us at (317) 408-9532, never an outsourced assistant.
  - **Local Indiana Commitment**: Deep neighborhood understanding, school insights, and contractor networks.
  - *Strict rule: Do NOT insert fabricated 5-star badges or invented quotes.*

#### Section 7: Schedule a Consultation & Contact Section
- Dual-action panel:
  - Left: Direct Phone Box: **"Have a quick question? Call or text (317) 408-9532 now."** with instant tap-to-call.
  - Right: Clean interactive booking form with Name, Phone, Email, Service Interest (Buying, Selling, Investing, Relocating), and Preferred Contact Time.

#### Section 8: Quiet Footer
- Wordmark: "Indy Home Collection — Your Neighbour Realtor"
- Direct Contact: Phone: (317) 408-9532 · Service Area: Indiana, USA
- Equal Housing Opportunity statement: "Equal Housing Opportunity. Real Estate Services in Indiana."
- Clean unboxed navigation links.

---

### 4. TECHNICAL & ARCHITECTURAL IMPLEMENTATION SPECS
- **Framework**: ${builder.tag}
- **Component Hierarchy**:
  - \`Header\`: Sticky top bar following 3-zone contract with responsive mobile drawer.
  - \`HeroSection\`: Responsive 2-column or cinematic hero with functional CTA buttons.
  - \`ServicesSection\`: Interactive tabbed or bento grid with stateful service card transitions.
  - \`CommunitiesSection\`: Filterable grid with category filtering and interactive modal details.
  - \`ValuationCalculator\`: Stateful estimation math with form submission state and confirmation toast.
  - \`InvestmentCalculator\`: Dynamic monthly mortgage and ROI formula with tabular figures.
  - \`ContactBooking\`: Form validation (regex phone and email check) with immediate success confirmation.
- **Interactive Handlers Required**:
  - Every button MUST trigger a working handler (phone dialer, modal open, form submit, tab switch).
  - Provide complete feedback states: loading, validation errors, and success confirmation toasts.
  - Accessible keyboard focus rings (\`focus-visible:ring-2\`) and WCAG AA contrast compliance.

Build this complete real estate application now with impeccable precision, zero placeholder fluff, and full interactive fidelity.`;
}
