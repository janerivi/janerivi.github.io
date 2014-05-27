///////////////////	
// THE GAME CODE //
///////////////////


// variables
var downspeed = 0;
var gravity = 0.2;
var sidespeed = 2;
var points = 0;
var flappyLives=true;	

//game characters (også variabler)
var flappy;
var top;
var top1;
var bottom;
var bottom1;
var pointtext;
var gemeover;

function start(){

	// lager listen over figurer i spillet
	flappy = document.getElementById("flappy");
	gameover = document.getElementById("gameover");
	top = document.getElementById("top");
	bottom = document.getElementById("bottom");
	top1 = document.getElementById("top1");
	bottom1 = document.getElementById("bottom1");
	pointtext = document.getElementById("pointtext");
	pointtext.innerHTML = points + " points";
	
	//starter forAlltid løkken
	loop(forEver);
}
	
function forEver(){

	if(flappyLives){

		// bruk tyngdekraft til  å endre farten på flappy
		downspeed = downspeed + gravity;

		// flytt på flappy med farten
		flappy.style.top = Math.round((flappy.offsetTop + downspeed))+"px";

		// flytt rørene
		top.style.left = (top.offsetLeft - sidespeed)+"px";
		bottom.style.left = top.offsetLeft+"px";

		top1.style.left = (top1.offsetLeft - sidespeed)+"px";
		bottom1.style.left = top1.offsetLeft+"px";

		//sjekk om rørene har gått ut av bildet  til venstre og flytt dem til høyre
		if(top.offsetLeft < -52){
			points = points + 1;
			pointtext.innerHTML = points + " points";
			top.style.left = 480+"px"; 

			top.style.top = Math.round((Math.random()*150 -200))+"px"; 
			bottom.style.top = (top.offsetTop + 360)+"px"; 
		}

		if(top1.offsetLeft < -52){
			points = points + 1;
			poengtekst.innerHTML = points + " points";
			top1.style.left = 480+"px"; 

			top1.style.top = Math.round((Math.random()*150 -200))+"px"; 
			bottom1.style.top = (top1.offsetTop + 360)+"px"; 
		}

		//sjekk kollisjoner eller kræsj med bakken
		if(	isCollisionBetween(flappy,top) || 
			isCollisionBetween(flappy,bottom) ||
			isCollisionBetween(flappy,top1) || 
			isCollisionBetween(flappy,bottom1) ||  
			(flappy.offsetTop > 335)){
			
			gameover.style.display="block";	
			flappyLives = false;
			
		}
	}

	loop(forEver); 
}

function afterMouseClick(){
	console.log("ettermuseklikk fyrt");
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
	downspeed = 0;
	


	// resets the tubes
	top.style.left = "280px";
	bottom.style.left = "280px";
	top1.style.left = "20px";
	bottom1.style.left = "20px";
	top.style.top = Math.round((Math.random()*150 -200))+"px"; 
	bottom.style.top = (topp.offsetTop + 370)+"px";
	top1.style.top = Math.round((Math.random()*150 -200))+"px"; 
	bottom1.style.top = (topp1.offsetTop + 370)+"px";  
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
