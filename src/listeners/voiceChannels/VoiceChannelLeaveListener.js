const Listener = require('../../structures/events/Listener')

module.exports = class VoiceChannelLeaveListener extends Listener {
  constructor () {
    super()
    this.event = 'voiceChannelLeave'
  }

  async on (client, member, oldChannel) {
    const guild = member.guild
    if (!client.player.has(guild.id)) return
    console.log(oldChannel.voiceMembers.filter(member => !member.user.bot))
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
