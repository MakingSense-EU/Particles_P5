var particles = [];
var limit = 20;
var imgs = [];

function preload() {
  
  // //circles
  imgs.push( loadImage('assets/cB.png'));
  imgs.push( loadImage('assets/cG.png'));
  imgs.push( loadImage('assets/cO.png'));
  
  //diamonds
  imgs.push( loadImage('assets/dB.png'));
  imgs.push( loadImage('assets/dG.png'));
  imgs.push( loadImage('assets/dO.png'));
  
  //moon -- not squares
  // imgs.push( loadImage('assets/mB.png'));
  // imgs.push( loadImage('assets/mG.png'));
  // imgs.push( loadImage('assets/mO.png'));
  
  //squiggle
  // imgs.push( loadImage('assets/sB.png'));
  // imgs.push( loadImage('assets/sG.png'));
  // imgs.push( loadImage('assets/sO.png'));
  
  //triangle
  imgs.push( loadImage('assets/tB.png'));
  imgs.push( loadImage('assets/tG.png'));
  imgs.push( loadImage('assets/tO.png'));
  
  //cross
  imgs.push( loadImage('assets/xB.png'));
  imgs.push( loadImage('assets/xG.png'));
  imgs.push( loadImage('assets/xO.png'));
  
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
  // image(imgs[1], 0, 0, 15, 15);

  background('#39424C');
  
  for (var i = 0; i < limit; i++){
    particles[i].separate(particles)
    particles[i].update();
    particles[i].display();
  }
  
}