const { Command, EmbedBuilder, Emoji } = require('../../utils')
const axios = require('axios')

module.exports = class McQueryCommand extends Command {
  constructor () {
    super({
      name: 'mcquery',
      aliases: ['mcpesquisa', 'mcstatus'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    const body = await axios.get(`http://mcapi.us/server/status?ip=${ctx.args[0]}`)

    if (body.online) {
      const embed = new EmbedBuilder()
      embed.setColor('MINECRAFT')
      embed.setTitle(`${Emoji.getEmoji('minecraft').mention} ${ctx.args[0]}`)
      embed.addField('Players', `${body.players.now}/${body.players.max}`, true)
      embed.addField(ctx._locale('commands:mcquery.version'), body.server.name, true)
      embed.setFooter(`©️ ${ctx.client.user.username}`)
      embed.setTimestamp()

      return ctx.send(embed.build())
    } else {
      return ctx.replyT('error', 'commands:mcquery.serverOffline', { 0: ctx.args[0] })
    }
  }
}
