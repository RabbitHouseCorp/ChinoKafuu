const Command = require("../../structures/command")
module.exports = class VoteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vote',
            category: 'Random',
            aliases: ['votar'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
            
        let embed = new this.client.Discord.RichEmbed()
        .setColor(this.client.colors.default)
        .setDescription(t('commands:vote.voteMsg', {author: message.author.username, prefix: server.prefix}))
        .setFooter(this.client.user.username, this.client.user.avatarURL)
        .setTimestamp(new Date())

        message.author.send(embed)
        message.chinoReply('peek', t('commands:vote.sendDM', { author: message.author}))
    }
}