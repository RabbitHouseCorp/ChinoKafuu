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
    run({message, args, server}, t) {

        if (!this.client.player.has(message.guild.id)) return message.channel.send(t('commands:dj-module.no-playing'))
        if (this.client.player.get(message.guild.id).player.paused == false) return message.chinoReply('error', t('commands:resume.isPlaying'))
        if (!this.client.player.get(message.guild.id).player.playing) return message.chinoReply('error', t('commands:resume.queue-null'))
        if (!message.member.voiceChannel) return message.chinoReply('error', t('commands:dj-module.channel-null'))
        if (message.guild.me.voiceChannel && message.member.voiceChannel !== message.guild.me.voiceChannel) return message.chinoReply('error', t('commands:dj-module.another-channel'))

        message.chinoReply('success', t('commands:resume.playing')).then(this.client.player.get(message.guild.id).player.resume())
    }
}