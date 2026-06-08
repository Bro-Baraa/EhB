// Kleine helpers voor localStorage.
export function saveToLocal(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.log('Opslaan mislukt:', err);
    return false;
  }
}

export function loadFromLocal(key, fallback = null) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    console.log('Laden mislukt:', err);
    return fallback;
  }
}

export const setStorage = saveToLocal;
export const getStorage = loadFromLocal;