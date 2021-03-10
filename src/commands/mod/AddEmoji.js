const { Command } = require('../../utils')
const fetch = require('node-fetch')
const Helper = require('../../structures/util/Helper')

module.exports = class AddEmojiCommand extends Command {
    constructor() {
        super({
            name: 'addemoji',
            aliases: ['adicionaremoji'],
            arguments: 1,
            hasUsage: true,
            permissions: [{
                entity: 'both',
                permissions: ['manageEmojis']
            }]
        })
    }

    async run(ctx) {

        const url = ctx.args[1] ?? ctx.message.attachments[0]?.url
        let name = ctx.args[0]
        if (!name || !url) return ctx.replyT('error', 'basic:missingArgs', {
            prefix: ctx.db.guild.prefix,
            commandName: this.name
        })
        try {
            const request = await fetch(url)
            const buffer = await request.buffer()
            const data = `data:image/${url.substr(url.length - 3)};base64,`
            const base64Emoji = buffer.toString('base64')
            return ctx.message.channel.guild.createEmoji({
                name: name,
                image: data + base64Emoji

            }).then(emoji => ctx.send(emoji.name)).catch(() => ctx.replyT('error', 'commands:addemoji.error'))
        } catch {
            return ctx.replyT('error', 'commands:addemoji.error')
        }
    }
}
