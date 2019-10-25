const Command = require("../../structures/command")
module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            category: 'mod',
            aliases: ["limpar", "clean"],
            UserPermission: ['MANAGE_CHANNELS'],
            ClientPermission: ['MANAGE_CHANNELS'],
            OnlyDevs: false,
            hidden: false,
        })
    }
    run({message, args, server }, t) {

        if (!args[0]) return message.chinoReply('error', t('commands:clear.args-null'))
        if (args[0] > 100) return message.chinoReply('error', t('commands:clear.limit'))
        message.channel.bulkDelete(args[0]).then(msg => {
            message.channel.send(`${this.client.emotes.trash} | ${message.author}, ${t('commands:clear.success', {totalMsg: msg.size})}`).then(msg => msg.delete(5000))}).catch(() => {
            message.chinoReply('error', t('commands:clear.error'))
        })
    }
}