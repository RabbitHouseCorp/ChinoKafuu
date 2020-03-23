const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
module.exports = class RoleinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: "roleinfo",
			category: "util",
			aliases: ["cargoinfo", "rinfo"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {
		moment.locale(server.lang)
		let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.includes(args.join(" "))) || message.guild.roles.cache.find(r => r.name === args.join(" "))
		if (!role) return message.chinoReply("error", t("commands:roleinfo.args-null"))

		let embed = new MessageEmbed()
			.setColor(role.hexColor)
			.setTitle(t("commands:roleinfo.title", { roleName: role.name }))
			.addField(t("commands:roleinfo.mention"), `\`${role}\``, true)
			.addField(t("commands:roleinfo.id"), role.id, true)
			.addField(t("commands:roleinfo.color"), role.hexColor, true)
			.addField(t("commands:roleinfo.members"), role.members.size, true)
			.addField(t("commands:roleinfo.guild"), role.guild.name, true)
			.addField(t("commands:roleinfo.hoist"), `${role.hoist}`.replace("true", t("commands:roleinfo.true")).replace("false", t("commands:roleinfo.false")), true)
			.addField(t("commands:roleinfo.mentionable"), `${role.mentionable}`.replace("true", t("commands:roleinfo.true")).replace("false", t("commands:roleinfo.false")), true)
			.addField(t("commands:roleinfo.hisBot"), `${role.managed}`.replace("true", t("commands:roleinfo.true")).replace("false", t("commands:roleinfo.false")), true)
			.addField(t("commands:roleinfo.created-at"), moment.utc(role.createdAt).format("LLLL"), true)

		message.channel.send(embed)
	}
}