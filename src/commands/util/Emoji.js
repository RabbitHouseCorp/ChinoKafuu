const Command = require("../../structures/command")
const Discord = require("discord.js")
module.exports = class EmojiCommand extends Command {
	constructor(client) {
		super(client, {
			name: "emoji",
			category: "util",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		if (!args[0]) return message.chinoReply("error", t("commands:emoji.args-null"))
		let emoji = message.guild.emojis.cache.find(e => e.name === args.join(" ")) || message.guild.emojis.cache.get(args[0])|| Discord.Util.parseEmoji(args[0])
		if (!emoji) return message.chinoReply("error", t("commands:emoji.emoji-not-found"))
		if (!emoji.animated) {
			message.channel.send({ files: [`https://cdn.discordapp.com/emojis/${emoji.id}.png`] })
		} else {
			message.channel.send({ files: [`https://cdn.discordapp.com/emojis/${emoji.id}.gif`] })
		}
	}
}       
