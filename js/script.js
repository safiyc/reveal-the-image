// gridBox-> height is 400px, width is 400px
// need to create function to randomize image & radio btn options
const gridBox = document.querySelector(".grid-box");
const normal = document.querySelector("#normal");
const hard = document.querySelector("#hard");

let gridSize = 16;
let timer = 5;
let score = 100;
let row;
let column;
let columns;

gridBox.style.backgroundImage = "url('./img/soccerball.jpg')";
document.getElementById("timer").textContent = timer;
document.getElementById("score").textContent = score;

// timer
let timerCountDown = setInterval(function () {
    timer--;
    score--;
    document.getElementById("timer").textContent = timer;
    document.getElementById("score").textContent = score;

    if (timer <= 0) {
        columns.forEach(function (column) {
            column.disabled = true;
        });
    }
}, 1000);

// difficulty options
normal.addEventListener("click", function () {
    resetIt();
    gridSize = 16;
    createGrid(gridSize);
});
hard.addEventListener("click", function () {
    resetIt();
    gridSize = 24;
    createGrid(gridSize);
})

function createGrid (gridSize) {
    for (let i = 1; i < (gridSize + 1); i++) {
        row = document.createElement("div");
        gridBox.appendChild(row);
        row.classList.add("rows");
        row.setAttribute("style", `height: ${400 / gridSize}px`);
        row.setAttribute("id", i);
        
        for (let j = 1; j < (gridSize + 1); j++) {
            column = document.createElement("button");
            row.appendChild(column);
            column.classList.add("column-btns");
            column.setAttribute("style", `width: ${400 / gridSize}px`);
            column.setAttribute("value", "1");
        }
    }
    breakBlock();
}

// click block to reduce opacity; score is reduced
function breakBlock () {
    columns = document.querySelectorAll(".column-btns");
    columns.forEach(function (column) {
        column.addEventListener("click", function () {
            if (column.getAttribute("value") === "1") {
                column.setAttribute("value", "2");
                column.style.background = "radial-gradient(rgba(0, 255, 0, .35), rgba(0, 255, 0, .45), rgba(0, 255, 0, .85) 65%)";
                score -= 2;
            } else if (column.getAttribute("value") === "2") {
                column.setAttribute("value", "3");
                column.style.background = "rgba(0, 255, 0, 0)";
                score -= 3;
            } else if (column.getAttribute("value") === "3") {
                return;
            }
        });
    });
}

// reset timer, score, and blocks to green
function resetIt () {
    while (gridBox.hasChildNodes()) {
        gridBox.removeChild(gridBox.firstChild);
    }

    timer = 5;
    score = 100;
    document.getElementById("timer").textContent = timer;
    document.getElementById("score").textContent = score;
}

createGrid(gridSize);