const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()
const { EmbedBuilder } = require('../../utils')

module.exports = class NekoCommand extends Command {
    constructor() {
        super({
            name: 'neko',
            aliases: []
        })
    }

    async run(ctx) {
        const image = await NekoClient.sfw.neko()
        const embed = new EmbedBuilder()
        embed.setColor('ACTION')
        embed.setImage(image.url)
        ctx.send(embed)
    }
}

