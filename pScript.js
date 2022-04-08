var canvas = document.getElementById("myCanvas");

const resize = () => {
    // make canvas size in full use
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();

window.addEventListener('resize', resize);
var canvasCtx = canvas.getContext("2d");

function fullScreen() {
    var elmt = document.getElementById('myCanvas');

    if(elmt.webkitRequestFullScreen) {
        elmt.webkitRequestFullScreen();
    } else {
        elmt.mozRequestFullScreen();
    }
}

canvas.addEventListener("click", fullScreen);


