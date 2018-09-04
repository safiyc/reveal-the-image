// not a good thing to have these global variables; not secure

// gridBox-> 400px by 400px
const gridBox = document.querySelector(".grid-box");
const normal = document.querySelector("#normal");
const hard = document.querySelector("#hard");

let g = 16   // blocks in square grid
let t = 30;   // time in seconds
let s = 500;   // score
let gridSize = g;
let timeAmount = t;
let score = s;
let timer;
let columns;
let randomImgNum;

let initialsScoreArr = [];

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

    retrieveLocalStorage();  
    randomizeImg();
    breakBlock();
}

// randomize gridBox bg img and return value of img
function randomizeImg () {
    randomImgNum = Math.floor(Math.random() * 6) + 1;

    switch(randomImgNum) {
        case 1:
            gridBox.style.height = "400px";
            gridBox.style.width = "400px";
            gridBox.style.backgroundImage = "url('./img/beaver.jpg')";
            break;
        case 2:
            gridBox.style.height = "400px";
            gridBox.style.width = "400px";
            gridBox.style.backgroundImage = "url('./img/cats.jpg')";
            break;
        case 3:
            gridBox.style.height = "400px";
            gridBox.style.width = "400px";
            gridBox.style.backgroundImage = "url('./img/dog.jpg')";
            break;
        case 4:
            gridBox.style.height = "400px";
            gridBox.style.width = "400px";
            gridBox.style.backgroundImage = "url('./img/fox.jpg')";
            break;
        case 5:
            gridBox.style.height = "400px";
            gridBox.style.width = "400px";
            gridBox.style.backgroundImage = "url('./img/rabbit.jpg')";
            break;
        case 6:
            gridBox.style.height = "400px";
            gridBox.style.width = "400px";
            gridBox.style.backgroundImage = "url('./img/raccoon.jpg')";
    }
}

// compare img and answer, display correct/wrong
// if wrong, points off until correct answer
// if correct, disable answer selections, stop timer; run functions
function linkImgToAnswer () {
    let answerBtns = document.querySelectorAll(".answer");
    let resultDisplay = document.querySelector(".result-display");
    let playAgain = document.querySelector("#mssg-playagain");

    for (let i = 0; i < answerBtns.length; i++) {
        answerBtns[i].addEventListener("click", function () {
            // if answer correct
            if (answerBtns[i].getAttribute("value") == randomImgNum) {
                answerBtns[i].setAttribute("style", "background-color: lime; border: 1px solid black;");
                resultDisplay.setAttribute("style", "background-color: lime;");
                resultDisplay.textContent = "Correct!";
                playAgain.setAttribute("style", "visibility: visible;");
                
                while (gridBox.hasChildNodes()) {
                    gridBox.removeChild(gridBox.firstChild);
                }
                
                // stops time countdown and disables answers
                stopTimer();
                answerBtns.forEach(function (answer) {
                    answer.disabled = true;
                    answer.setAttribute("style", "background-color: dimgrey; border: none;")
                });
                
                // retrieve from localStorage
                retrieveLocalStorage();
                // create initials-score object; display initials-score object
                // push to object to array; sort from high to low
                scoresToArrSort();
                // save to localStorage
                saveToLocalStorage();
                // display top 5 scores (loop thru sorted array of objects)
                displayHighToLow();

            // if answer wrong
            } else {
                score -= 100;
                answerBtns[i].setAttribute("style", "background-color: red; border: 1px solid black;");
                resultDisplay.setAttribute("style", "background-color: red;");
                resultDisplay.textContent = "Wrong!";
                
                setTimeout(function () {
                    resultDisplay.innerHTML = "Guess It!";
                    answerBtns[i].removeAttribute("style", "background-color");
                    resultDisplay.removeAttribute("style", "background-color");
                }, 500);
            }

            document.getElementById("score").textContent = score;
        });
    }  
}

// create object to store initials/score, and initials validation
function saveScoreObj () {
    const yourScore = document.querySelector(".your-score");
    let userInput = prompt("You answered correct. Enter your initials of 2 to 3 letters.").toUpperCase();
    let initials;

    // validate initials
    while (userInput !== /[A-Z]+/g) {
        if (/[^A-Z]+/g.test(userInput)) {
            userInput = prompt("Please enter only letters.").toUpperCase();
        } else if (userInput.length < 2 || userInput.length > 3) {
            userInput = prompt("Please enter 2 to 3 letters for your initials.").toUpperCase();
        } else {
            initials = userInput;
            break;
        }
    }
    
    // create object for initials and score
    let entry = {
        initials: initials,
        score: score
    }

    // score less than -500 shows up as -500
    if (score <= -500) {
        entry.score = -500;
    }

    yourScore.textContent = entry.initials + " " + entry.score;

    return entry;
}

// push objects into array and sort from high to low
function scoresToArrSort () {
    initialsScoreArr.push(saveScoreObj());
    
    initialsScoreArr.sort(function (a, b) {
        return b.score - a.score;
    });
}

// display from high to low; limit 5 items listed
function displayHighToLow () {
    let ul = document.querySelector(".ranking-list");

    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }

    for (let i = 0; i < initialsScoreArr.length; i++) {
        let li = document.createElement("li");
        li.textContent = initialsScoreArr[i].initials + " " + initialsScoreArr[i].score;
        if (i < 5) {
            ul.appendChild(li);
        }
    }
}

// save to localStorage
function saveToLocalStorage () {
    localStorage.setItem("items", JSON.stringify(initialsScoreArr));
}

// retrieve from localStorage
function retrieveLocalStorage () {
    let localStorageData = JSON.parse(localStorage.getItem("items"));

    if (localStorage.getItem("items")) {
        initialsScoreArr = JSON.parse(localStorage.getItem("items"));
    } else {
        initialsScoreArr = [];
        localStorageData = [];
    }

    localStorageData.forEach(function (key) {
        displayHighToLow();
    });
}

// remove data from localStorage
const deleteLocalStorage = document.querySelector("#delete-scores");
deleteLocalStorage.addEventListener("click", function () {
    let ul = document.querySelector(".ranking-list");
    
    localStorage.clear();
    
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    
    document.querySelector(".your-score").textContent = "";
});

// click block to reduce opacity; score is reduced; timer starts at first click
function breakBlock () {
    let arr = [];  // hacky way to invoke startTimer() only on 1st block click
    columns = document.querySelectorAll(".column-btns");

    for (let i = 0; i < columns.length; i++) {
        columns[i].addEventListener("click", function () {
            if (columns[i].getAttribute("value") === "1") {
                columns[i].setAttribute("value", "2");
                columns[i].style.background = "radial-gradient(rgba(0, 255, 0, .45), rgba(0, 255, 0, .55), rgba(0, 255, 0, .80) 70%)";
                score -= 2;
                arr.push(i);
            } else if (columns[i].getAttribute("value") === "2") {
                columns[i].setAttribute("value", "3");
                columns[i].style.background = "rgba(0, 255, 0, 0)";
                score -= 3;
            } else if (columns[i].getAttribute("value") === "3") {
                return;
            }
            
            document.getElementById("time-amount").textContent = timeAmount;
            document.getElementById("score").textContent = score;

            // invoke startTimer() only once at first block click
            if (arr.length === 1) {
                startTimer();
            }
        });
    }
}

// time countdown starts at first block click
function startTimer () {
    timer = setInterval(function () {
        timeAmount--;
        score--;
        
        document.getElementById("time-amount").textContent = timeAmount;
        document.getElementById("score").textContent = score;
        
        if (timeAmount <= 0) {
            score--;
            columns.forEach(function (column) {
                column.disabled = true;
            });
        }
    }, 1000);
}

// time countdown stops
function stopTimer () {
    clearInterval(timer);
}

// reset blocks and answers
function resetIt () {
    let answerBtns = document.querySelectorAll(".answer");
    let resultDisplay = document.querySelector(".result-display");
    let playAgain = document.querySelector("#mssg-playagain");
    document.querySelector(".your-score").textContent = "";

    while (gridBox.hasChildNodes()) {
        gridBox.removeChild(gridBox.firstChild);
    }

    answerBtns.forEach(function (answer) {
        answer.removeAttribute("style");
        answer.disabled = false;
    });
    resultDisplay.removeAttribute("style");
    resultDisplay.innerHTML = "Guess It!";
    playAgain.setAttribute("style", "visibility: hidden;");

    stopTimer(); 
}

// difficulty option choices
normal.addEventListener("click", function () {
    resetIt();
    gridSize = g;
    timeAmount = t;
    score = s;
    createGrid(gridSize);
});
hard.addEventListener("click", function () {
    resetIt();
    gridSize = g + 4;
    timeAmount = t;
    score = s + 50;
    createGrid(gridSize);
});

// toggle display rules
let rulesBtn = document.querySelector("#rules-btn");
rulesBtn.addEventListener("click", function () {
    let rulesBox = document.querySelector(".rules-box");
    if (rulesBox.classList.contains("hidden")) {
        rulesBox.classList.remove("hidden");
    } else {
        rulesBox.classList.add("hidden");
    }
});

// get current year
let date = new Date();
document.getElementById("copyright").textContent = date.getFullYear();

// run when page loads
createGrid(gridSize);
linkImgToAnswer();
retrieveLocalStorage();