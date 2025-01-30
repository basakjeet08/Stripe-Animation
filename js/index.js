import * as layoutManager from "./layoutManager.js";
import * as animator from "./animator.js";

const ONE_ANIMATION_GROUP_TIME = 3000;
const DELAY_BETWEEN_ANIMATIONS = 1000;
let TOTAL_ANIMATION_TIME;
const ANIMATION_DATA = [
  [
    { start: 1, end: 2, direction: "straight" },
    { start: 3, end: 12, direction: "straight" },
  ],

  [
    { start: 13, end: 14, direction: "straight" },
    { start: 8, end: 9, direction: "straight" },
  ],

  [
    { start: 4, end: 13, direction: "straight" },
    { start: 7, end: 15, direction: "straight" },
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

const main = () => {
  // Populating the Grid Layout
  const gridCells = layoutManager.populateGrid();
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
