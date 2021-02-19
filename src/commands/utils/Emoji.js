const { Command } = require('../../utils')
const fetch = require('node-fetch')
module.exports = class EmojiCommand extends Command {
    constructor() {
        super({
            name: 'emoji',
            aliases: [],
            hasUsage: true,
            arguments: 1,
            permissions: [{
                entity: 'bot',
                permissions: ['attachFiles']
            }]
        })
    }

    async run(ctx) {
        const emoji = await ctx.getEmoji(ctx.args[0])
        if (!emoji) return ctx.replyT('error', 'basic:invalidEmoji')
        const url = emoji.url
        const request = await fetch(url)
        const buffer = await request.buffer()

        ctx.send('', {}, { file: buffer, name: `${emoji.name}.${emoji.animated ? 'gif' : 'png'}` })
    }
}
