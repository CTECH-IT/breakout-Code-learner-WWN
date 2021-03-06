let canvas = document.getElementById("MyCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPresed = false;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let Lives = 3;

// set up a 2-dimetional array for the bricks
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, show: true };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#cc0000";
    ctx.fill();
    ctx.closePath();

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].show == true) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetLeft;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(score);

    // draw the bricks
    drawBricks();

    // draw the ball
    drawBall();

    drawPaddle();

    // Change the x and y values for the ball
    x += dx;
    y += dy;

    // check to see if we've gone off hte edge of hit board
    if (x > canvas.width - ballRadius || x < ballRadius) {
        dx = -dx;
    }
    if (y > canvas.height - ballRadius || y < ballRadius) { //ceiling check 
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) { //floor check
        if (x > paddleX && x < paddleX + paddleWidth) { // paddle check
            dy = -dy;
        } else { // if hit the floor !
            if (Lives>0){
                Lives--;
                alert("Lost a Life");
                x = canvas.width /2;
                y = canvas.height - 30
                dx = 2;
                dy = 2;
                paddleX = (canvas.width-paddleWidth)/2;
            }else {
                alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // need browswer to end game
            }

        }
    }

    // paddle controls
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPresed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    drawPaddle();

    //check whether the ball is touching any bricks
    collisionDetection();

    drawScore();

    drawLives();

}
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPresed = true;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.show == true) {
                if (x > b.x && x < b.x + brickWidth) {
                 }
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.show = false;
                    score++;
                    if(score == brickRowCount*brickColumnCount){
                        alert("Finished the level!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle= "#FFFF00";
    ctx.fillText("Remaining Lives: "+ Lives, 140, 20)
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPresed = false;
    }
}

function mouseMoveHandler(e){
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth /2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

let interval = setInterval(draw, 10);