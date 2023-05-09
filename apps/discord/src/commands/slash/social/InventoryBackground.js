import { getBackground } from '../../../lib'
import { Command, SlashCommandContext } from '../../../structures/util'

export default class InventoryBackgroundCommand extends Command {
  constructor() {
    super({
      name: 'inventory background',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  /**
   * @method run
   * @param {SlashCommandContext} ctx
   * @returns {void}
   */
  async run(ctx) {
    console.profile('getBackground!')
    console.time('getBackground!')
    const bg = await getBackground('gochiusa_4', {
      cache: true
    })
    console.profileEnd('getBackground!')
    console.timeEnd('getBackground!')

    console.profile('Uploading!!')
    console.time('Uploading!!')
    await ctx.send('test', {
      file: {
        file: bg,
        name: `test.gif`
      }
    })
    console.profileEnd('Uploading!!')
    console.timeEnd('Uploading!!')
  }
}
