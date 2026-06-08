const API_URL = 'https://www.themealdb.com/api/json/v1/1';
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const buildUrl = (endpoint) => `${API_URL}/${endpoint}`;

async function fetchJson(endpoint) {
  const response = await fetch(buildUrl(endpoint));

  if (!response.ok) {
    throw new Error(`TheMealDB request failed with status ${response.status}`);
  }

  return response.json();
}

// Maakt de API-data eenvoudiger voor de rest van de app.
function formatMeal(meal) {
  if (!meal) return null;

  return {
    id: meal.idMeal,
    name: meal.strMeal || 'Unknown meal',
    category: meal.strCategory || 'Other',
    area: meal.strArea || 'International',
    image: meal.strMealThumb || '',
    tags: meal.strTags || 'No tags',
    youtube: meal.strYoutube || '',
    source: meal.strSource || '',
    instructions: meal.strInstructions || 'No instructions available.',
  };
}

export async function loadInitialMeals() {
  const requests = letters.map(async (letter) => {
    try {
      return await fetchJson(`search.php?f=${letter}`);
    } catch (err) {
      console.log(`Geen data voor letter ${letter}:`, err);
      return { meals: [] };
    }
  });

  const results = await Promise.all(requests);
  const meals = [];
  const usedIds = new Set();

  results.forEach((result) => {
    if (!result.meals) return;

    result.meals.forEach((meal) => {
      const formattedMeal = formatMeal(meal);

      if (formattedMeal && !usedIds.has(formattedMeal.id)) {
        usedIds.add(formattedMeal.id);
        meals.push(formattedMeal);
      }
    });
  });

  return meals;
}

export async function loadCategories() {
  const data = await fetchJson('list.php?c=list');
  return data.meals ? data.meals.map((item) => item.strCategory).sort() : [];
}

export async function loadAreas() {
  const data = await fetchJson('list.php?a=list');
  return data.meals ? data.meals.map((item) => item.strArea).sort() : [];
}

export async function searchMeals(searchTerm) {
  const safeTerm = encodeURIComponent(searchTerm.trim());
  const data = await fetchJson(`search.php?s=${safeTerm}`);

  return data.meals ? data.meals.map(formatMeal).filter(Boolean) : [];
}

export async function getMealById(mealId) {
  const data = await fetchJson(`lookup.php?i=${encodeURIComponent(mealId)}`);

  return data.meals && data.meals.length > 0 ? formatMeal(data.meals[0]) : null;
}