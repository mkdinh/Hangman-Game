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
var start = true;
var stop = false;
var next = false;
var topic = "";
var html = "";
//Topics


//Random indexing variables
var allTopic = [predator1,predator2,TLAH,pass57,theyLive,dieHard,commando,dirtyHarry, hard2Kill,starWar2];
var allBullet = ["one","two","three","four","five","six","seven","eight","nine","ten"];


//////////////////////////////////////////////////////////////////////////////////////
// Declaring functions
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

function reStart(){
	var start = '<h1>The best kills are the one-liner kills!</h1>'
     +'<p id="word">Press Enter to start playing!</p>';
    document.querySelector("#game").innerHTML = start;

}
// Update #Game section
//////////////////////////////////////////////////////

function updateGame(){
	var gameSect = "<b><h1>Movie:</b> " + topic.movie + "</h1>" +
	'<p id="word">' + blank.join("") + '</p>';
	document.querySelector("#game").innerHTML = gameSect;
}

// Update #Score section
//////////////////////////////////////////////////////

function updateScore(){
	var score = "<h1><b>Score</b></h1>"
        + '<p class="lead">One-Liner Kill: ' + kill + "</p>"
        + '<p class="lead">Guess Remaining: ' + guessRemain + "<p>"
        + '<p class="lead">Already Guessed:<br> ' + guessWrong.join("") + "<p>";

        document.querySelector("#score").innerHTML = score;

}

// Update #Game section
//////////////////////////////////////////////////////

function won(){
	var won = "<b><h1>Congrats! You are a great one-liner!</h1>"
	+'<image src="assets/images/thumb.gif">';
	document.querySelector("#game").innerHTML = won;
}


// Pick Random Bullet
//////////////////////////////////////////////////////

function randomBullet(){
	var bullet = rand(allBullet); // pick a random bullet id
	document.getElementById(bullet).style.visibility = "visible"; // change the visibility (hidden -> visible) 
	document.getElementById('gun').play(); // play shot gun sound when ever a guess is wrong
}

// Reset Parameters
//////////////////////////////////////////////////////
function reset(){
	kill = 0;
	guessRemain = 10;
	guessWrong = [];
	word =  [];
	blank = [];
	start = true;
	stop = true;
	next = true;
	allBullet = ["one","two","three","four","five","six","seven","eight","nine","ten"];
	allTopic = [predator1,predator2,TLAH,pass57,theyLive,dieHard,commando,dirtyHarry, hard2Kill,starWar2];
	for(i = 0; i<allBullet.length;i++){
		document.getElementById(allBullet[i]).style.visibility = "hidden";
	}
	updateGame();
	updateScore();
}

//////////////////////////////////////////////////////////////////////////////////////
// Main Game Code
//////////////////////////////////////////////////////////////////////////////////////

// While loop
//////////////////////////////////////////////////////

// Initializing Game
//////////////////////////////////////////////////////
//while(start === true){
document.onkeyup = function(ev){ // On key press

	var userGuess = ev.keyCode; // store key pressed into variable
	var code2Char = String.fromCharCode(userGuess);

	function playGame(userGuess){
		//If key press is equal () start the game
		if(userGuess === 13 && userGuess !== 116){	
			if(start === false){return;}
				blank= [];
				word=[];
				//random picking topic
				
				topic = rand(allTopic);
				console.log(topic);
				if(typeof topic !== "undefined"){
					topic.phrase = topic.phrase.toUpperCase();
				}else{won();reset();playGame()}
				console.log(allTopic);
				// Hide characters of phrase
				// check the phrase in the topic and push each char in to an array
				// at the same time, push a blank into the same index of another array
				// if there is a space in the phrase, the index is empty
						for(var i=0;i<topic.size();i++){
							var phraseChar = topic.phrase.charAt(i);

							if(isLetter(phraseChar)){
								word.push(phraseChar);
								blank.push("_");
							}else if(phraseChar === "!" || phraseChar === "?" || phraseChar === "'"){
								word.push(phraseChar);
								blank.push(phraseChar);
							}else{
								word.push(" ");
								blank.push(" ");
							} // end of else loop

						} // end of for loop

			//Update #game html
			updateGame();
			start = false; // turn false, cannot press enter to start anymore
		} // end of if(userGuess === 13) 

		// Checking Key Pressed Against Char of a Phrase 
		//////////////////////////////////////////////////////
		

		if(isLetter(code2Char) && userGuess === 116){
			if(stop){return};
			var mismatched = false;
			// Check for correct keys against characters array
			for(i=0;i<topic.size();i++){

				if(code2Char.toUpperCase() === word[i]){
					blank[i] = word[i];
				} // end if loop

			// If the key press is not equal to any of the char in the array
			if(word.indexOf(code2Char) === -1){ //console.log(code2Char);console.log(guessWrong); console.log(word.indexOf(code2Char));
				//if(code2Char.toUpperCase() != word[i]){
				 		if(guessWrong.indexOf(code2Char) === 1){return} 	
				 		if(mismatched){return}
						guessWrong.push(code2Char); //push the key char into the already guessed array
						guessRemain = guessRemain-1; // subtract 1 from the number of guess remained
						
						randomBullet();

						mismatched = true;
						updateScore();
				}

			updateGame(); // update #game id with image
			updateScore(); // update score

			} // end for loop
		}
	} // END OF FUNCTION
		
	playGame(userGuess);


	// If guessRemain === 0 (GAME OVER)
	//////////////////////////////////////////////////////

		if(guessRemain === 0){
			var gameover =  '<h1>Press enter to restart!</h1>'
			+'<img src="assets/images/gameover.gif">'; //image for game over
			document.querySelector("#game").innerHTML = gameover; // update game with correct image	
			stop = true;
		}

		if(guessRemain === 0 && ev.keyCode === 13){
			reset();
		}

	// If Guess all of the Char Correctly
	//////////////////////////////////////////////////////

		if(blank.join("").toUpperCase() === word.join("").toUpperCase() && typeof blank[0] !== "undefined"){ // if blank array equal to word array
			kill = kill +1; // increase kill var by 1
			var correctImg =  '<h1>Press enter to continue!</h1>'
			+'<img src="'+topic.gif+'">'; // display images in object
			document.querySelector("#game").innerHTML = correctImg; // update game with correct image
			stop = true;
			next = true;
			blank = [];
		}

	// Go to next Game
	//////////////////////////////////////////////////////

	if(userGuess === 13 && next === true){ // If user press enter and next is true (by winning)
				start = true; // set start to be true to run the play() function again
				stop = false;
				updateGame(); // update games with new blanks
				updateScore(); // date the score after hitting enter
				playGame(userGuess)} // run play() function

	// Ask to quit
	//////////////////////////////////////////////////////
	} // end of is Letter 
//}// End of onkeyup funct.