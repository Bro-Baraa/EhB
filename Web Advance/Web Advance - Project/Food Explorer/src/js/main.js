import { loadAreas, loadCategories, loadInitialMeals, searchMealsFromApi } from './api.js';
import { debounce } from './filters.js';
import { applyFilters } from './filters.js';
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

const findMeal = (id) => [...allMeals, ...getFavorites()].find((meal) => meal.id === id);

const hasActiveFilters = () => Boolean(state.searchTerm || state.category || state.area || state.sortBy !== 'name-asc');

const updateResults = () => {
  visibleMeals = applyFilters(allMeals, state);
  renderMeals(elements.mealsContainer, visibleMeals, elements.emptyState);
  elements.resultsCount.textContent = `${visibleMeals.length} meal${visibleMeals.length === 1 ? '' : 's'} found`;
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
  showToast(result.added ? 'Meal saved to favorites ❤️' : 'Meal removed from favorites');
};

const handleSearch = debounce(async () => {
  const value = elements.searchInput.value.trim();

  if (value && value.length < 2) {
    showToast('Please type at least 2 characters');
    return;
  }

  state.searchTerm = value;
  elements.searchClear.classList.toggle('hidden', !value);

  // If local results are not enough, ask the API for more matching meals.
  if (value.length >= 2) {
    try {
      const apiMeals = await searchMealsFromApi(value);
      const mergedMeals = new Map([...allMeals, ...apiMeals].map((meal) => [meal.id, meal]));
      allMeals = Array.from(mergedMeals.values());
    } catch (error) {
      console.warn(error);
      showToast('Search API failed, showing cached meals');
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

const applyPreferences = () => {
  const preferences = getPreferences();
  document.documentElement.dataset.theme = preferences.theme;
  elements.themeToggle.textContent = preferences.theme === 'dark' ? '🌙' : '☀️';
  elements.langSelect.value = preferences.language;
  elements.mealsContainer.classList.toggle('list-view', preferences.view === 'list');
  elements.favoritesContainer.classList.toggle('list-view', preferences.view === 'list');
  elements.gridView.classList.toggle('active', preferences.view === 'grid');
  elements.listView.classList.toggle('active', preferences.view === 'list');
};

const bindEvents = () => {
  elements.searchForm.addEventListener('submit', (event) => event.preventDefault());
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
      if (button.dataset.view === 'favorites') renderFavorites();
    });
  });

  elements.clearFavorites.addEventListener('click', () => {
    const confirmed = window.confirm('Remove all favorite meals?');
    if (!confirmed) return;
    clearFavorites();
    updateResults();
    renderFavorites();
    showToast('Favorites cleared');
  });

  elements.themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    savePreference('theme', nextTheme);
    applyPreferences();
  });

  elements.langSelect.addEventListener('change', (event) => {
    savePreference('language', event.target.value);
    const message = event.target.value === 'ar' ? 'تم حفظ اللغة' : event.target.value === 'nl' ? 'Taal opgeslagen' : 'Language saved';
    showToast(message);
  });

  elements.gridView.addEventListener('click', () => {
    savePreference('view', 'grid');
    applyPreferences();
  });

  elements.listView.addEventListener('click', () => {
    savePreference('view', 'list');
    applyPreferences();
  });

  elements.modalClose.addEventListener('click', () => elements.modal.classList.add('hidden'));
  elements.modal.addEventListener('click', (event) => {
    if (event.target.dataset.close === 'modal') elements.modal.classList.add('hidden');
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') elements.modal.classList.add('hidden');
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
    fillSelect(elements.categoryFilter, categories, 'All Categories');
    fillSelect(elements.areaFilter, areas, 'All Cuisines');
    updateResults();
    renderFavorites();
  } catch (error) {
    console.error(error);
    elements.resultsCount.textContent = 'Could not load meals. Please try again later.';
    elements.emptyState.classList.remove('hidden');
  } finally {
    setLoading(false);
  }
};

init();
