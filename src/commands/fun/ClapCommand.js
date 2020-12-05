const { Command } = require('../../utils')

module.exports = class ClapCommand extends Command {
  constructor() {
    super({
      name: 'clap',
      aliases: ['palmas'],
      permissions: [{
        entity: 'bot',
        permissions: ['externalEmojis']
      }]
    })
  }

  async run(ctx) {
    const clap = ctx.args.join(" ").split(" ").join("<a:clap:554482751542132736>")
    if (!clap) return ctx.replyT('error', 'commands:clapNoArgs')
    const option = ctx.message.member.permission.has('mentionEveryone') ? { allowedMentions: { everyone: true } } : { allowedMentions: { everyone: false } }

    ctx.send(clap, option)
  }
}
