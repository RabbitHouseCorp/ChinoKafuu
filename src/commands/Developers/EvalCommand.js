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
    run({message, args, server}, t) {
            try {
      // eslint-disable-next-line no-eval
      const evaluated = await Promise.resolve(eval(code))

      message.channel.send(inspect(evaluated, { depth: 0 }), { code: 'js' })
    } catch (err) {
      const embed = new RichEmbed()
        .setTitle('Something went wrong.')
        .setDescription('```' + err.stack + '```')
        .setColor('#FF0000')
        .setTimestamp(new Date())

      message.channel.send({ embed })
    }
  }
    }
}
