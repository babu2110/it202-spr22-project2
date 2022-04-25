let gameDiv = document.querySelector("#startGame");
const alphaBet = new Map();


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

}