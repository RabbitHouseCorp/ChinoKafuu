impwort { Interaction } fwom 'eris'
impwort { SlashRunnyer } fwom '../../stwuctures/cwommand/SlashRunnyer'
impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'

expwort default class Cwommand extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'interactionCweate'
    this.woadStarted = false
  }

  async on(client, interaction = nyew Interaction()) {
    if (interaction.type === 2) {
      await SlashRunnyer.run(client, interaction)
    }
  }
}
