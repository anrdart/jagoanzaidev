# Multi-Mode Learning System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 3 completely different learning modes (Path, Curated, Story) with independent progress tracking, each on its own route with unique UI.

**Architecture:** Multi-page Astro application with route-based mode separation. Each mode has dedicated components and Zustand store. Shared auth, isolated progress.

**Tech Stack:** Astro, React, Zustand, Framer Motion, Tailwind CSS, Lucide React

---

## File Structure Map

```
src/
├── pages/
│   ├── index.astro                    # [MODIFY] Landing page
│   ├── path/
│   │   └── index.astro                # [CREATE] Learning Path route
│   ├── curated/
│   │   └── index.astro                # [CREATE] Curated Modules route
│   └── story/
│       └── index.astro                # [CREATE] Story Mode route
│
├── components/
│   ├── path/                          # [MOVE] Existing components
│   │   ├── LevelSelector.tsx
│   │   ├── CardDeck.tsx
│   │   ├── ContentCard.tsx
│   │   ├── QuizCard.tsx
│   │   └── course/                   # [MOVE] Course components
│   ├── curated/                       # [CREATE] New components
│   │   ├── TopicGrid.tsx
│   │   ├── TopicCard.tsx
│   │   ├── TopicViewer.tsx
│   │   └── ProgressTracker.tsx
│   └── story/                         # [CREATE] New components
│       ├── AdventureMap.tsx
│       ├── StoryNode.tsx
│       ├── StoryViewer.tsx
│       └── CharacterDialog.tsx
│
├── stores/
│   ├── pathStore.ts                   # [RENAME] From useCourseStore.ts
│   ├── curatedStore.ts                # [CREATE] New store
│   └── storyStore.ts                  # [CREATE] New store
│
└── content/
    ├── path-data.ts                   # [MOVE] Course data from course-data.ts
    ├── curated-data.ts                # [CREATE] 48 topics data
    └── story-data.ts                  # [CREATE] Story nodes data
```

---

## Task 1: Create Routing Structure

**Files:**
- Create: `src/pages/path/index.astro`
- Create: `src/pages/curated/index.astro`
- Create: `src/pages/story/index.astro`
- Modify: `src/components/layout/ModeSelection.tsx`

- [ ] **Step 1: Create /path route page**

Create `src/pages/path/index.astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
import { useMemo } from 'astro';
import ModeSelection from '../../components/layout/ModeSelection';
import LoginChoiceDialog from '../../components/layout/LoginChoiceDialog';
import Hero from '../../components/Hero';
import App from '../../components/App';

---

<Layout title="Learning Path - Jagoan Zaidev">
  <main>
    <Hero client:load />
    <App client:load />
  </main>
</Layout>

<style>
  main {
    min-height: 100vh;
  }
</style>
```

- [ ] **Step 2: Create /curated route page**

Create `src/pages/curated/index.astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
import CuratedMode from '../../components/curated/CuratedMode';

---

<Layout title="Curated Modules - Jagoan Zaidev">
  <CuratedMode client:load />
</Layout>
```

- [ ] **Step 3: Create /story route page**

Create `src/pages/story/index.astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
import StoryMode from '../../components/story/StoryMode';

---

<Layout title="Story Mode - Jagoan Zaidev">
  <StoryMode client:load />
</Layout>
```

- [ ] **Step 4: Update ModeSelection to navigate to routes**

Modify `src/components/layout/ModeSelection.tsx`:

Replace the `handleSelectMode` function:
```tsx
import { useNavigate } from '@astrojs/react';
// ... other imports

export default function ModeSelection() {
  const navigate = useNavigate();
  const { setShowModeSelection } = useCourseStore();

  const handleSelectMode = (mode: LearningMode) => {
    setShowModeSelection(false);
    // Navigate to respective route
    if (mode === 'path') {
      navigate('/path');
    } else if (mode === 'curated') {
      navigate('/curated');
    } else if (mode === 'story') {
      navigate('/story');
    }
  };
  // ... rest of component
```

- [ ] **Step 5: Update main index.astro to remove mode flow**

Modify `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import GoldenRules from '../components/GoldenRules';
import Footer from '../components/Footer';
import ModeSelection from '../components/layout/ModeSelection';
import LoginChoiceDialog from '../components/layout/LoginChoiceDialog';
import App from '../components/App';
---

<Layout title="Jagoan Zaidev - Belajar Server dari Nol">
  <main>
    <Hero client:load />
    <Introduction />
    <GoldenRules />
    <Footer />
    <ModeSelection client:load />
    <LoginChoiceDialog client:load />
  </main>
</Layout>
```

- [ ] **Step 6: Commit routing setup**

```bash
git add src/pages/path/index.astro src/pages/curated/index.astro src/pages/story/index.astro src/components/layout/ModeSelection.tsx src/pages/index.astro
git commit -m "feat: setup routing structure for 3 learning modes"
```

---

## Task 2: Refactor to Path-Based Architecture

**Files:**
- Create: `src/stores/pathStore.ts`
- Modify: `src/components/App.tsx` → rename to `src/components/path/PathApp.tsx`
- Modify: All imports in path components

- [ ] **Step 1: Create pathStore from useCourseStore**

Create `src/stores/pathStore.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CourseLevel } from '../content/path-data';

interface PathState {
  // Navigation
  currentLevel: CourseLevel | null;
  currentCardIndex: number;
  showCourse: boolean;

  // Progress
  unlockedLevels: CourseLevel[];
  quizScores: Partial<Record<CourseLevel, number>>;
  quizAttempts: Partial<Record<CourseLevel, number>>;
  completedCards: string[];

  // Actions
  setLevel: (level: CourseLevel) => void;
  nextCard: () => void;
  previousCard: () => void;
  goToCard: (index: number) => void;
  unlockLevel: (level: CourseLevel) => void;
  saveQuizScore: (level: CourseLevel, score: number) => void;
  incrementQuizAttempt: (level: CourseLevel) => void;
  markCardCompleted: (cardId: string) => void;
  resetCourse: () => void;
  setShowCourse: (show: boolean) => void;
}

export const usePathStore = create<PathState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentLevel: null,
      currentCardIndex: 0,
      showCourse: false,
      unlockedLevels: ['basic'],
      quizScores: {},
      quizAttempts: {},
      completedCards: [],

      // Actions (keep existing implementations)
      setLevel: (level) => {
        const state = get();
        const levels: CourseLevel[] = ['basic', 'fundamental', 'jagoan'];
        const currentIndex = levels.indexOf(state.currentLevel!);
        const nextIndex = levels.indexOf(level);
        const isNextLevel = nextIndex === currentIndex + 1;

        if (state.unlockedLevels.includes(level) || isNextLevel) {
          if (isNextLevel && !state.unlockedLevels.includes(level)) {
            set({ unlockedLevels: [...state.unlockedLevels, level] });
          }
          set({ currentLevel: level, currentCardIndex: 0, showCourse: true });
        }
      },

      nextCard: () => {
        const state = get();
        const { currentLevel } = state;
        if (!currentLevel) return;

        const { pathData } = await import('../content/path-data');
        const totalCards = pathData[currentLevel].cards.length;

        if (state.currentCardIndex < totalCards - 1) {
          set({ currentCardIndex: state.currentCardIndex + 1 });
        }
      },

      previousCard: () => {
        const state = get();
        if (state.currentCardIndex > 0) {
          set({ currentCardIndex: state.currentCardIndex - 1 });
        }
      },

      goToCard: (index) => set({ currentCardIndex: index }),

      unlockLevel: (level) => {
        const state = get();
        if (!state.unlockedLevels.includes(level)) {
          set({ unlockedLevels: [...state.unlockedLevels, level] });
        }
      },

      saveQuizScore: (level, score) => set((state) => ({
        quizScores: { ...state.quizScores, [level]: score },
      })),

      incrementQuizAttempt: (level) => set((state) => ({
        quizAttempts: { ...state.quizAttempts, [level]: (state.quizAttempts[level] || 0) + 1 },
      })),

      markCardCompleted: (cardId) => {
        const state = get();
        if (!state.completedCards.includes(cardId)) {
          set({ completedCards: [...state.completedCards, cardId] });
        }
      },

      resetCourse: () => set({
        currentLevel: null,
        currentCardIndex: 0,
        showCourse: false,
        unlockedLevels: ['basic'],
        quizScores: {},
        quizAttempts: {},
        completedCards: [],
      }),

      setShowCourse: (show) => set({ showCourse: show }),
    }),
    {
      name: 'jagoan-zaidev-path',
      partialize: (state) => ({
        currentLevel: state.currentLevel,
        currentCardIndex: state.currentCardIndex,
        unlockedLevels: state.unlockedLevels,
        quizScores: state.quizScores,
        quizAttempts: state.quizAttempts,
        completedCards: state.completedCards,
      }),
    }
  )
);
```

- [ ] **Step 2: Move and rename App.tsx to PathApp.tsx**

Move `src/components/App.tsx` to `src/components/path/PathApp.tsx` and update imports:
```tsx
import { usePathStore } from '../../stores/pathStore';
import ModeSelection from '../layout/ModeSelection';
import LoginChoiceDialog from '../layout/LoginChoiceDialog';
import LevelSelector from './LevelSelector';
import CardDeck from './CardDeck';
import { AnimatePresence } from 'framer-motion';

export default function PathApp() {
  const { showModeSelection, showLoginChoice, showCourse, currentLevel } = usePathStore();

  return (
    <AnimatePresence>
      {showCourse && !currentLevel && <LevelSelector />}
      {showCourse && currentLevel && <CardDeck />}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Update all path component imports**

Run this command to update all imports in path components:
```bash
find src/components/path src/components/course -name "*.tsx" -exec sed -i "s|from '../store/useCourseStore'|from '../../stores/pathStore'|g" {} \;
find src/components/path src/components/course -name "*.tsx" -exec sed -i "s|from '../../store/useCourseStore'|from '../../../stores/pathStore'|g" {} \;
find src/components/path src/components/course -name "*.tsx" -exec sed -i "s|useCourseStore|usePathStore|g" {} \;
```

- [ ] **Step 4: Update /path/index.astro to use PathApp**

Modify `src/pages/path/index.astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
import PathApp from '../../components/path/PathApp';

---

<Layout title="Learning Path - Jagoan Zaidev">
  <PathApp client:load />
</Layout>
```

- [ ] **Step 5: Delete old useCourseStore.ts**

```bash
rm src/store/useCourseStore.ts
```

- [ ] **Step 6: Test path routing**

```bash
npm run dev
# Test: navigate to /path, verify LevelSelector and CardDeck work
```

- [ ] **Step 7: Commit refactor**

```bash
git add src/stores/pathStore.ts src/components/path/PathApp.tsx src/pages/path/index.astro
git rm src/store/useCourseStore.ts
git commit -m "refactor: extract pathStore and move path components to /path route"
```

---

## Task 3: Create Curated Data Structure

**Files:**
- Create: `src/content/curated-data.ts`

- [ ] **Step 1: Create curated topic data**

Create `src/content/curated-data.ts`:
```typescript
export type TopicCategory = 'domain' | 'hosting' | 'vps' | 'dns' | 'security' | 'linux' | 'backup' | 'performance';
export type TopicDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Topic {
  id: string;
  title: string;
  category: TopicCategory;
  difficulty: TopicDifficulty;
  duration: number; // in minutes
  content: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const categoryInfo: Record<TopicCategory, { name: string; icon: string; color: string }> = {
  domain: { name: 'Domain', icon: '🌐', color: 'bg-blue-100 text-blue-700' },
  hosting: { name: 'Hosting', icon: '🏢', color: 'bg-purple-100 text-purple-700' },
  vps: { name: 'VPS', icon: '🖥️', color: 'bg-green-100 text-green-700' },
  dns: { name: 'DNS', icon: '🔍', color: 'bg-orange-100 text-orange-700' },
  security: { name: 'Security', icon: '🔒', color: 'bg-red-100 text-red-700' },
  linux: { name: 'Linux', icon: '🐧', color: 'bg-yellow-100 text-yellow-700' },
  backup: { name: 'Backup', icon: '💾', color: 'bg-cyan-100 text-cyan-700' },
  performance: { name: 'Performance', icon: '⚡', color: 'bg-pink-100 text-pink-700' },
};

export const curatedTopics: Topic[] = [
  // DASAR
  {
    id: 'topic-001',
    title: 'Apa itu Website & Server?',
    category: 'domain',
    difficulty: 'beginner',
    duration: 5,
    content: [
      'Website itu seperti rumah di dunia digital. Kamu punya isinya (foto, tulisan, video), tapi biar orang bisa berkunjung, kamu butuh "tanah" buat membangun rumah itu.',
      'Server adalah komputer yang nyala 24 jam nonstop, tersambung internet, dan menyimpan semua data website kamu, biar bisa diakses orang dari seluruh dunia kapan aja.',
    ],
  },
  {
    id: 'topic-002',
    title: 'Cara Beli Domain Pertama Kali',
    category: 'domain',
    difficulty: 'beginner',
    duration: 8,
    content: [
      'Domain itu alamat website kamu, misalnya: namakamu.com',
      'Langkah 1: Pilih registrar domain (Niagahoster, Rumahweb, IDN Hosted)',
      'Langkah 2: Cek ketersediaan nama domain yang kamu mau',
      'Langkah 3: Tambahkan ke keranjang dan checkout',
      'Langkah 4: Verifikasi email kamu',
      'Tips: Pilih nama yang pendek, gampang diingat, dan hindari tanda hubung jika bisa.',
    ],
  },
  // ... continue with all 48 topics as defined in the spec
  // For brevity, showing structure - add remaining topics following this pattern
];

export const topicsByCategory: Record<TopicCategory, Topic[]> = {
  domain: curatedTopics.filter(t => t.category === 'domain'),
  hosting: curatedTopics.filter(t => t.category === 'hosting'),
  vps: curatedTopics.filter(t => t.category === 'vps'),
  dns: curatedTopics.filter(t => t.category === 'dns'),
  security: curatedTopics.filter(t => t.category === 'security'),
  linux: curatedTopics.filter(t => t.category === 'linux'),
  backup: curatedTopics.filter(t => t.category === 'backup'),
  performance: curatedTopics.filter(t => t.category === 'performance'),
};
```

- [ ] **Step 2: Commit data structure**

```bash
git add src/content/curated-data.ts
git commit -m "feat: add curated topics data structure with 48 topics"
```

---

## Task 4: Create Curated Store

**Files:**
- Create: `src/stores/curatedStore.ts`

- [ ] **Step 1: Create curatedStore**

Create `src/stores/curatedStore.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Topic, TopicCategory } from '../content/curated-data';

interface CuratedState {
  // Navigation
  selectedTopic: Topic | null;
  currentCategory: TopicCategory | 'all';
  searchQuery: string;

  // Progress
  completedTopics: string[]; // topic IDs
  favoriteTopics: string[]; // topic IDs

  // Actions
  selectTopic: (topic: Topic) => void;
  closeTopic: () => void;
  setCategory: (category: TopicCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  markTopicComplete: (topicId: string) => void;
  toggleFavorite: (topicId: string) => void;
  resetProgress: () => void;
}

export const useCuratedStore = create<CuratedState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedTopic: null,
      currentCategory: 'all',
      searchQuery: '',
      completedTopics: [],
      favoriteTopics: [],

      // Actions
      selectTopic: (topic) => set({ selectedTopic: topic }),

      closeTopic: () => set({ selectedTopic: null }),

      setCategory: (category) => set({ currentCategory: category }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      markTopicComplete: (topicId) => {
        const state = get();
        if (!state.completedTopics.includes(topicId)) {
          set({ completedTopics: [...state.completedTopics, topicId] });
        }
      },

      toggleFavorite: (topicId) => {
        const state = get();
        if (state.favoriteTopics.includes(topicId)) {
          set({ favoriteTopics: state.favoriteTopics.filter(id => id !== topicId) });
        } else {
          set({ favoriteTopics: [...state.favoriteTopics, topicId] });
        }
      },

      resetProgress: () => set({
        completedTopics: [],
        favoriteTopics: [],
      }),
    }),
    {
      name: 'jagoan-zaidev-curated',
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        favoriteTopics: state.favoriteTopics,
        currentCategory: state.currentCategory,
      }),
    }
  )
);
```

- [ ] **Step 2: Commit curated store**

```bash
git add src/stores/curatedStore.ts
git commit -m "feat: add curatedStore for independent progress tracking"
```

---

## Task 5: Build Curated Mode UI Components

**Files:**
- Create: `src/components/curated/CuratedMode.tsx`
- Create: `src/components/curated/TopicGrid.tsx`
- Create: `src/components/curated/TopicCard.tsx`
- Create: `src/components/curated/TopicViewer.tsx`
- Create: `src/components/curated/ProgressTracker.tsx`

- [ ] **Step 1: Create CuratedMode main component**

Create `src/components/curated/CuratedMode.tsx`:
```tsx
import { AnimatePresence } from 'framer-motion';
import { useCuratedStore } from '../../stores/curatedStore';
import TopicGrid from './TopicGrid';
import TopicViewer from './TopicViewer';
import ProgressTracker from './ProgressTracker';
import { Home, Search } from 'lucide-react';

export default function CuratedMode() {
  const { selectedTopic } = useCuratedStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 to-pastel-sage/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pastel-slate">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <h1 className="text-xl font-bold text-text-primary">Curated Modules</h1>
            </div>
            <ProgressTracker />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!selectedTopic && <TopicGrid />}
        {selectedTopic && <TopicViewer />}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Create TopicGrid component**

Create `src/components/curated/TopicGrid.tsx`:
```tsx
import { motion } from 'framer-motion';
import { useCuratedStore } from '../../stores/curatedStore';
import { curatedTopics, categoryInfo, type TopicCategory } from '../../content/curated-data';
import TopicCard from './TopicCard';
import { Search, Filter } from 'lucide-react';

const categories: (TopicCategory | 'all')[] = ['all', 'domain', 'hosting', 'vps', 'dns', 'security', 'linux', 'backup', 'performance'];

export default function TopicGrid() {
  const { currentCategory, searchQuery, setCategory, setSearchQuery, selectTopic } = useCuratedStore();

  const filteredTopics = curatedTopics.filter(topic => {
    const matchesCategory = currentCategory === 'all' || topic.category === currentCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Cari topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-pastel-slate focus:border-accent-blue focus:outline-none bg-white shadow-soft"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const info = cat === 'all' ? { name: 'Semua', icon: '📚', color: 'bg-pastel-slate text-text-secondary' } : categoryInfo[cat];
          const isActive = currentCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-4 py-2 rounded-full font-medium transition-all duration-200
                ${isActive ? 'shadow-soft' : ''}
                ${cat === 'all'
                  ? isActive ? 'bg-accent-blue text-white' : 'bg-white text-text-secondary hover:bg-pastel-blue'
                  : isActive ? 'bg-white border-2 border-current' : 'bg-white text-text-muted hover:bg-pastel-sage/50'
                }
              `}
            >
              <span className="mr-1">{info.icon}</span>
              {info.name}
            </button>
          );
        })}
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTopics.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} />
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">Tidak ada topik yang cocok dengan pencarianmu.</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create TopicCard component**

Create `src/components/curated/TopicCard.tsx`:
```tsx
import { motion } from 'framer-motion';
import { useCuratedStore } from '../../stores/curatedStore';
import { categoryInfo, type Topic } from '../../content/curated-data';
import { Clock, Star, BookOpen } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

export default function TopicCard({ topic, index }: TopicCardProps) {
  const { selectTopic, completedTopics, favoriteTopics, toggleFavorite } = useCuratedStore();
  const isCompleted = completedTopics.includes(topic.id);
  const isFavorite = favoriteTopics.includes(topic.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="relative"
    >
      <div
        onClick={() => selectTopic(topic)}
        className="bg-white rounded-2xl shadow-soft p-5 cursor-pointer hover:shadow-lift transition-all duration-200 border-2 border-transparent hover:border-accent-blue/30"
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(topic.id);
          }}
          className="absolute top-4 right-4 z-10"
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-text-muted hover:text-yellow-400'}`} />
        </button>

        {/* Category Badge */}
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium mb-3 ${categoryInfo[topic.category].color}`}>
          <span>{categoryInfo[topic.category].icon}</span>
          <span>{categoryInfo[topic.category].name}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-text-primary mb-2 line-clamp-2">
          {topic.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{topic.duration} menit</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{topic.content.length} bagian</span>
          </div>
        </div>

        {/* Completion Indicator */}
        {isCompleted && (
          <div className="mt-3 flex items-center gap-1 text-accent-sage text-sm font-medium">
            <span className="text-lg">✓</span>
            <span>Selesai</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 4: Create TopicViewer component**

Create `src/components/curated/TopicViewer.tsx`:
```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useCuratedStore } from '../../stores/curatedStore';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import BlobButton from '../ui/BlobButton';

export default function TopicViewer() {
  const { selectedTopic, closeTopic, markTopicComplete } = useCuratedStore();

  if (!selectedTopic) return null;

  const isCompleted = useCuratedStore(state => state.completedTopics.includes(selectedTopic.id));

  const handleComplete = () => {
    markTopicComplete(selectedTopic.id);
  };

  return (
    <div className="min-h-screen bg-pastel-cream">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pastel-slate">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={closeTopic}
            className="flex items-center gap-2 text-text-muted hover:text-accent-blue font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTopic.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
          >
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
                {selectedTopic.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryInfo[selectedTopic.category].color}`}>
                  {categoryInfo[selectedTopic.category].name}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedTopic.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  selectedTopic.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedTopic.difficulty}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl shadow-soft p-8 mb-6">
              {selectedTopic.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-text-secondary leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              {isCompleted ? (
                <div className="flex items-center gap-2 text-accent-sage font-bold px-6 py-3 bg-pastel-sage/20 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Topik Selesai!</span>
                </div>
              ) : (
                <BlobButton
                  variant="primary"
                  size="lg"
                  onClick={handleComplete}
                >
                  Tandai Selesai ✓
                </BlobButton>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create ProgressTracker component**

Create `src/components/curated/ProgressTracker.tsx`:
```tsx
import { useCuratedStore } from '../../stores/curatedStore';
import { curatedTopics } from '../../content/curated-data';

export default function ProgressTracker() {
  const { completedTopics } = useCuratedStore();
  const completedCount = completedTopics.length;
  const totalCount = curatedTopics.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">
        <span className="font-bold text-accent-blue">{completedCount}</span>
        <span className="text-text-muted">/ {totalCount}</span>
      </div>
      <div className="w-24 h-2 bg-pastel-slate rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-blue rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-accent-blue">{percentage}%</span>
    </div>
  );
}
```

- [ ] **Step 6: Commit Curated Mode UI**

```bash
git add src/components/curated/
git commit -m "feat: implement curated mode UI components"
```

---

## Task 6: Create Story Data Structure

**Files:**
- Create: `src/content/story-data.ts`

- [ ] **Step 1: Create story node data**

Create `src/content/story-data.ts`:
```typescript
export interface StoryNode {
  id: string;
  position: { x: number; y: number };
  title: string;
  chapter: string;
  story: string;
  content?: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  character: string;
  requirement: string | null;
  nextNodes: string[];
}

export interface Character {
  id: string;
  name: string;
  emoji: string;
  personality: 'mentor' | 'assistant' | 'friend';
  color: string;
}

export const characters: Record<string, Character> = {
  masRohim: {
    id: 'masRohim',
    name: 'Mentor Mas Rohim',
    emoji: '🧙‍♂️',
    personality: 'mentor',
    color: 'text-purple-600',
  },
  zaiKun: {
    id: 'zaiKun',
    name: 'Zai-Kun',
    emoji: '🤖',
    personality: 'assistant',
    color: 'text-blue-600',
  },
  lordAlul: {
    id: 'lordAlul',
    name: 'Hacker Lord Alul',
    emoji: '👩‍💻',
    personality: 'friend',
    color: 'text-green-600',
  },
};

export const storyNodes: StoryNode[] = [
  // Prolog
  {
    id: 'node-001',
    position: { x: 50, y: 10 },
    title: 'Hari Pertama',
    chapter: 'Prolog',
    story: 'Selamat datang di dunia server! Namamu kirim-kirim untuk belajar bareng saya, Mentor Mas Rohim. Kita akan mulai perjalanan dari nol sampai jagoan server.',
    character: 'masRohim',
    requirement: null,
    nextNodes: ['node-002'],
  },
  // ... Add all 29 nodes as specified in design
  // Following the pattern for each chapter
];

export const nodesByChapter: Record<string, StoryNode[]> = {
  'Prolog': storyNodes.filter(n => n.chapter === 'Prolog'),
  'Chapter 1': storyNodes.filter(n => n.chapter === 'Chapter 1'),
  'Chapter 2': storyNodes.filter(n => n.chapter === 'Chapter 2'),
  'Chapter 3': storyNodes.filter(n => n.chapter === 'Chapter 3'),
  'Chapter 4': storyNodes.filter(n => n.chapter === 'Chapter 4'),
  'Chapter 5': storyNodes.filter(n => n.chapter === 'Chapter 5'),
  'Epilog': storyNodes.filter(n => n.chapter === 'Epilog'),
};
```

- [ ] **Step 2: Commit story data**

```bash
git add src/content/story-data.ts
git commit -m "feat: add story mode node data with 29 nodes across 7 chapters"
```

---

## Task 7: Create Story Store

**Files:**
- Create: `src/stores/storyStore.ts`

- [ ] **Step 1: Create storyStore**

Create `src/stores/storyStore.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StoryNode } from '../content/story-data';

interface StoryState {
  // Navigation
  currentNode: StoryNode | null;
  visitedNodes: string[];

  // Progress
  unlockedNodes: string[];
  completedNodes: string[];

  // Actions
  selectNode: (node: StoryNode) => void;
  closeNode: () => void;
  markNodeComplete: (nodeId: string) => void;
  unlockNextNode: (currentNodeId: string) => void;
  resetProgress: () => void;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentNode: null,
      visitedNodes: [],
      unlockedNodes: ['node-001'], // Start with prolog unlocked
      completedNodes: [],

      // Actions
      selectNode: (node) => {
        const state = get();
        set({ currentNode: node, visitedNodes: [...new Set([...state.visitedNodes, node.id])] });
      },

      closeNode: () => set({ currentNode: null }),

      markNodeComplete: (nodeId) => {
        const state = get();
        if (!state.completedNodes.includes(nodeId)) {
          set({ completedNodes: [...state.completedNodes, nodeId] });
        }
      },

      unlockNextNode: (currentNodeId) => {
        const state = get();
        const { storyNodes } = require('../content/story-data');
        const currentNode = storyNodes.find((n: StoryNode) => n.id === currentNodeId);
        if (currentNode && currentNode.nextNodes) {
          const newUnlocks = currentNode.nextNodes.filter(id => !state.unlockedNodes.includes(id));
          if (newUnlocks.length > 0) {
            set({ unlockedNodes: [...state.unlockedNodes, ...newUnlocks] });
          }
        }
      },

      resetProgress: () => set({
        unlockedNodes: ['node-001'],
        completedNodes: [],
        visitedNodes: [],
        currentNode: null,
      }),
    }),
    {
      name: 'jagoan-zaidev-story',
      partialize: (state) => ({
        unlockedNodes: state.unlockedNodes,
        completedNodes: state.completedNodes,
        visitedNodes: state.visitedNodes,
      }),
    }
  )
);
```

- [ ] **Step 2: Commit story store**

```bash
git add src/stores/storyStore.ts
git commit -m "feat: add storyStore for adventure mode progress tracking"
```

---

## Task 8: Build Story Mode UI Components

**Files:**
- Create: `src/components/story/StoryMode.tsx`
- Create: `src/components/story/AdventureMap.tsx`
- Create: `src/components/story/StoryNode.tsx`
- Create: `src/components/story/StoryViewer.tsx`
- Create: `src/components/story/CharacterDialog.tsx`

- [ ] **Step 1: Create StoryMode main component**

Create `src/components/story/StoryMode.tsx`:
```tsx
import { AnimatePresence } from 'framer-motion';
import { useStoryStore } from '../../stores/storyStore';
import AdventureMap from './AdventureMap';
import StoryViewer from './StoryViewer';
import { MapPin } from 'lucide-react';

export default function StoryMode() {
  const { currentNode } = useStoryStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pastel-slate">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-accent-purple" />
              <h1 className="text-xl font-bold text-text-primary">Adventure Mode</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <AnimatePresence mode="wait">
        {!currentNode && <AdventureMap />}
        {currentNode && <StoryViewer />}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Create AdventureMap component**

Create `src/components/story/AdventureMap.tsx`:
```tsx
import { motion } from 'framer-motion';
import { useStoryStore } from '../../stores/storyStore';
import { storyNodes, nodesByChapter } from '../../content/story-data';
import StoryNodeComponent from './StoryNode';
import { character } from 'lucide-react';

export default function AdventureMap() {
  const { unlockedNodes, completedNodes } = useStoryStore();

  // Group nodes by position for layout
  const chapters = ['Prolog', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Epilog'];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="relative min-h-[600px]">
        {chapters.map((chapter, chapterIndex) => {
          const chapterNodes = nodesByChapter[chapter];
          if (!chapterNodes || chapterNodes.length === 0) return null;

          return (
            <div key={chapter} className="mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-6">{chapter}</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {chapterNodes.map((node) => (
                  <StoryNodeComponent
                    key={node.id}
                    node={node}
                    isUnlocked={unlockedNodes.includes(node.id)}
                    isCompleted={completedNodes.includes(node.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create StoryNode component**

Create `src/components/story/StoryNode.tsx`:
```tsx
import { motion } from 'framer-motion';
import { useStoryStore } from '../../stores/storyStore';
import { characters, type StoryNode } from '../../content/story-data';
import { Lock, Check } from 'lucide-react';

interface StoryNodeProps {
  node: StoryNode;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export default function StoryNodeComponent({ node, isUnlocked, isCompleted }: StoryNodeProps) {
  const { selectNode } = useStoryStore();
  const char = characters[node.character];

  const handleClick = () => {
    if (isUnlocked) {
      selectNode(node);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <button
        onClick={handleClick}
        disabled={!isUnlocked}
        className={`
          relative w-full aspect-square rounded-2xl p-4 flex flex-col items-center justify-center
          transition-all duration-200 shadow-soft hover:shadow-lift
          ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}
          ${isCompleted ? 'bg-accent-sage' : 'bg-white'}
          ${isUnlocked && !isCompleted ? 'hover:border-2 hover:border-accent-blue' : ''}
        `}
      >
        {/* Lock Icon */}
        {!isUnlocked && (
          <div className="absolute top-2 right-2">
            <Lock className="w-4 h-4 text-text-muted" />
          </div>
        )}

        {/* Completion Check */}
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <Check className="w-5 h-5 text-white" />
          </div>
        )}

        {/* Character Emoji */}
        <div className={`text-4xl mb-2 ${!isUnlocked ? 'grayscale' : ''}`}>
          {char.emoji}
        </div>

        {/* Node Title */}
        <p className="text-xs text-center font-medium text-text-primary line-clamp-2">
          {node.title}
        </p>
      </button>
    </motion.div>
  );
}
```

- [ ] **Step 4: Create StoryViewer component**

Create `src/components/story/StoryViewer.tsx`:
```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryStore } from '../../stores/storyStore';
import { characters } from '../../content/story-data';
import { ArrowLeft, BookOpen } from 'lucide-react';
import CharacterDialog from './CharacterDialog';

export default function StoryViewer() {
  const { currentNode, closeNode, markNodeComplete, unlockNextNode } = useStoryStore();

  if (!currentNode) return null;

  const char = characters[currentNode.character];
  const isCompleted = useStoryStore(state => state.completedNodes.includes(currentNode.id));

  const handleCompleteAndContinue = () => {
    markNodeComplete(currentNode.id);
    unlockNextNode(currentNode.id);
    closeNode();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pastel-slate">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={closeNode}
            className="flex items-center gap-2 text-text-muted hover:text-accent-purple font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Peta
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Chapter Badge */}
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-bold">
                {currentNode.chapter}
              </span>
            </div>

            {/* Story Content */}
            <div className="bg-white rounded-3xl shadow-lift p-8 mb-6">
              <CharacterDialog
                character={char}
                story={currentNode.story}
              />
            </div>

            {/* Learning Content (if any) */}
            {currentNode.content && (
              <div className="bg-white rounded-3xl shadow-soft p-8 mb-6">
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent-purple" />
                  Materi Pembelajaran
                </h3>
                {currentNode.content.map((paragraph, index) => (
                  <p key={index} className="text-text-secondary leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Action Button */}
            <div className="text-center">
              {isCompleted ? (
                <div className="inline-flex items-center gap-2 text-accent-sage font-bold px-6 py-3 bg-pastel-sage/20 rounded-2xl">
                  <span>✓ Selesai!</span>
                </div>
              ) : (
                <button
                  onClick={handleCompleteAndContinue}
                  className="bg-accent-purple text-white font-heading font-bold px-8 py-4 rounded-2xl shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all"
                >
                  Selesaikan & Lanjut →
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create CharacterDialog component**

Create `src/components/story/CharacterDialog.tsx`:
```tsx
import { motion } from 'framer-motion';
import type { Character } from '../../content/story-data';

interface CharacterDialogProps {
  character: Character;
  story: string;
}

export default function CharacterDialog({ character, story }: CharacterDialogProps) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 ${character.color} bg-gradient-to-br from-white to-gray-50 shadow-soft`}
      >
        {character.emoji}
      </motion.div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-text-primary mb-1">{character.name}</h3>
        <p className="text-text-secondary leading-relaxed">{story}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Commit Story Mode UI**

```bash
git add src/components/story/
git commit -m "feat: implement story mode UI components"
```

---

## Task 9: Add Missing Colors to Tailwind Config

**Files:**
- Modify: `tailwind.config.mjs`

- [ ] **Step 1: Add purple and pink colors**

Modify `tailwind.config.mjs` colors section:
```javascript
colors: {
  // ... existing colors
  accent: {
    blue: '#4a90a4',
    sage: '#6b9b7a',
    coral: '#d4765c',
    purple: '#8b5cf6', // Add for story mode
  },
  // ... existing colors
}
```

- [ ] **Step 2: Commit tailwind update**

```bash
git add tailwind.config.mjs
git commit -m "style: add purple accent color for story mode"
```

---

## Task 10: Final Polish & Testing

**Files:**
- Modify: Various UI components for consistency
- Test: All modes functionality

- [ ] **Step 1: Test all routes**

```bash
npm run dev
# Test each route:
# - http://localhost:4321/ → Landing page
# - http://localhost:4321/path → Learning Path
# - http://localhost:4321/curated → Curated Modules
# - http://localhost:4321/story → Story Mode
```

- [ ] **Step 2: Test progress independence**

1. Complete a topic in Curated mode
2. Check Path mode - should not be affected
3. Complete a level in Path mode
4. Check Curated mode - should not be affected

- [ ] **Step 3: Verify responsive design**

Test on mobile viewport for all three modes

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete multi-mode learning system with 3 independent modes"
```

---

## Testing Checklist

After implementation, verify:

- [ ] Route navigation works from ModeSelection
- [ ] Learning Path mode works (Basic → Fundamental → Jagoan progression)
- [ ] Curated Modules shows all 48 topics
- [ ] Curated category filter works
- [ ] Curated search works
- [ ] Topic completion saves progress
- [ ] Story Mode shows adventure map
- [ ] Story Mode unlocks nodes progressively
- [ ] Progress is independent between modes (check localStorage)
- [ ] All modes are mobile responsive
- [ ] No console errors
