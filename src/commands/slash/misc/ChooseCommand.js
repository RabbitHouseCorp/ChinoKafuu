const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class ChooseCommand extends Command {
  constructor() {
    super({
      name: 'choose',
      aliases: ['escolher'],
      arguments: 1,
      hasUsage: true,
      slash: new CommandBase()
        .setName('choose')
        .setDescription('Makes the bot choose something')
        .addOptions(
          new CommandOptions()
            .setName('choose')
            .setDescription('Use `,` to separate')
            .setType(3)
        )
    })
  }

  async run(ctx) {
    const argArray = ctx.message.command.interface.get('choose').value.split(',')
    const chosen = argArray[Math.floor(Math.random() * argArray.length)].trim()

    return ctx.replyT('cocoa_what', 'commands:choose.chosen', { chosen: chosen })
  }
}
