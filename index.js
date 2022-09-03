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
    if (num == 1) {
        return 0;
    }
    if (num == 2) {
        return 1;
    }
    if (num == 3) {
        return 2;
    }
    if (num == 4) {
        return 3;
    }
    if (num == 5) {
        return 4;
    }
    if (num == 6) {
        return 5;
    }
    if (num == 7) {
        return 6;
    }
    if (num == 8) {
        return 7;
    }
    if (num == 9) {
        return 8;
    }
}

function findRow(num) {
    if (num >= 1 && num <= 9) {
        return 0;
    }
    if (num >= 10 && num <= 18) {
        return 1;
    }
    if (num >= 19 && num <= 27) {
        return 2;
    }
    if (num >= 28 && num <= 36) {
        return 3;
    }
    if (num >= 37 && num <= 45) {
        return 4;
    }
    if (num >= 46 && num <= 54) {
        return 5;
    }
    if (num >= 55 && num <= 63) {
        return 6;
    }
    if (num >= 64 && num <= 72) {
        return 7;
    }
    if (num >= 73 && num <= 81) {
        return 8;
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

var p = 0, r = 0, c = 0, p2 = 0;

function getNumber(cellId) {
    p2 = p;
    p = cellId;
    document.getElementById(p).style.background='#9f4722';
    r = findRow(p);
    c = findColumn(p);
    document.getElementById("paragraph").innerHTML = "";
    document.getElementById(p2).style.background='rgb(200, 198, 52)';
}

function verifyColumn(num, col) {
    var equalNumbers = 0;
    for (var i = 0; i < 9; ++i) {
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
    var equalNumbers = 0;
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

function verifySquare(num, row, col) {
    let starting_line, starting_column, end_line, end_column;
    if (row <= 2 && col <= 2) {
        starting_line = 0;
        starting_column = 0;
        end_line = 2;
        end_column = 2;
    } else if (row <= 2 && col >= 3 && col <= 5) {
        starting_line = 0;
        starting_column = 3;
        end_line = 2;
        end_column = 5;
    } else if (row <= 2 && col > 5) {
        starting_line = 0;
        starting_column = 6;
        end_line = 2;
        end_column = 8;
    } else if (row >= 3 && row <= 5 && col <= 2) {
        starting_line = 3;
        starting_column = 0;
        end_line = 5;
        end_column = 2;
    } else if (row >= 3 && row <= 5 && col >= 3 && col <= 5) {
        starting_line = 3;
        starting_column = 3;
        end_line = 5;
        end_column = 5;
    } else if (row >= 3 && row <= 5 && col > 5) {
        starting_line = 3;
        starting_column = 6;
        end_line = 5;
        end_column = 8;
    } else if (row > 5 && col <= 2) {
        starting_line = 6;
        starting_column = 0;
        end_line = 8;
        end_column = 2;
    } else if (row > 5 && col >= 3 && col <= 5) {
        starting_line = 6;
        starting_column = 3;
        end_line = 8;
        end_column = 5;
    } else if (row > 5 && col > 5) {
        starting_line = 6;
        starting_column = 6;
        end_line = 8;
        end_column = 8;
    }
    var equal_numbers = 0;
    for (let i = starting_line; i <= end_line; ++i) {
        for (let j = starting_column; j <= end_column; ++j) {
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
    if (verifyColumn(num, c) == true && verifyRow(num, r) == true && verifySquare(num, r, c) == true) {
        document.getElementById(p).innerHTML = num;
        matrix[r][c] = num;
        document.getElementById(p).style.background='rgb(200, 198, 52)';
        document.getElementById("paragraph").innerHTML = "";
        checkWinner();
        p = 0;
        r = 0;
        c = 0;
    } else {
        document.getElementById("paragraph").innerHTML = "Wrong move :(";
    }
}

function createSudoku() {
    for (let i = 1; i <= 40; ++i) {
        var x = 0, y = 0;
        var myId =  Math.floor(Math.random() * 81 + 1);
        x = findRow(myId);
        y = findColumn(myId);
        while (matrix[x][y] == -1) {
            var myNum = Math.floor(Math.random() * 9 + 1);
            if (verifySquare(myNum, x, y) == true && verifyRow(myNum, x) == true && verifyColumn(myNum, y) == true) {
                document.getElementById(myId).innerHTML = myNum;
                matrix[x][y] = myNum;
            }
        }
    }
}

document.getElementById("btn").onclick = function() {
    createSudoku();
    btn.style.display = 'none';
}

