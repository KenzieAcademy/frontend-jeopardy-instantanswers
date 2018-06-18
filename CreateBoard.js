function CreateBoard( grid , { numOfRows , numOfColumns }){
  this.grid = grid.grid;
  this.numOfRows = numOfRows;
  this.numOfColumns = numOfColumns;
  this.offsetCategory = this.randomNumbers( 18200 );
  fetch(`http://jservice.io/api/categories?count=100&offset=${this.offsetCategory}`)
    .then(response => response.json())
    .then(categories => {
      this.assignCategories( categories );
      console.log(categories);
      this.assignQuestions();
    });
}

CreateBoard.prototype.assignCategories = function( categories ){
  const assignedCategories = [];
  this.categoryIDs = [];
  let pickedCategories = 0
  while( pickedCategories < this.numOfColumns ){
    //this value is from the number of categories fetched.
    let categoryNumber = this.randomNumbers( 100 ); 
    if( assignedCategories.includes( categoryNumber ) ) continue;
    assignedCategories.push( categoryNumber );
    this.categoryIDs.push( categories[ categoryNumber ].id )
    this.grid[0][pickedCategories].element.textContent = categories[ categoryNumber ].title;
    console.log(categories[ categoryNumber ])
    pickedCategories++;
  }
}

CreateBoard.prototype.assignQuestions = function(){
  console.log(this.categoryIDs);
  let currentCol = this.numOfColumns - this.categoryIDs.length;
  while( this.categoryIDs.length ){
    this.currentID = this.categoryIDs.shift();
    this.fetchQuestions( this.currentID , currentCol );
    currentCol = this.numOfColumns - this.categoryIDs.length;
  }   
}

CreateBoard.prototype.fetchQuestions = function( category , currentCol ){
  fetch(`http://jservice.io/api/clues?category=${category}`) 
        .then(response => {
          if( response.ok ){
            return response.json();
          }
        })
        .then(values => {
          console.log('looking for cat' , values);
          for( let rowNum = 1 ; rowNum < this.numOfRows ; rowNum++ ){
            this.grid[rowNum][currentCol].element.dataset.category = values[rowNum-1].category.title;
            this.grid[rowNum][currentCol].element.dataset.answer = values[rowNum-1].answer;
            this.grid[rowNum][currentCol].element.dataset.question = values[rowNum-1].question;
          }
        })
}

CreateBoard.prototype.randomNumbers = function( maxValue ){
  //always assume zero index on max value
  return Math.floor( Math.random() * Math.floor( maxValue - 1 ) );
}