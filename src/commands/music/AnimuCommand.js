const Command = require("../../structures/command")
const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")
module.exports = class AnimuCommand extends Command {
	constructor(client) {
		super(client, {
			name: "animu",
			aliases: ["moeanimu"],
			category: "music",
			ClientPermission: ["CONNECT", "SPEAK", "EMBED_LINKS"]
		})
	}

	async run({ message, args, server }, t) {
		if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		const argsNullEmbed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.setTitle("Animu command info")
			.addField(`${server.prefix}animu join`, `**Usage:** ${server.prefix}animu join\n**Aliases:** \`${server.prefix}animu entrar, ${server.prefix}animu tocar, ${server.prefix}animu play\``)
			.addField(`${server.prefix}animu join`, `**Usage:** ${server.prefix}animu nowplaying\n**Aliases:** \`${server.prefix}animu np, ${server.prefix}animu tocando\``)
			.addField(`${server.prefix}animu join`, `**Usage:** ${server.prefix}animu volume\n**Aliases:** \`${server.prefix}animu vol\``)
			.addField(`${server.prefix}animu join`, `**Usage:** ${server.prefix}animu leave\n**Aliases:** \`${server.prefix}animu sair, ${server.prefix}animu parar, ${server.prefix}animu stop\``)

		if (!args[0]) return message.channel.send(argsNullEmbed)
		let info = fetch("http://cast.animu.com.br:2199/rpc/animufm/streaminfo.get")
		let infoJson = info.then(res => res.json())
		if (["join", "entrar", "tocar", "play"].includes(args[0])) {
			message.member.voice.channel.join().then(connection => {
				this.client.user.setPresence({ activity: { name: "Animu FM Radio Station - The Most Moe Radio of Brazil!", type: "LISTENING" } })
				connection.play("http://cast.animu.com.br:9021/stream", { volume: 0.5 })
				infoJson.then(infoData => {
					let moreInfo = infoData.data[0]
					let volume = message.guild.voice.connection ? message.guild.voice.connection.player.dispatcher.volume * 100 : "0"
					const embed = new MessageEmbed()
						.setColor(this.client.colors.default)
						.setAuthor(moreInfo.title, message.guild.iconURL({ format: "png", dynamic: true }))
						.setDescription(`**${t("commands:animu.np")}:** \`${moreInfo.song}\`\n**${t("commands:animu.total-listening")}:** \`${moreInfo.listenertotal}\`\n**${t("commands:animu.artist")}:** \`${moreInfo.track.artist}\`\n**${t("commands:animu.volume")}**: \`${volume}\``)

					message.channel.send(embed)
				}).catch(console.log)
			})
		}

		if (["tocando", "np", "nowplaying"].includes(args[0])) {
			infoJson.then(infoData => {
				let moreInfo = infoData.data[0]
				let volume = message.guild.voice.connection ? message.guild.voice.connection.player.dispatcher.volume * 100 : "0"
				const embed = new MessageEmbed()
					.setColor(this.client.colors.default)
					.setAuthor(moreInfo.title, message.guild.iconURL({ format: "png", dynamic: true }))
					.setThumbnail(`https://cdn.statically.io/img/${moreInfo.track.imageurl.replace("https://", "")}?w=500&quality=100`)
					.setDescription(`**${t("commands:animu.np")}:** \`${moreInfo.song}\`\n**${t("commands:animu.total-listening")}:** \`${moreInfo.listenertotal}\`\n**${t("commands:animu.artist")}:** \`${moreInfo.track.artist}\`\n**${t("commands:animu.volume")}**: \`${volume}\``)

				message.channel.send(embed)
			}).catch(console.log)
		}

		if (["volume", "vol"].includes(args[0])) {
			if (!message.guild.voice.connection) return message.chinoReply("error", t("commands:dj-module.another-channel"))
			if (!args[1]) return message.chinoReply("chino_peek", t("commands:volume.hisVol", { volume: message.guild.voice.connection.player.dispatcher.volume * 100 }))
			if (parseInt(args[1]) > 100) return message.chinoReply("error", tt("commands:volume.maxVolume"))
			message.guild.voice.connection.player.dispatcher.setVolume((parseInt(args[1]) / 100))
			message.chinoReply("cocoa_smile", t("commands:volume.volume", { volume: parseInt(args[1]) }))
		}

		if (["leave", "sair", "parar", "stop"].includes(args[0])) {
			message.guild.me.voice.channel.leave()
			message.chinoReply("chino_kek", t("commands:leave"))
		}
	}
}
