import { Command } from '../../../structures/util'
import { CommandBase, CommandOptions } from 'eris'

export default class ChooseCommand extends Command {
  constructor() {
    super({
      name: 'choose',
      aliases: ['escolher'],
      slash: new CommandBase()
        .setName('choose')
        .setDescription('Makes the bot choose something')
        .addOptions(
          new CommandOptions()
            .setName('choose')
            .setDescription('Use `,` to separate')
            .setType(3)
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const argArray = ctx.args.get('choose').value.split(',')
    const chosen = argArray[Math.floor(Math.random() * argArray.length)].trim()

    return ctx.replyT('cocoa_what', 'commands:choose.chosen', { chosen: chosen })
  }
}
