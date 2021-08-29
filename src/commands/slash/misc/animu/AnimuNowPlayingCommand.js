const { Command, EmbedBuilder } = require('../../../../utils')
const axios = require('axios')

module.exports = class AnimuNowPlayingCommand extends Command {
  constructor() {
    super({
      name: 'animu nowplaying',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const res = await axios.get('https://cast.animu.com.br:9000/api/v2/history/?format=json&limit=1&offset=0&server=1')
    if (!ctx.message.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.replyT('error', 'basic:voice.clientAreNotInVoiceChannel')
    if (!ctx.client.player.has(ctx.message.guild.id)) return ctx.replyT('error', 'basic:voice.playerNotFound')
    const volume = ctx.client.player.get(ctx.message.guild.id).player.state.volume
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
  }
}
