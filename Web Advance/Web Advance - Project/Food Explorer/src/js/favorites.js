import { loadFromLocal, saveToLocal } from './storage.js';
import { getMealById } from './api.js';

const FAV_KEY = 'my_favorite_meals';

export function getFavIds() {
  return loadFromLocal(FAV_KEY, []);
}

export function isFav(mealId) {
  return getFavIds().includes(mealId);
}

export function toggleFav(mealId) {
  const favs = getFavIds();
  const exists = favs.includes(mealId);
  const newFavs = exists ? favs.filter((id) => id !== mealId) : [...favs, mealId];

  saveToLocal(FAV_KEY, newFavs);

  return {
    success: true,
    added: !exists,
    favorites: newFavs,
  };
}

export function clearAllFavs() {
  saveToLocal(FAV_KEY, []);
}

export async function loadFavMeals() {
  const ids = getFavIds();
  const meals = [];

  for (const id of ids) {
    try {
      const meal = await getMealById(id);
      if (meal) meals.push(meal);
    } catch (err) {
      console.log('Favoriet laden mislukt:', err);
    }
  }

  return meals;
}