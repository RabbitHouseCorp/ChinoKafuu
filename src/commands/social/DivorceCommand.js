
const { Command, ReactionCollector, Emoji } = require('../../utils')

module.exports = class DivorceCommand extends Command {
  constructor () {
    super({
      name: 'divorce',
      aliases: ['divorciar'],
      arguments: 0,
      overlaps: true,
      permissions: [{
        entity: 'bot',
        permissions: ['addReactions']
      }]
    })
  }

  async run (ctx) {
    const author = ctx.db.user
    if (!author.isMarry) return ctx.replyT('error', 'commands:divorce.youAreNotMarried', { 0: ctx.db.guild.prefix })
    const couple = await ctx.client.database.users.getOrCreate(author.marryWith)
    if (author.yens < Number(300)) return ctx.replyT('error', 'commands:divorce.youNeedToDivorce', { 0: Number(300 - author.yens).toLocaleString() })
    if (couple.yens < Number(300)) return ctx.replyT('error', 'commands:divorce.theyNeedToDivorce', { 0: Number(300 - couple.yens).toLocaleString() })

    ctx.replyT('warn', 'commands:divorce.requestConfirm').then(async msg => {
      await msg.addReaction(Emoji.getEmoji('success').reaction)
      await msg.addReaction(Emoji.getEmoji('error').reaction)

      const collector = new ReactionCollector(msg, (_, emoji, userID) => ([Emoji.getEmoji('success').name, Emoji.getEmoji('error').name].includes(emoji.name)) && (userID === ctx.message.author.id))
      collector.on('collect', (_, emoji) => {
        switch (emoji.name) {
          case Emoji.getEmoji('success').name: {
            author.yens -= Number(300)
            author.isMarry = false
            author.marryWith = ''
            couple.yens -= Number(300)
            couple.isMarry = false
            couple.marryWith = ''
            author.save()
            couple.save()
            msg.delete()
            ctx.replyT('broken_heart', 'commands:divorce.successfullyDivorced')
          }
            break
          case Emoji.getEmoji('error').name: {
            msg.delete()
            ctx.replyT('heart', 'commands:divorce.rejectedRequest')
          }
        }
      })
    })
  }
}
