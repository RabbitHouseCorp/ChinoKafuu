import chalk from 'chalk'



export class LoggerSystem {
  constructor(name) {
    this.name = name
  }

  get #getTimestamp() {
    const now = new Date()

    // Create a nice time format for framework.
    const trace = [
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-`,
      `${String(now.getDate()).padStart(2, '0')}T`,
      `${String(now.getHours()).padStart(2, '0')}:`,
      `${String(now.getMinutes()).padStart(2, '0')}:`,
      `${String(now.getSeconds()).padStart(2, '0')}.`,
      `${String(now.getMilliseconds()).padStart(3, '0')}Z`
    ]


    return trace.join('')
  }

  get #template() {
    return `${chalk.gray(this.#getTimestamp)}`
  }

  #colorMessage(message) {
    return message
      .replace(/\!\$".*"/g, (text) => chalk.yellowBright(text.replace(/^\!\$"|"$/g, '')))
      .replace(/\$".*"/g, (text) => chalk.redBright(text.replace(/^\$"|"$/g, '')))
      .replace(/Success|Connected|connected|successfully|Successfully/g, (text) => chalk.greenBright(text))
      .replace(/Error|error|ERROR|fail/g, (text) => chalk.redBright(text))
      .replace(/developer|debug/g, (text) => chalk.magentaBright(text))
      .replace(/(@(\\|\/)[A-Za-z0-9]+|\/[A-Za-z0-9]+)\.[A-Za-z0-9]+|(\/[A-Za-z0-9]+|\/[A-Za-z0-9]+)/g, (text) => chalk.blue(text))
      .replace(/^[a-zA-Z0-9]{24}$/g, '[REDACTED]')
      .replace(/@[A-Za-z0-9]+/g, (text) => chalk.yellowBright(text))
  }

  skipLine() {
    console.log('\n\n')
  }

  log(message) {
    if (process.argv.includes('--silent')) return;
    console.log(`${chalk.gray('[ ]')} ${this.#template} ${chalk.greenBright('LOG')}   [${chalk.white(this.name)}]: ${this.#colorMessage(message)}`)
  }

  warn(message) {
    console.warn(`${chalk.yellowBright('[!]')} ${this.#template} ${chalk.yellowBright('WARN')}  [${chalk.white(this.name)}]: ${this.#colorMessage(message)}`)
  }

  error(message) {
    console.error(`${chalk.redBright('[+]')} ${this.#template} ${chalk.redBright('ERROR')} [${chalk.white(this.name)}]: ${this.#colorMessage(message)}`)
  }

  debug(message) {
    if (process.argv.includes('--silent')) return;
    if (process.argv.includes('--debug')) {
      console.debug(`${chalk.blue('[-]')} ${this.#template} ${chalk.blueBright('DEBUG')} [${chalk.white(this.name)}]: ${this.#colorMessage(message)}`)
    }
  }

  trace(message) {
    if (process.argv.includes('--silent')) return;
    if (process.argv.includes('--trace')) {
      console.trace(`${chalk.gray('[{}]')}  ${this.#template} ${chalk.white('TRACE')}  [${chalk.white(this.name)}]: ${this.#colorMessage(message)}\n\n`)
    }
  }
}