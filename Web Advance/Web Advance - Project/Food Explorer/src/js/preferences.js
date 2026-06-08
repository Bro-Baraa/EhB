import { getStorage, setStorage } from './storage.js';

const PREF_KEY = 'food-explorer:preferences';

const defaultPreferences = {
  theme: 'dark',
  language: 'en',
  view: 'grid',
};

export function getPreferences() {
  return {
    ...defaultPreferences,
    ...getStorage(PREF_KEY, defaultPreferences),
  };
}

export function savePreference(key, value) {
  const preferences = getPreferences();
  const updated = {
    ...preferences,
    [key]: value,
  };

  setStorage(PREF_KEY, updated);
  return updated;
}