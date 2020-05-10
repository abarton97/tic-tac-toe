let playerTurn = true;
let computerTurn = false;
let winner = false;
let counter = 0;

const reset = document.querySelector(".reset");
const cells = document.querySelectorAll(".cell")
const leftPlayer = document.querySelector(".leftPlayer");
const rightPlayer = document.querySelector(".rightPlayer")

const save = document.getElementById("player-form")

function Name(playerOne, playerTwo) {
    this.playerOne = save.playerOne.value,
        this.playerTwo = save.playerTwo.value
}

function playGame() {
    getNames();
    let userInput = new Name(playerOne, playerTwo);
    cells.forEach((cell) => {
        cell.addEventListener("click", function (e) {
            if (playerTurn && winner == false && leftPlayer.innerHTML != "") {
                if (cell.textContent == "X" || cell.textContent == "O") {
                    alert("Space Taken, Please choose again.")
                } else {
                    cell.textContent = "X";
                    cell.style.color = "white";
                    playerTurn = false
                    computerTurn = true;
                    counter++;
                }
            } else if (computerTurn && winner == false && rightPlayer.innerHTML != "") {
                if (cell.textContent == "X" || cell.textContent == "O") {
                    alert("Space Taken, Please choose again.")
                } else {
                    cell.textContent = "O";
                    cell.style.color = "white";
                    playerTurn = true
                    computerTurn = false;
                    counter++;
                }
            }
            declareWinner();
        });
    });
}

function getNames() {
    let timer = setInterval(() => {
        let userInput = new Name(playerOne, playerTwo);
        if (userInput.playerOne.length <= 0 && userInput.playerTwo.length <= 0) {
            modal.style.display = "block";
            document.getElementById("btnSave").addEventListener("click", e => {
                let userInput = new Name(playerOne, playerTwo);
                document.querySelector(".leftPlayer").innerHTML = userInput.playerOne;
                document.querySelector(".rightPlayer").innerHTML = userInput.playerTwo;
                modal.style.display = "none";
            });
        } else {
            clearInterval(timer)
        }
    }, 1000);
}

function checkX(value) {
    return value == "X";
}

function checkO(value) {
    return value == "O";
}

function declareWinner() {
    console.log(cells[0].innerHTML)
    var combos = {
        0: [[0], [1], [2]],
        1: [cells[3].textContent, cells[4].textContent, cells[5].textContent],
        2: [cells[6].textContent, cells[7].textContent, cells[8].textContent],

        3: [cells[0].textContent, cells[3].textContent, cells[6].textContent],
        4: [cells[1].textContent, cells[4].textContent, cells[7].textContent],
        5: [cells[2].textContent, cells[5].textContent, cells[6].textContent],

        6: [cells[0].textContent, cells[4].textContent, cells[8].textContent],
        7: [cells[2].textContent, cells[4].textContent, cells[6].textContent],
    };
    for (i = 0; i < 8; i++) {
        if (combos[i].every(checkX)) {
            winner = true;
            alert(`${document.querySelector(".leftPlayer").innerHTML} Wins!`)
        }
    }
    for (i = 0; i < 8; i++) {
        if (combos[i].every(checkO)) {
            winner = true;
            alert(`${document.querySelector(".rightPlayer").innerHTML} Wins!`)
        }
    }
    if (counter == 9 && winner == false) {
        computerTurn = false;
        alert("TIE")
    }
}

function resetGame() {
    playerTurn = true;
    computerTurn = false;
    winner = false;
    counter = 0;
    for (i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }
}

/*
Modal
*/

var saveBtn = document.getElementById("btnSave");

var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/*
Color Changing Tic-Tac-Toe Text
*/

function changeColor() {
    const textElement = document.querySelector(".gameText");
    setInterval(() => {
        textElement.style.color = getRandomColor();
        if (playerTurn && winner == false) {
            leftPlayer.style.color = getRandomColor();
            rightPlayer.style.color = "white";
        } else if (computerTurn && winner == false) {
            rightPlayer.style.color = getRandomColor();
            leftPlayer.style.color = "white";
        } else {
            rightPlayer.style.color = "white";
            leftPlayer.style.color = "white";
        }

    }, 500);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const resetBoard = document.querySelectorAll(".reset");
resetBoard.forEach((operator) => operator.addEventListener("click", resetGame));

playGame();
changeColor();