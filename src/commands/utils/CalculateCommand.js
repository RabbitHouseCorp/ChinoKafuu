const Command = require('../../structures/command/Command')
const workerpool = require('workerpool')
const pool = workerpool.pool()

function calc (expression) {
  const { create, all } = require('mathjs')
  const math = create(all)
  const limitedEvaluate = math.evaluate

  math.import({
    import: 'Function import is disabled',
    createUnit: 'Function createUnit is disabled',
    evaluate: 'Function evaluate is disabled',
    parse: 'Function parse is disabled',
    simplify: 'Function simplify is disabled',
    derivative: 'Function derivative is disabled',
    format: 'Function format is disabled'
  }, { override: true })

  return limitedEvaluate(expression).toString()
}

module.exports = class CalculateCommand extends Command {
  constructor () {
    super({
      name: 'calculate',
      arguments: 1,
      aliases: ['calcular', 'calc']
    })
  }

  async run (ctx) {
    const expression = ctx.args.join(' ')

    if (!expression) {
      return ctx.reply('error', ctx.t('commands:calc.invalidArgs'))
    }

    try {
      const result = await pool.exec(calc, [expression])
      pool.terminate()
      ctx.reply('success', ctx.t('commands:calc.result', { result: result }))
    } catch (error) {
      ctx.reply('error', ctx.t('commands:calc.result', { result: error.message }))
    }
  }
}
