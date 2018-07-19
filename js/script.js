// gridBox-> height is 400px, width is 400px
const gridBox = document.querySelector(".grid-box");
let columns;
let row;
let column;

// 4x4
for (let i = 1; i < 5; i++) {
    row = document.createElement("div");
    gridBox.appendChild(row);
    row.classList.add("rows");
    row.setAttribute("style", `height: ${400 / 4}px`);
    row.setAttribute("id", i);
    
    for (let j = 1; j < 5; j++) {
        column = document.createElement("div");
        row.appendChild(column);
        column.classList.add("columns");
        column.setAttribute("style", `width: ${400 / 4}px`);
        column.setAttribute("id", `${i}-${j}`);
        column.textContent = column.id;
        // column.setAttribute("style", "background-color: green");
    }
}

columns = document.querySelectorAll(".columns");

columns.forEach(function (column) {
    column.addEventListener("click", function () {
        if (column.textContent === column.id) {
            column.style.backgroundColor = "yellow";
            console.log("color ", column.style.backgroundColor = "yellow");
            column.textContent = "hi";
        } else if (column.textContent === "hi") {
            column.textContent = "hi again";
            column.style.backgroundColor = "blue";
        }
    });
});

// 16x16
// for (let i = 1; i < 17; i++) {
//     const row = document.createElement("div");
//     row.classList.add("rows");
//     row.setAttribute("style", `height: ${400/16}px`);
//     row.setAttribute("id", i);
//     gridBox.appendChild(row);

//     for (let j = 1; j < 17; j++) {
//         const column = document.createElement("div");
//         column.classList.add("columns");
//         column.setAttribute("style", `width: ${400/16}px`);
//         column.setAttribute("id", `${i}-${j}`);
//         column.textContent = `${i}-${j}`;
//         row.appendChild(column);
//     }
// }