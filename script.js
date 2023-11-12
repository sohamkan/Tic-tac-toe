// script.js

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

board.addEventListener('click', (e) => {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameBoard[index] === '' && gameActive) {
        cell.textContent = currentPlayer;
        cell.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 300);

        gameBoard[index] = currentPlayer;

        if (checkWinner()) {
            setTimeout(() => {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            }, 300);
        } else if (gameBoard.every(cell => cell !== '')) {
            setTimeout(() => {
                alert('It\'s a tie!');
                resetGame();
            }, 300);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
});

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination =>
        combination.every(index => gameBoard[index] === currentPlayer)
    );
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';

    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.transform = 'scale(1)';
    });
}
