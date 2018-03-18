import tilesResources from 'resources/tiles/tiles';
import uuid from 'uuid';

export default new class Tiles {

  tiles = {};

  constructor() {
    console.log(this.tiles);
  }

  create(blockId, { location }, options) {
    console.warn('create');
    const id = uuid.v4();
    this.tiles[id] = {
      blockId,
      location,
      options,
      resource: tilesResources[blockId],
    };
  }

  next(sequence) {
    const tilesArr = Object.entries(this.tiles);

    console.log(sequence % 10);

    tilesArr.map(([key, tile]) => {
      if (tile.resource.animate) {

        if (sequence % tile.resource.animate.speed !== 0) return;

        let sequenceId = tile.resource.animate.sequence.indexOf(tile.resource.sprite.location) + 1;
        if (sequenceId >= tile.resource.animate.sequence.length) {
          sequenceId = 0;
        }
        tile.resource.sprite.location = tile.resource.animate.sequence[sequenceId];
      }
    });
  }

  getAllTiles() {
    return Object.entries(this.tiles);
  }

};
