const Command = require("../../structures/command")
module.exports = class ChangeAvatarCommand extends Command {
    constructor(client) {
       super(client, {
           name: 'changeavatar',
           category: 'Developers',
           aliases: ['alteraravatar'],
           UserPermission: null,
           ClientPermission: null,
           OnlyDevs: true,
           hidden: true,
       })
   } 
   execute({message, args, server}, t) {
        
        const avatar = args[0] || message.attachments.first().url
        if (!avatar) return message.chinoReply('error', t('commands:changeavatar.args-null'))

        this.client.user.setAvatar(avatar).then(() => {
            const embed = new this.client.Discord.RichEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(t('commands:changeavatar.avatar'), avatar)
            .setImage(avatar)

            message.channel.send(embed)
        }) 
    }
}