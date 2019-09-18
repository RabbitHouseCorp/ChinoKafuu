const Command = require("../../structures/command")
module.exports = class ChangeNickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'changenickname',
            category: 'mod',
            aliases: ['setnickname','setarapelido', 'alteraraplido'],
            UserPermission: ['MANAGE_NICKNAMES'],
            ClientPermission: ['MANAGE_NICKNAMES'],
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
            
        const member = message.mentions.users.first() || this.client.users.get(args[0])
        const nickname = args.slice(1).join(' ')
        if (!member) return message.chinoReply(t('commands:mention-null'))
        if (!nickname) return message.chinoReply(t('commands:changenickname.args-null'))

        message.guild.member(member).setNickname(nickname).then(() => {

            message.chinoReply('success', t('commands:changenickname.success', {member: member.tag, nickname: nickname}))

        }).catch(err => {
            message.chinoReply('error', t('events:error', {err: err}))
        })
    }
}
