import { setAnimationConfig, getAnimation } from "./data/animationData.js";
import { drawLayout, initializeLayout } from "./layout.js";
import { animatePath, initializeAnimator } from "./animator.js";

// This function is used to configure the animation data
export const setConfiguration = (config) => setAnimationConfig(config);

// This funciton is used to draw the grid layout into the screen
export const startDrawingLayout = () => {
  initializeLayout();
  drawLayout();
  initializeAnimator();
};

// This function starts animations
export const startAnimating = () => {
  // This is the animation configuration data passed by the developer
  const { groupList, time } = getAnimation();
  const { group, delay } = time;
  const groupLength = groupList.length;

  // Totol time for one occurence of animation
  const totalTime = groupLength * (group + delay);

  // This function starts the animation
  const startOverallAnimation = () => {
    // Looping through all the groups
    groupList.forEach((animationGroup, index) => {
      setTimeout(() => {
        animationGroup.forEach((animation) => animatePath(animation));
      }, index * (group + delay));
    });
  };

  startOverallAnimation();

  // Looping the Animation after all the groups are completed animating
  setInterval(() => startOverallAnimation(), totalTime);
};
