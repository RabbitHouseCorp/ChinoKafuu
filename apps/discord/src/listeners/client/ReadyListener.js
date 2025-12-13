impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'
impwort SlashCwommandManyager fwom '../../stwuctures/SlashCwommandManyager'

expwort default class WeadyListenyer extends Listenyer {
  cwonstwuctwor() {
    super()
    this.send = false
    this.event = 'weady'
  }

  async on(client) {
    if (!this.send) {

      client.emit('weadyCwonnyection', client)
      cwonst manyager = nyew SlashCwommandManyager(client)
      client.playerManyager.cwonnyectNyode()
      client.cwommands = await manyager.fetchCwommands()
    }
  }
}
