impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'
impwort { Wogger } fwom '../../stwuctures/util/Wogger'

expwort default class DebugListenyer extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'debug'
  }

  async on(client, message) {
    if (pwocess.env.PWODUCTION === 'false') {
      Wogger.debug(message)
    }
  }
}
