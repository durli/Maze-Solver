var rowSize = 50;
var colSize = 80;

var cellSize = '20px';

var takeInput = false;

function getNum(coord, row, col) {
    let x = coord[0];
    let y = coord[1];
    let num = x * col + y;
    return num;
}

function createMaze() {

    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < colSize; j++) {
            let coord = [i, j];
            let num = getNum(coord, rowSize, colSize);

            let newCell = $('<div></div>', {
                class: 'cell',
                "data-cell": num
            });
            newCell.appendTo('#maze');
        }
    }

    let rowStr = 'repeat(' + rowSize + ", " + cellSize + ")";
    let colStr = 'repeat(' + colSize + ", " + cellSize + ")";
    $('#maze').css({
        gridTemplateColumns: colStr,
        gridTemplateRows: rowStr
    });
}

createMaze();

function chooseBlockedCells() {
    function A() {
        console.log("cell clicked...");
        this.classList.toggle('blockedCell');
    }

    function B() {
        console.log("cell hovered");
        let cellHovered = this.getAttribute('data-cell');
        if (takeInput === true) {
            this.classList.add('blockedCell');
        }
    }

    function C() {
        console.log("mouse down");
        takeInput = true;
    }

    function D() {
        console.log("mouse up");
        takeInput = false;
    }

    var cells = document.querySelectorAll('.cell');
    // console.log(cells);

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.addEventListener('click', A);
        cell.addEventListener('mouseover', B);
        cell.addEventListener('mousedown', C);
        cell.addEventListener('mouseup', D);
    }

    $('#cellType').on('click', function () {
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.removeEventListener('click', A);
            cell.removeEventListener('mouseover', B);
            cell.removeEventListener('mousedown', C);
            cell.removeEventListener('mouseup', D);
        }
        return;
    });
}

function chooseSourceCell() {
    console.log("src: Hello!!");

    var cells = document.querySelectorAll('.cell');
    console.log(cells);

    function A() {
        let prevSrc = $('.srcCell');
        prevSrc.removeClass('srcCell'); //Remove older src cell
        prevSrc.removeClass('blockedCell'); //Remove older src cell
        this.classList.add('srcCell');
    }

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.addEventListener('click', A);
    }

    $('#cellType').on('click', function () {
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.removeEventListener('click', A);
        }
        return;
    });
}

function chooseDestinationCell() {
    console.log("dest: Hello!!");

    var cells = document.querySelectorAll('.cell');
    console.log(cells);

    function A() {
        let prevDest = $('.destCell');
        prevDest.removeClass('destCell'); //Remove older src cell
        prevDest.removeClass('blockedCell'); //Remove older src cell
        this.classList.add('destCell');
    }

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.addEventListener('click', A);
    }

    $('#cellType').on('click', function () {
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.removeEventListener('click', A);
        }
        return;
    });
}


$('#cellType').on('click', function () {
    let optionSelected = $('#cellType').val();
    console.log("option = ", optionSelected);
    takeInput = false;
    if (optionSelected == 'block') {
        chooseBlockedCells();
    } else if (optionSelected == 'src') {
        chooseSourceCell();
    } else if (optionSelected == 'dest') {
        chooseDestinationCell();
    }
});