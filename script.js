window.addEventListener('DOMContentLoaded', function() {
    var filterButtons = document.querySelectorAll('.filter-buttons button');
    var cards = document.querySelectorAll('.filterable-card .card');

    function setActiveButton(clickedButton) {
        filterButtons.forEach(function(button) {
            button.classList.toggle('active', button === clickedButton);
        });
    }

    function filterCards(category) {
        cards.forEach(function(card) {
            if (category === 'all' || card.dataset.name === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var category = button.dataset.name;
            setActiveButton(button);
            filterCards(category);
        });
    });

    filterCards('all');
});


const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('.cart-close');
cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));

const addCartButtons = document.querySelectorAll('.add-cart');
addCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productBox = event.target.closest('.card-body');
        addToCart(productBox);
    });
});

const addToCart = (productBox) => {
    const productImgSrc = productBox.querySelector('img').src;
    const productTitle = productBox.querySelector('.card-title').textContent;
    const productPrice = productBox.querySelector('.price').textContent;

    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    cartBox.innerHTML = `
        <img src="${productImgSrc}" alt="${productTitle}">
        <div class="detail-box">
            <div class="cart-product-title">${productTitle}</div>
            <div class="cart-price">${productPrice}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;

    const cartContent = document.querySelector('.cart-content');
    cartContent.appendChild(cartBox);

    // Add remove functionality
    const removeButton = cartBox.querySelector('.cart-remove');
    removeButton.addEventListener('click', () => {
        cartBox.remove();
    });
};

// Update cart when quantity changes
document.addEventListener('change', event => {
    if (event.target.classList.contains('cart-quantity')) {
        if (event.target.value <= 0) {
            event.target.closest('.cart-box').remove();
        }
    }


document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const price = card.querySelector('.price').textContent;
        const image = card.querySelector('img').src;
        
        const cartContent = document.querySelector('.cart-content');
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item-row';
        cartItem.innerHTML = `
            <div class="cart-item">
                <img src="${image}" alt="${title}" style="width: 50px; height: 50px;">
                <div class="cart-item-title">${title}</div>
                <div class="cart-item-price">${price}</div>
                <button class="remove-item">Remove</button>
            </div>
        `;
        cartContent.appendChild(cartItem);
        
        updateCartCount();
        updateTotal();
        
        cartItem.querySelector('.remove-item').addEventListener('click', function() {
            cartItem.remove();
            updateCartCount();
            updateTotal();
        });
    });
});

function updateCartCount() {
    const count = document.querySelectorAll('.cart-item-row').length;
    document.querySelector('.cart-item-count').textContent = count;
}

function updateTotal() {
    const prices = Array.from(document.querySelectorAll('.cart-item-price')).map(el => {
        const priceText = el.textContent.match(/£([\d.]+)/);
        return priceText ? parseFloat(priceText[1]) : 0;
    });
    const total = prices.reduce((sum, price) => sum + price, 0);
    document.querySelector('.total-price').textContent = '£' + total.toFixed(2);
}

});
        




