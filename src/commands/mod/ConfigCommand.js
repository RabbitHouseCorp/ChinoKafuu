const { Command, EmbedBuilder } = require('../../utils')

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
      }]
    })
  }

  run(ctx) {

    let listReport = [
      `${ctx.db.guild.prefix}config report set <channel>`,
      `${ctx.db.guild.prefix}config report disable`
    ]

    let listPunish = [
      `${ctx.db.guild.prefix}config mod set <channel>`,
      `${ctx.db.guild.prefix}config mod disable`
    ]

    let listAnimu = [
      `${ctx.db.guild.prefix}config animu set <channel ID>`,
      `${ctx.db.guild.prefix}config animu disable`
    ]

    let modules = [
      `• ${ctx._locale('commands:config.modules.animu.module')} :: ${ctx.db.guild.animu ? ctx._locale('commands:config.modules.enable') : ctx._locale('commands:config.modules.disable')}`,
      `• ${ctx._locale('commands:config.modules.animu.channel')} :: ${ctx.db.guild.animuChannel ? ctx.getChannel(ctx.db.guild.animuChannel)?.name ?? ctx._locale('commands:config.modules.noChannel') : ctx._locale('commands:config.modules.noChannel')}`,
      `• ${ctx._locale('commands:config.modules.mod.channel')} :: ${ctx.db.guild.punishChannel ? `#${ctx.getChannel(ctx.db.guild.punishChannel).name}` : ctx._locale('commands:config.modules.noChannel')}`,
      `• ${ctx._locale('commands:config.modules.mod.module')} :: ${ctx.db.guild.punishModule ? ctx._locale('commands:config.modules.enable') : ctx._locale('commands:config.modules.disable')}`,
      `• ${ctx._locale('commands:config.modules.report.channel')} :: ${ctx.db.guild.channelReport ? `#${ctx.getChannel(ctx.db.guild.channelReport).name}` : ctx._locale('commands:config.modules.noChannel')}`,
      `• ${ctx._locale('commands:config.modules.report.module')} :: ${ctx.db.guild.reportModule ? ctx._locale('commands:config.modules.enable') : ctx._locale('commands:config.modules.disable')}`,
    ]

    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(ctx._locale('commands:config.title'))
    embed.setThumbnail(ctx.message.channel.guild.iconURL)
    embed.addField(ctx._locale('commands:config.howUse'), `${ctx.db.guild.prefix}config <options> <set/disable>`)
    embed.addField(ctx._locale('commands:config.modules.animu.module'), listAnimu.join('\n'))
    embed.addField(ctx._locale('commands:config.modules.mod.module'), listPunish.join('\n'))
    embed.addField(ctx._locale('commands:config.modules.report.module'), listReport.join('\n'))
    embed.addField(ctx._locale('commands:config.modules.title'), `\`\`\`asciidoc\n${modules.join('\n')}\`\`\``)

    switch (ctx.args[0]?.toLowerCase()) {
      case 'animu': {
        if (!ctx.args[1]) return ctx.replyT('error', 'commands:config.optionsNotFound')
        if (!['set', 'disable'].includes(ctx.args[1].toLowerCase())) return ctx.replyT('error', 'commands:config.optionsNotFound')
        if (ctx.args[1].toLowerCase() === 'disable') {
          ctx.db.guild.animu = false
          ctx.db.guild.animuChannel = ''
          ctx.db.guild.save()

          return ctx.replyT('success', 'commands:config.modules.animu.disable')
        }

        if (!ctx.args[2]) return ctx.replyT('error', 'commands:config.channelNull')
        const channel = ctx.getChannel(ctx.args[2])
        if (!channel) return ctx.replyT('error', 'commands:config.channelNull')
        if (ctx.args[1].toLowerCase() === 'set') {
          ctx.db.guild.animu = true
          ctx.db.guild.animuChannel = channel.id
          ctx.db.guild.save()

          return ctx.replyT('success', 'commands:config.modules.animu.enable')
        }
      }
        break;
      case 'mod': {
        if (!ctx.args[1]) return ctx.replyT('error', 'commands:config.optionsNotFound')
        if (!['set', 'disable'].includes(ctx.args[1].toLowerCase())) return ctx.replyT('error', 'commands:config.optionsNotFound')
        if (ctx.args[1].toLowerCase() === 'disable') {
          ctx.db.guild.punishModule = false
          ctx.db.guild.punishChannel = ''
          ctx.db.guild.save()

          return ctx.replyT('success', 'commands:config.modules.mod.disable')
        }

        if (!ctx.args[2]) return ctx.replyT('error', 'commands:config.channelNull')
        const channel = ctx.getChannel(ctx.args[2])
        if (!channel) return ctx.replyT('error', 'commands:config.channelNull')
        if (ctx.args[1].toLowerCase() === 'set') {
          ctx.db.guild.punishModule = true
          ctx.db.guild.punishChannel = channel.id
          ctx.db.guild.save()

          return ctx.replyT('success', 'commands:config.modules.mod.enable')
        }
      }
        break;
      case 'report': {
        if (!ctx.args[1]) return ctx.replyT('error', 'commands:config.optionsNotFound')
        if (!['set', 'disable'].includes(ctx.args[1].toLowerCase())) return ctx.replyT('error', 'commands:config.optionsNotFound')
        if (ctx.args[1].toLowerCase() === 'disable') {
          ctx.db.guild.reportModule = false
          ctx.db.guild.channelReport = ''
          ctx.db.guild.save()

          return ctx.replyT('success', 'commands:config.modules.report.disable')
        }

        if (!ctx.args[2]) return ctx.replyT('error', 'commands:config.channelNull')
        const channel = ctx.getChannel(ctx.args[2])
        if (!channel) return ctx.replyT('error', 'commands:config.channelNull')
        if (ctx.args[1].toLowerCase() === 'set') {
          ctx.db.guild.reportModule = true
          ctx.db.guild.channelReport = channel.id
          ctx.db.guild.save()

          return ctx.replyT('success', 'commands:config.modules.report.enable')
        }
      }
        break;
      default: {
        ctx.send(embed.build())
      }
    }
  }
}