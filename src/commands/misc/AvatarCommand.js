const { Command, EmbedBuilder } = require('../../utils')
const axios = require('axios')

module.exports = class AvatarCommand extends Command {
  constructor() {
    super({
      name: 'avatar',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const memberId = ctx.args[0]?.replace(/[<@!>]/g, '')
    let member = ctx.client.users.get(memberId)

    if (!member) {
      const baseUrl = (userId, hash) => `https://cdn.discordapp.com/avatars/${userId}/${hash}.${hash.startsWith('a_') ? 'gif' : 'png'}?size=2048`
      try {
        const request = await axios.get(`https://discord.com/api/v8/users/${memberId}`, {
          headers: {
            'Authorization': `Bot ${process.env.DISCORD_TOKEN}`
          }
        })
        const response = request.data
        member = {
          username: response.username,
          avatarURL: baseUrl(memberId, response.avatar)
        }
      } catch (e) {
        member = ctx.message.author
      }
    }

    const embed = new EmbedBuilder()
    embed.setTitle(ctx._locale('commands:avatar.userAvatar', { user: member.username }))
    embed.setDescription(ctx._locale('commands:avatar.download', { link: member.avatarURL }))
    embed.setImage(member.avatarURL)
    embed.setColor('DEFAULT')
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()


    ctx.send(embed.build())
  }
}
