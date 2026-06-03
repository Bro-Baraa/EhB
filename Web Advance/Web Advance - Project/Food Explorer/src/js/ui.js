import { isFavorite } from './favorites.js';
import { getPreferences } from './preferences.js';

// select all elements once at startup
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
  langSelect:          document.querySelector('#lang-select'),
  gridBtn:             document.querySelector('#view-grid'),
  listBtn:             document.querySelector('#view-list'),
  modal:               document.querySelector('#modal'),
  modalBody:           document.querySelector('#modal-body'),
  modalClose:          document.querySelector('#modal-close'),
  toast:               document.querySelector('#toast'),
};

// animate cards when they scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });


export const fillSelect = (el, items, placeholder) => {
  el.innerHTML = `<option value="">${placeholder}</option>`;
  items.forEach((item) => {
    const opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    el.appendChild(opt);
  });
};


const buildCard = (meal) => {
  const saved = isFavorite(meal.id);
  const lang = getPreferences().language;
  const detailsLabel = lang === 'nl' ? 'Details' : 'Details';
  const saveLabel = saved
    ? (lang === 'nl' ? 'Verwijder' : 'Remove')
    : (lang === 'nl' ? 'Opslaan' : 'Save');

  return `
    <article class="meal-card" data-id="${meal.id}">
      <img src="${meal.image}" alt="${meal.name}" loading="lazy" />
      <div class="card-body">
        <div class="card-top">
          <h3 class="card-title">${meal.name}</h3>
          <span>${saved ? '❤️' : '🤍'}</span>
        </div>
        <div class="card-tags">
          <span class="tag">${meal.category}</span>
          <span class="tag">${meal.area}</span>
        </div>
        <div class="card-actions">
          <button class="btn-details" data-action="details" data-id="${meal.id}">${detailsLabel}</button>
          <button class="btn-save" data-action="favorite" data-id="${meal.id}">${saveLabel}</button>
        </div>
      </div>
    </article>
  `;
};


export const renderMeals = (container, meals, emptyEl) => {
  container.innerHTML = meals.map(buildCard).join('');
  if (emptyEl) emptyEl.classList.toggle('hidden', meals.length > 0);
  container.querySelectorAll('.meal-card').forEach((card) => observer.observe(card));
};


export const renderModal = (meal) => {
  const lang = getPreferences().language;
  const instructionsLabel = lang === 'nl' ? 'Instructies' : 'Instructions';
  const noVideoLabel = lang === 'nl' ? 'Geen video beschikbaar' : 'No video available';
  const watchLabel = lang === 'nl' ? 'Video bekijken' : 'Watch video';

  const videoSection = meal.youtube
    ? `<a class="modal-video-link" href="${meal.youtube}" target="_blank" rel="noreferrer">▶ ${watchLabel}</a>`
    : `<p style="color:var(--muted);font-size:0.875rem;margin-top:8px;">${noVideoLabel}</p>`;

  elements.modalBody.innerHTML = `
    <div class="modal-top">
      <img src="${meal.image}" alt="${meal.name}" />
      <div class="modal-info">
        <h2>${meal.name}</h2>
        <div class="modal-tags">
          <span>${meal.category}</span>
          <span>${meal.area}</span>
          <span>${meal.tags}</span>
        </div>
        ${videoSection}
      </div>
    </div>
    <div class="modal-instructions">
      <h3>${instructionsLabel}</h3>
      <p>${meal.instructions}</p>
    </div>
  `;

  elements.modal.classList.remove('hidden');
};


export const updateFavoriteCount = (favorites) => {
  elements.favCount.textContent = favorites.length;
  elements.clearFavorites.classList.toggle('hidden', favorites.length === 0);
};


export const setLoading = (loading) => {
  elements.loader.classList.toggle('hidden', !loading);
};


export const showToast = (message) => {
  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden');
  setTimeout(() => elements.toast.classList.add('hidden'), 2500);
};


export const switchView = (view) => {
  const isFav = view === 'favorites';
  elements.browseView.classList.toggle('hidden', isFav);
  elements.favoritesView.classList.toggle('hidden', !isFav);
  elements.navButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
};
