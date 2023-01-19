//definovani konstant
const canvas = document.getElementById('hra');
const ctx = canvas.getContext('2d');


class teloHada{
constructor(x, y){
    this.x = x;
    this.y = y;
}
}
//definovani promennych
let rychlost = 7;

let pocetZ = 25;

let velikostZ = canvas.width / pocetZ - 2;
let hlavaX = 15;
let hlavaY = 15;
const telo = [];
let delkaTela = 2;

let jidloX = 10;
let jidloY = 10;

let smerX = 0;
let smerY = 0;

let skore = 0;
//audio na jezeni jidla a gameover
const gameOverSound = new Audio("gameOver.wav");
const eatingSound = new Audio("eating.wav")

// funkce hra se provadi kazdou min jak sekundu, podle toho jak je nastaveny setTimeout
function hra() {
poziceHada();
let vysledek = isgameOver();
if(vysledek){
    return;
}
else{
    clearScreen();

kontrolaStretu();
jidlo();
had();
vypisSkore();

if(skore > 5){
    rychlost = 10;
}
if(skore > 10){
    rychlost = 15;
}
if(skore > 15){
    rychlost = 20;
}
if(skore > 20){
    rychlost = 25;
}
if(skore > 25){
    rychlost = 30;
}
if(skore > 30){
    rychlost = 40;
}

setTimeout(hra, 1000/rychlost);
}

}

// funkce gameOver
function isgameOver(){
    //nastaveni na nepravdivou
let gameOver = false;

if ( smerY=== 0 && smerX === 0) {
    return false;
  }
// pokud hlava hadika se dotkne zdi, nastavi gameover na pravdivou
if(hlavaX < 0){
    gameOver = true;
}
else if (hlavaX === pocetZ -1) {
    gameOver = true;
  } 
  else if (hlavaY < 0) {
    gameOver = true;
  } 
  else if (hlavaY === pocetZ -1) {
    gameOver = true;
  }
// pokud se hlava dotkne sveho tela, nastavi se gameover na pravdivou
  for (let i = 0; i < telo.length; i++) {
    let cast = telo[i];
    if (cast.x === hlavaX && cast.y === hlavaY) {
      gameOver = true;
      break;
    }
  }

  //jestli je gameOver pravdivy, vypise se na obrazovku barevny napis GAME OVER
if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "75px Verdana";

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    
    ctx.fillStyle = gradient;

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    gameOverSound.play();
  }

  


return gameOver;
}
// funkce vypisu skore, nastavena na bilou 20 pixelu
function vypisSkore(){
ctx.fillStyle = "white";
ctx.font = "20px Verdana";
//zarovnani na stred
ctx.fillText("Skore: " + skore, canvas.width -340, 20);
}
// funkce vyplneni cerne obrazovky 600 na 600 pixelu 
function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}
// funkce resetu, ktera kdyz kliknete na reset se jakoze refreshe stranka
function reset(){
    location.reload();
  }
//funkce hada, barva fialova
function had(){
    ctx.fillStyle = "purple";
    for(let i = 0; i < telo.length; i++){
        let cast = telo[i];
        ctx.fillRect(cast.x * pocetZ, cast.y * pocetZ, velikostZ, velikostZ);
    }
//nove telo se vytvori u hlavy
telo.push(new teloHada(hlavaX, hlavaY));
//odstrani kostku tela nejdal od hlavy kdyz to bude vic nez mame telo
if(telo.length > delkaTela){
    telo.shift();
}
//telo nastaveno na barvu modrou
ctx.fillStyle = "blue";
    ctx.fillRect(hlavaX * pocetZ, hlavaY * pocetZ, velikostZ, velikostZ)
}


// funkce meni pozici hada
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
        //pokud had sni jidlo delka tela se pricte o 1 cast, skore taktez a zahraje sound jezeni
        delkaTela++;
        skore++;
        eatingSound.play();
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
