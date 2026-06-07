import { loadFromLocal, saveToLocal } from './storage.js';
import { getMealById } from './api.js';

const FAV_KEY = 'my_favorite_meals';

// Krijg alle favoriete IDs
function getFavIds() {
  return loadFromLocal(FAV_KEY, []);
}

// Check of een meal favoriet is
function isFav(mealId) {
  const favs = getFavIds();
  
  // Simpele loop om te checken
  for (let i = 0; i < favs.length; i++) {
    if (favs[i] === mealId) {
      return true;
    }
  }
  
  return false;
}

// Toevoegen of verwijderen
function toggleFav(mealId) {
  let favs = getFavIds();
  let bestaatAl = false;
  
  // Check of ID al bestaat
  for (let i = 0; i < favs.length; i++) {
    if (favs[i] === mealId) {
      bestaatAl = true;
      break;
    }
  }
  
  let nieuweFavs;
  let isToegevoegd;
  
  if (bestaatAl) {
    // Verwijderen
    nieuweFavs = [];
    for (let i = 0; i < favs.length; i++) {
      if (favs[i] !== mealId) {
        nieuweFavs.push(favs[i]);
      }
    }
    isToegevoegd = false;
  } else {
    // Toevoegen
    nieuweFavs = [...favs, mealId];
    isToegevoegd = true;
  }
  
  saveToLocal(FAV_KEY, nieuweFavs);
  
  return {
    success: true,
    added: isToegevoegd,
    favorites: nieuweFavs
  };
}

// Alle favorieten wissen
function clearAllFavs() {
  saveToLocal(FAV_KEY, []);
}

// Laad alle favoriete maaltijden (met API calls)
async function loadFavMeals() {
  const ids = getFavIds();
  
  if (ids.length === 0) {
    return [];
  }
  
  // Voor elk ID de maaltijd ophalen
  const meals = [];
  
  for (let i = 0; i < ids.length; i++) {
    try {
      const meal = await getMealById(ids[i]);
      if (meal) {
        meals.push(meal);
      }
    } catch (err) {
      console.log('Fout bij laden favoriet:', err);
    }
  }
  
  return meals;
}