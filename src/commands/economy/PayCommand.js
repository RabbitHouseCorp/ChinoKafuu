const Command = require("../../structures/command")
module.exports = class PayCommand extends Command {
	constructor(client) {
		super(client, {
			name: "pay",
			category: "economy",
			aliases: ["pagar", "doar"],
			ClientPermission: ["ADD_REACTIONS"]
		})
	}
	async run({ message, args, server }, t) {
		let user = await this.client.database.Users.findById(message.author.id)
		if (!user || user === null) {
			new this.client.database.Users({
				_id: message.author.id
			}).save()
		}

		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		if (member.id === message.author.id) return message.chinoReply("error", t("commands:pay.this-author"))
		let value = args[1]
		if (!value) return message.chinoReply("error", t("commands:pay.value-null"))
		let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
		if (invalidValue) return message.chinoReply("error", t("commands:pay.invalid-value"))
		let donator = await this.client.database.Users.findById(message.author.id)
		if (donator.yens < value) return message.chinoReply("error", t("commands:pay.insufficient-value"))
		let membro = await this.client.database.Users.findById(member.id)
		if (membro.yens > 1000000000) return message.chinoReply("error", t("commands:pay.limit"))

		message.chinoReply("warn", t("commands:pay.confirm", { value: Number(value).toLocaleString(), member: member.toString() })).then(async msg => {
			await msg.react("success:577973168342302771")
			await msg.react("error:577973245391667200")

			const collector = msg.createReactionCollector((reaction, user) => (reaction.emoji.name === "success", "error") && (user.id !== this.client.user.id && user.id === message.author.id))
			collector.on("collect", r => {
				switch (r.emoji.name) {
					case "success": {
						donator.yens -= Number(value)
						membro.yens += Number(value)
						msg.delete()
						membro.save()
						donator.save()

						message.chinoReply("money_with_wings", t("commands:pay.success", { member: member.toString(), value: Number(value).toLocaleString() }))
					}
						break;
					case "error": {
						message.chinoReply("error", t("commands:pay.cancel", { value: Number(realValue[0]).toLocaleString() }))
						msg.delete()
					}
						break;
				}
			})
		})
	}
}
