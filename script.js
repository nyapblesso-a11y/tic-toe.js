const boxes = document.querySelectorAll('.box')
const statusText = document.querySelector('#statusText')
const reset = document.querySelector('.reset')
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

let options = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let running = false

initializeGame()

function initializeGame () {
  boxes.forEach(box => box.addEventListener('click', boxClicked))
  reset.addEventListener('click', resetGame)
  statusText.textContent = `${currentPlayer}'s turn`
  running = true
}
function boxClicked () {
  const cellIndex = this.getAttribute('cellIndex')
  if (options[cellIndex] !== '' || !running) {
    return
  }

  updateBox(this, cellIndex)
  checkWinner()
}
function updateBox (box, index) {
  options[index] = currentPlayer
  box.textContent = currentPlayer
}
function changePLayer () {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
  statusText.textContent = `${currentPlayer}'s turm`
}
function checkWinner () {
  let roundWon = false

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i]
    const boxA = options[condition[0]]
    const boxB = options[condition[1]]
    const boxC = options[condition[2]]

    if (boxA === '' || boxB === '' || boxC === '') {
      continue
    } else if (boxA === boxB && boxB === boxC) {
      roundWon = true
      break
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`
    running = false
  } else if (!options.includes('')) {
    statusText.textContent = 'Draw!'
    running = false
  } else {
    changePLayer()
  }
}
function resetGame () {
  currentPlayer = 'X'
  options = ['', '', '', '', '', '', '', '', '']
  statusText.textContent = `${currentPlayer}'s turn`
  boxes.forEach(box => box.textContent = '')
  running = true
}