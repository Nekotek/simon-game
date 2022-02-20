var sequence = new Array();
var userSequence = new Array();
var tab = ["red", "green", "blue", "yellow"];
var level = 0;
var game = true;

function nextSequence() {
  var num = Math.floor(Math.random() * 4)
  var chosenColor = tab[num];
  sequence.push(chosenColor);
  $("#" + chosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  audioPlayer(chosenColor);
  level++;
  $("h1").text("Level " + level);
  game = true;
}

$(".btn").click(function() {
  var clickedColor = $(this).attr("id");
  userSequence.push(clickedColor);
  audioPlayer(clickedColor)
  animatePress(clickedColor)
  answerChecker(userSequence.length - 1);
})

function audioPlayer(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(id) {
  $("#" + id).addClass("pressed");
  setTimeout(function functionName() {
    $("#" + id).removeClass("pressed")
  }, 100);
}
$(document).keypress(function() {
  $("h1").text("Level " + level);
  nextSequence();
})

function gameOver() {
  level = 0;
  sequence = [];
  game = false;
  userSequence = [];
}

function answerChecker(level) {
  if (userSequence[level] == sequence[level] && game) {
    level++;
    if (sequence[level] == undefined) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userSequence = [];
    }
  } else {
    gameOver();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game over! Press any key to restart!");
  }
}
