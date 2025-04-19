var buttonColours = ["red", "green", "yellow","blue"];
var gamepattern = [];
var userclickpattern = [];
var count=0;
var started = false;
var acceptingInput = false;

$(document).ready(function () {

    $(document).on("keydown", function () {
        if (!started && !acceptingInput) {
            $(".level").text("Level " + count);
            nextsequence();
            started = true;
        }
    });

  
    $(document).on("touchstart", function () {
        if (!started && !acceptingInput) {
            $(".level").text("Level " + count);
            nextsequence();
            started = true;
        }
    });
});



$(".btn").click(function () {
    if (!acceptingInput) return;
    var userChosenColour = $(this).attr("id");
    userclickpattern.push(userChosenColour);
    play(userChosenColour);
    animatebuttons(userChosenColour);
    checkanswer(userclickpattern.length - 1);
});


function nextsequence(){
    started = false;
    userclickpattern = [];
    count++;
    $(".level").text("Level "+count);
    var num = Math.floor(Math.random()*4);
    var randomchosencolor = buttonColours[num];
    gamepattern.push(randomchosencolor);
    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    play(randomchosencolor);
    animatebuttons(randomchosencolor);
    setTimeout(function(){
        acceptingInput = true;
    },500);
}


function checkanswer(currentlevel){
    if(gamepattern[currentlevel]===userclickpattern[currentlevel]){
        if(userclickpattern.length===gamepattern.length){
            acceptingInput = false;
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }else{
        play("wrong");
        $("body").addClass("gameover");
        $(".level").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("gameover");
        },200);
        startOver();
    }
}


function play(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatebuttons(colour) {
    $("#" + colour).addClass("pressed");
    setTimeout(function () {
        $("#" + colour).removeClass("pressed");
    }, 100);
}

function startOver(){
    count = 0;
    gamepattern = [];
    started = false;
    acceptingInput = false;
}
