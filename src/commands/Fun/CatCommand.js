const Command = require("../../structures/command")
const NekosLife = require('nekos.life')
const neko = new NekosLife()
const { RichEmbed } = require('discord.js')
module.exports = class CatCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'cat',
      category: 'fun',
      aliases: ['gato', 'kitty'],
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      hidden: false
    }) 
  }
  async run({message, args, server}, t) {
    let img = await neko.sfw.meow()
    const embed = new RichEmbed()
    .setColor(this.client.colors.action)
    .setDescription('🐱')
    .setImage(img.url)
    
    message.channel.send(embed)
  }
}