const Command = require('../../structures/command/Command')
const { EmbedBuilder, FunCommandInstance } = require('../../utils')
module.exports = class DanceCommand extends Command {
    constructor() {
        super({
            name: 'dance',
            aliases: ['dançar', 'danca'],
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
        if (!member) return ctx.replyT('error', 'basic:invalidUser')
        const Dance = FunCommandInstance.dance
        const dance = Dance[Math.round(Math.random() * Dance.length)]
        const embed = new EmbedBuilder()
        embed.setColor('ACTION')
        embed.setImage(dance)
        embed.setDescription(ctx._locale('commands:dance.danced', { 0: ctx.message.author.mention, 1: member.mention }))

        ctx.send(embed)
    }
}