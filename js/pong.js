var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;
const INF_SCORE = 900719925474099;
var showingWinScreen = false;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 12;
const PADDLE_HEIGHT = 100;
var HighestScore = 0;

// Kijkt naar waar je muis is

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}
function handleMouseClick(evt) {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false
    }
}
// Events wanneer je start
function startGameScored() {
    let startbuttons = document.getElementById('startbuttondiv')
    canvas = document.getElementById('gameCanvas');
    canvas.style.display = "block";
    startbuttons.style.visibility = "hidden";
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 45; // 45 is het norm, 120 is snel en 30 langzaam. [DIT TAST GAMESPEED AAN]
    setInterval(function() {
        moveEverythingScored();
        drawEverythingScored();
    }, 1000 / framesPerSecond); // 1000 ms = 1 second. 1000/FPS geeft je een nummer dat precies zoveel keer past in 1000. Zo krijg je de refresh rate
    canvas.addEventListener('mousedown', handleMouseClick)

    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        });
};
function startGameInf() {
    let startbuttons = document.getElementById('startbuttondiv')
    canvas = document.getElementById('gameCanvas');
    var hs = getCookie("HighestScore")
    HighestScore = hs;
    canvas.style.display = "block";
    startbuttons.style.visibility = "hidden";
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 45; // 45 is het norm, 120 is snel en 30 langzaam. [DIT TAST GAMESPEED AAN]
    checkForHighscoreCookie();
    setInterval(function() {
        moveEverythingInf();
        drawEverythingInf();
    }, 1000 / framesPerSecond); // 1000 ms = 1 second. 1000/FPS geeft je een nummer dat precies zoveel keer past in 1000. Zo krijg je de refresh rate

    canvas.addEventListener('mousedown', handleMouseClick)

    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        });
};
function ballResetScored() {
    if (player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE) {
        showingWinScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
function ballResetInf() {
    if (player1Score >= INF_SCORE ||
        player2Score >= WINNING_SCORE) {
        HighscoreSystem(player1Score)
        showingWinScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y = paddle2Y + 6;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y = paddle2Y - 6;
    }
}
function moveEverythingScored() {
    if (showingWinScreen) {
        return;
    }
    computerMovement();
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    // Paddle links
    if (ballX < 0) {
        if (ballY > paddle1Y &&
            ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY -
                (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;
            ballResetScored();
        }
    }
    // Paddle rechts
    if (ballX > canvas.width) {
        if (ballY > paddle2Y &&
            ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY -
                (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballResetScored();
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}
function moveEverythingInf() {
    if (showingWinScreen) {
        return;
    }
    computerMovement();
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    // Paddle links
    if (ballX < 0) {
        if (ballY > paddle1Y &&
            ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY -
                (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;
            ballResetInf();
        }
    }
    // Paddle rechts
    if (ballX > canvas.width) {
        if (ballY > paddle2Y &&
            ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY -
                (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballResetInf();
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}
function drawNet() {
    for(var i=0;i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1, i, 2, 20, 'white');
    }
}

function drawEverythingInf() {
    // Next line blanks out the screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    if (showingWinScreen) { 
        canvasContext.fillStyle = 'white'; 
        canvasContext.fillText(`Je score was ${player1Score}`, 350, 150)
        canvasContext.fillText("Klik om door te gaan.", 350, 250)
        if (player1Score > HighestScore) {
            HighestScore = player1Score;
            canvasContext.fillText("Je score was het hoogste!", 350, 175);
            canvasContext.fillText(`Hoogste score momenteel is: ${HighestScore}`, 350, 200);
        } else {
            canvasContext.fillText("Je score was niet het hoogste!", 350, 175);
            canvasContext.fillText(`Hoogste score momenteel is: ${HighestScore}`, 350, 200);
        }
        return; 
    } 
    drawNet();
    // Linker speler paddle
    colorRect(2, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    // Rechter speler paddle
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, 10, PADDLE_HEIGHT, 'white');
    // Ball
    colorCircle(ballX, ballY, 10, 'white');
    // Scores!
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);
}
function drawEverythingScored() {
    // Next line blanks out the screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    if (showingWinScreen) { 
        canvasContext.fillStyle = 'white'; 
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText("Linker speler heeft gewonnen!", 200, 100);
        }
        else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Rechter speler heeft gewonnen!", 200, 100);
        }
        canvasContext.fillText("Klik om door te gaan.", 350, 200)
        return; 
    } 
    drawNet();
    // Linker speler paddle
    colorRect(2, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    // Rechter speler paddle
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, 10, PADDLE_HEIGHT, 'white');
    // Ball
    colorCircle(ballX, ballY, 10, 'white');
    // Scores!
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);
}
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}
function HighscoreSystem(highscoreNum) {
    if(HighestScore === null || NaN) {
        HighestScore = highscoreNum
    } else {
        if (highscoreNum > HighestScore) {
            HighestScore = highscoreNum;
            // canvasContext.fillText("Je score was het hoogste!", 350, 175);
            // canvasContext.fillText(`Hoogste score momenteel is: ${HighestScore}`, 350, 200);
            setCookie("HighestScore", HighestScore, 365)
        } else {
            // canvasContext.fillText("Je score was niet het hoogste!", 350, 175);
            // canvasContext.fillText(`Hoogste score momenteel is: ${HighestScore}`, 350, 200);
            return 201
        }
    }
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