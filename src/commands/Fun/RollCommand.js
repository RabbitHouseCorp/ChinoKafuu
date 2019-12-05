const Command = require("../../structures/command.js")

class RollCommand extends Command {
  constructor(client) {
    super(clent, {
      name: "roll",
      category: "fun",
      aliases: ["rolldie', 'die"],
      UserPermission: null,
      ClientPermission: null
    })
  }
  async run ({message, args}, t) {
    let numbers = ["1, 2, 3, 4, 5, 6"]
    let result = numbers[Math.floor(Math.random()*numbers.length)]
    message.channel.send("🎲 | " + result)
  }
}