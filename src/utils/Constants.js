const package = require('../../package.json')
const Logger = require('../structures/util/Logger')
const chalk = require('chalk')
module.exports.Flags_Guild = {
  GUILD_TESTER: 1 << 0,
  PREMIUM: 1 << 1,
  COMMAND_ACCESS_TESTER: 1 << 2,
  PARTNER: 1 << 3,
  BLACKLIST: 1 << 4,
  VERIFIED: 1 << 5
}

module.exports.Flags_Users = {
  DEVELOPER: 1 << 0,
  BUG_HUNTER: 1 << 1,
  BUG_HUNTER_EXTREME: 1 << 2,
  VOTE_ACTIVE: 1 << 4,
  TRANSLATOR: 1 << 5,
  VERIFIED: 1 << 6,
  STORE_ACCESS: 1 << 3,
  ACCESS_TO_BUY_PROFILE: 1 << 7,
  ACCESS_TO_DECORATE_PROFILE: 1 << 8,
  BOOST_ACTIVE: 1 << 9,
}

module.exports.Flags_Command = {
  BROKEN_COMMAND: 1 << 0,
  BROKEN_COMMAND_NOTICED: 1 << 1,
  BUG_TRACKING: 1 << 2,
  DISABLED: 1 << 3,
  COMMAND_TESTER: 1 << 4
}

module.exports.BUILD_INFO = {
  version: package.version,
  build: Buffer.from(package.version).toString('base64'),
  commit_log: async () => {
    const { exec } = require('child_process');
    exec('git show', (error, stdout) => {
      if (error) {
        return;
      }
      const get_first_line = stdout.split('\n')[0]
      const get_message = stdout.split('\n')[4].replace(/ +([^A-Za-z0-9_])/g, '')
      Logger.info(`${chalk.green(`[BUILD COMMIT]`)} ${get_first_line.replace(/commit( +)|(^[A-Za-z0-9_]+)|( +\(.*\))/g, '')} (${package.version}) / ${get_message}`)

    });
  },
  getCommit: async () => {
    const { exec } = require('child_process');
    const data = {
      commit: null,
      message: null,
      version: package.version
    }
    await exec('git show', (error, stdout) => {
      if (error) {
        return;
      }
      const get_first_line = stdout.split('\n')[0]
      const get_message = stdout.split('\n')[4].replace(/ +([^A-Za-z0-9_])/g, '')
      data.commit = get_first_line.replace(/commit( +)|(^[A-Za-z0-9_]+)|( +\(.*\))/g, '')
      data.message = get_message
    });
    return data
  }
}