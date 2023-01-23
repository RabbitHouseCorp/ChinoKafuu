import { Command } from '../../../structures/util'

export default class ChooseCommand extends Command {
  constructor() {
    super({
      name: 'choose',
      aliases: ['escolher']
    })
  }

  async run(ctx) {
    const argArray = ctx.args.join(' ').split(',')
    const chosen = argArray[Math.floor(Math.random() * argArray.length)].trim()

    return ctx.replyT('cocoa_what', 'commands:choose.chosen', { chosen: chosen })
  }
}
