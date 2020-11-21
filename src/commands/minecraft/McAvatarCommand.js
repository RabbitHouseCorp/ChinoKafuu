const Command = require('../../structures/command/Command')
const { EmbedBuilder, Emoji } = require('../../utils')

module.exports = class McAvatarCommand extends Command {
    constructor() {
        super({
            name: 'mcavatar',
            aliases: [],
            arguments: 1,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const body = `https://mc-heads.net/avatar/${ctx.args[0]}/256.png`
        const embed = new EmbedBuilder()
        embed.setColor('MINECRAFT')
        embed.setImage(body)
        embed.setDescription(`${Emoji['minecraft']} [[Download]](${body})`)

        ctx.send(embed)
    }
}
