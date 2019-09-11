const Command = require("../../structures/command")
module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            category: 'music',
            aliases: ['parar'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    async execute({message, args, server}, t) {
        
        if (!this.client.player.has(message.guild.id)) return message.chinoReply('error', t('commands:pause.queueNull'))
        if (!message.member.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.channelNull'))
        if (message.guild.me.voiceChannel && message.member.voiceChannel !== message.guild.me.voiceChannel) return message.chinoReply('error', t('commands:DJCommand.diferenceChannel'))

        this.client.player.get(message.guild.id).player.stop()
        await this.client.lavalinkManager.manager.leave(message.guild.id)
        this.client.lavalinkManager.manager.delete(message.guild.id)
        this.client.player.delete(message.guild.id)

        message.chinoReply('success', t('commands:stop'))
    }
}