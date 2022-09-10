const matrix = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1]
]

function findColumn(num) {
    while (num > 9) {
        num -= 9;
    }
    for (let i = 1; i <= 9; ++i) {
        if (num == i) {
            return i - 1;
        }
    }
}

function findRow(num) {
    let firstNumber = 1, lastNumber = 9, ok = 0, number = 0;
    while (ok == 0) {
        if (num >= firstNumber && num <= lastNumber) {
            return number;
        } else {
            ++number;
            firstNumber += 9;
            lastNumber += 9;
        }
    }
}

function checkWinner() {
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (matrix[i][j] == -1) {
                return 0;
            }
        }
    }
    document.getElementById("paragraph").innerHTML = "Congratulations!";
    return 1;
}

let currentCell = 0, currentRow = 0, currentColumn = 0, previousCell = 0;

function getNumber(cellId) {
    previousCell = currentCell;
    currentCell = cellId;
    document.getElementById(currentCell).style.background='#9f4722';
    currentRow = findRow(currentCell);
    currentColumn = findColumn(currentCell);
    document.getElementById("paragraph").innerHTML = "";
    document.getElementById(previousCell).style.background='rgb(200, 198, 52)';
}

function verifyColumn(num, col) {
    let equalNumbers = 0;
    for (let i = 0; i < 9; ++i) {
        if (matrix[i][col] == num) {
            ++equalNumbers;
        }
    }
    if (equalNumbers > 0) {
        return false; //s a gasit, deci nu poate fi folosit
    }
    return true; //nu s a gasit, deci poate fi folosit
}

function verifyRow(num, row) {
    let equalNumbers = 0;
    for (let i = 0; i < 9; ++i) {
        if (matrix[row][i] == num) {
            ++equalNumbers;
        }
    }
    if (equalNumbers > 0) {
        return false; //s a gasit, deci nu poate fi folosit
    }
    return true; //nu s a gasit, deci poate fi folosit
}

function verifySquare(num, startingRow, startingColumn) {
    while (startingRow % 3 != 0) {
        --startingRow;
    }
    while (startingColumn % 3 != 0) {
        --startingColumn;
    }
    let equal_numbers = 0;
    for (let i = startingRow; i < startingRow + 3; ++i) {
        for (let j = startingColumn; j < startingColumn + 3; ++j) {
            if (matrix[i][j] == num) {
                ++equal_numbers;
            }
        }
    }
    if (equal_numbers > 0) {
        return false; //se gaseste numarul in patratul resp, deci nu poate fi folosit
    }
    return true; //nu se gaseste numarul, deci poate fi folosit
}

function insertNumber(num) {
    if (verifyColumn(num, currentColumn) == true && verifyRow(num, currentRow) == true && verifySquare(num, currentRow, currentColumn) == true) {
        document.getElementById(currentCell).innerHTML = num;
        matrix[currentRow][currentColumn] = num;
        document.getElementById(currentCell).style.background='rgb(200, 198, 52)';
        document.getElementById("paragraph").innerHTML = "";
        checkWinner();
        currentCell = 0;
        currentRow = 0;
        currentColumn = 0;
    } else {
        if (currentCell != 0) {
            document.getElementById("paragraph").innerHTML = "Wrong move :(";
        }
    }
}

function generateSudoku() {
    for (let i = 1; i <= 40; ++i) {
        let x = 0, y = 0;
        let myId =  Math.floor(Math.random() * 81 + 1);
        x = findRow(myId);
        y = findColumn(myId);
        while (matrix[x][y] == -1) {
            let myNum = Math.floor(Math.random() * 9 + 1);
            if (verifySquare(myNum, x, y) == true && verifyRow(myNum, x) == true && verifyColumn(myNum, y) == true) {
                document.getElementById(myId).innerHTML = myNum;
                matrix[x][y] = myNum;
            }
        }
    }
}

document.getElementById("btn").onclick = function() {
    generateTable();
    btn.style.display = 'none';
}

let idNum = 1;

function generateTable() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    for (let i = 1; i <= 9; ++i) {
      const row = document.createElement("tr");
      for (let j = 1; j <= 9; ++j) {
        const cell = document.createElement("td");
        cell.id = idNum;
        let input = document.createElement('input');
        input.setAttribute('type', 'button');
        input.onclick = function(){getNumber(cell.id)};
        cell.appendChild(input);
        ++idNum;
        const cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    generateSudoku();
}