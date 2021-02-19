const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class KickCommand extends Command {
	constructor(client) {
		super(client, {
			name: "kick",
			category: "mod",
			aliases: ["expulsar"],
			UserPermission: ["KICK_MEMBERS", "MUTE_MEMBERS"],
			ClientPermission: ["KICK_MEMBERS", "MUTE_MEMBERS", "MANAGE_ROLES", "EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let reason = args.slice(1).join(" ")
		if (!reason) {
			reason = t("commands:no-reason")
		}

		if (member.id === message.author.id) return message.chinoReply("error", t("commands:kick.authorKick"))
		if (!message.guild.members.cache.get(member.id).kickable) return message.chinoReply("error", t("commands:kick.kickable"))
		if (message.member.roles.highest.position < message.guild.members.cache.get(member.id).roles.highest.position) return message.chinoReply("error", t("commands:punishment.unpunished"))

		let avatar = member.displayAvatarURL({ format: "png", dynamic: true })

		const embed = new MessageEmbed()
			.setTitle(t("commands:kick.kicked", { member: member.tag }))
			.setColor(this.client.colors.moderation)
			.setThumbnail(avatar)
			.addField(t("commands:punishment.embed.memberName"), member.tag, true)
			.addField(t("commands:punishment.embed.memberID"), member.id, true)
			.addField(t("commands:punishment.embed.staffName"), message.author.tag, true)
			.addField(t("commands:punishment.embed.reason"), reason, true)

		message.guild.members.cache.get(member.id).kick(
			`${t("commands:punishment.embed.staffName")}: ${message.author.tag} - ${t("commands:punishment.embed.reason")}: ${reason}`
		).then(() => {
			message.channel.send(embed)
			if (server.punishModule) {
				const punishChannel = message.guild.channels.cache.get(server.punishChannel)
				if (!punishChannel) {
					server.punishModule = false
					server.punishChannel = ''
					server.save().then(() => {
						message.chinoReply('error', t("events:channel-not-found"))
					})
				}
				if (!punishChannel.permissionsFor(this.client.user).has('SEND_MESSAGES')) return message.chinoReply('error', t("permissions:CLIENT_MISSING_PERMISSION", { perm: t('permissions:SEND_MESSAGES') }))
				punishChannel.send(embed)
			}
		})
	}
}
