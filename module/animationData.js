// This is the data store which stores all the data
const animationData = {
  layoutMap: [],
  animationContainer: null,
  drawChildElement: () => {},
  svgContainer: null,
  animationGroups: [],
  strokeStyles: [],
  time: {
    animationGroupTime: 3000,
    delayBetweenGroups: 1000,
  },
};

// This is used to set the animation configurations
export const setAnimationConfig = (config = {}) => {
  Object.assign(animationData, config);
  return getAnimationData();
};

// This is the getter function to get the Animation data
export const getAnimationData = () => {
  return { ...animationData, time: { ...animationData.time } };
};
