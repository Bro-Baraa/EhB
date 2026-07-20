// Kleine functies zodat ik localStorage niet overal opnieuw moet schrijven.
// Alles wordt als JSON opgeslagen zodat we ook objecten en arrays kunnen bewaren,
// niet enkel losse strings.
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

// Aliassen, gebruikt in preferences.js. Zelfde functies, andere naam
// zodat het daar wat duidelijker leest.
export const setStorage = saveToLocal;
export const getStorage = loadFromLocal;
