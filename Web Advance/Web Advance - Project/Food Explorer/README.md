# Food Explorer

Food Explorer is a single page web application that I made for the Advanced Web course.

The website uses TheMealDB API to show meals from different countries and categories. The user can browse meals, search, filter the results, sort them and save favorite meals.

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

Favorites and user settings are saved with LocalStorage, so they stay saved after refreshing or reopening the page.

## API

For this project I used TheMealDB API:

https://www.themealdb.com/api.php

The API gives information about meals such as:

- name
- image
- category
- country or cuisine
- tags
- ingredients
- measurements
- cooking instructions
- YouTube link

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

`api.js` is used for API requests.

`filters.js` contains the search, filter and sorting functions.

`favorites.js` is used for favorites.

`preferences.js` handles settings such as the theme, language and view.

`storage.js` contains the LocalStorage functions.

`ui.js` is used to create and update elements on the page.

`main.js` connects the different parts of the application and contains most event listeners.

## JavaScript used in the project

### DOM manipulation

JavaScript is used to select elements from the page and update them when the data or user actions change.

Examples can be found in `ui.js` and `main.js`.

### Events

Event listeners are used for:

- search input
- filters
- sorting
- favorites
- navigation
- theme switch
- language switch
- grid and table view
- modal buttons
- newsletter form

Most of these events are connected in `main.js`.

### Modern JavaScript

The project uses:

- `const`
- template literals
- arrow functions
- array methods
- callbacks
- ternary operators
- promises
- async / await

Array methods such as `map()`, `filter()`, `sort()`, `forEach()` and `find()` are used in different parts of the project.

### Fetch and JSON

The API requests are made with `fetch()` in `api.js`.

The response from the API is converted with:

```js
response.json()
```

Async / await is used to wait for the API response before displaying the meals.

### Promises

Promises are used for API requests and when multiple requests need to be loaded.

The project also uses `Promise.all()` and `Promise.allSettled()`.

### LocalStorage

LocalStorage is used to save:

- favorites
- theme
- language
- grid or table view
- newsletter email
- cached API data

This makes it possible to keep some data between browser sessions.

### Form validation

The newsletter form checks the email before it is saved.

An invalid email shows an error message. A valid email can be stored in LocalStorage.

### Observer API

The project uses `IntersectionObserver` when meal cards appear on the screen.

This is used for the small card animation while scrolling.

## Search, filters and sorting

The search function can search meals by name, category or cuisine.

The user can also filter the meals by:

- category
- cuisine

Sorting options are:

- A to Z
- Z to A
- category
- cuisine

The search input uses a debounce function so it does not update too many times while the user is typing.

## Favorites

A meal can be added to favorites with the favorite button.

Favorites are stored in LocalStorage. They can also be removed again from the favorites page.

The number of saved favorites is shown in the navigation.

## Meal details

Clicking on a meal opens a detail window.

The detail view can show:

- image
- name
- category
- cuisine
- ingredients
- measurements
- instructions
- tags
- YouTube link
- source link

## Table view

The application has a table view in addition to the normal card view.

The table contains at least six columns with information about the meals.

The view can be changed by the user and the selected view is saved.

## Responsive design

The layout is responsive and works on different screen sizes.

CSS Grid and Flexbox are used in `main.css`.

Media queries are used to change the layout for smaller screens.

## Tools and sources

TheMealDB API  
https://www.themealdb.com/api.php

MDN Web Docs  
https://developer.mozilla.org/

Vite  
https://vite.dev/
