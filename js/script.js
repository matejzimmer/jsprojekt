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

let skore = 0;

function hra() {
poziceHada();
let vysledek = isgameOver();
if(vysledek){
    return;
}
clearScreen();

kontrolaStretu();
jidlo();
had();
vypisSkore();
setTimeout(hra, 1000/rychlost);
}

function isgameOver(){
let gameOver = false;

if(hlavaX < 0){
    gameOver = true;
}
if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "75px Verdana";

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    
    ctx.fillStyle = gradient;

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);


return gameOver;
}

function vypisSkore(){
ctx.fillStyle = "white";
ctx.font = "20px Verdana";
ctx.fillText("Skore: " + skore, canvas.width -340, 20);
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
//funkce jidlo nastavena na zlutou 
function jidlo(){
    ctx.fillStyle = "yellow";
    ctx.fillRect(jidloX * pocetZ, jidloY * pocetZ, velikostZ, velikostZ);
}
//funkce stretu, kdyz se hlava hada dotkne jidla, jidlo jde na random pozici na plose
function kontrolaStretu(){
    if(jidloX === hlavaX && jidloY == hlavaY){
        jidloX = Math.floor(Math.random()* velikostZ);
        jidloY = Math.floor(Math.random()* velikostZ);
        delkaTela++;
        skore++;
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