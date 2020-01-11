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
        usuario.filter(user => this.client.users.get(user._id)).forEach(user => {
            let us = this.client.users.get(user._id)
            users.push({
                _id: us.tag,
                yens: user.yens
            })
        })
        users.sort(function (a, b) {
            return b.yens - a.yens
        })
        let us = users.map(a => `**${++number} -** \`${a._id}\` - *yens: ${Number(a.yens).toLocaleString()}*`).slice(0, 15)
        const { RichEmbed } = require("discord.js")
        let embed = new RichEmbed()
        .setColor(this.client.colors.default)
        .setTitle(`As ${us.length} pessoas com mais yens`)
        .setDescription(us)
        .setThumbnail(this.client.user.displayAvatarURL)

        message.channel.send(embed)
    }
}