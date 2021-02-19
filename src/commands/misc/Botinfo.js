const Command = require("../../structures/command")
const { version, MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
let os = require("os")
let cpuStat = require("cpu-stat")

module.exports = class BotinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: "botinfo",
			category: "misc",
			aliases: [],
			ClientPermission: ["EMBED_LINKS", "ADD_REACTIONS"]
		})
	}
	async run({ message, args, server }, t) {
		let guilds = await this.client.shardManager.getAllSizeObject("guilds")
		let users = await this.client.shardManager.getAllSizeObject("users")
		let color = this.client.colors.default
		let client = this.client
		let owner = await this.client.users.fetch("395788326835322882")
		const duration = moment.duration(client.uptime).format(" dd[d] hh[h] mm[m] ss[s]")
		moment.locale(server.lang)
		cpuStat.usagePercent(function (err, percent, seconds) {
			const embed = new MessageEmbed()
				.setColor(color)
				.setThumbnail("https://images-ext-2.discordapp.net/external/gLz09AFgWmMbGyAk42-jFTNhVgpvG7uWDs9beywKDoA/https/cdn.discordapp.com/attachments/549244834721038348/557057944001314826/dchclth-ff495fe4-6a33-4da7-afb7-1fe2d42d7041.png?width=471&height=471")
				.setDescription(t("commands:botinfo.description", { clientName: client.user.username, clientcreatedAt: moment.utc(client.user.createdAt).format("LLLL"), guildName: message.guild.name, clientUptime: moment.duration(client.uptime).format("D[d], H[h], m[m], s[s]"), clientGuildSize: Number(guilds).toLocaleString(), clientUserSize: Number(users).toLocaleString(), clientJoinedAt: moment.utc(message.guild.me.joinedAt).format("LLLL") }))
				.setFooter(t("commands:createdBy", { clientName: client.user.username, owner: owner.tag }), owner.displayAvatarURL({ format: "png", dynamic: true }))
				.addField(t("commands:botinfo.prefix"), server.prefix, true)
				.addField(t("commands:botinfo.github"), t("commands:botinfo.github-desc"), true)
				.addField(t("commands:botinfo.twitter"), "[@ChinoKafuuBot](https://twitter.com/ChinoKafuuBot)", true)
				.addField(t("commands:botinfo.server-suport"), t("commands:botinfo.server-suport-url"), true)
				.addField("DiscordBot List", `[${t("commands:click-here")}](https://top.gg/bot/481282441294905344/vote)`, true)
				.addField("Bots para Discord", `[${t("commands:click-here")}](https://botsparadiscord.com/bots/481282441294905344/votar)`, true)
			const statusEmbed = new MessageEmbed()
				.setColor(color)
				.setTitle(t("commands:status.title"))
				.addField(t("commands:status.version"), `\`\`\`${require("../../../package.json").version}\`\`\``, true)
				.addField(t("commands:status.discord"), `\`\`\`${version}\`\`\``, true)
				.addField(t("commands:status.uptime"), `\`\`\`${duration}\`\`\``, true)
				.addField(t("commands:status.memory"), `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
				.addField(t("commands:status.cpu-status"), `\`\`\`${percent.toFixed(2)}%\`\`\``, true)
				.addField(t("commands:status.system"), `\`\`\`${os.platform()} ${os.arch()}\`\`\``, true)
				.addField(t("commands:status.cpu"), `\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)

			switch (args[0]) {
				case "extended": {
					message.channel.send(statusEmbed)
				}
					break
				default: {
					message.channel.send(embed).then(msg => {
						msg.react("chino_chibi:574337895838777374")

						const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "chino_chibi" && (u.id !== client.user.id && u.id === message.author.id)))
						collector.on("collect", r => {
							switch (r.emoji.name) {
								case "chino_chibi": {
									r.remove(r.emoji.id)
									msg.edit(statusEmbed)
								}
							}
						})
					})
				}
			}
		})
	}
}
