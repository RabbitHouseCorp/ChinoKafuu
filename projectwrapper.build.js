const ProjectWrapper = require('tsc-compile-projects')
const { LoggerWrapper } = require('./utils/src/index').UtilsWrapper

require('dotenv').config()

const TypesLogging = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
}
const targets = [{
  'name': 'revolt',
  'projectDir': './revolt',
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
          LoggerWrapper.log({
            typeLog: 'LOG',
            project: `Typescript::${interpreter.projectName}`,
            message: parse.metadata.message.replace(/[A-Za-z0-9.,]\n\n/g, '').replace(/\n\n[A-Za-z0-9_:-]|\n[A-Za-z0-9_:-]/g, '')
          })
        }
          break
        // case 'errorTs': {
        // }
        //   break
      }
    })
    // wrapper.on('logging', (log) => {
    //   switch (log[0].logging) {
    //     case TypesLogging.TYPESCRIPT: {
    //       LoggerWrapper.log({
    //         typeLog: 'LOG',
    //         project: `Typescript::${log[0].data.projectName}`,
    //         message: log[0].data.message.replace(/[A-Za-z0-9.,]\n\n/g, '').replace(/\n\n[A-Za-z0-9_:-]|\n[A-Za-z0-9_:-]/g, '')
    //       })
    //     }
    //   }
    // })
  })
  .catch((err) => console.log(err))