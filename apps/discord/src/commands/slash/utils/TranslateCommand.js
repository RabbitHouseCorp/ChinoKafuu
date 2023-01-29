import axios from 'axios'
import { CommandBase, CommandOptions } from 'eris'
import { EmbedPage } from '../../../structures/EmbedPage'
import { Command, EmbedBuilder, TranslatorUtils } from '../../../structures/util'

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
    const embed = new EmbedPage(90 * 1000, {
      waitMessage: true,
      users: [ctx.message.member.id]
    }, ctx)

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TranslatorUtils(language)}&dt=t&q=${content}&ie=UTF-8&oe=UTF-8`

    const res = await axios.get(encodeURI(url), { responseType: 'json' })
    const data = res.data
      .filter((i) => Array.isArray(i))
      .flatMap((i) => i)
      .filter((i) => Array.isArray(i) && !(i.length <= 1))
      .map((i) => Array.isArray(i) ? i[0] : null)
    const textComponents = data.join(' ').split(/([^]{1,4093})/g)
      .filter((i) => i.length >= 1)
      .map((i) => this.#prepareEmbed(ctx, i.length >= 4093 - 3 ? i + '...' : i))

    embed.addComponents(...textComponents)

    ctx.send(embed.prepareToSend()).then((message) => embed.setDefaultMessage(message))
  }

  #prepareEmbed(ctx, desc) {
    return new EmbedBuilder()
      .setColor('DEFAULT')
      .setTitle('Translation')
      .setDescription(desc)
  }
}
