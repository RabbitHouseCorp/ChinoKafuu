const Command = require("../../structures/command")
const NekosLife = require('nekos.life')
const neko = new NekosLife()
const { RichEmbed } = require('discord.js')
module.exports = class PatCommand extends Command {
    constructor (client) {
        super (client, {
            name: 'tippy',
            category: 'fun',
            aliases:['piadas'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }
    execute({message, args, server}, t) {
        
        let tippy = this.client.api.piadas
        let piada = tippy[Math.floor(Math.random() * tippy.length)]
        message.channel.createWebhook('Tippy', 'https://giffiles.alphacoders.com/184/184302.gif').then(wh => {
            wh.send(piada)
            wh.delete()
        })
    }
}