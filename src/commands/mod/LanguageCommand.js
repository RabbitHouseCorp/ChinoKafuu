const { Command, EmbedBuilder, ReactionCollector, Emoji } = require('../../utils')
module.exports = class LanguageCommand extends Command {
	constructor() {
		super({
			name: 'language',
			aliases: ['lang', 'idioma'],
			permissions: [{
				entity: 'user',
				permissions: ['manageGuild']
			}, {
				entity: 'bot',
				permissions: ['embedLinks', 'addReactions']
			}]
		})
	}

	async run(ctx) {
		const embed = new EmbedBuilder()
		embed.setColor('DEFAULT')
		embed.setAuthor(ctx._locale('commands:language.message'), ctx.message.author.avatarURL)
		embed.setDescription('🇧🇷 **Português, Brasil**\n🇵🇹 **Português, Portugal**\n🇺🇸 **English, US**\n🇪🇸 **Espanõl**\n🇯🇵 **日本語**')
		embed.addField(ctx._locale('commands:language.helpUs'), ctx._locale('commands:language.explaining'))

		ctx.send(embed.build()).then(async message => {
			await message.addReaction(Emoji.getEmojiReaction('brazil').mention)
			await message.addReaction(Emoji.getEmojiReaction('portugal').mention)
			await message.addReaction(Emoji.getEmojiReaction('usa').mention)
			await message.addReaction(Emoji.getEmojiReaction('es').mention)
			await message.addReaction(Emoji.getEmojiReaction('ja').mention)

			const filter = (_, emoji, userID) => ([Emoji.getEmojiReaction('brazil').name, Emoji.getEmojiReaction('portugal').name, Emoji.getEmojiReaction('usa').name, Emoji.getEmojiReaction('es').name, Emoji.getEmojiReaction('ja').name].includes(emoji.name)) && userID === ctx.message.author.id
			const collector = new ReactionCollector(message, filter, { max: 1 })
			collector.on('collect', async (_, emoji) => {
				switch (emoji.name) {
					case '🇧🇷': {
						ctx.db.guild.lang = 'pt-BR'
						ctx.db.guild.save().then(() => {
							message.delete()
							ctx.reply('success', 'agora eu irei falar em `Português, Brasil`.')
						})
					}
						break;
					case '🇵🇹': {
						ctx.db.guild.lang = 'pt-PT'
						ctx.db.guild.save().then(() => {
							message.delete()
							ctx.reply('success', 'agora eu irei falar em `Português, Portugal`.')
						})
					}
						break;
					case '🇺🇸': {
						ctx.db.guild.lang = 'en-US'
						ctx.db.guild.save().then(() => {
							message.delete()
							ctx.reply('success', 'now I\'ll speak `English, US`.')
						})
					}
						break;
					case '🇪🇸': {
						ctx.db.guild.lang = 'es-ES'
						ctx.db.guild.save().then(() => {
							message.delete()
							ctx.reply('success', 'ahora hablaré en `Espanõl`.')
						})
					}
						break;
					case '🇯🇵': {
						ctx.db.guild.lang = 'ja-JP'
						ctx.db.guild.save().then(() => {
							message.delete()
							ctx.reply('success', '今、私は`日本語`で話します')
						})
					}
						break;
				}
			})
		})
	}
}
