// gridBox-> height is 400px, width is 400px
const gridBox = document.querySelector(".grid-box");
gridBox.style.backgroundImage = "url('./img/soccerball.jpg')";
let score = document.getElementById("score");

let columns;
let row;
let column;
let gridSize = 16;

score = 100;
document.getElementById("score").innerHTML = score;

// 16x16 grid
for (let i = 1; i < 17; i++) {
    row = document.createElement("div");
    gridBox.appendChild(row);
    row.classList.add("rows");
    row.setAttribute("style", `height: ${400 / gridSize}px`);
    row.setAttribute("id", i);
    
    for (let j = 1; j < 17; j++) {
        column = document.createElement("div");
        row.appendChild(column);
        column.classList.add("columns");
        column.setAttribute("style", `width: ${400 / gridSize}px`);
        column.setAttribute("id", `${i}-${j}`);
        column.setAttribute("value", "1");
    }
}

columns = document.querySelectorAll(".columns");

// click div to make transparent, reduce score
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

// to reset blocks to green and score to 100
const reset = document.getElementById("reset");
reset.addEventListener("click", function () {
    columns.forEach(function (column) {
        column.setAttribute("value", "1");
        column.style.background = "green";
    });
});