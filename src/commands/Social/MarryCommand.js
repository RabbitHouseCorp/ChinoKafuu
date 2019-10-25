const Command = require("../../structures/command")
module.exports = class MarryCommand extends Command {
    constructor (client) {
        super(client, {
            name: "marry",
            aliases: ["casar"],
            category: "social"
        })
    }

    async run({message, args, server}, t) {
        let member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.chinoReply("error", t("commands:mention-null"))
        let user = await this.client.database.Users.findById(member.id)
        let author = await this.client.database.Users.findById(message.author.id)
        if (user.yens < Number(7500)) return message.chinoReply("error", t("commands:marry.he-or-her-need", {member: member}))
        if (author.yens < Number(7500)) return message.chinoReply("error", t("commands:marry.you-need"))
        if (user.isMarry) return message.chinoReply("error", t("commands:marry.he-or-her-is-marred", {member: member}))
        if (author.isMarry) return message.chinoReply("error", t("commands:marry.your-is-marred"))

        message.channel.send(t("commands:marry.confirm", {member: member, author: message.author})).then(msg => {
            setTimeout(() => msg.react("✅"), 500)
            setTimeout(() => msg.react("❎"), 1000)

            const collector = msg.createReactionCollector((reaction, users) => (reaction.emoji.name === "✅", "❎") && (users.id !== this.client.user.id && users.id === member.id))
            collector.on("collect", r => {
                switch (r.emoji.name) {
                    case "✅":
                        user.isMarry = true
                        user.marryWith = message.author.id
                        user.yens -= Number(7500)
                        user.save()

                        author.isMarry = true
                        author.marryWith = member.id
                        author.yens -= Number(7500)
                        author.save()
                        msg.delete()
                        message.chinoReply("tada", t("commands:marry.successfully-marred", {member: member}))
                        break;
                    case "❎":
                        msg.delete()
                        message.chinoReply("broken_heart", t("commands:marry.rejected", {member: member}))
                }
            })
        })
    }
}