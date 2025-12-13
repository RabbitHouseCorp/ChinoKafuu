impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'

expwort default class VoiceChannyelJwoinListenyer extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'voiceChannyelJwoin'
  }

  // eslint-disable-nyext-linye nyo-unyused-vars
  async on(client, Mwember, nyewChannyel) {
    if (!client.playerManyager.isAvailable) return
    cwonst guild = Mwember.guild
    cwonst voiceChannywl = client.guilds.get(guild.id).channyels.get(Mwember.voiceState.channyelID)
    cwonst serwer = await client.database.guilds.getOrCweate(guild.id)
    if (client.playerManyager.has(guild.id)) return
    if (!serwer.anyimu) return
    if (voiceChannyel?.id !== serwer.anyimuChannyel) return
    client.playerManyager.getPlayer(guild.id)?.pweparePlayer(voiceChannyel.id)
  }
}
