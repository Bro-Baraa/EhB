import { isFavorite } from './favorites.js';

// all the DOM elements we need, selected once here
export const elements = {
  navButtons:          document.querySelectorAll('.nav-btn'),
  browseView:          document.querySelector('#view-browse'),
  favoritesView:       document.querySelector('#view-favorites'),
  mealsContainer:      document.querySelector('#meals-container'),
  favoritesContainer:  document.querySelector('#favorites-container'),
  favoritesEmpty:      document.querySelector('#favorites-empty'),
  searchForm:          document.querySelector('#search-form'),
  searchInput:         document.querySelector('#search-input'),
  searchClear:         document.querySelector('#search-clear'),
  categoryFilter:      document.querySelector('#filter-category'),
  areaFilter:          document.querySelector('#filter-area'),
  sortSelect:          document.querySelector('#sort-select'),
  resultsCount:        document.querySelector('#results-count'),
  resetFilters:        document.querySelector('#reset-filters'),
  loader:              document.querySelector('#loader'),
  emptyState:          document.querySelector('#empty-state'),
  favCount:            document.querySelector('#fav-count'),
  clearFavorites:      document.querySelector('#clear-favorites'),
  themeToggle:         document.querySelector('#theme-toggle'),
  langSelect:          document.querySelector('#lang-select'),
  gridView:            document.querySelector('#view-grid'),
  listView:            document.querySelector('#view-list'),
  modal:               document.querySelector('#modal'),
  modalBody:           document.querySelector('#modal-body'),
  modalClose:          document.querySelector('#modal-close'),
  toast:               document.querySelector('#toast'),
};

// IntersectionObserver to animate cards when they scroll into view
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });


// fill a <select> with options from an array
export const fillSelect = (selectEl, items, placeholder) => {
  selectEl.innerHTML = `<option value="">${placeholder}</option>`;

  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    selectEl.appendChild(option);
  });
};


// build the HTML for a single meal card
export const createMealCard = (meal) => {
  const saved = isFavorite(meal.id);

  return `
    <article class="meal-card" data-id="${meal.id}">
      <img class="meal-card-img" src="${meal.image}" alt="${meal.name}" loading="lazy" />
      <div class="meal-card-body">
        <div class="meal-card-top">
          <h3 class="meal-card-title">${meal.name}</h3>
          <span class="meal-fav-icon">${saved ? '❤️' : '🤍'}</span>
        </div>
        <div class="meal-tags">
          <span class="tag">🍽️ ${meal.category}</span>
          <span class="tag">🌍 ${meal.area}</span>
          <span class="tag">🏷️ ${meal.tags}</span>
          <span class="tag">${meal.youtube ? '🎬 Video' : 'No video'}</span>
        </div>
        <div class="meal-actions">
          <button class="btn-details" data-action="details" data-id="${meal.id}">Details</button>
          <button class="btn-save" data-action="favorite" data-id="${meal.id}">${saved ? 'Remove' : 'Save'}</button>
        </div>
      </div>
    </article>
  `;
};


// render a list of meals into a container
export const renderMeals = (container, meals, emptyEl) => {
  container.innerHTML = meals.map(createMealCard).join('');

  // show or hide the empty state message
  if (emptyEl) {
    emptyEl.classList.toggle('hidden', meals.length > 0);
  }

  // observe each card so it animates when visible
  container.querySelectorAll('.meal-card').forEach((card) => {
    cardObserver.observe(card);
  });
};


// show the detail modal for a meal
export const renderModal = (meal) => {
  const videoSection = meal.youtube
    ? `<a class="modal-video-link" href="${meal.youtube}" target="_blank" rel="noreferrer">▶ Watch video</a>`
    : `<p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem;">No video available</p>`;

  elements.modalBody.innerHTML = `
    <div class="modal-top">
      <img src="${meal.image}" alt="${meal.name}" />
      <div class="modal-info">
        <h2 id="modal-title">${meal.name}</h2>
        <div class="modal-tags">
          <span>🍽️ ${meal.category}</span>
          <span>🌍 ${meal.area}</span>
          <span>🏷️ ${meal.tags}</span>
        </div>
        ${videoSection}
      </div>
    </div>
    <div class="modal-instructions">
      <h3>Instructions</h3>
      <p>${meal.instructions}</p>
    </div>
  `;

  elements.modal.classList.remove('hidden');
};


// update the favorite count badge in the nav
export const updateFavoriteCount = (favorites) => {
  elements.favCount.textContent = favorites.length;
  elements.clearFavorites.classList.toggle('hidden', favorites.length === 0);
};


// show or hide the loading spinner
export const setLoading = (isLoading) => {
  elements.loader.classList.toggle('hidden', !isLoading);
};


// show a small toast message at the bottom
export const showToast = (message) => {
  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden');

  setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 2500);
};


// switch between browse and favorites views
export const switchView = (viewName) => {
  const showFavorites = viewName === 'favorites';

  elements.browseView.classList.toggle('hidden', showFavorites);
  elements.favoritesView.classList.toggle('hidden', !showFavorites);

  elements.navButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
};
