import { useState, useEffect } from 'react';

const POPUP_COOLDOWN_KEY = 'popup_last_shown';
const POPUP_LOCK_IN_KEY = 'popup_lock_in';
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

export const usePopupCooldown = (category: string) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if lock-in mode is enabled
    const lockIn = localStorage.getItem(POPUP_LOCK_IN_KEY) === 'true';
    if (lockIn) {
      setShouldShow(false);
      return;
    }

    // Check cooldown for this category
    const storageKey = `${POPUP_COOLDOWN_KEY}_${category}`;
    const lastShown = localStorage.getItem(storageKey);
    const now = Date.now();

    if (!lastShown || (now - parseInt(lastShown, 10)) > COOLDOWN_MS) {
      setShouldShow(true);
      localStorage.setItem(storageKey, now.toString());
    } else {
      setShouldShow(false);
    }
  }, [category]);

  return shouldShow;
};

export const useLockInMode = () => {
  const [isLockIn, setIsLockIn] = useState(() => {
    return localStorage.getItem(POPUP_LOCK_IN_KEY) === 'true';
  });

  // Sync state across components when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLockIn(localStorage.getItem(POPUP_LOCK_IN_KEY) === 'true');
    };

    // Listen for custom event for same-tab updates
    window.addEventListener('lockInChanged', handleStorageChange);
    // Listen for storage event for cross-tab updates
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('lockInChanged', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleLockIn = () => {
    const newValue = !isLockIn;
    setIsLockIn(newValue);
    localStorage.setItem(POPUP_LOCK_IN_KEY, newValue.toString());
    // Dispatch custom event for same-tab sync
    window.dispatchEvent(new Event('lockInChanged'));
  };

  const setLockIn = (value: boolean) => {
    setIsLockIn(value);
    localStorage.setItem(POPUP_LOCK_IN_KEY, value.toString());
    window.dispatchEvent(new Event('lockInChanged'));
  };

  return { isLockIn, toggleLockIn, setLockIn };
};
