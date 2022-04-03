const gameStatus = document.querySelector(".game_status");
let gameActive = true; //used to pause the game in case of an end scenario
let currentPlayer = 'X'; //store our current player here
let gameState = ["", "", "", "", "", "", "", "", ""]; //We will store our current game state here 
//the form of empty strings in an array will allow us to track played cells and validate the game state later on


// Declare the messages to display during the game and when the game ends.
//They can't be hardcoded because they depend on which player has won
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

gameStatus.innerHTML = currentPlayerTurn(); //message to let the players know whose turn it is

// update the game array and the UI
function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function playerChange() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer ='X';
    }
    gameStatus.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function resultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        gameStatus.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes(""); // after checking that no one has won we check if there are any empty values in the array
    // if there are no empty slots and no one has won then its a draw
    if (roundDraw) {
        gameStatus.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    // if we reach this point then it means the game continues so we switch to the other player
    playerChange();
}

// function to check if the cell that the player chooses is already clicked 
function cellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);
    // if the cell is not empty or the game is paused it does nothing
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
}

// in the restart function we bring the hole game back to the default settings we had at the start
function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerHTML = currentPlayer;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.game_restart').addEventListener('click', restartGame);
