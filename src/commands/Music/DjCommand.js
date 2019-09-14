const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")
module.exports = class DJCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dj',
            category: 'music',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
        
        const embed = new RichEmbed()
        .setColor(this.client.colors.default)
        .setDescription(t('commands:dj'))
        .setThumbnail(this.client.user.displayAvatarURL)
        message.channel.send(embed)    
    }
}