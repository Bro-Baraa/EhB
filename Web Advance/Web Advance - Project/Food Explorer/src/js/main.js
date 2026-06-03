import { loadAreas, loadCategories, loadInitialMeals, searchMealsFromApi } from './api.js';
import { debounce, applyFilters } from './filters.js';
import { clearFavorites, getFavorites, toggleFavorite } from './favorites.js';
import { getPreferences, savePreference } from './preferences.js';

import {
  elements,
  fillSelect,
  renderMeals,
  renderModal,
  setLoading,
  showToast,
  switchView,
  updateFavoriteCount,
} from './ui.js';



let allMeals = [];
let visibleMeals = [];

const state = {
  searchTerm: '',
  category: '',
  area: '',
  sortBy: 'name-asc',
};




// Find a meal in all meals or favorites.
const findMeal = (id) => {
  const favorites = getFavorites();
  const meals = [...allMeals, ...favorites];



  return meals.find((meal) => meal.id === id);
};





// Check if filters are used.
const hasActiveFilters = () => {
  return (
    state.searchTerm !== '' ||
    state.category !== '' ||
    state.area !== '' ||
    state.sortBy !== 'name-asc'
  );
};








// Show meals after search, filters and sorting.
const updateResults = () => {
  visibleMeals = applyFilters(allMeals, state);

  renderMeals(elements.mealsContainer, visibleMeals, elements.emptyState);


  const language = getPreferences().language;
  const text = language === 'nl' ? 'maaltijden gevonden' : 'meals found';


  elements.resultsCount.textContent = `${visibleMeals.length} ${text}`;
  elements.resetFilters.classList.toggle('hidden', !hasActiveFilters());
};








// Show favorite meals.
const renderFavorites = () => {
  const favorites = getFavorites();

  updateFavoriteCount(favorites);
  renderMeals(elements.favoritesContainer, favorites, elements.favoritesEmpty);
};






// Handle buttons inside meal cards.
const handleCardClick = (event) => {
  const button = event.target.closest('button[data-action]');

  if (!button) {
    return;
  }

  const meal = findMeal(button.dataset.id);

  if (!meal) {
    return;
  }

  if (button.dataset.action === 'details') {
    renderModal(meal);
    return;
  }


  const result = toggleFavorite(meal);

  updateResults();
  renderFavorites();

  const language = getPreferences().language;

  let message;


  if (result.added) {
    message = language === 'nl' ? 'Opgeslagen als favoriet ❤️' : 'Saved to favorites ❤️';
  } else {
    message = language === 'nl' ? 'Verwijderd uit favorieten' : 'Removed from favorites';
  }

  showToast(message);
};




// Search meals.
const handleSearch = debounce(async () => {
  const value = elements.searchInput.value.trim();
  const language = getPreferences().language;

  if (value !== '' && value.length < 2) {
    const message = language === 'nl' ? 'Typ minstens 2 tekens' : 'Please type at least 2 characters';
    showToast(message);
    return;
  }




  state.searchTerm = value;
  elements.searchClear.classList.toggle('hidden', value === '');

  if (value.length >= 2) {
    try {
      const apiMeals = await searchMealsFromApi(value);
      const mealMap = new Map();

      allMeals.forEach((meal) => {
        mealMap.set(meal.id, meal);
      });

      apiMeals.forEach((meal) => {
        mealMap.set(meal.id, meal);
      });

      allMeals = Array.from(mealMap.values());
    } catch (error) {
      console.warn(error);
    }
  }

  updateResults();
}, 350);





// Reset all filters.
const resetFilters = () => {
  state.searchTerm = '';
  state.category = '';
  state.area = '';
  state.sortBy = 'name-asc';

  elements.searchInput.value = '';
  elements.categoryFilter.value = '';
  elements.areaFilter.value = '';
  elements.sortSelect.value = 'name-asc';

  elements.searchClear.classList.add('hidden');

  updateResults();
};





// Change text by selected language.
const applyLanguage = (language) => {
  const textElements = document.querySelectorAll('[data-en]');

  textElements.forEach((element) => {
    element.textContent = language === 'nl' ? element.dataset.nl : element.dataset.en;
  });

  elements.searchInput.placeholder = language === 'nl'
    ? 'Maaltijden zoeken...'
    : 'Search meals...';
};



// Apply saved theme, language and view.
const applyPreferences = () => {
  const preferences = getPreferences();

  document.documentElement.dataset.theme = preferences.theme;

  const themeButton = document.querySelector('#theme-toggle');

  if (themeButton) {
    if (preferences.theme === 'dark') {
      themeButton.textContent = preferences.language === 'nl' ? 'Licht' : 'Light';
    } else {
      themeButton.textContent = preferences.language === 'nl' ? 'Donker' : 'Dark';
    }
  }

  elements.langSelect.value = preferences.language;
  applyLanguage(preferences.language);

  const listView = preferences.view === 'list';

  elements.mealsContainer.classList.toggle('list-view', listView);
  elements.favoritesContainer.classList.toggle('list-view', listView);

  elements.gridBtn.classList.toggle('active', preferences.view === 'grid');
  elements.listBtn.classList.toggle('active', listView);
};





// Add all events.
const bindEvents = () => {
  elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  elements.searchInput.addEventListener('input', handleSearch);

  elements.searchClear.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchTerm = '';
    elements.searchClear.classList.add('hidden');

    updateResults();
  });

  elements.categoryFilter.addEventListener('change', (event) => {
    state.category = event.target.value;
    updateResults();
  });

  elements.areaFilter.addEventListener('change', (event) => {
    state.area = event.target.value;
    updateResults();
  });

  elements.sortSelect.addEventListener('change', (event) => {
    state.sortBy = event.target.value;
    updateResults();
  });

  elements.resetFilters.addEventListener('click', resetFilters);

  elements.mealsContainer.addEventListener('click', handleCardClick);
  elements.favoritesContainer.addEventListener('click', handleCardClick);

  elements.navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      switchView(button.dataset.view);

      if (button.dataset.view === 'favorites') {
        renderFavorites();
      }
    });
  });

  elements.clearFavorites.addEventListener('click', () => {
    const language = getPreferences().language;
    const question = language === 'nl' ? 'Alle favorieten verwijderen?' : 'Remove all favorites?';

    if (!window.confirm(question)) {
      return;
    }

    clearFavorites();
    updateResults();
    renderFavorites();

    const message = language === 'nl' ? 'Favorieten gewist' : 'Favorites cleared';
    showToast(message);
  });

  const themeButton = document.querySelector('#theme-toggle');

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const preferences = getPreferences();
      const nextTheme = preferences.theme === 'dark' ? 'light' : 'dark';

      savePreference('theme', nextTheme);
      applyPreferences();
    });
  }

  elements.langSelect.addEventListener('change', (event) => {
    savePreference('language', event.target.value);

    applyPreferences();
    updateResults();

    const message = event.target.value === 'nl' ? 'Taal opgeslagen' : 'Language saved';
    showToast(message);
  });

  elements.gridBtn.addEventListener('click', () => {
    savePreference('view', 'grid');
    applyPreferences();
  });

  elements.listBtn.addEventListener('click', () => {
    savePreference('view', 'list');
    applyPreferences();
  });

  elements.modalClose.addEventListener('click', () => {
    elements.modal.classList.add('hidden');
  });

  elements.modal.addEventListener('click', (event) => {
    if (event.target.dataset.close === 'modal') {
      elements.modal.classList.add('hidden');
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      elements.modal.classList.add('hidden');
    }
  });
};





// Start the app.
const init = async () => {
  try {
    applyPreferences();
    bindEvents();
    setLoading(true);

    const data = await Promise.all([
      loadInitialMeals(),
      loadCategories(),
      loadAreas(),
    ]);

    allMeals = data[0];

    const categories = data[1];
    const areas = data[2];

    const language = getPreferences().language;

    fillSelect(
      elements.categoryFilter,
      categories,
      language === 'nl' ? 'Alle categorieën' : 'All Categories'
    );

    fillSelect(
      elements.areaFilter,
      areas,
      language === 'nl' ? 'Alle keukens' : 'All Cuisines'
    );

    updateResults();
    renderFavorites();
  } catch (error) {
    console.error(error);
    elements.resultsCount.textContent = 'Could not load meals. Please try again later.';
  } finally {
    setLoading(false);
  }
};



init();