const { Command, EmbedBuilder } = require('../../../structures/util')
const axios = require('axios')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class SetIconCommand extends Command {
  constructor() {
    super({
      name: 'seticon',
      permissions: [{
        entity: 'both',
        permissions: ['manageGuild']
      }],
      slash: new CommandBase()
        .setName('seticon')
        .setDescription('Set an icon in the current guild.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('url')
            .setDescription('The URL of the new icon.')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const url = ctx.args.get('url').value
    const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
    const base64Icon = `data:image/${url.substr(url.length - 3)};base64,${buffer}`

    ctx.message.guild.edit({
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
