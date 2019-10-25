const Command = require("../../structures/command")
module.exports = class DivorceCommand extends Command {
    constructor (client) {
        super(client, {
            name: "divorce",
            aliases: ["divorciar"],
            category: "social"
        })
    }

    async run({message, args, server}, t) {
        let user = await this.client.database.Users.findById(message.author.id)
        let user2 = await this.client.database.Users.findById(user.marryWith)
        if (!user2 || !user.isMarry) return message.chinoReply("error", t("commands:divorce.no-marry", {prefix: server.prefix}))
        let member = this.client.users.get(user2._id)
        if (user2.yens < Number(300)) return message.chinoReply("error", t("commands:divorce.user", {member: member}))
        if (user.yens < Number(300)) return message.chinoReply("error", t("commands:divorce.author"))
        

        message.channel.send(t("commands:divorce.confirm", {member: member, author: message.author})).then(msg => {
            setTimeout(() => msg.react("✅"), 500)
            setTimeout(() => msg.react("❎"), 1000)

            const collector = msg.createReactionCollector((reaction, users) => (reaction.emoji.name === "✅", "❎") && (users.id !== this.client.user.id && users.id === member.id))
            collector.on("collect", r => {
                switch (r.emoji.name) {
                    case "✅":
                        user.isMarry = false
                        user.marryWith = t("commands:with-nobody")
                        user.yens -= Number(300)
                        user.save()

                        user2.isMarry = false
                        user2.marryWith = t("commands:with-nobody")
                        user2.yens -= Number(300)
                        user2.save()
                        msg.delete()
                        message.chinoReply("broken_heart", t("commands:divorce.divorced"))
                        break;
                    case "❎":
                        msg.delete()
                        message.chinoReply("eyes_with_hearts", t("commands:divorce.no-divorce"))
                }
            })
        })
    }
}