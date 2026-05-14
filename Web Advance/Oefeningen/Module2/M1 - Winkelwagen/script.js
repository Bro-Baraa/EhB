'use strict';

let products = [];

const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const addToCart = document.getElementById('addToCart');
const sortByPrice = document.getElementById('sortByPrice');
const cartItems = document.getElementById('cartItems');
const total = document.getElementById('total');

// Add product to the cart
addToCart.addEventListener('click', function () {
    const name = productName.value;
    const price = Number(productPrice.value);

    if (name === '' || price <= 0) {
        alert('Please enter a product name and price.');
        return;
    }

    const product = {
        name: name,
        price: price
    };

    products.push(product);

    productName.value = '';
    productPrice.value = '';

    showProducts();
});

// Sort products by price
sortByPrice.addEventListener('click', function () {
    products.sort(function (a, b) {
        return a.price - b.price;
    });

    showProducts();
});

// Show all products
function showProducts() {
    cartItems.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        const item = document.createElement('li');

        item.textContent = products[i].name + ' - €' + products[i].price.toFixed(2) + ' ';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';

        removeButton.addEventListener('click', function () {
            products.splice(i, 1);
            showProducts();
        });

        item.appendChild(removeButton);
        cartItems.appendChild(item);
    }

    updateTotal();
}

// Update total price
function updateTotal() {
    let sum = 0;

    for (let product of products) {
        sum = sum + product.price;
    }

    total.textContent = sum.toFixed(2);
}