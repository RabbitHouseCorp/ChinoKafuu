const chalk = require('chalk')
chalk.level = 8
const LogTypes = {
  LOG: 'LOG',
  WARN: 'WARNING',
  ERROR: 'ERROR',
  TRACE: 'TRACE',
  DEBUG: 'DEBUG'
}

const toColor = (color, text) => {
  switch (color) {
    case 0:
      return chalk.yellowBright(text)
    case 0.1:
      return chalk.bgYellowBright.whiteBright(text)
    case 1:
      return chalk.greenBright(text)
    case 1.1:
      return chalk.whiteBright(text)
    case 2:
      return chalk.red(text)
    case 2.2:
      return chalk.bgGray.redBright(text)
    case 3:
      return chalk.gray(text)
  }
}

const log = (optionsLog = {
  typeLog: 'LOG',
  isTrace: false,
  tasks: {
    in: 0,
    to: 0
  },
  project: '',
  time: {
    t: 0,
    best: 0,
    low: 0,
  },
  message: '',
}) => {
  const display = []
  if (optionsLog.project === '' || typeof optionsLog.project === 'string') {
    display.push(chalk.gray(` ${optionsLog.project} -  `))
  }
  switch (optionsLog.typeLog) {
    case LogTypes.LOG:
      display.push(chalk.whiteBright(`[${optionsLog.typeLog}]`))
      break
    case LogTypes.DEBUG:
      display.push(chalk.greenBright(`[${optionsLog.typeLog}]`))
      break
    case LogTypes.ERROR:
      display.push(chalk.red(`[${optionsLog.typeLog}]`))
      break
    case LogTypes.TRACE:
      display.push(chalk.magenta(`[${optionsLog.typeLog}]`))
      break
    case LogTypes.WARN:
      display.push(chalk.yellowBright(`[${optionsLog.typeLog}]`))
      break
    default:
      display.push(`[${optionsLog.typeLog}]`)
  }
  if (optionsLog.tasks !== undefined) {
    if (optionsLog.tasks.in < 0 || optionsLog.tasks.to !== 0) {
      display.push(chalk.cyanBright(`    ⏰ [${optionsLog.tasks.in}/${optionsLog.tasks.to}]    `))
    }
  }

  if (typeof optionsLog.message === 'string') {
    display.push(optionsLog.message)
  } else {
    display.push(optionsLog.message)
  }

  switch (optionsLog.typeLog) {
    case LogTypes.LOG:
      console.log(display.join(' '))
      break
    case LogTypes.DEBUG:
      console.debug(display.join(' '))
      break
    case LogTypes.ERROR:
      console.error(display.join(' '))
      break
    case LogTypes.TRACE:
      console.trace(display.join(' '))
      break
    case LogTypes.WARN:
      console.warn(display.join(' '))
      break
    default:
      console.log(display.join(' '))
  }
}

module.exports.LoggerWrapper = {
  toColor,
  log
}