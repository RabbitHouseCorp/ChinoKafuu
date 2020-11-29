const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const parse = require("parse-duration")
module.exports = class TempMuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: "tempmute",
			category: "mod",
			aliases: [],
			UserPermission: ["KICK_MEMBERS"],
			ClientPermission: ["MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {

		const member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let time = args[1]
		if (!time) return message.chinoReply("error", t("commands:tempmute.time"))
		let reason = args.slice(2).join(" ")
		if (!reason) {
			reason = t("commands:no-reason")
		}
		let role = message.guild.roles.cache.find(r => r.name === "Silenciado")
		if (!role) {
			role = await message.guild.roles.create({
				data: {
					name: "Silenciado",
					color: "#000000",
					permissions: []
				}
			})
			message.guild.channels.cache.forEach(async channel => {
				await channel.createOverwrite(role.id, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false,
					SPEAK: false,
					CONNECT: false
				})
			})
		}
		if (message.member.roles.highest.position <= message.guild.member.cache.get(member.id).roles.highest.position) return message.chinoReply("error", t("commands:punishment.unpunished"))

		let avatar = member.displayAvatarURL({ format: "png", dynamic: true })

		const embed = new MessageEmbed()
			.setTitle(t("commands:tempmute.title", { member: member.tag }))
			.setColor(this.client.colors.moderation)
			.setThumbnail(avatar)
			.addField(t("commands:punishment.embed.memberName"), member.tag, true)
			.addField(t("commands:punishment.embed.memberID"), member.id, true)
			.addField(t("commands:punishment.embed.staffName"), message.author.tag, true)
			.addField(t("commands:punishment.embed.reason"), reason, true)

		message.guild.member.cache.get(member.id).roles.add(role.id).then(() => {
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
		setTimeout(function () {
			message.guild.member.cache.get(member.id).roles.remove(role.id)
		}, parse(time))
	}
}
