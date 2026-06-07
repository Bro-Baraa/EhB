// Filteren en sorteren - simpele logica

// Filter op zoekterm, categorie en land
function filterMeals(meals, search, category, area) {
  // Begin met alle maaltijden
  let result = [...meals];
  
  // Filter op zoekterm (als die er is)
  if (search && search.trim() !== '') {
    const term = search.toLowerCase().trim();
    const filtered = [];
    
    for (let i = 0; i < result.length; i++) {
      const meal = result[i];
      const nameMatch = meal.name.toLowerCase().includes(term);
      const catMatch = meal.category.toLowerCase().includes(term);
      const areaMatch = meal.area.toLowerCase().includes(term);
      
      if (nameMatch || catMatch || areaMatch) {
        filtered.push(meal);
      }
    }
    
    result = filtered;
  }
  
  // Filter op categorie
  if (category && category !== '') {
    const filtered = [];
    
    for (let i = 0; i < result.length; i++) {
      if (result[i].category === category) {
        filtered.push(result[i]);
      }
    }
    
    result = filtered;
  }
  
  // Filter op land/area
  if (area && area !== '') {
    const filtered = [];
    
    for (let i = 0; i < result.length; i++) {
      if (result[i].area === area) {
        filtered.push(result[i]);
      }
    }
    
    result = filtered;
  }
  
  return result;
}

// Sorteer op verschillende manieren
function sortMeals(meals, sortType) {
  const sorted = [...meals];
  
  if (sortType === 'name') {
    // A-Z
    sorted.sort(function(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  } 
  else if (sortType === 'name-desc') {
    // Z-A
    sorted.sort(function(a, b) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
  }
  else if (sortType === 'category') {
    sorted.sort(function(a, b) {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      return 0;
    });
  }
  else if (sortType === 'area') {
    sorted.sort(function(a, b) {
      if (a.area < b.area) return -1;
      if (a.area > b.area) return 1;
      return 0;
    });
  }
  
  return sorted;
}

// Debounce functie voor search (wacht even met zoeken)
function debounce(func, wait) {
  let timeout;
  
  return function() {
    const context = this;
    const args = arguments;
    
    clearTimeout(timeout);
    
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}