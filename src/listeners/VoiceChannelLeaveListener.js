const Listener = require('../structures/events/Listener')

module.exports = class VoiceChannelLeaveListener extends Listener {
  constructor () {
    super()
    this.event = 'voiceChannelLeave'
  }

  async on (client, member, oldChannel) {
    const guild = member.guild
    const voiceChannel = client.guilds.get(guild.id).channels.get(oldChannel.id)
    const server = await client.database.guilds.getOrCreate(guild.id)
    if (!server.animu) return
    if (voiceChannel.id !== server.animuChannel) return
    if (!client.player.has(guild.id)) return
    if (oldChannel.voiceMembers.size === 1) {
      await client.lavalink.manager.leave(guild.id)
      client.lavalink.manager.players.delete(guild.id)
      client.player.delete(guild.id)
    }
  }
}
