var gamePattern = [];
var buttonColors = ["red" , "blue" , "green" , "yellow"];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAns(userClickedPattern.length -1)
});

function nextSeq(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChoosencolor = buttonColors[randomNumber];
   gamePattern.push(randomChoosencolor);

   $("#" + randomChoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChoosencolor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    } , 100);
}

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSeq();
        started = true;
    }
});

function checkAns(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function(){
                nextSeq();
            },1000)
        }
    }
    else{
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function(){
        $("body").removeClass("game-over");
       },200);
       $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
