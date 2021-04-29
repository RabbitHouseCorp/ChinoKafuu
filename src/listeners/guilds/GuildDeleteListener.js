const Listener = require('../../structures/events/Listener')
const { TopGGUtils } = require('../../utils')

module.exports = class GuildDeleteListener extends Listener {
  constructor() {
    super()
    this.event = 'guildDelete'
  }

  async on(client, guild) {
    const top_gg = new TopGGUtils()
    await top_gg.post(client)
    const server = await client.database.guilds.getOrCreate(guild.id)
    if (server.blacklist) return

    await client.database.guilds.getAndDelete(guild.id)
  }
}
