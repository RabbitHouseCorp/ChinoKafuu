const Command = require('../../structures/command/Command')

module.exports = class LanguageCommand extends Command {
  constructor() {
    super({
      name: 'language',
      aliases: ['lang', 'idioma'],
      permissions: [{
        entity: 'user',
        permissions: ['manageGuild']
      }, {
        entity: 'bot',
        permissions: ['embedLinks', 'addReactions']
      }]
    })
  }

  //TODO This command will have buttons in the new API version
  async run(ctx) {
    ctx.send('ajjh').then(async message => {
      await message.addReaction('🇧🇷')
      await message.addReaction('🇺🇸')
    })
  }
}
