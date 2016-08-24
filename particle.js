
function Particle(x,y, imgLoc){
  this.pos = createVector(x, y);
  this.vel = createVector(random(-2,2),random(-2,2));
  this.acc = createVector(0,-3);
  this.size = 20;
  this.maxSpeed = .4;
  this.maxForce = 1;
  this.theta = 0.0;
  this.img = imgLoc;
  this.gifShow = false;
  this.paused = true; // set to true
  this.frozen = true;
  this.itvl = floor(random(400,400));

  
  this.spawn = function(){
    if( (imgs[this.img].frame([]) > 100) || (imgs[this.img].frame([]) < 5) ){
      if (this.gifShow == true) {
        //print('finished showing');
        this.paused = true;
      }
      this.gifShow = false; // hidden
    } else {
      this.gifShow = true; // showing
    }
    
    
    if (this.frozen) {
      if( (frameCount % this.itvl) == 0){
        //print('thaw');
        imgs[this.img].play();
        this.frozen = false;
      }
    }
  };
  
  this.update = function(){
    //deadFIX
    this.spawn();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0,0);
    this.border();
  }
  
  this.display = function(){
    var theta = this.vel.heading() + radians(90);
    this.theta += (this.vel.x * this.vel.mag()) / 20;
    var r = 4;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.theta);
    
    if (this.paused) { //paused
      //print('paused');
      //print('frozen');
      this.paused = false;
      this.frozen = true;
      imgs[this.img].pause();
    }
    if (imgs[this.img].loaded()){
      image(imgs[this.img], this.size/-2, this.size/-2, this.size, this.size);
    }
    pop();
  }
  
  this.border = function(){
    if (this.pos.x < -this.size) this.pos.x = width+this.size;
    if (this.pos.y < -this.size) this.pos.y = height+this.size;
    if (this.pos.x > width+this.size) this.pos.x = -this.size;
    if (this.pos.y > height+this.size) this.pos.y = -this.size;
  }
  
  this.separate = function(vehicles) {
    var desiredseparation = this.size*1.1;
    var sum = createVector();
    var count = 0;
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.pos, vehicles[i].pos);
      if ((d > 0) && (d < desiredseparation)) {
        var diff = p5.Vector.sub(this.pos, vehicles[i].pos);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed * 10);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
}