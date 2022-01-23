var man = document.getElementById("man");
var lava = document.getElementById("lava");
var duration = 0
var scorecounter = 0
function jump(){
    if(man.classList == "animation"){return}
    man.classList.add("animation")
    setTimeout(function(){
        man.classList.remove("animation")
    },500)
}
function hide() {
    var gamebox = document.getElementById("gamebox");
    var game = document.getElementById("gameo");

    gamebox.classList.add("hidden")
    game.classList.add("visible")

    randomizeLava()
    checkDead()
}
// function randomizeLava() {
//     var duration = Math.floor(Math.random() * (3 - 1 + 1) + 1);
//     document.documentElement.style.setProperty('--animation-duration', `${duration}s`);
// }
function checkDead() {
    var checkDead = setInterval(function() {
        let manTop = parseInt(window.getComputedStyle(man).getPropertyValue("top"));
        let lavaLeft = parseInt(window.getComputedStyle(lava).getPropertyValue("left"));
        if(lavaLeft<20 && lavaLeft>-9 && manTop>=230){
            lava.style.animation = "none";
            alert("Game Over, Minecraft noob ");
            scorecounter=0;
            lava.style.animation = "lava var(--animation-duration) infinite linear";
            startCounter()
        }
    }, 10);
}
function randomizeLava() {
    duration = Math.random() * (3 - 1 + 1) + 1;
    document.documentElement.style.setProperty('--animation-duration', `${duration}s`);
    startCounter()
    checkForLava()
}
function checkForLava() {
    let lavaLeft = parseInt(window.getComputedStyle(lava).getPropertyValue("left"));
    if (lavaLeft < 650) {
        checkForLava()
    } else if (lavaLeft > 651){
        duration = Math.random() * (3 - 1 + 1) + 1;
        document.documentElement.style.setProperty('--animation-duration', `${duration}s`);
    }
}
function startCounter() {
    let slowPoints = 700
    let fastPoints = 350
    if (duration < 1.5) {
        updateScoreTime = slowPoints
    } else {
        updateScoreTime = fastPoints
    }
    function scoreup() {
        setTimeout(() => {
            scorecounter = scorecounter + 10
            scoreup()
            document.getElementById("score").innerHTML=`Score: ${scorecounter}`;
        }, updateScoreTime);
    }
    scoreup()
}
