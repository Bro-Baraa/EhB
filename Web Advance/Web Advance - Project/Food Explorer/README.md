# Food Explorer

Food Explorer is een single-page webapplicatie voor het vak Web Advanced.  
Met deze app kan een gebruiker maaltijden zoeken, filteren, sorteren en opslaan als favoriet.

De applicatie gebruikt data van TheMealDB API.

## Functionaliteiten

- 1 - Maaltijden laden via een externe API
- 2 - Maaltijden tonen in een grid of lijstweergave
- 3 - Zoeken op naam, categorie of keuken
- 4 - Filteren op categorie
- 5 - Filteren op keuken / land
- 6 - Sorteren op naam, categorie of keuken
- 7 - Details van een maaltijd bekijken in een popup
- 8 - Favorieten opslaan en verwijderen
- 9 - Favorieten bewaren met LocalStorage
- 10 - Thema kiezen: donker of licht
- 11 - Taal kiezen: Engels of Nederlands
- 12 - Responsive layout voor desktop en mobiel

## Gebruikte API

Ik gebruik TheMealDB API.

Link: https://www.themealdb.com/api.php

Gebruikte endpoints:

| Endpoint | Gebruik |
|---|---|
| `search.php?f=a` tot `search.php?f=h` | maaltijden laden per beginletter |
| `search.php?s=term` | maaltijden zoeken op naam |
| `list.php?c=list` | categorieën ophalen |
| `list.php?a=list` | keukens / landen ophalen |


## Installatie


npm install
npm run dev


Voor een productie-build:


npm run build
npm run preview




## Projectstructuur

```text
food-explorer/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── css/
    │   └── main.css
    └── js/
        ├── api.js
        ├── favorites.js
        ├── filters.js
        ├── main.js
        ├── preferences.js
        ├── storage.js
        └── ui.js
```




## Technische vereisten

### DOM-manipulatie

| Vereiste | Bestand | Regels | Uitleg |
|---|---|---:|---|
| Elementen selecteren | `src/js/ui.js` | 5-30 | In het `elements` object worden de HTML-elementen één keer geselecteerd met `querySelector` en `querySelectorAll`. |
| Elementen aanpassen | `src/js/ui.js` | 44-51, 85-88, 102-121 | Select-opties, maaltijdkaarten en de popup worden via JavaScript aangepast. |
| Events koppelen | `src/js/main.js` | 137-213 | In `bindEvents()` worden events gekoppeld aan zoeken, filters, sorteren, navigatie, favorieten en de popup. |




### Moderne JavaScript

| Vereiste | Bestand | Regels | Uitleg |
|---|---|---:|---|
| `const` gebruiken | `src/js/api.js` | 1-2 | `BASE_URL` en `INITIAL_LETTERS` zijn vaste waarden. |
| Template literals | `src/js/ui.js` | 63-81, 98-119 | De HTML voor kaarten en de popup wordt opgebouwd met backticks. |
| Iteratie over arrays | `src/js/api.js` | 22-25 | Met `map`, `flatMap` en `Array.from` wordt API-data verwerkt. |
| Array methods | `src/js/filters.js` | 4-17 | `filter()` en `sort()` worden gebruikt voor zoeken, filteren en sorteren. |
| Arrow functions | meerdere bestanden | o.a. `filters.js` 1 en 20 | De meeste functies zijn geschreven als arrow functions. |
| Ternary operator | `src/js/ui.js` | 59-61, 69, 98-100 | Wordt gebruikt voor knoptekst, icoontjes en fallback-content. |
| Callback functions | `src/js/filters.js` | 20-25 | `debounce()` krijgt een callback mee en voert die later uit. |
| Promises | `src/js/api.js`, `src/js/main.js` | `api.js` 23, `main.js` 222-226 | `Promise.all()` haalt meerdere API-resultaten tegelijk op. |
| Async / await | `src/js/api.js`, `src/js/main.js` | `api.js` 4-7, `main.js` 216-238 | API-calls worden asynchroon uitgevoerd. |
| Observer API | `src/js/ui.js` | 33-41, 88 | `IntersectionObserver` wordt gebruikt om kaarten zichtbaar te maken bij scrollen. |




### Data en API

| Vereiste | Bestand | Regels | Uitleg |
|---|---|---:|---|
| Fetch gebruiken | `src/js/api.js` | 4-7 | `fetch()` haalt data op van TheMealDB. |
| JSON verwerken | `src/js/api.js` | 10-19 | `normalizeMeal()` zet de ruwe API-data om naar een eenvoudiger object. |
| Minstens 20 objecten | `src/js/api.js` | 21-26 | De app haalt maaltijden op via meerdere beginletters en beperkt het resultaat tot 80 unieke maaltijden. |



### Opslag en validatie

| Vereiste | Bestand | Regels | Uitleg |
|---|---|---:|---|
| LocalStorage | `src/js/storage.js` | 1-13 | Algemene functies om data op te slaan en te lezen. |
| Favorieten opslaan | `src/js/favorites.js` | 3-20 | Favorieten worden bewaard tussen sessies. |
| Gebruikersvoorkeuren | `src/js/preferences.js` | 3-17 | Thema, taal en weergave worden opgeslagen. |
| Formuliervalidatie | `src/js/main.js` | 68-75 | Bij een zoekterm van 1 karakter krijgt de gebruiker een melding. |



### Styling en layout

| Vereiste | Bestand | Regels | Uitleg |
|---|---|---:|---|
| Basis CSS | `src/css/main.css` | volledig bestand | De interface is gestyled met eigen CSS. |
| Flexbox | `src/css/main.css` | 56-67, 184-194 | Header en controls gebruiken flexbox. |
| CSS Grid | `src/css/main.css` | 300-307 | Maaltijdkaarten worden in een grid getoond. |
| Animaties | `src/css/main.css` | 323-328, 441-445, 525-529 | Kaarten, loader en popup hebben eenvoudige animaties. |
| Responsive design | `src/css/main.css` | 643-674 | De layout past zich aan voor kleinere schermen. |




### Tooling

| Vereiste | Bestand | Uitleg |
|---|---|---|
| Vite | `package.json` | De scripts `dev`, `build` en `preview` gebruiken Vite. |
| Gescheiden bestanden | projectstructuur | HTML, CSS en JavaScript staan apart in de juiste mappen. |




## Screenshots

Voeg hier screenshots toe van:

1. De browse-pagina
2. De filter- of zoekfunctie
3. De favorietenpagina
4. De detail-popup
5. De mobiele weergave

Voorbeeld:

```md
![Browse page](./screenshots/browse.png)
![Favorites page](./screenshots/favorites.png)
```



## AI-gebruik

Ik heb AI gebruikt als ondersteuning tijdens dit project.

AI werd gebruikt voor:

- ideeën voor de structuur van de applicatie;
- hulp bij het controleren van fouten;
- uitleg over JavaScript-concepten zoals `async/await`, `LocalStorage`, `filter()` en `sort()`;
- hulp bij het duidelijker maken van de README.

De code is daarna door mij nagekeken, getest en aangepast.  
Ik kan uitleggen hoe de belangrijkste onderdelen werken, zoals het ophalen van API-data, het filteren en sorteren van maaltijden, het opslaan van favorieten en het gebruik van LocalStorage.



## Bronnen

- TheMealDB API: https://www.themealdb.com/api.php
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN LocalStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN IntersectionObserver: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
- MDN Array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- Vite Guide: https://vite.dev/guide/
