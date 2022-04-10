const { Command } = require('../../../structures/util')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class ParrotCommand extends Command {
  constructor() {
    super({
      name: 'congaparrot',
      permissions: [{
        entity: 'bot',
        permissions: ['useExternalEmojis']
      }],
      slash: new CommandBase()
        .setName('congaparrot')
        .setDescription('Sends funny parrots')
        .addOptions(
          new CommandOptions()
            .setType(4)
            .setName('quantity')
            .setDescription('Quantity of parrots.')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const quantity = ctx.args.get('quantity').value
    if (quantity > 20) return ctx.replyT('error', ctx._locale('commands:congaparrot.maxAllowed'))
    ctx.send('<a:parrot_dance:554489834417291285>'.repeat(quantity))
  }
}
