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
		let avatar
		if (args[0]) {
			member = await this.client.shardManager.getUsers(args[0].replace(/[<@!>]/g, ""))
			if (!member) {
				member = message.author
				avatar = member.displayAvatarURL({ format: "png", dynamic: true })
			}
			avatar = member.avatar?.startsWith('a_') ? member.displayAvatarURL.replace('webp', 'gif') : member.displayAvatarURL.replace('webp', 'png')
		} else {
			member = message.author
			avatar = member.displayAvatarURL({ format: "png", dynamic: true })
		}
		let user = await this.client.database.Users.findById(member.id)
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