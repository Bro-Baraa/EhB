import {
  loadInitialMeals,
  loadCategories,
  loadAreas,
  searchMeals,
  getMealById,
} from './api.js';

import { filterMeals, sortMeals, debounce } from './filters.js';
import { getFavIds, toggleFav, clearAllFavs, loadFavMeals } from './favorites.js';
import { getPreferences, savePreference } from './preferences.js';

import {
  elements,
  fillSelect,
  renderMeals,
  renderModal,
  setLoading,
  showError,
  showToast,
  switchView,
  updateFavoriteCount,
} from './ui.js';

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

async function findMeal(id) {
  const localMeal = allMeals.find((meal) => meal.id === id);
  if (localMeal) return localMeal;

  return getMealById(id);
}

function hasActiveFilters() {
  return state.searchTerm !== ''
    || state.category !== ''
    || state.area !== ''
    || state.sortBy !== 'name';
}

// Kleine animatie wanneer kaarten in beeld komen.
function observeCards() {
  const cards = document.querySelectorAll('.meal-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card) => observer.observe(card));
}

function updateResults() {
  const filtered = filterMeals(allMeals, state.searchTerm, state.category, state.area);
  visibleMeals = sortMeals(filtered, state.sortBy);

  renderMeals(elements.mealsContainer, visibleMeals, elements.emptyState);
  observeCards();

  const language = getPreferences().language;
  const text = language === 'nl' ? 'maaltijden gevonden' : 'meals found';

  elements.resultsCount.textContent = `${visibleMeals.length} ${text}`;
  elements.resetFilters.classList.toggle('hidden', !hasActiveFilters());
}

async function renderFavorites() {
  try {
    const favorites = await loadFavMeals();

    updateFavoriteCount(getFavIds().length);
    renderMeals(elements.favoritesContainer, favorites, elements.favoritesEmpty);
    observeCards();
  } catch (err) {
    console.log('Favorieten laden mislukt:', err);
    showToast('Could not load favorites');
  }
}

async function handleCardClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const mealId = button.dataset.id;
  const language = getPreferences().language;

  if (button.dataset.action === 'details') {
    setLoading(true);

    try {
      const meal = await findMeal(mealId);
      meal ? renderModal(meal) : showToast('Could not load details');
    } catch (err) {
      console.log('Details laden mislukt:', err);
      showToast('Error loading details');
    } finally {
      setLoading(false);
    }
  }

  if (button.dataset.action === 'favorite') {
    const result = toggleFav(mealId);

    showToast(result.added
      ? (language === 'nl' ? 'Opgeslagen als favoriet ❤️' : 'Saved to favorites ❤️')
      : (language === 'nl' ? 'Verwijderd uit favorieten' : 'Removed from favorites'));

    updateFavoriteCount(result.favorites.length);
    updateResults();
    renderFavorites();
  }
}

const handleSearch = debounce(async () => {
  const value = elements.searchInput.value.trim();
  const language = getPreferences().language;

  if (value.length === 1) {
    showToast(language === 'nl' ? 'Typ minstens 2 tekens' : 'Type at least 2 characters');
    return;
  }

  state.searchTerm = value;
  elements.searchClear.classList.toggle('hidden', value === '');

  setLoading(true);

  try {
    allMeals = value.length >= 2 ? await searchMeals(value) : await loadInitialMeals();
    updateResults();
  } catch (err) {
    console.log('Zoeken mislukt:', err);
    showToast(language === 'nl' ? 'Zoeken mislukt' : 'Search failed');
  } finally {
    setLoading(false);
  }
}, 350);

async function resetFilters() {
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
    allMeals = await loadInitialMeals();
    updateResults();
  } catch (err) {
    console.log('Reset mislukt:', err);
  } finally {
    setLoading(false);
  }
}

function updateFilterSelects() {
  const language = getPreferences().language;
  const categoryText = language === 'nl' ? 'Alle categorieën' : 'All Categories';
  const areaText = language === 'nl' ? 'Alle keukens' : 'All Cuisines';

  fillSelect(elements.categoryFilter, categoriesList, categoryText);
  fillSelect(elements.areaFilter, areasList, areaText);
}

function applyLanguage(language) {
  document.querySelectorAll('[data-en]').forEach((element) => {
    element.textContent = language === 'nl' ? element.dataset.nl : element.dataset.en;
  });

  elements.searchInput.placeholder = language === 'nl' ? 'Maaltijden zoeken...' : 'Search meals...';

  updateFilterSelects();
}

function applyPreferences() {
  const preferences = getPreferences();
  const themeButton = document.querySelector('#theme-toggle');

  document.documentElement.dataset.theme = preferences.theme;
  elements.langSelect.value = preferences.language;

  if (themeButton) {
    themeButton.textContent = preferences.theme === 'dark'
      ? (preferences.language === 'nl' ? 'Licht' : 'Light')
      : (preferences.language === 'nl' ? 'Donker' : 'Dark');
  }

  const isList = preferences.view === 'list';

  elements.mealsContainer.classList.toggle('list-view', isList);
  elements.favoritesContainer.classList.toggle('list-view', isList);
  elements.gridBtn.classList.toggle('active', !isList);
  elements.listBtn.classList.toggle('active', isList);

  applyLanguage(preferences.language);
}

function handleNewsletterSubmit(event) {
  event.preventDefault();

  const emailInput = document.querySelector('#newsletter-email');
  const feedback = document.querySelector('#form-feedback');
  const language = getPreferences().language;

  if (!emailInput || !feedback) return;

  const email = emailInput.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!validEmail) {
    feedback.textContent = language === 'nl'
      ? 'Gebruik een geldig e-mailadres.'
      : 'Please use a valid email address.';

    feedback.classList.remove('hidden');
    return;
  }

  feedback.textContent = language === 'nl'
    ? 'Bedankt voor je inschrijving!'
    : 'Thanks for joining!';

  feedback.classList.remove('hidden');
  emailInput.value = '';
}

function bindEvents() {
  elements.searchInput?.addEventListener('input', handleSearch);

  elements.searchClear?.addEventListener('click', () => {
    elements.searchInput.value = '';
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

  elements.navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      switchView(button.dataset.view);

      if (button.dataset.view === 'favorites') {
        renderFavorites();
      }
    });
  });

  elements.clearFavorites?.addEventListener('click', () => {
    clearAllFavs();
    updateFavoriteCount(0);
    updateResults();
    renderFavorites();
  });

  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    const preferences = getPreferences();
    const nextTheme = preferences.theme === 'dark' ? 'light' : 'dark';

    savePreference('theme', nextTheme);
    applyPreferences();
  });

  elements.langSelect?.addEventListener('change', (event) => {
    savePreference('language', event.target.value);
    applyPreferences();
    updateResults();
    renderFavorites();
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

  document.querySelector('#newsletter-form')?.addEventListener('submit', handleNewsletterSubmit);
  document.querySelector('#retry-btn')?.addEventListener('click', init);
}

async function init() {
  setLoading(true);

  try {
    bindEvents();

    const [meals, categories, areas] = await Promise.all([
      loadInitialMeals(),
      loadCategories(),
      loadAreas(),
    ]);

    allMeals = meals;
    categoriesList = categories;
    areasList = areas;

    applyPreferences();
    updateResults();
    renderFavorites();
  } catch (err) {
    console.log('App starten mislukt:', err);
    showError();
  } finally {
    setLoading(false);
  }
}

init();