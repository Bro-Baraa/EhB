// Simpele localStorage functies - niks ingewikkelds

// Opslaan
function saveToLocal(key, data) {
  try {
    const toSave = JSON.stringify(data);
    localStorage.setItem(key, toSave);
    return true;
  } catch (err) {
    console.log('Save mislukt:', err);
    return false;
  }
}

// Laden met fallback waarde
function loadFromLocal(key, fallback = null) {
  try {
    const saved = localStorage.getItem(key);
    
    if (saved) {
      return JSON.parse(saved);
    }
    
    return fallback;
  } catch (err) {
    console.log('Load mislukt:', err);
    return fallback;
  }
}