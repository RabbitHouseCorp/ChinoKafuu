const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class Unmute extends Command {
	constructor(client) {
		super(client, {
			name: "unmute",
			category: "mod",
			aliases: ["desmutar"],
			UserPermission: ["KICK_MEMBERS"],
			ClientPermission: ["MANAGE_ROLES", "EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		const member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let role = message.guild.roles.cache.find(r => r.name === "Silenciado")
		if (!message.guild.member(member).roles.cache.find(r => r.name === "Silenciado")) return message.channel.send("error", t("commands:unmute.noMuted"))
		let reason = args.slice(1).join(" ")
		if (!reason) {
			reason = t("commands:no-reason")
		}

		if (message.member.roles.highest.position < message.guild.member(member).roles.highest.position) return message.chinoReply("error", t("commands:punishment.unpunished"))

		let embed = new MessageEmbed()
			.setTitle(t("commands:unmute.title", { member: member.tag }))
			.setColor(this.client.colors.moderation)
			.setThumbnail(member.avatar.startsWith("a_") ? member.displayAvatarURL({ format: "gif" }) : member.displayAvatarURL({ format: "webp" }))
			.addField(t("commands:punishment.embed.memberName"), member.tag, true)
			.addField(t("commands:punishment.embed.memberID"), member.id, true)
			.addField(t("commands:punishment.embed.staffName"), message.author.tag, true)
			.addField(t("commands:punishment.embed.reason"), reason, true)

		message.guild.member(member).remove(role.id).then(() => {
			message.channel.send(embed)
			if (server.punishModule) {
				message.guild.channels.cache.get(server.punishChannel).send(embed)
			}
		})
	}
}