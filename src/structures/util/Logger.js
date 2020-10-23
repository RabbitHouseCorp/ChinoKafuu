const chalk = require('chalk')
const moment = require('moment')


module.exports = class Logger {
	static get processType() {
		return require('worker_threads').isMainThread
			? chalk.bgBlue('LOG')
			: chalk.black.bgMagenta(`CLUSTER ${process.env.CLUSTER_ID}`)
	}

	static generateLog(logType, message) {
		console.log(`${chalk.yellow(moment(Date.now()).format('LLLL'))} ${this.processType} ${logType} ${message}`)
	}

	static debug(message) {
		if (process.env.PRODUCTION === 'true') return
		this.generateLog(chalk.rgb(80, 250, 159)('[DEBUG]'), message)
	}

	static info(message) {
		this.generateLog(chalk.blue('[INFO]'), message)
	}

	static warning(message) {
		this.generateLog(chalk.yellow('[WARNING]'), message)
	}

	static error(message) {
		this.generateLog(chalk.red('[ERROR]'), message)
	}

	static shardMessage(message) {
		this.generateLog(chalk.rgb(49, 204, 201)('[SHARD MANAGER]'), message)
	}

	static fatalError(message) {
		this.generateLog(chalk.bgRed('[FATAL ERROR]'), message)
		process.exit()
	}
}
