const { Command, TranslatorFun } = require('../../utils')
const fetch = require('node-fetch')

module.exports = class TranslateCommand extends Command {
  constructor () {
    super({
      name: 'translate',
      aliases: ['traduzir'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    const language = ctx.args[0]
    let content = ctx.args.slice(1).join(' ')
    if (ctx.args[1] === undefined) {
      content = 'I\'m a little girl'
    }

    const url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TranslatorFun(language)}&dt=t&q=${content.slice(0)}&ie=UTF-8&oe=UTF-8`
    const info = await fetch(encodeURI(url))
    const res = await info.text()
    const body = JSON.parse(await res)[0][0][0]

    ctx.reply('map', body.toString())
  }
}
