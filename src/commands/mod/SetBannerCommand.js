const Command = require('../../structures/command/Command')
const Helper = require('../../structures/util/Helper')
const EmbedBuilder = require('../../structures/util/EmbedBuilder')

module.exports = class SetBannerCommand extends Command {
  constructor() {
    super({
      name: 'setbanner',
      permissions: [{
        entity: 'user',
        permissions: ['manageGuild']
      }]
    })
  }

  async run(ctx) {
    if (!ctx.message.channel.guild.features.includes('BANNER')) return ctx.replyT('error', 'commands:setbanner.missingFeature')
    if (!ctx.message.attachments[0] && !ctx.args[0]) return new Helper(ctx, this.name, this.aliases, ctx.t(`commands:${this.name}.usage`, `commands:${this.name}.description`)).help()

    const url = ctx.args[0] ?? ctx.message.attachments[0]
    const request = await fetch(url)
    const buffer = await request.buffer()
    const data = `data:image/${url.substr(url.length - 3)};base64,`
    const base64Banner = buffer.toString('base64')

    await ctx.message.guild.edit({
      banner: base64Banner
    })
      .then(() => {
        const embed = new EmbedBuilder()
          .setTitle(ctx.t('commands:setbanner.success'))
          .setColor('DEFAULT')
          .setImage(url)
        ctx.send(embed)
      })

  }
}
