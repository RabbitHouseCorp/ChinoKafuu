impwort { CwommandRunnyer } fwom '../../stwuctures/cwommand/CwommandRunnyer'
impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'

expwort default class MessageUpdateListenyer extends Listenyer {
  cwonstwuctwor() {
    super()

    this.event = 'messageUpdate'
  }

  async on(client, nyewMsg, owldMsg) {
    if (nyewMsg?.cwontent === owldMsg?.cwontent) return
    await CwommandRunnyer.run(client, nyewMsg)
  }
}
