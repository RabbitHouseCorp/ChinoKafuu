const Command = require("../../structures/command")
const moment = require('moment')
module.exports = class DailyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'daily',
      category: 'economy',
      aliases: ['diarios']
    })
  }
  async execute({message, args, server}, t) {
    let user = await this.client.database.Users.findById(message.author.id)
    if (!user || user === null) {
      let novoUser = new this.client.database.Users({
        '_id': message.author.id
      })
        novoUser.save()
    }
    
    if (parseInt(user.timeDaily) < Date.now()) {
      
      let random = Math.floor(Math.random() * (1400 - 340 + 1)) + 340;
      
      user.yens = random
      user.timeDaily = 43200000 + Date.now()
      user.save()
      message.chinoReply('moneybag', t('commands:daily.dailysuccess', {
        total: random
      }))
      
      
    } else {
      message.chinoReply('error', t('commands:daily.hasBeenPicked', {
        tempo: (parseInt(user.timeDaily) > 3600000) ? moment.utc(parseInt(user.timeDaily - Date.now())).format('hh:mm:ss') : moment.utc(parseInt(user.timeDaily - Date.now())).format('mm:ss')
      }))
    }
  }
}