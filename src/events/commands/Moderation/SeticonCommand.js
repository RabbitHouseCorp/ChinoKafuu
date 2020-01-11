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
    run({message, args, server}, t) {
        let icon = args[0]
        if (!icon) return message.chinoReply('error', t('commands:seticon.args-null'))

        if (message.attachments.first()) {
            icon = message.attachments.first().url
            message.guild.setIcon(icon).then(() => {
                message.chinoReply('success', t('commands:seticon.success'))
            })
        } else {
            message.guild.setIcon(icon).then(() => {
                message.chinoReply('success', t('commands:seticon.success'))
            })
        }
    }
}
