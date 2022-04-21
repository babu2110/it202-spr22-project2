var canvas = document.getElementById("myCanvas");

const resize = () => {
    // make canvas size in full use
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();

window.addEventListener('resize', resize);
var canvasCtx = canvas.getContext("2d");

function draw() {
    canvasCtx.beginPath();
    canvasCtx.arc(100, 50, 10, 0, 2* Math.PI);
    canvasCtx.closePath();
    canvasCtx.fill();

    window.requestAnimationFrame(draw);
}
// draw();
canvasCtx.font = "30px Arial";
canvasCtx.fillStyle = "red";
canvasCtx.textAlign = "center";
canvasCtx.fillText("Welcome to Self-Training Ping Pong", canvas.width/2, canvas.height / 2);

