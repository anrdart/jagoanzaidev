# Jagoan Zaidev - Interactive Course Platform Design

**Date:** 2026-04-10
**Status:** Approved Design
**Author:** Claude & User

---

## 1. Overview

**Nama:** Jagoan Zaidev - Interactive Learning Platform untuk belajar server dari nol.

**Problem:** Pemula (non-IT) kesulitan memahami konsep server, domain, dan hosting karena materi yang tersedia terlalu teknis dan berbahasa Inggris.

**Solution:** Platform edukasi interaktif dengan bahasa Indonesia santai ("bahasa tongkrongan"), visual pastel playful, dan sistem course terstruktur dengan progression.

---

## 2. UI/UX Design: Pastel Playful

### 2.1 Visual Style

**Color Palette:**
```css
pastel: {
  slate: '#f1f5f9',      // background utama
  sage: '#e8f3ea',       // accent hijau
  blue: '#e3f2fd',       // accent biru
  cream: '#faf9f7',      // background alternatif
  coral: '#ffede4',      // accent oranye
  mint: '#e6f7f0',       // accent teal
  lavender: '#e8e3f3',   // accent ungu
  peach: '#ffe8d6',      // accent peach
  lemon: '#fff9c4',      // accent kuning
  bubblegum: '#fce4ec',  // accent pink
}
accent: {
  blue: '#4a90a4',
  sage: '#6b9b7a',
  coral: '#d4765c',
}
text: {
  primary: '#1e293b',
  secondary: '#475569',
  muted: '#64748b',
}
```

**Typography:**
- Headings: `Quicksand` atau `Nunito` (rounded sans-serif)
- Body: `Plus Jakarta Sans` (readability)

**Visual Elements:**
- Rounded corners: `rounded-3xl` standard, `rounded-[2rem]` untuk ekstrem
- Multi-layer soft shadows untuk efek "pop"
- Organic blob shapes sebagai dekorasi background
- Floating elements dengan subtle animation
- Sticker-like badges

### 2.2 Animation Principles

- Spring-based physics (Framer Motion)
- Staggered entrance untuk multiple elements
- Smooth card transitions pada swipe
- Micro-interactions pada hover/tap
- Progress bar animations
- Confetti untuk achievements

---

## 3. Learning System

### 3.1 Learning Modes

| Mode | Deskripsi | Navigasi |
|------|-----------|----------|
| **Curated Modules** | Pilih modul sesuai kebutuhan, bebas explore | Pick any card |
| **Learning Path** | Jalur belajar linear, step-by-step | Sequential |
| **Story Mode** | Narrative journey dengan karakter progression | Sequential with story |

### 3.2 Progression Levels

| Level | Fokus | Unlock Criteria |
|-------|-------|-----------------|
| **Basic** | Quick Start Practical | Default unlocked |
| **Fundamental** | Web Hosting Focused | 70%+ on Basic quiz |
| **Jagoan** | Server Fundamentals Complete | 70%+ on Fundamental quiz |

### 3.3 Assessment System

- **Pass threshold:** 70%
- **Retry limit:** 3 attempts per level
- **Question types:** Multiple choice
- **Practical tasks:** Screenshot submission (simulated for MVP)
- **Score display:** Stars (1-5) + percentage

---

## 4. Course Content

### 4.1 Content Sources (Credited)

- Dicoding Academy
- IDN Hosted Blog
- Niagahoster Knowledge Base
- Rumahweb Tutorial
- DigitalOcean Community (translated)

### 4.2 Level Content

**LEVEL BASIC (5 cards + quiz)**
1. Apa itu Website & Kenapa Butuh Server?
2. Cara Cepat Beli Domain
3. Cara Pilih & Beli Hosting
4. Connect Domain ke Hosting
5. Upload Website Pertamaku
Quiz: 5 soal

**LEVEL FUNDAMENTAL (5 cards + quiz)**
1. Jenis-Jenis Hosting
2. Shared Hosting Deep Dive
3. Kapan Waktu Tepat Upgrade ke VPS?
4. VPS: Apa, Kenapa, Kapan
5. Scaling Strategy
Quiz: 7 soal + praktik

**LEVEL JAGOAN (7 cards + quiz)**
1. Server Hardware & OS
2. Linux Command Line Dasar
3. DNS Deep Dive
4. Server Security
5. Backup & Disaster Recovery
6. Monitoring & Troubleshooting
7. Performance Optimization
Quiz: 10 soal + praktik komprehensif

---

## 5. Technical Architecture

### 5.1 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro (React integration) |
| State Management | Zustand / React Context |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Auth (optional) | Supabase |
| Storage | localStorage (default) + Supabase (if logged in) |

### 5.2 State Structure

```typescript
interface AppState {
  // Navigation
  currentMode: 'curated' | 'path' | 'story' | null
  currentLevel: 'basic' | 'fundamental' | 'jagoan' | null
  currentCardIndex: number

  // Progress
  unlockedLevels: ('basic' | 'fundamental' | 'jagoan')[]
  quizScores: {
    basic: number | null
    fundamental: number | null
    jagoan: number | null
  }

  // Auth
  isLoggedIn: boolean
  userId: string | null

  // Actions
  setMode: (mode) => void
  setLevel: (level) => void
  nextCard: () => void
  previousCard: () => void
  unlockLevel: (level) => void
  saveQuizScore: (level, score) => void
  syncProgress: () => Promise<void>
}
```

### 5.3 Data Flow

```
User Action → State Update → localStorage + (Supabase if logged in)
```

### 5.4 Supabase Schema (optional login)

```sql
-- user_progress
user_id | current_mode | current_level | current_card_index | updated_at

-- quiz_results
user_id | level | score | completed_at

-- unlocked_levels
user_id | level | unlocked_at
```

---

## 6. Component Architecture

```
App
├── Layout
│   ├── Header
│   └── Footer
├── Hero (existing, modified CTA)
├── ModeSelection (NEW)
├── LoginChoiceDialog (NEW)
├── LevelSelection (NEW)
├── CourseDeck (NEW)
│   ├── ProgressHeader
│   ├── CardStack
│   │   ├── ContentCard
│   │   ├── QuizCard
│   │   └── PracticalTaskCard
│   └── CardNavigation
├── QuizResult (NEW)
└── Auth (NEW, optional)
```

### 6.1 UI Components

- `BlobButton` - CTA dengan bentuk organik
- `FloatingCard` - Kartu dengan floating animation
- `ProgressBar` - Progress dengan pastel colors
- `LockBadge` - Indikator level terkunci
- `StarRating` - Rating bintang untuk quiz

### 6.2 Course Components

- `ContentCard` - Kartu materi
- `QuizCard` - Kartu quiz dengan pilihan ganda
- `PracticalCard` - Kartu tugas praktik
- `CardDeck` - Container dengan swipe logic

### 6.3 Layout Components

- `ModeSelector` - Pilihan 3 mode belajar
- `LevelSelector` - Pilihan level dengan lock/unlock state
- `ProgressHeader` - Header dengan progress bar dan level indicator

---

## 7. User Flow

```
Homepage
  ↓ Click "Mulai Belajar Sekarang"
Mode Selection (Curated/Path/Story)
  ↓ Select Mode
Login Choice (Tanpa Login / Login Google)
  ↓ Select/Skip Login
Level Selection (Basic unlocked, others locked)
  ↓ Select Basic
Course Cards (Swipe/Click navigate)
  ↓ Complete all cards
Quiz (5-10 soal)
  ↓ Score ≥ 70%
Quiz Result + Unlock Next Level
  ↓ Continue
Level Selection (Fundamental now unlocked)
  ↓ ...repeat until Jagoan
```

---

## 8. Implementation Phases

### Phase 1: Foundation
- Setup project structure
- Install dependencies (Framer Motion, Zustand)
- Create base UI components with pastel playful style
- Implement state management

### Phase 2: Course System (No Login)
- Mode selection UI
- Level selection UI
- Card deck with swipe/navigation
- Content cards for Basic level
- Quiz system
- Local storage persistence

### Phase 3: Content Expansion
- Fundamental level content
- Jagoan level content
- Practical task cards

### Phase 4: Optional Features
- Supabase integration
- Google auth
- Progress sync
- Story mode narrative

---

## 9. Success Criteria

- ✅ Pastel playful UI terimplementasi
- ✅ 3 mode belajar berfungsi
- ✅ 3 level dengan content lengkap
- ✅ Quiz system dengan 70% pass threshold
- ✅ Progress tersimpan (localStorage)
- ✅ Swipeable card interface
- ✅ Content credited to sources
- ✅ Bahasa Indonesia santai

---

## 10. Notes

- No timeline constraint - work at sustainable pace
- Scope can be expanded later based on feedback
- Design system reusable for future content
- Mobile-first responsive design
