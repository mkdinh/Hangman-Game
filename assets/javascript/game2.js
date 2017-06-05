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
var html = "";
//Topics


//Random indexing variables
var allTopic = [predator1];//,predator2,TLAH,pass57,theyLive,dieHard,commando,dirtyHarry, hard2Kill,starWar2];
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

// Update #Game section
//////////////////////////////////////////////////////

function updateGame(topic){
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

	document.onkeyup = function(ev){

		var userGuess = ev.keyCode; // store key pressed into variable
		var code2Char = String.fromCharCode(userGuess).toUpperCase();
		var topic = "";
		function initializeGame(){
			if(userGuess === 13 && userGuess !== 116){
				topic = rand(allTopic);	
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
				updateGame(topic);
				return topic;
				//	console.log(blank);console.log(word)
				} // end of for loop
			}
		}

		initializeGame();

		function checkCorrect(){
			if(code2Char.toUpperCase() === word[i]){
				blank[i] = word[i];
			}
		}

		function checkWrong(){}
			// If the key press is not equal to any of the char in the array
			if(word.indexOf(code2Char) === -1){ //console.log(code2Char);console.log(guessWrong); console.log(word.indexOf(code2Char));
				//if(code2Char.toUpperCase() != word[i]){
				 		if(guessWrong.indexOf(code2Char) === 1){return} 	
						guessWrong.push(code2Char); //push the key char into the already guessed array
						guessRemain = guessRemain-1; // subtract 1 from the number of guess remained
						
						//randomBullet();

						updateScore();
			}

		if(isLetter(code2Char)){
			for(i=0;i<topic.size();i++){
				checkCorrect()	
			}
		}else{}
	}// onkeyup
