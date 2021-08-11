const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class ParrotCommand extends Command {
  constructor() {
    super({
      name: 'congaparrot',
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['externalEmojis']
      }],
      slash: new CommandBase()
        .setName('congaparrot')
        .setDescription('Sends funny parrots')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention the member on the server'),
        )
    })
  }

  async run(ctx) {
    if (ctx.args[0] > 20) return ctx.replyT('error', ctx._locale('commands:congaparrot.maxAllowed'))
    ctx.send('<a:parrot_dance:554489834417291285>'.repeat(ctx.args[0]))
  }
}
