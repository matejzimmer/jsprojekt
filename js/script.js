const canvas = document.getElementById('hra');
const ctx = canvas.getContext('2d');

let rychlost = 7;

let pocetZ = 30;
let velikostZ = canvas.width / pocetZ;
let hlavaX = 10;
let hlavaY = 10;

let rychlostX = 0;
let rychlostY = 0;


function hra() {
clearScreen();
poziceHada();
had();
setTimeout(hra, 1000/rychlost);
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}

function had(){
    ctx.fillStyle = "blue";
    ctx.fillRect(hlavaX * pocetZ, hlavaY * pocetZ, velikostZ, velikostZ)
}

function poziceHada(){
    hlavaX = hlavaX + rychlostX;
    
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event){
    if(event.keyCode == 38){
        rychlostY = -1;
        rychlostX = 0;
    }
}


hra();