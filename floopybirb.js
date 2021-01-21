var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var x = myCanvas.width / 2; //2 variables determine the starting circles location.
var y = myCanvas.height / 2;//2 variables determine the starting circles location.

var dx = 10; //variables will be used later to change the position of the circle.
var dy = 10; //by the change of both of these numbers it will also change the speed of the circle.

// function exeptionsRand();
// param inOrOut [string] {Expects} ["in","out"]: Tells the function weather or not to use out or in for the ifs
// param max [integer] {requires} [max > min] : tells the function when to stop.
// param min [integer] {requires} [min < max] : tells the function when to start.
function exeptionsRand(intOrOut,max,min) {//this function allows you to go between the tubes.
    var inBool = true;//this variable
  while (inBool == true) {
  var randNumber = Math.floor(Math.random()*(max-min))+min;
  if (intOrOut == "in") {
    if (max >= randNumber && randNumber >= min) {//max to min
        inBool = false;
    } else {
    randNumber = Math.floor(Math.random()*(max-min)) + min;
    }
  } else if (intOrOut == "out") {//in or out
    if (min >= randNumber <= max) {
        inBool = false;
    } else {
          randNumber = Math.floor(Math.random()*max)-min;
      }
    }
  }
  return randNumber;
}

var pipx = exeptionsRand("in", myCanvas.width-30, 75); //confused on what this changes. After modifying these numbers, nothing hapen.
var pipy = exeptionsRand("in", myCanvas.height-35,90); //Nothing changes here as well.
var pipBotObj = {width:45,height:450, x:pipx ,y:pipy,gap: 40}; //Sets the bottom pipe's width (always the same) and height (randomly change). Changing the 'gap' value will change how far apart the pipes are.
var pipTopObj = {width:45,height:pipy-(pipBotObj.gap*2), x:pipx,y: 0}; //Does the same as above, but the pipe's height is based on the bottom pipes 'gap' value.

function drawPipes(){ //This function is for making sure the pipess stay in the canvas range and aren't drawn off-screen where they are not needed.
    ctx.beginPath();
    if ((pipTopObj.x +pipTopObj.width) == 0) {
        pipBotObj.x = myCanvas.width; //This will make sure that the top pipe isn't drawn off screen.
        pipTopObj.x = myCanvas.width;
        pipx = exeptionsRand("in", myCanvas.width-30, 75); //confused on what these numbers modify
        pipy = exeptionsRand("in", myCanvas.height-75,46); //Same goes for these.
      pipBotObj.y = pipy;
      pipTopObj.height = pipy-(pipBotObj.gap*2);
    }
    pipBotObj.x = pipBotObj.x - 1;
    pipTopObj.x = pipTopObj.x - 1;
    ctx.rect(pipBotObj.x, pipBotObj.y, pipBotObj.width, pipBotObj.height); //Draws the bottom pipe based on what is calculated above.
    ctx.rect(pipTopObj.x, pipTopObj.y, pipTopObj.width, pipTopObj.height); //Draws the top pipe based on what is calculated above.
  ctx.stroke();
}

var gravity = 0.2; //Sets the gravity for pulling the ball to the ground.
var damping = 0.01; //The rate at which the ball slows down.
var traction = 0.95; //Will make the ball stop.
var ballSize = 20; //Sets the circle's radius.

function drawCircle() {
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI*2); //The circle, on frame one, will always start in the middle, and its size will always the ballSize.
  ctx.fillStyle = "#0095DD"; //Sets the color of the circle to light blue.
  ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  drawCircle();
drawPipes();

  if (x + dx > myCanvas.width - ballSize || x + dx < ballSize) { //If the circle's x position exceeds the width of the canvas..
    dx = -dx * damping; //Then the ball's x direction will be flipped, and it will bounce a specific distance (which is known as damping).
  }

  if (y + dy > myCanvas.height - ballSize || y + dy < ballSize) { //If the circle's y position exceeds the height of the canvas...
     dy = -dy * damping; //Then its y direction will be flipped, and it's speed will decrease.
    //dx *= traction;
   }

  dy += gravity; //Adds the gravity value to the ball's dy value. This giving it a artificial force of gravity.

  //x += dx;  not needed because the ball will never hit the side walls(juat incase it does hit sidewalls, it will prevent it).

  if (((y + dy) + ballSize) <= 300) {
    y += dy;
  }
}

setInterval(draw, 10);

document.addEventListener("keypress", keyPress); //This will look for a key that is pressed.
function keyPress(e) { //Function that will occur when a key is pressed (e is just a placeholder)
    if (e.key == " ") { //When this key is pressed (the empty string represents the spacebar)
      //if (dx > 0) {
      //  dx+=5;
      //}
      //if (dx < 0) {
      //  dx-=5;
      //}
      dy-=5; //Will make the ball jump a distance of 5.
    }
}
function collisionDetect() {
  if (x >= pipBotObj.x && y >= pipBotObj.y) { //this is finding if the ball has overlapped with the coordinates of the pipes.
    console.log("Game Over!");                //It then starts printing 'Game Over!' to the console 200 times per second.
  }                                           //It only stops printing once the ball enters where the gap for the next pipe will be.
  if (x >= pipTopObj.y && y >= pipTopObj.y) { //The pipes dont even have to be on the canvas, and the ball doesn't even have to be near the pipe's gap.
    console.log("Game Over!")
  }
}

setInterval(collisionDetect, 10);// setInterval collects the collison
