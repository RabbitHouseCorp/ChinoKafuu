const Command = require("../../structures/command")
module.exports = class JanKePonCommand extends Command {
    constructor(client) {
        super(client, {
            name: "jankenpon",
            aliases: ["ppt"],
            category: "games"
        })
    }

    async run({ message, args, server }, t) {
        if (!args[0]) return message.chinoReply("error", t("commands:ppt.args-null"))
        let user = await this.client.database.Users.findById(message.author.id)
        let options = ["pedra", "papel", "tesoura"]
        if (!["pedra", "papel", "tesoura", "rock", "paper", "scissors"].includes(args[0])) return message.chinoReply("error", t("commands:ppt.option-not-found"))
        let clientChoice = options[Math.floor(Math.random() * options.length)]
        let me = args[0].toLowerCase()
        let result
        let emoji
        let value = args[1]
        if (!value) return message.chinoReply("warn", t("commands:ppt.value-not-inputed"))
        let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
        if (invalidValue) return message.chinoReply("error", t("commands:pay.invalid-value"))
        if (user.yens <= value) return message.chinoReply("error", t("commands:pay.insufficient-value"))
        const clientChoiceMappings = {
            tesoura: ['pedra', 'rock'],
            papel: ['tesoura', 'scissors'],
            pedra: ['papel', 'paper']
        }
        const clientDrawMappings = {
            tesoura: ['scissors', 'tesoura'],
            pedra: ['pedra', 'rock'],
            papel: ['paper', 'rock']
            }
        const userWinOption = (clientChoiceMappings[clientChoice] || []).includes(me);
        
        if (userWinOption) {
            emoji = "chino_sad"
            result = t("commands:ppt.you-win", { me: me, clientChoice: clientChoice, value: Number(value).toLocaleString() })
            user.yens += Math.floor(value)
            user.save()
        } else if (clientDrawMappings[clientChoice].includes(me)) {
            emoji = "chino_thiking"
            result = t("commands:ppt.tie")
        } else if (!userWinOption) {
            emoji = "chino_kek"
            result = t("commands:ppt.you-lose", { me: me, clientChoice: clientChoice, value: Number(value).toLocaleString() })
            user.yens -= Math.floor(value)
            user.save()
        }

        message.channel.send("Jan ken pon").then(msg => {
            setTimeout(() => {
                msg.delete()
                message.chinoReply(emoji, result)
            }, 2000)
        })
    }
}
