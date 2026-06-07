// TheMealDB API - https://www.themealdb.com/api.php

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

function cleanMeal(meal) {
  if (!meal) return null;
  return {
    id: meal.idMeal,
    name: meal.strMeal || 'Unknown',
    category: meal.strCategory || 'Other',
    area: meal.strArea || 'International',
    image: meal.strMealThumb || '',
    tags: meal.strTags || '',
    youtube: meal.strYoutube || '',
    instructions: meal.strInstructions || 'No instructions available.'
  };
}

export async function loadInitialMeals() {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const promises = letters.map(letter => fetchData(`search.php?f=${letter}`));
  const results = await Promise.all(promises);
  
  const allMeals = [];
  const seenIds = new Set();
  
  for (const result of results) {
    if (result.meals) {
      for (const meal of result.meals) {
        const cleaned = cleanMeal(meal);
        if (!seenIds.has(cleaned.id)) {
          seenIds.add(cleaned.id);
          allMeals.push(cleaned);
        }
      }
    }
  }
  
  return allMeals.slice(0, 80);
}

export async function loadCategories() {
  const data = await fetchData('list.php?c=list');
  if (!data.meals) return [];
  return data.meals.map(item => item.strCategory).sort();
}

export async function loadAreas() {
  const data = await fetchData('list.php?a=list');
  if (!data.meals) return [];
  return data.meals.map(item => item.strArea).sort();
}

export async function searchMeals(searchTerm) {
  const data = await fetchData(`search.php?s=${searchTerm}`);
  if (!data.meals) return [];
  return data.meals.map(meal => cleanMeal(meal));
}

export async function getMealById(mealId) {
  const data = await fetchData(`lookup.php?i=${mealId}`);
  if (!data.meals || data.meals.length === 0) return null;
  return cleanMeal(data.meals[0]);
}