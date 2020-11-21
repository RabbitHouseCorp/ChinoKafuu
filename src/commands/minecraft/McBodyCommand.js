const Command = require('../../structures/command/Command')
const { EmbedBuilder, Emoji } = require('../../utils')

module.exports = class McBodyCommand extends Command {
    constructor() {
        super({
            name: 'mcbody',
            aliases: [],
            arguments: 1,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const body = `https://mc-heads.net/body/${ctx.args[0]}`
        const embed = new EmbedBuilder()
        embed.setColor('MINECRAFT')
        embed.setImage(body)
        embed.setDescription(`${Emoji['minecraft']} [[Download]](${body})`)

        ctx.send(embed)
    }
}
