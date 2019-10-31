const Command = require("../../structures/command")
module.exports = class InviteCommand extends Command {
    constructor(client) {
       super(client, {
           name: 'invite',
           category: 'random',
           aliases: ['convite'],
           UserPermission: null,
           ClientPermission: null,
           OnlyDevs: false,
           hidden: false,
       })
   } 
    run({message, args, server}, t) {
        
        const embed = new this.client.Discord.RichEmbed()
        .setColor(this.client.colors.default)
        .addField(t('commands:invite.MyInvite'), t('commands:invite.invite', {clientID: this.client.user.id}))
    
        message.author.send(embed).then(() => {
            message.reply(t('commands:send-dm'))
        }).catch(() => {
            message.chinoReply('error', t('commands:closed-dm'))
        }) 
    }
}