const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")
module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            category: 'developers',
            aliases: ['e'],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: true,
            hidden: true,
        })
    }
    execute({message, args, server}, t) {
        try {
            let util = require("util");
            let code = args.join(' ');
            let ev = eval(code)
            let str = util.inspect(ev, {
                depth: 1
            })
            str = `${str.replace(new RegExp(`${this.client.token}`, "g"), "undefined")}`;
            if (str.length > 1800) {
                str = str.substr(0, 1800)
                str = str + "..."
            }
            message.channel.send(str, { code: 'js' })

        } catch (err) {
            if (err.stack.length > 1800) {
              err.stack = err.stack.substr(0, 1800)
              err.stack = `${err.stack}...`
            }
            const embed = new RichEmbed()
            .setColor(this.client.colors.error)
            .setTitle(`${this.client.emotes.chino_sad} ${t("events:error")} ${this.client.emotes.chino_chibi}`)
            .setDescription(`\`\`\`js\n${err.stack}\`\`\``)

            message.channel.send(embed)
        }
    }
}