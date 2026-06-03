// Read data from LocalStorage.
export const getStorage = (key, fallback) => {
  try {
    const savedItem = localStorage.getItem(key);

    if (savedItem) {
      return JSON.parse(savedItem);
    }

    return fallback;
  } catch (error) {
    console.warn('LocalStorage read error:', error);
    return fallback;
  }
};

// Save data in LocalStorage.
export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('LocalStorage save error:', error);
  }
};