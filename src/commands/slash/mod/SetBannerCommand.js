const { Command, EmbedBuilder } = require('../../../structures/util')
const axios = require('axios')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class SetBannerCommand extends Command {
  constructor() {
    super({
      name: 'setbanner',
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageGuild']
      }],
      slash: new CommandBase()
        .setName('setbanner')
        .setDescription('Sets the banner of your server (not available for all servers).')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('url')
            .setDescription('The URL of the new banner.')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    if (!ctx.message.guild.features.includes('BANNER')) return ctx.replyT('error', 'commands:setbanner.missingFeature')
    const url = ctx.args.get('url').value
    const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
    const base64Banner = `data:image/${url.substr(url.length - 3)};base64,${buffer}`

    ctx.message.guild.edit({
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
