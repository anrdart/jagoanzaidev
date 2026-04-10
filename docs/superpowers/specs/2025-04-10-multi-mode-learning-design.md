# Multi-Mode Learning System - Design Spec

**Date:** 2025-04-10
**Project:** Jagoan Zaidev
**Goal:** Create 3 completely different learning experiences, each with independent progress

---

## 1. Routing Architecture

### 1.1 URL Structure

| Mode | Route | Description |
|------|-------|-------------|
| Landing | `/` | Homepage with Hero, Intro, Golden Rules |
| Learning Path | `/path` | Linear progression: Basic → Fundamental → Jagoan |
| Curated Modules | `/curated` | Topic grid à la carte, free exploration |
| Story Mode | `/story` | Adventure map with nodes & narrative |

### 1.2 File Structure

```
src/
├── pages/
│   ├── index.astro              # Landing page
│   ├── path/
│   │   └── index.astro          # Learning Path (existing flow)
│   ├── curated/
│   │   └── index.astro          # Curated Modules
│   └── story/
│       └── index.astro          # Story Mode
│
├── components/
│   ├── path/                    # Learning Path components (existing)
│   │   ├── LevelSelector.tsx
│   │   ├── CardDeck.tsx
│   │   └── ...
│   │
│   ├── curated/                 # Curated Modules components
│   │   ├── TopicGrid.tsx        # Grid of topics
│   │   ├── TopicCard.tsx        # Individual topic card
│   │   ├── TopicViewer.tsx      # Content viewer for selected topic
│   │   └── ProgressTracker.tsx  # Track completed topics
│   │
│   └── story/                   # Story Mode components
│       ├── AdventureMap.tsx     # Interactive map canvas
│       ├── StoryNode.tsx        # Individual node on map
│       ├── StoryViewer.tsx      # Story content viewer
│       └── CharacterDialog.tsx  # Character chat/narration
│
└── stores/
    ├── pathStore.ts             # Learning Path progress (existing)
    ├── curatedStore.ts          # Curated Modules progress
    └── storyStore.ts            # Story Mode progress
```

### 1.3 Navigation Flow

```
Landing (/)
    ↓ "Mulai Belajar Sekarang"
Mode Selection Modal
    ↓
├─────────────────┬──────────────────┬─────────────────────┐
│                 │                  │                     │
Path (/path)    Curated (/curated)  Story (/story)    [Coming Soon]
Level Selector   Topic Grid        Adventure Map
    ↓                 ↓                  ↓
CardDeck         TopicViewer       StoryNode + Content
```

---

## 2. Mode-Specific Designs

### 2.1 Learning Path Mode (Existing - Maintain)

**Purpose:** Linear, structured learning from basic to advanced

**Flow:** Mode Selection → Login → Level Selector → Card Deck → Quiz → Next Level

**Components:** Already implemented, maintain as-is

**Progress:** Stored in `pathStore` (current useCourseStore)

---

### 2.2 Curated Modules Mode

**Purpose:** Free exploration of specific topics

**Concept:** "Netflix for Learning" - browse and pick any topic

**Visual Style:**
- Grid layout (3-4 columns)
- Topic cards with thumbnails/icons
- Search bar at top
- Filter tags (Dasar, Hosting, Server, Security, DNS, etc.)
- Progress indicator per topic

**Flow:**
```
Mode Selection → Login → Topic Grid → Select Topic → Topic Viewer → Mark Complete → Back to Grid
```

**Components:**
- `TopicGrid.tsx` - Main grid with search & filters
- `TopicCard.tsx` - Individual topic card
- `TopicViewer.tsx` - Content viewer (similar to CardDeck but single topic)
- `ProgressTracker.tsx` - Shows completed/total topics

**Data Structure:**
```typescript
interface Topic {
  id: string;
  title: string;
  category: TopicCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  content: string[];
  quiz?: QuizQuestion[];
}

type TopicCategory = 'domain' | 'hosting' | 'vps' | 'dns' | 'security' | 'linux' | 'backup';
```

**Progress:** Stored in `curatedStore`
- `completedTopics: string[]` - Array of completed topic IDs
- `currentTopic: string | null` - Currently viewing topic

---

### 2.3 Story Mode

**Purpose:** Gamified learning with narrative adventure

**Concept:** "RPG Adventure Map" - journey from beginner to expert through story nodes

**Visual Style:**
- Interactive canvas/map background
- Nodes connected with paths (like mind map or game map)
- Character avatar that moves along the path
- Story dialog boxes (like visual novel)
- Unlock new areas by completing challenges

**Flow:**
```
Mode Selection → Login → Adventure Map → Click Node → Story Content → Quiz/Challenge → Unlock Next Node → Continue Journey
```

**Components:**
- `AdventureMap.tsx` - Interactive SVG/canvas map with nodes
- `StoryNode.tsx` - Individual clickable node on map
- `StoryViewer.tsx` - Story + content viewer with dialog style
- `CharacterDialog.tsx` - Character narration with choices

**Data Structure:**
```typescript
interface StoryNode {
  id: string;
  position: { x: number; y: number };
  title: string;
  story: string; // Narrative content
  content?: string[]; // Learning material
  quiz?: QuizQuestion[];
  requirement: string | null; // Node ID to unlock this
  nextNodes: string[]; // IDs of nodes this unlocks
  character: string; // Which character appears
}

interface Character {
  id: string;
  name: string;
  avatar: string; // emoji or image
  personality: 'mentor' | 'guide' | 'challenger';
}
```

**Progress:** Stored in `storyStore`
- `unlockedNodes: string[]` - Nodes user has access to
- `completedNodes: string[]` - Nodes user finished
- `currentNode: string | null` - Currently active node
- `characterProgress: Record<string, number>` - Relationship with characters

---

## 3. State Management

### 3.1 Store Architecture

Each mode has its own Zustand store with persistence:

```typescript
// stores/pathStore.ts (existing useCourseStore)
export const usePathStore = create<PathState>()(persist(...));

// stores/curatedStore.ts (new)
export const useCuratedStore = create<CuratedState>()(persist(...));

// stores/storyStore.ts (new)
export const useStoryStore = create<StoryState>()(persist(...));
```

### 3.2 Authentication (Shared)

Login flow is shared but stored once:
- `userId`, `userEmail` stored once
- Each mode tracks its own progress

---

## 4. Component Sharing Policy

**SHARED across modes:**
- UI components: BlobButton, ProgressBar, etc.
- Layout components: Footer, Navigation bar (if any)
- Utility functions: formatProgress, calculateScore
- Type definitions: QuizQuestion, CourseCard (if reusable)

**NOT SHARED (mode-specific):**
- Page layouts
- Content viewers (different UI patterns)
- Progress displays
- Navigation/flow components

---

## 5. Implementation Order

1. **Phase 1:** Setup routing structure
   - Create `/path`, `/curated`, `/story` routes
   - Update ModeSelection to navigate to correct route

2. **Phase 2:** Refactor existing Path mode
   - Move existing components to `/path/` route
   - Rename store to `pathStore`

3. **Phase 3:** Implement Curated Modules
   - Create topic data structure
   - Build TopicGrid, TopicCard, TopicViewer
   - Create curatedStore

4. **Phase 4:** Implement Story Mode
   - Create story node data structure
   - Build AdventureMap, StoryNode, StoryViewer
   - Create storyStore

5. **Phase 5:** Navigation & Polish
   - Mode switching between routes
   - Progress bars per mode
   - Transitions and animations

---

## 6. Success Criteria

- [ ] Each mode has completely different visual appearance
- [ ] Each mode has independent progress tracking
- [ ] User can switch between modes without losing progress
- [ ] All 3 modes are fully functional (not placeholders)
- [ ] Mobile responsive for all modes
- [ ] Animations are smooth across mode transitions
