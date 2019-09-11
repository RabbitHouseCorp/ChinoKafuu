const Command = require("../../structures/command")
module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            category: 'random',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
            
        let member = message.mentions.users.first() || this.client.users.get(args[0]) || message.author
        let avatar = member.displayAvatarURL

        if (avatar.endsWith('.gif')) {
            avatar = `${member.displayAvatarURL}?size=2048`
        }

        const embed = new this.client.Discord.RichEmbed()
        .setColor(this.client.colors.default)
        .setImage(avatar)
        .setTimestamp()
        .setFooter(t('commands:avatar.hisAvatar', {member: member.tag}), avatar)
        .setDescription(t('commands:avatar.download', {avatar: avatar}))

        message.channel.send(embed)
        
    }
}