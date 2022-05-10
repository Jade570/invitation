let people = [];
let peopleNum = 50;
let tg;
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

class Person {
  constructor(direction, startDeg, deg, diameter, radius, xAxis, yAxis, color){
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
    this.color = color;
  }

  render (){
    stroke(this.color);
    strokeWeight(2);
    fill(red(this.color)+10, green(this.color)+10, blue(this.color)+10);

    this.x=this.xAxis+cos(radians(this.i))*this.radius;
    this.y=this.yAxis+sin(radians(this.i))*this.radius;

    circle(
      this.x,
      this.y,
      this.diameter
    );
  };
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  tg = [color(91,206,250), color(245,169,184), color(255,255,255)];
  
  for (let i = 0 ;i<peopleNum; i++){
      people.push(
        new Person(
        direction=getRandomInt(1)===0?true:false,
        startDeg=getRandomInt(360),
        deg = getRandomInt(90),
        diameter=10+getRandomInt(20),
        radius=50+getRandomInt(50),
        xAxis=windowWidth*Math.random(),
        yAxis=windowHeight*Math.random(),
        color=tg[getRandomInt(3)]));
  }
}

function draw() {
  for (let i = 0; i < peopleNum; i++) {
    if (people[i].startDeg<people[i].endDeg){ //시계방향
      people[i].i ++;
    }
    else{ //반시계방향
      people[i].i --;
    }
    if (people[i].i === people[i].endDeg){
      people[i].direction = !people[i].direction;
      people[i].radius = 50+getRandomInt(50)
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

}