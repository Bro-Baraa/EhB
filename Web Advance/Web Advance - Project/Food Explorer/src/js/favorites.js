import { getStorage, setStorage } from './storage.js';

const FAVORITES_KEY = 'food-explorer:favorites';

export const getFavorites = () => getStorage(FAVORITES_KEY, []);

export const isFavorite = (mealId) => getFavorites().some((meal) => meal.id === mealId);

export const toggleFavorite = (meal) => {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === meal.id);
  const updatedFavorites = exists
    ? favorites.filter((item) => item.id !== meal.id)
    : [...favorites, meal];

  setStorage(FAVORITES_KEY, updatedFavorites);
  return { favorites: updatedFavorites, added: !exists };
};

export const clearFavorites = () => setStorage(FAVORITES_KEY, []);
