const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: "ban",
			category: "mod",
			aliases: ["banir"],
			UserPermission: ["BAN_MEMBERS"],
			ClientPermission: ["BAN_MEMBERS", "EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {

		if (!args[0]) return message.chinoReply("error", t("commands:mention-null"))
		const member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
		if (!member) return message.chinoReply("error", t("commands:user-not-found"))
		let inGuild
		inGuild = message.guild.members.get(member.id)
		if (!inGuild) {
			inGuild = member
		}
		let reason = args.slice(1).join(" ")
		if (!reason) {
			reason = t("commands:no-reason")
		}

		if (inGuild.id === message.author.id) return message.chinoReply("error", t("commands:ban.banAuthor"))
		if (message.guild.members.has(inGuild.id)) {
			if (message.member.roles.highest.position <= message.guild.member(member).roles.highest.position) return message.chinoReply("error", t("commands:punishment.unpunished"))
			if (!inGuild.bannable) return message.chinoReply("error", t("commands:ban.bannable"))
		}

		message.guild.members.ban(inGuild.id, {
			days: 7,
			reason: `${t("commands:punishment.embed.staffName")}: ${message.author.tag} - ${t("commands:punishment.embed.reason")}: ${reason}`
		}).then((user) => {
			const embed = new MessageEmbed()
				.setTitle(t("commands:ban.banned", { member: user.tag }))
				.setColor(this.client.colors.moderation)
				.setThumbnail(user.avatar.startsWith("a_") ? user.displayAvatarURL({ format: "gif" }) : user.displayAvatarURL({ format: "webp" }))
				.addField(t("commands:punishment.embed.memberName"), user.tag, true)
				.addField(t("commands:punishment.embed.memberID"), user.id, true)
				.addField(t("commands:punishment.embed.staffName"), message.author.tag, true)
				.addField(t("commands:punishment.embed.reason"), reason, true)

			message.channel.send(embed)

			if (server.punishModule) {
				message.guild.channels.cache.get(server.punishChannel).send(embed).catch(err => {
					message.channel.send(t("events:channel-not-found"))
				})
			}
		})
	}
}