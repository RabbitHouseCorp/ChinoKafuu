const { Command, EmbedBuilder } = require('../../utils')

module.exports = class InviteCommand extends Command {
    constructor() {
        super({
            name: 'invite',
            aliases: ['convite', 'convidar'],
            arguments: 0
        })
    }

    async run(ctx) {
        const embed = new EmbedBuilder()
        embed.setColor('DEFAULT')
        embed.setTitle(ctx._locale('commands:invite.addMeInYourGuild'))
        embed.setDescription(ctx._locale('commands:invite.description'))
        embed.setImage('https://cdn.discordapp.com/attachments/481807707066859530/784903189136801852/c3377764d7d7cdcdcb98c466ce341c61.png')
        embed.setFooter(`©️ ${ctx.client.user.username}`)
        embed.setTimestamp()

        ctx.send(embed)
    }
}
