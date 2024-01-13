const levelTitle = $("#level-title");

const listOfButtons = $(".btn");

var array1 = [];

var array2 = [];

function audio(soundPath) {
  var green = new Audio(soundPath);
  green.play();
}

function createUI(color) {

  listOfButtons[color].classList.add("pressed");
  switch (color) {
    case 0:
      audio("./sounds/green.mp3");
      break;
    case 1:
      audio("./sounds/red.mp3");
      break;
    case 2:
      audio("./sounds/yellow.mp3");
      break;
    case 3:
      audio("./sounds/blue.mp3");
      break;
    default:
      return;
  };

  setTimeout(() => {
    listOfButtons[color].classList.remove("pressed");
  }, 300);

}

function startGame() {
  {
    levelTitle.text("Level 1");

    let randomNumber = Math.floor(Math.random() * 4);

    array2.push(randomNumber);

    createUI(randomNumber);

    document.removeEventListener("keydown", startGame);
  }
}

document.addEventListener("keydown", startGame);

function checkAnswer(array1, array2) {
  let i = 0;
  let flag = true;
  for (i; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      flag = false;
    }
  }
  return flag;
}

for (let i = 0; i < listOfButtons.length; i++) {
  listOfButtons[i].addEventListener("click", function () {

    if (array2.length < 1) {
      return;
    }

    array1.push(i);

    createUI(i);

    let resultOfCheck = checkAnswer(array1, array2);

    if (resultOfCheck && array1.length === array2.length) {

      let randomNumber = Math.floor(Math.random() * 4);

      array2.push(randomNumber);

      setTimeout(() => {
        createUI(randomNumber);
        levelTitle.text("Level " + array2.length);
      }, 2000);

      array1 = [];
    }

    if (!resultOfCheck) {

      $("body").addClass("game-over");

      audio("./sounds/wrong.mp3");

      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 1000);

      array1 = [];
      array2 = [];

      levelTitle.text("Game over! Press any key to start game");

      document.addEventListener("keydown", startGame);
    }
  });
}
