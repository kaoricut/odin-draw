const DEFAULT_GRID = 16;
let currentGrid = DEFAULT_GRID;

document.addEventListener("DOMContentLoaded", createCanvasGrid, { once: true });

const changeGridBtn = document.querySelector(".js-change-grid");
changeGridBtn.addEventListener("click", () => {
  let newGridSize = +prompt("Enter the grid size", 16);
  
  if (!newGridSize || newGridSize < 16) {
    newGridSize = 16;
  } else if (newGridSize > 128) {
    newGridSize = 128;
  }

  currentGrid = newGridSize;
  createCanvasGrid();
});

function createCanvasGrid() {
  const canvasElement = document.querySelector(".canvas");

  refreshCanvas();

  canvasElement.style.cssText = `grid-template-columns: repeat(${currentGrid}, 1fr)`;

  for (let i = 1; i <= currentGrid ** 2; i++) {
    const newCell = document.createElement("div");
    newCell.classList.add("canvas__cell");
    canvasElement.appendChild(newCell);
  }

  drawOnCanvas();
}

function drawOnCanvas() {
  let isMouseDown;
  const canvasCells = document.querySelectorAll(".canvas__cell");

  window.addEventListener("mousedown", () => isMouseDown = true);
  window.addEventListener("mouseup", () => isMouseDown = false);

  canvasCells.forEach(cell => {
    cell.addEventListener("mouseover", () => {
      if (isMouseDown) cell.style.cssText = "background-color: black";
    })
  });
}

function refreshCanvas() {
  const canvasElement = document.querySelector(".canvas");
  canvasElement.innerHTML = "";
}