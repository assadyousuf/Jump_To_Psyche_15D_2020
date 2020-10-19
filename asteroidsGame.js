document.getElementById("myCanvas").style.background =
  "url('images/Space_Background.png')";
console.log("Starting....");
var asteroids = [];
var score = 0;
var lives = 3;
var currentPosition = 0;

initializeAsteroids();
showAsteroids();

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (event.keyCode == 37 || event.keyCode == 65) {
    console.log("Left/A was pressed");
    if (currentPosition >= 1) currentPosition = currentPosition - 1;
    drawRobot();
  } else if (
    event.keyCode == 32 ||
    event.keyCode == 38 ||
    event.keyCode == 87
  ) {
    console.log("Space/Up/W was pressed");
    checkKeyPress();
    shiftAsteroidsUp();
    showAsteroids();
  } else if (event.keyCode == 39 || event.keyCode == 68) {
    console.log("Right/D was pressed");
    if (currentPosition <= 1) currentPosition = currentPosition + 1;
    drawRobot();
  }
}

function checkKeyPress() {
  if (asteroids[2][currentPosition] == 1) {
    score++;
    document.getElementById("score").innerHTML = "SCORE: " + score;
    console.log("GOOD JUMP!");
  } else {
    lives--;
    document.getElementById("lives").innerHTML = "REMAINING LIVES: " + lives;
    console.log("UNSAFE ASTEROID JUMP!");
  }
  if (lives == 0) {
    var playAgain = confirm("GAME OVER! Play Again?");
    if (playAgain) {
      initializeAsteroids();
      document.getElementById("score").innerHTML = "SCORE: " + score;
      document.getElementById("lives").innerHTML = "REMAINING LIVES: " + lives;
    } else {
      document.getElementById("lives").innerHTML = "REMAINING LIVES: " + lives;
      document.removeEventListener("keydown", handleKeyPress);
    }
  }
}

function initializeAsteroids() {
  asteroids = [];
  for (var i = 0; i < 3; i++) {
    asteroids.push(getAsteroidRow());
  }
  score = 0;
  lives = 3;
}

function getAsteroidRow() {
  var asteroidRow = [1, 1, 1];
  asteroidRow[getRandomBadAsteroidColumn()] = -1;
  return asteroidRow;
}

function getRandomBadAsteroidColumn() {
  return Math.floor(Math.random() * Math.floor(3));
}

function shiftAsteroidsUp() {
  for (let i = 2; i > 0; i--) {
    asteroids[i] = asteroids[i - 1];
  }
  asteroids[0] = getAsteroidRow();
}

function showAsteroids() {
  const canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  for (let i = 0; i < asteroids.length; i++) {
    for (let j = 0; j < asteroids[i].length; j++) {
      let x = 300 + j * 200;
      let y = 20 + i * 160;
      cellColor = "#e74c3c";
      if (asteroids[i][j] === -1) {
        var img = document.getElementById("Error Asteroid");
      } else {
        var img = document.getElementById("Valid Asteroid");
      }
      ctx.drawImage(img, x, y, 100, 100);
      if (i == asteroids.length - 1 && j == currentPosition) {
        drawRobot(x, y);
      }
    }
  }
}

function drawRobot(x, y) {
  const canvas = document.getElementById("myCanvas2");
  var ctx = canvas.getContext("2d");
  var robot = document.getElementById("Character");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (currentPosition == 0) {
    ctx.drawImage(robot, 300, 600, 100, 100);
  }
  if (currentPosition == 1) {
    ctx.drawImage(robot, 500, 600, 100, 100);
  }
  if (currentPosition == 2) {
    ctx.drawImage(robot, 700, 600, 100, 100);
  }
}
