import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningMode } from '../content/course-data';

interface CourseState {
  // Navigation - Mode selection only
  currentMode: LearningMode | null;
  showModeSelection: boolean;
  showLoginChoice: boolean;

  // Auth
  isLoggedIn: boolean;
  userId: string | null;
  userEmail: string | null;

  // Actions
  setMode: (mode: LearningMode) => void;
  setShowModeSelection: (show: boolean) => void;
  setShowLoginChoice: (show: boolean) => void;
  login: (userId: string, email: string) => void;
  logout: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      // Initial state
      currentMode: null,
      showModeSelection: false,
      showLoginChoice: false,
      isLoggedIn: false,
      userId: null,
      userEmail: null,

      // Actions
      setMode: (mode) => set({ currentMode: mode, showModeSelection: false, showLoginChoice: true }),
      setShowModeSelection: (show) => set({ showModeSelection: show }),
      setShowLoginChoice: (show) => set({ showLoginChoice: show }),
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
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        userEmail: state.userEmail,
      }),
    }
  )
);
