var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var randomNumber,randomChosenColour;
var level = 0;
var currentLevel = 0;
var keyPress = 0;

function playSound(name) {
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function nextSequence() {

  randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
  currentLevel = 0;
  userChosenPattern = [];
  console.log(gamePattern);
}

$(".btn").on("click", function (event){
  var userChosenColour = $(this).attr("id");
  userChosenPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function startGame() {
  if(keyPress!=0)
    return;

  keyPress = 1;
  nextSequence();

}

$(document).on("keydown",startGame);

function checkAnswer() {
  if(userChosenPattern[currentLevel] == gamePattern[currentLevel])
    {
      console.log(currentLevel+" success");
      currentLevel++;
    }
  else
  {
    console.log(currentLevel+" failure");
    gameOver();
    return;
  }
  if(currentLevel == level)
    {
      setTimeout(nextSequence(),1000);
    }

}

function gameOver() {
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key To Restart");
  playSound("wrong");
  restartGame();

  setTimeout(function() {
    $("body").removeClass("game-over");
  },200);
}

function restartGame() {
  gamePattern = [];
  userChosenPattern = [];
  level = 0;
  currentLevel = 0;
  keyPress = 0;
  console.log("game Restarted");
}
