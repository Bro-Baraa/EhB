'use strict';

const recipeNameInput = document.getElementById('recipeName');
const prepTimeInput = document.getElementById('prepTime');
const ingredientsInput = document.getElementById('ingredients');
const generateButton = document.getElementById('generateCard');
const result = document.getElementById('result');

// Generate the recipe card
generateButton.addEventListener('click', function () {
    const recipeName = recipeNameInput.value;
    const prepTime = prepTimeInput.value;
    const ingredients = ingredientsInput.value.split('\n');

    let ingredientList = '';

    for (let ingredient of ingredients) {
        ingredientList += `<li>${ingredient}</li>`;
    }

    result.innerHTML = `
        <div class="card">
            <h2>🥘 ${recipeName}</h2>
            <p>⏱️ Bereidingstijd: ${prepTime} minuten</p>

            <h3>Ingrediënten:</h3>
            <ul>
                ${ingredientList}
            </ul>
        </div>
    `;
});