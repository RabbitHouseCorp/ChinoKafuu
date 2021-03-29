const { Command } = require('../../utils')
const axios = require('axios')

module.exports = class LaranjoCommand extends Command {
  constructor () {
    super({
      name: 'laranjo',
      hasUsage: true,
      arguments: 1,
      permissions: [{
        permissions: ['attachFiles']
      }]
    })
  }

  async run (ctx) {
    const buffer = await axios({
      url: 'http://127.0.0.1:1234/render/laranjo',
      method: 'post',
      data: {
        text: ctx.args.join(' ')
      },
      responseType: 'arraybuffer'
    })

    ctx.send('', {}, { file: buffer.data, name: 'laranjo.png' })
  }
}
