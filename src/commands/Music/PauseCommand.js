const Command = require("../../structures/command")
module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            category: 'music',
            aliases: ['pausar'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
       
        if (!this.client.player.has(message.guild.id)) return message.channel.send(t('commands:queue.queueClean'))
        if (this.client.player.get(message.guild.id).player.paused === true) return message.chinoReply('error', t('commands:pause.isPaused'))
        if (!this.client.player.get(message.guild.id).player.playing) return message.chinoReply('error', t('commands:pause.queueNull'))
        if (!message.member.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.channelNull'))
        if (message.guild.me.voiceChannel && message.member.voiceChannel !== message.guild.me.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.diferenceChannel'))

        this.client.player.get(message.guild.id).player.pause()
        message.chinoReply('success', t('commands:pause.paused'))
    }
}