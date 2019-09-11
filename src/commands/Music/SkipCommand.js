const Command = require("../../structures/command")
module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            category: 'music',
            aliases: ['pular'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    }
    execute({message, args, server}, t) {
        
        if (!this.client.player.has(message.guild.id)) return message.channel.send(t('commands:queue.queueClean'))
        if (!message.member.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.channelNull'))
        if (message.guild.me.voiceChannel && message.member.voiceChannel !== message.guild.me.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.diferenceChannel'))
        
        message.chinoReply('success', t('commands:skip'))
        this.client.player.get(message.guild.id).skip()
    }
}