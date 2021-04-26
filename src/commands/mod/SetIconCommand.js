const Helper = require('../../structures/util/Helper')
const { Command, EmbedBuilder } = require('../../utils')
const axios = require('axios')

module.exports = class SetIconCommand extends Command {
  constructor() {
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

  async run(ctx) {
    if (!ctx.message.attachments[0] && !ctx.args[0]) return new Helper(ctx, this.name, this.aliases, ctx._locale(`commands:${this.name}.usage`, ctx._locale(`commands:${this.name}.description`))).help()
    const url = ctx.args[0] ?? ctx.message.attachments[0].url
    const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
    const base64Icon = `data:image/${url.substr(url.length - 3)};base64,${buffer}`

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
