import { loadFromLocal, saveToLocal } from './storage.js';
import { getMealById } from './api.js';

const FAV_KEY = 'food_explorer_favorites';

// Geeft alleen de ID's terug van de bewaarde maaltijden.
export function getFavIds() {
  return loadFromLocal(FAV_KEY, []);
}

export function isFav(mealId) {
  return getFavIds().includes(mealId);
}

// Voegt een maaltijd toe of verwijdert die als hij al bestaat.
export function toggleFav(mealId) {
  const favs = getFavIds();
  const exists = favs.includes(mealId);

  const updatedFavs = exists
    ? favs.filter((id) => id !== mealId)
    : [...favs, mealId];

  saveToLocal(FAV_KEY, updatedFavs);

  return {
    added: !exists,
    favorites: updatedFavs,
  };
}

export function clearAllFavs() {
  saveToLocal(FAV_KEY, []);
}

// Favorieten worden als ID bewaard, dus hier laad ik de volledige maaltijden terug.
export async function loadFavMeals() {
  const ids = getFavIds();
  const meals = [];

  for (const id of ids) {
    try {
      const meal = await getMealById(id);
      if (meal) meals.push(meal);
    } catch (err) {
      console.log('Favoriet kon niet geladen worden:', err);
    }
  }

  return meals;
}