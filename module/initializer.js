import { setAnimationConfig, getAnimationData } from "./animationData.js";
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
  const { animationGroups, time } = getAnimationData();
  const { groupTime, delayTime } = time;
  const groupLength = animationGroups.length;

  // Totol time for one occurence of animation
  const totalTime = groupLength * (groupTime + delayTime);

  // This function starts the animation
  const startOverallAnimation = () => {
    // Looping through all the groups
    animationGroups.forEach((animationGroup, index) => {
      setTimeout(() => {
        animationGroup.forEach((animation) => animatePath(animation));
      }, index * (groupTime + delayTime));
    });
  };

  startOverallAnimation();

  // Looping the Animation after all the groups are completed animating
  setInterval(() => startOverallAnimation(), totalTime);
};
