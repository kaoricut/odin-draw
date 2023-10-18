const DEFAULT_GRID = 16;
const DEFAULT_MODE = "default";
let currentGrid = DEFAULT_GRID;

document.addEventListener("DOMContentLoaded", createCanvasGrid, { once: true });

const changeGridElement = document.querySelector(".js-change-grid");
changeGridElement.addEventListener("change", (event) => {
  newGridSize = event.target.value;
  updateRangeUI(newGridSize);

  currentGrid = +newGridSize;
  createCanvasGrid();
});

function updateRangeUI(newValue) {
  const currentSizeUI = document.querySelector(".range__grid-size");
  currentSizeUI.textContent = `${newValue} x ${newValue}`;
}

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
      if (isMouseDown) cell.style.cssText = `background-color: ${getCurrentColor()}`;
    })
  });
}

function refreshCanvas() {
  const canvasElement = document.querySelector(".canvas");
  canvasElement.innerHTML = "";
}

function getCurrentColor() {
  const colorPickerElement = document.querySelector(".js-color-picker");
  return colorPickerElement.value;
}