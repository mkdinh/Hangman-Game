//////////////////////////////////////////////////////////////////////////////////////
// Declaring variables
//////////////////////////////////////////////////////////////////////////////////////

// Game Parameter
//////////////////////////////////////////////////////

var life = 0;
var guessRemain = 10;
var guessWrong = [];
var word = [];
var blank =[];
var start = true;

//Random indexing variables
var allTopic = [predator1,predator2];
var allBullet = ["one","two","three","four","five","six","seven","eight","nine","ten"]


//////////////////////////////////////////////////////////////////////////////////////
// Declaring functions
//////////////////////////////////////////////////////////////////////////////////////


// Pick random topic from allTopic array
//////////////////////////////////////////////////////

function rand(myArray){
	myArray[Math.floor(Math.random() * myArray.length)];
}

//Check if a char is a letter
//////////////////////////////////////////////////////

function isLetter(str){
	return str.length === 1 && str.match(/[a-z]/i);
}

// Update #Game section
//////////////////////////////////////////////////////

function updateGame{
	var gameSect = "<b><h1>Movie:</b> " + topic.movie + "</h1>" +
	'<p id="word">' + blank.join("") + '</p>';
	
	document.querySelector("#game").innerHTML = html;
}

// Update #Score section
//////////////////////////////////////////////////////

function updateScore{
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

while(start === true){

// Initializing Game
//////////////////////////////////////////////////////

document.onkeyup = function(ev){ // On key press

	var userGuess = ev.keyCode; // store key pressed into variable
	var char = String.fromCharCode(userGuess).toLowerCase();

	//If key press is equal () start the game

	if(userGuess === 13 || userGuess === 116){

		//random picking topic
		var topic = rand(allTopic);

		// Hide characters of phrase

		for(var i=0;i<topic.size();i++){
			if(topic.phrase.charAt(i).match(/[a-z]/i)){
				word.push(topic.phrase.charAt(i));
				blank.push("_");
			}else if(topic.phrase.charAt(i) === "!"){
				word.push(topic.phrase.charAt(i));
				blank.push(topic.phrase.charAt(i));
			}else{
				word.push(" ");
				blank.push(" ");
			}
		}
		// check the phrase in the topic and push each char in to an array
		// at the same time, push a blank into the same index of another array
		// if there is a space in the phrase, the index is empty


		//Update #game html
		updateGame();


// Checking Key Pressed Against Char of a Phrase 
//////////////////////////////////////////////////////

	// Check for correct keys against characters array
	for(i=0;i<topic.size();i++){
			var char = word[i].toLowerCase();
			if(String.fromCharCode(userGuess).toLowerCase() === char){	
				blank[i] = word[i];
				word[i]=word[i].toLowerCase();
			}	
		}
	// If the key press is not equal to any of the char in the array
	if(word.indexOf(String.fromCharCode(userGuess).toLowerCase()) === -1){
			guessWrong.push(" "+String.fromCharCode(userGuess)); //push the key char into the already guessed array
			guessRemain = guessRemain-1; // subtract 1 from the number of guess remained
			
			var bullet = rand(allBullet); // pick a random bullet id
			document.getElementById(bullet).style.visibility = "initial"; // change the visiblity (hidden -> visible) 
			allBullet.splice(allBullet.indexOf(bullet),1); // remove bullet id from array so it doesnt show up twice
			document.getElementById('gun').play(); // play shot gun sound when ever a guess is wrong
	}
// If guessRemain === 0 (GAME OVER)
//////////////////////////////////////////////////////

	if(guessRemain === 0){
		var correct = '<img src="assets/images/gameover.gif">'; //image for game over
		updateGame(); // update #game id with image
		blank=[]; //blank out array
		word=[]; // blank out word array

	}

// If Guess all of the Char Correctly
//////////////////////////////////////////////////////

	if(blank.join("").toUpperCase() === word.join("").toUpperCase()){ // if blank array equal to word array
		kill = kill +1; // increase kill var by 1
		var correctImg = '<img src="'+topic.gif+'">'; // display images in object
		document.querySelector("#game").innerHTML = correctImg; // update game with correct image
		updateScore(); // update score
		word=[]; // empty word array
	}

// Ask to quit
//////////////////////////////////////////////////////

		
	

		} // End of if loop

}// End of onkeyup funct.
} // End of while loop
