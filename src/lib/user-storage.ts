import type { StateStorage } from 'zustand/middleware';

const ANONYMOUS_KEY = 'anon';
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

function getActiveUserKey(): string {
  try {
    if (typeof window === 'undefined') return ANONYMOUS_KEY;
    const raw = localStorage.getItem('jagoan-zaidev-course');
    if (raw) {
      const parsed = JSON.parse(raw);
      const state = parsed?.state;
      if (state?.isLoggedIn && state?.userId) {
        return state.userId;
      }
    }
  } catch {}
  return ANONYMOUS_KEY;
}

export function userScopedKey(baseName: string): string {
  const userId = getActiveUserKey();
  return `jagoan-zaidev-${baseName}-${userId}`;
}

export function clearAllUserData(userId: string): void {
  const prefix = 'jagoan-zaidev-';
  const suffix = `-${userId}`;
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix) && key.endsWith(suffix) && !key.endsWith('-course')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

export function clearAnonymousData(): void {
  const suffix = `-${ANONYMOUS_KEY}`;
  const prefix = 'jagoan-zaidev-';
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix) && key.endsWith(suffix)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

export function createUserStorage(baseName: string): StateStorage {
  if (typeof window === 'undefined') return noopStorage;
  const key = () => userScopedKey(baseName);
  return {
    getItem: (_name: string) => {
      return localStorage.getItem(key());
    },
    setItem: (_name: string, value: string) => {
      localStorage.setItem(key(), value);
    },
    removeItem: (_name: string) => {
      localStorage.removeItem(key());
    },
  };
}
