const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const { inspect } = require('util')
module.exports = class EvalCommand extends Command {
	constructor(client) {
		super(client, {
			name: "eval",
			category: "developers",
			aliases: ["e"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: true
		})
	}
	async run({ message, args, server }, t) {
		try {
			const util = require("util")
			let evaled = await eval(args.join(" "))
			evaled = util.inspect(evaled, { depth: 1 })
			evaled = evaled.replace(new RegExp(`${this.client.token}`, "g"), undefined)

			if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`
			message.channel.send(evaled, { code: "js" })
		} catch (err) {
			const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack
			const embed = new MessageEmbed()
			embed.setColor(this.client.colors.error)
			embed.setTitle(`${this.client.emotes.chino_suprised} ${t("events:error.title")}`)
			embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)
			embed.addField(`${this.client.emotes.cocoa_smile} ${t("events:error.report-issue")}`, t("events:error.server-support"))

			message.channel.send(embed)
		}
	}
}
