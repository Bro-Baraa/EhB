const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const INITIAL_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// Get JSON data from the API.
export const fetchJSON = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

// Keep only the data that the app needs.
export const normalizeMeal = (meal) => {
  return {
    id: meal.idMeal,
    name: meal.strMeal || 'Unknown meal',
    category: meal.strCategory || 'Unknown',
    area: meal.strArea || 'Unknown',
    image: meal.strMealThumb || '',
    tags: meal.strTags || 'No tags',
    youtube: meal.strYoutube || '',
    instructions: meal.strInstructions || 'No instructions available.',
  };
};

// Load meals when the page starts.
export const loadInitialMeals = async () => {
  const requests = INITIAL_LETTERS.map((letter) => {
    return fetchJSON(`search.php?f=${letter}`);
  });

  const results = await Promise.all(requests);

  const meals = results
    .flatMap((result) => result.meals || [])
    .map((meal) => normalizeMeal(meal));

  const uniqueMeals = new Map();

  meals.forEach((meal) => {
    uniqueMeals.set(meal.id, meal);
  });

  return Array.from(uniqueMeals.values()).slice(0, 80);
};

// Load all meal categories.
export const loadCategories = async () => {
  const data = await fetchJSON('list.php?c=list');

  return (data.meals || [])
    .map((category) => category.strCategory)
    .sort();
};

// Load all meal areas.
export const loadAreas = async () => {
  const data = await fetchJSON('list.php?a=list');

  return (data.meals || [])
    .map((area) => area.strArea)
    .sort();
};

// Search meals by name.
export const searchMealsFromApi = async (term) => {
  const data = await fetchJSON(`search.php?s=${encodeURIComponent(term)}`);

  return (data.meals || []).map((meal) => normalizeMeal(meal));
};