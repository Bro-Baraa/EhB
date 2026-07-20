import { loadFromLocal, saveToLocal } from './storage.js';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';
const INITIAL_LETTERS = 'abcdefghijkl'.split('');
const CACHE_KEY = 'food_explorer_meals_cache_v2';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const buildUrl = (endpoint) => `${API_URL}/${endpoint}`;

async function fetchJson(endpoint) {
  const response = await fetch(buildUrl(endpoint));

  if (!response.ok) {
    throw new Error(`TheMealDB request failed with status ${response.status}`);
  }

  return response.json();
}

function splitTags(tags) {
  return tags
    ? tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    : [];
}

function extractIngredients(meal) {
  return Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    const ingredient = meal[`strIngredient${number}`]?.trim();
    const measure = meal[`strMeasure${number}`]?.trim();

    return ingredient ? { ingredient, measure: measure || '' } : null;
  }).filter(Boolean);
}

function formatMealSummary(meal) {
  if (!meal) return null;

  return {
    id: meal.idMeal,
    name: meal.strMeal || 'Unknown meal',
    category: meal.strCategory || 'Other',
    area: meal.strArea || 'International',
    image: meal.strMealThumb || '',
    tags: splitTags(meal.strTags),
    youtube: meal.strYoutube || '',
  };
}

function formatMealDetails(meal) {
  const summary = formatMealSummary(meal);

  return summary
    ? {
        ...summary,
        source: meal.strSource || '',
        instructions: meal.strInstructions || 'No instructions available.',
        ingredients: extractIngredients(meal),
      }
    : null;
}

function hasValidCache(cached) {
  return Boolean(
    cached
      && Array.isArray(cached.meals)
      && cached.meals.length >= 20
      && Number.isFinite(cached.timestamp)
      && Date.now() - cached.timestamp < CACHE_DURATION
  );
}

export async function loadInitialMeals() {
  const cached = loadFromLocal(CACHE_KEY, null);

  if (hasValidCache(cached)) {
    return cached.meals;
  }

  const requests = INITIAL_LETTERS.map((letter) => fetchJson(`search.php?f=${letter}`));
  const results = await Promise.allSettled(requests);
  const usedIds = new Set();
  const meals = [];

  results.forEach((result) => {
    if (result.status !== 'fulfilled' || !Array.isArray(result.value.meals)) return;

    result.value.meals.forEach((meal) => {
      const formattedMeal = formatMealSummary(meal);

      if (formattedMeal && !usedIds.has(formattedMeal.id)) {
        usedIds.add(formattedMeal.id);
        meals.push(formattedMeal);
      }
    });
  });

  if (meals.length < 20) {
    throw new Error('The API returned fewer than 20 meals.');
  }

  meals.sort((a, b) => a.name.localeCompare(b.name));
  saveToLocal(CACHE_KEY, { meals, timestamp: Date.now() });

  return meals;
}

export async function loadCategories() {
  const data = await fetchJson('list.php?c=list');

  return Array.isArray(data.meals)
    ? data.meals.map((item) => item.strCategory).filter(Boolean).sort()
    : [];
}

export async function loadAreas() {
  const data = await fetchJson('list.php?a=list');

  return Array.isArray(data.meals)
    ? data.meals.map((item) => item.strArea).filter(Boolean).sort()
    : [];
}

export async function getMealById(mealId) {
  const data = await fetchJson(`lookup.php?i=${encodeURIComponent(mealId)}`);

  return Array.isArray(data.meals) && data.meals.length > 0
    ? formatMealDetails(data.meals[0])
    : null;
}
