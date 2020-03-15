const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super(client, {
			name: "avatar",
			category: "misc",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		let member = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author
		let avatar
		if (member.avatar) {
			if (!member.avatar.startsWith("a_")) {
				avatar = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`
			} else {
				avatar = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.gif?size=2048`
			}
		} else {
			avatar = member.displayAvatarURL()
		}

		const embed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.setImage(avatar)
			.setTimestamp()
			.setFooter(t("commands:avatar.his-avatar", { member: member.tag }), avatar)
			.setDescription(t("commands:avatar.download", { avatar: avatar }))

		message.channel.send(embed)

	}
}
