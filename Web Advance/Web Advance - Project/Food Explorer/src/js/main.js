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

const findMeal = (id) => [...allMeals, ...getFavorites()].find((m) => m.id === id);

const hasActiveFilters = () =>
  Boolean(state.searchTerm || state.category || state.area || state.sortBy !== 'name-asc');

const updateResults = () => {
  visibleMeals = applyFilters(allMeals, state);
  renderMeals(elements.mealsContainer, visibleMeals, elements.emptyState);
  const lang = getPreferences().language;
  const word = lang === 'nl' ? 'maaltijden gevonden' : 'meals found';
  elements.resultsCount.textContent = `${visibleMeals.length} ${word}`;
  elements.resetFilters.classList.toggle('hidden', !hasActiveFilters());
};

const renderFavorites = () => {
  const favorites = getFavorites();
  updateFavoriteCount(favorites);
  renderMeals(elements.favoritesContainer, favorites, elements.favoritesEmpty);
};

const handleCardClick = (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const meal = findMeal(button.dataset.id);
  if (!meal) return;

  if (button.dataset.action === 'details') {
    renderModal(meal);
    return;
  }

  const result = toggleFavorite(meal);
  updateResults();
  renderFavorites();
  const lang = getPreferences().language;
  const msg = result.added
    ? (lang === 'nl' ? 'Opgeslagen als favoriet ❤️' : 'Saved to favorites ❤️')
    : (lang === 'nl' ? 'Verwijderd uit favorieten' : 'Removed from favorites');
  showToast(msg);
};

const handleSearch = debounce(async () => {
  const value = elements.searchInput.value.trim();
  const lang = getPreferences().language;

  if (value && value.length < 2) {
    showToast(lang === 'nl' ? 'Typ minstens 2 tekens' : 'Please type at least 2 characters');
    return;
  }

  state.searchTerm = value;
  elements.searchClear.classList.toggle('hidden', !value);

  if (value.length >= 2) {
    try {
      const apiMeals = await searchMealsFromApi(value);
      const merged = new Map([...allMeals, ...apiMeals].map((m) => [m.id, m]));
      allMeals = Array.from(merged.values());
    } catch (e) {
      console.warn(e);
    }
  }

  updateResults();
}, 350);

const resetFilters = () => {
  Object.assign(state, { searchTerm: '', category: '', area: '', sortBy: 'name-asc' });
  elements.searchInput.value = '';
  elements.categoryFilter.value = '';
  elements.areaFilter.value = '';
  elements.sortSelect.value = 'name-asc';
  elements.searchClear.classList.add('hidden');
  updateResults();
};

// updates text of elements that have data-en / data-nl attributes
const applyLanguage = (lang) => {
  document.querySelectorAll('[data-en]').forEach((el) => {
    el.textContent = lang === 'nl' ? el.dataset.nl : el.dataset.en;
  });
  const searchInput = document.querySelector('#search-input');
  if (searchInput) {
    searchInput.placeholder = lang === 'nl' ? 'Maaltijden zoeken...' : 'Search meals...';
  }
};

const applyPreferences = () => {
  const prefs = getPreferences();

  // theme
  document.documentElement.dataset.theme = prefs.theme;
  const themeBtn = document.querySelector('#theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = prefs.theme === 'dark'
      ? (prefs.language === 'nl' ? 'Licht' : 'Light')
      : (prefs.language === 'nl' ? 'Donker' : 'Dark');
  }

  // language
  elements.langSelect.value = prefs.language;
  applyLanguage(prefs.language);

  // view
  elements.mealsContainer.classList.toggle('list-view', prefs.view === 'list');
  elements.favoritesContainer.classList.toggle('list-view', prefs.view === 'list');
  elements.gridBtn.classList.toggle('active', prefs.view === 'grid');
  elements.listBtn.classList.toggle('active', prefs.view === 'list');
};

const bindEvents = () => {
  elements.searchForm.addEventListener('submit', (e) => e.preventDefault());
  elements.searchInput.addEventListener('input', handleSearch);
  elements.searchClear.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchTerm = '';
    elements.searchClear.classList.add('hidden');
    updateResults();
  });

  elements.categoryFilter.addEventListener('change', (e) => {
    state.category = e.target.value;
    updateResults();
  });
  elements.areaFilter.addEventListener('change', (e) => {
    state.area = e.target.value;
    updateResults();
  });
  elements.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    updateResults();
  });

  elements.resetFilters.addEventListener('click', resetFilters);
  elements.mealsContainer.addEventListener('click', handleCardClick);
  elements.favoritesContainer.addEventListener('click', handleCardClick);

  elements.navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
      if (btn.dataset.view === 'favorites') renderFavorites();
    });
  });

  elements.clearFavorites.addEventListener('click', () => {
    const lang = getPreferences().language;
    const msg = lang === 'nl' ? 'Alle favorieten verwijderen?' : 'Remove all favorites?';
    if (!window.confirm(msg)) return;
    clearFavorites();
    updateResults();
    renderFavorites();
    showToast(lang === 'nl' ? 'Favorieten gewist' : 'Favorites cleared');
  });

  // theme toggle
  document.querySelector('#theme-toggle').addEventListener('click', () => {
    const prefs = getPreferences();
    const next = prefs.theme === 'dark' ? 'light' : 'dark';
    savePreference('theme', next);
    applyPreferences();
  });

  // language switch
  elements.langSelect.addEventListener('change', (e) => {
    savePreference('language', e.target.value);
    applyPreferences();
    updateResults();
    const msg = e.target.value === 'nl' ? 'Taal opgeslagen' : 'Language saved';
    showToast(msg);
  });

  elements.gridBtn.addEventListener('click', () => {
    savePreference('view', 'grid');
    applyPreferences();
  });
  elements.listBtn.addEventListener('click', () => {
    savePreference('view', 'list');
    applyPreferences();
  });

  elements.modalClose.addEventListener('click', () => elements.modal.classList.add('hidden'));
  elements.modal.addEventListener('click', (e) => {
    if (e.target.dataset.close === 'modal') elements.modal.classList.add('hidden');
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') elements.modal.classList.add('hidden');
  });
};

const init = async () => {
  try {
    applyPreferences();
    bindEvents();
    setLoading(true);

    const [meals, categories, areas] = await Promise.all([
      loadInitialMeals(),
      loadCategories(),
      loadAreas(),
    ]);

    allMeals = meals;
    const lang = getPreferences().language;
    fillSelect(elements.categoryFilter, categories, lang === 'nl' ? 'Alle categorieën' : 'All Categories');
    fillSelect(elements.areaFilter, areas, lang === 'nl' ? 'Alle keukens' : 'All Cuisines');
    updateResults();
    renderFavorites();
  } catch (err) {
    console.error(err);
    elements.resultsCount.textContent = 'Could not load meals. Please try again later.';
  } finally {
    setLoading(false);
  }
};

init();
