import { getGrid, setAnimationConfig } from "./data/animationData.js";

// Variables that would be needed for this component to run smoothly
let layout, container, functions;

// Initializing the values needed for the component
export const initializeLayout = () => {
  ({ layout, container, functions } = getGrid());
};

// This Function draws the layout in the given container element
export const drawLayout = () => {
  const cells = [];
  let activeCount = 0;
  for (let row = 0; row < layout.length; row++) {
    for (let col = 0; col < layout[0].length; col++) {
      // Letting the caller decide what to put in this cell
      const cell = functions.drawCellElement(layout[row][col], activeCount);
      layout[row][col] && activeCount++;
      cells.push(cell);
      container.appendChild(cell);
    }
  }

  // Setting all the cells in the animation config for later use
  setAnimationConfig({ grid: { cellList: cells } });
};
