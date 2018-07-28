// not a good thing to have these global variables; not secure

// gridBox-> 400px by 400px
const gridBox = document.querySelector(".grid-box");
const normal = document.querySelector("#normal");
const hard = document.querySelector("#hard");

let g = 16   // blocks in square grid
let t = 10;   // time in seconds
let s = 500;   // score
let gridSize = g;
let timeAmount = t;
let score = s;
let timer;
let columns;
let randomImgNum;

// create grid; default 16x16 blocks
function createGrid (gridSize) {
    let row;
    let column;

    for (let i = 1; i < (gridSize + 1); i++) {
        row = document.createElement("div");
        gridBox.appendChild(row);
        row.classList.add("rows");
        row.setAttribute("style", `height: ${400/gridSize}px`);
        
        for (let j = 1; j < (gridSize + 1); j++) {
            column = document.createElement("button");
            row.appendChild(column);
            column.classList.add("column-btns");
            column.setAttribute("style", `width: ${400/gridSize}px`);
            column.setAttribute("value", "1");
        }
    }

    document.getElementById("time-amount").textContent = timeAmount;
    document.getElementById("score").textContent = score;

    randomizeImg();
    linkImgToAnswer();
    breakBlock();
}

// randomize gridBox bg img and return value of img
function randomizeImg () {
    randomImgNum = Math.floor(Math.random() * 3) + 1;

    switch(randomImgNum) {
        case 1:
            alert("1 - ball");
            gridBox.style.backgroundImage = "url('./img/soccerball.jpg')";
            break;
        case 2:
            alert("2 - rock");
            gridBox.style.backgroundImage = "url('./img/rock.png')";
            break;
        case 3:
            alert("3 - disc");
            gridBox.style.backgroundImage = "url('./img/frisbees.jpg')";
    }
}

// compare answer to img and display outcome
function linkImgToAnswer () {
    let answerBtns = document.querySelectorAll(".answer");

    for (let i = 0; i < answerBtns.length; i++) {
        answerBtns[i].addEventListener("click", function () {
            if (answerBtns[i].getAttribute("value") == randomImgNum) {
                console.log("correct match: ", randomImgNum);
                // need to display win message
                // need to reveal img

                // implement localstorage to save score?
            } else {
                score -= 50;
                console.log("incorrect match");
                // when to display lose message? When score to 0? After all answers are clicked?
            }
            document.getElementById("score").textContent = score;
        });
    }
}

// click block to reduce opacity; score is reduced
function breakBlock () {
    columns = document.querySelectorAll(".column-btns");

    for (let i = 0; i < columns.length; i++) {
        columns[i].addEventListener("click", function () {
            if (columns[i].getAttribute("value") === "1") {
                columns[i].setAttribute("value", "2");
                columns[i].style.background = "radial-gradient(rgba(0, 255, 0, .45), rgba(0, 255, 0, .55), rgba(0, 255, 0, .75) 85%)";
                score -= 2;
            } else if (columns[i].getAttribute("value") === "2") {
                columns[i].setAttribute("value", "3");
                columns[i].style.background = "rgba(0, 255, 0, 0)";
                score -= 3;
            } else if (columns[i].getAttribute("value") === "3") {
                return;
            }

            document.getElementById("time-amount").textContent = timeAmount;
            document.getElementById("score").textContent = score;

            startTimer();
        });
    }
}

// timer stops and resets when clicking on difficulty btns
function stopTimer () {
    clearInterval(timer);
}

// timer starts when score hits 98 (first block click)
function startTimer () {
    if (score === (s-2)) {
        timer = setInterval(function () {
            timeAmount--;
            score--;

            document.getElementById("time-amount").textContent = timeAmount;
            document.getElementById("score").textContent = score;
            
            if (timeAmount <= 0) {
                columns.forEach(function (column) {
                    column.disabled = true;
                    // display blocks disabled; time to guess?
                });
            }
        }, 1000);
    }
}

// reset timeAmount, score, blocks
function resetIt () {
    while (gridBox.hasChildNodes()) {
        gridBox.removeChild(gridBox.firstChild);
    }

    timeAmount = t;
    score = s;

    stopTimer(timer);
}

// difficulty options
normal.addEventListener("click", function () {
    resetIt();
    gridSize = g;
    createGrid(gridSize);
});
hard.addEventListener("click", function () {
    resetIt();
    gridSize = 25;
    createGrid(gridSize);
})

// runs when page loads
createGrid(gridSize);