const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")

module.exports = class SoftBanCommand extends Command {
	constructor(client) {
		super(client, {
			name: "softban",
			aliases: ["softbanir"],
			category: "mod",
			UserPermission: ["BAN_MEMBERS"],
			ClientPermission: ["BAN_MEMBERS"]
		})
	}

	async run({ message, args, server }, t) {
		if (!args[0]) return message.chinoReply("error", t("commands:mention-null"))
		const member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
		if (!member) return message.chinoReply("error", t("commands:user-not-found"))
		let inGuild
		inGuild = message.guild.members.cache.get(member.id)
		if (!inGuild) {
			inGuild = member
		}
		let reason = args.slice(1).join(" ")
		if (!reason) {
			reason = t("commands:no-reason")
		}

		if (inGuild.id === message.author.id) return message.chinoReply("error", t("commands:ban.banAuthor"))
		if (message.guild.members.cache.has(inGuild.id)) {
			if (message.member.roles.highest.position <= message.guild.members.cache.get(member.id).roles.highest.position) return message.chinoReply("error", t("commands:punishment.unpunished"))
			if (!inGuild.bannable) return message.chinoReply("error", t("commands:ban.bannable"))
		}

		message.guild.members.ban(inGuild.id, {
			days: 7,
			reason: `${t("commands:punishment.embed.staffName")}: ${message.author.tag} - ${t("commands:punishment.embed.reason")}: ${reason}`
		}).then((user) => {
			message.guild.members.unban(user.id).then(user => {
				let avatar = user.displayAvatarURL({ format: "png", dynamic: true })

				const embed = new MessageEmbed()
					.setTitle(t("commands:ban.softban", { member: user.tag }))
					.setColor(this.client.colors.moderation)
					.setThumbnail(avatar)
					.addField(t("commands:punishment.embed.memberName"), user.tag, true)
					.addField(t("commands:punishment.embed.memberID"), user.id, true)
					.addField(t("commands:punishment.embed.staffName"), message.author.tag, true)
					.addField(t("commands:punishment.embed.reason"), reason, true)

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
		})
	}
}