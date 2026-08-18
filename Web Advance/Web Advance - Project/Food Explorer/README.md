# Food Explorer

Food Explorer is a single page web application that I made for the Advanced Web course.

The website uses TheMealDB API to show meals from different countries and categories. Users can browse meals, search, filter, sort and save their favorite meals.

The project is made with HTML, CSS, JavaScript and Vite.

## Features

The website has the following functions:

- browse meals from TheMealDB
- search for meals
- filter by category
- filter by cuisine
- sort meals from A to Z and Z to A
- sort by category or cuisine
- grid and table view
- meal detail popup
- save and remove favorites
- dark and light theme
- English and Dutch language option
- responsive layout for mobile and desktop
- newsletter form with validation

Favorites and user settings are saved with LocalStorage, so they stay saved after refreshing or reopening the website.

## API

For this project I used TheMealDB API:

https://www.themealdb.com/api.php

The API gives information about meals such as:

- name
- image
- category
- cuisine
- tags
- ingredients
- measurements
- cooking instructions

The application loads more than 20 meals from the API.

## Screenshots

### Browse page

![Browse page](./Screenshots/home-browse.png)

### Search

![Search](./Screenshots/Search-chicken.png)

### Filter

![Filter](./Screenshots/filter-category.png)

### Search and filter

![Search and filter](./Screenshots/search-and-filter.png)

### Meal details

![Meal details](./Screenshots/meal-details.png)

### Favorites

![Favorites](./Screenshots/favorites.png)

### Mobile view

![Mobile view](./Screenshots/mobile-view.png)

## Installation

Clone the repository:

```bash
git clone https://github.com/Bro-Baraa/EhB.git
```

Go to the project folder:

```bash
cd "EhB/Web Advance/Web Advance - Project/Food Explorer"
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## Project structure

```text
Food Explorer/
├── src/
│   ├── css/
│   │   └── main.css
│   └── js/
│       ├── api.js
│       ├── favorites.js
│       ├── filters.js
│       ├── main.js
│       ├── preferences.js
│       ├── storage.js
│       ├── translations.js
│       ├── ui.js
│       └── utils.js
├── Screenshots/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

The JavaScript is split into different files to keep the project easier to read.

- `api.js` is used for API requests.
- `filters.js` contains the search, filter and sorting functions.
- `favorites.js` is used for favorites.
- `preferences.js` handles settings such as theme, language and view.
- `storage.js` contains the LocalStorage functions.
- `ui.js` is used to create and update elements on the page.
- `main.js` connects the different parts of the application and contains most event listeners.

## Technical requirements

This table shows where the required concepts are used in the project.

| Requirement | File | Lines | How it is used |
| --- | --- | --- | --- |
| DOM selection | `ui.js` | 6–24 | Elements are selected with `querySelector` and `querySelectorAll` |
| DOM manipulation | `ui.js` | 56–85, 126–144 | HTML and classes are updated with JavaScript |
| Events | `main.js` | 264–330 | Event listeners are used for clicks, input, change and submit |
| `const` | Multiple files | multiple | Used for variables that are not reassigned |
| Template literals | `ui.js` | 56–85, 102–114, 126–144 | Used to create HTML with dynamic values |
| Array iteration | Multiple files | multiple | Arrays are iterated with methods such as `forEach` and `map` |
| Array methods | `filters.js` | 5–38 | Methods such as `filter`, `sort`, `map`, `find` and `some` are used |
| Arrow functions | Multiple files | multiple | Arrow functions are used for functions and callbacks |
| Ternary operator | `ui.js` | 58, 72, 128 | Used for simple conditional values |
| Callback functions | `main.js` | 180–187, 264–330 | Functions are passed to event listeners and `setTimeout` |
| Promises | `api.js` | 85–108 | `Promise.allSettled()` is used for multiple API requests |
| Async / Await | `api.js`, `favorites.js`, `main.js` | multiple | Used for asynchronous API calls |
| Observer API | `main.js` | 94–106 | `IntersectionObserver` is used when cards appear on screen |
| Fetch | `api.js` | 12–18 | `fetch()` is used to get data from TheMealDB |
| JSON manipulation | `api.js` | 16, 89, 103 | API responses are converted with `response.json()` |
| Form validation | `main.js` | 211–229 | The newsletter email is checked before saving |
| LocalStorage | `storage.js`, `favorites.js`, `preferences.js` | multiple | Used for favorites, settings and cached data |
| CSS Grid / Flexbox | `main.css` | multiple | Used for the layout |
| Responsive design | `main.css` | multiple | Media queries are used for smaller screens |
| Vite | `vite.config.js`, `package.json` | all | Vite is used to run and build the project |
| Folder structure | Project root | all | HTML, CSS and JavaScript are separated into folders |

## Search, filters and sorting

The search function can search meals by name, category, cuisine or tag.

The user can filter meals by:

- category
- cuisine

The sorting options are:

- A to Z
- Z to A
- category
- cuisine

The search input uses a debounce function so the results do not update too many times while the user is typing.

## Favorites

A meal can be added to favorites with the favorite button.

Favorites are stored in LocalStorage and can also be removed from the favorites page.

The number of saved favorites is shown in the navigation.

## Meal details

Clicking on a meal opens a detail window.

The detail window shows information about the selected meal such as:

- image
- name
- category
- cuisine
- ingredients
- measurements
- instructions
- tags

## Table view

The application has a table view in addition to the normal grid view.

The table contains seven columns with information about the meals.

The selected view is saved so it stays the same after refreshing the page.

## User preferences

The application saves some user preferences with LocalStorage:

- selected theme
- selected language
- grid or table view

These settings stay saved when the user opens the website again.

## API cache

Some API data is cached in LocalStorage so the same data does not always need to be loaded again.

## Responsive design

The layout works on desktop and smaller screens.

CSS Grid and Flexbox are used in `main.css`.

Media queries are used to change the layout for smaller screen sizes.

## Sources

TheMealDB API  
https://www.themealdb.com/api.php

MDN Web Docs  
https://developer.mozilla.org/

Vite  
https://vite.dev/
