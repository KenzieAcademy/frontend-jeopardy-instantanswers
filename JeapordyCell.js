'use strict'

function JeapordyCell( rowIndex , ColIndex ){
  Cell.call( this , rowIndex , ColIndex )
}

JeapordyCell.prototype = Object.create(Cell.prototype);
JeapordyCell.prototype.constructor = JeapordyCell;

JeapordyCell.prototype.createElement = function(){
  this.element = document.createElement( 'div' );
  this.element.dataset.row = this.row;
  this.element.dataset.column = this.column;
  this.element.dataset.isClicked = false;
  this.element.classList.add( 'cell' );
  if( this.row >= 1 ){
    this.element.textContent = this.row * 200;
    this.element.dataset.value = this.row * 200;
  }
}

JeapordyCell.prototype.showQuestion = function(){
  this.setAsClicked();
  stateOfGame = 'waitingForAnswer';
  this.element.textContent = this.element.dataset.question;
}