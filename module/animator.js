import { generatePath } from "./pathGenerator.js";
import { getAnimationData } from "./animationData.js";

// Values needed by this component to run smoothly
let gridCells, addPathDecoration, svgContainer, groupTime, cardHoverStyles;

// Function which initializes all the data to be needed by this component
export const initializeAnimator = () => {
  ({
    gridCells,
    svgContainer,
    addPathDecoration,
    cardHoverStyles,
    time: { groupTime },
  } = getAnimationData());
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
  addPathDecoration(path);

  return path;
};

// This function animates Paths
export const animatePath = ({ start, end, direction }) => {
  if (!gridCells[start] || !gridCells[end]) return;

  const fromCell = gridCells[start];
  const toCell = gridCells[end];
  const path = createPath(fromCell, toCell, direction);

  // Connecting the Path in the SVG
  svgContainer.appendChild(path);

  // Animation Start (0%)
  fromCell.classList.add(cardHoverStyles);

  // Animation Middle (25%)
  setTimeout(() => {
    toCell.classList.add(cardHoverStyles);
  }, groupTime * 0.25);

  // Animation End (100%)
  setTimeout(() => {
    fromCell.classList.remove(cardHoverStyles);
    toCell.classList.remove(cardHoverStyles);
    svgContainer.removeChild(path);
  }, groupTime);
};
