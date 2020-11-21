const Listener = require('../structures/events/Listener')
const EmbedBuilder = require('../structures/util/EmbedBuilder')

module.exports = class GuildDeleteListener extends Listener {
    constructor() {
        super()
        this.event = 'guildDelete'
    }

    async on(client, guild) {
        await client.database.guilds.getAndDelete(guild.id)
    }
}
