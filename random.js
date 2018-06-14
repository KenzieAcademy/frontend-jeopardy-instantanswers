const question = document.getElementById('question');
const value = document.getElementById('values');
const submitButton = document.getElementById( 'submit' );
const userAnswer = document.getElementById( 'input' );
const category = document.getElementById('category');
const totalPoints = document.getElementById('total');
const newQuestion = document.getElementById('newQuestion');
const isCorrect = document.getElementById('grade');
let points = 0;
totalPoints.textContent = `Total Points: ${points}`;

function RandomQueston(){
  this.isClicked = false;
  fetch("http://jservice.io/api/random")
    .then(response => response.json())
    .then(random => {
      console.log(random[0].answer);
      category.textContent = `Category Name: ${random[0].category.title}`;
      question.textContent = `Question: ${random[0].question}`;
      this.answer = random[0].answer.toLowerCase();
      value.textContent = `Value of Question: ${random[0].value}`;
      this.value = random[0].value;
    });
}

let currentQuestion = new RandomQueston();

submitButton.addEventListener( 'click' , checkAnswer );
newQuestion.addEventListener( 'click' , newQuest );

function checkAnswer(){
  if (currentQuestion.isClicked) return;
  currentQuestion.isClicked = true;
  let answer = userAnswer.value.toLowerCase();
  if(answer === currentQuestion.answer){
    points += currentQuestion.value;
    totalPoints.textContent = `Total Points: ${points}`;
    isCorrect.textContent = 'YOU ARE CORRECT';
  }else{
    isCorrect.textContent = 'THAT IS INCORRECT';
  }
}

function newQuest(){
  currentQuestion = new RandomQueston();
  isCorrect.textContent = "";
  userAnswer.value = "";
}