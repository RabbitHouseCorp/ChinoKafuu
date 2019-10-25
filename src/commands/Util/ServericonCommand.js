const Command = require("../../structures/command")
const Discord = require('discord.js')
const moment = require('moment')
module.exports = class ServericonCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'servericon',
      category: 'util',
      aliases: [],
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      hidden: false,
    })
  }
  run({message, args, server}, t) {

    let guild = this.client.guilds.get(args[0])
    if (!guild) {
      guild = message.guild
    }
    const img = `${guild.iconURL}?size=2048`.replace('jpg',"png")
    const embed = new this.client.Discord.RichEmbed()
    .setImage(img)
    .setColor(this.client.colors.default)
    .setDescription(`[Download](${img})`)

    message.channel.send(embed)

  }
}