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
		let role = message.guild.roles.find(r => r.name === "Silenciado")
		if (!role) {
			role = await message.guild.roles.create({
				data: {
					name: "Silenciado",
					color: "#000000",
					permissions: []
				}
			})
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions({
					permissionOverwrites: [
						{
							id: role.id,
							deny: ["SEND_MESSAGES", "ADD_REACTIONS", "SPEAK", "CONNECT"]
						}
					]
				})
			})
		}
		if (message.member.roles.highest.position <= message.guild.member(member).roles.highest.position) return message.chinoReply("error", t("commands:punishment.unpunished"))

		let embed = new MessageEmbed()
			.setTitle(t("commands:tempmute.title", { member: member.tag }))
			.setColor(this.client.colors.moderation)
			.setThumbnail(member.avatar.startsWith("a_") ? member.displayAvatarURL({ format: "gif" }) : member.displayAvatarURL({ format: "webp" }))
			.addField(t("commands:punishment.embed.memberName"), member.tag, true)
			.addField(t("commands:punishment.embed.memberID"), member.id, true)
			.addField(t("commands:punishment.embed.staffName"), message.author.tag, true)
			.addField(t("commands:punishment.embed.reason"), reason, true)

		message.guild.member(member).roles.add(role.id).then(() => {
			message.channel.send(embed)
			if (server.punishModule) {
				message.guild.channels.cache.get(server.punishChannel).send(embed).catch(err => {
					message.channel.send(t("events:channel-not-found"))
				})
			}
		})
		setTimeout(function () {
			message.guild.member(member).roles.remove(role.id)
		}, parse(time))
	}
}