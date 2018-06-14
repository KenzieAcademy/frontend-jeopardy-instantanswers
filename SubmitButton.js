function SubmitButton(){
  this.button = document.getElementById( 'submit' );
  this.userInput = document.getElementById( 'input' );
  this.button.addEventListener( 'click' , this );
}

SubmitButton.prototype.handleEvent = function(){
  if (stateOfGame === 'waitingForClick') return false;
  this.answer = this.userInput.value.toLowerCase();
  stateOfGame = 'waitingForClick';
}
