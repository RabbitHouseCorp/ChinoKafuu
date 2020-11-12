const Command = require('../../structures/command/Command')
const NekosLife = require('nekos.life')
const NekoClient = new NekosLife()
const { EmbedBuilder } = require('../../utils')

module.exports = class FoxGirlCommand extends Command {
    constructor() {
        super({
            name: 'foxgirl',
            aliases: ['garotaraposa']
        })
    }

    async run(ctx) {
        const image = await NekoClient.sfw.foxGirl()
        const embed = new EmbedBuilder()
        embed.setColor('ACTION')
        embed.setImage(image.url)
        ctx.send(embed)
    }
}

