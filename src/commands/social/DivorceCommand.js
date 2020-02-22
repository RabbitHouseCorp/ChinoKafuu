const Command = require("../../structures/command")
module.exports = class DivorceCommand extends Command {
	constructor(client) {
		super(client, {
			name: "divorce",
			aliases: ["divorciar"],
			category: "social",
			ClientPermission: ["EMBED_LINKS", "ADD_REACTIONS"]
		})
	}

	async run({ message, args, server }, t) {
		let user = await this.client.database.Users.findById(message.author.id)
		let user2 = await this.client.database.Users.findById(user.marryWith)
		if (!user2 || !user.isMarry) return message.chinoReply("error", t("commands:divorce.no-marry", { prefix: server.prefix }))
		let member = this.client.users.cache.get(user2._id)
		if (user2.yens < Number(300)) return message.chinoReply("error", t("commands:divorce.user", { member: member.toString() }))
		if (user.yens < Number(300)) return message.chinoReply("error", t("commands:divorce.author"))


		message.reply(t("commands:divorce.confirm", { member: member.toString() })).then(msg => {
			setTimeout(() => msg.react("success:577973168342302771"), 500)
			setTimeout(() => msg.react("error:577973245391667200"), 1000)

			const collector = msg.createReactionCollector((reaction, users) => (reaction.emoji.name === "success", "error") && (users.id !== this.client.user.id && users.id === message.author.id))
			collector.on("collect", r => {
				switch (r.emoji.name) {
					case "success":
						user.isMarry = false
						user.marryWith = t("commands:with-nobody")
						user.yens -= Number(300)
						user.save()

						user2.isMarry = false
						user2.marryWith = t("commands:with-nobody")
						user2.yens -= Number(300)
						user2.save()
						msg.delete()
						message.chinoReply("broken_heart", t("commands:divorce.divorced"))
						break
					case "error":
						msg.delete()
						message.chinoReply("eyes_with_hearts", t("commands:divorce.no-divorce"))
				}
			})
		})
	}
}