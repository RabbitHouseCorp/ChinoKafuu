const { Command } = require('../../../../structures/util')
const axios = require('axios')

module.exports = class AnimuPlayCommand extends Command {
  constructor() {
    super({
      name: 'animu play',
      permissions: [{
        entity: 'bot',
        permissions: ['viewChannel', 'voiceConnect', 'voiceSpeak', 'voiceRequestToSpeak', 'voiceUseVAD']
      }]
    })
  }

  async run(ctx) {

    if (!ctx.message.member.voiceState.channelID) return ctx.replyT('error', 'basic:voice.authorAreNotInVoiceChannel')
    const res = await axios.get(process.env.ANIMU_API_URI)
    if (ctx.client.player.has(ctx.message.guild.id)) return ctx.replyT('error', 'basic:voice.playerAlreadyPlaying')
    const song = await ctx.client.lavalink.join(ctx.message.member.voiceState.channelID)
    song.playAnimu()
    ctx.client.player.set(ctx.message.guild.id, song)
    ctx.replyT('chino_tail', 'commands:animu.newNowPlaying', { 0: res.data.results[0].metadata, 1: res.data.results[0].dj_name })
    song.on('playEnd', async () => {
      await ctx.client.lavalink.manager.leave(ctx.message.guild.id)
      ctx.client.lavalink.manager.players.delete(ctx.message.guild.id)
      ctx.client.player.delete(ctx.message.guild.id)
    })
  }
}
