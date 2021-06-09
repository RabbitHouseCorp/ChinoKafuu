const { Command, FunCommandInstance, Emoji } = require('../../utils')

module.exports = class TippyCommand extends Command {
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
    const jokes = FunCommandInstance.jokes[Math.floor(Math.random() * FunCommandInstance.jokes.length)]
    let webhook = await ctx.message.channel.getWebhooks()
    webhook = webhook.filter(webhook => webhook.name.toLowerCase() === 'tippy')[0]
    if (!webhook) {
      webhook = await ctx.message.channel.createWebhook({
        name: 'Tippy',
        options: {
          type: 1
        }
      })
    }

    ctx.client.executeWebhook(webhook.id, webhook.token, {
      content: `${Emoji.getEmoji('tippy').mention} **|** ${ctx.message.author.mention} ${jokes}`,
      avatarURL: url,
      username: 'Tippy'
    })
  }
}
