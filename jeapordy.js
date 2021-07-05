const init = {
  numOfRows: 6,
  numOfColumns: 6,
  gridParentElement: document.getElementById( 'grid' ),
  directions: {
    upLeft: [ -1 , -1 ],
    upRight: [ -1 , 1 ],
    downLeft: [ 1 , -1 ],
    downRight: [ 1 , 1 ],
  },
}

let stateOfGame = 'waitingForClick';


let grid = new JeopardyGrid( init );
let submitButton = new SubmitButton( grid );
console.log(grid)
let board = new CreateBoard( grid , init );