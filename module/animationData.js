// This is the data store which stores all the data
const animationConfig = {
  grid: {
    container: null,
    layout: [],
    cellList: [],
    functions: {
      drawCellElement: (_isActiveChild, _activeCount) => {},
    },
  },

  animation: {
    container: null,
    groupList: [],
    hover: null,
    time: { group: 3000, delay: 1000 },

    functions: {
      drawPath: (_path) => {},
    },
  },
};

// This is used to set the animation configurations
export const setAnimationConfig = (config = {}) => {
  animationConfig.grid = { ...animationConfig.grid, ...config.grid };
  animationConfig.animation = {
    ...animationConfig.animation,
    ...config.animation,
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
