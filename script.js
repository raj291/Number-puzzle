document.addEventListener("DOMContentLoaded", randomizeTable);
let timerValue = 0;
const timerElement = document.getElementById("timer");

const timerInterval = setInterval(function() {
    timerValue++;
    timerElement.textContent = timerValue;
}, 1000);

function randomizeTable() {
    var tableCells = document.querySelectorAll('#numberTable td');
    var numbers = [];
    for (var i = 1; i <= 15; i++) {
        numbers.push(i);
    }
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        var temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
    }
    const emptyCellIndex = Math.floor(Math.random() * numbers.length);
    numbers.splice(emptyCellIndex, 0, null);
    
    var moves = 0; 

    for (let index = 0; index < tableCells.length; index++) {
        let cell = tableCells[index];
        cell.textContent = numbers[index] !== null ? numbers[index] : '';
        
        cell.onclick = function() {
            if (cell.textContent !== '') {
                cell.classList.add('selected');
                moves++; // Increment move count
                document.getElementById('move-counter').textContent = moves;
                setTimeout(() => {
                    const emptyCell = document.querySelector('#numberTable td:empty');
                    emptyCell.textContent = cell.textContent;
                    cell.textContent = '';
                    cell.classList.remove('selected');
    
                    if (checkAscendingOrder(tableCells)) {
                        clearInterval(timerInterval);
                        alert("Congratulations! You have solved the puzzle in " + moves + " moves.");
                    }
                }, 500); 
            }
        };
    }
}

function checkAscendingOrder(cells) {
    var numbers = Array.from(cells, cell => parseInt(cell.textContent)).filter(num => !isNaN(num));
    for (var i = 1; i <= 15; i++) {
        if (numbers[i - 1] !== i) {
            return false;
        }
    }
    return true;
}
function createSimpleGame() {
    var tableCells = document.querySelectorAll('#numberTable td');
    var numbers = Array.from({ length: 15 }, (_, index) => index + 1);
    const lastNumber = numbers.pop();
    for (let index = 0; index < tableCells.length - 1; index++) {
        let cell = tableCells[index];
        cell.textContent = numbers[index];
        cell.onclick = function() {
            if (cell.textContent !== '') {
                cell.classList.add('selected');
                setTimeout(() => {
                    const emptyCell = document.querySelector('#numberTable td:empty');
                    emptyCell.textContent = cell.textContent;
                    cell.textContent = '';
                    cell.classList.remove('selected');
                    if (checkAscendingOrder(tableCells)) {
                        clearInterval(timerInterval);
                        alert("Congratulations! You have solved the puzzle");
                    }
                }, 500); 
            }
        };
    }
    const lastCell = tableCells[tableCells.length - 1];
    lastCell.textContent = '';
    lastCell.textContent = lastNumber;
}


