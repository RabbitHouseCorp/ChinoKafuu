const { Command } = require('../../../structures/util')
const axios = require('axios')

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

    const buffer = await axios.get(emoji.url, { responseType: 'arraybuffer' }).then(d => d.data)
    ctx.send('', {
      file:
      {
        file: buffer,
        name: `${emoji.name}.${emoji.animated ? 'gif' : 'png'}`
      }
    })
  }
}
