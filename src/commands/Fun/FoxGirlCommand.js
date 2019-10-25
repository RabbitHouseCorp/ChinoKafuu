const Command = require("../../structures/command")
const NekosLife = require('nekos.life')
const neko = new NekosLife()
const { RichEmbed } = require('discord.js')
module.exports = class FoxGirlCommand extends Command {
  constructor (client) {
    super (client, {
      name: 'foxgirl',
      category: 'fun',
      aliases: [],
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      hidden: false
    })
  }
  async run({message, args, server}, t) {
    let img = await neko.sfw.foxGirl()
    const embed = new RichEmbed()
    .setColor(this.client.colors.action)
    .setDescription('<:FoxHey:586743909066211328>')
    .setImage(img.url)

    message.channel.send(embed)
  }
}