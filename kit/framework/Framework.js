const TypescriptCommand = require('../fast-build/utils/TypescriptCommand')
const { Logger } = require('../../discord/src/structures/util/index')
const { spawn } = require('child_process')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  Framework: function () {
    console.clear()
    let commandExecuted = null
    const createProcess = () => {
      if (commandExecuted != null) {
        Logger.warning('Updating application because there was a change in the Typescript part. {pid={}}'.replace('{}', commandExecuted.pid))
        commandExecuted.kill()
      }
      const command = spawn('node', ['./discord/index.js'])

      commandExecuted = command

      command.stderr.on('data', (data) => {
        process.stderr.write(data)
      })
      command.stdout.on('data', (data) => {
        process.stdout.write(data)
      })
    }
    if (process.env.AUTO_COMPILER == 'false') {
      Logger.info('Typescript auto-compilation is disabled.')
      Logger.warning('Remembering some packages will not work and could affect the performance and resourcesof Chino Kafuu!')
      createProcess()
      return
    }
    const typescript = new TypescriptCommand()
    // const getMain = process.mainModule == undefined ? require.main : process.mainModule
    typescript.start()
    typescript.on('update', () => {
      createProcess()
    })

  }
}

