const { Command, EmbedBuilder } = require('../../../utils')
const axios = require('axios')

module.exports = class AnimuCommand extends Command {
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

    const res = await axios.get('https://cast.animu.com.br:9000/api/v2/history/?format=json&limit=1&offset=0&server=1')
    if (!['play', 'join', 'tocar', 'entrar', 'volume', 'vol', 'nowplaying', 'tocandoagora', 'np', 'tocando', 'stop', 'leave', 'parar', 'sair'].includes(ctx.args[0])) return ctx.send(argsNullEmbed.build())

    if (['play', 'join', 'tocar', 'entrar'].includes(ctx.args[0].toLowerCase())) {
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

      return
    }

    if (['volume', 'vol'].includes(ctx.args[0].toLowerCase())) {
      if (!ctx.message.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.replyT('error', 'baisc:voice.clientAreNotInVoiceChannel')
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.replyT('error', 'basic:voice.playerNotFound')
      if (!ctx.args[1]) return ctx.replyT('warn', 'commands:animu.currentVolume', { volume: ctx.client.player.get(ctx.message.guildID).player.state.volume })
      if (parseInt(ctx.args[1]) > 100) return ctx.replyT('error', 'basic:voice.maxVolume')
      if (parseInt(ctx.args[1]) < 5) return ctx.replyT('error', 'basic:voice.minVolume')

      ctx.client.player.get(ctx.message.guildID).setVolume(ctx.args[1])
      ctx.replyT('success', 'commands:animu.volumeChanged')

      return
    }

    if (['nowplaying', 'tocandoagora', 'np', 'tocando'].includes(ctx.args[0].toLowerCase())) {
      if (!ctx.message.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.replyT('error', 'basic:voice.clientAreNotInVoiceChannel')
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.replyT('error', 'basic:voice.playerNotFound')
      const volume = ctx.client.player.get(ctx.message.guildID).player.state.volume
      const embed = new EmbedBuilder()
      embed.setColor('ANIMU')
      embed.setAuthor('Rádio Animu')
      embed.setThumbnail(res.data.results[0].img_medium_url)
      embed.addField(ctx._locale('commands:animu.nowPlaying'), res.data.results[0].metadata)
      embed.addField(ctx._locale('commands:animu.totalListening.title'), `${res.data.results[0].n_listeners} ${ctx._locale('commands:animu.totalListening.total')}`)
      embed.addField(ctx._locale('commands:animu.artist'), res.data.results[0].author)
      embed.addField('DJ', res.data.results[0].dj_name)
      embed.addField(ctx._locale('commands:animu.volume'), `${volume}/100`)

      ctx.send(embed.build())

      return
    }

    if (['stop', 'leave', 'parar', 'sair'].includes(ctx.args[0].toLowerCase())) {
      await ctx.client.lavalink.manager.leave(ctx.message.guildID)
      ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
      ctx.client.player.delete(ctx.message.guildID)

      ctx.replyT('success', 'commands:animu.leaving')
    }
  }
}
