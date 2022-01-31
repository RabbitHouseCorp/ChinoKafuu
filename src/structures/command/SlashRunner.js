const { BlacklistUtils, EmbedBuilder, Helper } = require('../../utils')
const Logger = require('../util/Logger')
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
    const ms = Date.now()
    const getDataDB = await client.database.flux({
      search: {
        guilds: [{ fetch: { id: interaction.guild.id }, data: { prefix: process.env.PREFIX }, getOrAdd: true }],
        users: [{ fetch: { id: interaction.member.id }, data: { shipValue: Math.floor(Math.random() * 55) }, getOrAdd: true }],
      }
    })

    const mapData = getDataDB.data.toMap()
    const userData = mapData.get(`users:${interaction.member.id}`)
    const guildData = mapData.get(`guilds:${interaction.guild.id}`)

    const blacklist = new BlacklistUtils(client)
    if (await blacklist.verifyGuild(interaction.guild)) return client.leaveGuild(interaction.guild.id)
    const _locale = client.i18nRegistry.getT(guildData.data.lang)
    const commandName = interaction.command.commandName
    const command = client.slashCommandRegistry.findByName(commandName)
    if (!command) return
    const ctx = new SlashCommandContext(client, interaction, interaction.command.interface, {
      user: userData.data,
      guild: guildData.data,
      db: client.database.users
    }, _locale)
    ctx.ms = ms

    const permissions = new CommandPermissions(client, interaction.member, interaction.guild)

    if (userData?.blacklist) {
      const embed = new EmbedBuilder()
      embed.setColor('MODERATION')
      embed.setAuthor('Você foi banido', interaction.member.user.avatarURL)
      embed.setDescription(`Olá ${interaction.member.user.mention}, parece que você fez besteira que acabou quebrando os meus termos de uso, devido à isto, você foi banido de me usar.`)
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
      return ctx.replyT('error', 'basic:missingUserPermission', { perm: userPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
    }

    if (botPermissions.length > 0) {
      return ctx.replyT('error', 'basic:missingBotPermission', { perm: botPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
    }

    if ((command.arguments && ctx.args.size < command.arguments)) {
      const aliases = command.aliases
      const helper = new Helper(ctx, command.name, aliases, ctx._locale(`commands:${command.name}.usage`), ctx._locale(`commands:${command.name}.description`), command.permissions)
      return helper.help()
    }

    try {
      await command.run(ctx)
    } catch (e) {
      Logger.error(e.debug({ guild_id: interaction.guild.id, shard_id: interaction.guild.shard, user_id: interaction.member?.user?.id ?? interaction?.user?.id, isSlash: true }, true))
      const errorMessage = e.stack.length > 1800 ? `${e.stack.slice(0, 1800)}...` : e.stack
      client.emit('error', e, interaction.guild.shard)
      const embed = new EmbedBuilder()
      embed.setColor('ERROR')
      embed.setTitle(ctx._locale('events:executionFailure.embedTitle'))
      embed.setDescription(`\`\`\`js\n${errorMessage.removePath()}\`\`\``)
      embed.addField(ctx._locale('events:executionFailure.fieldTitle'), ctx._locale('events:executionFailure.fieldValue'))
      if (ctx.used) {
        ctx.embeds.push(embed.build().embeds[0])
      } else {
        await ctx.send(embed.build())
      }
      return
    }
  }
}
