import { getStorage, setStorage } from './storage.js';

const FAVORITES_KEY = 'food-explorer:favorites';

// Get saved favorite meals.
export const getFavorites = () => {
  return getStorage(FAVORITES_KEY, []);
};

// Check if a meal is already saved.
export const isFavorite = (mealId) => {
  const favorites = getFavorites();

  return favorites.some((meal) => meal.id === mealId);
};

// Add or remove a meal from favorites.
export const toggleFavorite = (meal) => {
  const favorites = getFavorites();

  const exists = favorites.some((item) => {
    return item.id === meal.id;
  });

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter((item) => {
      return item.id !== meal.id;
    });
  } else {
    updatedFavorites = [...favorites, meal];
  }

  setStorage(FAVORITES_KEY, updatedFavorites);

  return {
    favorites: updatedFavorites,
    added: !exists,
  };
};

// Remove all favorite meals.
export const clearFavorites = () => {
  setStorage(FAVORITES_KEY, []);
};