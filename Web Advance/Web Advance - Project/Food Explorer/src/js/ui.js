import { isFavorite } from './favorites.js';
import { getPreferences } from './preferences.js';

// Get page elements.
export const elements = {
  navButtons: document.querySelectorAll('.nav-btn'),
  browseView: document.querySelector('#view-browse'),
  favoritesView: document.querySelector('#view-favorites'),
  mealsContainer: document.querySelector('#meals-container'),
  favoritesContainer: document.querySelector('#favorites-container'),
  favoritesEmpty: document.querySelector('#favorites-empty'),
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('#search-input'),
  searchClear: document.querySelector('#search-clear'),
  categoryFilter: document.querySelector('#filter-category'),
  areaFilter: document.querySelector('#filter-area'),
  sortSelect: document.querySelector('#sort-select'),
  resultsCount: document.querySelector('#results-count'),
  resetFilters: document.querySelector('#reset-filters'),
  loader: document.querySelector('#loader'),
  emptyState: document.querySelector('#empty-state'),
  favCount: document.querySelector('#fav-count'),
  clearFavorites: document.querySelector('#clear-favorites'),
  langSelect: document.querySelector('#lang-select'),
  gridBtn: document.querySelector('#view-grid'),
  listBtn: document.querySelector('#view-list'),
  modal: document.querySelector('#modal'),
  modalBody: document.querySelector('#modal-body'),
  modalClose: document.querySelector('#modal-close'),
  toast: document.querySelector('#toast'),
};




// Show card animation when it appears.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });




// Fill a select with options.
export const fillSelect = (element, items, placeholder) => {
  element.innerHTML = `<option value="">${placeholder}</option>`;

  items.forEach((item) => {
    const option = document.createElement('option');

    option.value = item;
    option.textContent = item;

    element.appendChild(option);
  });
};





// Make short text for long tags.
const getShortTags = (tags) => {
  if (!tags || tags === 'No tags') {
    return 'No tags';
  }

  return tags.split(',').slice(0, 2).join(', ');
};




// Build one meal card.
const buildCard = (meal) => {
  const saved = isFavorite(meal.id);
  const language = getPreferences().language;

  const detailsLabel = 'Details';

  const saveLabel = saved
    ? (language === 'nl' ? 'Verwijder' : 'Remove')
    : (language === 'nl' ? 'Opslaan' : 'Save');

  const videoText = meal.youtube
    ? (language === 'nl' ? 'Video: ja' : 'Video: yes')
    : (language === 'nl' ? 'Video: nee' : 'Video: no');

  return `
    <article class="meal-card" data-id="${meal.id}">
      <img src="${meal.image}" alt="${meal.name}" loading="lazy" />

      <div class="card-body">
        <div class="card-top">
          <h3 class="card-title">${meal.name}</h3>
          <span>${saved ? '❤️' : '🤍'}</span>
        </div>

        <div class="card-tags">
          <span class="tag">ID: ${meal.id}</span>
          <span class="tag">${meal.category}</span>
          <span class="tag">${meal.area}</span>
          <span class="tag">${getShortTags(meal.tags)}</span>
          <span class="tag">${videoText}</span>
        </div>

        <div class="card-actions">
          <button class="btn-details" data-action="details" data-id="${meal.id}">
            ${detailsLabel}
          </button>

          <button class="btn-save" data-action="favorite" data-id="${meal.id}">
            ${saveLabel}
          </button>
        </div>
      </div>
    </article>
  `;
};




// Show meals on the page.
export const renderMeals = (container, meals, emptyElement) => {
  container.innerHTML = meals.map((meal) => buildCard(meal)).join('');

  if (emptyElement) {
    emptyElement.classList.toggle('hidden', meals.length > 0);
  }

  const cards = container.querySelectorAll('.meal-card');

  cards.forEach((card) => {
    observer.observe(card);
  });
};




// Show meal details.
export const renderModal = (meal) => {
  const language = getPreferences().language;

  const instructionsLabel = language === 'nl' ? 'Instructies' : 'Instructions';
  const noVideoLabel = language === 'nl' ? 'Geen video beschikbaar' : 'No video available';
  const watchLabel = language === 'nl' ? 'Video bekijken' : 'Watch video';

  let videoSection;

  if (meal.youtube) {
    videoSection = `
      <a class="modal-video-link" href="${meal.youtube}" target="_blank" rel="noreferrer">
        ▶ ${watchLabel}
      </a>
    `;
  } else {
    videoSection = `
      <p class="modal-muted-text">${noVideoLabel}</p>
    `;
  }

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






// Update number of favorites.
export const updateFavoriteCount = (favorites) => {
  elements.favCount.textContent = favorites.length;
  elements.clearFavorites.classList.toggle('hidden', favorites.length === 0);
};

// Show or hide loader.
export const setLoading = (loading) => {
  elements.loader.classList.toggle('hidden', !loading);
};

// Show a small message.
export const showToast = (message) => {
  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden');

  setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 2500);
};





// Switch between browse and favorites.
export const switchView = (view) => {
  const showFavorites = view === 'favorites';

  elements.browseView.classList.toggle('hidden', showFavorites);
  elements.favoritesView.classList.toggle('hidden', !showFavorites);

  elements.navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.view === view);
  });
};