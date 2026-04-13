import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { LearningMode } from '../content/course-data';
import { clearAllUserData, clearAnonymousData } from '../lib/user-storage';

interface CourseState {
  currentMode: LearningMode | null;
  showModeSelection: boolean;

  isLoggedIn: boolean;
  userId: string | null;
  userEmail: string | null;

  setMode: (mode: LearningMode) => void;
  setShowModeSelection: (show: boolean) => void;
  login: (userId: string, email: string) => void;
  logout: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      currentMode: null,
      showModeSelection: false,
      isLoggedIn: false,
      userId: null,
      userEmail: null,

      setMode: (mode) => set({ currentMode: mode, showModeSelection: false }),
      setShowModeSelection: (show) => set({ showModeSelection: show }),
      login: (userId, email) => {
        clearAnonymousData();
        set({
          isLoggedIn: true,
          userId,
          userEmail: email,
        });
      },
      logout: () => {
        const currentUserId = useCourseStore.getState().userId;
        if (currentUserId) {
          clearAllUserData(currentUserId);
        }
        localStorage.removeItem('jagoan-zaidev-course');
        set({
          isLoggedIn: false,
          userId: null,
          userEmail: null,
        });
        sessionStorage.removeItem('login-dismissed');
        window.location.href = '/';
      },
    }),
    {
      name: 'jagoan-zaidev-course',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        userEmail: state.userEmail,
      }),
    }
  )
);
