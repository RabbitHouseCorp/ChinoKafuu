impwort { CwommandRunnyer } fwom '../../stwuctures/cwommand/CwommandRunnyer'
impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'

expwort default class MessageCweateListenyer extends Listenyer {
  cwonstwuctwor() {
    super()

    this.event = 'messageCweate'
  }

  async on(client, msg) {
    await CwommandRunnyer.run(client, msg)
  }
}
