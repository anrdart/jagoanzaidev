import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CourseLevel } from '../content/course-data';
import { courseData } from '../content/course-data';

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
  setCurrentCardIndex: (index: number) => void;
  unlockLevel: (level: CourseLevel) => void;
  saveQuizScore: (level: CourseLevel, score: number) => void;
  incrementQuizAttempt: (level: CourseLevel) => void;
  markCardCompleted: (cardId: string) => void;
  resetPath: () => void;
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

      // Actions
      setLevel: (level) => {
        const state = get();
        const levels: CourseLevel[] = ['basic', 'fundamental', 'jagoan'];
        const currentIndex = levels.indexOf(state.currentLevel!);
        const nextIndex = levels.indexOf(level);

        // Allow moving to the next level if it's directly after the current one
        const isNextLevel = nextIndex === currentIndex + 1;

        if (state.unlockedLevels.includes(level) || isNextLevel) {
          // Unlock the level if it's the next one in sequence
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

        const totalCards = courseData[currentLevel].cards.length;

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

      setCurrentCardIndex: (index) => set({ currentCardIndex: index }),

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
        quizAttempts: {
          ...state.quizAttempts,
          [level]: (state.quizAttempts[level] || 0) + 1,
        },
      })),

      markCardCompleted: (cardId) => {
        const state = get();
        if (!state.completedCards.includes(cardId)) {
          set({ completedCards: [...state.completedCards, cardId] });
        }
      },

      resetPath: () => set({
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
