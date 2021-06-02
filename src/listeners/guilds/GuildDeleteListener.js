const Listener = require('../../structures/events/Listener')
const { TopGGUtils, BlacklistUtils } = require('../../utils')

module.exports = class GuildDeleteListener extends Listener {
  constructor() {
    super()
    this.event = 'guildDelete'
  }

  async on(client, guild) {
    const top_gg = new TopGGUtils()
    await top_gg.post(client)
    const blacklist = new BlacklistUtils(client)
    if (await blacklist.verifyGuild(guild)) return

    await client.database.guilds.getAndDelete(guild.id)
  }
}
