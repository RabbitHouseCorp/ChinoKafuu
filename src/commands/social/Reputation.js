const Command = require("../../structures/command")
const moment = require("moment")
require("moment-duration-format")
module.exports = class ReputationCommand extends Command {
	constructor(client) {
		super(client, {
			name: "reputation",
			aliases: ["rep", "reputação", "reputacao"],
			category: "social"
		})
	}

	async run({ message, args, server }, t) {
		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		if (member.id === message.author.id) return message.chinoReply("error", t("commands:rep.no-is-yourself"))
		let author = await this.client.database.Users.findById(message.author.id)
		let user = await this.client.database.Users.findById(member.id)
		if (!user) {
			new this.client.database.Users({
				_id: member.id
			}).save()
		}
		let time = ((parseInt(author.repTime) - Date.now()) > 3600000) ? moment.utc(parseInt(author.repTime - Date.now())).format("hh:mm:ss") : moment.utc(parseInt(author.repTime - Date.now())).format("mm:ss")
		if (parseInt(author.repTime) < Date.now()) {

			user.rep = user.rep + 1
			author.repTime = 3600000 + Date.now()
			author.save()
			user.save()

			message.reply(t("commands:rep.success", { member: member.toString(), rep: user.rep }))
		} else {
			message.reply(t("commands:rep.timeout", { time: time }))
		}
	}
}