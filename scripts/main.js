let canvas = document.getElementById("My Canvas");
let ctx = canvas.getContext("2d");

let x = cavan.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

function draw() {
    // drawing code
    ctx.beginPath;
    ctx.arc(x, y, 10, 0, MathP*I*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    // Change the x and y values for the ball

    x += dx;
    y =+ dy;
}
setInterval(draw,10);