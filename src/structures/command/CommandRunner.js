const CommandContext = require('./CommandContext')
const Helper = require('../../structures/util/Helper')

module.exports = class CommandRunner {
  static async run(client, message) {
    if (message.author.bot) return

    const userData = await client.database.users.getOrCreate(message.author.id, {shipValue: Math.floor(Math.random() * 55)})
    if (userData.blacklisted) return

    const guildData = await client.database.guilds.getOrCreate(message.channel.guild.id)
    const t = client.i18nRegistry.getT(guildData.lang)
    if (message.content.replace('!', '') === `<@${client.user.id}>`) return client.createMessage(message.channel.id, t('basic:onMention', {
      0: message.author.mention,
      1: guildData.prefix
    }))
    if (message.content === guildData.prefix) return

    const regexp = new RegExp(`^(${guildData.prefix}|<@481282441294905344>)( )*`, 'gi')
    //FIXME Regex bugged lol
    if (!message.content.match(regexp)) return

    let args = message.content.replace(regexp, '').trim().split(/ /g)
    const commandName = args.shift().toLowerCase()

    const command = client.commandRegistry.findByName(commandName)
    if (!command) return

    const ctx = new CommandContext(client, message, args, {
      user: userData,
      guild: guildData,
      db: client.database.users
    }, t)

    await ctx.message.channel.sendTyping()
    const fixedPermissionList = command.permissions.flatMap(object => object.entity === 'both' ? [{
      entity: 'user',
      permissions: object.permissions
    }, {entity: 'bot', permissions: object.permissions}] : object)

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

      return ctx.replyT('error', `basic:missing${key}Permission`, {perm: ctx.t(`permission:${missingPerm.missing}`)})
    }

    if (command.arguments && !ctx.args[0]) {
      const helper = new Helper(ctx, command.name, command.aliases, ctx.t(`commands:${command.name}.usage`), ctx.t(`commands:${command.name}.description`))
      return helper.help()
    }

    if (command.arguments && command.arguments < ctx.args.length) {
      const helper = new Helper(ctx, command.name, command.aliases, ctx.t(`commands:${command.name}.usage`), ctx.t(`commands:${command.name}.description`))
      return helper.help()
    }

    try {
      command.run(ctx)
    } catch (e) {
      return ctx.sendT('basic:commandExecutionFailure', {error: e.message})
    }
  }

}
