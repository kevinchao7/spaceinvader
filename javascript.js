// Player Class
function Player(){
  // Player Attributes
  this.px = 300;
  this.py = 400;
  this.w = 30;
  this.h = 22;
  this.sx = 275;
  this.sy = 225;
  this.sWidth = 30;
  this.sHeight = 22;
  this.image = new Image();
  this.image.src = 'assets/spritesheet.png';
  this.playerSpeed = 3;
  this.color = "red";

  this.update = function(){

    // Player movement controls
    if (moveLeft && this.px > 0){
      this.px -= this.playerSpeed;
    }
    else if (moveRight && this.px < 640 - this.w){
      this.px += this.playerSpeed;
    }

    // Creates new bullet and pushes into the bullet array if space btn is pressed.
    if (spaceBtn){
      var newBullet = new Bullet(this.px, this.py, this.w, true);
      bullet.push(newBullet);
      spaceBtn = false;
    }

  }

  this.draw = function(){
    ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.px, this.py, this.w, this.h);
  }

};


// Projectile Class
function Bullet(px,py,w,isActive){

  // Bullet attributes
  this.w = 5;
  this.h = 15;
  this.bx = px + w/2 - this.w/2;
  this.by = py - this.h/2;
  this.speed = 6;
  this.color = "red";
  this.active = isActive;

  this.update = function(){

    // Moves bullet
    if (this.by > 0)
      this.by -= this.speed;

    // Sets to false if out of range.
    else {
      this.active = false;
    }
  }

  this.draw = function(){
      ctx.beginPath();
      ctx.rect(this.bx, this.by, this.w, this.h);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

  this.checkCollsion = function(){

  }

};

// Shield Class
function Shield(px,py){

  // Shield Attributes
  this.w = 48;
  this.h = 34;
  this.sx = 314;
  this.sy = 212;
  this.sWidth = 48;
  this.sHeight = 34;
  this.px = px;
  this.py = py;
  this.hp = 5;
  this.active = true;
  this.image = new Image();
  this.image.src = 'assets/spritesheet.png';

  this.update = function(){

  }

  this.draw = function(){
    ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.px, this.py, this.w, this.h);
  }
}

// Alienship class
