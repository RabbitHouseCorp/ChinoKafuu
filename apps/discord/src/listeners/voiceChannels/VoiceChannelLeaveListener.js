import { Bot } from '../../structures/Bot'
import { Listener } from '../../structures/events/Listener'

export default class VoiceChannelLeaveListener extends Listener {
  constructor() {
    super()
    this.event = 'voiceChannelLeave'
  }

  /**
   *
   * @param {Bot} client
   * @param {*} member
   * @param {*} oldChannel
   * @returns
   */
  async on(client, member, oldChannel) {
    const guild = member.guild
    const guildBot = client.guilds.get(guild.id).members.get(client.user.id)
    if (!client.playerManager.has(guild.id)) return
    if (oldChannel.id !== guildBot.voiceState.channelID) return
    const player = client.playerManager.getPlayer(guild.id)

    if (player.player.voiceInfo?.countUsersConnected === 0)
      player.delete()
    if (member.id === client.user.id && player.player.voiceInfo?.countUsersConnected === 0)
      player.delete()
  }
}
