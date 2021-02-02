const Listener = require('../structures/events/Listener')

module.exports = class VoiceChannelLeaveListener extends Listener {
    constructor() {
        super()
        this.event = 'voiceChannelSwitch'
    }

    async on(client, member, newChannel, oldChannel) {
        const guild = member.guild
        const voiceChannel = client.guilds.get(guild.id).channels.get(newChannel.id)
        const server = await client.database.guilds.getOrCreate(guild.id)
        if (!server.animu) return
        if (voiceChannel.id === server.animuChannel) {
            if (client.player.has(guild.id)) return
            const song = await client.lavalink.join(voiceChannel.id)
            song.playAnimu()
            client.player.set(guild.id, song)
        } else {
            if (!client.player.has(guild.id)) return
            if (oldChannel.voiceMembers.size === 1) {
                await client.lavalink.manager.leave(guild.id)
                client.lavalink.manager.players.delete(guild.id)
                client.player.delete(guild.id)
            }
        }
    }
}
