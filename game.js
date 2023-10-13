let buttonColors = ["red","blue","green","yellow"];

let gameSequence=[];

let userClickedPattern=[];

let started = false;

let level = 0;

// starting the game
$(document).on("keydown",function(){
    if(!started){
        nextSequence();
        started=true;
    }
});
$(document).on("click",function(){
    if(!started){
        nextSequence();
        started=true;
    }
});


// User Click Actions
$(".btn").click(function (){

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


// Game Logic
function checkAnswer(currentLevel){
    // if(gameSequence[currentLevel]===userClickedPattern[currentLevel]){
    //     if(gameSequence.length===userClickedPattern.length){
    //         setTimeout(function(){
    //             nextSequence();
    //         },1000)
    //     }

    //Level Advance logic
    if(userClickedPattern[currentLevel]===gameSequence[currentLevel]){
        if(userClickedPattern.length===gameSequence.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
        
}
// Game over logic
else{

    playSound("wrong")

    $("body").addClass("game-over");
    
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
    $("#level-title").text(` Click on empty space or press Any to key to start the game.`);
    $(document).on("keydown",function(){
        startOver();
        
    });
    $(document).on("click",function(){
        
        startOver();
    });
}
}

// Restarting the game once game is over
function startOver(){
    level=0;
    started=false;
    gameSequence=[];

}

// Random computer side actions
function nextSequence() {
    // Resetting the userClickedPattern array
    userClickedPattern=[];
    
    level++;
    $("#level-title").text(`LEVEL ${level}`)
    
    let randomNumber=Math.floor(Math.random()*4);
    
    // Choosing a colour from random generated number
    let randomChosenColor = buttonColors[randomNumber];

    // Pushing the random chosen color into the game sequence array
    gameSequence.push(randomChosenColor);

    // Choosing a button to animate it
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}   


// Animating buttons For comp and user
function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    
    setTimeout(function(){$(`#${currentColor}`).removeClass("pressed");},100)
}

// Making an audio object for randomChosenColor and userClickedColor and playing it
function playSound(name){
    let sequenceAudio=new Audio(`sounds/${name}.mp3`);
    sequenceAudio.play();
}