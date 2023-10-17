document.addEventListener("DOMContentLoaded", createCanvasGrid, { once: true });

const changeGridBtn = document.querySelector(".js-change-grid-btn");
changeGridBtn.addEventListener("click", createCanvasGrid);

function createCanvasGrid() {
  const canvasElement = document.querySelector(".canvas");
  const canvasGrid = getCurrentGrid();

  canvasElement.style.cssText = `grid-template-columns: repeat(${canvasGrid}, 1fr)`;

  for (let i = 1; i <= canvasGrid ** 2; i++) {
    const newCell = document.createElement("div");
    newCell.classList.add("canvas__cell");
    canvasElement.appendChild(newCell);
  }

  drawOnCanvas();
}

function drawOnCanvas() {
  let isMousePressed;
  const currentColor = "#000"
  const canvasCells = document.querySelectorAll(".canvas__cell");

  document.addEventListener("mousedown", () => isMousePressed = true);
  document.addEventListener("mouseup", () => isMousePressed = false);

  canvasCells.forEach(cell => {
    cell.addEventListener("mouseover", (e) => {

      if (!isMousePressed) return;

      e.target.style.cssText = `background-color: ${currentColor}`;
    });
  });
}

function getCurrentGrid() {
  const userGrid = +prompt("Please create a grid");
  return userGrid;
}