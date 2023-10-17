const DEFAULT_GRID = 16;

document.addEventListener("DOMContentLoaded", createCanvasGrid);

function createCanvasGrid() {
  const canvasElement = document.querySelector(".canvas");

  for (let i = 1; i <= DEFAULT_GRID ** 2; i++) {
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