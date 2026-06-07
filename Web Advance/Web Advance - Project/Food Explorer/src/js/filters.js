// Filteren en sorteren

export function filterMeals(meals, searchTerm, category, area) {
  let result = [...meals];
  
  // Filter op zoekterm
  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase().trim();
    const filtered = [];
    for (const meal of result) {
      if (meal.name.toLowerCase().includes(term) ||
          meal.category.toLowerCase().includes(term) ||
          meal.area.toLowerCase().includes(term)) {
        filtered.push(meal);
      }
    }
    result = filtered;
  }
  
  // Filter op categorie
  if (category && category !== '') {
    const filtered = [];
    for (const meal of result) {
      if (meal.category === category) {
        filtered.push(meal);
      }
    }
    result = filtered;
  }
  
  // Filter op land
  if (area && area !== '') {
    const filtered = [];
    for (const meal of result) {
      if (meal.area === area) {
        filtered.push(meal);
      }
    }
    result = filtered;
  }
  
  return result;
}

export function sortMeals(meals, sortType) {
  const sorted = [...meals];
  
  if (sortType === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } 
  else if (sortType === 'name-desc') {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }
  else if (sortType === 'category') {
    sorted.sort((a, b) => a.category.localeCompare(b.category));
  }
  else if (sortType === 'area') {
    sorted.sort((a, b) => a.area.localeCompare(b.area));
  }
  
  return sorted;
}

export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}