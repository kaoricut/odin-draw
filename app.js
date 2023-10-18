const DEFAULT_GRID = 16;
let currentGrid = DEFAULT_GRID;

const DEFAULT_MODE = "default";
let currentMode = DEFAULT_MODE;

document.addEventListener("DOMContentLoaded", createCanvasGrid, { once: true });
document.addEventListener("DOMContentLoaded", setCurrentModeUI, { once: true });

const modeControls = document.querySelectorAll(".js-mode");
modeControls.forEach(button => {
  button.addEventListener("click", changeCurrentMode);
});

function setCurrentModeUI() {
  modeControls.forEach(button => {
    button.classList.remove("mode__btn_current");
    if (button.dataset.mode === currentMode) button.classList.toggle("mode__btn_current");
  });
}

function changeCurrentMode(event) {
  currentMode = event.target.dataset.mode;
  setCurrentModeUI();
}

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
  switch (currentMode) {
    case "default":
      const colorPickerElement = document.querySelector(".js-color-picker");
      return colorPickerElement.value;
    case "random":
      return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  }
}