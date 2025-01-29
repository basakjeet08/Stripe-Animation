const gridMap = [
  [false, false, true, false, false, false],
  [true, false, false, true, true, false],
  [false, true, true, true, false, true],
  [true, false, false, true, false, false],
  [false, false, true, true, true, false],
  [false, true, false, false, true, true],
];
const shapes = ["rectangle", "circle", "diamond"];
const INTERVAL_DELAY = 12000;

// Grid Animation Container and cells
const animationContainer = document.querySelector(".container");
const svg = document.querySelector("svg");
let gridCells;

// Returns random shapes for the card shapes
const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// This function is populating the Grid container
const populateGrid = (gridMap) => {
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

// This function creates a Path
const createPath = (fromCell, toCell) => {
  // Get center points
  const x1 = fromCell.offsetLeft + fromCell.offsetWidth / 2;
  const y1 = fromCell.offsetTop + fromCell.offsetHeight / 2;
  const x2 = toCell.offsetLeft + toCell.offsetWidth / 2;
  const y2 = toCell.offsetTop + toCell.offsetHeight / 2;

  // Create a path
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const pathData = `M ${x1} ${y1} L ${x2} ${y2}`;
  path.setAttribute("d", pathData);
  path.classList.add("path");
  svg.appendChild(path);

  return path;
};

// This function animates Paths
const animatePath = (fromIndex, toIndex) => {
  if (!gridCells[fromIndex] || !gridCells[toIndex]) return;

  const fromCell = gridCells[fromIndex];
  const toCell = gridCells[toIndex];
  const path = createPath(fromCell, toCell);

  const ANIMATION_TIME = 3000;

  // Animation Start (0%)
  fromCell.classList.add("card-hover");

  // Animation Middle (25%)
  setTimeout(() => {
    toCell.classList.add("card-hover");
  }, ANIMATION_TIME * 0.25);

  // Animation End (100%)
  setTimeout(() => {
    fromCell.classList.remove("card-hover");
    toCell.classList.remove("card-hover");
    svg.removeChild(path);
  }, ANIMATION_TIME);
};

// Animation Initializer
const startAnimation = ({ first, second, startTime }) => {
  setTimeout(() => {
    // These two animations are animated together
    const animate = () => {
      animatePath(first[0], first[1]);

      setTimeout(() => {
        animatePath(second[0], second[1]);
      }, 1000);
    };

    animate();
    setInterval(animate, INTERVAL_DELAY);
  }, startTime);
};

const main = () => {
  gridCells = populateGrid(gridMap);

  // Animations
  startAnimation({ first: [1, 2], second: [4, 13], startTime: 1000 });
  startAnimation({ first: [3, 12], second: [8, 9], startTime: 5000 });
  startAnimation({ first: [13, 14], second: [7, 15], startTime: 9000 });
};

main();
