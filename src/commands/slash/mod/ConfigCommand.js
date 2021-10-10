const { Command, EmbedBuilder } = require('../../../utils')
const { CommandBase, CommandOptions, Choice } = require('eris')

module.exports = class ConfigCommand extends Command {
  constructor() {
    super({
      name: 'config',
      aliases: ['module', 'configurações', 'configurar'],
      permissions: [{
        entity: 'user',
        permissions: ['manageGuild']
      },
      {
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('config')
        .setDescription('Enable and disable some modules who I have in your guild.')
        .addOptions(
          new CommandOptions()
            .setType(1)
            .setName('animu')
            .setDescription('Animu Radio'),
          new CommandOptions()
            .setType(1)
            .setName('mod')
            .setDescription('Mod Log'),
          new CommandOptions()
            .setType(1)
            .setName('report')
            .setDescription('Report Module'),
        )
    })
  }

  run(ctx) {

  }
}
