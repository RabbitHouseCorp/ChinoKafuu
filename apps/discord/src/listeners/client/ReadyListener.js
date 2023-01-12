import { Listener } from '../../structures/events/Listener'

export default class ReadyListener extends Listener {
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
