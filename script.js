// **************************Переключение карт********************************
$(document).ready(function () {
  var count = 0;

  $(".tarot-card").click(function () {
    var card = $(this);
    changeText(count);
    if (count < 4) {
      $(this).removeClass("top").addClass("bottom");

      count++;
    }
    if (count == 4) {
      $("div").removeClass("bottom");

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
      x: 100,
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

// **************************Переключение текста - стихов********************************
function changeText(count) {
  const myDiv = document.getElementById("myDiv");

  if (count == 0) {
    myDiv.innerHTML =
      '<p class="neonText"><span>Пятерка мечей:</span> <br>символ времени и зимы. <br> <br>В 5 часов явиться надо,<br>Танцевать там до упаду.<br>Веселиться, петь, кричать,<br>Праздник громко отмечать!</p>';
  } else if (count == 1) {
    myDiv.innerHTML =
      '<p class="neonText"><span>Четверка жезлов:</span> <br>символ места и еды. <br> <br>В ресторане Villa Verde<br>Атмосфера и уют<br>Тут изысканные блюда<br>И спиртное разольют!</p>';
  } else if (count == 2) {
    myDiv.innerHTML =
      '<p class="neonText"><span>Колесо Фортуны:</span> <br>символ удачи и храбрости. <br> <br>Сердечно АНБ желает вам<br>В новом следующим году<br>В бизнесе, в семье, в здоровье<br>Покорить недосягаемую высоту!</p>';
  } else if (count == 3) {
    myDiv.innerHTML =
      '<p class="neonText"><span>Десятка кубков:</span> <br>символ радости и веселья. <br> <br>Ждёт вас праздник удалой,<br>Смех и радость, песни звонко!<br>Загудим большой толпой,<br>Сердце биться будет громко!</p> <button class="button-finish" onclick="window.myDialog3.show()">Посмотреть итог</button>';
  } else if (count == 4) {
    window.myDialog3.show();
  }
}

// **************************Выбор ответов********************************
ul = document.querySelector(".modal_answer_list");
ul.onclick = function (event) {
  document.querySelector(".modal_button2").disabled = false;
  // if (event.target.tagName != 'LI') return;
  // if (event.target.tagName != 'span') return;

  if (event.ctrlKey || event.metaKey) {
    toggleSelect(event.target);
  } else {
    singleSelect(event.target);
  }
};

// предотвращает ненужное выделение элементов списка при клике
ul.onmousedown = function () {
  return false;
};

function toggleSelect(li) {
  li.classList.toggle("answer_active");
}

function singleSelect(li) {
  let selected = ul.querySelectorAll(".answer_active");
  for (let elem of selected) {
    elem.classList.remove("answer_active");
  }
  li.classList.add("answer_active");
}

// **************************Второе модальное окно********************************
document
  .querySelector(".modal_button2")
  .addEventListener("click", function (e) {
    window.myDialog.close();
    window.myDialog2.show();
    animate();

    setTimeout(() => {
      window.myDialog2.close();
    }, 5000);
  });

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

const texts = ["45012364", "Карты", "дали", "свой", "ответ!", "6429613"];

const morphTime = 1;
const cooldownTime = 0.4;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}
// function toggleAnswer() {
//   // const answer = document.querySelector('.modal_answer');
//   var answer = document.getElementsByClassName('modal_answer');
//   var cnt = answer.length;

//   console.log(cnt);

//   for (var i = 0; i < cnt; i++) {
//     answer[i].onclick = function () {
//       for (var j = 0; j < cnt; j++) {
//         answer[j].style.backgroundColor = '';
//       }
//       this.style.backgroundColor = '#ffa500';
//     };
//   }
// }

// var answer = document.getElementsByClassName('modal_answer');
// var cnt = answer.length;

// for (var i = 0; i < cnt; i++) {
//   answer[i].onclick = function () {
//     for (var j = 0; j < cnt; j++) {
//       answer[j].style.backgroundColor = '';
//     }
//     // this.style.backgroundColor = 'rgba(237, 237, 237, 0.8)';
//     // this.style.color = '#000';
//   };
// }
