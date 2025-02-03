import { direction } from "../utils/direction.js";
import { svgArray } from "../decorations/svgData.js";
import { strokeStyles } from "../decorations/strokeStylesData.js";

// This is the data store which stores all the data
const animationConfig = {
  grid: {
    container: document.querySelector(".animation-container"),
    layout: [
      [false, false, true, false, false, false],
      [true, false, false, true, true, false],
      [false, true, true, true, false, true],
      [true, false, false, true, false, false],
      [false, false, true, true, true, false],
      [false, true, false, false, true, true],
    ],
    cellList: [],
    animationCard: "animation-card",
    functions: {
      drawCellElement: (isActiveChild, activeCount) => {
        const cell = document.createElement("div");
        if (!isActiveChild) return cell;

        // Giving Default Cell CSS and HTML
        cell.classList.add(animationConfig.grid.animationCard);
        cell.innerHTML = svgArray[activeCount];

        return cell;
      },
    },
  },

  animation: {
    container: document.querySelector(".svg-container"),
    groupList: [
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
    ],
    hover: "animation-card-hover",
    pathClass: "animation-path",
    time: { group: 3000, delay: 1000 },

    functions: {
      drawPath: (path) => {
        const getRandom = (array) =>
          array[Math.floor(Math.random() * array.length)];
        path.classList.add(
          animationConfig.animation.pathClass,
          getRandom(strokeStyles)
        );

        return path;
      },
    },
  },
};

// This is used to set the animation configurations
export const setAnimationConfig = (config = {}) => {
  animationConfig.grid = { ...animationConfig.grid, ...(config.grid ?? {}) };
  animationConfig.animation = {
    ...animationConfig.animation,
    ...(config.animation ?? {}),
  };
};

// This function returns the grid property of the animation config
export const getGrid = () => {
  return {
    ...animationConfig.grid,
    functions: { ...animationConfig.grid.functions },
  };
};

// This function returns the animation property of the animation config
export const getAnimation = () => {
  return {
    ...animationConfig.animation,
    time: { ...animationConfig.animation.time },
    functions: { ...animationConfig.animation.functions },
  };
};
