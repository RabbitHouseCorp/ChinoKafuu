const { Command, EmbedBuilder } = require('../../../utils')
const { CommandBase, CommandOptions, Choice } = require('eris')

module.exports = class ConfigCommand extends Command {
  constructor() {
    super({
      name: 'config',
      aliases: ['module', 'configurações', 'configurar'],
      permissions: [{
        entity: 'user',
        permissions: ['manageGuild']
      },
      {
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('config')
        .setDescription('Enable and disable some modules who I have in your guild.')
        .addOptions(
          new CommandOptions()
            .setType(1)
            .setName('animu')
            .setDescription('Animu Radio'),
          new CommandOptions()
            .setType(1)
            .setName('mod')
            .setDescription('Mod Log'),
          new CommandOptions()
            .setType(1)
            .setName('report')
            .setDescription('Report Module'),
        )
    })
  }

  run(ctx) {
    const modules = [
      `• ${ctx._locale('commands:config.modules.animu.module')} :: ${ctx.db.guild.animu ? ctx._locale('commands:config.modules.enable') : ctx._locale('commands:config.modules.disable')}`,
      `• ${ctx._locale('commands:config.modules.animu.channel')} :: ${ctx.db.guild.animuChannel ? ctx.getChannel(ctx.db.guild.animuChannel)?.name ?? ctx._locale('commands:config.modules.noChannel') : ctx._locale('commands:config.modules.noChannel')}`,
      `• ${ctx._locale('commands:config.modules.mod.channel')} :: ${ctx.db.guild.punishChannel ? `#${ctx.getChannel(ctx.db.guild.punishChannel).name}` : ctx._locale('commands:config.modules.noChannel')}`,
      `• ${ctx._locale('commands:config.modules.mod.module')} :: ${ctx.db.guild.punishModule ? ctx._locale('commands:config.modules.enable') : ctx._locale('commands:config.modules.disable')}`,
      `• ${ctx._locale('commands:config.modules.report.channel')} :: ${ctx.db.guild.channelReport ? `#${ctx.getChannel(ctx.db.guild.channelReport).name}` : ctx._locale('commands:config.modules.noChannel')}`,
      `• ${ctx._locale('commands:config.modules.report.module')} :: ${ctx.db.guild.reportModule ? ctx._locale('commands:config.modules.enable') : ctx._locale('commands:config.modules.disable')}`,
      `• ${ctx._locale('commands:config.modules.allowedChannel.channels.title')} :: ${ctx.db.guild.allowedChannel.channels.length}`,
      `• ${ctx._locale('commands:config.modules.allowedChannel.roles.title')} :: ${ctx.db.guild.allowedChannel.roles.length}`
    ]

    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(ctx._locale('commands:config.title'))
    embed.setThumbnail(ctx.message.guild.iconURL)
    embed.addField(ctx._locale('commands:config.howUse'), `${ctx.db.guild.prefix}config <options> <set/disable>`)
    embed.addField(ctx._locale('commands:config.modules.animu.module'), listAnimu.join('\n'))
    embed.addField(ctx._locale('commands:config.modules.mod.module'), listPunish.join('\n'))
    embed.addField(ctx._locale('commands:config.modules.report.module'), listReport.join('\n'))
    embed.addField(ctx._locale('commands:config.modules.allowedChannel.module'), allowed_channel_list.join('\n'))
    embed.addField(ctx._locale('commands:config.modules.title'), `\`\`\`asciidoc\n${modules.join('\n')}\`\`\``)

    if (ctx.args.size < 1) {
      ctx.send(embed.build())
    }
  }
}
