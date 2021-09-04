const CommandRunner = require('./CommandRunner')
const { BlacklistUtils, EmbedBuilder, Helper } = require('../../utils')
const CommandContext = require('./CommandContext')
const CommandPermissions = require('./CommandPermissions')
const SlashCommandContext = require('./SlashCommandContext')


module.exports = class SlashRunner {
  /**
   *
   * @param client
   * @param interaction
   * @returns {Promise<Eris.Interaction>}
   */
  static async run(client, interaction) {
    const userData = await client.database.users.getOrCreate(interaction.member.id, { shipValue: Math.floor(Math.random() * 55) })
    const guildData = await client.database.guilds.getOrCreate(interaction.guild.id)
    const blacklist = new BlacklistUtils(client)
    if (await blacklist.verifyGuild(interaction.guild)) return client.leaveGuild(interaction.guild.id)
    const _locale = client.i18nRegistry.getT(guildData.lang)
    const commandName = interaction.command.commandName
    const command = client.slashCommandRegistry.findByName(commandName)
    if (!command) return
    const ctx = new SlashCommandContext(client, interaction, interaction.command.interface, {
      user: userData,
      guild: guildData,
      db: client.database.users
    }, _locale)
    const permissions = new CommandPermissions(client, interaction.member, interaction.guild)

    if (userData?.blacklist) {
      const avatar = interaction.member.user.avatarURL
      const embed = new EmbedBuilder()
      embed.setColor('MODERATION')
      embed.setAuthor('Você foi banido', avatar)
      embed.setDescription(`Olá {mention}, parece que você fez besteira que acabou quebrando os meus termos de uso, devido à isto, você foi banido de me usar.`)
      embed.addField('Motivo', userData.blacklistReason)
      embed.addField('Banido injustamente?', 'Se você acha que foi banido injustamente, então entre no meu servidor de suporte.')

      ctx.send(embed.build())
      return
    }

    const commandData = await client.database.commands.getOrCreate(interaction.command.commandName)
    if (commandData?.disable) {
      return ctx.replyT('warn', 'basic:disabledCommand', { 0: commandData.reason })
    }

    const userPermissions = permissions.userHas(command.permissions)
    const botPermissions = permissions.botHas(command.permissions)
    if (userPermissions.length > 0) {
      return ctx.replyT('error', `basic:missingUserPermission`, { perm: userPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
    }

    if (botPermissions.length > 0) {
      return ctx.replyT('error', `basic:missingBotPermission`, { perm: botPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
    }

    if ((command.arguments && ctx.args.size < command.arguments)) {
      const aliases = command.aliases
      const helper = new Helper(ctx, command.name, aliases, ctx._locale(`commands:${command.name}.usage`), ctx._locale(`commands:${command.name}.description`), command.permissions)
      return helper.help()
    }

    try {
      await command.run(ctx)
    } catch (e) {
      const errorMessage = e.stack.length > 1800 ? `${e.stack.slice(0, 1800)}...` : e.stack
      client.emit('error', e, interaction.guild.shard)
      const embed = new EmbedBuilder()
      embed.setColor('ERROR')
      embed.setTitle(ctx._locale('events:executionFailure.embedTitle'))
      embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)
      embed.addField(ctx._locale('events:executionFailure.fieldTitle'), ctx._locale('events:executionFailure.fieldValue'))
      return ctx.send(embed.build())
    }
  }
}
