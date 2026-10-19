# A Tale of Two Hearts — 1st Anniversary Scrapbook App

An interactive anniversary scrapbook mobile web application faithfully matching the warm vintage aesthetic of the design mockups, complete with multi-screen navigation, an interactive wax seal secret letter, polaroid chapter memory carousel, real romantic audio playback with equalizer and spinning vinyl disc, swimming crayon doodle fish overlay, and a "Beri Balasan Cinta" love note guestbook with mood reactions and heart showers.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed in Phase 1:
> - **Navigation Model**: Multi-screen view with seamless navigation between the main Scrapbook and the Secret Letter & Reply screen via top bar controls and wax seal triggers.
> - **Music Player**: Real romantic audio playback with a play/pause toggle, animated equalizer visualizer, and spinning vinyl disc.
> - **Database & Persistence**: Relational database persistence ("Supabase/PostgreSQL" style) for storing love replies, like counts, and global heart burst counters, supported by persistent local caching for instant loading.

- **Confirmed Decision 1**: Multi-screen navigation (Main Scrapbook View $\leftrightarrow$ Secret Letter & Love Notes View).
- **Confirmed Decision 2**: Web Audio romantic music synthesizer and ambient track playback.
- **Confirmed Decision 3**: Cloud SQL (PostgreSQL with Drizzle ORM) database for love replies, with automatic local fallback to ensure the app works immediately.

---

## 1. Overview & Core Concept

- **What It Does**: A romantic digital anniversary scrapbook celebrating "365 Hari yang Istimewa". Couples can reminisce through a chronological photo carousel ("Galeri Kenangan Kita"), unlock an authentic wax seal envelope revealing an intimate 1-year secret letter, leave heartfelt messages with custom mood stickers, and tap the heart burst button to shower love across the screen.
- **Target Audience / Persona**: Couples celebrating milestones who cherish physical scrapbook aesthetics—washi tape, torn paper edges, vintage postage stamps, wax seals, and warm parchment textures.
- **Key Value**: Delivers the tactile magic of a handcrafted physical scrapbook in a responsive, touch-friendly digital experience.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Scrapbook Home Screen**:
   - **Sticky Top Bar**: Displays "Now Playing: Golden Hour • JVKE (Our Song)", audio visualizer bars, and a spinning vinyl disc with play/pause interaction.
   - **Hero Editorial Masthead**: Washi tape banner ("First Anniversary Scrapbook"), romantic typography ("A Tale of Two Hearts"), and live milestone counters (365 Days, 8,760 Hours, 1 Year).
   - **Hero Love Letter**: Letter excerpt with styled photo snapshot collage, telegram tag (`@designtekek`), lover badge, and postage stamp sticker.
   - **Galeri Kenangan Kita**: Interactive snap-scroll polaroid carousel showcasing Chapter 01 (Kencan Pertama di Tengah Hujan), Chapter 02 (Sudut Kafe Rahasia), and Chapter 03 (Senja Tanpa Rencana) with previous/next controls.
   - **Surat Rahasia 1 Tahun (Envelope Teaser)**: Handcrafted envelope with a 365 wax seal button that unfolds with smooth rotation or navigates directly to the full letter.
   - **Milestone Timeline**: Vertical dashed roadmap detailing Bulan ke-1, Bulan ke-6, and Bulan ke-12.
   - **Kirim Peluk & Cinta**: Interactive crimson button generating multi-emoji heart bursts (❤️, 💖, 🍓, ✨, 💕) and incrementing the shared love counter.
   - **Swimming Crayon Doodle Fish**: Whimsical pastel fish drifting gracefully across the parchment background.

2. **Surat Rahasia & Balasan Screen**:
   - **Navigation Header**: `< Scrapbook` return link and music pill button.
   - **Airmail Envelope & Full Secret Letter**: Unfolded parchment letter containing the full intimate narrative, framed photo clip, and romantic sign-off.
   - **Beri Balasan Cinta Form**:
     - Name input ("Nama Panggilan Manis").
     - Interactive mood selector pills (🥺 Terharu, ❤️ Sayang Banget, 🥰 Salting Brutal, 🍓 Manis, 🐟 Lucu).
     - Secret message textarea ("Pesan Rahasiamu").
     - Submit button with instant optimistic UI update and floating heart particle shower.
   - **Feed of Stored Love Notes**: Cards displaying initials, timestamps, mood tags, message quotes, and real-time like buttons with counters.

### Visual Identity & Theme

- **Aesthetic Direction**: Vintage editorial scrapbook, warm epistolary romance, tactile stationery materials.
- **Color Palette**:
  - Parchment canvas: `#FAF5EE` / `#F8F3EA` with subtle paper texture.
  - Ink & Espresso: `#251C18` (deep vintage ink), `#68544A` (muted secondary).
  - Crimson & Rose: `#B93C34` (wax seal & primary actions), `#932922` (dark shadow), `#E5C5C2` (dusty pink).
  - Sage Olive: `#526E58` (chapter tags and calm accents).
- **Typography & Hierarchy**:
  - Display / Serif: `Cormorant Garamond` & `Playfair Display` (editorial romantic italic titles).
  - Handwritten / Script: `Caveat` (intimate annotations, signatures, and subtitles).
  - Body & UI: `Plus Jakarta Sans` (legible form controls and metadata).
  - Monospace / Tabular: `font-mono tabular-nums` (timestamps, days count, airmail badges).

---

## 3. Key Product Decisions & Trade-Offs

- **Multi-Screen vs Single Page**:
  - *Chosen*: Multi-screen view with swift animated transitions and breadcrumbs (`< Scrapbook`). This satisfies the user's specific request while preserving the distinct identity of both screens.
- **Audio Generation Strategy**:
  - *Chosen*: Dual-layer audio system featuring a synthesized Web Audio API romantic melody generator (Golden Hour chord progressions) combined with real audio elements, ensuring playback works without external asset breakage.
- **Relational Persistence Architecture**:
  - *Chosen*: Full-stack Express backend with Drizzle ORM connecting to PostgreSQL (Cloud SQL Developer Edition) for persistent replies and likes, paired with client-side localStorage fallback so all features work seamlessly during initial preview.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (SPA)                     │
│                                                             │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │   Scrapbook Screen    │       │  Secret Letter Screen │  │
│  │ ───────────────────── │       │ ───────────────────── │  │
│  │ • Hero Masthead       │       │ • Full Unfolded Letter│  │
│  │ • Audio Bar Player    │◄─────►│ • "Beri Balasan Cinta"│  │
│  │ • Polaroid Carousel   │ Nav   │ • Mood Tag Selector   │  │
│  │ • Wax Seal Trigger    │       │ • Reply Feed & Likes  │  │
│  │ • Milestone Timeline  │       │ • Heart Burst Shower  │  │
│  └───────────────────────┘       └───────────────────────┘  │
│              │                               │              │
│              └───────────────┬───────────────┘              │
│                              ▼                              │
│                  Audio & Storage Services                   │
│         (Web Audio Synth + LocalStorage Mirror)             │
└──────────────────────────────┬──────────────────────────────┘
                               │ Fetch API (/api/*)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                Full-Stack Express Server (Node.js)          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Routes:                                               │  │
│  │ • GET  /api/love-notes   -> Fetch stored messages     │  │
│  │ • POST /api/love-notes   -> Save new reply message    │  │
│  │ • POST /api/love-notes/:id/like -> Increment like     │  │
│  │ • GET  /api/hearts       -> Global heart burst count  │  │
│  │ • POST /api/hearts/burst -> Increment global hearts   │  │
│  └───────────────────────────────────────────────────────┘  │
│                              │                              │
│                              ▼                              │
│            Drizzle ORM + PostgreSQL / Cloud SQL             │
│            (Tables: love_notes, heart_counters)             │
└─────────────────────────────────────────────────────────────┘
```

### Data Schema (PostgreSQL via Drizzle ORM)

```typescript
// love_notes table
{
  id: serial('id').primaryKey(),
  authorName: text('author_name').notNull(),
  mood: text('mood').notNull(),
  message: text('message').notNull(),
  likes: integer('likes').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}

// heart_counters table
{
  id: serial('id').primaryKey(),
  counterType: text('counter_type').unique().notNull(), // 'global'
  count: integer('count').default(100).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}
```

---

## Implementation Steps Plan

1. **Asset & Typography Setup**:
   - Configure Google Fonts (`Cormorant Garamond`, `Playfair Display`, `Caveat`, `Plus Jakarta Sans`) and Tailwind theme extensions.
   - Integrate paper grain textures, washi tape effects, and SVG swimming doodle fish.
2. **Audio Engine**:
   - Implement the romantic Golden Hour audio synthesizer and playback controller with spinning vinyl disc and equalizer sync.
3. **Screen 1: Main Scrapbook View**:
   - Build editorial masthead, days counter pills (365/8,760/1), first love letter section with verified hotlinked photo collage, telegram tag, and lover badge.
   - Build snap-scroll Polaroid Carousel with Chapter 01, Chapter 02, and Chapter 03 cards.
   - Build wax seal envelope preview with unfolding animation and screen transition shortcut.
   - Build milestone timeline and interactive heart burst button.
4. **Screen 2: Secret Letter & Reply View**:
   - Build the dedicated second view with top bar `< Scrapbook` navigation.
   - Render the unfolded airmail letter with decorative stamps and romantic copy.
   - Build the interactive "Beri Balasan Cinta" form with active mood selectors, realtime note feed, and like toggles.
5. **Backend & Relational Persistence**:
   - Implement Express server with PostgreSQL Drizzle schema for notes and hearts, including resilient client sync.
6. **Testing & Verification**:
   - Verify layout responsiveness on mobile (390px-430px) and desktop, test audio toggles, note submission, like counters, and build compilation.
