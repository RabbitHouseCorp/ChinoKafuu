const Command = require("../../structures/command")
module.exports = class LanguageCommand extends Command {
	constructor(client) {
		super(client, {
			name: "language",
			category: "mod",
			aliases: ["linguagem", "lang"],
			UserPermission: ["MANAGE_GUILD"],
			ClientPermission: ["EMBED_LINKS", "ADD_REACTIONS"],
			OnlyDevs: false
		})
	} 
	run({message, args, server}, t) {

		message.reply(t("commands:language.howLanguage")).then(msg => {
			setTimeout(function() {
				msg.react("🇧🇷")
			}, 500)
			setTimeout(function() {
				msg.react("🇺🇸")
			}, 1000)
			setTimeout(function() {
				msg.react("🇵🇹")
			}, 1500)
			/*            setTimeout(function() {
                msg.react("🇪🇸")
            }, 2000)*/
            
			const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "🇧🇷", "🇺🇸") && (u.id !== this.client.user.id && u.id === message.author.id))
			collector.on("collect", r => {
				switch (r.emoji.name) {
				case "🇧🇷":
					server.lang = "pt-BR"
					server.save()
					msg.delete()
					message.chinoReply("map", "agora eu irei falar `pt-BR`")
					break
				case "🇺🇸":
					server.lang = "en-US"
					server.save()
					msg.delete()
					message.chinoReply("map", "now I'll talk to `en-US`")
					break
				case "🇵🇹":
					server.lang = "pt-PT"
					server.save()
					msg.delete()
					message.chinoReply("map", "agora eu irei falar `pt-PT`")
//                      break
/*                    case '🇪🇸':
                        server.lang = "es"
                        server.save()
                        msg.delete()
                        message.chinoReply("map", "ahora hablaré `es`")*/
				}
})		})
        
	}
}