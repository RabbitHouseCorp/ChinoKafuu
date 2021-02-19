const Command = require("../../structures/command")
const ExchangeApi = require("../../api/exchangeAPI.js")
const InvalidArgumentError = require("../../api/invalidArgumentError")

module.exports = class MoneyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "money",
            category: "util",
            aliases: ["bufunfa", "currency", "convercao"],
            UserPermission: [],
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    }

    async run({ message, args, server }, t) {
        let [from, to, ammount = 1] = args

        if (!from || !to || (ammount === null)) {
            message.chinoReply("error", t("commands:money.invalidOptions", {
                prefix: server.prefix,
                name: this.config.name,
            }))

            return
        }

        if (isNaN(ammount)) {
            message.chinoReply("error", t("commands:money.invalidValue"))
            return
        }

        from = from.toUpperCase()
        to = to.toUpperCase()

        try {
            const res = await ExchangeApi.getInstance().getExchange(from.toUpperCase(), to.toUpperCase())
            const total = (res.rates[to] * parseFloat(ammount)).toFixed(2)
            const totalFormated = Intl.NumberFormat("pt-BR", { style: "currency", currency: to }).format(total)

            message.chinoReply("moneybag", t("commands:money.success", { from, to, ammount, total: totalFormated }))
        } catch (err) {
            if (err instanceof InvalidArgumentError) {
                message.chinoReply("error", t("commands:money.invalidArgument", { arg: err.message }))
            }
        }
    }
}
