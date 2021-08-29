const { Command, EmbedBuilder } = require('../../../../utils')
const axios = require("axios");

module.exports = class AnimuPlayCommand extends Command {
    constructor() {
        super({
            name: 'animu play',
            aliases: ['module', 'configurações', 'configurar'],
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const res = await axios.get('https://cast.animu.com.br:9000/api/v2/history/?format=json&limit=1&offset=0&server=1')
        if (ctx.client.player.has(ctx.message.guildID)) return ctx.replyT('error', 'basic:voice.playerAlreadyPlaying')
        const song = await ctx.client.lavalink.join(ctx.message.member.voiceState.channelID)
        song.playAnimu()
        ctx.client.player.set(ctx.message.guildID, song)
        song.on('playNow', (track) => {
            const volume = ctx.client.player.get(ctx.message.guildID).player.state.volume
            const embed = new EmbedBuilder()
            embed.setColor('ANIMU')
            embed.setAuthor(track.info.title)
            embed.setThumbnail(res.data.results[0].img_medium_url)
            embed.addField(ctx._locale('commands:animu.nowPlaying'), res.data.results[0].metadata)
            embed.addField(ctx._locale('commands:animu.totalListening.title'), `${res.data.results[0].n_listeners} ${ctx._locale('commands:animu.totalListening.total')}`)
            embed.addField(ctx._locale('commands:animu.artist'), res.data.results[0].author)
            embed.addField('DJ', res.data.results[0].dj_name)
            embed.addField(ctx._locale('commands:animu.volume'), `${volume}/100`)

            ctx.send(embed.build())
        })

        song.on('playEnd', async () => {
            await ctx.client.lavalink.manager.leave(ctx.message.guildID)
            ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
            ctx.client.player.delete(ctx.message.guildID)
        })
    }
}
