const Command = require("../../structures/command")
module.exports = class YensTopCommand extends Command {
    constructor (client) {
        super(client, {
            name: "yenstop",
            aliases: ["topyens", "topyen", "yentop"],
            category: "economy"
        })
    }

    async run({message, args, server}, t) {
        let usuario = await this.client.database.Users.find({})
        let number = 0
        let users = []
        usuario.forEach(user => {
            users.push({
                _id: user._id,
                yens: user.yens
            })
        })
        users.sort(function (a, b) {
            return b.yens - a.yens
        })
        let us = users.map(a => `**${++number} -** ${this.client.users.get(a._id)} - *yens: ${Number(a.yens).toLocaleString()}*`).slice(0, 15)
        const { RichEmbed } = require("discord.js")
        let embed = new RichEmbed()
        .setColor(this.client.colors.default)
        .setTitle("Pessoas com mais yens")
        .setDescription(us)
        .setThumbnail(this.client.user.displayAvatarURL)

        message.channel.send(embed)
    }
}