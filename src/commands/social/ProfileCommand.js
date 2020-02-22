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
		let member = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author
		let user = await this.client.database.Users.findById(member.id)
		if (!user) {
			new this.client.database.Users({
				_id: member.id
			}).save()
		}
		let format = member.avatar.startsWith("a_") ? "gif" : "webp" || message.author.avatar.startsWith("a_") ? "gif" : "webp"
		if (user.blacklist) {
			const bannedEmbed = new MessageEmbed()
				.setColor(this.client.colors.default)
				.setAuthor(`${member.tag} está banido.`, member.displayAvatarURL({ format }))
				.setThumbnail(member.avatar)
				.addField("Motivo", user.blacklistReason)

			message.channel.send(bannedEmbed)
			return
		}
		if (args[0] === "color") {
			if (!args[1]) return message.chinoReply("error", t("commands:profile.colors.args-null"))
			if (!args[1].includes("#")) return message.chinoReply("error", t("commands:profile.colors.hex"))
			const colorEmbed = new MessageEmbed()
				.setColor(`${args[1]}`)
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ format }))
				.setDescription(t("commands:profile.colors.this-color"))

			message.channel.send(colorEmbed).then(msg => {
				msg.react("success:577973168342302771")
				setTimeout(() => msg.react("error:577973245391667200"), 1000)

				const collector = msg.createReactionCollector((reaction, user) => (reaction.emoji.name === "success", "error") && (user.id !== this.client.user.id && user.id === message.author.id))
				collector.on("collect", r => {
					switch (r.emoji.name) {
						case "success":
							user.profileColor = args[1]
							user.save()
							user.yens -= Number(1000)
							message.chinoReply("success", t("commands:profile.colors.success", { member: member.toString(), value: Number(realValue[0]).toLocaleString() }))
							msg.delete()
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
		let description = [
			`${this.client.emotes.sharo_excited} **${t("commands:profile.aboutme")} »** *\`${user.aboutme}\`*`,
			`${this.client.emotes.rize_smile} **${t("commands:profile.user-name")} »** *\`${member.tag}\`*`,
			`${this.client.emotes.chino_peek} **${t("commands:profile.user-id")} »** *\`${member.id}\`*`,
			`${this.client.emotes.cocoa_carresing_tippy} **${t("commands:profile.marred")} »** *\`${user.isMarry ? this.client.users.cache.get(user.marryWith).tag : t("commands:with-nobody")}\`*`,
			`${this.client.emotes.yen} **${t("commands:profile.yens")} »** *\`${Number(user.yens).toLocaleString()}\`*`,
			`${this.client.emotes.sharo_hug_chino} **${t("commands:profile.rep")} »** *\`${user.rep}\`*`
		]
		const embed = new MessageEmbed()
			.setColor(user.profileColor)
			.setAuthor(t("commands:profile.title", { member: member.tag }), member.displayAvatarURL({ format }))
			.setThumbnail(member.displayAvatarURL({ format }))
			.setDescription(description.join("\n\n"))

		message.channel.send(embed)
	}
}