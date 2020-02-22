const Command = require("../../structures/command")
const NekosLife = require('nekos.life')
const neko = new NekosLife()
const { RichEmbed } = require('discord.js')
module.exports = class NekoCommand extends Command {
    constructor (client) {
        super (client, {
            name: 'neko',
            category: 'fun',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }

    async run({message, args, server}, t) {
        let img = await neko.sfw.neko()
        const embed = new RichEmbed()
        .setColor(this.client.colors.action)
        .setDescription(this.client.emotes.neko_chino)
        .setImage(img.url)

        message.channel.send(embed)
    }
}