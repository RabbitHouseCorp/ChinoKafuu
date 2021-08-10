const { Command } = require('../../../utils')
const axios = require('axios')
const {CommandBase, CommandOptions} = require("eris");

module.exports = class LaranjoCommand extends Command {
  constructor() {
    super({
      name: 'laranjo',
      hasUsage: true,
      arguments: 1,
      permissions: [{
        entity: 'bot',
        permissions: ['attachFiles']
      }],
      slash: new CommandBase()
          .setName('laranjo')
          .setDescription('Laranjo will say something silly.')
          .addOptions(
              new CommandOptions()
                  .setType(3)
                  .setName('text')
                  .setDescription('Enter random text'),
          )
    })
  }

  async run(ctx) {
    const buffer = await axios({
      url: 'http://127.0.0.1:1234/render/laranjo',
      method: 'post',
      data: {
        text: ctx.args.join(' ')
      },
      responseType: 'arraybuffer'
    })

    ctx.send('', { file: { file: buffer.data, name: 'laranjo.png' } })
  }
}
