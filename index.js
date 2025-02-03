import {
  setConfiguration,
  startDrawingLayout,
  startAnimating,
} from "./module/initializer.js";
import { svgArray } from "./constants/svgData.js";
import { direction } from "./module/direction.js";

// Grid Container
const gridContainer = document.querySelector(".container");

// Grid Map Layout
const layout = [
  [false, false, true, false, false, false],
  [true, false, false, true, true, false],
  [false, true, true, true, false, true],
  [true, false, false, true, false, false],
  [false, false, true, true, true, false],
  [false, true, false, false, true, true],
];

// Styles for drawing the cell blocks in the grid
const drawCellElement = (isActiveChild, activeCount) => {
  const cell = document.createElement("div");
  if (!isActiveChild) return cell;

  // Giving Default Cell CSS and HTML
  cell.classList.add("card");
  cell.innerHTML = svgArray[activeCount];

  return cell;
};

// Svg Container for the animations
const svgContainer = document.querySelector("svg");

// GroupList for all the specific animations
const groupList = [
  [
    { start: 14, end: 6, direction: direction.UP_LEFT },
    { start: 14, end: 18, direction: direction.DOWN_LEFT },
    { start: 2, end: 10, direction: direction.RIGHT_DOWN },
    { start: 10, end: 28, direction: direction.STRAIGHT },
    { start: 34, end: 26, direction: direction.LEFT_UP },
  ],

  [
    { start: 10, end: 21, direction: direction.DOWN_LEFT },
    { start: 17, end: 21, direction: direction.DOWN_LEFT },
    { start: 26, end: 13, direction: direction.LEFT_UP },
    { start: 2, end: 13, direction: direction.LEFT_DOWN },
    { start: 9, end: 13, direction: direction.LEFT_DOWN },
  ],

  [
    { start: 21, end: 10, direction: direction.RIGHT_UP },
    { start: 17, end: 35, direction: direction.STRAIGHT },
    { start: 6, end: 2, direction: direction.RIGHT_UP },
    { start: 18, end: 31, direction: direction.DOWN_RIGHT },
    { start: 13, end: 26, direction: direction.DOWN_RIGHT },
  ],

  [
    { start: 31, end: 18, direction: direction.UP_LEFT },
    { start: 31, end: 34, direction: direction.STRAIGHT },
    { start: 28, end: 15, direction: direction.UP_LEFT },
    { start: 6, end: 9, direction: direction.STRAIGHT },
  ],
];

// Stroke Styles for the paths
const strokeStyles = [
  "stroke-anim-1",
  "stroke-anim-2",
  "stroke-anim-3",
  "stroke-anim-4",
];

// Styles for the path created
const drawPath = (path) => {
  const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

  path.classList.add("path", getRandom(strokeStyles));
  return path;
};

// Configurations for the grid layout
const gridConfig = {
  container: gridContainer,
  layout: layout,
  functions: {
    drawCellElement: drawCellElement,
  },
};

// Configurations for the animations
const animationConfig = {
  container: svgContainer,
  groupList: groupList,
  hover: "card-hover",
  time: { group: 3000, delay: 1000 },

  functions: {
    drawPath: drawPath,
  },
};

setConfiguration({ grid: gridConfig, animation: animationConfig });
startDrawingLayout();
startAnimating();
