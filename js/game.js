var man = document.getElementById("man");
var lava = document.getElementById("lava");
var duration = 0
var scorecounter = 0
var Highscore = 0
var HighestScore = null

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
            alert("Game Over, Minecraft noob.");
            checkForHighscoreCookie();
            HighscoreSystem(scorecounter);
            alert(`Highscore: ${HighestScore}`)
            scorecounter= 0;
            lava.style.animation = "lava var(--animation-duration) infinite linear";
            scoreup()
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
            scorecounter = scorecounter + 1
            scoreup()
            document.getElementById("score").innerHTML=`Score: ${scorecounter}`;
        }, updateScoreTime);
    }
    scoreup()


}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function checkForHighscoreCookie() {
    let value = getCookie("HighestScore")
    if(value == NaN) {
        setCookie("HighestScore", 0, 365)
    } else {
        HighestScore = value
        console.log("Highscore already set!" + value)
        return 200
    }
}
window.onload = function () {
    let value = getCookie("HighestScore")
    if(value == NaN) {
        setCookie("HighestScore", 0, 365)
    } else {
        HighestScore = value
        console.log("Highscore already set!" + value)
        return 100
    }
}
function HighscoreSystem(highscoreNum) {
    if(HighestScore === null || NaN) {
        HighestScore = highscoreNum
    } else {
        if (highscoreNum > HighestScore) {
            HighestScore = highscoreNum;
            setCookie("HighestScore", HighestScore, 365)
        } else {
            // canvasContext.fillText("Je score was niet het hoogste!", 350, 175);
            // canvasContext.fillText(`Hoogste score momenteel is: ${HighestScore}`, 350, 200);
            // TODO ^^ ^w^
            return 500
        }
    }
}