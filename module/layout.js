// This Function draws the layout in the given container element
export const drawLayout = ({ layoutMap, container, drawElement }) => {
  const cells = [];
  for (let row = 0; row < layoutMap.length; row++) {
    for (let col = 0; col < layoutMap[0].length; col++) {
      // Letting the caller decide what to put in this cell
      const cell = drawElement(layoutMap[row][col]);
      cells.push(cell);
      container.appendChild(cell);
    }
  }
  return cells;
};
