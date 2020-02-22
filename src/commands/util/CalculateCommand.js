const Command = require("../../structures/command")
let math = require("mathjs")
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
		function calc(expression) {
			'use strict';
			return math.evaluate(expression)
		}
		let resposta = calc(question)

		message.chinoReply("diamond", t("commands:calc.result", { resposta: resposta }))
	}
}