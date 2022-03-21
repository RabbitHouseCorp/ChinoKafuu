const { Command, EmbedBuilder, ReactionCollector, Emoji } = require('../../../structures/util')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class AnnounceCommand extends Command {
  constructor() {
    super({
      name: 'announce',
      aliases: ['anunciar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['mentionEveryone', 'embedLinks', 'addReactions']
      },
      {
        entity: 'user',
        permissions: ['manageGuild', 'mentionEveryone']
      }],
      slash: new CommandBase()
        .setName('announce')
        .setDescription('Send a announce to current server for all members (or not).')
        .addOptions(
          new CommandOptions()
            .setType(7)
            .setName('channel')
            .setDescription('Send a announce to channel.')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('text')
            .setDescription('Send a announce to current server for all members (or not).')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const guild = ctx.message.guild
    const channel = guild.channels.get(ctx.args.get('channel').value.id)
    if (!channel) return ctx.replyT('error', 'commands:announce.channelNotFound')
    const announce = ctx.args.get('text').value
    if (!announce) return ctx.replyT('error', 'commands:announce.argsNotFound')
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setAuthor(guild.name, guild.iconURL)
    embed.setDescription(announce)
    embed.setFooter(ctx._locale('commands:announce.embedSendBy', { 0: `${ctx.message.member.username}#${ctx.message.member.discriminator}` }), ctx.message.member.avatarURL)

    ctx.replyT('warn', 'commands:announce.requestConfirm', {
      0: channel.mention,
      1: Emoji.getEmoji('success').mention,
      2: Emoji.getEmoji('warn').mention,
      3: Emoji.getEmoji('error').mention
    }).then(async msg => {
      await msg.addReaction(Emoji.getEmoji('success').reaction)
      await msg.addReaction(Emoji.getEmoji('warn').reaction)
      await msg.addReaction(Emoji.getEmoji('error').reaction)

      const filter = (_, emoji, userID) => (['gochiusa_success', 'warn', 'gochiusa_error'].includes(emoji.name)) && userID === ctx.message.member.id
      const collector = new ReactionCollector(msg, filter, { max: 1 })
      collector.on('collect', async (_, emoji) => {
        switch (emoji.name) {
          case 'gochiusa_success': {
            msg.delete()
            ctx.replyT('success', 'commands:announce.announceSent')
            channel.createMessage(embed.build('@everyone'))
          }
            break
          case 'warn': {
            msg.delete()
            ctx.replyT('success', 'commands:announce.announceSent')
            channel.createMessage(embed.build('@here'))
          }
            break
          case 'gochiusa_error': {
            msg.delete()
            ctx.replyT('success', 'commands:announce.announceSent')
            channel.createMessage(embed.build())
          }
            break
        }
      })
    })
  }
}
