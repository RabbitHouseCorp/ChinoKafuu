const { Command, EmbedBuilder } = require('../../utils')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()

module.exports = class FeedCommand extends Command {
    constructor() {
        super({
            name: 'feed',
            aliases: ['alimentar'],
            arguments: 1,
            hasUsage: true,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const member = await ctx.getUser(ctx.args[0])
        if (!member) return ctx.replyT('error', 'basic:invalidUser')
        const image = await NekoClient.sfw.feed()
        const embed = new EmbedBuilder()
        embed.setColor('ACTION')
        embed.setImage(image.url)
        embed.setDescription(ctx._locale('commands:feed.feed', { author: ctx.message.author.mention, user: member.mention }))
        embed.setFooter(`©️ ${ctx.client.user.username}`)
        embed.setTimestamp()

        ctx.send(embed.build())
    }
}
