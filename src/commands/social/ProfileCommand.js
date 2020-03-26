const { MessageEmbed } = require("discord.js")
const Command = require("../../structures/command")
module.exports = class ProfileCommand extends Command {
	constructor(client) {
		super(client, {
			name: "profile",
			aliases: ["perfil"],
			category: "social",
			ClientPermission: ["EMBED_LINKS", "ADD_REACTIONS"]
		})
	}

	async run({ message, args, server }, t) {
		let member
		if (args[0]) {
			member = await this.client.shardManager.getUsers(args[0].replace(/[<@!>]/g, ""))
			if (!member) {
				member = message.author
			}
		} else {
			member = message.author
                }
		let user = await this.client.database.Users.findById(member.id)
		let avatar
		if (!user) {
			new this.client.database.Users({
				_id: member.id
			}).save()
		}
		if (member.avatar) {
			if (!member.avatar.startsWith("a_")) {
				avatar = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`
			} else {
				avatar = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.gif?size=2048`
			}
		} else {
			avatar = member.displayAvatarURL()
		}
		
		if (user.blacklist) {
			const bannedEmbed = new MessageEmbed()
			bannedEmbed.setColor(this.client.colors.default)
			bannedEmbed.setAuthor(`${member.tag} está banido.`, avatar)
			bannedEmbed.setThumbnail(avatar)
			bannedEmbed.addField("Motivo", user.blacklistReason)

			message.channel.send(bannedEmbed)
			return
		}
		if (args[0] === "color") {
			if (!args[1]) return message.chinoReply("error", t("commands:profile.colors.args-null"))
			if (!args[1].startsWith("#")) return message.chinoReply("error", t("commands:profile.colors.hex"))
			const colorEmbed = new MessageEmbed()
			colorEmbed.setColor(`${args[1]}`)
			colorEmbed.setAuthor(message.author.tag, avatar)
			colorEmbed.setDescription(t("commands:profile.colors.this-color"))

			message.channel.send(colorEmbed).then(msg => {
				msg.react("success:577973168342302771")
				setTimeout(() => msg.react("error:577973245391667200"), 1000)

				const collector = msg.createReactionCollector((reaction, user) => (reaction.emoji.name === "success", "error") && (user.id !== this.client.user.id && user.id === message.author.id))
				collector.on("collect", r => {
					switch (r.emoji.name) {
						case "success":
							user.profileColor = args[1]
							user.yens -= Number(1000)
							user.save().then(() => {
								message.chinoReply("success", t("commands:profile.colors.success", { member: member.toString(), value: Number(1000).toLocaleString() }))
								msg.delete()
							})
							break;
						case "error":
							message.chinoReply("error", t("commands:profile.colors.cancel"))
							msg.delete()
							break;
					}
				})
			})
			return
		}

		let marryWith = await this.client.shardManager.getUsers(user.marryWith)
		if (!marryWith) {
			user.isMarry = false
			user.yens += Number(7500)
			user.save()
		}
		let description = [
			`${this.client.emotes.sharo_excited} **${t("commands:profile.aboutme")} »** *\`${user.aboutme}\`*`,
			`${this.client.emotes.rize_smile} **${t("commands:profile.user-name")} »** *\`${member.tag}\`*`,
			`${this.client.emotes.chino_peek} **${t("commands:profile.user-id")} »** *\`${member.id}\`*`,
			`${this.client.emotes.cocoa_carresing_tippy} **${t("commands:profile.marred")} »** *\`${user.isMarry ? marryWith.tag : t("commands:with-nobody")}\`*`,
			`${this.client.emotes.yen} **${t("commands:profile.yens")} »** *\`${Number(user.yens).toLocaleString()}\`*`,
			`${this.client.emotes.sharo_hug_chino} **${t("commands:profile.rep")} »** *\`${user.rep}\`*`
		]
		const embed = new MessageEmbed()
		embed.setColor(user.profileColor)
		embed.setAuthor(t("commands:profile.title", { member: member.tag }), avatar)
		embed.setThumbnail(avatar)
		embed.setDescription(description.join("\n\n"))

		message.channel.send(embed)
	}
}
