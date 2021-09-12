const Listener = require('../../structures/events/Listener')

module.exports = class SlashCommand extends Listener {
  constructor() {
    super()
    this.event = 'ready'
    this.loadStarted = false
  }

  async on(client) {
    if (this.loadStarted === false) {
      this.loadStarted = true
      const commandFolder = []
      for (const command of client.slashCommandRegistry.modules) {
        if (!(command.slash === null)) {
          commandFolder.push(command.slash)
        }
      }

      // commandRegistry:


      // This is for production testing.
      // client.slashCommand.addVolumeOfCommands(commandFolder)
      // Remembering that you have to remove the bot
      // from the server and add it again to update the commands quickly.

      // client.slashCommand.createCommand(commandFolder)
      client.slashCommand.addVolumeOfCommands(commandFolder)
    }
  }
}
