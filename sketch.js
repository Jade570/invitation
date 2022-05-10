let people = [];
let peopleNum = 1;
let tg;
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

class Person {
  constructor(startDeg, endDeg, diameter, radius, xAxis, yAxis, color){
    this.diameter=diameter;
    this.radius = radius;
    this.startDeg = startDeg;
    this.endDeg = endDeg;
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
        startDeg=90, 
        endDeg = 0,
        diameter=10,
        radius=50,
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

      people[i].i = people[i].startDeg;
      people[i].startDeg = people[i].endDeg+180;
      people[i].endDeg =  people[i].startDeg+getRandomInt(90)
      people[i].xAxis = people[i].x-people[i].radius*cos(radians(people[i].i))
      people[i].yAxis = people[i].y-people[i].radius*sin(radians(people[i].i))
      console.log("시작각:", people[i].startDeg, "끝각: ", people[i].endDeg);
    }
    people[i].x=this.xAxis-cos(radians(this.i))*this.radius;
    people[i].y=this.yAxis-sin(radians(this.i))*this.radius; 
    people[i].render();
  }

}