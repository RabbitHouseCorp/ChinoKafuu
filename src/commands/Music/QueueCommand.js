const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            category: 'music',
            aliases: ['playlist'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
            
        if (!this.client.player.has(message.guild.id)) return message.channel.send(t('commands:queue.queueClean'))
        let string = ""
        let track = []
        let number = 1
        
        this.client.player.get(message.guild.id).queue.forEach(song => {
            track.push({
                trackName: song.info.title,
                trackDuration: song.info.length,
                trackURL: song.info.uri
            })

            track.sort(function (a, b) {
                return b.trackDuration - a.trackDuration
            })
        })
        let queue = track.map(result => `[**${number++}** | ${result.trackName} - ${moment.duration(result.trackDuration).format('dd:hh:mm:ss')}](${result.trackURL})`).join('\n')
        const embed = new RichEmbed()
        .setColor(this.client.colors.default)
        .setDescription(queue)
        
        message.channel.send(embed)
    }
}