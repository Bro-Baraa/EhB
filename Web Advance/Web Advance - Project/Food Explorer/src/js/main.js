import {
  loadAreas,
  loadCategories,
  loadInitialMeals,
  searchMealsFromApi,
} from './api.js';

import { applyFilters, debounce } from './filters.js';
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

// Find a meal by id.
const findMeal = (id) => {
  const favorites = getFavorites();
  const meals = [...allMeals, ...favorites];

  return meals.find((meal) => meal.id === id);
};

// Check if the user changed filters.
const hasActiveFilters = () => {
  return (
    state.searchTerm !== '' ||
    state.category !== '' ||
    state.area !== '' ||
    state.sortBy !== 'name-asc'
  );
};

// Update the meals on the page.
const updateResults = () => {
  visibleMeals = applyFilters(allMeals, state);

  renderMeals(elements.mealsContainer, visibleMeals, elements.emptyState);

  const language = getPreferences().language;
  const resultText = language === 'nl' ? 'maaltijden gevonden' : 'meals found';

  elements.resultsCount.textContent = `${visibleMeals.length} ${resultText}`;
  elements.resetFilters.classList.toggle('hidden', !hasActiveFilters());
};

// Update the favorites page.
const renderFavorites = () => {
  const favorites = getFavorites();

  updateFavoriteCount(favorites);
  renderMeals(elements.favoritesContainer, favorites, elements.favoritesEmpty);
};

// Handle details and favorite buttons.
const handleCardClick = (event) => {
  const button = event.target.closest('button[data-action]');

  if (!button) {
    return;
  }

  const mealId = button.dataset.id;
  const meal = findMeal(mealId);

  if (!meal) {
    return;
  }

  if (button.dataset.action === 'details') {
    renderModal(meal);
    return;
  }

  if (button.dataset.action === 'favorite') {
    const result = toggleFavorite(meal);
    const language = getPreferences().language;

    updateResults();
    renderFavorites();

    if (result.added) {
      showToast(
        language === 'nl'
          ? 'Opgeslagen als favoriet ❤️'
          : 'Saved to favorites ❤️'
      );
    } else {
      showToast(
        language === 'nl'
          ? 'Verwijderd uit favorieten'
          : 'Removed from favorites'
      );
    }
  }
};

// Search meals.
const handleSearch = debounce(async () => {
  const value = elements.searchInput.value.trim();
  const language = getPreferences().language;

  if (value !== '' && value.length < 2) {
    showToast(
      language === 'nl'
        ? 'Typ minstens 2 tekens'
        : 'Please type at least 2 characters'
    );

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
      console.warn('Search failed:', error);
    }
  }

  updateResults();
}, 350);

// Reset search and filters.
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

// Change page text language.
const applyLanguage = (language) => {
  const textElements = document.querySelectorAll('[data-en]');

  textElements.forEach((element) => {
    element.textContent =
      language === 'nl' ? element.dataset.nl : element.dataset.en;
  });

  elements.searchInput.placeholder =
    language === 'nl' ? 'Maaltijden zoeken...' : 'Search meals...';
};

// Apply saved theme, language and view.
const applyPreferences = () => {
  const preferences = getPreferences();

  document.documentElement.dataset.theme = preferences.theme;

  const themeButton = document.querySelector('#theme-toggle');

  if (themeButton) {
    if (preferences.theme === 'dark') {
      themeButton.textContent =
        preferences.language === 'nl' ? 'Licht' : 'Light';
    } else {
      themeButton.textContent =
        preferences.language === 'nl' ? 'Donker' : 'Dark';
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

// Handle newsletter form.
const handleNewsletterSubmit = (event) => {
  event.preventDefault();

  const emailInput = document.querySelector('#newsletter-email');
  const feedback = document.querySelector('#form-feedback');
  const language = getPreferences().language;

  if (!emailInput || !feedback) {
    return;
  }

  const email = emailInput.value.trim();

  if (email === '') {
    feedback.textContent =
      language === 'nl'
        ? 'Vul een e-mailadres in.'
        : 'Please fill in an email address.';

    feedback.classList.remove('hidden');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    feedback.textContent =
      language === 'nl'
        ? 'Gebruik een geldig e-mailadres.'
        : 'Please use a valid email address.';

    feedback.classList.remove('hidden');
    return;
  }

  feedback.textContent =
    language === 'nl' ? 'Bedankt voor je inschrijving!' : 'Thanks for joining!';

  feedback.classList.remove('hidden');
  emailInput.value = '';
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

    const question =
      language === 'nl'
        ? 'Alle favorieten verwijderen?'
        : 'Remove all favorites?';

    if (!window.confirm(question)) {
      return;
    }

    clearFavorites();
    updateResults();
    renderFavorites();

    showToast(language === 'nl' ? 'Favorieten gewist' : 'Favorites cleared');
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
    renderFavorites();

    const message =
      event.target.value === 'nl' ? 'Taal opgeslagen' : 'Language saved';

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

  const newsletterForm = document.querySelector('#newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
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
    console.error('App failed:', error);
    elements.resultsCount.textContent =
      'Could not load meals. Please try again later.';
  } finally {
    setLoading(false);
  }
};

init();