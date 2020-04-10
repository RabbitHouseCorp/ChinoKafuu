const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const inspect = require('util')
module.exports = class EvalCommand extends Command {
	constructor(client) {
		super(client, {
			name: "eval",
			category: "developers",
			aliases: ["e"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: true
		})
	}
	async run({ message, args, server }, t) {
    const code = args.join(' ')

    try {
      // eslint-disable-next-line no-eval
      const evaluated = await Promise.resolve(eval(code))

      message.channel.send(inspect(evaluated, { depth: 0 }), { code: 'js' })
    } catch (err) {
      const embed = new MessageEmbed()
        .setTitle('Something went wrong.')
        .setDescription('```' + err.stack + '```')
        .setColor('#c62b1d')
        .setTimestamp(new Date())

      message.channel.send({ embed })
    }
	}
}
