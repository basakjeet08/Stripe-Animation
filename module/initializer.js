import { setAnimationConfig } from "./animationData.js";
import { drawLayout } from "./layout.js";
import { animatePath, setGridCells } from "./animator.js";

// Animation Initializer
const startOneGroupAnimation = (animationsObj, groupTime) => {
  // Iterate over each animation in the set
  animationsObj.forEach((animation) => {
    animatePath(animation.start, animation.end, animation.direction, groupTime);
  });
};

const startRendering = (animationData) => {
  const gridCells = drawLayout({
    layoutMap: animationData.layoutMap,
    container: animationData.animationContainer,
    drawElement: animationData.drawChildElement,
  });

  setGridCells(gridCells);

  const groupLength = animationData.animationGroups.length;
  const groupTime = animationData.time.animationGroupTime;
  const delayTime = animationData.time.delayBetweenGroups;

  const totalTime = groupLength * (groupTime + delayTime);

  const startOverallAnimation = () => {
    animationData.animationGroups.forEach((animationsObj, index) => {
      setTimeout(() => {
        startOneGroupAnimation(
          animationsObj,
          animationData.time.animationGroupTime
        );
      }, index * (animationData.time.animationGroupTime + animationData.time.delayBetweenGroups));
    });
  };

  startOverallAnimation();

  // Looping the Animation after all the groups are completed animating
  setInterval(() => startOverallAnimation(), totalTime);
};

// This Function configures the animation data and then starts rendering it
export const initializeAnimation = (config) => {
  // Configuring the animation
  const animationData = setAnimationConfig(config);

  // Starting the animation rendering
  startRendering(animationData);
};
