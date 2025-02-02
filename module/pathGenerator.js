import { direction } from "./direction.js";

// Function which calculate the dimensions for the Rectangle or SVG
const findData = (fromCell, toCell) => {
  // Get (x , y) Coordinates for the given cells
  const x1 = fromCell.offsetLeft + fromCell.offsetWidth / 2;
  const y1 = fromCell.offsetTop + fromCell.offsetHeight / 2;
  const x2 = toCell.offsetLeft + toCell.offsetWidth / 2;
  const y2 = toCell.offsetTop + toCell.offsetHeight / 2;

  // Top left Corner
  const xMin = Math.min(x1, x2);
  const yMin = Math.min(y1, y2);

  // Bottom Right Corner
  const xMax = Math.max(x1, x2);
  const yMax = Math.max(y1, y2);

  return { xMin, yMin, xMax, yMax };
};

// This function gnerates a path/line from point A to B in a given direction
export const generatePath = (fromCell, toCell, givenDirection) => {
  const { xMin, yMin, xMax, yMax } = findData(fromCell, toCell);

  switch (givenDirection) {
    case direction.STRAIGHT:
      return `M ${xMin} ${yMin} L ${xMax} ${yMax}`;

    case direction.DOWN_RIGHT:
      return `
        M ${xMin} ${yMin}
        V ${yMax - 24}
        A 24 24 0 0 0 ${xMin + 24} ${yMax}
        H ${xMax}
      `;

    case direction.LEFT_UP:
      return `
        M ${xMax} ${yMax}
        H ${xMin + 24}
        A 24 24 0 0 1 ${xMin} ${yMax - 24}
        V ${yMin}
      `;

    case direction.DOWN_LEFT:
      return `
        M ${xMax} ${yMin}
        V ${yMax - 24}
        A 24 24 0 0 1 ${xMax - 24} ${yMax}
        H ${xMin}
      `;

    case direction.RIGHT_UP:
      return `
        M ${xMin} ${yMax} 
        H ${xMax - 24}
        A 24 24 0 0 0 ${xMax} ${yMax - 24}
        V ${yMin}
      `;

    case direction.RIGHT_DOWN:
      return `
        M ${xMin} ${yMin} 
        H ${xMax - 24}
        A 24 24 0 0 1 ${xMax} ${yMin + 24}
        V ${yMax}
      `;

    case direction.UP_LEFT:
      return `
      M ${xMax} ${yMax} 
      V ${yMin + 24}
      A 24 24 0 0 0 ${xMax - 24} ${yMin}
      H ${xMin}
    `;

    case direction.LEFT_DOWN:
      return `
      M ${xMax} ${yMin} 
      H ${xMin + 24}
      A 24 24 0 0 0 ${xMin} ${yMin + 24}
      V ${yMax}
    `;

    case direction.UP_RIGHT:
      return `
      M ${xMin} ${yMax} 
      V ${yMin + 24}
      A 24 24 0 0 1 ${xMin + 24} ${yMin}
      H ${xMax}
    `;
  }
  return null;
};
