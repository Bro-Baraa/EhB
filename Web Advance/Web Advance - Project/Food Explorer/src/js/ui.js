import { isFav } from './favorites.js';

export const elements = {
  navButtons: document.querySelectorAll('.nav-btn'),

  browseView: document.querySelector('#view-browse'),
  favoritesView: document.querySelector('#view-favorites'),

  mealsContainer: document.querySelector('#meals-container'),
  favoritesContainer: document.querySelector('#favorites-container'),
  favoritesEmpty: document.querySelector('#favorites-empty'),

  searchInput: document.querySelector('#search-input'),
  searchClear: document.querySelector('#search-clear'),

  categoryFilter: document.querySelector('#filter-category'),
  areaFilter: document.querySelector('#filter-area'),
  sortSelect: document.querySelector('#sort-select'),

  resultsCount: document.querySelector('#results-count'),
  resetFilters: document.querySelector('#reset-filters'),

  loader: document.querySelector('#loader'),
  emptyState: document.querySelector('#empty-state'),
  errorState: document.querySelector('#error-state'),

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

// Beschermt de HTML tegen rare tekens uit de API.
function escapeHtml(text) {
  if (!text) return '';

  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Maakt de HTML voor één maaltijdkaart.
function buildCard(meal) {
  const saved = isFav(meal.id);
  const heart = saved ? '❤️' : '🤍';
  const buttonText = saved ? 'Remove' : 'Save';

  return `
    <article class="meal-card" data-id="${escapeHtml(meal.id)}">
      <img src="${escapeHtml(meal.image)}" alt="${escapeHtml(meal.name)}" loading="lazy" />

      <div class="card-body">
        <div class="card-top">
          <h3 class="card-title">${escapeHtml(meal.name)}</h3>
          <span>${heart}</span>
        </div>

        <div class="card-tags">
          <span class="tag">${escapeHtml(meal.category)}</span>
          <span class="tag">${escapeHtml(meal.area)}</span>
          <span class="tag">ID: ${escapeHtml(meal.id)}</span>
        </div>

        <div class="card-actions">
          <button class="btn-details" data-action="details" data-id="${escapeHtml(meal.id)}">
            Details
          </button>

          <button class="btn-save" data-action="favorite" data-id="${escapeHtml(meal.id)}">
            ${buttonText}
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderMeals(container, meals, emptyElement) {
  if (!container) return;

  if (meals.length === 0) {
    container.innerHTML = '';
    emptyElement?.classList.remove('hidden');
    return;
  }

  emptyElement?.classList.add('hidden');
  container.innerHTML = meals.map(buildCard).join('');
}

export function fillSelect(element, items, placeholder) {
  if (!element) return;

  const options = items
    .map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`)
    .join('');

  element.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options}`;
}

export function setLoading(isLoading) {
  if (isLoading) {
    elements.loader?.classList.remove('hidden');
    elements.emptyState?.classList.add('hidden');
    elements.errorState?.classList.add('hidden');
  } else {
    elements.loader?.classList.add('hidden');
  }
}

export function showError() {
  elements.errorState?.classList.remove('hidden');
  elements.emptyState?.classList.add('hidden');

  if (elements.mealsContainer) {
    elements.mealsContainer.innerHTML = '';
  }

  setLoading(false);
}

let toastTimeout;

export function showToast(message) {
  if (!elements.toast) return;

  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden');

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 2500);
}

export function updateFavoriteCount(count) {
  if (elements.favCount) {
    elements.favCount.textContent = count;
  }

  elements.clearFavorites?.classList.toggle('hidden', count === 0);
}

export function switchView(view) {
  const showFavorites = view === 'favorites';

  elements.browseView?.classList.toggle('hidden', showFavorites);
  elements.favoritesView?.classList.toggle('hidden', !showFavorites);

  elements.navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.view === view);
  });
}

// Toont de details van een maaltijd in de modal.
export function renderModal(meal) {
  if (!elements.modal || !elements.modalBody) return;

  const videoLink = meal.youtube
    ? `<a class="modal-video-link" href="${escapeHtml(meal.youtube)}" target="_blank">Watch on YouTube</a>`
    : '';

  elements.modalBody.innerHTML = `
    <div class="modal-top">
      <img src="${escapeHtml(meal.image)}" alt="${escapeHtml(meal.name)}" />

      <div class="modal-info">
        <h2>${escapeHtml(meal.name)}</h2>

        <div class="modal-tags">
          <span>${escapeHtml(meal.category)}</span>
          <span>${escapeHtml(meal.area)}</span>
        </div>

        <p><strong>Tags:</strong> ${escapeHtml(meal.tags)}</p>
        ${videoLink}
      </div>
    </div>

    <div class="modal-instructions">
      <h3>Instructions</h3>
      <p>${escapeHtml(meal.instructions)}</p>
    </div>
  `;

  elements.modal.classList.remove('hidden');
}

export function closeModal() {
  elements.modal?.classList.add('hidden');
}