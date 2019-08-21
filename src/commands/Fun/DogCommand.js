const Command = require("../../structures/command")
const NekosLife = require('nekos.life')
const neko = new NekosLife()
const { RichEmbed } = require('discord.js')
module.exports = class DogCommand extends Command {
  constructor (client) {
    super (client, {
      name: 'dog',
      category: 'fun',
      aliases: ['cachorro'],
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      hidden: false
    })
  }
  async execute({message, args, server}, t) {
    let img = await neko.sfw.woof()
    const embed = new RichEmbed()
    .setColor(this.client.colors.action)
    .setDescription('🐶')
    .setImage(img.url)

    message.channel.send(embed)
  }
}