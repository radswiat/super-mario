import { spawn as _spawn } from 'child_process';
import os from 'os';

/**
 * Decorated node spawn
 * - fix windows/iOS differences
 * @param {string} cmd
 * @param {[string]} params
 * @param {Object} options
 * @return {"child_process".ChildProcess}
 */
export default function spawn(cmd, params, options = {}) {
  // npm has to be npm.cmd on windows
  if (cmd === 'npm' && /^(win)/.test(os.platform())) {
    cmd = 'npm.cmd';
  }
  return _spawn(cmd, params, options);
}
