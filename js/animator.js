import * as pathGenerator from "./pathGenerator.js";

const svg = document.querySelector("svg");

const strokeAnimations = [
  "stroke-anim-1",
  "stroke-anim-2",
  "stroke-anim-3",
  "stroke-anim-4",
];

// Returns random shapes for the card shapes
const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

let gridCells;
export const setGridCells = (cells) => {
  gridCells = cells;
};

const createPath = (fromCell, toCell, direction) => {
  // Generating the Path Data Draw Code
  const pathData = pathGenerator.generatePath(fromCell, toCell, direction);

  // Creating the Path
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.classList.add("path", getRandom(strokeAnimations));
  path.style.strokeDasharray = path.getTotalLength() * 2;
  path.style.strokeDashoffset = path.getTotalLength() * 2;

  // Connecting the Path in the SVG
  svg.appendChild(path);

  return path;
};

// This function animates Paths
export const animatePath = (fromIndex, toIndex, direction, animationTime) => {
  if (!gridCells[fromIndex] || !gridCells[toIndex]) return;

  const fromCell = gridCells[fromIndex];
  const toCell = gridCells[toIndex];
  const path = createPath(fromCell, toCell, direction);

  // Animation Start (0%)
  fromCell.classList.add("card-hover");

  // Animation Middle (25%)
  setTimeout(() => {
    toCell.classList.add("card-hover");
  }, animationTime * 0.25);

  // Animation End (100%)
  setTimeout(() => {
    fromCell.classList.remove("card-hover");
    toCell.classList.remove("card-hover");
    svg.removeChild(path);
  }, animationTime);
};
