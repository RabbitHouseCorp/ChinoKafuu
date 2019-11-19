const Command = require("../../structures/command")
module.exports = class RemoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            category: 'music',
            aliases: ["remover"]
        })
    } 
    run({message, args, server}, t) {
            
        if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t('commands:dj-module.no-playing'))
        if (this.client.player.get(message.guild.id).queue.length === 0) return message.chinoReply("error", t("commands:dj-module.queue-null"))
        if (!args[0]) return message.chinoReply("error", t("commands:remove.args-null"))
        let invalidNumber = Number(args[0]) || Number(args[0]) === Infinity || isNaN(args[0])
        if (!invalidNumber) return message.chinoReply("error", t("commands:remove.not-number"))
        let number = args[0] < 0 || args[0] > this.client.player.get(message.guild.id).queue.length
        if (number) return message.chinoReply("error", t("commands:remove.max-and-minimum", {max: this.client.player.get(message.guild.id).queue.length}))

        message.chinoReply("sucess", t("commands:remove.removed")).then(() => {
            this.client.player.get(message.guild.id).queue.splice(Number(args[0]) - 1, 1)  
        })
    }
}