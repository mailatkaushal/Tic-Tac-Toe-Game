const infoEl = document.querySelector('.info');
const boxes = document.querySelectorAll('.box');
const buttonEL = document.querySelector('.btn');

let currentPlayer;
let gameSeq = [];

const winingPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

init();

function init() {
  currentPlayer = 'X';
  infoEl.innerText = `Current Player - ${currentPlayer}`;
  gameSeq = ['', '', '', '', '', '', '', '', ''];
  boxes.forEach(box => {
    box.innerText = '';
    box.style.pointerEvents = 'all';
    box.classList.remove('win');
  });
  buttonEL.classList.remove('active');
}

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if(gameSeq[index] === '') {
    boxes[index].innerText = currentPlayer;
    gameSeq[index] = currentPlayer;
    boxes[index].style.pointerEvents = 'none';
    swapTurn();
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer == 'X') {
    currentPlayer = '0';
  }
  else {
    currentPlayer = 'X';
  }
  infoEl.innerText = `Current Player - ${currentPlayer}`
}

buttonEL.addEventListener('click', init);

function checkGameOver() {
  let winner = '';
  winingPosition.forEach(position => {
    if (gameSeq[position[0]] !== '' && gameSeq[position[1]] !== '' && gameSeq[position[2]] !== '' && gameSeq[position[0]] === gameSeq[position[1]] && gameSeq[position[1]] === gameSeq[position[2]]) {
      if (gameSeq[position[0]] === 'X') {
        winner = 'X'
      }
      else {
        winner = '0'
      }   
      boxes.forEach(box => {
        box.style.pointerEvents = 'none';
      })
      boxes[position[0]].classList.add('win');
      boxes[position[1]].classList.add('win');
      boxes[position[2]].classList.add('win');
    }

    if (winner !== '') {
      infoEl.innerText = `Winner Player - ${winner}`;
      buttonEL.classList.add('active');
      return;
    }

    let fillCount = 0;
    gameSeq.forEach(box => {
      if (box !== '') {
        fillCount++;
      }
    });
    if (fillCount === 9) {
      infoEl.innerText = 'Game Tied!';
      buttonEL.classList.add('active');
    }
  });
}
