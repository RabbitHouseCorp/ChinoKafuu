const Command = require("../../structures/command")
module.exports = class CreateinviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: "createinvite",
			category: "developers",
			aliases: ["criarconvite"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: true
		})
	}
	async run({ message, args, server }, t) {

		const guild = args.join(" ")
		if (!guild) return message.channel.send("error", "informe o ID ou nome do servidor que você deseja pegar o convite.")
		let guilds = this.client.guilds.cache.get(args[0]) || this.client.guilds.find(g => g.name === guild)
		if (!guilds) return message.chinoReply("error", "eu não estou neste servidor.")
		if (!guilds.me.hasPermission("CREATE_INSTANT_INVITE")) return message.chinoReply("error", "eu não tenho permissão para criar convites neste servidor.")
		let invite = await this.client.guilds.cache.get(guilds.id).channels.random().createInvite()

		message.chinoReply("chino_peek", `aqui está o convite: ${invite}`)
	}
}