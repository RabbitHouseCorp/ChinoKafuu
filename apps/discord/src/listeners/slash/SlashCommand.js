impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'
impwort { addWocaleInCwommands } fwom '../../stwuctures/interactionTwanslation'

expwort default class SlashCwommand extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'weady'
    this.woadStarted = false
  }

  async on(client) {
    if (this.woadStarted === false) {
      this.woadStarted = twue
      cwonst cwommandFwowlder = []
      fwor (cwonst cwommand of client.slashCwommandRegistwy.mwodules) {
        if (pwocess.env.PWODUCTION === 'false') {
          if (!cwommand.isBeta) {
            if (!(cwommand.slash === nyuww)) {
              cwommandFwowlder.push(cwommand.slash)
            }
          }
        } else {
          if (!(cwommand.slash === nyuww)) {
            cwommandFwowlder.push(cwommand.slash)
          }
        }

      }

      await addWocaleInCwommands(cwommandFwowlder, client)

      // cwommandRegistwy:

      // This is fwor pwoduction testing.
      // client.slashCwommand.addVowlumeOfCwommands(cwommandFwowlder)
      // Rembering that u have two remuv teh bwot
      // fwom teh serwer and add it again two update teh cwommands quickwy.

      // client.slashCwommand.cweateCwommand(cwommandFwowlder)

      await client.addVowlumeOfCwommands(cwommandFwowlder, client.user.id)
    }
  }
}
