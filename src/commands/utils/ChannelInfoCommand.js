const { Command, EmbedBuilder } = require('../../utils')
const moment = require('moment')
const axios = require('axios')

module.exports = class ChannelInfoCommand extends Command {
  constructor() {
    super({
      name: 'channelinfo',
      aliases: ['chatinfo'],
      hasUsage: true,
      permissions: [{
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const args = ctx.args[0]?.replace(/<#>/g, '') ?? ctx.message.channel.id
    let channel = ctx.client.getChannel(args) || ctx.message.guild.channels.find(channel => channel.name.toLowerCase().includes(ctx.args.join(' ').toLowerCase()))
    if (!channel) {
      channel = ctx.message.channel
    }
    const _locale = ctx._locale
    const request = await axios.get(`https://discord.com/api/v8/channels/${channel.id}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`
      }
    })

    const data = request.data

    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(_locale('commands:channelinfo.title', { 0: data.name }))
    embed.setDescription((data.topic !== null) ? `\`\`\`${data.topic}\`\`\`` : `\`${_locale('commands:channelinfo.noTopic')}\``)
    embed.addField(_locale('commands:channelinfo.mention'), `\`${channel?.mention}\`` ?? channel.name, true)
    embed.addField(_locale('commands:channelinfo.channelID'), `\`${data.id}\``, true)
    embed.addField('NSFW', `\`${_locale(`basic:boolean.${data.nsfw}`)}\``, true)
    embed.addField(_locale('commands:channelinfo.guild'), `\`${channel.guild.name}\``, true)
    embed.addField(_locale('commands:channelinfo.category'), `\`${channel.guild.channels.get(channel.parentID)?.name}\``, true)
    embed.addField(_locale('commands:channelinfo.createdAt'), `\`${moment(channel.createdAt).format('LLLL')}\``, true)

    ctx.send(embed.build())
  }
}
