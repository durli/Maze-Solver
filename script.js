var rowSize = 40;
var colSize = 80;

var cellSize = '20px';

var takeInput = false;

function createMaze() {

    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < colSize; j++) {
            let coord = [i, j];

            let newCell = $('<div></div>', {
                class: 'cell',
                "data-x": i,
                "data-y": j
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
        this.classList.toggle('blockedCell');
    }

    function B() {
        let cellHovered = this.getAttribute('data-cell');
        if (takeInput === true) {
            this.classList.add('blockedCell');
        }
    }

    function C() {
        takeInput = true;
    }

    function D() {
        takeInput = false;
    }

    var cells = document.querySelectorAll('.cell');

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
    var cells = document.querySelectorAll('.cell');

    function A() {
        let prevSrc = $('.srcCell');
        prevSrc.removeClass('srcCell'); //Remove older src cell
        prevSrc.removeClass('blockedCell');
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
    var cells = document.querySelectorAll('.cell');

    function A() {
        let prevDest = $('.destCell');
        prevDest.removeClass('destCell'); //Remove older dest cell
        prevDest.removeClass('blockedCell');
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
    takeInput = false;
    if (optionSelected == 'block') {
        chooseBlockedCells();
    } else if (optionSelected == 'src') {
        chooseSourceCell();
    } else if (optionSelected == 'dest') {
        chooseDestinationCell();
    }
});