import path from 'path';

import to from 'await-to-js';

import readFile from './_read-file';

import log from '../log/log';

export default async function getPackageJson() {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const [err, packageJson] = await to(readFile(packageJsonPath));
  if (err) {
    // log status
    log.status('packageJson', false);
    log.error(err);
    return null;
  }
  return JSON.parse(packageJson);
}
