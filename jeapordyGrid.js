function JeopardyGrid( init ){
  Grid.call( this , init )
  this.questionClicked = false;
  this.question = document.getElementById('question');
  this.category = document.getElementById('category');
  this.value = document.getElementById('values');
  this.totalPointsElement = document.getElementById('totalpoints');
  this.totalPoints = 0;
  this.totalPointsElement.textContent = `Total Points: ${this.totalPoints}`;
  this.displayAnswer = document.getElementById('correctAnswer');
  this.displayInfo = document.getElementById('info');
  this.displayImage = document.getElementById('image');
  this.search = document.getElementById('source');
  this.duckduck = document.getElementById('duckduck');
}

JeopardyGrid.prototype = Object.create(Grid.prototype);
JeopardyGrid.prototype.constructor = JeopardyGrid;

Grid.prototype.createCell = function( rowIndex , columnIndex ){
  const cell = new JeapordyCell( rowIndex , columnIndex );
  this.grid[rowIndex].rowElement.appendChild( cell.element );

  return cell;
}

JeopardyGrid.prototype.fillCurrentInfo = function( clickedCell ){
  this.category.textContent = `Current Category: ${clickedCell.element.dataset.category}`;
  this.question.textContent = `Current Board Tile: ${clickedCell.element.dataset.question}`;
  this.pointValue = clickedCell.element.dataset.value;
  this.value.textContent = `Board Tile Value: ${this.pointValue}`;
  this.correctAnswer = `${clickedCell.element.dataset.answer}`;
}

JeopardyGrid.prototype.clearAnswerInfo = function(){
  this.displayAnswer.textContent = ``;
  this.displayInfo.textContent = ``;
  this.displayImage.src = ``;
  this.search.href = ``;
  this.search.textContent = ``;
  this.duckduck.href = `href="https://duckduckgo.com/"`;
}

JeopardyGrid.prototype.handleEvent = function( event ){
  if (!event.target.classList.contains("cell") || stateOfGame === 'waitingForAnswer') return false;
  if ( event.target.dataset.row == 0 ) return;
  let clickedCell = this.findCell( Number( event.target.dataset.row) , Number(event.target.dataset.column ))
  if (clickedCell.isClicked) return;

  const clickTypes = {
    click: () => {
      console.log('target' , event.target);
      this.clearAnswerInfo();
      clickedCell.showQuestion();
      this.fillCurrentInfo( clickedCell );
      console.log( 'changed' , clickedCell )
    },

    contextmenu: () => {
      event.preventDefault();
    }
  }
  clickTypes[event.type]()
}