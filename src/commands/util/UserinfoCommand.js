const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
module.exports = class UserinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: "userinfo",
			category: "util",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS", "ADD_REACTIONS"],
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {
		
		moment.locale(server.lang)

		let member
		if (args[0]) {
			member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
		} else {
			member = message.author
		}
		let status = `${member.presence.status}`.replace("dnd", t("commands:userinfo.statusDnd", { emoji: this.client.emotes.dnd })).replace("idle", t("commands:userinfo.statusIdle", { emoji: this.client.emotes.idle })).replace("offline", t("commands:userinfo.statusOffline", { emoji: this.client.emotes.offline })).replace("online", t("commands:userinfo.statusOnline", { emoji: this.client.emotes.online }))
		let format = member.avatar.startsWith("a_") ? "gif" : "webp"
		let role = message.guild.member(member) ? message.guild.member(member)._roles.map(r => message.guild.roles.cache.get(r).name).join(", ") : t("commands:userinfo.no-guild")
		let roleSize = message.guild.member(member) ? message.guild.member(member)._roles.length : "0"
		let color = message.guild.member(member) ? message.guild.member(member).displayHexColor : "#000000"
		const embed = new MessageEmbed()
			.setColor(color)
			.setThumbnail(member.displayAvatarURL({ format }))
			.setDescription(t("commands:userinfo.title", { isBot: member.bot ? "<:botTag:579456048142876672>" : "<:Wumpus:579455982053097485>", member: member.tag }), member.displayAvatarURL({ format }))
			.addField(t("commands:userinfo.name"), member.tag, true)
			.addField(t("commands:userinfo.id"), member.id, true)
			.addField(t("commands:userinfo.high"), message.guild.member(member) ? message.guild.member(member).roles.highest : t("commands:userinfo.no-guild"), true)
			.addField(t("commands:userinfo.status"), status, true)
			.addField(t("commands:userinfo.joinedAt"), message.guild.member(member) ? moment.utc(message.guild.member(member).joinedAt).format("LLLL") : t("commands:userinfo.no-guild"), true)
			.addField(t("commands:userinfo.created-at"), moment.utc(member.createdAt).format("LLLL"), true)

		const page2 = new MessageEmbed()
			.setColor(color)
			.setThumbnail(member.displayAvatarURL({ format }))
			.setDescription(t("commands:userinfo.title", { isBot: member.bot ? "<:botTag:579456048142876672>" : "<:Wumpus:579455982053097485>", member: member.tag }), member.displayAvatarURL({ format }))
			.addField(t("commands:userinfo.permissions"), message.guild.member(member) ? `\`${message.guild.member(member).permissions.toArray().join(", ")}\`` : t("commands:userinfo.no-guild"))
			.addField(t("commands:userinfo.roles", { roles: roleSize }), `\`${role}\``.replace("@everyone, ", ""), true)

		message.channel.send(embed).then(msg => {
			setTimeout(function () {
				msg.react("⬅")
			}, 500)
			setTimeout(function () {
				msg.react("➡")
			}, 1000)
			const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "⬅", "➡") && (u.id !== this.client.user.id && u.id === message.author.id))
			collector.on("collect", r => {
				r.users.remove(message.author.id)
				switch (r.emoji.name) {
					case "⬅":
						msg.edit(embed)
						break
					case "➡":
						msg.edit(page2)
				}
			})
		})
	}
}
