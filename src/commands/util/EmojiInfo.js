const Command = require("../../structures/command")
const { MessageEmbed, Util } = require("discord.js")
const moment = require("moment")
module.exports = class EmojiinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: "emojiinfo",
			category: "util",
			aliases: ["emoji-info"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		moment.locale(server.lang)

		if (!args[0]) return message.chinoReply("error", t("commands:emoji.args-null"))
		let emoji = message.guild.emojis.cache.get(args[0]) || Util.parseEmoji(args[0])
		emoji = message.guild.emojis.cache.get(emoji.id)
		if (!emoji) return message.chinoReply("error", t("commands:emoji.emoji-not-found"))
		let animated
		if (emoji.animated) animated = t("commands:emojiinfo.animated")
		if (!emoji.animated) animated = t("commands:emojiinfo.noanimated")

		let embed = new MessageEmbed()
		embed.setColor(this.client.colors.default)
		embed.setThumbnail(emoji.url)
		embed.addField(t("commands:emojiinfo.name"), `\`${emoji.name} \``, true)
		embed.addField(t("commands:emojiinfo.id"), `\`${emoji.id}\``, true)
		embed.addField(t("commands:emojiinfo.created-at"), moment.utc(emoji.createdAt).format("LLLL"), true)
		embed.addField(t("commands:emojiinfo.hisAnimated"), animated, true)
		embed.addField(t("commands:emojiinfo.mention"), `\`${emoji}\``, true)
		embed.addField("Download", emoji.url, true)

		message.channel.send(embed)

	}
}