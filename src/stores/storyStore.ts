import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StoryChapterId } from '../content/story-data';
import { storyData } from '../content/story-data';
import { createUserStorage } from '../lib/user-storage';

interface StoryState {
  // Navigation
  currentChapter: StoryChapterId | null;
  currentSceneIndex: number;
  showStory: boolean;
  showQuiz: boolean;

  // Progress
  unlockedChapters: StoryChapterId[];
  completedChapters: StoryChapterId[];
  quizScores: Partial<Record<StoryChapterId, number>>;
  quizAttempts: Partial<Record<StoryChapterId, number>>;
  earnedBadges: string[]; // badge IDs from rewards

  // Actions
  setChapter: (chapter: StoryChapterId) => void;
  nextScene: () => void;
  previousScene: () => void;
  setCurrentSceneIndex: (index: number) => void;
  setShowStory: (show: boolean) => void;
  setShowQuiz: (show: boolean) => void;
  unlockChapter: (chapter: StoryChapterId) => void;
  completeChapter: (chapter: StoryChapterId) => void;
  saveQuizScore: (chapter: StoryChapterId, score: number) => void;
  incrementQuizAttempt: (chapter: StoryChapterId) => void;
  earnBadge: (badgeId: string) => void;
  resetStory: () => void;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentChapter: null,
      currentSceneIndex: 0,
      showStory: false,
      showQuiz: false,
      unlockedChapters: ['ch1-first-website'],
      completedChapters: [],
      quizScores: {},
      quizAttempts: {},
      earnedBadges: [],

      // Actions
      setChapter: (chapter) => {
        const state = get();
        if (state.unlockedChapters.includes(chapter)) {
          set({ currentChapter: chapter, currentSceneIndex: 0, showStory: true, showQuiz: false });
        }
      },

      nextScene: () => {
        const state = get();
        if (!state.currentChapter) return;
        const chapter = storyData[state.currentChapter];
        if (state.currentSceneIndex < chapter.scenes.length - 1) {
          set({ currentSceneIndex: state.currentSceneIndex + 1 });
        }
      },

      previousScene: () => {
        const state = get();
        if (state.currentSceneIndex > 0) {
          set({ currentSceneIndex: state.currentSceneIndex - 1 });
        }
      },

      setCurrentSceneIndex: (index) => set({ currentSceneIndex: index }),

      setShowStory: (show) => set({ showStory: show }),

      setShowQuiz: (show) => set({ showQuiz: show }),

      unlockChapter: (chapter) => {
        const state = get();
        if (!state.unlockedChapters.includes(chapter)) {
          set({ unlockedChapters: [...state.unlockedChapters, chapter] });
        }
      },

      completeChapter: (chapter) => {
        const state = get();
        if (!state.completedChapters.includes(chapter)) {
          set({ completedChapters: [...state.completedChapters, chapter] });
        }
      },

      saveQuizScore: (chapter, score) => set((state) => ({
        quizScores: { ...state.quizScores, [chapter]: score },
      })),

      incrementQuizAttempt: (chapter) => set((state) => ({
        quizAttempts: {
          ...state.quizAttempts,
          [chapter]: (state.quizAttempts[chapter] || 0) + 1,
        },
      })),

      earnBadge: (badgeId) => {
        const state = get();
        if (!state.earnedBadges.includes(badgeId)) {
          set({ earnedBadges: [...state.earnedBadges, badgeId] });
        }
      },

      resetStory: () => set({
        currentChapter: null,
        currentSceneIndex: 0,
        showStory: false,
        showQuiz: false,
        unlockedChapters: ['ch1-first-website'],
        completedChapters: [],
        quizScores: {},
        quizAttempts: {},
        earnedBadges: [],
      }),
    }),
    {
      name: 'story',
      storage: createJSONStorage(() => createUserStorage('story')),
      partialize: (state) => ({
        unlockedChapters: state.unlockedChapters,
        completedChapters: state.completedChapters,
        quizScores: state.quizScores,
        quizAttempts: state.quizAttempts,
        earnedBadges: state.earnedBadges,
      }),
    }
  )
);
