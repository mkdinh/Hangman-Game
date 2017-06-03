
// Declaring Variables 
var kill = 0;
var guessRemain = 10;
var guessWrong = [];
var word = [];
var blank =[];
var repeat = 1;

// Collections of phrases
var predator1 = {
	movie: "Predator",
	phrase: "Get to the Chopper!",
	gif: "assets/images/predator1.gif",
	size: function propLen(){ 
	var len = this.phrase.length;
    return len;
	},
}

var predator2 = {
	movie: "Predator",
	phrase: "I aint got time to bleed",
	gif: "assets/images/predator2.gif",
	size: function propLen(){ 
	var len = this.phrase.length;
    return len;
	},
}

var allTopic = [predator1,predator2];
var allBullet = ["one","two","three","four","five","six","seven","eight","nine","ten"]
var topic = allTopic[Math.floor(Math.random() * allTopic.length)];


// On key press, change html of div class = game and score

document.onkeyup = function(ev){
	// press Enter to go to play screen
	var userGuess = ev.keyCode;


	var char = String.fromCharCode(userGuess).toLowerCase();

	if(userGuess === 13 || userGuess === 116){

		if(repeat === 1){ 
		// Generate blank underscore

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
		

		// Print out phrase onto html doc
	var html = "<b><h1>Movie:</b> " + topic.movie + "</h1>" +
	'<p id="word">' + blank.join("") + '</p>';
	
	document.querySelector("#game").innerHTML = html;

	// }else if(word.indexOf(char) !== -1){
	// 	blank[word.indexOf(char)]= word[word.indexOf(char)]
	// }

		// Generate hint

		// loop to match the letter and reveal 	
		}
		repeat = 0;
		}else{

			for(i=0;i<topic.size();i++){

				var char = word[i].toLowerCase();
				if(String.fromCharCode(userGuess).toLowerCase() === char){	
					blank[i] = word[i];
					word[i]=word[i].toLowerCase();
				}	
			}

			if(word.indexOf(String.fromCharCode(userGuess).toLowerCase()) === -1){
				// If wrong -> show a random bullet and reduce life to one
					guessWrong.push(" "+String.fromCharCode(userGuess));
					guessRemain = guessRemain-1;
					var bullet = allBullet[Math.floor(Math.random() * allBullet.length)];
					console.log(bullet);
					document.getElementById(bullet).style.visibility = "initial";
					allBullet.splice(allBullet.indexOf(bullet),1);
					document.getElementById('gun').play();


				// store wrong guess in word	
			}
			// If life = 0 -> end game and show image

		}


		// Update html	
		var html = "<b><h1>Movie:</b> " + topic.movie + "</h1>" +

		'<p id="word">' + blank.join("") + '</p>';
		
		var score = "<h1><b>Score</b></h1>"
                + '<p class="lead">One-Liner Kill: ' + kill + "</p>"
                + '<p class="lead">Guess Remaining: ' + guessRemain + "<p>"
                + '<p class="lead">Already Guessed:<br> ' + guessWrong.join("") + "<p>";

		document.querySelector("#game").innerHTML = html;
		document.querySelector("#score").innerHTML = score;

		// When all letter matched, increase win by 1

		if(blank.join("").toUpperCase() === word.join("").toUpperCase()){
			kill = kill +1;
			var correct = '<img src="'+topic.gif+'">';
			document.querySelector("#score").innerHTML = score;
			document.querySelector("#game").innerHTML = correct;
			word=[];
		}

		// When guessRemain = 0, pop up image

		if(guessRemain === 0){
			var correct = '<img src="assets/images/gameover.gif">';
			document.querySelector("#score").innerHTML = score;
			document.querySelector("#game").innerHTML = correct;
			blank=[];
			word=[];

		}

}



		// ask to play again}
	



