var gameStarted = false;
var rounds;
var userSequence = [];
var gameSequence = [];

$(document).keydown(function() {
  if (!gameStarted){
    gameStarted = true;
    startGame();
  }
});

$(".btn").click(function() {
  if(gameStarted){

    var clickedButton = $(this).attr("id");
    userSequence.push(clickedButton);
    var buttonNumber = userSequence.length -1;

    if (userSequence[buttonNumber] === gameSequence[buttonNumber]){
      animateButtonAndPlaySound(clickedButton);
      if (userSequence.length === gameSequence.length){
        setTimeout(function(){nextRound();}, 1000);
      }
    } else {
      var audio = new Audio('sounds/wrong.mp3');
      audio.play();
      $(body).toggleClass("game-over");
      $("h1").text("Game Over - Press any key to restart");
      gameStarted = false;
    }
    // console.log(clickedButton);
    // console.log(userSequence);
  }
});


function startGame() {
  //initializing game, first round
  gameSequence = [];
  userSequence = [];
  rounds = 0;
  nextRound();
}

function nextRound() {
  rounds++;
  $("h1").text("Level " +  rounds);
  gameSequence.push(getNextButton());

  for(j = 0; j < gameSequence.length; j++){
    animateButtonAndPlaySound(gameSequence[j]);
  }
  userSequence = [];
}

function animateButtonAndPlaySound(button) {
      var audio = new Audio('sounds/' + button + '.mp3');
      $("#" + button).fadeOut().fadeIn();
      audio.play();
}

function getNextButton() {
  var colors = ["green", "red", "yellow", "blue"];
  var randomNumber = Math.floor((Math.random() * 4));
  var nextButton = colors[randomNumber];

  return nextButton;
}
