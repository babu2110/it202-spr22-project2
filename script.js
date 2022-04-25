let gameDiv = document.querySelector("#startGame");
let c = document.querySelector("#gameCanvas");
let ctx = c.getContext("2d");


const alphaBet = new Map();

// Service worker to make the game installable
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function() {
        console.log("Service worker is registered.");
    });
}
window.onload = function() {
    console.log('loading...');
    prepareDocument();
    resizeCanvas();
}

window.onresize = function() {
    console.log('resizing...');
    resizeCanvas();
}

document.addEventListener("keypress", (e)=> {
    populateAlphaBet();
    if(intToChar(e.which) == 's') {
        console.log("Game is going to start, pls wait!")
        const wlcTxt = document.querySelector("#startGame");
        wlcTxt.remove();
        drawOb();
    }
});

// 
function prepareDocument(){
    document.body.style.padding = "0px";
    document.body.style.margin = "0px";
}

// Resizing the Canvas whenever we load it
function resizeCanvas () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

function populateAlphaBet(){
    for (let i = 65; i < 123; i++) {
        if(i < 91) {
            let total = Math.abs(65-i);
            alphaBet.set(i, String.fromCharCode('A'.charCodeAt(0) + total));
        } else if (i > 96){
            let total = Math.abs(97-i);
            alphaBet.set(i, String.fromCharCode('a'.charCodeAt(0)+total));
        }
    }
}
// Converting Int to Char
function intToChar(x) {
    return alphaBet.get(x);
}

function drawOb() {
    ctx.clearRect(0, 0, c.width, c.height);

    let width = c.width * 0.05;
    let height = c.height * 0.2;

    let xpos = c.width * 0.1 - width/2;
    let ypos = c.height/2 - height/2;

    ctx.beginPath();
    ctx.rect(xpos, ypos, width, height);
    ctx.closePath();

    ctx.fillStyle = "green"
    ctx.fill();
    window.requestAnimationFrame(drawOb);
}