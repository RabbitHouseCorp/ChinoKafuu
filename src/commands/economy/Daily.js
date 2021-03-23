const { Command, EmbedBuilder } = require('../../utils')
const moment = require('moment')

module.exports = class DailyCommand extends Command {
  constructor () {
    super({
      name: 'daily',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    const user = ctx.db.user
    if (parseInt(user.timeDaily) > Date.now()) {
      return ctx.replyT('error', 'commands:daily.hasBeenPicked', {
        0: parseInt(user.timeDaily - Date.now()) > 3600000 ? moment.utc(user.timeDaily - Date.now()).format('hh:mm:ss') : moment.utc(user.timeDaily - Date.now()).format('mm:ss')
      })
    }

    const amount = Math.floor(Math.random() * 1500)
    user.yens += amount
    user.timeDaily = 43200000 + Date.now()
    user.save().then(() => {
      const embed = new EmbedBuilder()
      embed.setColor('DEFAULT')
      embed.setThumbnail('https://cdn.discordapp.com/attachments/504668288798949376/800132564227719193/artworks-000454557840-nvbn35-t500x500.png')
      embed.setTitle(ctx._locale('commands:daily.yensDaily'))
      embed.setDescription(ctx._locale('commands:daily.congrats', { 0: Number(amount).toLocaleString() }))

      ctx.send(embed.build())
    })
  }
}
