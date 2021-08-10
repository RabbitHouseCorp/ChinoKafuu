const { Command } = require('../../../utils')

module.exports = class ChooseCommand extends Command {
  constructor() {
    super({
      name: 'choose',
      aliases: ['escolher'],
      arguments: 1,
      hasUsage: true
    })
  }

  async run(ctx) {
    const argArray = ctx.args.join(' ').split(',')
    const chosen = argArray[Math.floor(Math.random() * argArray.length)].trim()

    return ctx.replyT('cocoa_what', 'commands:choose.chosen', { chosen: chosen })
  }
}
