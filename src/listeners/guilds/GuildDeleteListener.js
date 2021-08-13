const Listener = require('../../structures/events/Listener')
const { EmbedBuilder, TopGGUtils, BlacklistUtils } = require('../../utils')

module.exports = class GuildDeleteListener extends Listener {
  constructor() {
    super()
    this.event = 'guildDelete'
  }

  async on(client, guild) {
    const top_gg = new TopGGUtils()
    await top_gg.post(client)
    const blacklist = new BlacklistUtils(client)
    client.getRESTChannel(process.env.JOIN_AND_LEAVE_GUILD_CHANNEL_LOG).then(async (channel) => {
      // if (!channel) return
      // let webhook = await channel.getWebhooks()
      // webhook = webhook.filter((w) => w.name === 'Megumi Natsu')[0]
      // if (!webhook || webhook.user.id !== client.user.id) {
      //   webhook = await channel.createWebhook({
      //     name: 'Megumi Natsu',
      //     options: {
      //       type: 1
      //     }
      //   })
      // }

      const owner = await client.getRESTUser(guild.ownerID)
      if (await blacklist.verifyGuild(guild)) {
        // const embed = new EmbedBuilder()
        // embed.setColor('#730101')
        // embed.setTitle('Guild Blacklisted')
        // embed.setDescription(`I quited of this guild because it is in my blacklist\n**Name:** ${guild.name} (\`${guild.id}\`)\n**Owner:** ${owner.username}#${owner.discriminator}`)
        // embed.setFooter(`Instance: ${client.user.username}#${client.user.discriminator}`, client.user.avatarURL)

        // client.executeWebhook(webhook.id, webhook.token, {
        //   embeds: [embed],
        //   avatarURL: 'https://cdn.discordapp.com/attachments/504668288798949376/874330667209609226/298498.png',
        //   username: 'Megumi Natsu'
        // })
        return
      }

      // const embed = new EmbedBuilder()
      // embed.setColor('#eb2323')
      // embed.setTitle('Guild Deleted')
      // embed.setDescription(`**Name:** ${guild.name} (\`${guild.id}\`)\n**Owner:** ${owner.username}#${owner.discriminator}`)
      // embed.setFooter(`Instance: ${client.user.username}#${client.user.discriminator}`, client.user.avatarURL)

      // client.executeWebhook(webhook.id, webhook.token, {
      //   embeds: [embed],
      //   avatarURL: 'https://cdn.discordapp.com/attachments/504668288798949376/874330667209609226/298498.png',
      //   username: 'Megumi Natsu'
      // })

      client.database.guilds.getAndDelete(guild.id)
    })
  }
}
