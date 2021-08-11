const { Command, TranslatorUtils } = require('../../../utils')
const axios = require('axios')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class TranslateCommand extends Command {
  constructor() {
    super({
      name: 'translate',
      aliases: ['traduzir'],
      arguments: 1,
      hasUsage: true,
      slash: new CommandBase()
        .setName('translate')
        .setDescription('Translate a text without having to use online translator services.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('language')
            .setDescription('Select which language you want to translate.')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('text')
            .setDescription('The text you want to translate.')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    const args = Object.values(ctx.args.join(' ').split(' '))
    const language = ctx.args[0]
    let content = ctx.args.join(' ')

    args.shift() // For remove first object of translate

    if (!ctx.args[1]) {
      content = 'I\'m a little girl'
    }

    const url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TranslatorUtils(language)}&dt=t&q=${args.join(' ')}&ie=UTF-8&oe=UTF-8`
    const res = await axios.get(encodeURI(url), { responseType: 'json' })

    let letters = []
    for (let translateOutput of res.data[0]) {
      letters.push(translateOutput[0])
    }

    ctx.reply('map', letters.toString())
  }
}
