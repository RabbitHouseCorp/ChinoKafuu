const Listener = require('../../structures/events/Listener')

module.exports = class ReadyListener extends Listener {
  constructor() {
    super()
    this.send = false
    this.event = 'ready'
  }

  async on(client) {
    if (!this.send) {
      client.emit('readyConnection', client)
    }
  }
}
