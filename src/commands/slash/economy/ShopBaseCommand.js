const { Command, EmbedBuilder, TopGGUtils } = require('../../../structures/util')
const moment = require('moment')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class ShopBaseCommand extends Command {
  constructor() {
    super({
      name: 'shop background',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      isBeta: true,
      slash: new CommandBase()
        .setName('shop')
        .setDescription('You can get your daily yens by using this command')
        .addOptions(
          new CommandOptions()
            .setType(1)
            .setName('profile')
            .setDescription('Shows a player\'s minecraft avatar.'),
          new CommandOptions()
            .setType(1)
            .setName('background')
            .setDescription('Shows a player\'s minecraft avatar.'),
        )
    })
  }

  async run(ctx) {
    const profileLoaded = []

  }
}