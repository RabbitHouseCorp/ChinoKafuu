//FUTURE[epic=KafuuTeam] Deprecate
//NOTE Possible command clutter



const Helper = require('../../structures/util/Helper')
const { Command, EmbedBuilder } = require('../../utils')
const fetch = require('node-fetch')

module.exports = class SetIconCommand extends Command {
  constructor () {
    super({
      name: 'seticon',
      arguments: 0,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageGuild']
      }]
    })
  }

  async run (ctx) {
    if (!ctx.message.attachments[0] && !ctx.args[0]) return new Helper(ctx, this.name, this.aliases, ctx._locale(`commands:${this.name}.usage`, ctx._locale(`commands:${this.name}.description`))).help()
    const url = ctx.args[0] ?? ctx.message.attachments[0].url
    const request = await fetch(url)
    const buffer = await request.buffer()
    const data = `data:image/${url.substr(url.length - 3)};base64,`
    const base64Icon = data + buffer.toString('base64')

    ctx.message.channel.guild.edit({
      icon: base64Icon
    }).then(() => {
      const embed = new EmbedBuilder()
      embed.setTitle(ctx._locale('commands:seticon.success'))
      embed.setColor('DEFAULT')
      embed.setImage(url)

      ctx.send(embed.build())
    })
  }
}
