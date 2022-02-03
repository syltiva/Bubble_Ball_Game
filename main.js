const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width/2;
const centerY = canvas.height/2;

let gravity = 0.025;

// BALL
const circle = {
    x: 50,
    y: 50,
    radius: 20,
    dx: 0,
    dy: 0
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
    ctx.fillStyle= 'rgba(253, 254, 254, 0.8)';
    ctx.fill();
    ctx.strokeStyle= 'rgb(40, 116, 166)';
    ctx.stroke();

}

// BUBBLES
let bubbles = [
    {x: 0, y: 800, radius: 150, color: 'rgba(14, 102, 85, 0.4'}, // Left Corner Big
    {x: 0, y: 650, radius: 75, color: 'rgba(133, 193, 233, 0.5)'}, // left little 
    {x: 600, y: 800, radius: 150, color: 'rgba(14, 102, 85, 0.4'}, // Right Corner Big
    {x: 600, y: 650, radius: 75, color: 'rgba(133, 193, 233, 0.5)'}, // right little
    {x: 300, y: 800, radius: 100, color: 'rgba(133, 193, 233, 0.5)'}, // Big middle
    {x: 425, y: 800, radius: 50, color: 'rgba(118, 68, 138, 0.2)'}, // right purple bubble
    {x: 175 , y: 800, radius: 50, color: 'rgba(118, 68, 138, 0.2)'}, // left purple bubble
    {x: 150, y: 200, radius: 25, color: 'rgba(14, 102, 85, 0.6' }, // green bubble top left
    {x: 450, y: 200, radius: 25, color: 'rgba(14, 102, 85, 0.6' }, // green bubble top right
    {x: 170, y: 180, radius: 15, color: 'rgba(118, 68, 138, 0.3)'}, 
    {x: 470, y: 180, radius: 15, color: 'rgba(118, 68, 138, 0.3)'},
    {x: 300, y: 75, radius: 30, color: 'rgba(133, 193, 233, 0.75)'}, // middle top
    {x: 275, y: 50, radius: 20, color: 'rgba(14, 102, 85, 0.4'},
    {x: 0, y: 0, radius: 50, color: 'rgba(133, 193, 233, 0.4)'},
    {x: 600, y: 0, radius: 50, color: 'rgba(133, 193, 233, 0.4)'},
    {x: 50, y: 0, radius: 30, color: 'rgba(118, 68, 138, 0.2)'},
    {x: 550, y: 0, radius: 30, color: 'rgba(118, 68, 138, 0.2)'},
    {x: 295, y: 40, radius: 15, color: 'rgba(118, 68, 138, 0.2)'},
    {x: 280, y: 25, radius: 15, color: 'rgba(133, 193, 233, 0.5)'},
]

function drawBubbles(array) { 

    for ( let i=0; i<array.length; i++) {
        
            ctx.beginPath();
            ctx.arc(array[i].x, array[i].y, array[i].radius, 0, Math.PI*2 );
            ctx.fillStyle = array[i].color;
            ctx.strokeStyle = "rgba (40, 116, 166)"
            ctx.stroke();
            ctx.fill();
        
    }
}

function collidingBubbles (bubble) {        
    let dx = bubble.x - circle.x;
    let dy = bubble.y - circle.y;
    let distance = Math.sqrt(dx*dx+dy*dy);
    let sumOfRadii = bubble.radius + circle.radius
    if (distance <= sumOfRadii) {
        circle.dy = -circle.dy;
        circle.dx = -circle.dx;
    }   else {
        circle.dy *= 1;
    }
}

// SHOOTERS //
let shooters = [
    {x: 50, y:797, w:100, h:3 },
    {x:450, y:797, w:100, h:3 },
    {x: 0,  y:100, w:3,   h:100},
    {x: 0,  y:450, w:3,   h:100},
    {x:597, y:100, w:3,   h:100},
    {x:597, y:450, w:3,   h:100}
]

function drawShooters (array) {

    ctx.fillStyle = 'rgba(118, 68, 138, 0.2)'
    ctx.beginPath();
    ctx.rect(0, 100, canvas.width, 100);
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.rect(0, 450, canvas.width, 100);
    ctx.fillStyle = 'rgba(118, 68, 138, 0.2)'
    ctx.fill();
    
    ctx.beginPath();
    ctx.rect(50, 0, 100, canvas.height);
    ctx.fillStyle = 'rgba(118, 68, 138, 0.2)'
    ctx.fill();
    
    ctx.beginPath();
    ctx.rect(450, 0, 100, canvas.height);
    ctx.fillStyle = 'rgba(118, 68, 138, 0.2)'
    ctx.fill();
    

    for (i=0; i<array.length; i++) {
        ctx.beginPath();
        ctx.rect(array[i].x, array[i].y, array[i].w, array[i].h);
        ctx.stroke();
    }
}

// PLATFORM
const middleRect = {
    x:260, 
    y:335, // 350
    w:80, 
    h:15};

function drawBasket() {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(52, 73, 94, 0.7)'
    ctx.rect(middleRect.x, middleRect.y, middleRect.w, middleRect.h);
    ctx.strokeStyle = 'white'
    ctx.stroke(); // Center Rect
    ctx.closePath();
    ctx.fill();
}


function collidingBottomBasket() {
   
    if (circle.x + circle.radius > 260 && circle.x + circle.radius < 340 && circle.y + circle.radius > 335 && circle.y + circle.radius < 357 ) {
        circle.dx = 0;
        circle.dy = 0;
        endGame = 1;
    }
}


// MOVEMENT
function moveUp() {
    if (circle.dx >= 50 || circle.dx <= 150) {
        if (circle.dx >= 450 || circle.dy <= 550){
            circle.dy -= 0.2;
        }
    }
}

function moveRight() {
    if (circle.dy >= 100 || circle.dy <= 200) {
        circle.dx += 0.2;
    }
}

function moveLeft() {
    if (circle.dy >= 100 || circle.dy <= 200) {
        circle.dx -= 0.2;
    }
}

function keyDownHandler(e){
    console.log(e.key)
    
    if (circle.x > 150 && circle.x < 450 && circle.y > 0 && circle.y < 100) {
        return;
    }   else if (circle.x > 150 && circle.x < 450 && circle.y > 200 && circle.y < 450) {
        return;
    }   else if (circle.x > 150 && circle.x < 450 && circle.y > 550 && circle.y < 800) {
        return;
    }   else if (e.key == "ArrowRight"){
        rightPressed = true;
        moveRight();
    }   else if (e.key == "ArrowLeft") {
        leftPressed = true;
        moveLeft();
    }   else if (e.key == "ArrowUp") {
        upPressed = true;
        moveUp();
}
}

var globalID;
var endGame;

function update() {
    endGame = 0;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBubbles(bubbles);
    drawShooters(shooters);
    drawBasket();
    drawCircle();
    collidingBottomBasket();
  
    // // COLLIDING BUBBLE INTERATION 
    for(i=0; i<bubbles.length; i++) {
        collidingBubbles(bubbles[i]);
    }
    //change position
    if (circle.dy + circle.radius > canvas.height) {        
        circle.dy = -circle.dy;
    }   else {
        circle.dy += gravity;
    }
    circle.x += circle.dx;
    circle.y += circle.dy;


    // Detect side walls
    if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0){
        circle.dx *= -1;
        }
    // Detect top and bottom walls
    if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
        circle.dy *= -1;
    }
    globalID = requestAnimationFrame(update);
    
    if (endGame == 1) {
        alert("BUBBLING BAJEEBUS BATMAN! YOU'VE WON!")
        cancelAnimationFrame(globalID); 
    }
}

//update();
document.addEventListener("keydown", function(event) {
    keyDownHandler(event);
});

document.getElementById("button").addEventListener("click", function() {
   update();   
 });