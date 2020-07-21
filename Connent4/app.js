// Selectors

var tableRow = document.getElementsByTagName("tr");
var tableData = document.getElementsByTagName("td");
var tableCell = document.querySelectorAll(".cell");

const playerTurn = document.querySelector(".player-turn");
const reset = document.querySelector(".reset");


// Function for selector table cell coordinaties (form 0,0 to 5,6)
for (let i = 0; i < tableData.length; i++) {
    tableData[i].addEventListener('click', (e) => {
        console.log(`${e.currentTarget.parentElement.rowIndex}, ${e.target.cellIndex}`);
    });
};


// Creating player names and assign colours
while (!player1) {
    var player1 = prompt("Player One: ");
};

player1Color = 'red';

while (!player2) {
    var player2 = prompt("Player Two: ");
};

player2Color = 'yellow';

var currentPlayer = 1;
// States player's turn
playerTurn.textContent = `${player1}'s first turn!`;

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = "white";
});

// main game function
// changes color of table cell based on player color and switches turn

function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    // start with i = 5 to check for buttom row first
    for (let i = 5; i >= 0; i--) {
        if (tableRow[i].children[column].style.backgroundColor == 'white') {
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                if (horizontalWin() || verticalWin() || diagonalWin() || diagonalWin2()) {
                    playerTurn.textContent = `${player1} WINS!`;
                    playerTurn.style.color = player1Color;

                    return alert(`${player1} WINS!`);

                } else if (draw()) {
                    playerTurn.textContent = 'Game is a Draw!';
                    return alert('DRAW');
                } else {
                    playerTurn.textContent = `${player2}'s turn!`
                    return currentPlayer = 2;
                }




            } else {
                row[0].style.backgroundColor = player2Color;
                if (horizontalWin() || verticalWin() || diagonalWin() || diagonalWin2()) {
                    playerTurn.textContent = `${player2} WINS!`;
                    playerTurn.style.color = player2Color;

                    return alert(`${player2} WINS!`);

                } else if (draw()) {
                    playerTurn.textContent = 'Game is a Draw!';
                    return alert('DRAW');
                } else {
                    playerTurn.textContent = `${player1}'s turn!`;
                    return currentPlayer = 1;
                }

                
            }
        }
    }
}

// Checks if 4 cells (arguments) have the same color
function checkColorMatch(one, two, three, four) {
    return (one === two && one === three && one === four && one !== "white");
}

// check if connecting columns in a row have same colour
// 4 ways to win horizontally (thus col < 4)
function horizontalWin() {
    for (let row = 0; row < tableRow.length; row++) {
        for (let col = 0; col < 4; col++) {
            if (checkColorMatch(tableRow[row].children[col].style.backgroundColor,
            tableRow[row].children[col + 1].style.backgroundColor,
            tableRow[row].children[col + 2].style.backgroundColor,
            tableRow[row].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
};
// 3 ways to win vertically (thus row < 3)
function verticalWin() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (checkColorMatch(tableRow[row].children[col].style.backgroundColor,
                tableRow[row + 1].children[col].style.backgroundColor,
                tableRow[row + 2].children[col].style.backgroundColor,
                tableRow[row + 3].children[col].style.backgroundColor)) {
                return true;
            }
        }
    }
}

// From bottom left to upper right.
function diagonalWin() {
    for (let col = 0; col < 4; col++) {
        for (row = 0; row < 3; row++) {
            if (checkColorMatch(tableRow[row].children[col].style.backgroundColor,
                tableRow[row + 1].children[col + 1].style.backgroundColor,
                tableRow[row + 2].children[col + 2].style.backgroundColor,
                tableRow[row + 2].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}
 // From bottom right to upper left.
function diagonalWin2() {
    for (let col = 6; col > 2; col--) {
        for (row = 5; row > 2; row--) {
            if (checkColorMatch(
                tableRow[row].children[col].style.backgroundColor,
                tableRow[row - 1].children[col - 1].style.backgroundColor,
                tableRow[row - 2].children[col - 2].style.backgroundColor,
                tableRow[row - 3].children[col - 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function draw() {
    let fullGrid = [];
    for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].style.backgroundColor !== 'white') {
            fullGrid.push(tableData[i]);
        }
        
    }
    if (fullGrid.length === tableData.length) {
        return true;
    }
    return false;
};

reset.addEventListener('click', () => {
    tableCell.forEach(gridCell => {
        gridCell.style.backgroundColor = 'white';

    });
    playerTurn.style.color = 'black';
    playerTurn.textContent = `${player1}'s turn!`;
});