import * as svgData from "../constants/svgData.js";

// Grid Map for the card positions
const gridMap = [
  [false, false, true, false, false, false],
  [true, false, false, true, true, false],
  [false, true, true, true, false, true],
  [true, false, false, true, false, false],
  [false, false, true, true, true, false],
  [false, true, false, false, true, true],
];

const cardNames = [
  "Scholar - 0",
  "Inbox - 1",
  "Battery - 2",
  "Notif - 3",
  "Lab - 4",
  "Light - 5",
  "Book - 6",
  "Bookmark - 7",
  "Job - 8",
  "Spider - 9",
  "Chart - 10",
  "Chat - 11",
  "Chat - 12",
  "Database - 13",
  "Todo - 14",
  "Code - 15",
];

// Grid Animation Container and cells
const animationContainer = document.querySelector(".container");

// This function is populating the Grid container
export const populateGrid = () => {
  const cells = [];
  let count = 0;

  for (let row = 0; row < gridMap.length; row++) {
    for (let col = 0; col < gridMap[0].length; col++) {
      const cell = document.createElement("div");

      // If the cell should have card or not
      if (gridMap[row][col]) {
        // Giving Default Cell CSS
        cell.classList.add("card");

        // Adding svg to the card
        cell.innerHTML = svgData.svgArray[count];

        // Creating new paragraph for the cell
        let child = document.createElement("p");
        child.classList.add("hidden-text");
        child.textContent = cardNames[count++];
        cell.appendChild(child);

        // Adding this cell in the array
        cells.push(cell);
      }

      animationContainer.appendChild(cell);
    }
  }
  return cells;
};
