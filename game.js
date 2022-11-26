let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

$(document).on("keydown", function()
{
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

// Handler function
$(".btn").click(function()
{
    let userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userPattern.length-1);
    //console.log(userPattern);
});

function restart()
{
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(curLevel)
{
    if(userPattern[curLevel] === gamePattern[curLevel])
    {
        if(userPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
                }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
            }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        restart();
    }
}

function playSound(name)
{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(curColor)
{
    $("#" + curColor).addClass("pressed");
    setTimeout(function()
    {
        $("#" + curColor).removeClass("pressed");
        }, 100);
}

function nextSequence()
{
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let num = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

