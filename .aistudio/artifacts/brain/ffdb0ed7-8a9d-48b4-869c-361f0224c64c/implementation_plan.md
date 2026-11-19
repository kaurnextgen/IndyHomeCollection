# Haven by kaur — Master Real Estate Website & Prompt Engineering Suite

A dual-mode, production-ready platform delivering both the complete **Master Website Generation Prompt** (formatted for Lovable, Bolt, v0, Framer AI, and Replit) and a fully interactive **Live Real Estate Website Preview** for **Haven by kaur** ("Your Neighbour Realtor" in Indiana, USA).

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The strategic business parameters and clarification choices confirmed during Phase 1 have been synthesized into the core architecture:

- **Confirmed Business Identity**: "Haven by kaur", operating under the authentic trust signal *"Your Neighbour Realtor"*.
- **Confirmed Services**: Buying Homes, Selling Homes, Investment Properties, and Relocation Assistance.
- **Confirmed Direct Action & Contact**: Primary CTA is direct calling to **(317) 408-9532**, complemented by high-intent consultation scheduling, Indiana home valuation, and relocation inquiry capture.
- **Confirmed Indiana Regional Coverage**: Comprehensive Indiana scope covering the northern Indianapolis growth corridor (Carmel, Fishers, Westfield, Zionsville, Noblesville), Greater Indianapolis, and statewide investment/relocation.
- **Confirmed Visual Themes ("All")**: The application incorporates all four refined design palettes with an active theme switcher:
  1. *Warm Editorial (Default Signature)*: Deep Obsidian Navy (`#0F172A`), Sand Linen (`#F8F6F0`), and Champagne Gold (`#C5A880`).
  2. *Modern Earthy*: Deep Forest Sage (`#1E3A2F`), Soft Cream (`#F6F4EE`), and Warm Terracotta (`#C26D53`).
  3. *Classic Luxury*: Rich Onyx (`#111113`), Crisp Marble (`#FCFCFD`), and Muted Brushed Gold (`#D4AF37`).
  4. *Fresh Midwestern*: Slate Indigo (`#1E293B`), Warm Gray (`#F1F5F9`), and Amber Glow (`#D97706`).
- **Strict Anti-Fabrication Guarantee**: In accordance with Master Prompt Rule 5, no fabricated reviews, fictitious awards, or fake statistics are invented. The brand is built on genuine community knowledge, local Indiana neighborhood mastery, and accessible neighborly service.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. **Master Prompt Studio**: Generates, validates, customizes, and exports the authoritative **Master Website Generation Prompt** ready to paste into Bolt, Lovable, v0, Replit, Framer AI, or Wix Studio. Users can switch target AI builders, toggle prompt depth, inspect structured XML/Markdown sections, and copy with one click.
  2. **Interactive Live Website Preview**: Renders the complete, high-converting digital storefront for *Haven by kaur*, featuring the hero section with direct click-to-call, interactive service selector, Indiana community guide, instant home valuation calculator, mortgage/investment ROI estimator, and lead capture modals.
- **Target Audience / Persona**:
  - Indiana home buyers, sellers, relocators, and investors seeking an approachable, dedicated local expert ("Your Neighbour Realtor").
  - The business owner / marketer needing production-ready AI website builder prompts with zero guesswork.
- **Key Value**: Delivers both immediate deployment readiness (the exact master prompt code for any AI builder) and an exquisite, functioning reference website that demonstrates conversion-focused UI/UX in real time.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Studio Header & Mode Switcher**:
   - Clean 3-zone header with *Haven by kaur* typography mark, seamless view switcher (`Website Preview` vs. `Master Prompt Studio`), theme switcher (Warm Editorial, Modern Earthy, Classic Luxury, Fresh Midwestern), and quick dial button for `(317) 408-9532`.
2. **Website Preview Flow**:
   - **Hero Section**: High-impact editorial headline (*"Your Trusted Indiana Neighbor in Every Real Estate Move"*), neighborhood badges, primary CTA button `"Call (317) 408-9532"`, and secondary `"Schedule Consultation"`.
   - **Interactive Indiana Neighborhood Explorer**: Filterable spotlight covering Carmel, Fishers, Zionsville, Westfield, Downtown Indianapolis, and Bloomington with key market attributes (school ratings, commute profiles, median price trends, local lifestyle).
   - **Core Pillars (4 Service Tracks)**:
     - *Buying*: Step-by-step buyer roadmap & off-market search request.
     - *Selling*: Fast comparative market analysis (CMA) inquiry & home staging guide.
     - *Investment*: Cash-flow property criteria & Indiana rental yield analysis.
     - *Relocation*: Indiana arrival packet & neighborhood match questionnaire.
   - **High-Intent Conversion Tools**:
     - *Instant Home Valuation Estimator*: Interactive square footage, condition, and ZIP code calculator with instant range and detailed valuation report request.
     - *Mortgage & Investment Estimator*: Loan amount, interest rate, and rental yield preview.
     - *Direct Contact & Booking Modal*: Working booking form with date picker and direct call triggers.
3. **Master Prompt Studio Flow**:
   - **Builder Selector**: Tailors formatting tags and technical requirements specifically for Lovable, Bolt.new, v0.dev, Framer AI, or Replit.
   - **Prompt Sections Explorer**: Tabbed or full-document view detailing Context, Architecture, Visual Constitution, Conversion Architecture, Anti-Fabrication Constraints, and Component Specification.
   - **Interactive Prompt Customizer**: Allows adjusting tone, primary goal weighting, and color codes with real-time prompt updates.
   - **Copy & Export Engine**: 1-click clipboard copy, `.md` download, and token count estimator.

#### Visual Identity & Theme
- **Aesthetic Direction**: Refined Midwestern luxury meets approachable neighborly warmth. High contrast, generous whitespace, strict typographic hierarchy, and zero AI slop (no generic pill badge sandwiches, no fake telemetry, no arbitrary percentage scores).
- **Typography Pairings**:
  - Display / Headings: `Playfair Display` or `Plus Jakarta Sans` for sophisticated elegance.
  - Body Copy: `DM Sans` / `Plus Jakarta Sans` for legible, scannable reading.
  - Data / Metrics: `font-mono tabular-nums` for property metrics, pricing, and phone numbers.
- **Component Styling & Layout**:
  - 1440px desktop baseline with full responsive adaptation down to 360px mobile.
  - Strict Top Bar Contract (Wordmark — 4 Nav Links — 1 Primary Action).
  - Single-elevation cards with hairline borders (`1px solid var(--border)`).
  - Claim-to-proof adjacency and unboxed metadata separated by typographic bullets (`·`).

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual-Mode Architecture (Live Site + Master Prompt Studio)**
  - *Chosen Approach*: Embed both the live functional website and the Master Prompt Engineer workspace in a unified tabbed interface.
  - *Why*: Gives the user immediate utility: they can directly present/use the live site, or copy the expertly engineered prompt into Lovable/Bolt/v0/Framer whenever desired.
  - *Alternatives Considered*: Showing only raw prompt text in a codeblock (poor user experience) or showing only a website without the prompt requested by the user prompt framework.
- **Decision 2: Anti-Fabrication & Realistic Content Generation**
  - *Chosen Approach*: Ground all copy in authentic Indiana market realities (actual cities: Carmel, Fishers, Zionsville, Indy; authentic services; real contact phone number `317-408-9532`). Use honest, neighbor-focused value propositions instead of fictitious "500+ Homes Sold" or fabricated celebrity client quotes.
  - *Why*: Directly obeys Rule 5 of the Master Prompt Engineer constitution ("Never invent business facts").
- **Decision 3: Multi-Theme Engine with Dynamic Variable Injection**
  - *Chosen Approach*: Manage themes via CSS variables and Tailwind classes so both the preview and the master prompt adjust to the user's selected palette in real time.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HAVEN BY KAUR APP                               │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (Brand Wordmark · Mode Switch · Theme Switch · CTA)    │
├───────────────────────────────────┬────────────────────────────────────┤
│   MODE 1: LIVE WEBSITE PREVIEW    │   MODE 2: MASTER PROMPT STUDIO     │
│  ┌─────────────────────────────┐  │  ┌──────────────────────────────┐  │
│  │ Hero & Click-to-Call (484..)│  │  │ Builder Selector             │  │
│  │ Core Services (Buy/Sell/Inv)│  │  │ (Bolt / Lovable / v0 / Framer│  │
│  │ Indiana Community Guides    │  │  ├──────────────────────────────┤  │
│  │ Valuation & ROI Calculators │  │  │ Dynamic Master Prompt Engine │  │
│  │ Consultation Booking Modal  │  │  │ (Markdown, XML, Copy, Export)│  │
│  │ Quiet Footer & Disclaimers  │  │  │ Prompt Section Inspector     │  │
│  └─────────────────────────────┘  │  └──────────────────────────────┘  │
├───────────────────────────────────┴────────────────────────────────────┤
│ State Management: Active Tab, Selected Theme, Active Builder,          │
│ Valuation Form State, Consultation Booking State, Toast Notifications  │
└────────────────────────────────────────────────────────────────────────┘
```

#### Data Model & Working Handlers
- **State Stores**:
  - `currentMode`: `'preview' | 'prompt-studio'`
  - `activeTheme`: `'editorial' | 'earthy' | 'luxury' | 'midwestern'`
  - `selectedBuilder`: `'lovable' | 'bolt' | 'v0' | 'framer' | 'replit'`
  - `valuationData`: `{ address, propertyType, squareFeet, bedrooms, bathrooms, condition, email, phone }`
  - `bookingData`: `{ name, email, phone, serviceType, preferredDate, preferredTime, notes }`
  - `toastState`: active feedback notifications for copy, form submissions, and inquiries.
- **Interactive Component Handlers**:
  - Real-time valuation estimation algorithm based on Indiana market median benchmarks.
  - Dynamic prompt generator compiling the exact Master Website Prompt with live variable interpolation.
  - Copy-to-clipboard with fallback and tactile visual feedback.
  - Working lead capture submission modal with validation and instant confirmation screens.
