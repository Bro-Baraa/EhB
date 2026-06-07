// Ik gebruik TheMealDB API voor recepten
// Link: https://www.themealdb.com/api.php

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

// Deze functie haalt data op van de API
// Soms traag, maar meestal werkt het wel
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error('API probleem');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Er is iets mis met de API:', error);
    throw error;
  }
}

// Maak de meal data schoon - ik bewaar alleen wat ik nodig heb
function cleanMeal(meal) {
  // Soms is meal undefined, dan return ik niks
  if (!meal) {
    return null;
  }
  
  // Maak een nieuw object met alleen de properties die ik gebruik
  const cleaned = {
    id: meal.idMeal,
    name: meal.strMeal || 'Onbekend gerecht',
    category: meal.strCategory || 'Overig',
    area: meal.strArea || 'Internationaal',
    image: meal.strMealThumb || '',
    tags: meal.strTags || '',
    youtube: meal.strYoutube || '',
    instructions: meal.strInstructions || 'Geen instructies beschikbaar.'
  };
  
  return cleaned;
}

// Haal de eerste 80 maaltijden op (verschillende letters)
// Ik gebruik letters want anders krijg ik te weinig resultaten
async function getInitialMeals() {
  // Deze letters geven meestal veel resultaten
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  // Alle requests tegelijk doen - sneller
  const promises = [];
  for (let i = 0; i < letters.length; i++) {
    promises.push(fetchData(`search.php?f=${letters[i]}`));
  }
  
  const results = await Promise.all(promises);
  
  // Verzamel alle maaltijden
  let allResults = [];
  let seenIds = new Set(); // Om dubbels te voorkomen
  
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.meals) {
      for (let j = 0; j < result.meals.length; j++) {
        const meal = result.meals[j];
        const cleaned = cleanMeal(meal);
        
        // Alleen toevoegen als we deze ID nog niet hebben
        if (!seenIds.has(cleaned.id)) {
          seenIds.add(cleaned.id);
          allResults.push(cleaned);
        }
      }
    }
  }
  
  // Max 80 maaltijden is genoeg voor de start
  return allResults.slice(0, 80);
}

// Haal alle categorieën op (bv Beef, Chicken, Dessert)
async function getCategories() {
  const data = await fetchData('list.php?c=list');
  
  if (!data.meals) {
    return [];
  }
  
  const categories = [];
  for (let i = 0; i < data.meals.length; i++) {
    categories.push(data.meals[i].strCategory);
  }
  
  categories.sort(); // Op alfabetische volgorde
  return categories;
}

// Haal alle landen/gebieden op
async function getAreas() {
  const data = await fetchData('list.php?a=list');
  
  if (!data.meals) {
    return [];
  }
  
  const areas = [];
  for (let i = 0; i < data.meals.length; i++) {
    areas.push(data.meals[i].strArea);
  }
  
  areas.sort();
  return areas;
}

// Zoek maaltijden op naam
async function searchMealsByName(searchTerm) {
  const data = await fetchData(`search.php?s=${searchTerm}`);
  
  if (!data.meals) {
    return [];
  }
  
  const results = [];
  for (let i = 0; i < data.meals.length; i++) {
    results.push(cleanMeal(data.meals[i]));
  }
  
  return results;
}

// Haal 1 specifieke maaltijd op via ID (gebruik ik voor favorieten)
async function getMealById(mealId) {
  const data = await fetchData(`lookup.php?i=${mealId}`);
  
  if (!data.meals || data.meals.length === 0) {
    return null;
  }
  
  return cleanMeal(data.meals[0]);
}