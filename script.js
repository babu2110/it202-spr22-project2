let gameDiv = document.querySelector("#startGame");
let c = document.querySelector("#gameCanvas");
let ctx = c.getContext("2d");

const alphaBet = new Map();

// Service worker to make the game installable
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function() {
        console.log("Service worker is registered.")
    });
}

document.addEventListener("keypress", (e)=> {
    populateAlphaBet();
    if(intToChar(e.which) == 's') {
        console.log("Game is going to start, pls wait!")
        draw();
    }
});

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
function draw() {
    ctx.clearRect(0,0, c.clientWidth, c.height);

    ctx.beginPath();
    ctx.arc(100,z,10,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();

    window.requestAnimationFrame(draw);
}