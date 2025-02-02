// This is the data store which stores all the data
const animationData = {
  layoutMap: [],
  container: null,
  drawChildElement: () => {},
  gridCells: [],
  svgContainer: null,
  animationGroups: [],
  strokeStyles: [],
  time: {
    groupTime: 3000,
    delayTime: 1000,
  },
};

// This is used to set the animation configurations
export const setAnimationConfig = (config = {}) => {
  Object.assign(animationData, config);
};

// This is the getter function to get the Animation data
export const getAnimationData = () => {
  return { ...animationData, time: { ...animationData.time } };
};

// This function is used to set the cells which are in the grid
export const setCells = (cells) => {
  animationData.gridCells = cells;
};
