let gameDiv = document.querySelector("#startGame");
let c = document.querySelector("#gameCanvas");
let ctx = c.getContext("2d");
let countS = 0;

let lives = 3;
let score = 0;
let level = 1;
var bg_img = new Image();
var pImg = new Image();
var bOb = new Image();
var hOb = new Image();
bg_img.src = 'bg.jpeg';
pImg.src = 'pBefore.png';
bOb.src = 'green.png';
hOb.src = 'red.png'

// let img = new Image();
// img.src = "pacman-mouth-closed.png";


let gameObjects = [
    {
        "type":"player",
        "x": window.innerWidth* 0.05 - (window.innerWidth *0.05)/2,
        "y": window.innerHeight/2 - (window.innerHeight *0.2)/2,
        "w": window.innerWidth *0.2,
        "h": window.innerHeight*0.2,
        "delta_x": 3,
        "delta_y": 7
    },
    {
        "type":"benefit",
        "x":window.innerWidth,
        "y": Math.floor(Math.random() *50) + 30,
        "w": window.innerWidth *0.1,
        "h": window.innerHeight*0.1,
        "delta_x":-5,
        "delta_y":0
    },
    {
        "type":"harm",
        "x":window.innerWidth,
        "y":Math.floor(Math.random() * window.innerHeight) + 30,
        "delta_x": -Math.floor(Math.random() * 10),
        "delta_y":0,
        "w": window.innerWidth *0.15,
        "h": window.innerHeight*0.1
    },
    {
        "type":"harm",
        "x":window.innerWidth,
        "y":Math.floor(Math.random() * window.innerHeight) + 25,
        "delta_x": -Math.floor(Math.random() * 10),
        "delta_y":0,
        "w": window.innerWidth *0.15,
        "h": window.innerHeight*0.1
    }
]
window.onload = function () {
    console.log("Loading");
    prepareDocument();
    resizeCanvas();
}

window.onresize = function() {
    console.log("Resizing");
    resizeCanvas();
}
// add flakes
let mf = 100;
let flakes= [];
for (let i = 0; i < mf; i++) {
   flakes.push({
       x:Math.random()*window.innerWidth,
       y:Math.random()*window.innerHeight,
       r:Math.random* 5 +1,
       d: Math.random()+1
   });
}
bg_img.addEventListener('load', (event) => {
    // Start the game "S"
    window.addEventListener('keypress', (e)=> {
        if(e.keyCode === 115 && countS < 1) {
            document.querySelector("#startGame").remove();
            console.log(e.keyCode);
            countS++;
            draw();
        }
    });
});
// Play again "P"
window.addEventListener('keypress', (e)=> {
    if(e.keyCode === 112 && lives === 0) {
        lives = 3;
        level = 1;
        score = 0;
        // draw the flakes
        draw();
    }
});

window.addEventListener('keydown', (e)=> {
    if(e.key == "ArrowUp") {
        gameObjects[0].y = gameObjects[0].y - gameObjects[0].delta_y;
    } else if (e.key == "ArrowDown") {
        gameObjects[0].y = gameObjects[0].y + gameObjects[0].delta_y;
    }
});
function draw() {
    pImg.src = 'pBefore.png';
    ctx.clearRect(0,0,c.width, c.height);
    ctx.drawImage(bg_img, 0,0, window.innerWidth, window.innerHeight);

    gameObjects.forEach( (obj) => {
        if(obj.type != "player") {
            obj["x"] += obj["delta_x"];
        }
    })
    // handle conditions
    gameObjects.forEach( (obj) => {
        if(obj["x"] + obj.h/2 < 0 && obj.type != "player") {
            obj["x"] = c.width;
            obj["y"] = Math.abs(getRandomInt(c.height - obj.h/2));
        }
    });

    let pTop = Math.floor(gameObjects[0].y) + 10
    let pBottom = Math.floor(gameObjects[0].y + gameObjects[0].h - 10);

    for (let i = 1; i < gameObjects.length; i++) {
        let obTop = Math.floor(gameObjects[i].y)
        let obBottom = Math.floor(gameObjects[i].y + gameObjects[i].h);
        let collidedOb = collectObjectPoints(obTop, obBottom, pTop, pBottom);

        let obLeftEdge = Math.floor(gameObjects[i]["x"]-gameObjects[i].w/2+20);
        let playerRightEdge = Math.floor(gameObjects[0].x) + Math.floor(gameObjects[0].w/2 - 20);
        if( collidedOb && (obLeftEdge < playerRightEdge) && gameObjects[i].type == "harm") {
            gameObjects[i]["x"] = c.width;
            gameObjects[i]["y"] = getRandomInt(c.height) + 30;
            console.log("Collided with " + i);
            lives--;
        }
        if(collidedOb && (obLeftEdge < playerRightEdge) && gameObjects[i].type == "benefit") {
            pImg.src = 'pAfter.png';
            gameObjects[i].x = c.width;
            gameObjects[i].y = getRandomInt(c.height) + 30;
            console.log("Point 1");
            score += 300;
        }
    }
    
    if(score >= 600 && level === 1) {
        level++;
        score=0;
        gameObjects[0].delta_y += 2;
        gameObjects.forEach((ob)=> {
            if(ob.type != "player") {
                ob["delta_x"] -= level; 
            }
        });
        const addEl = {
            "type":"harm",
            "x":window.innerWidth,
            "y":Math.floor(Math.random() * window.innerHeight) + 30,
            "delta_x": -Math.floor(Math.random() * 5),
            "delta_y":0,
            "w": window.innerWidth *0.15,
            "h": window.innerHeight*0.1
        };
        const addBen = {
                "type":"benefit",
                "x":window.innerWidth,
                "y": Math.floor(Math.random() *50) + 30,
                "delta_x":-5,
                "delta_y":0,
                "w": window.innerWidth *0.1,
                "h": window.innerHeight*0.1,
            }
        gameObjects.push(addEl);
        gameObjects.push(addBen);
        score = 0;
    }
    if(score >= 1000 && level === 2) {
        level++;
        score=0;
        gameObjects[0].delta_y += 4;
        gameObjects.forEach((ob)=> {
            if(ob.type != "player"){
                ob["delta_x"] -= level;
            }
        });
        const addEl = {
            "type":"harm",
            "x":window.innerWidth,
            "y":Math.floor(Math.random() * window.innerHeight) + 30,
            "delta_x": -Math.floor(Math.random() * 10),
            "delta_y":0,
            "w": window.innerWidth *0.15,
            "h": window.innerHeight*0.1
        };
        gameObjects.push(addEl);
        score = 0;
    }
    if(score >= 2000 && level === 3) {
        score =0;
        ctx.clearRect(0,0,c.width, c.height);
        ctx.font = "30px Arial";
        ctx.fillText("Congratulations! You cleared the game!", c.width/2-280, c.height/2);
        level = 1;
        score =0;
        gameObjects.pop();
        gameObjects.pop();
        gameObjects.pop();
        return;
    }

    if(lives == 0) {
        if(level == 2) {
            gameObjects.pop();
            gameObjects.pop();
        }
        if(level == 3) {
            gameObjects.pop();
        }
        gameObjects.forEach((ob)=> {
            if(ob.type != "player") {
                ob["delta_x"] += level; 
            }
        });
        console.log("Game Over");
        ctx.clearRect(0,0,c.width, c.height);
        ctx.font = "20px Arial";
        let gameOver = "Game Over!";
        let replay = "If you would like to play again press \"p\" ";
        ctx.fillStyle = "Orange";
        ctx.fillText(gameOver, c.width/2, c.height/2);
        ctx.fillText(replay, c.width/2 - 100, c.height/2 + 40);
        return;
    }
    // drawing the elements
    gameObjects.forEach( (obj) => {
        ctx.beginPath();
        if(obj.type == "player") {
            ctx.drawImage(pImg, obj.x, obj.y, obj.w, obj.h);
        } else if(obj.type == "benefit"){
            ctx.drawImage(bOb, obj.x, obj.y, obj.w, obj.h);
            // ctx.arc(obj["x"], obj["y"], obj["radius"], 0, 2*Math.PI);
        } else {
            ctx.drawImage(hOb, obj.x, obj.y, obj.w, obj.h);
            // ctx.arc(obj["x"], obj["y"], obj["radius"], 0, 2*Math.PI);

        }
        ctx.closePath();
        if(obj.type == "player" || obj.type == "benefit") {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "red";
        }
        ctx.fill();
    });
    
    ctx.font = "20px Arial";
    ctx.fillStyle = "aliceblue"
    ctx.fillText("Score: " + score, 60, 40);
    ctx.fillText("Lives: " + lives , 60, 70)
    ctx.fillText("Level: " + level, 60, 100);
    
    

    requestAnimationFrame(draw);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function prepareDocument() {
    document.body.style.padding = "0px";
    document.body.style.margin = "0px";
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

function collectObjectPoints(xTop, xBottom, yTop, yBottom){
    let collectCirclePoints = new Map();
    for (let i = xTop; i <= xBottom; i++) {
        collectCirclePoints.set(i,i);
    }
    for (let j = yTop; j <= yBottom; j++) {
        if(collectCirclePoints.has(j)) {
            return true;
        }
    }
    return false;
}
