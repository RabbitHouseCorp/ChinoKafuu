const { spawn } = require('child_process')
const { Logger } = require('../../../discord/src/structures/util/index')
const EventEmitter = require('events')

module.exports = class TypescriptCommand extends EventEmitter {
  constructor() {
    super()
    this.started = false
  }

  async start() {
    const command = spawn('tsc', ['-w'])
    let timeStarting = Date.now()
    let started = 0
    command.stdout.on('data', (data) => {
      this.emit('message', data.toString('utf-8'))
    })
    const watchTime = () => {
      let time = null

      timeStarting = Date.now()
      if (time == null) {
        console.clear()
        if (this.started) {
          Logger.warning('Restarting ...')
          timeStarting = Date.now()
        }
        time = setInterval(function () {
          const t = Date.now() - timeStarting
          if (this.started) {
            process.stdout.write(`\rApplication took ${(t / 1000).toFixed(2)} seconds to restarting... (${(Date.now() - timeStarting).toString(14)})`)
          } else {
            process.stdout.write(`\rApplication took ${(t / 1000).toFixed(2)} seconds to start... (${(Date.now() - timeStarting).toString(14)})`)
          }

        }, 150)

        console.log('')

        this.once('started', () => {
          clearInterval(time)
          const t = Date.now() - timeStarting
          started = (t / 1000).toFixed(2)
        })
      }
    }

    watchTime()

    this.on('message', (msg) => {
      if (msg.match('Watching for file changes.')) {
        if (this.started == true) {
          this.emit('restarting', this.started)
          watchTime()
        }
      }
      if (msg.replace(/\\u001b\[91|\\u001b\[0m\\u001b\[90m/g, '').match(/(TS[0-9]+)/g)) {
        this.emit('errorCompiler', true, msg)
        const bar = '='.repeat(100)
        Logger.error(`[Typescript Watch]\n${bar}\n${msg}\n${bar}\n`)
        return
      }
      if (msg.match('Watching for file changes.')) {
        this.emit('update', true)

        if (this.started == true) {
          this.emit('started', this.started)
          const t = Date.now() - timeStarting
          started = (t / 1000).toFixed(2)
          Logger.info(`Application restarted successfully! (${started}ms!)`)
        } else {
          const t = Date.now() - timeStarting
          started = (t / 1000).toFixed(2)
          Logger.info(`Ok! Starting application... (${started}ms!)`)
          this.started = true;
          this.emit('started', this.started)
        }
        Logger.warning(`[Typescript Watch]: ${msg}`)
        return
      }
    })
    command.on('error', (err) => { Logger.error(err) })
    command.on('spawn', () => {
      Logger.warning('[Typescript Watch]: Starting auto compiler! (Typescript)\n')
    })
    command.on('exit', (code) => {
      Logger.error(`[Typescript Watch]: Copiler was killed by some system operator. code=${code}`)
      process.kill(-1)
    })
  }
}