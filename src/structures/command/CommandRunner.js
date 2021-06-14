const { EmbedBuilder, Helper, AwayFromKeyboardUtils, InviteDMUtils, BlacklistUtils } = require('../../utils')
const CommandContext = require('./CommandContext')
const CommandPermissions = require('./CommandPermissions')

module.exports = class CommandRunner {
  static async run(client, message) {
    if (message.author.bot) return
    if (message.channel.type !== 0) {
      InviteDMUtils(client, message)
      return
    }

    const userData = await client.database.users.getOrCreate(message.author.id, { shipValue: Math.floor(Math.random() * 55) })
    const guildData = await client.database.guilds.getOrCreate(message.guildID)
    const blacklist = new BlacklistUtils(client)
    if (await blacklist.verifyGuild(message.guild)) return client.leaveGuild(message.guildID)

    const _locale = client.i18nRegistry.getT(guildData.lang)
    AwayFromKeyboardUtils(client, message, _locale)
    if (message.content.replace('!', '') === client.user.mention) {
      if (!message.channel.permissionsOf(client.user.id).has('sendMessages')) return
      const roles = []
      guildData.allowedChannel.roles.forEach((role) => {
        if (message.member.roles.includes(role)) roles.push(role)
      })
      if (roles.length > 0 && !guildData.allowedChannel.channels.includes(message.channel.id)) {
        return message.channel.createMessage(_locale('basic:onMention', {
          0: message.author.mention,
          1: guildData.prefix
        }))
      } else if (roles.length === 0 && !guildData.allowedChannel.channels.includes(message.channel.id)) {
        return message.channel.createMessage(_locale('basic:onMentionWithRole', {
          0: message.author.mention,
          1: guildData.prefix,
          2: guildData.allowedChannel.channels.map(channel => `<#${channel}>`).join(' ')
        }))
      } else {
        return message.channel.createMessage(_locale('basic:onMention', {
          0: message.author.mention,
          1: guildData.prefix
        }))
      }
    }

    if (message.content === guildData.prefix) return

    const regexp = new RegExp(`^(${guildData.prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}|${process.env.GLOBAL_BOT_PREFIX}|<@!?${client.user.id}>)( )*`, 'gi')

    if (!message.content.match(regexp)) return

    const args = message.content.replace(regexp, '').trim().split(/ /g)
    const commandName = args.shift().toLowerCase()

    const command = client.commandRegistry.findByName(commandName)
    if (!command) return

    const permissions = new CommandPermissions(client, message.member, message.guild)
    try {
      const channel = await message.author.getDMChannel()
      const botPermissionsOnChannel = permissions.botHasOnChannel(message.channel, [{
        entity: 'bot',
        permissions: ['sendMessages', 'readMessageHistory']
      }])

      if (botPermissionsOnChannel.length > 0) {
        return channel.createMessage(_locale(`basic:missingBotPermissionOnChannel`, { 0: message.author.mention, 1: botPermissionsOnChannel.map(perm => `\`${_locale(`permission:${perm}`)}\``).join(', '), 2: message.channel.mention }))
      }
    } catch {
      return
    }


    const ctx = new CommandContext(client, message, args, {
      user: userData,
      guild: guildData,
      db: client.database.users
    }, _locale)
    if (typeof client.commandCooldown.users.get(message.author.id) === 'undefined') {
      client.commandCooldown.addUser(message.author.id, command.cooldown * 1000)
    } else {
      try {
        const time = new Date(new Date(client.commandCooldown.users.get(message.author.id).timeSet - Date.now())).getSeconds()
        ctx.replyT('error', 'basic:cooldown', { 0: (time <= 0) ? _locale('basic:cooldownLowThanZero') : `\`${time}\`` })
      } catch {
        return
      }
      return
    }
    if (userData?.blacklist) {
      const avatar = message.author.avatarURL
      const embed = new EmbedBuilder()
      embed.setColor('MODERATION')
      embed.setAuthor('Você foi banido', avatar)
      embed.setDescription(`Olá ${message.author.mention}, parece que você fez besteira que acabou quebrando os meus termos de uso, devido à isto, você foi banido de me usar.`)
      embed.addField('Motivo', userData.blacklistReason)
      embed.addField('Banido injustamente?', 'Se você acha que foi banido injustamente, então entre no meu servidor de suporte.')

      ctx.send(embed.build())
      return
    }

    await ctx.message.channel.sendTyping()
    const commandData = await client.database.commands.getOrCreate(command.name)
    if (commandData?.disable) {
      return ctx.replyT('warn', 'basic:disabledCommand', { 0: commandData.reason })
    }

    const userPermissions = permissions.userHas(command.permissions)
    const botPermissions = permissions.botHas(command.permissions)
    const botPermissionsOnChannel = permissions.botHasOnChannel(message.channel, command.permissions)

    if (botPermissionsOnChannel.length > 0) {
      return message.channel.createMessage(_locale(`basic:missingBotPermissionOnChannel`, { 0: message.author.mention, 1: botPermissionsOnChannel.map(perm => `\`${_locale(`permission:${perm}`)}\``).join(', '), 2: message.channel.mention }))
    }
    if (guildData.allowedChannel.channels.length > 0) {
      const roles = ctx.db.guild.allowedChannel.roles.length > 0 ? ctx.db.guild.allowedChannel.roles : []
      const role = []
      for (const r of roles) {
        if (roles.length > 0) {
          if (message.member.roles.includes(r)) role.push(r)
        } else {
          role.push(true)
        }
      }

      if (!guildData.allowedChannel.channels.includes(message.channel.id) && role.length < 1) {
        return ctx.replyT('error', 'basic:blockedChannel', { 0: guildData.allowedChannel.channels.map(id => message.guild.channels.get(id)?.mention).join(' ') })
      }
    }

    if (userPermissions.length > 0) {
      return ctx.replyT('error', `basic:missingUserPermission`, { perm: userPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
    }
    if (botPermissions.length > 0) {
      return ctx.replyT('error', `basic:missingBotPermission`, { perm: botPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
    }

    if ((command.arguments && ctx.args.length < command.arguments) || (command.arguments && !ctx.args[0])) {
      const aliases = command.aliases
      const helper = new Helper(ctx, command.name, aliases, ctx._locale(`commands:${command.name}.usage`), ctx._locale(`commands:${command.name}.description`), command.permissions)
      return helper.help()
    }

    try {
      await command.run(ctx)
    } catch (e) {
      const errorMessage = e.stack.length > 1800 ? `${e.stack.slice(0, 1800)}...` : e.stack
      const embed = new EmbedBuilder()
      embed.setColor('ERROR')
      embed.setTitle(ctx._locale('events:executionFailure.embedTitle'))
      embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)
      embed.addField(ctx._locale('events:executionFailure.fieldTitle'), ctx._locale('events:executionFailure.fieldValue'))
      return ctx.send(embed.build())
    }
  }
}
