const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const request = require("request")
const moment = require("moment")
require("moment-duration-format")
module.exports = class McQueryCommand extends Command {
	constructor(client) {
		super(client, {
			name: "mcquery",
			category: "minecraft",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false,
			hidden: false,
		})
	} 
	run({message, args, server}, t) {
        
		const url = `http://mcapi.us/server/status?ip=${args[0]}`
		request(url, function (err, response, body) {
			if (err) return message.chinoReply("error", t("commands:mcquery.error", {err: err}))
			body = JSON.parse(body)
			if (body.online) {
				const embed = new MessageEmbed()
					.setColor("#00d600")
					.addField(t("commands:mcquery.serverIP"), args[0], true)
					.addField("Players online", `${body.players.now}/${body.players.max} players`, true)
					.addField(t("commands:mcquery.version"), body.server.name, true)
					.addField(t("commands:mcquery.uptime"), moment.duration(body.duration).format("dd [days] hh [hours] mm [min] ss [secs]"), true)
					.addBlankField(true)
					.addField("Motd", body.motd)

				message.channel.send(embed)
			} else {
				message.chinoReply("error", t("commands:mcquery.offline"))
			}
		})
	}
}