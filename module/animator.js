import { generatePath } from "./pathGenerator.js";
import { getAnimation, getGrid } from "./animationData.js";

// Values needed by this component to run smoothly
let cellList, functions, container, time, hover;

// Function which initializes all the data to be needed by this component
export const initializeAnimator = () => {
  ({ cellList } = getGrid());
  ({ container, hover, time, functions } = getAnimation());
};

// This function creates a path for the animtion
const createPath = (fromCell, toCell, direction) => {
  // Generating the Path Data Draw Code
  const pathData = generatePath(fromCell, toCell, direction);

  // Creating the Path
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.style.strokeDasharray = path.getTotalLength() * 2;
  path.style.strokeDashoffset = path.getTotalLength() * 2;
  functions.drawPath(path);

  return path;
};

// This function animates Paths
export const animatePath = ({ start, end, direction }) => {
  if (!cellList[start] || !cellList[end]) return;

  const fromCell = cellList[start];
  const toCell = cellList[end];
  const path = createPath(fromCell, toCell, direction);

  // Connecting the Path in the SVG
  container.appendChild(path);

  // Animation Start (0%)
  fromCell.classList.add(hover);

  // Animation Middle (25%)
  setTimeout(() => {
    toCell.classList.add(hover);
  }, time.group * 0.25);

  // Animation End (100%)
  setTimeout(() => {
    fromCell.classList.remove(hover);
    toCell.classList.remove(hover);
    container.removeChild(path);
  }, time.group);
};
