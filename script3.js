document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const winningMessageElement = document.getElementById('winningMessage');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    const restartButton = document.getElementById('restartButton');
    const aiButton = document.getElementById('aiButton');
    const turnBoxes = document.querySelectorAll('.turn-box');
    const bg = document.querySelector('.bg');

    let isOTurn = false;
    let isAgainstAI = false; // Flag to determine if playing against AI
    const aiPlayer = 'o'; // AI is O, player is X

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function startGame() {
        isOTurn = false;
        cells.forEach(cell => {
            cell.classList.remove('x');
            cell.classList.remove('o');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setBoardHoverClass();
        winningMessageElement.classList.remove('show');
        if (isAgainstAI && isOTurn) {
            handleAIMove();
        }
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = isOTurn ? 'o' : 'x';
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            if (isAgainstAI && !isOTurn) {
                handleAIMove();
            } else {
                swapTurns();
                setBoardHoverClass();
            }
        }
    }

    function handleAIMove() {
        // Simple AI logic: Randomly choose an empty cell
        const emptyCells = [...cells].filter(cell => !cell.classList.contains('x') && !cell.classList.contains('o'));
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (randomCell) {
            placeMark(randomCell, aiPlayer);
            if (checkWin(aiPlayer)) {
                endGame(false);
            } else if (isDraw()) {
                endGame(true);
            } else {
                swapTurns();
                setBoardHoverClass();
            }
        }
    }

    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = 'Draw!';
        } else {
            winningMessageTextElement.innerText = `${isOTurn ? "O's" : "X's"} Wins!`;
        }
        winningMessageElement.classList.add('show');
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('o');
        });
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        isOTurn = !isOTurn;
        updateTurnIndicator();
    }

    function setBoardHoverClass() {
        board.classList.remove('x');
        board.classList.remove('o');
        if (isOTurn) {
            board.classList.add('x');
        } else {
            board.classList.add('o');
        }
    }

    function checkWin(currentClass) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }

    function updateTurnIndicator() {
        if (isOTurn) {
            bg.style.transform = 'translateX(-50%)';
        } else {
            bg.style.transform = 'translateX(50%)';
        }
    }

    restartButton.addEventListener('click', startGame);
    aiButton.addEventListener('click', () => {
        isAgainstAI = true;
        startGame();
    });

    startGame();
});
