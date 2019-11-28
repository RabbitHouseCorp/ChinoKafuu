const Command = require("../../structures/command")
const fetch = require('node-fetch')

module.exports = class McQueryCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mcquery',
      category: 'minecraft',
      aliases: [],
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      hidden: false,
    })
  }

  async run({message, args, server}, t) {

    const url = `http://mcapi.us/server/status?ip=${args[0]}`
    const res = await fetch(url)
    //if (err) return message.chinoReply('error', t('commands:mcquery.error', {err: err}))
    let body = await res.json()
    if (body.online) {
      const embed = new this.client.Discord.RichEmbed()
        .setColor(this.client.colors.mine)
        .addField(t('commands:mcquery.serverIP'), args[0], true)
        .addField('Players online', `${body.players.now}/${body.players.max} players`, true)
        .addField(t('commands:mcquery.version'), body.server.name, true)
        .addField(t('commands:mcquery.uptime'), moment.duration(body.duration).format('dd [days] hh [hours] mm [min] ss [secs]'), true)
        .addBlankField(true)
        .addField('Motd', body.motd)

      message.channel.send(embed)
    } else {
      message.chinoReply('error', t('commands:mcquery.offline'))
    }

  }
}