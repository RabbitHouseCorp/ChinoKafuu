const Command = require('../../structures/command/Command')

module.exports = class ParrotCommand extends Command {
  constructor() {
    super({
      name: 'congaparrot',
      arguments: 1,
      permissions: [{
        entity: 'bot',
        permissions: ['externalEmojis']
      }]
    })
  }
  async run(ctx) {
    if (ctx.args[0] > 20) return ctx.replyT("error", ctx.t("commands:congaparrot.maxAllowed"))
    ctx.send('<a:parrot_dance:554489834417291285>'.repeat(ctx.args[0]))
  }
}
