const Listener = require('../../structures/events/Listener')

module.exports = class GuildDeleteListener extends Listener {
  constructor () {
    super()
    this.event = 'guildDelete'
  }

  async on (client, guild) {
    const server = await client.database.guilds.getOrCreate(guild.id)
    if (server.blacklist) return

    await client.database.guilds.getAndDelete(guild.id)
  }
}
