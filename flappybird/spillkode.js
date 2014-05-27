////////////////	
// SPILLKODEN //
////////////////

// variabler
var nedoverfart = 0;
var tyngdekraft = 0.2;
var toppAvstand = 50; // avstanden flappy er fra toppen positioned from the top
var roerPos = 280;
var roerPos1 = 20;
var sidefart = 2;
var poeng = 0;
var flappyLever=true;	

// spillfigurer, gameover-bilde og poengtekst
var toppRoer;
var toppRoer1;
var bunnRoer;
var bunnRoer1;
var poengtekst;
var gemeover;

function start(){

	// henter elementene den finner i dokumentet via id og putter dem i variablene vi har laget
	flappy = document.getElementById("flappy");
	gameover = document.getElementById("gameover");
	toppRoer = document.getElementById("topp");
	bunnRoer = document.getElementById("bunn");
	toppRoer1 = document.getElementById("topp1");
	bunnRoer1 = document.getElementById("bunn1");
	poengtekst = document.getElementById("poengtekst");
	poengtekst.innerHTML = poeng + " poeng";
	
	//starter "For Alltid"- løkka
	loop(forAlltid);
}
	
function forAlltid(){

	if(flappyLever){

		// bruker tyngdekraften for å forandre nedoverfarten
		nedoverfart = nedoverfart + tyngdekraft;
		
		//bruker nedoverfarten for å forandre avstanden fra toppen
		toppAvstand = toppAvstand + nedoverfart;
		
		// flytter flappy til ny posisjon (topp avstand)
		flappy.style.top = Math.round(toppAvstand)+"px";

		

		// flytter rørene
		roerPos = roerPos-sidefart;
		toppRoer.style.left = roerPos+"px";
		bunnRoer.style.left = roerPos+"px";

		roerPos1 = roerPos1-sidefart;
		toppRoer1.style.left = roerPos1+"px";
		bunnRoer1.style.left = roerPos1+"px";


		//sjekk om rørene har gått ut av bildet til venstre. 
		// Hvis de er det får man poeng og man flytter rørene helt til høyre utenfor bildet
		if(roerPos < -52){
			poeng = poeng + 1;
			poengtekst.innerHTML = poeng + " poeng";
			roerPos = 480;
			toppRoer.style.left = roerPos+"px"; 

			toppRoer.style.top = Math.round((Math.random()*150 -200))+"px"; 
			bunnRoer.style.top = (toppRoer.offsetTop + 360)+"px"; 
		}

		if(roerPos1 < -52){
			poeng = poeng + 1;
			poengtekst.innerHTML = poeng + " poeng";
			roerPos1 = 480;
			toppRoer1.style.left = roerPos1+"px"; 

			toppRoer1.style.top = Math.round((Math.random()*150 -200))+"px"; 
			bunnRoer1.style.top = (toppRoer1.offsetTop + 360)+"px"; 
		}

		//sjekk kollisjoner eller kræsj med bakken
		if(	erKollisjonMellom(flappy,toppRoer) 	|| 
		   	erKollisjonMellom(flappy,bunnRoer) 	|| 
		   	erKollisjonMellom(flappy,toppRoer1) || 
		   	erKollisjonMellom(flappy,bunnRoer1) ||  
			(flappy.offsetTop > 335)){
			
			gameover.style.display="block";	
			flappyLever = false;
			
		}
	}

	loop(forAlltid); 
}

function etterMuseklikk(){

	if(flappyLever){
		nedoverfart = -4; // når du har minus på nedoverfart blir det oppoverfart
	} else {
		restart(); // om du klikker
	}
}

function restart(){
	//resets the poeng
	poeng=0;
	poengtekst.innerHTML = poeng + " poeng";

	// resets flappy
	flappy.style.top = "50px";
	toppAvstand = 50;
	nedoverfart = 0;
	
	// resets the tubes
	roerPos = 280;
	roerPos1 = 20;
	toppRoer.style.left = roerPos+"px";
	bunnRoer.style.left = roerPos+"px";
	toppRoer1.style.left = roerPos1+"px";
	bunnRoer1.style.left = roerPos1+"px";
	toppRoer.style.top = Math.round((Math.random()*150 -200))+"px"; 
	bunnRoer.style.top = (toppRoer.offsetTop + 370)+"px";
	toppRoer1.style.top = Math.round((Math.random()*150 -200))+"px"; 
	bunnRoer1.style.top = (toppRoer1.offsetTop + 370)+"px";  
	gameover.style.display="none";

	// makes flappy alive again
	flappyLever = true;
}

// checks if there is a collision betwen element A and B. 
function erKollisjonMellom(elementA, elementB){
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
