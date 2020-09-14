const Command = require("../../structures/command")
const workerpool = require('workerpool');
const pool = workerpool.pool();

function calc (expr) {
	const { create, all } = require('mathjs')
	const math = create(all)
	const limitedEvaluate = math.evaluate

	math.import({
		'import': 'Function import is disabled',
		'createUnit': 'Function createUnit is disabled',
		'evaluate': 'Function evaluate is disabled',
		'parse': 'Function parse is disabled',
		'simplify': 'Function simplify is disabled',
		'derivative': 'Function derivative is disabled',
		'format': 'Function format is disabled'
	}, {override: true})

	return limitedEvaluate(expr).toString()
}

module.exports = class CalculateCommand extends Command {
	constructor(client) {
		super(client, {
			name: "calculate",
			category: "util",
			aliases: ["calcular", "calc"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		let question = args.join(" ")
		if (!question) return message.chinoReply("error", t("commands:calc.args-null"))

		pool.exec(calc, [question]).then((r) => message.chinoReply("diamond", t("commands:calc.result", { resposta: r })))
			.catch((e) => message.chinoReply("error", t("commands:calc.result", { resposta: e.stack })))
			.then(() => pool.terminate())
	}
}
