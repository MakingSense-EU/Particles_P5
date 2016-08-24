var particles = [];
var limit = 10;
var imgs = [];

var gif;

function preload() {
  
  var path = 'assets/';
  imgs.push( loadGif(path + '1.gif'));
  imgs.push( loadGif(path + '2.gif'));
  imgs.push( loadGif(path + '3.gif'));
  imgs.push( loadGif(path + '4.gif'));
  imgs.push( loadGif(path + '5.gif'));
  imgs.push( loadGif(path + '6.gif'));
  imgs.push( loadGif(path + '7.gif'));
  imgs.push( loadGif(path + '8.gif'));
  imgs.push( loadGif(path + '9.gif'));
  imgs.push( loadGif(path + '10.gif'));
  
}

var cnv;

function centerCanvas() {
    cnv = createCanvas(windowWidth, windowHeight);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  centerCanvas();
  for (var i = 0; i < limit; i++){
    var imgLoc = (floor(random(1,imgs.length)) - 1);
    particles.push(new Particle(random(50,width-50), random(50, height-50), imgLoc));
  }
  
}

function draw() {
  background('#39424C');
  
  for (var i = 0; i < limit; i++){
    particles[i].separate(particles)
    particles[i].update();
    particles[i].display();
  }
 
  
}