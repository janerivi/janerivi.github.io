///////////////////	
// THE GAME CODE //
///////////////////

// variables
var downspeed = 0;
var gravity = 0.2;
var topDistance = 50; // the distance that flappy will be positioned from the top
var tubePos = 280;
var tubePos1 = 20;
var sidespeed = 2;
var points = 0;
var flappyLives=true;	

//game characters (variables too)
var topTube;
var topTube1;
var bottomTube;
var bottomTube1;
var pointtext;
var gemeover;

function start(){

	// gets the elements from the document using their id
	flappy = document.getElementById("flappy");
	gameover = document.getElementById("gameover");
	topTube = document.getElementById("top");
	bottomTube = document.getElementById("bottom");
	topTube1 = document.getElementById("top1");
	bottomTube1 = document.getElementById("bottom1");
	pointtext = document.getElementById("pointtext");
	pointtext.innerHTML = points + " points";
	
	//starts the forever loop
	loop(forEver);
}
	
function forEver(){

	if(flappyLives){

		// uses gravity to change the downward speed
		downspeed = downspeed + gravity;
		topDistance = topDistance + downspeed;
		
		// moves flappy to the new calculated position
		flappy.style.top = Math.round(topDistance)+"px";
		// This does not work on firefox: flappy.style.top = Math.round((flappy.offsetTop + downspeed))+"px";
		

		// moves the tubes
		tubePos = tubePos-sidespeed;
		topTube.style.left = tubePos+"px";
		bottomTube.style.left = tubePos+"px";

		tubePos1 = tubePos1-sidespeed;
		topTube1.style.left = tubePos1+"px";
		bottomTube1.style.left = tubePos1+"px";


		//sjekk om rørene har gått ut av bildet  til venstre og flytt dem til høyre
		if(tubePos < -52){
			points = points + 1;
			pointtext.innerHTML = points + " points";
			tubePos = 480;
			topTube.style.left = tubePos+"px"; 

			topTube.style.top = Math.round((Math.random()*150 -200))+"px"; 
			bottomTube.style.top = (topTube.offsetTop + 360)+"px"; 
		}

		if(tubePos1 < -52){
			points = points + 1;
			pointtext.innerHTML = points + " points";
			tubePos1 = 480;
			topTube1.style.left = tubePos1+"px"; 

			topTube1.style.top = Math.round((Math.random()*150 -200))+"px"; 
			bottomTube1.style.top = (topTube1.offsetTop + 360)+"px"; 
		}

		//sjekk kollisjoner eller kræsj med bakken
		if(	isCollisionBetween(flappy,topTube) || 
			isCollisionBetween(flappy,bottomTube) ||
			isCollisionBetween(flappy,topTube1) || 
			isCollisionBetween(flappy,bottomTube1) ||  
			(flappy.offsetTop > 335)){
			
			gameover.style.display="block";	
			flappyLives = false;
			
		}
	}

	loop(forEver); 
}

function afterMouseClick(){

	if(flappyLives){
		downspeed = -4; // når du har minus på nedoverfart blir det oppoverfart
	} else {
		restart(); // om du klikker
	}
}

function restart(){
	//resets the points
	points=0;
	pointtext.innerHTML = points + " points";

	// resets flappy
	flappy.style.top = "50px";
	topDistance = 50;
	downspeed = 0;
	
	// resets the tubes
	tubePos = 280;
	tubePos1 = 20;
	topTube.style.left = tubePos+"px";
	bottomTube.style.left = tubePos+"px";
	topTube1.style.left = tubePos1+"px";
	bottomTube1.style.left = tubePos1+"px";
	topTube.style.top = Math.round((Math.random()*150 -200))+"px"; 
	bottomTube.style.top = (topTube.offsetTop + 370)+"px";
	topTube1.style.top = Math.round((Math.random()*150 -200))+"px"; 
	bottomTube1.style.top = (topTube1.offsetTop + 370)+"px";  
	gameover.style.display="none";

	// makes flappy alive again
	flappyLives = true;
}

// checks if there is a collision betwen element A and B. 
function isCollisionBetween(elementA, elementB){
	if(elementA.offsetLeft> (elementB.offsetLeft+elementB.width)){
		return false; // A is completeley to the right of B
	} else if(elementB.offsetLeft> (elementA.offsetLeft+elementA.width)){
		return false; // B is completeley to the right of A
	} else if(elementA.offsetTop > (elementB.offsetTop+elementB.height)){
		return false; // A is completely below B
	} else if(elementB.offsetTop > (elementA.offsetTop+elementA.height)){
		return false; // B is completely below A
	} else {
		return true;
	}
}
