// Grid Map for the card positions
const gridMap = [
  [false, false, true, false, false, false],
  [true, false, false, true, true, false],
  [false, true, true, true, false, true],
  [true, false, false, true, false, false],
  [false, false, true, true, true, false],
  [false, true, false, false, true, true],
];

// Shapes for the cards items
const shapes = ["rectangle", "circle", "diamond"];

// Grid Animation Container and cells
const animationContainer = document.querySelector(".container");

// Returns random shapes for the card shapes
const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// This function is populating the Grid container
export const populateGrid = () => {
  const cells = [];

  for (let row = 0; row < gridMap.length; row++) {
    for (let col = 0; col < gridMap[0].length; col++) {
      const cell = document.createElement("div");

      // If the cell should have card or not
      if (gridMap[row][col]) {
        // Giving Default Cell CSS
        cell.classList.add("card");

        // Creating new div for the cell
        let child = document.createElement("div");
        child.classList.add("shape", getRandom(shapes));
        cell.appendChild(child);

        // Creating new paragraph for the cell
        child = document.createElement("p");
        child.classList.add("hidden-text");
        child.textContent = `Card No. ${cells.length}`;
        cell.appendChild(child);

        // Adding this cell in the array
        cells.push(cell);
      }

      animationContainer.appendChild(cell);
    }
  }
  return cells;
};
