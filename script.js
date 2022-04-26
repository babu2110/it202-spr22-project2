let gameDiv = document.querySelector("#startGame");
let c = document.querySelector("#gameCanvas");
let ctx = c.getContext("2d");
let countS = 0;
let width = window.innerWidth * 0.05;
let height = window.innerHeight * 0.2;
console.log("This is width " + width);
console.log("This is height " + height);

let ball = {

}
let paddle = {
    x: window.innerWidth * 0.1 - width/2,
    y: window.innerHeight/2 - height/2,
    w: window.innerWidth * 0.025,
    h: window.innerHeight * 0.2,
    color: "BLACK",
    score: 0
}

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
        // remove welcome text from the start menu
        if(countS < 1) {
            console.log("Game is going to start, pls wait!")
            const wlcTxt = document.querySelector("#startGame");
            wlcTxt.remove();
            countS++;
        }
        let color = "black";
        let deltaY = 3;
        console.log(paddle.x)
        console.log(paddle.y)
        console.log(paddle.w)
        console.log(paddle.h)
        console.log(paddle.color)
        drawPaddle(paddle.x, paddle.y, paddle.w, paddle.h, paddle.color);
    }
});

//
function drawText(x,y, text, color){
    ctx.fillStyle = color;
    ctx.font = "55px fantasy";
    ctx.fillText(text, x,y);
}

// Drawing hitting pad
function drawPaddle(x,y, w,h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}
// Ping pong ball
function drawCircle(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0, Math.PI*2, false);
    ctx.fill();
}
// 
function prepareDocument(){
    document.body.style.padding = "0px";
    document.body.style.margin = "0px";
}

// Resizing the Canvas whenever we load it
function resizeCanvas () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    paddle = {
        x: window.innerWidth * 0.1 - width/2,
        y: window.innerHeight/2 - height/2,
        w: window.innerWidth * 0.025,
        h: window.innerHeight * 0.2,
        color: "BLACK",
        score: 0
    }
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

