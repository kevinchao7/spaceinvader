// Import classes.js
// var imported = document.createElement('script');
// imported.src = 'classes.js';
// document.head.appendChild(imported);


// To render graphics on the <canvas> element, first we have to grab a reference to it in JavaScript.
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var enemyImgArr = [];

// Key Control Boolean variables
var moveLeft = false;
var moveRight = false;
var spaceBtn = false;

// Audio
myAudio = new Audio('assets/music.mp3');
myAudio.addEventListener('ended', function() {
  this.currentTime =0;
  this.play();
}, false);
myAudio.play();

// Keyboard Controls - uses boolean to smooth our movements
document.onkeydown = function(evt){
  if (evt.keyCode === 37)
    moveLeft = true;
  else if (evt.keyCode === 39)
    moveRight = true;
}
document.onkeyup = function(evt){
  if (evt.keyCode === 37)
    moveLeft = false;
  else if (evt.keyCode === 39)
    moveRight = false;
  else if (evt.keyCode === 32)
    spaceBtn = true;
}

// Initalizing global variables
var player = new Player();
var bullet = [];
var shield = [];
for (var i = 0; i < 4; i++){
  shield.push(new Shield(120*(i+1), 340));
}
var spriteSheet = new Image();
spriteSheet.src = "assets/spritesheet.png";
var background = new Image();
background.src = "assets/stars.jpeg";

// Parallax scrolling variable
var parallax = 0;

// Initializes alien spaceships
var alienArr = [];


// Main canvas function
var main = function(){
  // Clears canvas before drawing.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Parallax background
  ctx.drawImage(background, 0, 0, 1920, 1080, 0, parallax, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, 1920, 1080, 0, parallax-canvas.height, canvas.width, canvas.height);


  // Moves player
  player.update();

  // Check Collision
  shield.forEach(function(item){
    item.update();
  });

  bullet.forEach(function(item,index){
    // Checks if bullet is active, else deletes it.
    if (item.active)
      item.update();
    else
      bullet.splice(index,1);
  });

  // Updates
  updateStars();
  alienArr.forEach(function(alienRow){
    alienRow.forEach(function(alien){
      alien.update();
    });
  });


  // Draws objects

    // Title
  // ctx.drawImage(spriteSheet, 171 , 8, 232, 158, 200, 50, 232, 158);
    // spaceShip
  player.draw();
    // Shield
  shield.forEach(function(item){
    item.draw();
  });
    // projectiles
  bullet.forEach(function(item){
    item.draw();
  });

  // Alien enemies;
  alienArr.forEach(function(alienRow){
    alienRow.forEach(function(alien){
      alien.draw();
    });
  });

}

var updateStars = function(){
  if (parallax  < canvas.height){
    parallax+=2;
  }
  else {
    parallax = 0;
  }
}

// Creates 55 alien spaceships, 5 rows, 11 columns
var createAliens = function(){
  for (var i = 0; i < 5; i++){
    var tempArr = [];
    for (var j = 0; j < 11; j++){
      var alien = new Enemy(75+40*(j+1),40*(i+1),2); // iterates the position of the
      tempArr.push(alien);
    }
    alienArr.push(tempArr);
  }
}
createAliens();


// Runs draw function every x milliseconds, aka FrameRate
setInterval(main,10)
