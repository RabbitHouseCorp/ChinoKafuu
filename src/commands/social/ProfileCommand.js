const { MessageEmbed, MessageAttachment } = require("discord.js")
const Command = require("../../structures/command")

module.exports = class ProfileCommand extends Command {
	constructor(client) {
		super(client, {
			name: "profile",
			aliases: ["perfil"],
			category: "social",
			ClientPermission: ["EMBED_LINKS", "ADD_REACTIONS", "ATTACH_FILES"]
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
		let avatar = member.displayAvatarURL({ format: "png", dynamic: true })
		if (!user) {
			new this.client.database.Users({
				_id: member.id
			}).save()
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
							user.yens = user.yens - Number(1000)
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
		if (user.isMarry && !marryWith) {
			user.isMarry = false
			user.yens = user.yens + 7500
			user.save()
		}
		delete require.cache[require.resolve("../../structures/CanvasTemplates")]
		const { generateProfile } = require("../../structures/CanvasTemplates")
		let image = await generateProfile({ member, user, avatar, marryWith }, t)

		message.channel.send(new MessageAttachment(image, "profile.png"))
	}
}