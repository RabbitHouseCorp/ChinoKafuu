const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ReportCommand extends Command {
	constructor(client) {
		super(client, {
			name: "report",
			category: "util",
			aliases: ["reportar"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {


		if (server.reportModule === false) return message.chinoReply("error", t("commands:report.disable"))
		const member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		const reason = args.slice(1).join(" ")
		if (!reason) return message.chinoReply("error", t("commands:report.reasonNull"))
		const channel = message.guild.channels.cache.get(server.channelReport)
		if (!channel) {
			server.channelReport = ""
			server.reportModule = false
			server.save()
			message.chinoReply("error", t("comands:report.channel-null"))
			return
		}

		const embed = new MessageEmbed()
			.setColor(this.client.colors.moderation)
			.setThumbnail(member.avatar)
			.addField(t("commands:report.memberName"), member.tag, true)
			.addField(t("commands:report.memberID"), member.id, true)
			.addField(t("commands:report.authorName"), message.author.tag, true)
			.addField(t("commands:report.authorID"), message.author.id, true)
			.addField(t("commands:report.channel"), message.channel, true)
			.addField(t("commands:report.reason"), reason, true)

		channel.send(embed)
		message.chinoReply("success", t("commands:report.success"))

	}
}