export const applyFilters = (meals, { searchTerm, category, area, sortBy }) => {
  const term = searchTerm.trim().toLowerCase();

  return meals
    .filter((meal) => !term || meal.name.toLowerCase().includes(term) || meal.category.toLowerCase().includes(term) || meal.area.toLowerCase().includes(term))
    .filter((meal) => !category || meal.category === category)
    .filter((meal) => !area || meal.area === area)
    .sort((first, second) => {
      const sortMap = {
        'name-asc': () => first.name.localeCompare(second.name),
        'name-desc': () => second.name.localeCompare(first.name),
        category: () => first.category.localeCompare(second.category) || first.name.localeCompare(second.name),
        area: () => first.area.localeCompare(second.area) || first.name.localeCompare(second.name),
      };

      return (sortMap[sortBy] || sortMap['name-asc'])();
    });
};

export const debounce = (callback, delay = 350) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};
