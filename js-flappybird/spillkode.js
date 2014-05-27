//////////////////////////	
// HER KOMMER PROGRAMMET//
//////////////////////////


// variabler
var nedoverfart = 0;
var tyngdekraft = 0.2;
var sidefart = 2;
var poeng = 0;
var flappyLever=true;	

//figurer i spillet (også variabler)
var flappy;
var topp;
var topp1;
var bunn;
var bunn1;
var poengtekst;
var gemeover;

function start(){

	// lager listen over figurer i spillet
	flappy = document.getElementById("flappy");
	gameover = document.getElementById("gameover");
	topp = document.getElementById("topp");
	bunn = document.getElementById("bunn");
	topp1 = document.getElementById("topp1");
	bunn1 = document.getElementById("bunn1");
	poengtekst = document.getElementById("poengtekst");
	poengtekst.innerHTML = poeng + " poeng";
	
	//starter forAlltid løkken
	loop(forAlltid);
}
	
function forAlltid(){

	if(flappyLever){

		// bruk tyngdekraft til  å endre farten på flappy
		nedoverfart = nedoverfart + tyngdekraft;

		// flytt på flappy med farten
		flappy.style.top = Math.round((flappy.offsetTop + nedoverfart))+"px";

		// flytt rørene
		topp.style.left = (topp.offsetLeft - sidefart)+"px";
		bunn.style.left = topp.offsetLeft+"px";

		topp1.style.left = (topp1.offsetLeft - sidefart)+"px";
		bunn1.style.left = topp1.offsetLeft+"px";

		//sjekk om rørene har gått ut av bildet  til venstre og flytt dem til høyre
		if(topp.offsetLeft < -52){
			poeng = poeng + 1;
			poengtekst.innerHTML = poeng + " poeng";
			topp.style.left = 480+"px"; 

			topp.style.top = Math.round((Math.random()*150 -200))+"px"; 
			bunn.style.top = (topp.offsetTop + 360)+"px"; 
		}

		if(topp1.offsetLeft < -52){
			poeng = poeng + 1;
			poengtekst.innerHTML = poeng + " poeng";
			topp1.style.left = 480+"px"; 

			topp1.style.top = Math.round((Math.random()*150 -200))+"px"; 
			bunn1.style.top = (topp1.offsetTop + 360)+"px"; 
		}

		//sjekk kollisjoner eller kræsj med bakken
		if(	erKollisjonMellom(flappy,topp) || 
			erKollisjonMellom(flappy,bunn) ||
			erKollisjonMellom(flappy,topp1) || 
			erKollisjonMellom(flappy,bunn1) ||  
			(flappy.offsetTop > 335)){
			
			gameover.style.display="block";	
			flappyLever = false;
			
		}
	}

	loop(forAlltid); 
}

function etterMuseklikk(){
	console.log("ettermuseklikk fyrt");
	if(flappyLever){
		nedoverfart = -4; // når du har minus på nedoverfart blir det oppoverfart
	} else {
		omstart(); // om du klikker
	}
}

function omstart(){
	//reset poeng
	poeng=0;
	poengtekst.innerHTML = poeng + " poeng";

	// reset flappy
	flappy.style.top = "50px";
	nedoverfart = 0;
	


	// reset rørene
	topp.style.left = "280px";
	bunn.style.left = "280px";
	topp1.style.left = "20px";
	bunn1.style.left = "20px";
	topp.style.top = Math.round((Math.random()*150 -200))+"px"; 
	bunn.style.top = (topp.offsetTop + 370)+"px";
	topp1.style.top = Math.round((Math.random()*150 -200))+"px"; 
	bunn1.style.top = (topp1.offsetTop + 370)+"px";  
	gameover.style.display="none";

	// gjør flappy levende igjen
	flappyLever = true;
}

// beregner om det er kollisjon
function erKollisjonMellom(elementA, elementB){
	if(elementA.offsetLeft> (elementB.offsetLeft+elementB.width)){
		return false; // A er helt til høyre for B;
	} else if(elementB.offsetLeft> (elementA.offsetLeft+elementA.width)){
		return false; // B er helt til høyre for A;
	} else if(elementA.offsetTop > (elementB.offsetTop+elementB.height)){
		return false; // A er helt under B
	} else if(elementB.offsetTop > (elementA.offsetTop+elementA.height)){
		return false; // B er helt under A
	} else {
		return true;
	}
}