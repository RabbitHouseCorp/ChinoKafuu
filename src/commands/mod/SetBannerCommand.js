const Helper = require('../../structures/util/Helper')
const { Command, EmbedBuilder } = require('../../utils')
const fetch = require('node-fetch')

module.exports = class SetBannerCommand extends Command {
  constructor() {
    super({
      name: 'setbanner',
      permissions: [{
        entity: 'both',
        permissions: ['manageGuild']
      }]
    })
  }

  async run(ctx) {
    if (!ctx.message.channel.guild.features.includes('BANNER')) return ctx.replyT('error', 'commands:setbanner.missingFeature')
    if (!ctx.message.attachments[0] && !ctx.args[0]) return new Helper(ctx, this.name, this.aliases, ctx._locale(`commands:${this.name}.usage`, `commands:${this.name}.description`)).help()

    const url = ctx.args[0] ?? ctx.message.attachments[0].url
    const request = await fetch(url)
    const buffer = await request.buffer()
    const data = `data:image/${url.substr(url.length - 3)};base64,`
    const base64Banner = data + buffer.toString('base64')

    ctx.message.channel.guild.edit({
      banner: base64Banner
    })
      .then(() => {
        const embed = new EmbedBuilder()
          .setTitle(ctx._locale('commands:setbanner.success'))
          .setColor('DEFAULT')
          .setImage(url)
        ctx.send(embed.build())
      })
  }
}
