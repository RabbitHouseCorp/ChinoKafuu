const Command = require('../../structures/command/Command')
const { EmbedBuilder, Emoji } = require('../../utils')

module.exports = class McHeadCommand extends Command {
    constructor() {
        super({
            name: 'mchead',
            aliases: [],
            arguments: 1,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const body = `https://mc-heads.net/head/${ctx.args[0]}`
        const embed = new EmbedBuilder()
        embed.setColor('MINECRAFT')
        embed.setImage(body.toString())
        embed.setDescription(`${Emoji['minecraft']} [[Download]](${body})`)

        ctx.send(embed)
    }
}
