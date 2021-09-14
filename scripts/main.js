let canvas = document.getElementById("MyCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

let rightPressed = false;
let leftPresed = false;

function drawBall() {
     ctx.beginPath();
     ctx.arc( x, y, ballRadius, 0, Math.PI*2);
     ctx.fillStyle = "#0095DD";
     ctx.fill();
     ctx.closePath();

}

function drawPaddle() {
    ctx. beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the ball
    drawBall();

    drawPaddle();

     // Change the x and y values for the ball
    x += dx;
    y += dy;
   
    //check to see if we've gone off hte edge of ht board
    if (x > canvas.width - ballRadius || x < ballRadius) {
        dx = -dx;
    }
    if(y > canvas.height - ballRadius || y < ballRadius) {
        dy = -dy
    }

    // paddle controls
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.Widthg){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPresed) {
        paddleX -=7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    drawPaddle();
    

}
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPresed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPresed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw,10);