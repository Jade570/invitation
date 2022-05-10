let people = [];
let peopleNum = 2;
let tg;
let start = false;
let mp = false;
let change = false;
let i = 1;
let rain=[];
let raining= false;
let sound1, sound2, sound3;
let playS3 = false;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

class Person {
  constructor(direction, startDeg, deg, diameter, radius, xAxis, yAxis, c){
    this.diameter=diameter;
    this.radius = radius;
    this.direction = direction;
    this.startDeg = startDeg;
    this.endDeg = direction ? startDeg+deg : startDeg-deg;
    this.xAxis= xAxis;
    this.yAxis= yAxis;

    this.i = startDeg;
    this.preI = startDeg;
    this.x=this.xAxis+cos(radians(this.i))*this.radius;
    this.y=this.yAxis+sin(radians(this.i))*this.radius;
    this.c = c;
  }

  render (){
    stroke(this.c);
    strokeWeight(2);
    fill(this.c);
    this.x=this.xAxis+cos(radians(this.i))*this.radius;
    this.y=this.yAxis+sin(radians(this.i))*this.radius;

    circle(
      this.x,
      this.y,
      this.diameter
    );
  };
};


function preload(){
  soundFormats('wav');
  sound1 = loadSound('assets/1.wav');
  sound2 = loadSound('assets/2.wav');
  sound3 = loadSound('assets/33.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  tg = [color(91,206,250), color(245,169,184), color(255,255,255)];
  people.push(
    new Person(
      (direction = getRandomInt(1) === 0 ? true : false),
      (startDeg = getRandomInt(360)),
      (deg = getRandomInt(90)),
      (diameter = 10 + getRandomInt(20)),
      (radius = 30 + getRandomInt(100)),
      (xAxis = windowWidth / 2),
      (yAxis = windowHeight / 2),
      (c = tg[0])
    )
  );
    people.push(
      new Person(
      direction=getRandomInt(1)===0?true:false,
      startDeg=getRandomInt(360),
      deg = getRandomInt(90),
      diameter=10+getRandomInt(20),
      radius=30+getRandomInt(100),
      xAxis=windowWidth/2,
      yAxis=windowHeight/2,
      c=tg[1]));

      for(let i=0; i<180; i++){
        rain[i]=new Rain();
      }	
      
}

function draw() {
  if (start){
    if (playS3) sound3.play();
    for (let i = 0; i < people.length; i++) {
      if (people[i].startDeg<people[i].endDeg){ //시계방향
        people[i].i ++;
      }
      else{ //반시계방향
        people[i].i --;
      }
      if (people[i].i === people[i].endDeg){
        people[i].direction = !people[i].direction;
        people[i].radius = 30+getRandomInt(150)
        people[i].startDeg = (people[i].endDeg+180)%360;
        people[i].i = people[i].startDeg;
        people[i].endDeg =  people[i].direction ? people[i].startDeg+45+getRandomInt(270) :people[i].startDeg-45-getRandomInt(270); 
        people[i].xAxis = people[i].x-people[i].radius*cos(radians(people[i].i))
        people[i].yAxis = people[i].y-people[i].radius*sin(radians(people[i].i))
        
      }
      people[i].x=this.xAxis-cos(radians(this.i))*this.radius;
      people[i].y=this.yAxis-sin(radians(this.i))*this.radius; 
      people[i].render();
    }
    if (mp){
     
      if(i<255 && !change){
        background(i*1.1,i*1.05,i,i);
        i*=1.007;
      } 
      else{
        change=true;
        if (i>200 && !raining){
          background(i);
          i-=0.2;
        }
        else{
          playS3 = true;
          background(200)
          raining= true;
          people = [];
          for(let i=0; i<180; i++){
            rain[i].show();
            rain[i].update();
            }
          if(sound3.isPlaying()){
            playS3 = false;
          }            
        }      
      }  
    }
  } 
}

function mousePressed(){
  if (!start){
    start = true;
    sound1.play();
  }
  else{
    if (!mp && start){
      sound2.play();
      sound1.stop();
      peopleNum = 200;
      for (let i = 0 ; i < peopleNum-2; i++){
        people.push(
        new Person(
          direction=getRandomInt(1)===0?true:false,
          startDeg=getRandomInt(360),
          deg = getRandomInt(90),
          diameter=10+getRandomInt(20),
          radius=30+getRandomInt(100),
          xAxis=windowWidth*Math.random(),
          yAxis=windowHeight*Math.random(),
          c=tg[getRandomInt(3)]));
      }
      mp =true;
    }
  }
}


function Rain(){
  this.x=random(0,width);
  this.y=random(0,-400);
  this.z=random(2,5);
  this.r=random(30,80);
  this.speedY=random(6,8);
  this.R=random(17,64);
	this.G=random(100,188,70);
	this.B=random(126,216,70);
	this.A=random(254,255,70);

  this.show=function(){
    noStroke();		
		fill(255,255,255,10);
    rect(this.x,this.y,this.z,this.r);
  }
  
	this.update=function(){
    this.y+=this.speedY;
    
    if(this.y>height){
    this.y=random(0,-400);
		}
	}
}