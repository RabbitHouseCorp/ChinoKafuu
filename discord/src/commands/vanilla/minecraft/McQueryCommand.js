const { Command, EmbedBuilder, Emoji } = require('../../../structures/util')
const axios = require('axios')

module.exports = class McQueryCommand extends Command {
  constructor() {
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

  async run(ctx) {
    const body = await axios.get(`${encodeURI(`https://api.mcsrvstat.us/2/${ctx.args[0]}`)}`, { responseType: 'json' })
    const mcserver = body.data
    if (mcserver.online) {
      const embed = new EmbedBuilder()
      embed.setColor('MINECRAFT')
      embed.setTitle(`${Emoji.getEmoji('minecraft').mention} ${mcserver.hostname}`)
      embed.setDescription(mcserver.motd.clean.join('\n'))
      embed.setFooter(`©️ ${ctx.client.user.username}`)
      embed.setTimestamp()
      embed.addField('Players', `${mcserver.players.online}/${mcserver.players.max}`)
      embed.addField(ctx._locale('commands:mcquery.version'), mcserver.version)

      return ctx.send(embed.build())
    } else {
      return ctx.replyT('error', 'commands:mcquery.serverOffline', { 0: ctx.args[0] })
    }
  }
}
