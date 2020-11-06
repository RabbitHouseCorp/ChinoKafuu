const Command = require('../../structures/command/Command')
const fetch = require('node-fetch')
const Jokes = require('../../structures/util/FunCommandInstance')
class TippyCommand extends Command {
    constructor() {
        super({
            name: 'tippy',
            aliases: ['piada'],
            permissions: [{
                entity: 'bot',
                permissions: ['manageWebhooks']
            }]
        })
    }

    async run(ctx) {
        const url = 'https://cdn.discordapp.com/attachments/468878707449397258/753395078202130602/209374d243fd45aaddf68b8f5ceb2ce6qfdbg9ohK8LFt8NR-0.png'
        const request = await fetch(url)
        const buffer = await request.buffer()
        const data = `data:image/${url.substring(url.length, 3)};base64,`
        const base64Avatar = data + buffer.toString('base64')
        const jokes = Jokes.jokes[Math.floor(Math.random() * Jokes.length)]
        ctx.client.createChannelWebhook(ctx.message.channel.id, {
            name: 'tippy',
            avatar: base64Avatar
        }).then(webhook => {
            ctx.reply(jokes).then(() => {
                ctx.client.deleteWebhook(webhook.id, webhook.token)
            })
        })
    }
}

module.exports = TippyCommand