const outputQuestion = document.getElementById("outputQuestion");
let answerInput;
const buttonSubmit = document.getElementById("submitAnswer");
let answerOutput;
let userScore = document.getElementById("userScore");
let questionBundle = {};
let helpObject = {};
let score = 0;
const questionHelp = document.getElementById("questionHelpID");

// fetch("http://jservice.io/api/random")
//   .then(responseObject => responseObject.json())
//   .then(hydratedBody => console.log(hydratedBody))





fetch('http://jservice.io/api/random')
	.then(function (responseObject) {
		return responseObject.json();
	})
	.then(function (hydratedBody) {
		console.log(hydratedBody[0]);
		questionBundle = hydratedBody[0];
		let question = document.createTextNode(questionBundle.question);
		outputQuestion.appendChild(question);
	});

function checkAnswer() {
	answerInput = document.getElementById("textInput").value;
	console.log(answerInput, "--", questionBundle.answer)
	if (answerInput == questionBundle.answer) {

		score = Number(score) + Number(questionBundle.value);
		// let scoreToAppend = document.createTextNode(score);
		// userScore.appendChild(scoreToAppend);
		userScore.textContent = score;
		alert("That is.....Correct! You've earned " + questionBundle.value + " points!");
		fetch('http://jservice.io/api/random')
			.then(function (responseObject) {
				return responseObject.json();
			})
			.then(function (hydratedBody) {
				console.log(hydratedBody[0]);
				questionBundle = hydratedBody[0];
				// let question = document.createTextNode(questionBundle.question);
				// outputQuestion.appendChild(question);
				outputQuestion.textContent = questionBundle.question;
			});

	} else {
		alert("So close! You can do it! Please try again", answerInput);
		let uri = 'https://api.duckduckgo.com/?q=' + questionBundle.answer + '&format=json&pretty=1';
		let encoded = encodeURI(uri);
		fetch(encoded)
			.then(function (responseObject) {
				return responseObject.json();
			})
			.then(function (hydratedBody) {

				helpObject = hydratedBody;
				console.log(helpObject);
				if (helpObject.AbstractURL) {
					let helpText = document.createTextNode(helpObject.AbstractURL);
					questionHelp.appendChild(helpText);
				}else if (helpObject.RelatedTopics[0]){
					let helpText = document.createTextNode(helpObject.RelatedTopics[0].FirstURL);
					questionHelp.appendChild(helpText);
				}else{
					let helpText = document.createTextNode('OMG! There is no help available');
					questionHelp.appendChild(helpText);
				}
			})

	}
}


// let uri = 'https://api.duckduckgo.com/?q='+questionBundle.answer+'&format=json&pretty=1';
// let encoded = encodeURI(uri);
// fetch(encoded)
// 	.then(function (responseObject) {
// 		return responseObject.json();
// 	})
// 	.then(function (hydratedBody) {
// 		console.log(hydratedBody);
// 	})