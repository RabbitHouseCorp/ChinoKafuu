const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const neko = new NekosLife()
const { EmbedBuilder } = require('../../utils')

module.exports = class PatCommand extends Command {
    constructor() {
        super({
            name: 'pat',
            aliases: ['cafune', 'cafuné'],
            arguments: 1,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
        if (ctx.message.author.id === member.id) return ctx.replyT(':error:', 'commands:kiss.unable')
        const img = await neko.sfw.pat()
        const embed = new EmbedBuilder()
            .setColor('ACTION')
            .setDescription(ctx.t('commands:pat.pated', { 0: ctx.message.author.mention, 1: member.mention }))
            .setImage(img.url)
        ctx.send(embed)
    }
}
