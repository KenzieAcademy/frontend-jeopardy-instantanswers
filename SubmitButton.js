function SubmitButton( grid ){
  this.grid = grid;
  this.button = document.getElementById( 'submit' );
  this.userInput = document.getElementById( 'input' );
  this.button.addEventListener( 'click' , this );
}

SubmitButton.prototype.handleEvent = function(){
  if (stateOfGame === 'waitingForClick') return false;
  this.userAnswer = this.userInput.value.toLowerCase();
  this.correctAnswer = this.grid.correctAnswer.toLowerCase() ;
  this.encodedCorrectAnswer = encodeURI( this.correctAnswer );
  this.compareAnswer();
  this.duckDuckGo();
  stateOfGame = 'waitingForClick';
}

SubmitButton.prototype.compareAnswer = function(){
  console.log(this.userAnswer);
  if( this.userAnswer === this.correctAnswer ){
    this.grid.totalPoints += Number(this.grid.pointValue);
    this.grid.totalPointsElement.textContent = `Total Points: ${this.grid.totalPoints}`;
  }else{
    this.grid.totalPoints -= Number(this.grid.pointValue);
    this.grid.totalPointsElement.textContent = `Total Points: ${this.grid.totalPoints}`;
  }
}

SubmitButton.prototype.duckDuckGo = function(){
  console.log(this.encodedCorrectAnswer)
  this.duckGoUrl = `https://api.duckduckgo.com/?q=${this.encodedCorrectAnswer}&format=json&pretty=1&skip_disambig=1&t=KenzieAcademyJeopardy`;

  console.log(this.duckGoUrl);

  fetch(this.duckGoUrl)
    .then(duckGo => duckGo.json())
    .then(duckGoJson => {
      console.log(duckGoJson);
      this.fillDisplayAnswer();
      this.fillDisplayInfo( duckGoJson );
    });
}

SubmitButton.prototype.fillDisplayAnswer = function(){
  grid.displayAnswer.textContent = `Correct Answer: ${this.grid.correctAnswer}`;
}

SubmitButton.prototype.fillDisplayInfo = function( duckGoJson ){
  console.log( duckGoJson.abstract )
  info = `No Search Returned`;
  if ( duckGoJson.Abstract ) {
    info = `${duckGoJson.AbstractText}`;
    grid.displayImage.src = `${duckGoJson.Image}`;
    grid.duckduck.href = `https://api.duckduckgo.com/?q=${this.encodedCorrectAnswer}`;
    grid.search.href = `${duckGoJson.AbstractURL}`;
    grid.search.textContent = `${duckGoJson.AbstractURL}`;
  }

  else if( duckGoJson.RelatedTopics.length ) {
    info = `${duckGoJson.RelatedTopics[0].Text}`;
    grid.displayImage.src = `${duckGoJson.RelatedTopics[0].Icon.URL}`;
    grid.duckduck.href = `${duckGoJson.RelatedTopics[0].FirstURL}`;
    grid.search.href = `${duckGoJson.RelatedTopics[0].FirstURL}`;
    grid.search.textContent = `${duckGoJson.RelatedTopics[0].FirstURL}`;
  }
  grid.displayInfo.textContent = info;
}
