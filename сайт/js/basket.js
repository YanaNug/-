"use strict"
import { ERROR_SERVER, NO_ITEMS_CART } from './constants.js';
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';


// скрываю/показываю элемент выбора десертов/тортов/чизкейка

$(function() {
    $( "#add-cheescake" ).click(function() {
        $( "#product__block-cheescake" ).toggle();
    });
});

$(function() {
    $( "#add-cake" ).click(function() {
        $( "#product__block-cake" ).toggle();
    });
});

$(function() {
    $( "#add-dessert" ).click(function() {
        $( "#product__block-dessert" ).toggle();
    });
});
$(function() {
    $( "#add-constructor" ).click(function() {
        $( "#product__block-constructor" ).toggle();
    });
});


// добавляю vip-тортики в корзину, работа с файлом json

const vip = document.querySelector('.cake-vip');
let productsData = [];

    getProducts()

vip.addEventListener('click', delProductBasket);


async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/cake.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
    
        loadProductBasket(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }

}

function loadProductBasket(data) {
    vip.textContent = '';

    if (!data || !data.length) {
        showErrorMessage(ERROR_SERVER)
        return;
    }

    checkingRelevanceValueBasket(data);
    const basket = getBasketLocalStorage();

    if(!basket || !basket.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    const findProducts = data.filter(item => basket.includes(String(item.id)));

    if(!findProducts.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    renderProductsBasket(findProducts);
}
function delProductBasket(event) {
    const targetButton = event.target.closest('.cart__del-card');
    if (!targetButton) return;

    const card = targetButton.closest('.cart__product');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    const newBasket = basket.filter(item => item !== id);
    setBasketLocalStorage(newBasket);

    getProducts()
}

function renderProductsBasket(arr) {
    arr.forEach(card => {
        const { id, img, title, price } = card;

        const cardItem2 = 
        `
        <div class="cart__product" data-product-id="${id}">
            <div class="cart__img">
                <img src="./img/${img}" alt="${title}">
            </div>
            <div class="cart__title">${title}</div>
            <div class="cart__block-btns">
                <div class="product-item__count">
                <input class="input is-primary cart-item-qty" style="width:100px" type="number" min="1" value="2">
            </div>
            </div>
            <div class="cart__price">
                <span>${price}/кг</span>₽
            </div>
            <div class="cart__del-card">Удалить</div>
        </div>
        `;

        vip.insertAdjacentHTML('beforeend', cardItem2);
    });
}

