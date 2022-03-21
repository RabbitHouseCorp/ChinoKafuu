const { Command } = require('../../../structures/util')
const { CommandBase, CommandOptions } = require('eris')
const axios = require('axios')

module.exports = class AddEmojiCommand extends Command {
  constructor() {
    super({
      name: 'addemoji',
      aliases: ['adicionaremoji'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageEmojisAndStickers']
      }],
      slash: new CommandBase()
        .setName('addemoji')
        .setDescription('Adds an emoji to your server')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('name')
            .setDescription('The name of the emoji')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('url')
            .setDescription('The URL of the image')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const name = ctx.args.get('name').value
    const url = ctx.args.get('url').value
    if (!name || !url) {
      return ctx.replyT('error', 'basic:missingArgs', {
        prefix: ctx.db.guild.prefix,
        commandName: this.name
      })
    }
    try {
      const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
      const base64Emoji = `data:image/${url.substr(url.length - 3)};base64,${buffer}`

      const emoji = await ctx.message.guild.createEmoji({
        name: name,
        image: base64Emoji
      })
      const getEmoji = await ctx.getEmoji(`<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`)
      ctx.send(`${getEmoji.mention} **|** ${ctx.message.author.mention}, ${ctx._locale('commands:addemoji.added')}`)
    } catch (err) {
      ctx.client.emit('error', (ctx.client, err))
      return ctx.replyT('error', 'commands:addemoji.error')
    }
  }
}
