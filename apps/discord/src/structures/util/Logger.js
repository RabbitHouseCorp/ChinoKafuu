import chalk from 'chalk'
import { isMainThread } from 'worker_threads'
chalk.level = 8

export class Logger {
  static get processType() {
    return isMainThread
      ? chalk.bgBlue('LOG')
      : chalk.black.bgMagenta(`CLUSTER ${process.env.CLUSTER_ID}`)
  }

  static generateLog(logType, message) {
    console.log(`${chalk.yellow(Date().toString())} ${this.processType} ${logType} ${message}`)
  }

  static debug(message) {
    if (process.env.PRODUCTION === 'true') return
    // chalk.rgb(80, 250, 159)('[DEBUG]')
    this.generateLog(chalk.blueBright('[DEBUG]'), message)
  }

  static info(message) {
    this.generateLog(chalk.blue('[INFO]').toString('utf-8'), message)
  }

  static warning(message) {
    this.generateLog(chalk.yellow('[WARNING]').toString('utf-8'), message)
  }

  static error(message) {
    this.generateLog(chalk.red('[ERROR]').toString('utf-8'), message)
  }

  static shardMessage(message) {
    if (process.env.PRODUCTION === 'true') return
    // chalk.rgb(49, 204, 201)
    this.generateLog(chalk.bgMagentaBright('[SHARD MANAGER]'), message)
  }

  static fatalError(message) {
    this.generateLog(chalk.bgRed('[FATAL ERROR]'), message)
    process.exit()
  }
}
