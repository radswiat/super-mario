import fs from 'fs';

import find from 'findup-sync';

/**
 * Get git branch name
 */
export default new class GetBranch {

  /**
   * Get branch name
   * @return {*}
   */
  get() {
    return this._parseBranch(fs.readFileSync(this._gitHeadPath(process.cwd())));
  }

  _parseBranch(buf) {
    const match = /ref: refs\/heads\/([^\n]+)/.exec(buf.toString());
    return match ? match[1] : null;
  }

  _gitHeadPath() {
    const filepath = find('.git/HEAD', { cwd: process.cwd() });
    if (!fs.existsSync(filepath)) {
      throw new Error('.git/HEAD does not exist');
    }
    return filepath;
  }
};
