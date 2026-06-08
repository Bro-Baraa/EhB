import { getStorage, setStorage } from './storage.js';

const PREF_KEY = 'food_explorer_preferences';

const defaultPreferences = {
  theme: 'dark',
  language: 'en',
  view: 'grid',
};

// Laadt de voorkeuren. Als er niets is opgeslagen, gebruik ik de standaardwaarden.
export function getPreferences() {
  return {
    ...defaultPreferences,
    ...getStorage(PREF_KEY, defaultPreferences),
  };
}

export function savePreference(key, value) {
  const preferences = getPreferences();

  const updatedPreferences = {
    ...preferences,
    [key]: value,
  };

  setStorage(PREF_KEY, updatedPreferences);
  return updatedPreferences;
}