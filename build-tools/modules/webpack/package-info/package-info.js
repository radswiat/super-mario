import fs from 'fs';
import path from 'path';

import getBranchName from './helpers/get-branch';

export default (packagePath = 'package.json') => {

  // get package json data
  const packageJsonPath = path.resolve(process.cwd(), packagePath);
  let packageInfo = fs.readFileSync(packageJsonPath, 'utf-8');
  packageInfo = JSON.parse(packageInfo);

  // get branch name
  packageInfo.branchName = getBranchName.get();

  return packageInfo;
};
