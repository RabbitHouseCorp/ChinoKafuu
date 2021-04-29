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
    const body = await axios.get(`${encodeURI(`https://eu.mc-api.net/v3/server/ping/${ctx.args[0]}`)}`)
    if (body.data.online === true) {
      const embed = new EmbedBuilder()
      embed.setColor('MINECRAFT')
      embed.setTitle(`${Emoji.getEmoji('minecraft').mention} ${ctx.args[0]}`)
      embed.addField('Players', `${body.data.players.online}/${body.data.players.max}`, true)
      const parseLetter = []

      if (typeof body.data.description.extra === 'object') {
        let format = false
        let nb = -1
        for (let letter of body.data.description.extra) {
          nb++
          if (typeof letter.bold === 'boolean') {
            if (letter.bold === true) {
              if (typeof body.data.description.extra[nb + 1] === 'object') {
                if (letter.bold === true) {
                  format = true
                } else {
                  format = false
                }
              }
              parseLetter.push(`**${letter.text}${format === true ? '' : '**'}`)
            }
          } else {
            parseLetter.push(letter.text)
          }
       
        }
      }
      
      embed.setDescription(`${typeof body.data.description === 'string' ? body.data.description.replace(/(\§[A-Za-z0-9])/g, '') : parseLetter.join('')}`)
      if (typeof body.data.modinfo === 'object') {
        embed.addField(ctx._locale('commands:mcquery.mod'), `${body.data.modinfo.modList.length === 0 ? `${ctx._locale('commands:mcquery.modType')}\n${ctx._locale('commands:mcquery.withoutmod')}` : body.data.modinfo.modList.join('\n')}`, true)
      }
      embed.addField(ctx._locale('commands:mcquery.version'), `${body.data.version.name.split(',').length === 0 ? ctx._locale('commands:mcquery.withoutversion') : body.data.version.name.split(',').join('\n')}`, true)
      embed.setFooter(`©️ ${ctx.client.user.username}`)
      embed.setTimestamp()

      return ctx.send(embed.build())
    } else {
      return ctx.replyT('error', 'commands:mcquery.serverOffline', { 0: ctx.args[0] })
    }
  }
}
