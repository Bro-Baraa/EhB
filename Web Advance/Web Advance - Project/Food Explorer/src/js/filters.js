// Filtert de maaltijden op zoektekst, categorie en keuken.
export function filterMeals(meals, searchTerm, category, area) {
  let result = [...meals];

  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase().trim();

    result = result.filter((meal) => {
      return meal.name.toLowerCase().includes(term)
        || meal.category.toLowerCase().includes(term)
        || meal.area.toLowerCase().includes(term);
    });
  }

  if (category) {
    result = result.filter((meal) => meal.category === category);
  }

  if (area) {
    result = result.filter((meal) => meal.area === area);
  }

  return result;
}

// Sorteert de lijst zonder de originele array aan te passen.
export function sortMeals(meals, sortType) {
  const sorted = [...meals];

  if (sortType === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortType === 'name-desc') {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortType === 'category') {
    sorted.sort((a, b) => a.category.localeCompare(b.category));
  }

  if (sortType === 'area') {
    sorted.sort((a, b) => a.area.localeCompare(b.area));
  }

  return sorted;
}

// Wacht even voor de functie wordt uitgevoerd. Handig bij zoeken tijdens typen.
export function debounce(func, wait) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}