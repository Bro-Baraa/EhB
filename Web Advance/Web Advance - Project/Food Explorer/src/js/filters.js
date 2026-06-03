// Filter and sort the meal list.
export const applyFilters = (meals, filters) => {
  const searchTerm = filters.searchTerm.trim().toLowerCase();
  const category = filters.category;
  const area = filters.area;
  const sortBy = filters.sortBy;



  let filteredMeals = meals.filter((meal) => {
    const name = meal.name.toLowerCase();
    const mealCategory = meal.category.toLowerCase();
    const mealArea = meal.area.toLowerCase();





    const matchesSearch =
      searchTerm === '' ||
      name.includes(searchTerm) ||
      mealCategory.includes(searchTerm) ||
      mealArea.includes(searchTerm);



    const matchesCategory = category === '' || meal.category === category;
    const matchesArea = area === '' || meal.area === area;

    return matchesSearch && matchesCategory && matchesArea;
  });





  // Sort the result after filtering.
  filteredMeals.sort((firstMeal, secondMeal) => {
    if (sortBy === 'name-desc') {
      return secondMeal.name.localeCompare(firstMeal.name);
    }

    if (sortBy === 'category') {
      return firstMeal.category.localeCompare(secondMeal.category);
    }

    if (sortBy === 'area') {
      return firstMeal.area.localeCompare(secondMeal.area);
    }



    return firstMeal.name.localeCompare(secondMeal.name);
  }
);

  return filteredMeals;
};



// Wait a bit before running the function.
export const debounce = (callback, delay = 350) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);


    }
    ,  delay);
  };
};