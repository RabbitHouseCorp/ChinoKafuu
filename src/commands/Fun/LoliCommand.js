const Command = require("../../structures/command")
const { RichEmbed } = require('discord.js')
module.exports = class LoliCommand extends Command {
    constructor (client) {
        super (client, {
            name: 'loli',
            category: 'fun',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }
    async run({message, args, server}, t) {

        let img = this.client.api.loli[Math.floor(Math.random() * this.client.api.dance.length)]
        const embed = new RichEmbed()
        .setColor(this.client.colors.action)
        .setImage(img)

        message.channel.send(embed)
    }
}