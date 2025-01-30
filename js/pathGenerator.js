export const STRAIGHT = "straight";
export const DOWN_RIGHT = "down-right";
export const LEFT_UP = "left-up";
export const DOWN_LEFT = "down-left";
export const RIGHT_UP = "right-up";
export const RIGHT_DOWN = "right-down";
export const UP_LEFT = "up-left";
export const LEFT_DOWN = "left-down";
export const UP_RIGHT = "up-right";

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

export const generatePath = (fromCell, toCell, direction) => {
  const { xMin, yMin, xMax, yMax } = findData(fromCell, toCell);

  if (xMin == xMax || yMin == yMax || direction === STRAIGHT) {
    return `M ${xMin} ${yMin} L ${xMax} ${yMax}`;
  }

  let pathData;
  switch (direction) {
    case DOWN_RIGHT:
      pathData = `
        M ${xMin} ${yMin}
        V ${yMax - 24}
        A 24 24 0 0 0 ${xMin + 24} ${yMax}
        H ${xMax}
      `;
      break;

    case LEFT_UP:
      pathData = `
        M ${xMax} ${yMax}
        H ${xMin + 24}
        A 24 24 0 0 1 ${xMin} ${yMax - 24}
        V ${yMin}
      `;
      break;

    case DOWN_LEFT:
      pathData = `
        M ${xMax} ${yMin}
        V ${yMax - 24}
        A 24 24 0 0 1 ${xMax - 24} ${yMax}
        H ${xMin}
      `;
      break;

    case RIGHT_UP:
      pathData = `
        M ${xMin} ${yMax} 
        H ${xMax - 24}
        A 24 24 0 0 0 ${xMax} ${yMax - 24}
        V ${yMin}
      `;
      break;

    case RIGHT_DOWN:
      pathData = `
        M ${xMin} ${yMin} 
        H ${xMax - 24}
        A 24 24 0 0 1 ${xMax} ${yMin + 24}
        V ${yMax}
      `;
      break;

    case UP_LEFT:
      pathData = `
      M ${xMax} ${yMax} 
      V ${yMin + 24}
      A 24 24 0 0 0 ${xMax - 24} ${yMin}
      H ${xMin}
    `;
      break;

    case LEFT_DOWN:
      pathData = `
      M ${xMax} ${yMin} 
      H ${xMin + 24}
      A 24 24 0 0 0 ${xMin} ${yMin + 24}
      V ${yMax}
    `;
      break;

    case UP_RIGHT:
      pathData = `
      M ${xMin} ${yMax} 
      V ${yMin + 24}
      A 24 24 0 0 1 ${xMin + 24} ${yMin}
      H ${xMax}
    `;
      break;
  }

  return pathData;
};

// A 24 24 0 0 1 ${xMin} ${yMax - 24}
// A -> Arc Command
// 24 , 24 x radius , y radius
// 0 -> rotation of the ellipse
// 0 -> smaller arc is drawn
// 1 -> if the arc will be drawn clockwise or anti
// ${xMin} ${yMax - 24} Destination
