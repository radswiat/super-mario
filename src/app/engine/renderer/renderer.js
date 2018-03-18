import { canvasCfg } from 'config';

import tiles from 'objects/tiles/tiles';

export default new class Renderer {

  constructor() {
    this.ctx = this._createCtx('background');
  }

  /**
   * Create ctx
   * - ctx is a canvas 2D rendering context
   * @param ctxName
   * @return {CanvasRenderingContext2D}
   */
  _createCtx(ctxName) {
    // create canvas element
    const canvas = document.createElement('canvas');
    // set canvas attributes
    canvas.setAttribute('is', `canvas-${ctxName}`);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // get parent element
    const parent = document.querySelector(canvasCfg.targetNode);
    // append canvas to parent element
    parent.append(canvas);
    // return ctx
    const ctx = canvas.getContext('2d');
    // disable auto-aliasing
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    // return ctx
    return ctx;
  }

  async _loadImage(imgPath) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imgPath; // can also be a remote URL e.g. http://
      img.onload = () => {
        resolve(img);
      };
    });
  }

  async render(sequence) {

    tiles.next(sequence);

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const [key, tile] of tiles.getAllTiles()) {
      let img = tile.img;

      // cache image load
      // load image and assign back to tile
      // - loading image before rendering prevent's
      //   unnecessary sprite loading for things that
      //   are not yet necessary to be rendered
      if (!img) {
        img = await this._loadImage(tile.resource.sprite.img);
        tile.img = img;
      }

      // prepare sprite drawing
      const spriteLocation = tile.resource.sprite.location;
      const spriteSize = tile.resource.sprite.size;
      const canvasLocation = tile.location;
      const canvasSize = [50, 50];

      this.ctx.drawImage(
        img,
        ...spriteLocation,
        ...spriteSize,
        ...canvasLocation,
        ...canvasSize,
      );
    }

  }

};
