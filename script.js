$(document).ready(function () {
  var count = 0;

  $('.tarot-card').click(function () {
    var card = $(this);
    changeText(count);
    if (count < 4) {
      $(this).removeClass('top').addClass('bottom');

      count++;
    }
    if (count == 4) {
      $('div').removeClass('bottom');

      count = 0;
    }
    shuffle(card);
  });
});

function shuffle(card) {
  TweenLite.fromTo(
    card,
    0.6,
    {
      x: 350,
      y: -15,
      ease: Expo.easeOut,
    },
    {
      x: 0,
      y: 0,
      ease: Expo.easeIn,
    }
  );
}

function changeText(count) {
  const myDiv = document.getElementById('myDiv');

  if (count == 0) {
    myDiv.innerHTML =
      '<p class="neonText">Пять мечей: символ времени и зимы. <br> <br>В 5 часов явиться надо,<br>Танцевать там до упаду.<br>Веселиться, петь, кричать,<br>Праздник громко отмечать!</p>';
  } else if (count == 1) {
    myDiv.innerHTML =
      '<p class="neonText">Четыре жезла: символ места и еды. <br> <br>В ресторане Villa Verde<br>Атмосфера и уют<br>Тут изысканные блюда<br>И спиртное разольют!</p>';
  } else if (count == 2) {
    myDiv.innerHTML =
      '<p class="neonText">Колесо Фортуны: символ удачи и храбрости. <br> <br>АНБ желает вам<br>В новом следующим году<br>В бизнесе, в семье, в здоровье<br>Покорить недосягаемую высоту!</p>';
  } else if (count == 3) {
    myDiv.innerHTML =
      '<p class="neonText">Десять кубков: символ радости и веселья. <br> <br>Ждёт вас праздник удалой,<br>Смех и радость, песни звонко!<br>Загудим большой толпой,<br>Сердце биться будет громко!</p>';
  }
}
