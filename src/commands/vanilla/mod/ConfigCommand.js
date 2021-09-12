const { Command, EmbedBuilder } = require('../../../utils')

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

    const listReport = [
      `${ctx.db.guild.prefix}config report set <channel>`,
      `${ctx.db.guild.prefix}config report disable`
    ]

    const listPunish = [
      `${ctx.db.guild.prefix}config mod set <channel>`,
      `${ctx.db.guild.prefix}config mod disable`
    ]

    const listAnimu = [
      `${ctx.db.guild.prefix}config animu set <channel ID>`,
      `${ctx.db.guild.prefix}config animu disable`
    ]

    const allowed_channel_list = [
      `${ctx.db.guild.prefix}config allowed_channel set channels <channels>`,
      `${ctx.db.guild.prefix}config allowed_channel disable channels`,
      `${ctx.db.guild.prefix}config allowed_channel set roles <roles>`,
      `${ctx.db.guild.prefix}config allowed_channel disable roles`
    ]

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
      case 'allowed_channel': {
        if (!ctx.args[1]) return ctx.replyT('error', 'commands:config.optionsNotFound')
        if (!['set', 'disable'].includes(ctx.args[1].toLowerCase())) return ctx.replyT('error', 'commands:config.optionsNotFound')
        if (ctx.args[1].toLowerCase() === 'disable') {
          const roles = ctx.db.guild.allowedChannel.roles
          const channels = ctx.db.guild.allowedChannel.channels
          if (ctx.args[2].toLowerCase() === 'roles') {
            roles.splice(0, roles.length)
            ctx.db.guild.markModified('allowedChannel.roles')
            ctx.db.guild.save().then(() => {
              ctx.replyT('success', 'commands:config.modules.allowedChannel.roles.removed')
            })

            return
          }

          if (ctx.args[2].toLowerCase() === 'channels') {
            channels.splice(0, channels.length)
            ctx.db.guild.markModified('allowedChannel.channels')
            ctx.db.guild.save().then(() => {
              ctx.replyT('success', 'commands:config.modules.allowedChannel.channels.removed')
            })

            return
          }
        }

        if (!ctx.args[2]) return ctx.replyT('error', 'commands:config.channelNull')
        if (ctx.args[1].toLowerCase() === 'set') {
          if (ctx.args[2].toLowerCase() === 'roles') {
            const role = ctx.message.guild.roles.get(ctx.args[3]?.replace(/[<@&>]/g, ''))
            if (!role) return ctx.replyT('error', 'basic:invalidRole')
            for (const r of ctx.args.slice(3)) {
              if (ctx.message.guild.roles.get(r?.replace(/[<@&>]/g, ''))) ctx.db.guild.allowedChannel.roles.push(r?.replace(/[<@&>]/g, ''))
            }

            ctx.db.guild.markModified('allowedChannel.roles')
            ctx.db.guild.save().then(() => {
              ctx.replyT('success', 'commands:config.modules.allowedChannel.roles.added')
            })

            return
          }

          if (ctx.args[2].toLowerCase() === 'channels') {
            const channel = ctx.getChannel(ctx.args[3])
            if (!channel) return ctx.replyT('error', 'commands:config.channelNull')
            for (const c of ctx.args.slice(3)) {
              if (ctx.getChannel(c)) ctx.db.guild.allowedChannel.channels.push(c?.replace(/[<@#>]/g, ''))
            }

            ctx.db.guild.markModified('allowedChannel.channels')
            ctx.db.guild.save().then(() => {
              ctx.replyT('success', 'commands:config.modules.allowedChannel.channels.added')
            })

            return
          }
        }
      }
        break;
      default: {
        ctx.send(embed.build())
      }
    }
  }
}
