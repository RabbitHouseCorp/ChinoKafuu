const { Command, EmbedBuilder } = require('../../utils')

module.exports = class ServerIconCommand extends Command {
    constructor() {
        super({
            name: 'servericon',
            aliases: ['guildicon']
        })
    }

    async run(ctx) {
        const guild = ctx.message.channel.guild
        if (!guild.icon) return ctx.replyT('error', 'commands:servericon.missingIcon')

        const embed = new EmbedBuilder()
        embed.setImage(guild.dynamicIconURL())
        embed.setColor('DEFAULT')
        embed.setDescription(ctx._locale('commands:servericon.download', { 0: guild.dynamicIconURL() }))
        embed.setFooter(`©️ ${ctx.client.user.username}`)
        embed.setTimestamp()

        ctx.send(embed.build())
    }
}
