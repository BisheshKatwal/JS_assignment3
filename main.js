//Setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

//Function to generate random number

function random(min,max){
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

function Shape(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists= exists;

}
function Ball(x, y, velX, velY, color, size){
  Shape.call(this,x,y,velX,velY,exists);
  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function () {
    if((this.x + this.size) >= width){
        this.velX = -(this.velX);
    }

    if((this.x - this.size) <= 0){
        this.velX = -(this.velX);
    }

    if((this.y + this.size) >= height){
        this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0){
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

var balls = [];

function loop() {
    ctx.fillstyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);

    while (balls.length < 25){
        var ball = new Ball(
            random(0, width),
            random(0,height),
            random(-7,7),
            random(-7,7),
            true,
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
            random(10,20)
        );
    balls.push(ball);
    }

    for(var i = 0; i < balls.length; i++){
        balls[i].draw();
        balls[i].update();
    }

    requestAnimationFrame(loop);
}

loop();
