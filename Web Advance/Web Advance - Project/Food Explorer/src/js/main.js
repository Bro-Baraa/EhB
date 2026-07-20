import { getMealById, loadAreas, loadCategories, loadInitialMeals } from './api.js';
import { clearAllFavs, getFavIds, loadFavMeals, toggleFav } from './favorites.js';
import { debounce, filterMeals, sortMeals } from './filters.js';
import { getPreferences, savePreference } from './preferences.js';
import { loadFromLocal, saveToLocal } from './storage.js';
import { translate } from './translations.js';
import {
  closeModal,
  elements,
  fillSelect,
  renderMeals,
  renderModal,
  setLoading,
  showError,
  showToast,
  switchPage,
  updateFavoriteCount,
} from './ui.js';

const NEWSLETTER_KEY = 'food_explorer_newsletter';

let allMeals = [];
let favoriteMeals = [];
let categories = [];
let areas = [];
let eventsAreBound = false;
let cardObserver = null;
const detailsCache = new Map();

const state = {
  searchTerm: '',
  category: '',
  area: '',
  sortBy: 'name',
};

function getLanguage() {
  return getPreferences().language;
}

function getVisibleMeals() {
  const filtered = filterMeals(
    allMeals,
    state.searchTerm,
    state.category,
    state.area
  );

  return sortMeals(filtered, state.sortBy);
}

function observeCards() {
  const cards = document.querySelectorAll('.meal-card:not(.visible)');

  if (!('IntersectionObserver' in window)) {
    cards.forEach((card) => card.classList.add('visible'));
    return;
  }

  cardObserver ??= new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card) => cardObserver.observe(card));
}

function updateResults() {
  const preferences = getPreferences();
  const visibleMeals = getVisibleMeals();

  elements.errorState.classList.add('hidden');
  renderMeals(elements.mealsContainer, visibleMeals, elements.emptyState, {
    view: preferences.view,
    language: preferences.language,
  });

  elements.resultsCount.textContent = `${visibleMeals.length} ${translate(preferences.language, 'mealsFound')}`;
  elements.resetFilters.classList.toggle('hidden', !hasActiveFilters());
  observeCards();
}

function hasActiveFilters() {
  return Boolean(
    state.searchTerm
      || state.category
      || state.area
      || state.sortBy !== 'name'
  );
}

async function renderFavorites() {
  const preferences = getPreferences();

  try {
    favoriteMeals = await loadFavMeals();
    updateFavoriteCount(getFavIds().length);

    renderMeals(elements.favoritesContainer, favoriteMeals, elements.favoritesEmpty, {
      view: preferences.view,
      language: preferences.language,
    });

    observeCards();
  } catch (error) {
    console.error('Favorites could not be rendered.', error);
    showToast(translate(preferences.language, 'favoritesError'));
  }
}

function findMealSummary(mealId) {
  return [...allMeals, ...favoriteMeals].find((meal) => meal.id === mealId) ?? null;
}

async function loadMealDetails(mealId) {
  if (detailsCache.has(mealId)) {
    return detailsCache.get(mealId);
  }

  const meal = await getMealById(mealId);

  if (meal) {
    detailsCache.set(mealId, meal);
  }

  return meal;
}

async function handleCardClick(event) {
  const button = event.target.closest('button[data-action]');

  if (!button) return;

  const mealId = button.dataset.id;
  const language = getLanguage();

  if (button.dataset.action === 'details') {
    button.disabled = true;

    try {
      const meal = await loadMealDetails(mealId);

      if (!meal) throw new Error('Meal not found');
      renderModal(meal, language);
    } catch (error) {
      console.error('Meal details could not be loaded.', error);
      showToast(translate(language, 'detailsError'));
    } finally {
      button.disabled = false;
    }

    return;
  }

  if (button.dataset.action === 'favorite') {
    const meal = findMealSummary(mealId);

    if (!meal) return;

    const result = toggleFav(meal);
    showToast(translate(language, result.added ? 'savedMessage' : 'removedMessage'));
    updateFavoriteCount(result.favorites.length);
    updateResults();
    await renderFavorites();
  }
}

const handleSearch = debounce(() => {
  state.searchTerm = elements.searchInput.value.trim();
  updateResults();
}, 250);

function resetFilters() {
  state.searchTerm = '';
  state.category = '';
  state.area = '';
  state.sortBy = 'name';

  elements.searchInput.value = '';
  elements.searchClear.classList.add('hidden');
  elements.categoryFilter.value = '';
  elements.areaFilter.value = '';
  elements.sortSelect.value = 'name';

  updateResults();
}

function updateFilterSelects(language) {
  fillSelect(
    elements.categoryFilter,
    categories,
    translate(language, 'allCategories'),
    state.category
  );

  fillSelect(
    elements.areaFilter,
    areas,
    translate(language, 'allCuisines'),
    state.area
  );
}

function applyLanguage(language) {
  document.documentElement.lang = language;
  document.title = language === 'nl'
    ? 'Food Explorer - Recepten ontdekken'
    : 'Food Explorer - Discover recipes';

  document.querySelectorAll('[data-en][data-nl]').forEach((element) => {
    element.textContent = language === 'nl' ? element.dataset.nl : element.dataset.en;
  });

  elements.searchInput.placeholder = translate(language, 'searchPlaceholder');
  elements.searchInput.setAttribute('aria-label', translate(language, 'searchLabel'));
  elements.searchClear.setAttribute('aria-label', translate(language, 'clearSearch'));
  elements.categoryFilter.setAttribute('aria-label', translate(language, 'categoryLabel'));
  elements.areaFilter.setAttribute('aria-label', translate(language, 'cuisineLabel'));
  elements.sortSelect.setAttribute('aria-label', translate(language, 'sortLabel'));
  elements.newsletterEmail.setAttribute('aria-label', translate(language, 'newsletterLabel'));

  updateFilterSelects(language);
}

function applyPreferences({ rerender = true } = {}) {
  const preferences = getPreferences();
  const isListView = preferences.view === 'list';

  document.documentElement.dataset.theme = preferences.theme;
  elements.langSelect.value = preferences.language;
  elements.themeToggle.textContent = translate(
    preferences.language,
    preferences.theme === 'dark' ? 'light' : 'dark'
  );

  elements.gridBtn.classList.toggle('active', !isListView);
  elements.listBtn.classList.toggle('active', isListView);
  elements.gridBtn.setAttribute('aria-pressed', String(!isListView));
  elements.listBtn.setAttribute('aria-pressed', String(isListView));

  applyLanguage(preferences.language);

  if (rerender && allMeals.length > 0) {
    updateResults();
    renderFavorites();
  }
}

function handleNewsletterSubmit(event) {
  event.preventDefault();

  const language = getLanguage();
  const email = elements.newsletterEmail.value.trim().toLowerCase();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const storedEmails = loadFromLocal(NEWSLETTER_KEY, []);
  const savedEmails = Array.isArray(storedEmails) ? storedEmails : [];

  elements.formFeedback.classList.remove('hidden', 'error', 'success');
  elements.newsletterEmail.setAttribute('aria-invalid', String(!validEmail));

  if (!validEmail) {
    elements.formFeedback.textContent = translate(language, 'invalidEmail');
    elements.formFeedback.classList.add('error');
    return;
  }

  if (savedEmails.includes(email)) {
    elements.formFeedback.textContent = translate(language, 'duplicateEmail');
    elements.formFeedback.classList.add('error');
    return;
  }

  saveToLocal(NEWSLETTER_KEY, [...savedEmails, email]);
  elements.newsletterEmail.setAttribute('aria-invalid', 'false');
  elements.formFeedback.textContent = translate(language, 'newsletterSuccess');
  elements.formFeedback.classList.add('success');
  elements.newsletterEmail.value = '';
}

function handleModalKeyboard(event) {
  if (elements.modal.classList.contains('hidden')) return;

  if (event.key === 'Escape') {
    closeModal();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = elements.modal.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function bindEvents() {
  if (eventsAreBound) return;

  elements.searchInput.addEventListener('input', () => {
    elements.searchClear.classList.toggle('hidden', elements.searchInput.value.trim() === '');
    handleSearch();
  });

  elements.searchClear.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.searchClear.classList.add('hidden');
    state.searchTerm = '';
    updateResults();
    elements.searchInput.focus();
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
      switchPage(button.dataset.view);

      if (button.dataset.view === 'favorites') {
        renderFavorites();
      }
    });
  });

  elements.clearFavorites.addEventListener('click', async () => {
    const language = getLanguage();

    if (!window.confirm(translate(language, 'clearConfirm'))) return;

    clearAllFavs();
    updateFavoriteCount(0);
    updateResults();
    await renderFavorites();
  });

  elements.themeToggle.addEventListener('click', () => {
    const currentTheme = getPreferences().theme;
    savePreference('theme', currentTheme === 'dark' ? 'light' : 'dark');
    applyPreferences();
  });

  elements.langSelect.addEventListener('change', (event) => {
    savePreference('language', event.target.value);
    applyPreferences();
  });

  elements.gridBtn.addEventListener('click', () => {
    savePreference('view', 'grid');
    applyPreferences();
  });

  elements.listBtn.addEventListener('click', () => {
    savePreference('view', 'list');
    applyPreferences();
  });

  elements.modalClose.addEventListener('click', closeModal);
  elements.modal.addEventListener('click', (event) => {
    if (event.target.dataset.close === 'modal') closeModal();
  });

  window.addEventListener('keydown', handleModalKeyboard);
  elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  elements.retryButton.addEventListener('click', init);

  eventsAreBound = true;
}

async function init() {
  bindEvents();
  setLoading(true);
  elements.errorState.classList.add('hidden');

  try {
    const [meals, categoryList, areaList] = await Promise.all([
      loadInitialMeals(),
      loadCategories(),
      loadAreas(),
    ]);

    allMeals = meals;

    const usedCategories = new Set(meals.map((meal) => meal.category));
    const usedAreas = new Set(meals.map((meal) => meal.area));

    categories = categoryList.filter((category) => usedCategories.has(category));
    areas = areaList.filter((area) => usedAreas.has(area));

    applyPreferences({ rerender: false });
    updateResults();
    await renderFavorites();
  } catch (error) {
    console.error('Food Explorer could not start.', error);
    showError();
    showToast(translate(getLanguage(), 'retryFailed'));
  } finally {
    setLoading(false);
  }
}

init();
