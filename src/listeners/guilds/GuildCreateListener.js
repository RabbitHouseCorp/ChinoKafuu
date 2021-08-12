const Listener = require('../../structures/events/Listener')
const { EmbedBuilder, TopGGUtils, BlacklistUtils } = require('../../utils')

module.exports = class GuildCreateListener extends Listener {
  constructor() {
    super()
    this.event = 'guildCreate'
  }

  async on(client, guild) {
    client.database.guilds.getOrCreate(guild.id, {
      lang: guild.preferredLocale
    })

    const top_gg = new TopGGUtils()
    await top_gg.post(client)
    const blacklist = new BlacklistUtils(client)

    client.getRESTChannel(process.env.JOIN_AND_LEAVE_GUILD_CHANNEL_LOG).then(async (channel) => {
      if (!channel) return
      let webhook = await channel.getWebhooks()
      webhook = webhook.filter((w) => w.name === 'Megumi Natsu')[0]
      if (!webhook || webhook.user.id !== client.user.id) {
        webhook = await channel.createWebhook({
          name: 'Megumi Natsu',
          options: {
            type: 1
          }
        })
      }

      const owner = await client.getRESTUser(guild.ownerID)
      if (await blacklist.verifyGuild(guild)) {
        // const embed = new EmbedBuilder()
        // embed.setColor('#730101')
        // embed.setTitle('Guild Blacklisted')
        // embed.setDescription(`Someone tried to add me on this guild, but the guild is on my blacklist\n**Name:** ${guild.name} (\`${guild.id}\`)\n**Owner:** ${owner.username}#${owner.discriminator}`)
        // embed.setFooter(`Instance: ${client.user.username}#${client.user.discriminator}`, client.user.avatarURL)

        // client.executeWebhook(webhook.id, webhook.token, {
        //   embeds: [embed],
        //   avatarURL: 'https://cdn.discordapp.com/attachments/504668288798949376/874330667209609226/298498.png',
        //   username: 'Megumi Natsu'
        // })

        guild.leave()
        return
      }

      // const embed = new EmbedBuilder()
      // embed.setColor('#187000')
      // embed.setTitle('Guild Joined')
      // embed.setDescription(`**Name:** ${guild.name} (\`${guild.id}\`)\n**Owner:** ${owner.username}#${owner.discriminator}`)
      // embed.setFooter(`Instance: ${client.user.username}#${client.user.discriminator}`, client.user.avatarURL)

      // client.executeWebhook(webhook.id, webhook.token, {
      //   embeds: [embed],
      //   avatarURL: 'https://cdn.discordapp.com/attachments/504668288798949376/874330667209609226/298498.png',
      //   username: 'Megumi Natsu'
      // })
    })
  }
}
