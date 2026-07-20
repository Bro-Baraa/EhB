import { isFav } from './favorites.js';
import { translate } from './translations.js';
import { escapeHtml, formatDate } from './utils.js';

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
  themeToggle: document.querySelector('#theme-toggle'),
  gridBtn: document.querySelector('#view-grid'),
  listBtn: document.querySelector('#view-list'),
  modal: document.querySelector('#modal'),
  modalBody: document.querySelector('#modal-body'),
  modalClose: document.querySelector('#modal-close'),
  toast: document.querySelector('#toast'),
  newsletterForm: document.querySelector('#newsletter-form'),
  newsletterEmail: document.querySelector('#newsletter-email'),
  formFeedback: document.querySelector('#form-feedback'),
  retryButton: document.querySelector('#retry-btn'),
};

function buildTagText(tags) {
  return Array.isArray(tags) && tags.length > 0 ? tags.join(', ') : '—';
}

function buildCard(meal, language) {
  const saved = isFav(meal.id);
  const savedDate = meal.addedAt
    ? `<p class="card-date">${translate(language, 'savedOn')} ${formatDate(meal.addedAt, language)}</p>`
    : '';

  return `
    <article class="meal-card" data-id="${escapeHtml(meal.id)}">
      <img
        src="${escapeHtml(meal.image)}"
        alt="${escapeHtml(meal.name)}"
        width="480"
        height="300"
        loading="lazy"
      />
      <div class="card-body">
        <div class="card-top">
          <h3 class="card-title">${escapeHtml(meal.name)}</h3>
          <span aria-label="${translate(language, 'favorite')}">${saved ? '❤️' : '🤍'}</span>
        </div>
        <div class="card-tags">
          <span class="tag">${escapeHtml(meal.category)}</span>
          <span class="tag">${escapeHtml(meal.area)}</span>
          ${(meal.tags || []).slice(0, 2).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        ${savedDate}
        <div class="card-actions">
          <button class="btn-details" type="button" data-action="details" data-id="${escapeHtml(meal.id)}">
            ${translate(language, 'details')}
          </button>
          <button class="btn-save" type="button" data-action="favorite" data-id="${escapeHtml(meal.id)}">
            ${translate(language, saved ? 'remove' : 'save')}
          </button>
        </div>
      </div>
    </article>
  `;
}

function buildTable(meals, language) {
  const rows = meals.map((meal) => {
    const saved = isFav(meal.id);

    return `
      <tr>
        <td><img class="table-thumb" src="${escapeHtml(meal.image)}" alt="" width="72" height="52" loading="lazy" /></td>
        <td><strong>${escapeHtml(meal.name)}</strong></td>
        <td>${escapeHtml(meal.category)}</td>
        <td>${escapeHtml(meal.area)}</td>
        <td>${escapeHtml(buildTagText(meal.tags))}</td>
        <td>${meal.youtube ? translate(language, 'available') : translate(language, 'notAvailable')}</td>
        <td>
          <div class="table-actions">
            <button class="btn-details" type="button" data-action="details" data-id="${escapeHtml(meal.id)}">
              ${translate(language, 'details')}
            </button>
            <button class="btn-save" type="button" data-action="favorite" data-id="${escapeHtml(meal.id)}">
              ${translate(language, saved ? 'remove' : 'save')}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="table-wrap">
      <table class="meal-table">
        <thead>
          <tr>
            <th scope="col">${translate(language, 'imageColumn')}</th>
            <th scope="col">${translate(language, 'mealColumn')}</th>
            <th scope="col">${translate(language, 'categoryColumn')}</th>
            <th scope="col">${translate(language, 'cuisineColumn')}</th>
            <th scope="col">${translate(language, 'tagsColumn')}</th>
            <th scope="col">${translate(language, 'videoColumn')}</th>
            <th scope="col">${translate(language, 'actionsColumn')}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

export function renderMeals(container, meals, emptyElement, options) {
  if (!container) return;

  const { view = 'grid', language = 'en' } = options;

  if (meals.length === 0) {
    container.innerHTML = '';
    emptyElement?.classList.remove('hidden');
    return;
  }

  emptyElement?.classList.add('hidden');
  container.innerHTML = view === 'list'
    ? buildTable(meals, language)
    : meals.map((meal) => buildCard(meal, language)).join('');
}

export function fillSelect(element, items, placeholder, selectedValue = '') {
  if (!element) return;

  const options = items
    .map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`)
    .join('');

  element.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options}`;
  element.value = selectedValue;
}

export function setLoading(isLoading) {
  elements.loader?.classList.toggle('hidden', !isLoading);

  if (isLoading) {
    elements.errorState?.classList.add('hidden');
  }
}

export function showError() {
  elements.errorState?.classList.remove('hidden');
  elements.emptyState?.classList.add('hidden');
  elements.mealsContainer.innerHTML = '';
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
  elements.favCount.textContent = count;
  elements.clearFavorites?.classList.toggle('hidden', count === 0);
}

export function switchPage(view) {
  const showFavorites = view === 'favorites';

  elements.browseView?.classList.toggle('hidden', showFavorites);
  elements.favoritesView?.classList.toggle('hidden', !showFavorites);

  elements.navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.view === view);
    button.setAttribute('aria-current', button.dataset.view === view ? 'page' : 'false');
  });
}

let previousFocus = null;

export function renderModal(meal, language) {
  if (!elements.modal || !elements.modalBody) return;

  const ingredients = meal.ingredients?.length
    ? meal.ingredients.map((item) => `
        <li>
          <span>${escapeHtml(item.ingredient)}</span>
          <span>${escapeHtml(item.measure || '—')}</span>
        </li>
      `).join('')
    : '<li>—</li>';

  const tagsText = meal.tags?.length ? meal.tags.join(', ') : translate(language, 'noTags');
  const videoLink = meal.youtube
    ? `<a class="modal-link" href="${escapeHtml(meal.youtube)}" target="_blank" rel="noopener noreferrer">${translate(language, 'watchYoutube')}</a>`
    : '';
  const sourceLink = meal.source
    ? `<a class="modal-link" href="${escapeHtml(meal.source)}" target="_blank" rel="noopener noreferrer">${translate(language, 'openSource')}</a>`
    : '';

  elements.modalBody.innerHTML = `
    <div class="modal-top">
      <img src="${escapeHtml(meal.image)}" alt="${escapeHtml(meal.name)}" width="520" height="360" />
      <div class="modal-info">
        <h2 id="modal-title">${escapeHtml(meal.name)}</h2>
        <div class="modal-tags">
          <span>${escapeHtml(meal.category)}</span>
          <span>${escapeHtml(meal.area)}</span>
        </div>
        <p><strong>${translate(language, 'tags')}:</strong> ${escapeHtml(tagsText)}</p>
        <div class="modal-links">${videoLink}${sourceLink}</div>
      </div>
    </div>
    <section class="modal-section">
      <h3>${translate(language, 'ingredients')}</h3>
      <ul class="ingredient-list">${ingredients}</ul>
    </section>
    <section class="modal-section">
      <h3>${translate(language, 'instructions')}</h3>
      <p class="instructions-text">${escapeHtml(meal.instructions)}</p>
    </section>
  `;

  previousFocus = document.activeElement;
  elements.modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  elements.modalClose.setAttribute('aria-label', translate(language, 'closeDetails'));
  elements.modalClose.focus();
}

export function closeModal() {
  elements.modal?.classList.add('hidden');
  document.body.classList.remove('modal-open');
  previousFocus?.focus();
}
