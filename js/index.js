import * as animator from "./animator.js";
import * as pathGenerator from "./pathGenerator.js";
import * as layout from "../module/layout.js";
import * as svgData from "../constants/svgData.js";

const ONE_ANIMATION_GROUP_TIME = 3000;
const DELAY_BETWEEN_ANIMATIONS = 1000;
let TOTAL_ANIMATION_TIME;
const ANIMATION_DATA = [
  [
    { start: 14, end: 6, direction: pathGenerator.UP_LEFT },
    { start: 14, end: 18, direction: pathGenerator.DOWN_LEFT },
    { start: 2, end: 10, direction: pathGenerator.RIGHT_DOWN },
    { start: 10, end: 28, direction: pathGenerator.STRAIGHT },
    { start: 34, end: 26, direction: pathGenerator.LEFT_UP },
  ],

  [
    { start: 10, end: 21, direction: pathGenerator.DOWN_LEFT },
    { start: 17, end: 21, direction: pathGenerator.DOWN_LEFT },
    { start: 26, end: 13, direction: pathGenerator.LEFT_UP },
    { start: 2, end: 13, direction: pathGenerator.LEFT_DOWN },
    { start: 9, end: 13, direction: pathGenerator.LEFT_DOWN },
  ],

  [
    { start: 21, end: 10, direction: pathGenerator.RIGHT_UP },
    { start: 17, end: 35, direction: pathGenerator.STRAIGHT },
    { start: 6, end: 2, direction: pathGenerator.RIGHT_UP },
    { start: 18, end: 31, direction: pathGenerator.DOWN_RIGHT },
    { start: 13, end: 26, direction: pathGenerator.DOWN_RIGHT },
  ],

  [
    { start: 31, end: 18, direction: pathGenerator.UP_LEFT },
    { start: 31, end: 34, direction: pathGenerator.STRAIGHT },
    { start: 28, end: 15, direction: pathGenerator.UP_LEFT },
    { start: 6, end: 9, direction: pathGenerator.STRAIGHT },
  ],
];

// Animation Initializer
const startOneGroupAnimation = (animationsObj) => {
  // Iterate over each animation in the set
  animationsObj.forEach((animation, index) => {
    animator.animatePath(
      animation.start,
      animation.end,
      animation.direction,
      ONE_ANIMATION_GROUP_TIME
    );
  });
};

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

const main = () => {
  // Populating the Grid Layout
  // const gridCells = layoutManager.populateGrid();
  let count = 0;

  const gridCells = layout.drawLayout({
    layoutMap: [
      [false, false, true, false, false, false],
      [true, false, false, true, true, false],
      [false, true, true, true, false, true],
      [true, false, false, true, false, false],
      [false, false, true, true, true, false],
      [false, true, false, false, true, true],
    ],
    container: document.querySelector(".container"),
    drawElement: (isChild) => {
      const cell = document.createElement("div");
      if (!isChild) return cell;

      // Giving Default Cell CSS and HTML
      cell.classList.add("card");
      cell.innerHTML = svgData.svgArray[count];

      // Creating new paragraph for the cell
      let child = document.createElement("p");
      child.classList.add("hidden-text");
      child.textContent = cardNames[count++];
      cell.appendChild(child);

      return cell;
    },
  });

  animator.setGridCells(gridCells);

  //  Calculating the total time for animating all the groups
  TOTAL_ANIMATION_TIME =
    ANIMATION_DATA.length *
    (ONE_ANIMATION_GROUP_TIME + DELAY_BETWEEN_ANIMATIONS);

  // Function to animate Each Group one by one
  const startCompleteAnimation = () => {
    ANIMATION_DATA.forEach((animationsObj, index) => {
      setTimeout(() => {
        startOneGroupAnimation(animationsObj);
      }, index * (ONE_ANIMATION_GROUP_TIME + DELAY_BETWEEN_ANIMATIONS));
    });
  };

  startCompleteAnimation();

  // Looping the Animation after all the groups are completed animating
  setInterval(() => startCompleteAnimation(), TOTAL_ANIMATION_TIME);
};

main();
