// FUTURE[epic=KafuuTeam] Deprecate

const { Command, EmbedBuilder } = require('../../utils')

module.exports = class VoteCommand extends Command {
  constructor () {
    super({
      name: 'vote',
      aliases: ['votar'],
      arguments: 0,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(ctx._locale('commands:vote.title'))
    embed.setDescription(ctx._locale('commands:vote.embedVoted'))
    embed.setImage('https://cdn.discordapp.com/attachments/481807707066859530/784949124504092722/7bb5111f2ce1952b13d413f1ecf06e52.gif')
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
