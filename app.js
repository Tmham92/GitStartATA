// Selectors

var tableRow = document.getElementsByTagName("tr");
var tableData = document.getElementsByTagName("td");
var tableCell = document.getElementsByClassName("cell");

const playerTurn = document.querySelector(".player-turn");
const reset = document.querySelector(".reset");

//var counterCol = [0, 0, 0, 0, 0, 0, 0];
//var baseColor = 0;

//function changeTableCell(col) {
//    var color;
//    if (baseColor == 0) {
//    color = 'yellow';
//        baseColor = 1;
//    } else {
//    color = 'red';
//        baseColor = 0;
//     }
//     document.getElementById("vakje" + col + "" + counterCol[col]).style.backgroundColor = color;
//    counterCol[col]++;
//}

//function createPlayerName(playerNumber) {
//    var playerName = document.getElementById("playerName" + playerNumber).value;
//    document.getElementById("playerName" + playerNumber + "Filled").innerHTML = playerName;
//}


// Function for selector table cell coordinaties (form 0,0 to 5,6)
for (let i = 0; i < tableData.length; i++) {
    tableData[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
    })
} 


// Creating player names and assign colours
while (!player1) {
    var player1 = prompt("Player One: ");
}

player1Color = 'red';

while (!player2) {
    var player2 = prompt("Player Two: ");
}

player1Color = 'yellow';

var currentPlayer = 1;
// States player's turn
playerTurn.textContent = `${player1}'s turn!`;

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = "white";
});

function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    // start with i = 5 to check for buttom row first
    for (let i = 5; i >= 0; i--) {
        if (tableRow[i].children[column].style.backgroundColor == 'white') {
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
            }
        }
    }
}

