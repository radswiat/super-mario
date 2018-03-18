import heartbeat from 'engine/heartbeat';
import renderer from 'engine/renderer';

import tiles from 'objects/tiles/tiles';

export default new class App {

  constructor() {
    tiles.create('DIRT', { location: [200, 100] }, {
      static: true,
      theme: 'default',
    });

    tiles.create('DIRT_BLOCK', { location: [300, 450] }, {
      static: true,
      theme: 'default',
    });

    tiles.create('QUESTION_MARK', { location: [200, 250] }, {
      static: true,
      theme: 'default',
    });

    heartbeat.onHeartbeat((sequence) => {
      renderer.render(sequence);
    });
  }

}
