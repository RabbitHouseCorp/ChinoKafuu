const Command = require("../../structures/command")
module.exports = class McHeadCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mchead',
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
        const body = `https://mc-heads.net/head/${args[0]}`
        const embed = new this.client.Discord.RichEmbed()
        .setTimestamp()
        .setColor(this.client.colors.mine)
        .setImage(body)
        .setDescription(`[[Download]](${body})`)
        message.channel.send(embed)
    }
}