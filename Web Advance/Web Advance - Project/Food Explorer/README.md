# 🍴 Food Explorer

A single-page web app built with HTML, CSS and vanilla JavaScript. It uses the [TheMealDB API](https://www.themealdb.com/api.php) to let users explore meals, search, filter, and save favorites.

This was made as a project for the Web Advanced course.



# Features

- Browse 80+ meals loaded from the API
- Search by meal name, category or cuisine
- Filter by category and cuisine
- Sort A→Z, Z→A, by category, or by cuisine
- All filters work together at the same time
- Save and remove favorite meals (stored with LocalStorage)
- User preferences saved between sessions: theme, language, grid/list view
- Meal detail popup with instructions and YouTube link
- Dark / light theme toggle
- Responsive layout for desktop, tablet and mobile



# Installation

```bash
git clone https://github.com/your-username/food-explorer.git
cd food-explorer
npm install
npm run dev
```

To build for production:
```bash
npm run build
npm run preview
```



# API

This project uses the free [TheMealDB API](https://www.themealdb.com/api.php).

| Endpoint | Usage |
|---|---|
| `search.php?f=a` | Load meals starting with a letter |
| `search.php?s=term` | Search meals by name |
| `list.php?c=list` | Get all categories |
| `list.php?a=list` | Get all cuisines |



# Folder structure

```
food-explorer/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── css/
    │   └── main.css
    └── js/
        ├── api.js          → fetch and normalize API data
        ├── favorites.js    → save/remove favorites
        ├── filters.js      → filter and sort logic
        ├── main.js         → app entry point, events
        ├── preferences.js  → theme, language, view preference
        ├── storage.js      → localStorage helper functions
        └── ui.js           → render cards, modal, toast
```



# Technical requirements


# DOM manipulation

| What | File | Line | How |
|---|---|---|---|
| Element selection | `src/js/ui.js` | 3–30 | `elements` object uses `querySelector` and `querySelectorAll` |
| DOM manipulation | `src/js/ui.js` | 41–47, 76–85 | `fillSelect` creates options, `renderMeals` writes cards to the page |
| Event listeners | `src/js/main.js` | 84–143 | `bindEvents()` adds all listeners for buttons, filters, search, modal |



# JavaScript concepts

| Concept | File | Line | How |
|---|---|---|---|
| Constants (`const`) | `src/js/api.js` | 1–2 | `BASE_URL` and `INITIAL_LETTERS` |
| Constants | `src/js/favorites.js` | 3 | `FAVORITES_KEY` for LocalStorage |
| Template literals | `src/js/ui.js` | 53–73 | Card HTML is built with backtick strings |
| Template literals | `src/js/api.js` | 5 | Fetch URL built with template literal |
| Array iteration | `src/js/api.js` | 22 | `INITIAL_LETTERS.map(...)` to make fetch requests |
| Array iteration | `src/js/ui.js` | 43–47 | `forEach` to create select options |
| Array methods | `src/js/filters.js` | 4–17 | `.filter()` and `.sort()` for search/filter/sort |
| Array methods | `src/js/api.js` | 24 | `.flatMap()` and `.map()` to process API results |
| Arrow functions | `src/js/filters.js` | 1, 20 | All functions use arrow syntax |
| Arrow functions | `src/js/api.js` | 4, 10, 21 | `fetchJSON`, `normalizeMeal`, etc. |
| Ternary operator | `src/js/ui.js` | 59, 65, 69 | Favorite icon and button text |
| Ternary operator | `src/js/main.js` | 34 | "meal" vs "meals" in results count |
| Callback functions | `src/js/main.js` | 62 | `handleSearch` passed as callback to debounce |
| Callback functions | `src/js/ui.js` | 33–38 | IntersectionObserver callback |
| Promises | `src/js/api.js` | 23 | `Promise.all()` to fetch letters in parallel |
| Promises | `src/js/main.js` | 148–152 | `Promise.all()` for initial data load |
| Async / Await | `src/js/api.js` | 4–8, 21–27 | All fetch functions are async |
| Async / Await | `src/js/main.js` | 145, 62 | `init()` and `handleSearch` are async |
| Observer API | `src/js/ui.js` | 32–39 | `IntersectionObserver` animates cards on scroll |


# Data & API

| Concept | File | Line | How |
|---|---|---|---|
| Fetch | `src/js/api.js` | 5 | `fetch()` to call TheMealDB API |
| JSON manipulation | `src/js/api.js` | 10–19 | `normalizeMeal()` turns raw API data into a clean object |


# Storage & validation

| Concept | File | Line | How |
|---|---|---|---|
| Form validation | `src/js/main.js` | 65–68 | Shows toast if search term is less than 2 characters |
| Form validation | `index.html` | 52 | `minlength="2"` attribute on the search input |
| LocalStorage | `src/js/storage.js` | 1–13 | `getStorage` and `setStorage` helper functions |
| LocalStorage | `src/js/favorites.js` | 5, 16 | Favorites saved and loaded from localStorage |
| LocalStorage | `src/js/preferences.js` | 10, 14–15 | Preferences (theme, language, view) saved between sessions |



# Styling & layout

| Concept | File | Where | How |
|---|---|---|---|
| CSS Flexbox | `src/css/main.css` | `.header`, `.hero`, `.controls-bar` | Used for header and control bar layout |
| CSS Grid | `src/css/main.css` | `.meals-grid`, `.modal-top` | Card grid and modal layout |
| Animations | `src/css/main.css` | `@keyframes spin` | Loading spinner |
| Animations | `src/css/main.css` | `@keyframes modalIn` | Modal entrance animation |
| Animations | `src/css/main.css` | `@keyframes toastIn` | Toast fade-in |
| Hover effects | `src/css/main.css` | `.meal-card:hover` | Card lifts and image zooms on hover |
| Responsive | `src/css/main.css` | `@media (max-width: 820px)` | Tablet layout |
| Responsive | `src/css/main.css` | `@media (max-width: 480px)` | Mobile layout |



# Screenshots

*(Add screenshots here after running the project)*


# AI usage

I used Claude (claude.ai) to help with parts of this project. The full chatlog is included with this submission as required. All code has been reviewed and I understand how everything works.


# Sources

- TheMealDB API: https://www.themealdb.com/api.php
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN LocalStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN IntersectionObserver: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
- MDN Array methods: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- Vite: https://vitejs.dev/guide/
