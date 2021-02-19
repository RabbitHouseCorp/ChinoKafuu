const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class UnbanCommand extends Command {
	constructor(client) {
		super(client, {
			name: "unban",
			category: "mod",
			aliases: ["desbanir"],
			UserPermission: ["BAN_MEMBERS"],
			ClientPermission: ["BAN_MEMBERS", "EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {

		if (!args[0]) return message.chinoReply("error", t("commands:mention-null"))
		let member = await message.guild.fetchBans()
		let ban
		ban = member.find(b => b.user.username === args[0]) || member.get(args[0].replace(/[!@<>]/g, "")) || member.find(b => b.user.tag === args[0])
		if (!ban) return message.chinoReply("error", t("commands:unban.not-found"))
		let reason = args.slice(1).join(" ")
		if (!reason) {
			reason = t("commands:no-reason")
		}

		message.guild.members.unban(ban.user.id).then((user) => {
			let avatar = user.displayAvatarURL({ format: "png", dynamic: true })

			const embed = new MessageEmbed()
				.setTitle(t("commands:unban.title", { member: user.tag }))
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
	}
}
