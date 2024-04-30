// вывод тортиков на страницу каталога
"use strict"
//==========================================
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';

import { 
    COUNT_SHOW_CARDS_CLICK, 
    ERROR_SERVER,
    NO_PRODUCTS_IN_THIS_CATEGORY
} from './constants.js';

const cards = document.querySelector('.cards');
const btnShowCards = document.querySelector('.show-cards');
let shownCards = COUNT_SHOW_CARDS_CLICK;
let countClickBtnShowCards = 1;
let productsData = [];

// Загрузка товаров
getProducts()

// Обработка клика по кнопке "Показать еще"
btnShowCards.addEventListener('click', sliceArrCards);
// Обработка клика по кнопке "В корзину"
cards.addEventListener('click', handleCardClick);


// Получение товаров
async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/cake.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }

        if ((productsData.length > COUNT_SHOW_CARDS_CLICK) && 
            btnShowCards.classList.contains('none')) {
            btnShowCards.classList.remove('none');
        }
        
        renderStartPage(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}

function renderStartPage(data) {
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return 
    };

    const arrCards = data.slice(0, COUNT_SHOW_CARDS_CLICK);
    createCards(arrCards);

    checkingRelevanceValueBasket(data);

    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
}


function sliceArrCards() {
    if(shownCards >= productsData.length) return;

    countClickBtnShowCards++;
    const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtnShowCards;

    const arrCards = productsData.slice(shownCards, countShowCards);
    createCards(arrCards);
    shownCards = cards.children.length;

    if(shownCards >= productsData.length) {
        btnShowCards.classList.add('none');
    }
}


function handleCardClick(event) {
    const targetButton = event.target.closest('.card__add');
    if (!targetButton) return;

    const card = targetButton.closest('.card');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    if (basket.includes(id)) return;

    basket.push(id);
    setBasketLocalStorage(basket);
    checkingActiveButtons(basket);
}


function checkingActiveButtons(basket) {
    const buttons = document.querySelectorAll('.card__add');

    buttons.forEach(btn => {
        const card = btn.closest('.card');
        const id = card.dataset.productId;
        const isInBasket = basket.includes(id);

        btn.disabled = isInBasket;
        btn.classList.toggle('active', isInBasket);
        btn.textContent = isInBasket ? 'В корзине' : 'Хочу!';
    });
}

//  карточка
function createCards(data) {
    data.forEach(card => {
  
        const { id, img, title, descr } = card;

		const cardItem = 
			`
            <div class=" product__block card" data-product-id="${id}">
            <div class="product__left">
                <img class="product__img" src="/img/${img}" alt="${title}">
            </div>
            <div class="product__rigth">
                <div class="product__title">${title}</div>
                <div class="product__desc"> ${descr}</div>
                <button class="product__add product__add_rigth card__add">Хочу!</button>
            </div>
        </div>
    `
        cards.insertAdjacentHTML('beforeend', cardItem);
	});
    }


