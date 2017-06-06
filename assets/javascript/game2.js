//////////////////////////////////////////////////////////////////////////////////////
// Declaring variables
//////////////////////////////////////////////////////////////////////////////////////

// Game Parameter
//////////////////////////////////////////////////////

var kill = 0;
var guessRemain = 10;
var guessWrong = [];
var word =  [];
var blank = [];
var initPause = false;
var playPause = true;
//Topics


//Random indexing variables
var allTopic = [predator1,predator2,predator2,TLAH,pass57,theyLive,dieHard,commando,dirtyHarry, hard2Kill,starWar2];
var allBullet = ["one","two","three","four","five","six","seven","eight","nine","ten"];
var allBulletBA =[];

//////////////////////////////////////////////////////////////////////////////////////
// Updating & Picking functions
//////////////////////////////////////////////////////////////////////////////////////


// Pick random topic from allTopic array
//////////////////////////////////////////////////////

function rand(myArray){
	var element = myArray[Math.floor(Math.random() * myArray.length)];
	myArray.splice(myArray.indexOf(element),1); // remove element from array so it doesnt show up twice
	return element;
}

//Check if a char is a letter
//////////////////////////////////////////////////////

function isLetter(char){
	return char.match(/[a-z]/i);
}

// Update #Game section
//////////////////////////////////////////////////////

function updateGame(topic){
	var gameSect = "<b><h1>Movie:</b> " + topic.movie + "</h1>" +
	'<p id="word">' + blank.join("") + '</p>';
	document.querySelector("#game").innerHTML = gameSect;
}

// Update #Score section
//////////////////////////////////////////////////////

function updateKill(){
	var newKill = kill;       
    document.querySelector("#kill").innerHTML = newKill;
  	fadeOutEffect("plus1");
} 

function updateGuessRemain(){
	var newGuessRemain = guessRemain;       
    document.querySelector("#guessRemain").innerHTML = newGuessRemain;
}

function addGuessRemain(){
	if(guessRemain<=8){
		guessRemain = guessRemain+2;
		rand
		fadeOutEffect("plus2");				
	 	updateGuessRemain();
		 	for(i = 0; i < 2; i++){
		 		addBullet();
		 	}
 	}
}
function updateGuessWrong(){
	guessWrongStr = guessWrong.join(" ");
	var newGuessWrong = guessWrongStr;       
    document.querySelector("#guessWrong").innerHTML = newGuessWrong;
}

function updateScore(){
	updateKill();
	updateGuessRemain();
	updateGuessWrong(); 
}


// Pick Random Bullet
//////////////////////////////////////////////////////

function randomBullet(){
	var bullet = rand(allBullet); // pick a random bullet id
	allBulletBA.push(bullet);
	document.getElementById(bullet).style.visibility = "visible"; // change the visibility (hidden -> visible) 
	document.getElementById('gun').play(); // play shot gun sound when ever a guess is wrong
}

// Disabling Random Bullet
//////////////////////////////////////////////////////

function addBullet(){
	var bullet = rand(allBulletBA); // pick a random bullet id
	allBullet.push(bullet);
	document.getElementById(bullet).style.visibility = "hidden"; // change the visibility (hidden -> visible) 
//	document.getElementById('reload').play(); 
}

// Set fading animation
//////////////////////////////////////////////////////

function fadeOutEffect(target) {
    var fadeTarget = document.getElementById(target);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity){
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity < 0.1) {
            clearInterval(fadeEffect);
        } else {
            fadeTarget.style.opacity -= 0.1;
        }
    }, 100);
    fadeTarget.style.opacity = '';
}


//////////////////////////////////////////////////////////////////////////////////////
// Main Game Functions
//////////////////////////////////////////////////////////////////////////////////////

function initializeGame(){
		blank = [];
		word = [];
		// guessWrong = [];
		// updateGuessWrong();

		if(typeof allTopic[0] !== "undefined"){
			topic = rand(allTopic);	
			topic.phrase = topic.phrase.toUpperCase();
		}else{
			finished();
			return;
		}
		for(var i=0;i<topic.size();i++){
			var phraseChar = topic.phrase.charAt(i);
			if(isLetter(phraseChar)){
				word.push(phraseChar);
				blank.push("_");
			}else if(phraseChar === "!" || phraseChar === "?" || phraseChar === "'" || phraseChar ===","){
				word.push(phraseChar);
				blank.push(phraseChar);
			}else{
				word.push(" ");
				blank.push(" ");
			} // end of else loop
		} // end of for loop

//	updateGame(topic);
	return[topic,blank,word];
	}


function checkCorrect(code2Char){
	//if(code2Char.toUpperCase() === word[i]){
		blank[i] = word[i];
//		updateGame(topic);
}

function checkWrong(code2Char){
	if(guessWrong.indexOf(code2Char) === -1){
		guessRemain = guessRemain-1;
		guessWrong.push(code2Char); //push the key char into the already guessed array
		randomBullet();
	}
}

function win(){
	kill = kill +1; // increase kill var by 1
	//guessRemain = guessRemain+2; // subtract 1 from the number of guess remained
	guessWrong = [];
	var correctImg =  '<h1>Press enter to continue!</h1>'
	+'<img src="'+topic.gif+'">'; // display images in object
	document.querySelector("#game").innerHTML = correctImg; // update game with correct image
	document.getElementById("win").play();
//	updateScore();
	//if(guessRemain>0){fadeOutEffect("plus2")};
}

function lose(){
	var gameover =  '<h1>Go watch some more movies and try again!</h1>'
	+'<img src="assets/images/gameover.gif">'; //image for game over
	document.getElementById("lose").play();
	document.getElementById("background").pause();	
	document.querySelector("#game").innerHTML = gameover; // update game with correct image	
}

function finished(){
	var won = "<b><h1>Congrats! You are a great one-liner!</h1>"
	+'<image src="assets/images/thumb.gif">';
	document.getElementById("background").pause();
	document.getElementById("finished").play();
	document.querySelector("#game").innerHTML = won;
}


//////////////////////////////////////////////////////////////////////////////////////
// Main Game Conditionals
//////////////////////////////////////////////////////////////////////////////////////


document.onkeyup = function(ev){

	var userGuess = ev.keyCode; // store key pressed into variable
	var code2Char = String.fromCharCode(userGuess).toUpperCase();
	if(userGuess === 13 && userGuess !== 116){
		if(initPause){return};
		initializeGame();
		initPause = true;
		playPause = false;
		if(typeof allTopic[0] !== "undefined"){
		updateGame(topic);
		}
	}

	if(isLetter(code2Char)){
		if(playPause){return}
		for(i = 0; i < word.length; i++){
			if(code2Char === word[i]){
				checkCorrect(code2Char);	
			}
		updateGame(topic);
		}
		
		if(word.indexOf(code2Char) === -1){
			checkWrong(code2Char);
			updateGuessWrong();
			updateGuessRemain();
		}

		if(word.join("") === blank.join("") && typeof blank[0] !== "undefined"){
			playPause = true;			
			initPause = false;
			win(); 
			addGuessRemain();
			updateScore();
		
		}else if(guessRemain <= 0){
			lose();
		}
	}

	
}// onkeyup
