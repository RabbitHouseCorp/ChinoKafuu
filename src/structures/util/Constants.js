const { version } = require('../../../package.json')
const Logger = require('../../structures/util/Logger')
const chalk = require('chalk')

module.exports.profileConstants = {
  default: 1 << 1,
  modern: 1 << 2,
  profile_2: 1 << 3,
}

module.exports.backgroundConstants = {
  gochiusa_1: 1 << 1,
  gochiusa_2: 1 << 2,
  gochiusa_3: 1 << 3,
  gochiusa_4: 1 << 4,
  gochiusa_5: 1 << 5,
  mtchaRed: 1 << 6,
  noGameNoLife_1: 1 << 7,
  noGameNoLife_2: 1 << 8,
  nycSkyline: 1 << 9,
  showByRock_1: 1 << 10,
  showByRock_2: 1 << 11,
  showByRock_3: 1 << 12,
  showByRock_4: 1 << 13
}

module.exports.backgroundPriceTableConstants = {
  'gochiusa_1': 10000,
  'gochiusa_2': 10350,
  'gochiusa_3': 10300,
  'gochiusa_4': 12000,
  'gochiusa_5': 19000,
  'mtchaRed': 100000,
  'noGameNoLife_1': 1000000,
  'noGameNoLife_2': 1000000,
  'nycSkyline': 720,
  'showByRock_1': 1040000,
  'showByRock_2': 1900000,
  'showByRock_3': 1200000,
  'showByRock_4': 1920000
}

module.exports.profilePriceTableConstants = {
  'default': 0,
  'modern': 10000000,
  'profile_2': 28000000,
  'cute_profile': 0,
}

module.exports.profileInfo = [
  {
    name: 'Modern',
    _id: 'modern',
    flag: 1 << 2,
    readyForSale: true,
    description: null,
    shotDescription: null,
    price: module.exports.profilePriceTableConstants[1],
    buttonId: 'modern',
    disabled: false
  },
  {
    name: 'Profile Nitro',
    _id: 'profile_2',
    flag: 1 << 3,
    readyForSale: true,
    description: null,
    shotDescription: null,
    price: module.exports.profilePriceTableConstants[2],
    buttonId: 'profile_2',
    disabled: false
  },
  {
    name: 'Cute Profile',
    _id: 'cute_profile',
    flag: 1 << 4,
    readyForSale: false,
    description: null,
    shotDescription: null,
    price: module.exports.profilePriceTableConstants[3],
    buttonId: 'cute_profile',
    disabled: false
  }
]

module.exports.applicationCommandOptionType = {
  subCommand: 1,
  subCommandGroup: 2,
  string: 3,
  integer: 4,
  boolean: 5,
  user: 6,
  channel: 7,
  role: 8,
  mentionable: 9,
  number: 10
}

module.exports.applicationCommandPermissionType = {
  role: 1,
  user: 2
}

module.exports.typeCommand = {
  slashCommand: 1,
  userCommand: 2,
  messageCommands: 3,
  autoCompete: 4
}

module.exports.componentTypes = {
  actionRow: 1,
  button: 2,
  selectMenu: 3
}

module.exports.buttonStyle = {
  primary: 1,
  secondary: 2,
  success: 3,
  danger: 4,
  link: 5
}

module.exports.Flags_Guild = {
  GUILD_TESTER: 1 << 0,
  PREMIUM: 1 << 1,
  COMMAND_ACCESS_TESTER: 1 << 2,
  PARTNER: 1 << 3,
  BLACKLIST: 1 << 4,
  VERIFIED: 1 << 5,

  // Tool for dev
  NO_COOLDOWN: 1 << 6,
}

module.exports.Flags_Users = {
  DEVELOPER: 1 << 0,
  BUG_HUNTER: 1 << 1,
  BUG_HUNTER_EXTREME: 1 << 2,
  VOTE_ACTIVE: 1 << 4,
  TRANSLATOR: 1 << 5,
  VERIFIED: 1 << 6,
  ACCESS_TO_BUY_PROFILE: 1 << 7,
  ACCESS_TO_DECORATE_PROFILE: 1 << 8,
  BOOST_ACTIVE: 1 << 9,
  SUPPORT: 1 << 14,
  // Tool for dev
  NO_COOLDOWN: 1 << 10,

  // STORE
  BLACKLIST_STORE: 1 << 11,
  STORE_ACCESS: 1 << 3,
  ADMIN_STORE: 1 << 12,
  PARTNER_STORE: 1 << 13
}

module.exports.Flags_Command = {
  BROKEN_COMMAND: 1 << 0,
  BROKEN_COMMAND_NOTICED: 1 << 1,
  BUG_TRACKING: 1 << 2,
  DISABLED: 1 << 3,
  COMMAND_TESTER: 1 << 4
}

module.exports.BUILD_INFO = {
  version: version,
  build: Buffer.from(version).toString('base64'),
  commit_log: async () => {
    const { exec } = require('child_process')
    let kill_process = false
    if (process.env.BUILD_SHOW === undefined) {
      return
    }
    if (process.env.BUILD_SHOW === 'false') {
      return
    }
    const e = await exec('git show', async (error, stdout) => {
      if (error) {
        kill_process = true
        await e.kill() // Kill process.
        return
      }
      const get_first_line = stdout.split('\n')[0]
      const get_message = stdout.split('\n')[4].replace(/ +([^A-Za-z0-9_])/g, '')
      Logger.info(`${chalk.green(`[BUILD COMMIT]`)} ${get_first_line.replace(/commit( +)|(^[A-Za-z0-9_]+)|( +\(.*\))/g, '')} (${version}) / ${get_message}`)
      Logger.debug(`${chalk.magenta('[BUILD PRODUCTION]')} ${process.env.PRODUCTION ? `${chalk.greenBright(`Channel: Beta`)}` : `${chalk.blueBright(`Channel: Production`)}`}`)
      await e.kill()
      kill_process = true
    })
    if (!kill_process) {
      await e.kill()
    }
  },
  getCommit: async () => {
    const { exec } = require('child_process')
    const data = {
      commit: null,
      message: null,
      version: version
    }
    if (process.env.BUILD_SHOW === undefined) {
      return data
    }
    if (process.env.BUILD_SHOW === 'false') {
      return data
    }
    const e = await exec('git show', async (error, stdout) => {
      if (error) {
        await e.kill()
        return
      }
      const get_first_line = stdout.split('\n')[0]
      const get_message = stdout.split('\n')[4].replace(/ +([^A-Za-z0-9_])/g, '')
      data.commit = get_first_line.replace(/commit( +)|(^[A-Za-z0-9_]+)|( +\(.*\))/g, '')
      data.message = get_message
      await e.kill()
    })

    return data
  }
}