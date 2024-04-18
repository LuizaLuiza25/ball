console.log("Hello there, stranger!");

var canvas = document.getElementById("canvas");
var  c = canvas.getContext("2d"); // HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported, or the canvas has already been set to a different context mode. Sintaxa: .getContext(type, context attributes)

var tx = window.innerWidth; //returns the interior width of the window in pixels (that is, the width of the window's layout viewport). That includes the width of the vertical scroll bar, if one is present.

 var ty = window.innerHeight; // same, only for height.

 canvas.width = tx;
 canvas.height = ty;

 var mousex = 0; // track the current horizontal coordinate of the mouse.
 var mousey = 0; // the current vertical coordinate of the mouse.


 addEventListener("mousemove", function () {

    mousex = event.clientX; // The clientX read-only property of the MouseEvent interface provides the horizontal coordinate within the application's viewport at which the event occurred (as opposed to the coordinate within the page). For example, clicking on the left edge of the viewport will always result in a mouse event with a clientX value of 0, regardless of whether the page is scrolled horizontally.
    mousey = event.clientY;

 });

 var grav = 0.99;
 c.strokeWidth = 5; // The stroke-width attribute is a presentation attribute defining the width of the stroke to be applied to the shape.

 function randomColor () {

    return (
        "rgba(" + Math.round(Math.random()* 250) +
         
        "," +

        Math.round(Math.random() * 250) +

        "," +

        Math.round(Math.random() * 250) +

        "," +

        Math.ceil(Math.random() * 10) /10 +

        ")"
);
}

// Math.ceil => The Math.ceil() static method always rounds up and returns the smallest integer greater than or equal to a given number.
// same as Math.floor?

function Ball (){

    this.color = randomColor(); // where is the piece of code supposed to run? Most of the time, used in object methods => this = the object that the method is attached to => the same method can be reused on different objects!

    this.radius = Math.random() * 20 + 14;
    this.startRadius  = this.radius;
    this.x = Math.random() * (tx - this.radius * 2 ) + this.radius;
    this.y = Math.random() * (ty -this.radius);
    this.dy = Math.random() * 2;  // the dy attribute = indicates a shift  along the y-axis on the position of an element or its content
    this.dx = Math.round( (Math.random() - 0.5) * 10);  
    this.vel = Math.random() / 5;
    this.update =  function () {

        c.beginPath(); // a method used to start a new path by emptying the list of sub-paths. Call this method when we want to create a new path. Must be called before each line
        c.arc (this.x, this.y, this.radius, 0, 2 * Math.PI); // .arc is also a method => adds a curve to the path, an arc. IT CREATES A CIRCLE OR A PART OF A CIRCLE
        c.fillStyle = this.color;
        c.fill(); // METHOD => fill current path
    };
}


var bal = [];

for( var i = 0; i< 50; i++){

    bal.push(new Ball());
}

function animate(){

if(tx != window.innerWidth || ty != window.innerHeight) { // || => daca chiar si o singura valoare e adevarata, totul e adevarat
tx = window.innerWidth;
ty = window.innerHeight;
canvas.width =  tx;
canvas.height = ty;

}


requestAnimationFrame (animate); // this is a method => you tell the browser you want to perform an animation

c.clearRect(0,0,tx,ty); // a method to erase pixels in a rectangular area by setting them to transparent black. Always use  beginPath() before!!!!
for( var i = 0; i < bal.length; i++ ){
bal[i].update();
bal[i].y += bal[i].dy;
bal[i].x += bal[i].dx;
if (bal[i].y + bal[i].radius >= ty) {
  bal[i].dy = -bal[i].dy * grav; // grav => accelerationIncludingGravity property = the amount od acceleration recorded by the device/ provides info about acceleration on three axis. The value = raw data measured by an accelorometer. Useful for devices that do not have a gyroscope
} 
else {
  bal[i].dy += bal[i].vel;
}

if(bal[i].x + bal[i].readius > tx ||  bal[i].x  - bal[i].radius < 0){
bal[i].dx  =- bal[i].dx;

}

if( mousex > bal[i].x - 20 && // && = The logical AND (&&) (logical conjunction) operator for a set of boolean operands will be true if and only if all the operands are true. Otherwise it will be false.
mousex < bal[i].x + 20 &&
mousey > bal[i].y - 50 &&
mousey < bal[i].y + 50 &&
bal[i].radius < 70) {
bal[i].radius += 5;
}

else {
if(bal[i].radius > bal[i].startradius){
bal[i].radius += -5;

}

}

}
}
animate();
 setInterval(function(){
  bal.push(new Ball());
  bal.splice(0,1);
 }, 400
);



/*

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startradius = this.radius;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() /5;
  this.update = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
    //c.stroke();
  };
}

var bal = [];
for (var i=0; i<50; i++){
    bal.push(new Ball());
}

function animate() {    
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, tx, ty);
  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].y += bal[i].dy;
    bal[i].x += bal[i].dx;
    if (bal[i].y + bal[i].radius >= ty) {
      bal[i].dy = -bal[i].dy * grav;
    } else {
      bal[i].dy += bal[i].vel;
    }    
    if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
        bal[i].dx = -bal[i].dx;
    }
    if(mousex > bal[i].x - 20 && 
      mousex < bal[i].x + 20 &&
      mousey > bal[i].y -50 &&
      mousey < bal[i].y +50 &&
      bal[i].radius < 70){
        //bal[i].x += +1;
        bal[i].radius +=5; 
      } 
      else {
        if(bal[i].radius > bal[i].startradius){
          bal[i].radius += -5;
        }
      }
      
    //forloop end
    }
//animation end
}

animate();

setInterval(function() {
  bal.push(new Ball());
  bal.splice(0, 1);
}, 400);


*/