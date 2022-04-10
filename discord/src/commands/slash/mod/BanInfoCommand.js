const { Command, EmbedBuilder, ReactionCollector, Emoji } = require('../../../structures/util')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class BanInfoCommand extends Command {
  constructor() {
    super({
      name: 'baninfo',
      aliases: [],
      permissions: [{
        entity: 'bot',
        permissions: ['banMembers', 'embedLinks']
      },
      {
        entity: 'user',
        permissions: ['banMembers']
      }],
      slash: new CommandBase()
        .setName('baninfo')
        .setDescription('Check the ban information about a user')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention the member on the server')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const guild = ctx.message.guild
    const bans = await guild.getBans()
    const user = ctx.args.get('user').value?.id ?? ctx.args.get('user').value
    const member = bans.find(ban => ban.user.id === user)
    if (!member) return ctx.replyT('error', 'commands:unban.notBanned')
    const embed = new EmbedBuilder()
    embed.setColor('MODERATION')
    embed.setThumbnail(member.user.avatarURL)
    embed.setFooter(ctx._locale('commands:baninfo.unban', { 0: Emoji.getEmoji('heart').mention }))
    embed.setTitle(ctx._locale('commands:baninfo.title'))
    embed.addField(ctx._locale('commands:baninfo.memberName'), `${member.user.username}#${member.user.discriminator} (\`${member.user.id}\`)`)
    embed.addField(ctx._locale('commands:baninfo.reason'), member.reason ? member.reason : ctx._locale('basic:noReason'))

    ctx.send(embed.build()).then(async (msg) => {
      await msg.addReaction(Emoji.getEmoji('heart').reaction)

      const filter = (_, emoji, userID) => ([Emoji.getEmoji('heart').mention].includes(emoji.name)) && userID === ctx.message.member.id
      const collector = new ReactionCollector(msg, filter, { max: 1 })
      collector.on('collect', (_, emoji) => {
        switch (emoji.name) {
          case Emoji.getEmoji('heart').name: {
            if (!member) return
            guild.unbanMember(member.user.id, ctx._locale('basic:punishment.reason', { 0: `${ctx.message.member.user.username}#${ctx.message.member.user.discriminator}`, 1: ctx._locale('basic:noReason') })).then(() => {
              const unbanEmbed = new EmbedBuilder()
              unbanEmbed.setColor('MODERATION')
              unbanEmbed.setThumbnail(member.user.avatarURL)
              unbanEmbed.setTitle(ctx._locale('basic:punishment.unbanned', { 0: `${member.user.username}#${member.user.discriminator}` }))
              unbanEmbed.addField(ctx._locale('basic:punishment.embed.memberName'), `${member.user.username}#${member.user.discriminator} (\`${member.user.id}\`)`)
              unbanEmbed.addField(ctx._locale('basic:punishment.embed.staffName'), `${ctx.message.member.user.username}#${ctx.message.member.user.discriminator} (\`${ctx.message.member.user.id}\`)`)
              unbanEmbed.addField(ctx._locale('basic:punishment.embed.reason'), ctx._locale('basic:noReason'))

              ctx.send(unbanEmbed.build())

              const server = ctx.db.guild
              if (server.punishModule) {
                const channel = ctx.message.guild.channels.get(server.punishChannel)
                if (!channel) {
                  server.punishModule = false
                  server.punishChannel = ''
                  server.save()
                  return ctx.replyT('error', 'events:channel-not-found')
                }

                channel.createMessage(unbanEmbed.build())
              }
            })
          }
        }
      })
    })
  }
}
