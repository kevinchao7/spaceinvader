// Player Class
function Player(){
  // Player Attributes
  this.px = 300;
  this.py = 425;
  this.w = 30;
  this.h = 22;
  this.sx = 275;
  this.sy = 225;
  this.sWidth = 30;
  this.sHeight = 22;
  this.playerSpeed = 1;
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
    ctx.drawImage(spriteSheet, this.sx, this.sy, this.sWidth, this.sHeight, this.px, this.py, this.w, this.h);
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
    if (this.by > 0){
      this.by -= this.speed;
      this.checkCollision();
    }

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

  this.checkCollision = function(){
    // Stores this bullet pointer in variable that
    var that = this;

    // Check Shield collision
    shield.forEach(function(item){
      if (that.bx >= item.px && that.bx <= item.px+item.w && that.by >= item.py && that.by <= item.py+item.h){
        console.log('Shield Collision Detected...');
        that.active = false;
        return false;
      }
    });

    // Check Enemy Collision
    alienArr.forEach(function(alienRow){
      alienRow.forEach(function(item){
        if (that.bx+that.w >= item.px && that.bx <= item.px+item.w && that.by >= item.py && that.by <= item.py+item.h){
          console.log('Alien Collision Detected...');
          that.active = false;
          return false;
        }
      });
    });

  }

};

// Shield Class
function Shield(px,py){

  // Shield Attributes
  this.sx = 314;
  this.sy = 212;
  this.sWidth = 48;
  this.sHeight = 34;
  this.w = this.sWidth;
  this.h = this.sHeight;
  this.px = px;
  this.py = py;
  this.hp = 5;
  this.active = true;

  this.update = function(){
  }

  this.draw = function(){
    ctx.drawImage(spriteSheet, this.sx, this.sy, this.sWidth, this.sHeight, this.px, this.py, this.w, this.h);
  }
}

// Alienship class
function Enemy(px,py,type){
  this.px = px;
  this.py = py;
  this.enemyType = 0; // 0 - regular, 1 - special
  this.offset = 32;
  this.sx;
  this.sy;
  this.sWidth;
  this.sHeight;
  this.w;
  this.h;
  this.hp;
  this.active = true;
  this.swapImg = false;
  this.count = 0; // image swap counter
  this.swapCount = 100; // How many frames to swap images
  this.moveCounter = 0;
  this.moveBack = false;


  // function to set the type
  this.setType = function(type){
    switch(type){
      case 0:
      // default
      break;
      case 1:
      // special alien
      break;
      case 2: // special special alien
      this.sx = 7;
      this.sy = 225;
      this.sWidth = 18;
      this.sHeight = 15;
      break;
    }
    this.w = this.sWidth;
    this.h = this.sHeight;
  }

  this.setType(type); // initializes type of alien

  this.swapImage = function(){ // Swaps image back and forth
    if (this.count < this.swapCount){
      this.count++;
    }
    else {
      this.count = 0;
      if(!this.swapImg){
        this.sx += this.offset
        this.swapImg = true;
      }
      else{
        this.sx -= this.offset
        this.swapImg = false;
      }
    }
  }

  this.Move = function(){
    if (this.moveCounter >= 200 && !this.moveBack){
      // console.log("move right");
      this.px+= 25;
      this.moveCounter = 0;
      this.moveBack = true;
    }
    else if (this.moveCounter >= 200 && this.moveBack){
      // console.log("move left");
      this.px -= 25;
      this.moveCounter = 0;
      this.moveBack = false;
    }
    else if (this.moveCounter < 200){
      this.moveCounter++;
    }
  }

  this.update = function(){
    this.swapImage(); // Swaps image for motion animation
    this.Move(); // Moves ships
  }



  this.draw = function(){
    ctx.beginPath();
    ctx.rect(this.px, this.py, this.w, this.h);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    // ctx.drawImage(spriteSheet, this.sx, this.sy, this.sWidth, this.sHeight, this.px, this.py, this.w, this.h);
  }
}
