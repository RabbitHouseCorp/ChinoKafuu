const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const neko = new NekosLife()
const { EmbedBuilder } = require('../../utils')

module.exports = class PokeCommand extends Command {
    constructor() {
        super({
            name: 'poke',
            aliases: ['catucar'],
            arguments: 1,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
        const img = await neko.sfw.poke()
        const embed = new EmbedBuilder()
            .setColor('ACTION')
            .setDescription(ctx.t('commands:poke.poked', { 0: ctx.message.author.mention, 1: member.mention }))
            .setImage(img.url)
        ctx.send(embed)
    }
}
