const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            category: "Util",
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
        let ping = `Ping: \`${Math.round(this.client.ping)}\`ms! | API: \`${Date.now() - message.createdTimestamp}\`ms | Shard: [${this.client.shard.id}/${this.client.shard.count}]`
        switch (args[0]) {
        case "shards":
        this.client.shard.broadcastEval('this.ping').then(shard => {
                const embed = new RichEmbed()
                .setColor(this.client.colors.default)
                .setFooter(`${t("commands:ping")} ${this.client.shard.count} shards`)
                let s = []
                shard.forEach((ping, index) => s.push( embed.addField(`Shard ${index}`, `${Math.round(ping)}ms`, true)))
                message.channel.send(embed)
            })
        break;
        default:
            message.channel.send(this.client.emotes.ping_pong).then(msg => {
                msg.edit(`${this.client.emotes.ping_pong}\n${ping}`)
            })
        }
    }
}