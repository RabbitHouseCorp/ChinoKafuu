const { Command, EmbedBuilder } = require('../../../utils')
const {CommandBase, CommandOptions} = require("eris");

module.exports = class ServerIconCommand extends Command {
  constructor() {
    super({
      name: 'servericon',
      aliases: ['guildicon'],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
          .setName('servericon')
          .setDescription('Shows the server icon.')
    })
  }

  async run(ctx) {
    const guild = ctx.message.guild
    if (!guild.icon) return ctx.replyT('error', 'commands:servericon.missingIcon')

    const embed = new EmbedBuilder()
    embed.setImage(guild.iconURL)
    embed.setColor('DEFAULT')
    embed.setDescription(ctx._locale('commands:servericon.download', { 0: guild.iconURL }))
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
