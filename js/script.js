const canvas = document.getElementById('hra');
const ctx = canvas.getContext('2d');

class teloHada{
constructor(x, y){
    this.x = x;
    this.y = y;
}
}

let rychlost = 7;

let pocetZ = 30;

let velikostZ = canvas.width / pocetZ -2;
let hlavaX = 10;
let hlavaY = 10;
const telo = [];
let delkaTela = 2;

let jidloX = 5;
let jidloY = 5;

let smerX = 0;
let smerY = 0;


function hra() {
clearScreen();
poziceHada();
kontrolaStretu();
jidlo();
had();
setTimeout(hra, 1000/rychlost);
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}

function had(){
    

    ctx.fillStyle = "purple";
    for(let i = 0; i < telo.length; i++){
        let cast = telo[i];
        ctx.fillRect(cast.x * pocetZ, cast.y * pocetZ, velikostZ, velikostZ);
    }

telo.push(new teloHada(hlavaX, hlavaY));
if(telo.length > delkaTela){
    telo.shift();
}
ctx.fillStyle = "blue";
    ctx.fillRect(hlavaX * pocetZ, hlavaY * pocetZ, velikostZ, velikostZ)
}



function poziceHada(){
    hlavaX = hlavaX + smerX;
    hlavaY = hlavaY + smerY
}

function jidlo(){
    ctx.fillStyle = "yellow";
    ctx.fillRect(jidloX * pocetZ, jidloY * pocetZ, velikostZ, velikostZ);
}

function kontrolaStretu(){
    if(jidloX === hlavaX && jidloY == hlavaY){
        jidloX = Math.floor(Math.random()* velikostZ);
        jidloY = Math.floor(Math.random()* velikostZ);
        delkaTela++;
    }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event){
    //pohyb nahoru
    if(event.keyCode == 38){
        if(smerY == 1){
            return;
        }
        smerY = -1;
        smerX = 0;
    }
    //pohyb dolu
    if(event.keyCode == 40){
        if(smerY == -1){
            return;
        }
        smerY = +1;
        smerX = 0;
    }
    //pohyb doleva
    if(event.keyCode == 37){
        if(smerX == 1){
            return;
        }
        smerY = 0;
        smerX = -1;
    }
    //pohyb doprava
    if(event.keyCode == 39){
        if(smerX == -1){
            return;
        }
        smerY = 0;
        smerX = +1;
    }
}


hra();