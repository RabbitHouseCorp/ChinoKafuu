const CommandContext = require('./CommandContext')
const Helper = require('../../structures/util/Helper')
const EmbedBuilder = require('../../structures/util/EmbedBuilder')

module.exports = class CommandRunner {
  static async run(client, message) {
    if (message.author.bot) return
    if (message.channel.type !== 0) return
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
        ctx.replyT('error', 'basic:cooldown', { 0: new Date(new Date(client.commandCooldown.users.get(message.author.id).timeSet - Date.now())).getSeconds() })
      } catch (ignore) {

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
    const fixedPermissionList = command.permissions.flatMap(object => object.entity === 'both' ? [{
      entity: 'user',
      permissions: object.permissions
    }, { entity: 'bot', permissions: object.permissions }] : object)

    const checkedPermissions = fixedPermissionList.map((object) => {
      const member = object.entity === 'user' ? ctx.message.member : ctx.message.channel.guild.members.get(client.user.id)

      object.permissions.forEach((permission) => {
        if (permission === 'botDeveloper') {
          if (!process.env.BOT_DEVELOPERS.includes(ctx.message.author.id)) object.missing = permission
        } else {
          if (!member.permission.has(permission)) object.missing = permission
        }
      })

      return object
    })

    if (checkedPermissions.filter(object => object.missing)[0]) {
      const missingPerm = checkedPermissions.filter(z => z.missing)[0]
      const key = checkedPermissions.entity === 'bot' ? 'Bot' : 'User'

      ctx.replyT('error', `basic:missing${key}Permission`, { perm: ctx._locale(`permission:${missingPerm.missing}`) })
      missingPerm.missing = null
      return
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
