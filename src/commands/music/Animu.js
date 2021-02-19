const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const axios = require('axios')
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
		const res = await axios.get("https://cast.animu.com.br:8021/status.json")
		if (["join", "entrar", "tocar", "play"].includes(args[0])) {
			if (this.client.player.has(message.guild.id)) return message.chinoReply('error', 'I already playing the radio.')
			const song = await this.client.lavalink.join(message.member.voice.channel.id)
			song.playAnimu()
			this.client.player.set(message.guild.id, song)
			song.on("playNow", (track) => {
				const volume = `${this.client.player.get(message.guild.id).player.state.volume}/100`
				const embed = new MessageEmbed()
					.setColor(this.client.colors.default)
					.setAuthor(res.data.server_name, message.guild.iconURL({ format: "png", dynamic: true }))
					.setDescription(`**${t("commands:animu.np")}:** \`${res.data.rawtitle}\`\n**${t("commands:animu.total-listening")}:** \`${res.data.listeners}\`\n**${t("commands:animu.artist")}:** \`${res.data.track.artist}\`\n**${t("commands:animu.volume")}**: \`${volume}\``)

				message.channel.send(embed)
			})
			
			song.on('playEnd', async () => {
				await this.client.lavalink.manager.leave(message.guild.id)
				this.client.lavalink.manager.players.delete(message.guild.id)
				this.client.player.delete(message.guild.id)
			})
		}

		if (["tocando", "np", "nowplaying"].includes(args[0])) {
			const volume = `${this.client.player.get(message.guild.id).player.state.volume}/100`
			const embed = new MessageEmbed()
				.setColor(this.client.colors.default)
				.setAuthor(res.data.server_name, message.guild.iconURL({ format: "png", dynamic: true }))
				.setThumbnail(`https://cdn.statically.io/img/${res.data.track.cover.replace("https://", "")}?w=500&quality=100`)
				.setDescription(`**${t("commands:animu.np")}:** \`${res.data.rawtitle}\`\n**${t("commands:animu.total-listening")}:** \`${res.data.listeners}\`\n**${t("commands:animu.artist")}:** \`${res.data.track.artist}\`\n**${t("commands:animu.volume")}**: \`${volume}\``)

			message.channel.send(embed)
		}

		if (["volume", "vol"].includes(args[0])) {
			if (!message.member.voice.channel && !message.member.voice.channel.id !== server.animuChannel) return message.chinoReply("error", t("commands:dj-module.another-channel"))
			if (!args[1]) return message.chinoReply("chino_peek", t("commands:volume.hisVol", { volume: message.guild.voice.connection.player.dispatcher.volume * 100 }))
			if (parseInt(args[1]) > 100) return message.chinoReply("error", tt("commands:volume.maxVolume"))
			this.client.player.get(message.guild.id).setVolume(args[1])
			message.chinoReply("cocoa_smile", t("commands:volume.volume", { volume: parseInt(args[1]) }))
		}

		if (["leave", "sair", "parar", "stop"].includes(args[0])) {
			await this.client.lavalink.manager.leave(message.guild.id)
			this.client.lavalink.manager.players.delete(message.guild.id)
			this.client.player.delete(message.guild.id)
			message.chinoReply("chino_kek", t("commands:leave"))
		}
	}
}
