const CommandRunner = require("./CommandRunner");
const {InviteDMUtils, BlacklistUtils, AwayFromKeyboardUtils, EmbedBuilder, Helper} = require("../../utils");
const CommandContext = require("./CommandContext");
const CommandPermissions = require("./CommandPermissions");
const SlashCommandContext = require("./SlashCommandContext");


module.exports = class SlashRunner  {
    /**
     *
     * @param client
     * @param interaction
     * @returns {Promise<Eris.Interaction>}
     */
    static async run(client, interaction) {
        const userData = await client.database.users.getOrCreate(interaction.member.id, { shipValue: Math.floor(Math.random() * 55) })
        const guildData = await client.database.guilds.getOrCreate(interaction.guildID)
        const blacklist = new BlacklistUtils(client)
        if (await blacklist.verifyGuild(interaction.guild)) return client.leaveGuild(interaction.guild.id)

        const _locale = client.i18nRegistry.getT(guildData.lang)

        const commandName = interaction.command.commandName

        const command = client.slashCommandRegistry.findByName(commandName)

        if (!command) return
        const ctx = new SlashCommandContext(client, interaction, [], {
            user: userData,
            guild: guildData,
            db: client.database.users
        }, _locale)



        const permissions = new CommandPermissions(client, interaction.member, interaction.guild)
        /**
         *
         *  try {
            const botPermissionsOnChannel = permissions.botHasOnChannel(interaction.channel, [{
                entity: 'bot',
                permissions: ['sendMessages', 'readMessageHistory']
            }])

            if (botPermissionsOnChannel.length > 0) {
                const channel = await message.author.getDMChannel()
                return channel.createMessage(_locale(`basic:missingBotPermissionOnChannel`, { 0: message.author.mention, 1: botPermissionsOnChannel.map(perm => `\`${_locale(`permission:${perm}`)}\``).join(', '), 2: message.channel.mention }))
            }
        } catch {
            return
        }
         */


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
        // const botPermissionsOnChannel = permissions.botHasOnChannel(message.channel, command.permissions)

        //if (botPermissionsOnChannel.length > 0) {
            // return message.channel.createMessage(_locale(`basic:missingBotPermissionOnChannel`, { 0: message.author.mention, 1: botPermissionsOnChannel.map(perm => `\`${_locale(`permission:${perm}`)}\``).join(', '), 2: message.channel.mention }))
        // }
        if (guildData.allowedChannel.channels.length > 0) {
            const roles = ctx.db.guild.allowedChannel.roles.length > 0 ? ctx.db.guild.allowedChannel.roles : []
            const role = []
            for (const r of roles) {
                if (roles.length > 0) {
                    if (interaction.member.roles.includes(r)) role.push(r)
                } else {
                    role.push(true)
                }
            }

            //if (!guildData.allowedChannel.channels.includes(message.channel.id) && role.length < 1) {
              //  return ctx.replyT('error', 'basic:blockedChannel', { 0: guildData.allowedChannel.channels.map(id => message.guild.channels.get(id)?.mention).join(' ') })
            // }
        }

        if (userPermissions.length > 0) {
            return ctx.replyT('error', `basic:missingUserPermission`, { perm: userPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
        }
        if (botPermissions.length > 0) {
            return ctx.replyT('error', `basic:missingBotPermission`, { perm: botPermissions.map(perms => `\`${ctx._locale(`permission:${perms}`)}\``).join(', ') })
        }

        if ((command.arguments && ctx.interactionMessage.command.interface.size < command.arguments)) {
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