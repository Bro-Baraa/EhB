const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const INITIAL_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const fetchJSON = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
};

export const normalizeMeal = (meal) => ({
  id: meal.idMeal,
  name: meal.strMeal || 'Unknown meal',
  category: meal.strCategory || 'Unknown',
  area: meal.strArea || 'Unknown',
  image: meal.strMealThumb,
  tags: meal.strTags || 'No tags',
  youtube: meal.strYoutube || '',
  instructions: meal.strInstructions || 'No instructions available.',
});

export const loadInitialMeals = async () => {
  const requests = INITIAL_LETTERS.map((letter) => fetchJSON(`search.php?f=${letter}`));
  const results = await Promise.all(requests);
  const meals = results.flatMap((result) => result.meals || []).map(normalizeMeal);
  const uniqueMeals = new Map(meals.map((meal) => [meal.id, meal]));
  return Array.from(uniqueMeals.values()).slice(0, 80);
};

export const loadCategories = async () => {
  const data = await fetchJSON('list.php?c=list');
  return (data.meals || []).map((category) => category.strCategory).sort();
};

export const loadAreas = async () => {
  const data = await fetchJSON('list.php?a=list');
  return (data.meals || []).map((area) => area.strArea).sort();
};

export const searchMealsFromApi = async (term) => {
  const data = await fetchJSON(`search.php?s=${encodeURIComponent(term)}`);
  return (data.meals || []).map(normalizeMeal);
};
