//rowSize, colSize, cellSize are global variables defined in script.js

"use strict";



function getCoord(num, row, col) {
    num = num - 1;
    let x = Math.floor(num / col);
    let y = Math.floor(num % col);
    let coord = [x, y];
    return coord;
}

function getNum(coord, row, col) {
    let x = coord[0];
    let y = coord[1];
    let num = x * col + y;
    return num;
}

function showPath(path, row, col) {
    for (let i = 0; i < path.length; i++) {
        let coord = path[i];
        let num = getNum(coord, row, col);
        console.log("num = ", num);
        let query = ".cell[data-cell=" + "'" + num + "'" + "]";
        console.log(query);
        let cell = $(query);
        cell.addClass('pathCell');
    }
}

function printPath(parent, node) {
    let temp = node;
    let path = new Array();
    while (temp !== null && temp !== undefined && parent[temp] !== temp) {
        path.unshift(temp);
        temp = parent[temp];
    }

    console.log("Path: ");
    for (let i = 0; i < path.length; i++) {
        console.log(path[i]);
    }
    return path;
}

function bfs(startNode, targetNode, row, col, blockedList) {
    var src = getCoord(startNode, row, col);
    console.log("src = ", src);
    var dest = getCoord(targetNode, row, col);
    console.log("dest = ", dest);

    var visited = new Array();  //visited[i] = {-1, 1, undefined}. Here -1 means it is blocked. 1 means it is already visited.

    for (let i = 0; i < blockedList.length; i++) {
        let blockedNode = getCoord(blockedList[i], row, col);
        visited[blockedNode] = -1;
    }

    var parent = new Array();

    var queue = new Array();
    queue.push(src);

    var arr = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function isValid(coord, row, col) {
        let x = coord[0];
        let y = coord[1];
        if (x >= 0 && x < row && y >= 0 && y < col) {
            return true;
        } else {
            return false;
        }
    }

    let cnt = 1;
    let flag = false;
    visited[src] = 1;
    parent[src] = src;

    while (queue.length != 0) {
        let size = queue.length;
        while (size--) {
            let fr = queue[0];
            // console.log("fr = ", fr);

            if (fr[0] == dest[0] && fr[1] == dest[1]) { //target node is found
                flag = true;
                break;
            }

            queue.shift();  //popping the front element

            //Visit the neighbors of 'fr' node
            for (let i = 0; i < arr.length; i++) {
                let x = fr[0] + arr[i][0];
                let y = fr[1] + arr[i][1];
                let nbr = [x, y];

                if (isValid(nbr, row, col) === true && visited[nbr] !== 1 && visited[nbr] !== -1) {
                    //Mark 'nbr' node as visited
                    visited[nbr] = 1;
                    queue.push(nbr);
                    parent[nbr] = fr;
                }
            }
        }
        if (flag == true) {
            break;
        }
        cnt++;
    }
    if (flag == true) {
        var path = printPath(parent, dest);
        showPath(path, row, col);
        return cnt;
    } else {
        console.log("target node cannot be reached.");
        return -1;
    }
}

function fetchBlockedCells() {
    var list = new Array();
    var cells = document.getElementsByClassName('blockedCell');
    for (let i = 0; i < cells.length; i++) {
        let num = cells[i].getAttribute('data-cell');
        list.push(parseInt(num));
    }
    console.log(list);
    return list;
}

function fetchStartNode() {
    let cell = document.getElementsByClassName('srcCell')[0];
    let num = parseInt(cell.getAttribute('data-cell'));
    // let coord = getCoord(num, rowSize, colSize);
    console.log("coord = ", num);
    return num;
}

function fetchEndNode() {
    let cell = document.getElementsByClassName('destCell')[0];
    let num = parseInt(cell.getAttribute('data-cell'));
    // let coord = getCoord(num, rowSize, colSize);
    console.log("coord = ", num);
    return num;
}
// var list = [6, 7, 8, 9, 17, 18, 19, 20];    //list of all the blocked nodes
$("#submit-btn").click(function () {
    console.log("Button Pressed");
    $('.pathCell').removeClass('pathCell');
    var blockedCells = fetchBlockedCells();
    var startNode = fetchStartNode();  //1-based indexing
    var targetNode = fetchEndNode();

    if (startNode != undefined && targetNode != undefined) {
        var res = bfs(startNode, targetNode, rowSize, colSize, blockedCells);
        console.log("shortest path = ", res);
    }
});



