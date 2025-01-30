import * as layoutManager from "./layoutManager.js";
import * as animator from "./animator.js";
import * as pathGenerator from "./pathGenerator.js";

const ONE_ANIMATION_GROUP_TIME = 3000;
const DELAY_BETWEEN_ANIMATIONS = 1000;
let TOTAL_ANIMATION_TIME;
const ANIMATION_DATA = [
  [
    { start: 5, end: 1, direction: pathGenerator.UP_LEFT },
    { start: 5, end: 8, direction: pathGenerator.DOWN_LEFT },
    { start: 0, end: 3, direction: pathGenerator.RIGHT_DOWN },
    { start: 3, end: 12, direction: pathGenerator.STRAIGHT },
  ],

  [
    { start: 3, end: 9, direction: pathGenerator.DOWN_LEFT },
    { start: 7, end: 9, direction: pathGenerator.DOWN_LEFT },
  ],

  [
    { start: 9, end: 3, direction: pathGenerator.RIGHT_UP },
    { start: 7, end: 15, direction: pathGenerator.STRAIGHT },
    { start: 1, end: 0, direction: pathGenerator.RIGHT_UP },
  ],

  [
    { start: 13, end: 8, direction: pathGenerator.UP_LEFT },
    { start: 13, end: 14, direction: pathGenerator.STRAIGHT },
    { start: 12, end: 6, direction: pathGenerator.UP_LEFT },
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
