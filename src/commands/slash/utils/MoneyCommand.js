const { Command, ExchangeAPI, InvalidArgumentError } = require('../../../utils')
const { CommandOptions, CommandBase } = require('eris')

module.exports = class MoneyCommand extends Command {
  constructor() {
    super({
      name: 'money',
      aliases: ['grana', 'dinheiro'],
      arguments: 1,
      hasUsage: true,
      slash: new CommandBase()
        .setName('money')
        .setDescription('Make you AFK.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('from')
            .setDescription('What kind of currency')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('to')
            .setDescription('What kind of currency')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('amount')
            .setDescription('Value to convert')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    let [from, to, amount = 1] = ctx.args

    if (!from || !to || amount === null) return ctx.replyT('error', 'basic:missingArgs', { prefix: ctx.db.guild.prefix, commandName: this.name })
    if (isNaN(amount) || Number(amount) === Infinity) return ctx.replyT('error', 'commands:money.invalidValue')
    from = from.toUpperCase()
    to = to.toUpperCase()

    try {
      const res = await ExchangeAPI.getInstance().getExchange(from, to)
      const total = (res.rates[to] * parseFloat(amount)).toFixed(2)
      const totalFormated = Intl.NumberFormat('pt-BR', { style: 'currency', currency: to }).format(total)

      ctx.replyT('moneybag', 'commands:money.resultAmount', { from, to, amount, total: totalFormated })
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        ctx.replyT('error', 'commands:money.invalidArgs', { arg: err.message, supported: ExchangeAPI.ACCEPTED_RATES.join(', ') })
      }
    }
  }
}
