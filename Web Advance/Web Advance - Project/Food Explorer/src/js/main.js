import {
  getInitialMeals,
  getCategories,
  getAreas,
  searchMealsByName,
  getMealById
} from './api.js';

import { filterMeals, sortMeals, debounce } from './filters.js';
import { getFavIds, isFav, toggleFav, clearAllFavs, loadFavMeals } from './favorites.js';
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

// ============================================
// STATE
// ============================================

let allMeals = [];
let visibleMeals = [];
let categoriesList = [];
let areasList = [];

const state = {
  searchTerm: '',
  category: '',
  area: '',
  sortBy: 'name',
};

// ============================================
// HELPERS
// ============================================

// Zoek een meal in allMeals of haal van API
const findMeal = async (id) => {
  let meal = allMeals.find(m => m.id === id);
  if (meal) return meal;
  
  try {
    meal = await getMealById(id);
    if (meal) allMeals.push(meal);
    return meal;
  } catch (err) {
    console.log('Meal not found:', err);
    return null;
  }
};

const hasActiveFilters = () => {
  return state.searchTerm !== '' ||
         state.category !== '' ||
         state.area !== '' ||
         state.sortBy !== 'name';
};

// ============================================
// UPDATE BROWSE VIEW
// ============================================

const updateResults = () => {
  // Filteren EN sorteren
  let filtered = filterMeals(allMeals, state.searchTerm, state.category, state.area);
  let sorted = sortMeals(filtered, state.sortBy);
  visibleMeals = sorted;
  
  renderMeals(elements.mealsContainer, visibleMeals, elements.emptyState);

  const language = getPreferences().language;
  const resultText = language === 'nl' ? 'maaltijden gevonden' : 'meals found';
  elements.resultsCount.textContent = `${visibleMeals.length} ${resultText}`;
  elements.resetFilters.classList.toggle('hidden', !hasActiveFilters());
};

// ============================================
// UPDATE FAVORITES VIEW
// ============================================

const renderFavorites = async () => {
  setLoading(true);
  try {
    const favorites = await loadFavMeals();
    updateFavoriteCount(favorites.length);
    renderMeals(elements.favoritesContainer, favorites, elements.favoritesEmpty);
  } catch (err) {
    console.log('Fav error:', err);
    showToast('Could not load favorites');
  } finally {
    setLoading(false);
  }
};

// ============================================
// HANDLE CARD CLICKS
// ============================================

const handleCardClick = async (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const mealId = button.dataset.id;
  if (!mealId) return;

  if (button.dataset.action === 'details') {
    setLoading(true);
    try {
      const meal = await findMeal(mealId);
      if (meal) {
        renderModal(meal);
      } else {
        showToast('Could not load details');
      }
    } catch (err) {
      console.log('Details error:', err);
      showToast('Error loading details');
    } finally {
      setLoading(false);
    }
    return;
  }

  if (button.dataset.action === 'favorite') {
    const result = toggleFav(mealId);
    const language = getPreferences().language;
    
    // Update UI van de knop
    if (result.added) {
      button.textContent = language === 'nl' ? 'Verwijder' : 'Remove';
      showToast(language === 'nl' ? 'Opgeslagen als favoriet ❤️' : 'Saved to favorites ❤️');
    } else {
      button.textContent = language === 'nl' ? 'Opslaan' : 'Save';
      showToast(language === 'nl' ? 'Verwijderd uit favorieten' : 'Removed from favorites');
    }
    
    updateResults();
    renderFavorites();
  }
};

// ============================================
// SEARCH
// ============================================

const handleSearch = debounce(async () => {
  const value = elements.searchInput.value.trim();
  const language = getPreferences().language;

  if (value !== '' && value.length < 2 && value.length > 0) {
    showToast(language === 'nl' ? 'Typ minstens 2 tekens' : 'Type at least 2 characters');
    return;
  }

  state.searchTerm = value;
  elements.searchClear.classList.toggle('hidden', value === '');

  if (value.length >= 2) {
    setLoading(true);
    try {
      const apiMeals = await searchMealsByName(value);
      allMeals = apiMeals;
    } catch (error) {
      console.warn('Search failed:', error);
      showToast(language === 'nl' ? 'Zoeken mislukt' : 'Search failed');
    } finally {
      setLoading(false);
    }
  } else if (value === '') {
    setLoading(true);
    try {
      allMeals = await getInitialMeals();
    } catch (err) {
      console.log('Reload failed:', err);
    } finally {
      setLoading(false);
    }
  }

  updateResults();
}, 350);

// ============================================
// RESET FILTERS
// ============================================

const resetFilters = async () => {
  state.searchTerm = '';
  state.category = '';
  state.area = '';
  state.sortBy = 'name';

  elements.searchInput.value = '';
  elements.categoryFilter.value = '';
  elements.areaFilter.value = '';
  elements.sortSelect.value = 'name';
  elements.searchClear.classList.add('hidden');

  setLoading(true);
  try {
    allMeals = await getInitialMeals();
    updateResults();
  } catch (err) {
    console.log('Reset failed:', err);
  } finally {
    setLoading(false);
  }
};

// ============================================
// UPDATE FILTER DROPDOWNS
// ============================================

const updateFilterSelects = () => {
  const language = getPreferences().language;
  const categoryPlaceholder = language === 'nl' ? 'Alle categorieën' : 'All Categories';
  const areaPlaceholder = language === 'nl' ? 'Alle keukens' : 'All Cuisines';

  const currentCategory = elements.categoryFilter.value;
  const currentArea = elements.areaFilter.value;

  fillSelect(elements.categoryFilter, categoriesList, categoryPlaceholder);
  fillSelect(elements.areaFilter, areasList, areaPlaceholder);

  if (currentCategory && categoriesList.includes(currentCategory)) {
    elements.categoryFilter.value = currentCategory;
    state.category = currentCategory;
  } else {
    state.category = '';
  }
  
  if (currentArea && areasList.includes(currentArea)) {
    elements.areaFilter.value = currentArea;
    state.area = currentArea;
  } else {
    state.area = '';
  }
};

// ============================================
// LANGUAGE
// ============================================

const applyLanguage = (language) => {
  const textElements = document.querySelectorAll('[data-en]');
  textElements.forEach((element) => {
    if (element.dataset.en && element.dataset.nl) {
      element.textContent = language === 'nl' ? element.dataset.nl : element.dataset.en;
    }
  });

  elements.searchInput.placeholder = language === 'nl' ? 'Maaltijden zoeken...' : 'Search meals...';

  if (categoriesList.length && areasList.length) {
    updateFilterSelects();
    state.category = elements.categoryFilter.value;
    state.area = elements.areaFilter.value;
    updateResults();
  }
};

// ============================================
// PREFERENCES
// ============================================

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

// ============================================
// NEWSLETTER
// ============================================

let feedbackTimeout;
const handleNewsletterSubmit = (event) => {
  event.preventDefault();
  const emailInput = document.querySelector('#newsletter-email');
  const feedback = document.querySelector('#form-feedback');
  const language = getPreferences().language;

  if (!emailInput || !feedback) return;

  const email = emailInput.value.trim();

  if (feedbackTimeout) clearTimeout(feedbackTimeout);

  if (email === '') {
    feedback.textContent = language === 'nl'
      ? 'Vul een e-mailadres in.'
      : 'Please fill in an email address.';
    feedback.classList.remove('hidden');
    feedbackTimeout = setTimeout(() => feedback.classList.add('hidden'), 3000);
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    feedback.textContent = language === 'nl'
      ? 'Gebruik een geldig e-mailadres.'
      : 'Please use a valid email address.';
    feedback.classList.remove('hidden');
    feedbackTimeout = setTimeout(() => feedback.classList.add('hidden'), 3000);
    return;
  }

  feedback.textContent = language === 'nl' ? 'Bedankt voor je inschrijving!' : 'Thanks for joining!';
  feedback.classList.remove('hidden');
  feedbackTimeout = setTimeout(() => feedback.classList.add('hidden'), 3000);
  emailInput.value = '';
};

// ============================================
// EVENT BINDING
// ============================================

const bindEvents = () => {
  elements.searchForm?.addEventListener('submit', (e) => e.preventDefault());
  elements.searchInput?.addEventListener('input', handleSearch);

  elements.searchClear?.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchTerm = '';
    elements.searchClear.classList.add('hidden');
    handleSearch();
  });

  elements.categoryFilter?.addEventListener('change', (event) => {
    state.category = event.target.value;
    updateResults();
  });

  elements.areaFilter?.addEventListener('change', (event) => {
    state.area = event.target.value;
    updateResults();
  });

  elements.sortSelect?.addEventListener('change', (event) => {
    state.sortBy = event.target.value;
    updateResults();
  });

  elements.resetFilters?.addEventListener('click', resetFilters);

  elements.mealsContainer?.addEventListener('click', handleCardClick);
  elements.favoritesContainer?.addEventListener('click', handleCardClick);

  elements.navButtons?.forEach((button) => {
    button.addEventListener('click', () => {
      switchView(button.dataset.view);
      if (button.dataset.view === 'favorites') {
        renderFavorites();
      }
    });
  });

  elements.clearFavorites?.addEventListener('click', () => {
    const language = getPreferences().language;
    const question = language === 'nl'
      ? 'Alle favorieten verwijderen?'
      : 'Remove all favorites?';
    if (!confirm(question)) return;

    clearAllFavs();
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

  elements.langSelect?.addEventListener('change', (event) => {
    savePreference('language', event.target.value);
    applyPreferences();
    updateResults();
    renderFavorites();
    const message = event.target.value === 'nl' ? 'Taal opgeslagen' : 'Language saved';
    showToast(message);
  });

  elements.gridBtn?.addEventListener('click', () => {
    savePreference('view', 'grid');
    applyPreferences();
  });

  elements.listBtn?.addEventListener('click', () => {
    savePreference('view', 'list');
    applyPreferences();
  });

  elements.modalClose?.addEventListener('click', () => {
    elements.modal.classList.add('hidden');
  });

  elements.modal?.addEventListener('click', (event) => {
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

// ============================================
// INIT
// ============================================

const init = async () => {
  try {
    applyPreferences();
    bindEvents();
    setLoading(true);

    const data = await Promise.all([
      getInitialMeals(),
      getCategories(),
      getAreas(),
    ]);

    allMeals = data[0];
    categoriesList = data[1];
    areasList = data[2];

    const language = getPreferences().language;
    const categoryPlaceholder = language === 'nl' ? 'Alle categorieën' : 'All Categories';
    const areaPlaceholder = language === 'nl' ? 'Alle keukens' : 'All Cuisines';

    fillSelect(elements.categoryFilter, categoriesList, categoryPlaceholder);
    fillSelect(elements.areaFilter, areasList, areaPlaceholder);

    updateResults();
    renderFavorites();
  } catch (error) {
    console.error('App failed:', error);
    elements.resultsCount.textContent = 'Could not load meals. Please try again later.';
  } finally {
    setLoading(false);
  }
};

init();