// блок с отзывами
const text1_options = [
    "Мария",
    "Валя",
    "Ольга",
    "Яна",
    "Екатерина",
    "Роман",
    "Антонина",
    "Елена"
  ];
  const text2_options = [
    "Невероятно нежный тортик! Очень красивое оформление, и действительно качественный продукт, рады что познакомились с MarinusCske",
    "Класс! Ребенок счаслив!! Обожаем единорогов, оформление на высоте. Вкус шоколад-банан покорил наше сердце",
    "Это восторг!!! Тает во рту! И четвероногий друг оценил :D",
    "Любим MarinusCake за качество и вкус. Заказываем не в первый раз, и не планируем останавливаться",
    "Заказывали подруге на день рождения, и эстетично и вкусно. Именниница довольна",
    "Тут сделают все по Вашему желанию! Очень порадовало, что обратилась именно сюда. Бабушка уж очень любит домашние фруктовые тортики, а делать самой абсолютно нет времени. Да я бы так и не сделала никогда! Неимоверно вкусно, бабушка счастлива и просит еще. Тысячное Вам спасибо!",
    "Так красиво. А как мноооого крема...Объедение",
    "Уж оооочень любим чизкейки MarinusCake. Перепробовали множество вкусов, в фаворитах все-таки кедровый"
  ];

  const image_options = [
    "/img/торт1.1.jpg",
    "/img/review2.jpg",
    "/img/киара.jpg",
    "/img/торт2.jpg",
    "/img/торт4.jpg",
    "/img/fruit-cake-with-desert-cherry.jpg",
    "/img/красныйбархат.jpg",
    "/img/cheesecake-sliced-wooden-board-closeup-view-selective-focus-generative-ai.jpg"
  ];
  let i = 0;
  const currentOptionText1 = document.getElementById("current-option-text1");
  const currentOptionText2 = document.getElementById("current-option-text2");
  const currentOptionImage = document.getElementById("image");
  const carousel = document.getElementById("carousel-wrapper-block");
  const mainMenu = document.getElementById("menu");
  const optionPrevious = document.getElementById("previous-option");
  const optionNext = document.getElementById("next-option");
  
  currentOptionText1.innerText = text1_options[i];
  currentOptionText2.innerText = text2_options[i];
  currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
  
  optionNext.onclick = function () {
    i = i + 1;
    i = i % text1_options.length;
    currentOptionText1.dataset.nextText = text1_options[i];
  
    currentOptionText2.dataset.nextText = text2_options[i];

    carousel.classList.add("anim-next");
    
    setTimeout(() => {
      currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
    }, 450);
    
    setTimeout(() => {
      currentOptionText1.innerText = text1_options[i];
      currentOptionText2.innerText = text2_options[i];
      carousel.classList.remove("anim-next");
    }, 455);
  };
  
  optionPrevious.onclick = function () {
    if (i === 0) {
      i = text1_options.length;
    }
    i = i - 1;
    currentOptionText1.dataset.previousText = text1_options[i];
  
    currentOptionText2.dataset.previousText = text2_options[i];
  

    carousel.classList.add("anim-previous");
  
    setTimeout(() => {
      currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
    }, 450);
    
    setTimeout(() => {
      currentOptionText1.innerText = text1_options[i];
      currentOptionText2.innerText = text2_options[i];
      carousel.classList.remove("anim-previous");
    }, 450);
  };
