const CommandContext = require('./CommandContext')
const Helper = require('../../structures/util/Helper')
const EmbedBuilder = require('../../structures/util/EmbedBuilder')
const CommandPermissions = require('./CommandPermissions')
module.exports = class CommandRunner {
  static async run(client, message) {
    if (message.author.bot) return
    if (message.channel.type !== 0) {
      const isInvite = (/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(message.content)
      if (isInvite) {
        const dmChannel = await message.author.getDMChannel()
        const text = message.content.trim().split(' ')
        const findInvite = text.find(invite => invite.includes('discord.gg'))
          .replace(/(https:\/\/)?(http:\/\/)/g, '')
          .replace(/(discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io)/g, '')
          .replace(/(\/)/g, '')
        const invite = await client.getInvite(findInvite)
        const embed = new EmbedBuilder()
        embed.setColor('DEFAULT')
        embed.setAuthor(message.author.username, message.author.avatarURL)
        embed.setThumbnail(invite.guild.iconURL)
        embed.setDescription(`Hey, here is my invite to add me on \`${invite.guild.name}\`:\n\n[Minimal permissions](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=71158976&guild_id=${invite.guild.id})\n[Recommended permissions](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2117578239&guild_id=${invite.guild.id})`)
        dmChannel.createMessage(embed.build())
        return
      }

      return
    }

    const userData = await client.database.users.getOrCreate(message.author.id, { shipValue: Math.floor(Math.random() * 55) })

    const guildData = await client.database.guilds.getOrCreate(message.guildID)
    if (guildData.blacklist) {
      return client.leaveGuild(message.guildID)
    }

    const _locale = client.i18nRegistry.getT(guildData.lang)

    if (userData.afk) {
      userData.afk = false
      userData.afkReason = undefined
      userData.save()
      await message.channel.createMessage(_locale('basic:afkRemoval', { user: message.author.mention }))
    }

    if (message.content.replace('!', '') === `<@${client.user.id}>`) return message.channel.createMessage(_locale('basic:onMention', {
      0: message.author.mention,
      1: guildData.prefix
    }))

    for (const user of message.mentions) {
      const afkUser = await client.database.users.findOneByID(user.id)
      if (!afkUser?.afk) break
      await message.channel.createMessage(afkUser.afkReason ? _locale('basic:onMentionAfkReasoned', {
        user: user.username,
        reason: afkUser.afkReason
      }) : _locale('basic:onMentionAfk', { user: user.username }))
    }

    if (message.content === guildData.prefix) return

    const regexp = new RegExp(`^(${guildData.prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}|${process.env.GLOBAL_BOT_PREFIX}|<@!?${client.user.id}>)( )*`, 'gi')

    if (!message.content.match(regexp)) return

    const args = message.content.replace(regexp, '').trim().split(/ /g)
    const commandName = args.shift().toLowerCase()

    const command = client.commandRegistry.findByName(commandName)
    if (!command) return

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

    const permissions = new CommandPermissions(client, message.member, message.channel.guild)
    const userPermissions = permissions.userHas(command.permissions)
    const botPermissions = permissions.botHas(command.permissions)
    const botPermissionsOnChannel = permissions.botHasOnChannel(message.channel, command.permissions)
  
    if (userPermissions[0]) {
      return ctx.replyT('error', `basic:missingUserPermission`, { perm: userPermissions.map(perms =>`\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
    }
    if (botPermissions[0]) {
      return ctx.replyT('error', `basic:missingBotPermission`, { perm: botPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
    }
    if (botPermissionsOnChannel[0]) {
      return ctx.replyT('error', `basic:missingBotPermissionOnChannel`, { 0: botPermissionsOnChannel.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', '), 1: message.channel.mention })
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
