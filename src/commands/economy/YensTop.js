const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class YensTopCommand extends Command {
	constructor(client) {
		super(client, {
			name: "yenstop",
			aliases: ["topyens", "topyen", "yentop"],
			category: "economy",
			ClientPermission: ["EMBED_LINKS"]
		})
	}

	async run({ message, args, server }, t) {
		let usuario = await this.client.database.Users.find({})
		let users = []
		let members = await this.client.shardManager
		let filteredUsers = usuario.filter(async user => await members.getUsers(user._id))
		for (let user of filteredUsers) {
			let us = await members.getUsers(user._id)
			if (us) {
				users.push({
					tag: us.tag,
					yens: user.yens
				})
			}
		}
		users.sort(function (a, b) {
			return b.yens - a.yens
		})
		let desc = users.map(({ tag, yens }, index) => `**${index + 1} -** \`${tag}\` - *yens: ${Number(yens).toLocaleString()}*`).slice(0, 15)
		let embed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.setTitle(`As ${desc.length} pessoas com mais yens`)
			.setDescription(desc)
			.setThumbnail(this.client.user.displayAvatarURL())

		message.channel.send(embed)
	}
}