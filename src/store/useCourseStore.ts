import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningMode, CourseLevel } from '../content/course-data';
import { courseData } from '../content/course-data';

interface CourseState {
  // Navigation
  currentMode: LearningMode | null;
  currentLevel: CourseLevel | null;
  currentCardIndex: number;
  showModeSelection: boolean;
  showLoginChoice: boolean;
  showCourse: boolean;

  // Progress
  unlockedLevels: CourseLevel[];
  quizScores: Partial<Record<CourseLevel, number>>;
  quizAttempts: Partial<Record<CourseLevel, number>>;
  completedCards: string[];

  // Auth
  isLoggedIn: boolean;
  userId: string | null;
  userEmail: string | null;

  // Actions
  setMode: (mode: LearningMode) => void;
  setLevel: (level: CourseLevel) => void;
  nextCard: () => void;
  previousCard: () => void;
  goToCard: (index: number) => void;
  unlockLevel: (level: CourseLevel) => void;
  saveQuizScore: (level: CourseLevel, score: number) => void;
  incrementQuizAttempt: (level: CourseLevel) => void;
  markCardCompleted: (cardId: string) => void;
  resetCourse: () => void;
  setShowModeSelection: (show: boolean) => void;
  setShowLoginChoice: (show: boolean) => void;
  setShowCourse: (show: boolean) => void;
  login: (userId: string, email: string) => void;
  logout: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentMode: null,
      currentLevel: null,
      currentCardIndex: 0,
      showModeSelection: false,
      showLoginChoice: false,
      showCourse: false,
      unlockedLevels: ['basic'],
      quizScores: {},
      quizAttempts: {},
      completedCards: [],
      isLoggedIn: false,
      userId: null,
      userEmail: null,

      // Actions
      setMode: (mode) => set({ currentMode: mode, showModeSelection: false, showLoginChoice: true }),

      setLevel: (level) => {
        const state = get();
        if (state.unlockedLevels.includes(level)) {
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

      resetCourse: () => set({
        currentMode: null,
        currentLevel: null,
        currentCardIndex: 0,
        showModeSelection: false,
        showLoginChoice: false,
        showCourse: false,
        unlockedLevels: ['basic'],
        quizScores: {},
        quizAttempts: {},
        completedCards: [],
      }),

      setShowModeSelection: (show) => set({ showModeSelection: show }),
      setShowLoginChoice: (show) => set({ showLoginChoice: show }),
      setShowCourse: (show) => set({ showCourse: show }),

      login: (userId, email) => set({
        isLoggedIn: true,
        userId,
        userEmail,
      }),

      logout: () => set({
        isLoggedIn: false,
        userId: null,
        userEmail: null,
      }),
    }),
    {
      name: 'jagoan-zaidev-course',
      partialize: (state) => ({
        currentMode: state.currentMode,
        currentLevel: state.currentLevel,
        currentCardIndex: state.currentCardIndex,
        unlockedLevels: state.unlockedLevels,
        quizScores: state.quizScores,
        quizAttempts: state.quizAttempts,
        completedCards: state.completedCards,
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        userEmail: state.userEmail,
      }),
    }
  )
);
