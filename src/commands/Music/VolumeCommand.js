const Command = require("../../structures/command")
module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            category: 'music',
            aliases: ['vol'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
            
        if (!this.client.player.has(message.guild.id)) return message.chinoReply('error', t('commands:pause.queueNull'))
        if (!message.member.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.channelNull'))
        if (message.guild.me.voiceChannel && message.member.voiceChannel !== message.guild.member(this.client.user).voiceChannel) return message.chinoReply('error', t('commands:DJCommand.diferenceChannel'))
        if (parseInt(args[0]) > 150) return message.chinoReply('error', t('commands:volume.maxVolume'))
        if (parseInt(args[0]) < 5) return message.chinoReply('error', t('commands:volume.minVolume'))
        if (!args[0]) return message.reply(t('commands:volume.hisVol', {volume: this.client.player.get(message.guild.id).player.state.volume}))
        this.client.player.get(message.guild.id).player.volume(args[0])
        message.reply(t('commands:volume.volume', {volume: args[0]}))
    }
}