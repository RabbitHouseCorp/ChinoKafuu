import { Command, TranslatorUtils } from '../../../structures/util'
import axios from 'axios'
import { CommandBase, CommandOptions } from 'eris'

export default class TranslateCommand extends Command {
  constructor() {
    super({
      name: 'translate',
      aliases: ['traduzir'],
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
    const language = ctx.args.get('language').value
    let content = ctx.args.get('text').value

    if (!content) {
      content = 'I\'m a little girl'
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TranslatorUtils(language)}&dt=t&q=${content}&ie=UTF-8&oe=UTF-8`
    const res = await axios.get(encodeURI(url), { responseType: 'json' })

    const letters = []
    for (const translateOutput of res.data[0]) {
      letters.push(translateOutput[0].trim())
    }

    ctx.reply('map', letters.join(' '))
  }
}
