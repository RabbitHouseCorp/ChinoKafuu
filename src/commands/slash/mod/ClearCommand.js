const { Command, Emoji } = require('../../../utils')
const {CommandBase, CommandOptions, Choice} = require("eris");

module.exports = class ClearCommand extends Command {
  constructor() {
    super({
      name: 'clear',
      aliases: ['limpar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageMessages', 'readMessageHistory', 'readMessages']
      }],
      slash: new CommandBase()
          .setName('clear')
          .setDescription('Clears messages in this channel. If specified a user, it clears messages from that user')
          .addOptions(
              new CommandOptions()
                  .setType(4)
                  .setName('quantity')
                  .setDescription('Amount of message to delete.')
                  .isRequired(),
              new CommandOptions()
                  .setType(6)
                  .setName('user')
                  .setDescription('Mention the member on the server')
                  .isRequired()
          )
    })
  }

  async run(ctx) {
    if (ctx.args[0] > 100) return ctx.replyT('error', 'commands:clear.limit')
    if (isNaN(ctx.args[0])) return ctx.replyT('error', 'commands:clear.nan')
    const user = await ctx.getUser(ctx.args.slice(1).join(' '))
    const filter = user ? ((msg) => msg.author.id === user?.id) : null
    ctx.message.channel.purge(Number(ctx.args[0]), filter).then((msg) => {
      ctx.message.channel.createMessage(`${Emoji.getEmoji('success').mention} **|** ${ctx.message.author.mention}, ${ctx._locale('commands:clear.success', { messages: msg })}`)
    })
  }
}
