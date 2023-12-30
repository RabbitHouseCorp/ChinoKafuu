import { Listener } from '../../structures/events/Listener'

export default class VoiceChannelJoinListener extends Listener {
  constructor() {
    super()
    this.event = 'voiceChannelJoin'
  }

  // eslint-disable-next-line no-unused-vars
  async on(client, member, newChannel) {
    const guild = member.guild
    const voiceChannel = client.guilds.get(guild.id).channels.get(member.voiceState.channelID)
    const server = await client.database.guilds.getOrCreate(guild.id)
    if (!server.animu) return

    if (voiceChannel?.id !== server.animuChannel) return
    if (client.playerManager.has(guild.id)) return
    client.playerManager.getPlayer(guild.id)?.preparePlayer(voiceChannel.id)

  }
}
