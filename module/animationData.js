// This is the data store which stores all the data
const animationData = {
  layoutMap: [],
  animationContainer: null,
  drawChildElement: () => {},
  svgContainer: null,
  animationGroups: [],
  time: {
    animationGroupTime: 3000,
    delayBetweenGroups: 1000,
  },
};

// This function is used to set the time configurations for the animation
const setTimeConfig = (timeConfig = {}) => {
  animationData.time = {
    ...animationData.time,
    ...timeConfig,
  };
};

// This is used to set the animation configurations
export const setAnimationConfig = (config = {}) => {
  animationData.layoutMap = config.layoutMap;
  animationData.animationContainer = config.animationContainer;
  animationData.drawChildElement = config.drawChildElement;
  animationData.svgContainer = config.svgContainer;
  animationData.animationGroups = config.animationGroups;

  // Setting the time configurations
  setTimeConfig(config.time);

  return getAnimationData();
};

// This is the getter function to get the Animation data
export const getAnimationData = () => {
  return { ...animationData, time: { ...animationData.time } };
};
