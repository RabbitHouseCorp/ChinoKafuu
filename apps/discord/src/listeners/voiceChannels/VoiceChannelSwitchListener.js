import { Listener } from '../../structures/events/Listener'

export default class VoiceChannelLeaveListener extends Listener {
  constructor() {
    super()
    this.event = 'voiceChannelSwitch'
  }

  async on(client, member, newChannel, oldChannel) {
    const guild = member.guild
    if (!client.playerManager.has(guild.id)) return
    const voiceChannel = client.guilds.get(guild.id).channels.get(newChannel.id)
    const server = await client.database.guilds.getOrCreate(guild.id)
    const playerExtend = client.playerManager.getPlayer(guild.id)
    if (server.animu && voiceChannel.id === server.animuChannel) {
      if (!playerExtend.player.playingTrack)
        client.playerManager.getPlayer(guild.id)?.preparePlayer(voiceChannel.id)
    }

    if (playerExtend.player?.voiceInfo?.countUsersConnected === 0)
      client.playerManager.getPlayer(guild.id)?.delete()
  }
}
