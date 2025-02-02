import { getAnimationData, setCells } from "./animationData.js";

// Variables that would be needed for this component to run smoothly
let layoutMap, container, drawChildElement;

// Initializing the values needed for the component
export const initializeLayout = () => {
  ({ layoutMap, container, drawChildElement } = getAnimationData());
};

// This Function draws the layout in the given container element
export const drawLayout = () => {
  const cells = [];
  let activeCount = 0;
  for (let row = 0; row < layoutMap.length; row++) {
    for (let col = 0; col < layoutMap[0].length; col++) {
      // Letting the caller decide what to put in this cell
      const cell = drawChildElement(layoutMap[row][col], activeCount);
      layoutMap[row][col] && activeCount++;
      cells.push(cell);
      container.appendChild(cell);
    }
  }

  // Setting all the cells in the animation config for later use
  setCells(cells);
};
