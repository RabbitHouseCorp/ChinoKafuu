const { Command, EmbedBuilder, ReactionCollector, Emoji } = require('../../utils')

module.exports = class AnnounceCommand extends Command {
	constructor() {
		super({
			name: 'announce',
			aliases: ['anunciar'],
			arguments: 1,
			permissions: [{
				entity: 'bot',
				permissions: ['mentionEveryone', 'embedLinks', 'addReactions']
			},
			{
				entity: 'user',
				permissions: ['manageGuild', 'mentionEveryone']
			}]
		})
	}

	async run(ctx) {
		const guild = ctx.message.channel.guild
		const channel = guild.channels.get(ctx.args[0]?.replace(/[<#>]/g, ''))
		if (!channel) return ctx.replyT('error', 'commands:announce.channelNotFound')
		const announce = ctx.args.slice(1).join(' ')
		if (!announce) return ctx.replyT('error', 'commands:announce.argsNotFound')
		const embed = new EmbedBuilder()
		embed.setColor('DEFAULT')
		embed.setAuthor(guild.name, guild.dynamicIconURL())
		embed.setDescription(announce)
		embed.setFooter(ctx._locale('commands:announce.embedSendBy', { 0: `${ctx.message.author.username}#${ctx.message.author.discriminator}` }), ctx.message.author.dynamicAvatarURL())

		ctx.replyT('warn', 'commands:announce.requestConfirm', {
			0: channel.mention,
			1: Emoji.getEmoji('success'),
			2: Emoji.getEmoji('warn'),
			3: Emoji.getEmoji('error')
		}).then(async msg => {
			await msg.addReaction(Emoji.getEmojiReaction('success').mention)
			await msg.addReaction(Emoji.getEmojiReaction('warn').mention)
			await msg.addReaction(Emoji.getEmojiReaction('error').mention)

			const filter = (_, emoji, userID) => (['gochiusa_success', 'warn', 'gochiusa_error'].includes(emoji.name)) && userID === ctx.message.author.id
			const collector = new ReactionCollector(msg, filter, { max: 1 })
			collector.on('collect', async (_, emoji) => {
				switch (emoji.name) {
					case 'gochiusa_success': {
						msg.delete()
						ctx.replyT('success', 'commands:announce.announceSent')
						channel.createMessage(embed.build('@everyone'))
					}
						break;
					case 'warn': {
						msg.delete()
						ctx.replyT('success', 'commands:announce.announceSent')
						channel.createMessage(embed.build('@here'))
					}
						break;
					case 'gochiusa_error': {
						msg.delete()
						ctx.replyT('success', 'commands:announce.announceSent')
						channel.createMessage(embed.build())
					}
						break;
				}
			})
		})
	}
}