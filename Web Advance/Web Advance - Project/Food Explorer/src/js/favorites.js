import { getMealById } from './api.js';
import { loadFromLocal, saveToLocal } from './storage.js';

const FAV_KEY = 'food_explorer_favorites';

function toMealSummary(meal) {
  return {
    id: meal.id,
    name: meal.name,
    category: meal.category,
    area: meal.area,
    image: meal.image,
    tags: Array.isArray(meal.tags) ? meal.tags : [],
    youtube: meal.youtube || '',
  };
}

function normalizeFavorite(favorite) {
  if (typeof favorite === 'string') {
    return { id: favorite, addedAt: null, meal: null };
  }

  if (!favorite || typeof favorite !== 'object' || !favorite.id) {
    return null;
  }

  const meal = favorite.meal?.name
    ? toMealSummary(favorite.meal)
    : favorite.name
      ? toMealSummary(favorite)
      : null;

  return {
    id: String(favorite.id),
    addedAt: favorite.addedAt || null,
    meal,
  };
}

function getFavorites() {
  const stored = loadFromLocal(FAV_KEY, []);
  const favorites = Array.isArray(stored)
    ? stored.map(normalizeFavorite).filter(Boolean)
    : [];

  return favorites;
}

function saveFavorites(favorites) {
  saveToLocal(FAV_KEY, favorites);
}

export function getFavIds() {
  return getFavorites().map((favorite) => favorite.id);
}

export function isFav(mealId) {
  return getFavIds().includes(String(mealId));
}

export function toggleFav(meal) {
  const favorites = getFavorites();
  const mealId = String(meal.id);
  const exists = favorites.some((favorite) => favorite.id === mealId);

  const updatedFavorites = exists
    ? favorites.filter((favorite) => favorite.id !== mealId)
    : [
        ...favorites,
        {
          id: mealId,
          addedAt: new Date().toISOString(),
          meal: toMealSummary(meal),
        },
      ];

  saveFavorites(updatedFavorites);

  return {
    added: !exists,
    favorites: updatedFavorites,
  };
}

export function clearAllFavs() {
  saveFavorites([]);
}

export async function loadFavMeals() {
  const favorites = getFavorites();
  let migrated = false;

  const meals = await Promise.all(
    favorites.map(async (favorite) => {
      if (favorite.meal) {
        return { ...favorite.meal, addedAt: favorite.addedAt };
      }

      try {
        const meal = await getMealById(favorite.id);

        if (!meal) return null;

        favorite.meal = toMealSummary(meal);
        migrated = true;

        return { ...favorite.meal, addedAt: favorite.addedAt };
      } catch (error) {
        console.warn(`Favorite ${favorite.id} could not be loaded.`, error);
        return null;
      }
    })
  );

  if (migrated) {
    saveFavorites(favorites);
  }

  return meals.filter(Boolean);
}
