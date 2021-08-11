const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class ClapCommand extends Command {
  constructor() {
    super({
      name: 'clap',
      aliases: ['palmas'],
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['externalEmojis']
      }],
      slash: new CommandBase()
        .setName('clap')
        .setDescription('Let\'s clap, clap, clap, clap, clap with your friends.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('text')
            .setDescription('Let\'s clap, clap, clap, clap, clap with your friends.'),
        )
    })
  }

  async run(ctx) {
    const clap = ctx.message.command.interface.get('text').value.split('').join(' ').split(' ').join('<a:clap:554482751542132736>')
    if (!clap) return ctx.replyT('error', 'commands:clap.noArgs')
    const option = ctx.message.member.permission.has('mentionEveryone')

    ctx.send(clap, option)
  }
}
