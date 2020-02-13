const Command = require("../../structures/command.js")

class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      category: "fun",
      aliases: ["rolldice', 'dice"],
      UserPermission: null,
      ClientPermission: null
    })
  }
  run({ message, args }, t) {
    const numbers = [1, 2, 3, 4, 5, 6]
    const result = numbers[Math.floor(Math.random() * numbers.length)]
    message.chinoReply("dice", result)
  }
}

module.exports = RollCommand;