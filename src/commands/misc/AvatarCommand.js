const Command = require('../../structures/command/Command')
const { EmbedBuilder } = require('../../utils')
const axios = require('axios')

module.exports = class AvatarCommand extends Command {
  constructor() {
    super({
      name: 'avatar'
    })
  }

  async run(ctx) {
    const memberId = ctx.args[0]?.replace(/[<@!>]/g, '')
    let member = ctx.client.users.get(memberId)

    if (!member) {
      const baseUrl = (userId, hash) => `https://cdn.discordapp.com/avatars/${userId}/${hash}.${hash.startsWith('a_') ? 'gif' : 'png'}?size=2048`
      try {
        const request = await axios.get('https://discord.com/api/v8/users/' + memberId, {
          headers: {
            'Authorization': 'Bot ' + process.env.DISCORD_TOKEN
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
      .setTitle(ctx._locale('commands:avatar.userAvatar', { user: member.username }))
      .setDescription(ctx._locale('commands:avatar.download', { link: member.avatarURL }))
      .setImage(member.avatarURL)
      .setColor('DEFAULT')

    ctx.send(embed)
  }
}
