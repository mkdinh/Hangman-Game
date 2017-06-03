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
    document.querySelector("#game").innerHTML = reStart;

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

	if(userGuess === 116){
			reStart();
	
	}

	function play(userGuess){
		//If key press is equal () start the game
		if(userGuess === 13 ){	
			if(start === false){return;}
				blank= [];
				word=[];
				//random picking topic
				topic = rand(allTopic);
				topic.phrase = topic.phrase.toUpperCase();

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
			
		if(isLetter(code2Char) && userGuess !== 116 && userGuess && 13){
			if(stop === true){return};
			// Check for correct keys against characters array
			for(i=0;i<topic.size();i++){
				if(code2Char.toUpperCase() === word[i]){	
					blank[i] = word[i];
					word[i]=word[i];

				} // end if loop
			} // end for loop

			// If the key press is not equal to any of the char in the array
			if(word.indexOf(code2Char) === -1){
					guessWrong.push(" "+String.fromCharCode(userGuess)); //push the key char into the already guessed array
					guessRemain = guessRemain-1; // subtract 1 from the number of guess remained
					
					var bullet = rand(allBullet); // pick a random bullet id
					document.getElementById(bullet).style.visibility = "initial"; // change the visiblity (hidden -> visible) 
					allBullet.splice(allBullet.indexOf(bullet),1); // remove bullet id from array so it doesnt show up twice
					document.getElementById('gun').play(); // play shot gun sound when ever a guess is wrong
			}

			updateGame(); // update #game id with image
			updateScore(); // update score
		}
	} // END OF FUNCTION
	play(userGuess);
	// If guessRemain === 0 (GAME OVER)
	//////////////////////////////////////////////////////

		if(guessRemain === 0){
			var gameover = '<img src="assets/images/gameover.gif">'; //image for game over
			document.querySelector("#game").innerHTML = gameover; // update game with correct image	
			//ask to play again
			stop = true;
		}

	// If Guess all of the Char Correctly
	//////////////////////////////////////////////////////


		if(blank.join("").toUpperCase() === word.join("").toUpperCase()){ // if blank array equal to word array
			kill = kill +1; // increase kill var by 1
			var correctImg = '<img src="'+topic.gif+'">'; // display images in object
			document.querySelector("#game").innerHTML = correctImg; // update game with correct image
			next = true;
			blank = [];
		}

	if(userGuess === 13 && next === true){
				start = true;
				updateGame();
				updateScore();
				play(userGuess)}
				console.log(start);

	// Ask to quit
	//////////////////////////////////////////////////////
	} // end of is Letter 
//}// End of onkeyup funct.