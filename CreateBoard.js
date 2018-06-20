function CreateBoard( grid , { numOfRows , numOfColumns }){
  this.grid = grid.grid;
  this.numOfRows = numOfRows;
  this.numOfColumns = numOfColumns;
  this.fetchCategories();
}

CreateBoard.prototype.fetchCategories = function(){
  this.offsetCategory = this.randomNumbers( 18200 );
  fetch(`http://jservice.io/api/categories?count=100&offset=${this.offsetCategory}`)
    .then(response => response.json())
    .then(categories => {
      console.log(categories);
      this.categories = categories;
      this.assignBoardValues();
    });
}

CreateBoard.prototype.assignBoardValues = function(){
  this.categoriesItemArrayIndex = new Array(this.numOfColumns).fill();
  this.categoryIDs = new Array(this.numOfColumns).fill();

  for ( let columnNumber = 0 ; columnNumber < this.numOfColumns ; columnNumber++ ){
    this.determineCategoryNumber( columnNumber );
    //this.grid[0][pickedCategories].element.textContent = categories[ categoryNumber ].title;
  }
}

CreateBoard.prototype.determineCategoryNumber = function( columnNumber ){
  //this value is from the number of categories fetched.
  let categoryNumber = this.randomNumbers( 100 ); 
  //checks if index has been used or if the category doesnt have enough questions
  if( this.categoriesItemArrayIndex.includes( categoryNumber ) ||
    this.categories[ categoryNumber ].clues_count < 5 ||
    this.containsHTML(this.categories[ categoryNumber ].title)){
      console.log( 'issue with category number' , 'just checking ' )
      return this.determineCategoryNumber( columnNumber );
    } 
  
  this.categoriesItemArrayIndex[ columnNumber ] = categoryNumber;
  this.categoryIDs[ columnNumber ] = ( this.categories[ categoryNumber ].id )
  this.fetchQuestions( this.categoryIDs[ columnNumber ] , columnNumber )
}

CreateBoard.prototype.fetchQuestions = function( categoryID , currentCol ){
  fetch(`http://jservice.io/api/clues?category=${categoryID}`) 
        .then(response => {
          if( response.ok ){
            return response.json();
          }
        })
        .then(questions => {
          let firstQuestionIndex = this.validateQuestions( questions , currentCol );
          if ( firstQuestionIndex === -1 ) throw currentCol;
          console.log('looking for cat' , questions);
          this.fillInformation( questions , currentCol , firstQuestionIndex );
        })
        .catch( columnNumber => {
          console.log( 'did this work' , columnNumber );
          this.determineCategoryNumber( columnNumber );
        })
}

CreateBoard.prototype.fillInformation = function( questions , currentCol , firstQuestionIndex){
  let questionIndex = firstQuestionIndex;
  this.grid[0][currentCol].element.textContent = questions[questionIndex].category.title.replace(/\\/g , '' );
  for( let rowNum = 1 ; rowNum < this.numOfRows ; rowNum++ ){
    questionIndex = firstQuestionIndex + rowNum - 1;
    this.grid[rowNum][currentCol].element.dataset.category =
      questions[questionIndex].category.title.replace(/\\/g , '' );
    this.grid[rowNum][currentCol].element.dataset.answer = 
      questions[questionIndex].answer.replace(/\\/g , '' );
    this.grid[rowNum][currentCol].element.dataset.question = 
      questions[questionIndex].question.replace(/\\/g , '' );
  }
}

CreateBoard.prototype.validateQuestions = function( questions , currentCol ){
  let setsOfFive = Math.floor(questions.length / 5);
  let firstQuestion = 0;
  let numOfUsableQuestions = 0;
  sets:
  for ( let set = 0 ; set < setsOfFive ; set++){
    numOfUsableQuestions = 0;
    firstQuestion = set * 5;
    check:
    for( let question = set * 5 ; question < ( set + 1 ) * 5 ; question++ ){
      let q = questions[question];
      if( this.containsHTML(q.question) || this.containsHTML(q.answer) ||
       this.containsHTML(q.category.title) || !q.invalid_count === null ) {
        console.log('issue with html with question' , 'yo')
        if ( set === setsOfFive - 1 ){
          console.log( 'returning -1 out of loop' , 'hey this worked ' )
          return -1
        }else{
          console.log('there are more questions to look at' , 'want to break here')
          break check;
        }
      }
      numOfUsableQuestions++;
      if( numOfUsableQuestions === 5 ){
        return firstQuestion;
      }
    }
  }
}

CreateBoard.prototype.containsHTML = text => /(<.+?>)|(&.{1,6}?;)/.test(text);

CreateBoard.prototype.randomNumbers = function( maxValue ){
  //always assume zero index on max value
  return Math.floor( Math.random() * Math.floor( maxValue - 1 ) );
}