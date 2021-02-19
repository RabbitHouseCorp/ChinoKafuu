const Command = require("../../structures/command")
const moment = require("moment")
const { MessageEmbed } = require ("discord.js")
const DBL = require("dblapi.js")
module.exports = class DailyCommand extends Command {
	constructor(client) {
		super(client, {
			name: "daily",
			category: "economy",
			aliases: ["diarios"]
		})
	}
	async run({ message, args, server }, t) {
		let user = await this.client.database.Users.findById(message.author.id)
		const dbl = new DBL(this.client.config.dbltoken, this.client)
		if (!user || user === null) {
			new this.client.database.Users({
				_id: message.author.id
			}).save()
		}

		if (parseInt(user.timeDaily) < Date.now()) {

			let checkVote = await dbl.hasVoted(message.author.id)
			const embed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.setAuthor(t("commands:daily.almost-there"), message.author.displayAvatarURL({ format: "png", dynamic: true }))
			.setThumbnail("https://cdn.discordapp.com/attachments/484897060093689857/701374698390421534/685197956466344016.gif")
			.setDescription(t("commands:daily.description"))
			.addField(t("commands:daily.continue"), t("commands:daily.vote"))
			
			if (!checkVote) return message.channel.send(embed)

			let random = Math.floor(Math.random() * (1400 - 340 + 1)) + 340

			user.yens = user.yens + random
			user.timeDaily = 43200000 + Date.now()
			user.save()
			message.chinoReply("moneybag", t("commands:daily.daily-success", {
				total: Number(random).toLocaleString()
			}))


		} else {
			message.chinoReply("error", t("commands:daily.has-been-picked", {
				tempo: (parseInt(user.timeDaily - Date.now()) > 3600000) ? moment.utc(parseInt(user.timeDaily - Date.now())).format("hh:mm:ss") : moment.utc(parseInt(user.timeDaily - Date.now())).format("mm:ss")
			}))
		}
	}
}
