import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Topic, TopicCategory } from '../content/curated-data';
import { createUserStorage } from '../lib/user-storage';

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
      name: 'curated',
      storage: createJSONStorage(() => createUserStorage('curated')),
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        favoriteTopics: state.favoriteTopics,
        currentCategory: state.currentCategory,
      }),
    }
  )
);
