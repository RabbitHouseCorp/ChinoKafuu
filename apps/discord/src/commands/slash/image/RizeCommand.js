const { Command } = require('../../../structures/util')
const axios = require('axios')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class RizeCommand extends Command {
  constructor() {
    super({
      name: 'rize',
      aliases: ['rizesign'],
      permissions: [{
        entity: 'bot',
        permissions: ['attachFiles']
      }],
      slash: new CommandBase()
        .setName('rize')
        .setDescription('Makes Rize writes on the paper')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('text')
            .setDescription('Enter random text')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const buffer = await axios({
      url: 'http://127.0.0.1:1234/render/rize',
      method: 'post',
      data: {
        text: ctx.args.get('text').value
      },
      responseType: 'arraybuffer'
    })

    ctx.send('', { file: { file: buffer.data, name: 'rize.png' } })
  }
}
