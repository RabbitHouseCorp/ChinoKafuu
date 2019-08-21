const Command = require("../../structures/command")
module.exports = class McAvatarCommand extends Command {
    constructor(client) {
        super(client, {
           name: 'mcavatar',
           category: 'minecraft',
           aliases: [],
           UserPermission: null,
           ClientPermission: null,
           OnlyDevs: false,
           hidden: false,
        })
    } 
    execute({message, args, server}, t) {
            
        if (!args[0]) return message.chinoReply('error', t('commands:mc'))
        const body = `https://mc-heads.net/avatar/${args[0]}/256.png`
        const embed = new this.client.Discord.RichEmbed()
        .setTimestamp()
        .setColor(this.client.colors.mine)
        .setImage(body)
        .setDescription(`[[Download]](${body})`)
        message.channel.send(embed)
   }
}