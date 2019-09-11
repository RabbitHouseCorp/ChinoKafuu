const Command = require("../../structures/command")
module.exports = class SetIconCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'seticon',
            category: 'mod',
            aliases: ['alteraricone'],
            UserPermission: ['MANAGE_GUILD'],
            ClientPermission: ["MANAGE_GUILD"],
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
        let icon = args[0] || message.attachments.first().url
        if (!icon) return message.chinoReply('error', t('commands:seticon.args-null'))

        message.guild.setIcon(icon).then(() => {
            message.chinoReply('success', t('commands:seticon.success'))
        })
    }
}