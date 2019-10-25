const Command = require("../../structures/command")
module.exports = class PayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pay',
            category: 'economy',
            aliases: ['pagar', "doar"]
        })
    }
    async run({message, args, server}, t) {
        let user = await this.client.database.Users.findById(message.author.id)
        if (!user || user === null) {
            new this.client.database.Users({
                _id: message.author.id
            }).save()
        }
      
        let member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.chinoReply("error", t("commands:mention-null"))
        if (member.id === message.author.id) return message.chinoReply("error", t("commands:pay.this-author"))
        let value = args[1]
        if (!value) return message.chinoReply("error", t("commands:pay.value-null"))
        let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
        if (invalidValue) return message.chinoReply("error", t("commands:pay.invalid-value"))
        let donator = await this.client.database.Users.findById(message.author.id)
        if (donator.yens < value) return message.chinoReply("error", t("commands:pay.insufficient-value"))
        let membro = await this.client.database.Users.findById(member.id)
        donator.yens -= Number(value)
        membro.yens += Number(value)
        membro.save()
        donator.save()

        message.chinoReply("money_with_wings", t("commands:pay.success", {member: member, value: Number(value).toLocaleString()}))
    }
}