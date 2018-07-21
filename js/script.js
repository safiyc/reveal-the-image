// gridBox-> height is 400px, width is 400px
const gridBox = document.querySelector(".grid-box");
// need to create function to randomize image & radio btn options
gridBox.style.backgroundImage = "url('./img/soccerball.jpg')";

const normal = document.querySelector("#normal");
const hard = document.querySelector("#hard");
const reset = document.getElementById("reset");
// let score = document.getElementById("score");

let columns;
let row;
let column;
let gridSize = 16;
let levels;

let score = 100;
document.getElementById("score").innerHTML = score;


// need to fix

levels = document.querySelectorAll(".levels");
levels.forEach(function (level) {
    level.addEventListener("click", function () {
        // resetIt();
        if (level.getAttribute("id") === "normal") {
            gridSize = 16;
        } else if (level.getAttribute("id") === "hard") {
            gridSize = 24;
        } else if (level.getAttribute("id") === "reset") {
            gridSize = 16;
        }
        // createGrid();
    });
});

function createGrid () {
    // resetIt();
    for (let i = 1; i < (gridSize + 1); i++) {
        row = document.createElement("div");
        gridBox.appendChild(row);
        row.classList.add("rows");
        row.setAttribute("style", `height: ${400 / gridSize}px`);
        row.setAttribute("id", i);
        
        for (let j = 1; j < (gridSize + 1); j++) {
            column = document.createElement("div");
            row.appendChild(column);
            column.classList.add("columns");
            column.setAttribute("style", `width: ${400 / gridSize}px`);
            column.setAttribute("id", `${i}-${j}`);
            column.setAttribute("value", "1");
        }
    }
    console.log(gridBox);
    breakBlock();
}

createGrid();

// click div to make transparent; score is reduced
function breakBlock () {
    columns = document.querySelectorAll(".columns");
    columns.forEach(function (column) {
        column.addEventListener("click", function () {
            if (column.getAttribute("value") === "1") {
                column.setAttribute("value", "2");
                column.style.background = "radial-gradient(rgba(0, 255, 0, .35), rgba(0, 255, 0, .45), rgba(0, 255, 0, .85) 65%)";
                score -= 2;
            } else if (column.getAttribute("value") === "2") {
                column.setAttribute("value", "3");
                column.style.background = "rgba(0, 255, 0, 0)";
                score -= 4;
            } else if (column.getAttribute("value") === "3") {
                return;
            }
            document.getElementById("score").innerHTML = score;
        });
    });
}

// to reset blocks to green and score to 100
function resetIt () {
    while (gridBox.hasChildNodes()) {
        gridBox.removeChild(gridBox.firstChild);
    }

    score = 100;
    document.getElementById("score").innerHTML = score;

    createGrid();
}

reset.addEventListener("click", function () {
    resetIt();
});