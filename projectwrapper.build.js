const EventEmitter = require('events')
const ProjectWrapper = require('tsc-compile-projects')
const { LoggerWrapper } = require('./utils/src/index').UtilsWrapper
const times = new Map()
const reloads = new Map()
require('dotenv').config()

const TypesLogging = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
}
const targets = [{
  'name': 'revolt',
  'projectDir': './apps/revolt',
  'watchMode': process.env.PRODUCTION === 'true' ? false : true,
  'args': []
}]

const printTargets = () => {
  const prints = []
  const targetPrint = (b) => {
    const a = []

    a.push(LoggerWrapper.toColor(3, '+===============================+'))
    a.push(`|`.padEnd(32, ' ') + '|')
    a.push(`| 📜 Name: ${b.name}`.padEnd(32, ' ') + '|')
    a.push(`| 📁 Directory: ${b.projectDir}`.padEnd(32, ' ') + '|')
    a.push(`| 🔥 Hot Reload: ${process.env.PRODUCTION === 'true' ? LoggerWrapper.toColor(1, '  No  ') : LoggerWrapper.toColor(0, '  Yes  ')}`.padEnd(42, ' ') + '|')
    a.push(`|`.padEnd(32, ' ') + '|')
    a.push(LoggerWrapper.toColor(3, '+===============================+'))

    return a.map((a) => `       ${a}`).join('\n')
  }
  prints.push('Project Wrapper Settings!')
  prints.push('\n')
  prints.push(`  👉  Hot Reload: ${process.env.PRODUCTION === 'false' ? LoggerWrapper.toColor(0, '  Mode Developer  ') : LoggerWrapper.toColor(1, '  Production  ')}`)
  prints.push(`  👉  Targets:\n`)
  for (const i of targets) {
    prints.push(targetPrint(i))
  }
  prints.push('\n')
  return prints.join('\n')
}

module.exports = class Wrapper extends EventEmitter {
  constructor(platformManager) {
    super();
    this.platformManager = platformManager
  }
  runner() {
    const build = ProjectWrapper.initializeDefault({
      hotReload: process.env.PRODUCTION === 'true' ? false : true,
      command: [],
      lowCpuUsage: true,
      targets
    })

    build
      .then((wrapper) => {
        LoggerWrapper.log({
          typeLog: 'WARNING',
          message: printTargets()
        })
        wrapper.on('endCompile', () => {
        })
        wrapper.interpreter.on('debugData', ({ eventName, interpreter, parse }) => {
          switch (eventName) {
            case 'startingCompilation': {
              if (times.get(interpreter.projectName) !== null) {
                times.delete(interpreter.projectName)
              }

              times.set(interpreter.projectName, Date.now())

              LoggerWrapper.log({
                typeLog: 'LOG',
                project: `Typescript::${interpreter.projectName}`,
                message: parse.metadata.message.replace(/[A-Za-z0-9.,]\n\n/g, '').replace(/\n\n[A-Za-z0-9_:-]|\n[A-Za-z0-9_:-]/g, '')
              })
            }
              break
            case 'errorTs': {
              const t = Date.now() - times.get(interpreter.projectName)

              LoggerWrapper.log({
                typeLog: 'ERROR',
                project: `Typescript::${interpreter.projectName}`,
                message: parse.metadata.messageOriginal + ` ${t.toFixed(1)}s+`
              })
            }
              break
            case 'eventFindCountOfError': {
              const t = Date.now() - times.get(interpreter.projectName)
              if (reloads.get(interpreter.projectName) !== null) {
                reloads.delete(interpreter.projectName)
                this.platformManager.platforms.get(interpreter.projectName).runner()
              }
              LoggerWrapper.log({
                typeLog: 'WARNING',
                project: `Typescript::${interpreter.projectName}`,
                message: 'Ok!' + ` ${t.toFixed(1)}s+`
              })
            }
              break
            default:
              LoggerWrapper.log({
                typeLog: 'LOG',
                project: `Typescript::${interpreter.projectName}()`,
                message: parse.metadata.message
              })
              if (reloads.get(interpreter.projectName)) {
                reloads.delete(interpreter.projectName)
              }
              if (`${parse.metadata.message}`.match(/Starting incremental compilation\.\.\./g)) {
                reloads.set(interpreter.projectName, true)
              }
          }
        })
      })
      .catch((err) => console.log(err))
    return this
  }
}