const cellElements = document.querySelectorAll('[data-cell]');
console.log(cellElements)
const messageTextElement = document.querySelector('[data-winning-message-text]')
const messageElement = document.querySelector('.winning-message')
const O_CLASS = 'o'
const X_CLASS = 'x' 
const restartButton = document.getElementById('restartButton')
const WINNING_COMBINATIONS = [
	[0,1,2],
	[0,4,8],
	[0,3,6],
	[1,4,7],
	[3,4,5],
	[2,4,6],
	[6,7,8],
	[2,5,8]
]
const board = document.getElementById('board');

let circleTurn 

startGame()
/*each cell will fire once*/
function startGame(){
	circleTurn=false;
	cellElements.forEach(cell => {
		cell.classList.remove('win')
		cell.classList.remove(X_CLASS)
		cell.classList.remove(O_CLASS)
		cell.removeEventListener('click',handleClick)
		cell.addEventListener('click', handleClick, { once: true });
	  });
	  setBoardHoverClass()
	  messageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  placeMark(cell,currentClass);
  if(checkWin(currentClass)){
	endGame(false)
  }
  else if(isDraw()){
	endGame(true)
  }
  //check for draw
  //switch turns
  swapTurns()
  setBoardHoverClass()
}

function placeMark(cell,currentClass){
	cell.classList.add(currentClass)
}

function swapTurns(){
	circleTurn=!circleTurn;
}

function setBoardHoverClass(){
	board.classList.remove(X_CLASS)
	board.classList.remove(O_CLASS)
	if (circleTurn) {
		board.classList.add(O_CLASS)
	}
	else{
		board.classList.add(X_CLASS)
	}
}

function checkWin(currentClass){/** check some, every function */
	return WINNING_COMBINATIONS.some(combination => {
		 if (combination.every(index =>{
			return cellElements[index].classList.contains(currentClass)
		})) {
		 	combination.every(index=>{
		 		cellElements[index].classList.add('win')
		 		return true
		 	})
		 	return true
		 }
		 else
		 	return false
	})
}
function endGame(draw){
	if(draw){
		messageTextElement.innerText = `It's a draw!`
	}
	else{
		messageTextElement.innerText = `${circleTurn ? "O ":"X 	"} wins!` 
	}
	messageElement.classList.add('show');
}

function isDraw(){/** onnly an array has every method [...cellElements] destrucured the NodeList type to an Array */
	return [...cellElements].every(cell =>{
		return cell.classList.contains(X_CLASS)||cell.classList.contains(O_CLASS)
	})
}
restartButton.addEventListener('click',startGame);