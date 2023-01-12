import { Command } from '../../../structures/util'
import axios from 'axios'

export default class EmojiCommand extends Command {
  constructor() {
    super({
      name: 'emoji',
      aliases: [],
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
