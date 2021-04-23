

const { Command, EmbedBuilder } = require('../../utils')

module.exports = class SlowmodeCommand extends Command {
  constructor () {
    super({
      name: 'slowmode',
      aliases: ['modolento'],
      arguments: 1,
      permissions: [{
        entity: 'both',
        permissions: ['manageChannels']
      }]
    })
  }

  run (ctx) {
    const time = Math.round(ctx.args[0])
    if (time >= 600) return ctx.replyT('error', 'commands:slowmode.rateLimited')
    if (time < 0) return ctx.replyT('error', 'commands:slowmode.minimalTimeLimited')
    if (time <= 0) {
      ctx.message.channel.edit({
        rateLimitPerUser: time
      }).then(() => {
        ctx.replyT('success', 'commands:slowmode.rateLimitDisable', { 0: ctx.message.channel.mention })
      })
    } else {
      ctx.message.channel.edit({
        rateLimitPerUser: time
      }).then(() => {
        ctx.replyT('success', 'commands:slowmode.rateLimitEnable', { 0: ctx.message.channel.mention, 1: time })
      })
    }
  }
}
