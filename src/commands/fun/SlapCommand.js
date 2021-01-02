const { Command, EmbedBuilder } = require('../../utils')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()

module.exports = class SlapCommand extends Command {
    constructor() {
        super({
            name: 'slap',
            aliases: ['tapa'],
            arguments: 1,
            hasUsage: true,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
        const img = await NekoClient.sfw.slap()
        const embed = new EmbedBuilder()
        embed.setColor('ACTION')
        embed.setDescription(ctx._locale('commands:slap.slaped', { 0: ctx.message.author.mention, 1: member.mention }))
        embed.setImage(img.url)
        embed.setFooter(`©️ ${ctx.client.user.username}`)
        embed.setTimestamp()

        ctx.send(embed.build())
    }
}
