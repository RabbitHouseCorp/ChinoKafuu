const Command = require("../../structures/command")
const { RichEmbed } = require('discord.js')
module.exports = class DanceCommand extends Command {
    constructor (client) {
        super (client, {
            name: 'dance',
            category: 'fun',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }
    async execute({message, args, server}, t) {
        let member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.chinoReply('error', t('commands:mention-null'))
        let img = this.client.api.dance[this.client.api.dance.length]
        const embed = new RichEmbed()
        .setColor(this.client.colors.action)
        .setImage(img)
        .setDescription(t('commands:dance', {author: message.author, member: member}))

        message.channel.send(embed)
    }
}