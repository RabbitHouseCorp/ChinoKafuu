import { Listener } from '../../structures/events/Listener'

export default class VoiceChannelLeaveListener extends Listener {
  constructor() {
    super()
    this.event = 'voiceChannelLeave'
  }

  async on(client, member, oldChannel) {
    const guild = member.guild
    const guildBot = client.guilds.get(guild.id).members.get(client.user.id)
    if (!client.player.has(guild.id)) return
    if (oldChannel.id !== guildBot.voiceState.channelID) return
    if (oldChannel.voiceMembers.filter(member => !member.user.bot).length === 0) {
      await client.lavalink.manager.leave(guild.id)
      client.lavalink.manager.players.delete(guild.id)
      client.player.delete(guild.id)
      return
    }

    if (member.user.id === client.user.id) {
      client.lavalink.manager.players.delete(guild.id)
      client.player.delete(guild.id)
      return
    }
  }
}
