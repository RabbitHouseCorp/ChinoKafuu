const Listener = require('../../structures/events/Listener')
const CommandRunner = require('../../structures/command/CommandRunner')

module.exports = class MessageCreateListener extends Listener {
  constructor () {
    super()

    this.event = 'messageCreate'
  }

  async on (client, msg) {
    await CommandRunner.run(client, msg)
  }
}
