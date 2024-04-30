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

const cardsDessert = document.querySelector('.cards-dessert');
const btnShowCards = document.querySelector('.show-cards');
let shownCards = COUNT_SHOW_CARDS_CLICK;
// let countClickBtnShowCards = 1;
let productsData = [];

// Загрузка товаров
getProducts()

// Обработка клика по кнопке "Показать еще"
// btnShowCards.addEventListener('click', sliceArrCards);
// Обработка клика по кнопке "В корзину"
// cardsDessert.addEventListener('click', handleCardClick);

// Получение товаров
async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/dessert.json');
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

// function sliceArrCards() {
//     if(shownCards >= productsData.length) return;

//     countClickBtnShowCards++;
//     const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtnShowCards;

//     const arrCards = productsData.slice(shownCards, countShowCards);
//     createCards(arrCards);
//     shownCards = cardsDessert.children.length;

//     if(shownCards >= productsData.length) {
//         btnShowCards.classList.add('none');
//     }
// }

// function checkingActiveButtons(basket) {
//     const buttons = document.querySelectorAll('.dessert__add');

//     buttons.forEach(btn => {
//         const cardDessert = btn.closest('.card-dessert');
//         const id = cardDessert.dataset.productId;
//         const isInBasket = basket.includes(id);

//         btn.disabled = isInBasket;
//         btn.classList.toggle('active', isInBasket);
//         btn.textContent = isInBasket ? 'В корзине' : 'Хочу!';
//     });
// }


// Рендер карточки
function createCards(data) {
    data.forEach(card => {
        const { id, imgDessert, titleDessert} = card;
		const cardItem = 
			`
                <div class="dessert__product card-dessert" data-product-id="${id}">
                    <img class="dessert__img" src="img/${imgDessert}" alt="${titleDessert}">
                    <div class="product__title">${titleDessert}</div>
                    <button class="product__add dessert__add card__add"> <a href="basket.html#add-dessert">Хочу!</a></button>
                </div>
            `
        cardsDessert.insertAdjacentHTML('beforeend', cardItem);
	});
}






