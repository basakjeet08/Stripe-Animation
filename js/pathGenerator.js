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

  if (xMin == xMax || yMin == yMax) {
    return `M ${xMin} ${yMin} L ${xMax} ${yMax}`;
  }

  let pathData;
  switch (direction) {
    case "left-down":
      pathData = `
          M ${xMin} ${yMin} 
          H ${xMax - 24}
          A 24 24 0 0 1 ${xMax} ${yMin + 24}
          V ${yMax}
        `;
      break;

    case "left-up":
      pathData = `
          M ${xMin} ${yMax} 
          H ${xMax - 24}
          A 24 24 0 0 0 ${xMax} ${yMax - 24}
          V ${yMin}
        `;
      break;

    case "down-left":
      pathData = `
          M ${xMax} ${yMin}
          V ${yMax - 24}
          A 24 24 0 0 1 ${xMax - 24} ${yMax}
          H ${xMin}
        `;

    case "down-right":
      pathData = `
          M ${xMin} ${yMin}
          V ${yMax - 24}
          A 24 24 0 0 0 ${xMin + 24} ${yMax}
          H ${xMax}
        `;
  }

  return pathData;
};
