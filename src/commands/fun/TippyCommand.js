const Command = require("../../structures/command")
module.exports = class PatCommand extends Command {
	constructor(client) {
		super(client, {
			name: "tippy",
			category: "fun",
			aliases: ["piadas"],
			UserPermission: null,
			ClientPermission: ["MANAGE_WEBHOOK"],
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {

		let tippy = this.client.apis.piadas
		let piada = tippy[Math.floor(Math.random() * tippy.length)]
		let webhook = await message.channel.createWebhook("Tippy", { avatar: "https://cdn.discordapp.com/attachments/468878707449397258/753395078202130602/209374d243fd45aaddf68b8f5ceb2ce6qfdbg9ohK8LFt8NR-0.png" })
		webhook.send(piada).then(() => {
			webhook.delete()
		})
	}
}