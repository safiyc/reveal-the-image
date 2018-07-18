const gridBox = document.querySelector(".grid-box");


for (let i = 0; i < 4; i++) {
    const row = document.createElement("div");
    row.classList.add("rows");
    row.setAttribute("id", i);
    gridBox.appendChild(row);

    for (let j = 0; j < 4; j++) {
        const column = document.createElement("div");
        column.classList.add("columns");
        column.setAttribute("id", j);
        row.appendChild(column);
    }
}