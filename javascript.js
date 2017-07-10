// var drawRect = function(px, py, w, h, color){
//   ctx.beginPath();
//   ctx.rect(px, py, w, h);
//   ctx.fillStyle = color;
//   ctx.fill();
//   ctx.closePath();
// }
//
// var drawArc = function(cx,cy,radius,startAngle, endAngle, anticlockwise, color){
//   ctx.beginPath();
//   ctx.arc(cx, cy, radius, startAngle, endAngle, anticlockwise);
//   ctx.fillStyle = color;
//   ctx.fill();
//   ctx.closePath();
// }

function Player(){
  this.px = 300;
  this.py = 400;
  this.w = 50;
  this.h = 50;
  this.playerSpeed = 4;
  this.color = "red";

  this.update = function(){
    // Player Controls
    if (moveLeft && this.px > 0){
      this.px -= this.playerSpeed;
    }
    else if (moveRight && this.px < 640 - this.w){
      this.px += this.playerSpeed;
    }
    if (spaceBtn){
      var newBullet = new Bullet(this.px, this.py, this.w, true);
      bullet.push(newBullet);
    }
  }

  this.draw = function(){
    ctx.beginPath();
    ctx.rect(this.px, this.py, this.w, this.h);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

};

function Bullet(px,py,w,isActive){
  this.w = 5;
  this.h = 15;
  this.bx = px + w/2 - this.w/2;
  this.by = py - this.h;
  this.speed = 2;
  this.color = "blue";
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

    // Checks if the bullet is currently active to draw.
    // if (this.active){
      ctx.beginPath();
      ctx.rect(this.bx, this.by, this.w, this.h);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    // }
  }

};
