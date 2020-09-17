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
		function valuePorcent(val, porcent) {
			porcent = parseFloat(val * (2 / 100))
			if (porcent > 25) porcent = 25
			return [val - ((val / 100) * porcent), porcent]
		}
		let realValue = valuePorcent(value, 2)

		message.chinoReply("warn", t("commands:pay.confirm", { value: Number(realValue[0]).toLocaleString(), member: member.toString(), porcent: realValue[1] })).then(msg => {
			msg.react("success:577973168342302771")
			setTimeout(() => msg.react("error:577973245391667200"), 1000)

			const collector = msg.createReactionCollector((reaction, user) => (reaction.emoji.name === "success", "error") && (user.id !== this.client.user.id && user.id === message.author.id))
			collector.on("collect", r => {
				switch (r.emoji.name) {
					case "success": {
						donator.yens = Number(value) - donator.yens
						membro.yens = membro.yens + Number(realValue[0])
						msg.delete()
						if (membro.yens > 1000000000) return message.chinoReply("error", t("commands:pay.limit"))
						membro.save()
						donator.save()

						message.chinoReply("money_with_wings", t("commands:pay.success", { member: member.toString(), value: Number(realValue[0]).toLocaleString() }))
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
