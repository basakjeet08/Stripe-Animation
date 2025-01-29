const gridMap = [
  [false, false, true, false, false, false],
  [true, false, false, true, true, false],
  [false, true, true, true, false, true],
  [true, false, false, true, false, false],
  [false, false, true, true, true, false],
  [false, true, false, false, true, true],
];
const shapes = ["rectangle", "circle", "diamond"];
const xGradient = [
  "gradient-x-1",
  "gradient-x-2",
  "gradient-x-3",
  "gradient-x-4",
  "gradient-x-5",
  "gradient-x-6",
  "gradient-x-7",
  "gradient-x-8",
];
const yGradient = [
  "gradient-y-1",
  "gradient-y-2",
  "gradient-y-3",
  "gradient-y-4",
  "gradient-y-5",
  "gradient-y-6",
  "gradient-y-7",
  "gradient-y-8",
];
const INTERVAL_DELAY = 12000;

// Grid Animation Container and cells
const animationContainer = document.querySelector(".container");
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

// This determines if the Line needs to be drawn horizontally
const isX = (initialPos, finalPos) => {
  return initialPos.top == finalPos.top;
};

// This is the function that creates a Line
const createLine = (fromRect, toRect) => {
  const line = document.createElement("div");
  line.classList.add("line");
  animationContainer.appendChild(line);

  // Initial Position of line
  line.style.top = `${fromRect.top + fromRect.height / 2}px`;
  line.style.left = `${fromRect.left + fromRect.width / 2}px`;

  // Gradient for the line
  const gradient = isX(fromRect, toRect)
    ? getRandom(xGradient)
    : getRandom(yGradient);
  line.classList.add(gradient);

  return line;
};

// This function animates the lines
const animateLine = (fromIndex, toIndex) => {
  if (!gridCells[fromIndex] || !gridCells[toIndex]) return;

  const fromCell = gridCells[fromIndex];
  const toCell = gridCells[toIndex];

  // Dynamically creating a line element
  const fromRect = fromCell.getBoundingClientRect();
  const toRect = toCell.getBoundingClientRect();
  const line = createLine(fromRect, toRect);

  const ANIMATION_TIME = 3000;

  // Animation Start (0%)
  fromCell.classList.add("card-hover");
  line.style.animation = isX(fromRect, toRect)
    ? `growLine-X ${ANIMATION_TIME}ms ease-in-out`
    : `growLine-Y ${ANIMATION_TIME}ms ease-in-out`;

  // Animation Middle (25%)
  setTimeout(() => {
    toCell.classList.add("card-hover");
  }, ANIMATION_TIME * 0.25);

  // Animation End (100%)
  setTimeout(() => {
    fromCell.classList.remove("card-hover");
    toCell.classList.remove("card-hover");
    animationContainer.removeChild(line);
  }, ANIMATION_TIME);
};

// Animation Initializer
const startAnimation = ({ first, second, startTime }) => {
  setTimeout(() => {
    // These two animations are animated together
    const animate = () => {
      animateLine(first[0], first[1]);

      setTimeout(() => {
        animateLine(second[0], second[1]);
      }, 1000);
      // animateLine(second[0], second[1]);
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
