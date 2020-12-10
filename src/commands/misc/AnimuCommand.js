const { Command, EmbedBuilder } = require('../../utils')
const fetch = require('node-fetch')
module.exports = class VoteCommand extends Command {
    constructor() {
        super({
            name: 'animu',
            aliases: ['moeanimu'],
            arguments: 0,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        if (!ctx.message.member.voiceState.channelID) return ctx.replyT('error', 'basic:voice.authorAreNotInVoiceChannel')

        const argsNullEmbed = new EmbedBuilder()
        argsNullEmbed.setColor('ANIMU')
        argsNullEmbed.setTitle(ctx._locale('commands:animu.title'))
        argsNullEmbed.addField(`${ctx.db.guild.prefix}animu join`, `**Usage:** ${ctx.db.guild.prefix}animu join\n**Aliases:** \`${ctx.db.guild.prefix}animu entrar, ${ctx.db.guild.prefix}animu tocar, ${ctx.db.guild.prefix}animu play\``)
        argsNullEmbed.addField(`${ctx.db.guild.prefix}animu nowplaying`, `**Usage:** ${ctx.db.guild.prefix}animu nowplaying\n**Aliases:** \`${ctx.db.guild.prefix}animu np, ${ctx.db.guild.prefix}animu tocando\``)
        argsNullEmbed.addField(`${ctx.db.guild.prefix}animu volume`, `**Usage:** ${ctx.db.guild.prefix}animu volume\n**Aliases:** \`${ctx.db.guild.prefix}animu vol\``)
        argsNullEmbed.addField(`${ctx.db.guild.prefix}animu leave`, `**Usage:** ${ctx.db.guild.prefix}animu leave\n**Aliases:** \`${ctx.db.guild.prefix}animu sair, ${ctx.db.guild.prefix}animu parar, ${ctx.db.guild.prefix}animu stop\``)

        if (!ctx.args[0]) return ctx.send(argsNullEmbed.build())

        const req = fetch('http://cast.animu.com.br:2199/rpc/animufm/streaminfo.get')
        const res = req.then(res => res.json())
        if (['play', 'join', 'tocar', 'entrar'].includes(ctx.args[0])) {
            if (ctx.client.player.has(ctx.message.guildID)) return ctx.replyT('error', 'basic:voice.playerAlreadyPlaying')
            const song = await ctx.client.lavalink.join(ctx.message.member.voiceState.channelID)
            song.playAnimu()
            ctx.client.player.set(ctx.message.guildID, song)
            song.on('playNow', (track) => {
                res.then(info => {
                    const volume = ctx.client.player.get(ctx.message.guildID).player.state.volume
                    const embed = new EmbedBuilder()
                    embed.setColor('ANIMU')
                    embed.setAuthor(track.info.title)
                    embed.setThumbnail(info.data[0].track.imageurl)
                    embed.addField(ctx._locale('commands:animu.nowPlaying'), info.data[0].song)
                    embed.addField(ctx._locale('commands:animu.totalListening.title'), `${info.data[0].listenertotal} ${ctx._locale('commands:animu.totalListening.total')}`)
                    embed.addField(ctx._locale('commands:animu.artist'), info.data[0].track.artist)
                    embed.addField(ctx._locale('commands:animu.volume'), `${volume}/100`)

                    ctx.send(embed.build())
                })
            })

            song.on('playEnd', async () => {
                await ctx.client.lavalink.manager.leave(ctx.message.guildID)
                ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
                ctx.client.player.delete(ctx.message.guildID)
            })

            return
        }

        if (['volume', 'vol'].includes(ctx.args[0])) {
            if (!ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.replyT('error', 'baisc:voice.clientAreNotInVoiceChannel')
            if (!ctx.client.player.has(ctx.message.guildID)) return ctx.replyT('error', 'basic:voice.playerNotFound')
            if (!ctx.args[1]) return ctx.replyT('warn', 'commands:animu.currentVolume', { volume: ctx.client.player.get(ctx.message.guildID).player.state.volume })
            if (parseInt(ctx.args[1]) > 100) return ctx.replyT('error', 'basic:voice.maxVolume')
            if (parseInt(ctx.args[1]) < 5) return ctx.replyT('error', 'basic:voice.minVolume')

            ctx.client.player.get(ctx.message.guildID).setVolume(ctx.args[1])
            ctx.replyT('success', 'commands:animu.volumeChanged')

            return
        }

        if (['nowplaying', 'tocandoagora', 'np'].includes(ctx.args[0])) {
            res.then(info => {
                const volume = ctx.client.player.get(ctx.message.guildID).player.state.volume
                const embed = new EmbedBuilder()
                embed.setColor('ANIMU')
                embed.setAuthor(info.data[0].title)
                embed.setThumbnail(info.data[0].track.imageurl)
                embed.addField(ctx._locale('commands:animu.nowPlaying'), info.data[0].song)
                embed.addField(ctx._locale('commands:animu.totalListening.title'), `${info.data[0].listenertotal} ${ctx._locale('commands:animu.totalListening.total')}`)
                embed.addField(ctx._locale('commands:animu.artist'), info.data[0].track.artist)
                embed.addField(ctx._locale('commands:animu.volume'), `${volume}/100`)

                ctx.send(embed.build())
            })

            return
        }

        if (['stop', 'leave', 'parar', 'sair']) {
            await ctx.client.lavalink.manager.leave(ctx.message.guildID)
            ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
            ctx.client.player.delete(ctx.message.guildID)

            ctx.replyT('success', 'commands:animu.leaving')
            return
        }
    }
}
