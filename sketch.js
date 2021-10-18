//Main idea: Smoke puffs whose size/behavior depends on chosen maqam 
//Code pretends user is smoking shisha in a shisha cafe, will ask what their mood is
//User will choose their mood (happy, sad, proud, mystical, etc...)
//For each mood option, there is a corresponding maqam that will play that evokes that mood (sample playback)
//If user doesn't feel any of the mood options, generic exhale (synthesized noise sound will play)
//Maqams evoke different moods/emotions 
//Visual: smoke puff's size/behavior depends on the mood they chose (e.g. proud will correspond to a giant smoke puff)
//When mood is selected, size of ellipse will change depending on choice
//Overall goal of the code: To evoke the shisha experience and also give the user a chance to learn more about Arabic maqam (as they are the alphabet of traditional Arabic music) - sort of like a small packaged cultural experience



//displaying moving smoke particles on the screen using Particle class 
//Clicking on the screen and pressing on mouse - smoke puff will come out 
//To stop smoke particles/smoke puff, release the mouse
//When smoke particles/smoke puff is stopped, short fade effect, like how exhaled smoke fades for a while after you breathe it out


let particleCount = 20;
let particles = [];
let smokePuff = false; //default setting for smokePuff

let smoke = []; //array for smoke particles


let moodSelect; //use this variable for selecting the mood later
//moodSelect will change the size of the ellipse

let ellipseSizeX; //variable to hold ellipseSizeX - this will change according to mood/maqam chosen 

let ellipseSizeY; //variable to hold ellipseSizeY - this will change according to mood/maqam chosen 

let ellipseColor; //variable to hold smoke colour - this will change accoridng to mood/maqam chosen

let audio;

var osc;
 
let val; 

function preload() {
  //load maqam samples here
  soundFormats('ogg');
  rastMaqamSample = loadSound("rastMaqamSample.ogg");
  sabaMaqamSample = loadSound("sabaMaqamSample.ogg");
  nawaAtharMaqamSample = loadSound("nawaAtharMaqamSample.ogg");
}

function setup() {
  cnvs = createCanvas(windowWidth, windowHeight);
  
 cnvs.mousePressed(canvasPressed);
  //we need a drop-down select menu where user will choose their mood
  
  moodSelect = createSelect();
  moodSelect.position(20, 20);
  
  moodSelect.option('Happy/Proud');
  moodSelect.option('Sad/Longing');
  moodSelect.option('Brooding/mystical');
  
  moodSelect.changed(changeEllipseSize);
  
  //set a default option
  
  moodSelect.selected('Happy/Proud');
  ellipseColor = color(168, 49, 97,34);
  audio = rastMaqamSample;
  ellipseSizeX = 150;
  ellipseSizeY = 150;
  
  console.log(moodSelect.value());
  
  //let's have a drone that plays in the background
  osc = new p5.TriOsc(); // set frequency and type
  osc.freq(40); 
  osc.amp(.5);
  osc.start(); 

   
}

function draw() {
  background(0);
  for (let particle of smoke) {
    particle.show();
    particle.update();
  }
  
  if (smokePuff) { //if smokePuffs are triggered
    for (let i = 0; i < 70; i++) {
      
      //position will depend on where the mouse is 
      let x = mouseX;
      let y = mouseY;
      smoke.push(new Particle(x, y));
    }
  }
}

//if user presses mouse, smoke will come out and audio will play

function canvasPressed() { 
    audio.play();
    smokePuff = true;
}

function mouseReleased()
{
  audio.pause();
  smokePuff = false;
}

function changeEllipseSize(){
  //we need to get the value/mood that the user selected using .value
 	let val = moodSelect.value();
  
  audio.stop(); 
    //need to stop previous audio so there's no overlap
  if(val == 'Happy/Proud'){
    //Rast maqam 
    ellipseSizeX = 170;
    ellipseSizeY = 170;
  
    audio = rastMaqamSample;
    ellipseColor = color(168, 49, 97,34);
  } else if(val == 'Sad/Longing'){
   	//Saba maqam
    ellipseSizeX = 100;
    ellipseSizeY = 100;
    ellipseColor = color(152, 191, 163,45);
   
    audio = sabaMaqamSample;
  } else if(val == 'Brooding/mystical'){
   //Nawa Athar maqam
    ellipseSizeX = 40;
    ellipseSizeY = 40;
    ellipseColor = color(153, 120, 202,55);
  
    audio = nawaAtharMaqamSample;
  }
  
}


//PARTICLE CLASS FOR SMOKE PUFF

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.offScreen = false;
  }

  show() { //draw the smoke particles using the ellipse shape

    noStroke();
    fill(ellipseColor);
    ellipse(this.x, this.y,(random(ellipseSizeX/1.5,ellipseSizeX)), (random(ellipseSizeY/1.5,ellipseSizeY))); 
    //size of ellipse will change depending on mood/maqam chosen
  }

  update() { //to change position of the smoke particles 
    this.y -= random(10, 300); //how low on the screen will the smoke be
    this.x += random(1, 150); 
    //how high on the screen the smoke will be
    //second argument = higher value more to the right
      //both arguments same number but - and + smoke will be all over the screen
    if (this.y < windowHeight) {
      this.offScreen = true;
    }
  }
}