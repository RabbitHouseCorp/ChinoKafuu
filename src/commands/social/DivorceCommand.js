const { Command, ReactionCollector, Emoji } = require('../../utils')

module.exports = class DivorceCommand extends Command {
    constructor() {
        super({
            name: 'divorce',
            aliases: ['divorciar'],
            arguments: 0,
            permissions: [{
                entity: 'bot',
                permissions: ['addReactions']
            }]
        })
    }

    async run(ctx) {

        let author = ctx.db.user
        if (!author.isMarry) return ctx.replyT('error', 'commands:divorce.youAreNotMarried', { 0: ctx.db.guild.prefix })
        let couple = await ctx.client.database.users.getOrCreate(author.marryWith)
        if (author.yens < Number(300)) return ctx.replyT('error', 'commands:divorce.youNeedToDivorce', { 0: Number(300 - author.yens).toLocaleString() })
        if (couple.yens < Number(300)) return ctx.replyT('error', 'commands:divorce.theyNeedToDivorce', { 0: Number(300 - couple.yens).toLocaleString() })

        ctx.replyT('warn', 'commands:divorce.requestConfirm').then(async msg => {
            await msg.addReaction(Emoji.getEmojiReaction('success').mention)
            await msg.addReaction(Emoji.getEmojiReaction('error').mention)

            const collector = new ReactionCollector(msg, (_, emoji, userID) => ([Emoji.getEmojiReaction('success').name, Emoji.getEmojiReaction('error').name].includes(emoji.name)) && (userID === ctx.message.author.id))
            collector.on('collect', (_, emoji) => {
                switch (emoji.name) {
                    case Emoji.getEmojiReaction('success').name: {
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
                    case Emoji.getEmojiReaction('error').name: {
                        msg.delete()
                        ctx.replyT('heart', 'commands:divorce.rejectedRequest')
                    }
                }
            })
        })
    }
}