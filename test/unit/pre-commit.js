import path from 'path';
import os from 'os';

import chalk from 'chalk';
import execa from 'execa';
import Table from 'cli-table';
import symbol from 'log-symbols';

export default new class PreCommit {

  static tableStyle = {
    chars: {
      top: '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      bottom: '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      right: '',
      'right-mid': '',
      middle: ' ',
    },
  };

  static async exec(cmd) {
    try {
      const { stdout } = await execa.shell(cmd);
      return stdout;
    } catch (err) {
      console.log(chalk.red('----------------------- Unit tests failed ------------------'));
      console.log(chalk.redBright(err.stderr));
      console.log(chalk.red('----------------------- ----------------- ------------------'));
      process.exit(1);
    }
  }

  constructor() {
    this.init();
  }

  /**
   * Initialize pre-commit unit tests
   * - gather all files that should be unit tested
   * - prepare coverage for only the files that has changed
   * @return {Promise<void>}
   */
  async init() {

    console.log(chalk.blueBright('Pre-commit unit tests check'))

    // get all files modified since last commit
    let changedFiles = await PreCommit.exec('git diff --name-only --staged');

    // filter out all non js/jsx files and index files
    changedFiles = changedFiles.split(os.EOL).filter((file) => {
      if (/index\.(js|jsx)/.test(file)) return false;
      if (/\.(js|jsx)$/.test(file)) return true;
    });

    // get all tests related to modified files
    const relatedTests = await PreCommit.exec(`jest --listTests --findRelatedTests ${changedFiles.join(' ')}`);

    // merge
    const merged = {
      changedFiles,
      relatedTests: relatedTests.split(os.EOL),
    };

    // print table log with info of modified files and which will run the test
    this.printTableLog(merged);

    await this.executeJest(merged);
  }

  /**
   * Execute jest test
   * - pass over what to test and from where to collect coveragte
   * @param tests
   * @return {Promise<void>}
   */
  async executeJest(tests) {
    // prepare coverage command params
    const collectCoverageFrom = tests.changedFiles
      .map((from) => `--collectCoverageFrom "${from.replace(/src\//, '')}"`).join(' ');

    // prepare test scope params
    const testFiles = tests.relatedTests.map((file) => path.relative(process.cwd(), file)).join(' ');

    // execute jest
    console.log(`jest --config test/unit/jest-config.js -i --no-cache --coverage ${collectCoverageFrom} ${testFiles}`);
    await PreCommit.exec(`jest --config test/unit/jest-config.js -i --no-cache --coverage ${collectCoverageFrom} ${testFiles}`);
  }

  /**
   * Print table log
   * - just informative
   * - prints info about what tests will be run
   * @param tests
   */
  printTableLog(tests) {
    const table = new Table(PreCommit.tableStyle);
    // group files with tests
    const grouped = tests.changedFiles.map((file) => {
      const groupSearch = tests.relatedTests.filter((testFile) => (
        path.relative(process.cwd(), testFile.replace(/\.spec/, '')) === file
      ));
      if (!groupSearch.length) {
        return [file];
      }

      return [file, groupSearch];
    });
    console.log();
    table.push([chalk.blueBright('FILE'), chalk.blueBright('TEST FOUND')]);
    table.push([chalk.blueBright('------------------------'), chalk.blueBright('--------')]);
    for (const file of grouped) {
      table.push([
        file[0], file[1] ? symbol.success : '',
      ]);
    }
    console.log(table.toString());
    console.log();
  }
};
