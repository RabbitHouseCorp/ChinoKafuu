const Command = require("../../structures/command")
module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            category: 'music',
            aliases: ['continuar', 'retormar', 'unpause'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {

        if (!this.client.player.has(message.guild.id)) return message.channel.send(t('commands:queue.queueClean'))
        if (this.client.player.get(message.guild.id).player.paused == false) return message.chinoReply('error', t('commands:resume.isPlaying'))
        if (!this.client.player.get(message.guild.id).player.playing) return message.chinoReply('error', t('commands:resume.queueNull'))
        if (!message.member.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.channelNull'))
        if (message.guild.me.voiceChannel && message.member.voiceChannel !== message.guild.me.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.diferenceChannel'))

        message.chinoReply('success', t('commands:resume.playing')).then(this.client.player.get(message.guild.id).player.resume())
    }
}