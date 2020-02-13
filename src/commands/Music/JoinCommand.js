const Command = require("../../structures/command")
module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            category: 'music',
            aliases: ['entrar'],
            UserPermission: null,
            ClientPermission: ['SPEAK', 'CONNECT'],
            OnlyDevs: false,
            hidden: false,
        })
    }
    run({message, args, server}, t) {
            
        if (!message.member.voiceChannel) return message.chinoReply('error', t('commands:dj-module.channel-null'))
        if (message.guild.member(this.client.user).voiceChannel && message.member.voiceChannel !== message.guild.member(this.client.user).voiceChannel) return message.chinoReply('error', t('commands:dj-module.another-channel'))
        
        message.reply(t('commands:join', {voiceChannel: message.member.voiceChannel.name})).then(async () => await this.client.lavalinkManager.join(message.member.voiceChannel.id))
    }
}