const { Command, TranslatorUtils } = require('../../../utils')
const axios = require('axios')

module.exports = class TranslateCommand extends Command {
  constructor() {
    super({
      name: 'translate',
      aliases: ['traduzir'],
      arguments: 1,
      hasUsage: true
    })
  }

  async run(ctx) {
    const args = Object.values(ctx.args.join(' ').split(' '))
    const language = ctx.args[0]
    let content = ctx.args.join(' ')

    args.shift() // For remove first object of translate

    if (!ctx.args[1]) {
      // eslint-disable-next-line no-unused-vars
      content = 'I\'m a little girl'
    }

    const url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TranslatorUtils(language)}&dt=t&q=${args.join(' ')}&ie=UTF-8&oe=UTF-8`
    const res = await axios.get(encodeURI(url), { responseType: 'json' })

    const letters = []
    for (const translateOutput of res.data[0]) {
      letters.push(translateOutput[0].trim())
    }
    console.log(letters)
    ctx.reply('map', letters.join(' '))
  }
}
