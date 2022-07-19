const { Command } = require('../../../structures/util')

module.exports = class ParrotCommand extends Command {
  constructor() {
    super({
      name: 'congaparrot',
      permissions: [{
        entity: 'bot',
        permissions: ['useExternalEmojis']
      }]
    })
  }

  async run(ctx) {
    if (ctx.args[0] > 20) return ctx.replyT('error', ctx._locale('commands:congaparrot.maxAllowed'))
    ctx.send('<a:parrot_dance:554489834417291285>'.repeat(ctx.args[0]))
  }
}
