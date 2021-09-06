//rowSize, colSize, cellSize are global variables defined in script.js

"use strict";

function showPath(path) {
    for (let i = 0; i < path.length; i++) {
        let coord = path[i];
        let x = coord[0];
        let y = coord[1];
        let query = ".cell[data-x=" + "'" + x + "'" + "][data-y=" + "'" + y + "'" + "]";
        let cell = $(query);
        cell.addClass('pathCell');
    }
}

function getPath(parent, node) {
    let temp = node;
    let path = new Array();
    while (temp !== null && temp !== undefined && parent[temp] !== temp) {
        path.unshift(temp);
        temp = parent[temp];
    }
    path.unshift(temp);
    return path;
}

function bfs(startNode, targetNode, blockedList) {
    var src = startNode;
    var dest = targetNode;

    var visited = new Array();  //visited[i] = {-1, 1, undefined}. Here -1 means it is blocked. 1 means it is already visited.

    for (let i = 0; i < blockedList.length; i++) {
        let blockedNode = blockedList[i];
        visited[blockedNode] = -1;
    }

    var parent = new Array();

    var queue = new Array();
    queue.push(src);

    var arr = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function isValid(coord) {
        let x = coord[0];
        let y = coord[1];
        if (x >= 0 && x < rowSize && y >= 0 && y < colSize) {
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
            if (fr[0] == dest[0] && fr[1] == dest[1]) { //target node is found
                flag = true;
                break;
            }

            queue.shift();  //popping the front element

            //Visit the neighbors of 'fr' node
            for (let i = 0; i < arr.length; i++) {
                let x = parseInt(fr[0] + arr[i][0]);
                let y = parseInt(fr[1] + arr[i][1]);
                let nbr = [x, y];

                if (isValid(nbr) == true && visited[nbr] !== 1 && visited[nbr] !== -1) {
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
        var path = getPath(parent, dest);
        showPath(path);
        return cnt;
    } else {
        console.log("target node cannot be reached.");
        alert("Target cell cannot be reached!.");
        return -1;
    }
}

function fetchBlockedCells() {
    var list = new Array();
    var cells = document.getElementsByClassName('blockedCell');
    for (let i = 0; i < cells.length; i++) {
        let x = parseInt(cells[i].getAttribute('data-x'));
        let y = parseInt(cells[i].getAttribute("data-y"));
        let coord = [x, y];
        list.push(coord);
    }
    return list;
}

function fetchStartNode() {
    let cell = document.getElementsByClassName('srcCell')[0];
    let x = parseInt(cell.getAttribute('data-x'));
    let y = parseInt(cell.getAttribute('data-y'));
    let coord = [x, y];
    return coord;
}

function fetchEndNode() {
    let cell = document.getElementsByClassName('destCell')[0];
    let x = parseInt(cell.getAttribute('data-x'));
    let y = parseInt(cell.getAttribute('data-y'));
    let coord = [x, y];
    return coord;
}

$("#submit-btn").click(function () {
    $('.pathCell').removeClass('pathCell');
    var blockedCells = fetchBlockedCells(); //It contains list of all blocked cells
    var startNode = fetchStartNode();
    var targetNode = fetchEndNode();

    if (startNode[0] != undefined && startNode[1] != undefined && targetNode[0] != undefined && targetNode[1] != undefined) {
        var res = bfs(startNode, targetNode, blockedCells);
        console.log("shortest path = ", res);
    } else {
        alert("Select source and destination nodes!!");
    }
});



