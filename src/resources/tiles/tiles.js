export default {
  DIRT: {
    sprite: {
      img: 'assets/tiles.png',
      location: [40, 3],
      size: [16, 16],
    },
  },
  DIRT_BLOCK: {
    sprite: {
      img: 'assets/tiles.png',
      location: [58, 3],
      size: [16, 16],
    },
  },
  QUESTION_MARK: {
    sprite: {
      img: 'assets/tiles.png',
      location: [95, 3],
      size: [16, 16],
    },
    animate: {
      type: '',
      speed: 6,
      sequence: [[95, 3], [95, 3], [95, 3], [95, 3], [112, 3], [129, 3]],
    },
  },
};
