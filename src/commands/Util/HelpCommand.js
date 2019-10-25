const Command = require("../../structures/command")
const Discord = require('discord.js')
module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'help',
        category: 'util',
        aliases: ['ajuda'],
        UserPermission: null,
        clientPermission: null,
        OnlyDevs: false,
        hidden: false,
    })
  } 
  run({message, args, server}, t) {
    let util = this.client.commands.filter(c => c.config.category === "util")
    let mod = this.client.commands.filter(c => c.config.category === 'mod')
    let fun = this.client.commands.filter(c => c.config.category === 'fun')
    let music = this.client.commands.filter(c => c.config.category === 'music')
    let minecraft = this.client.commands.filter(c => c.config.category === 'minecraft')
    let misc = this.client.commands.filter(c => c.config.category === 'random')
    let image = this.client.commands.filter(c => c.config.category === "image")
    let social = this.client.commands.filter(c => c.config.category === "social")
    const embed = new Discord.RichEmbed()
    embed.setColor(this.client.colors.default)
    embed.setThumbnail(this.client.user.displayAvatarURL)
    embed.addField(`${t('commands:help.util')} (${util.size})`, util.map(c => `\`${server.prefix}${c.config.name}\``).join(', '))
    embed.addField(`${t('commands:help.moderation')} (${mod.size})`, mod.map(c => `\`${server.prefix}${c.config.name}\``).join(', '))
    embed.addField(`${t('commands:help.fun')} (${fun.size})`, fun.map(c => `\`${server.prefix}${c.config.name}\``).join(', '))
    embed.addField(`${t("commands:help.image")} (${image.size})`, image.map(c => `\`${server.prefix}${c.config.name}\``).join(", "))
    embed.addField(`${t('commands:help.music')} (${music.size})`, music.map(c => `\`${server.prefix}${c.config.name}\``).join(', '))
    embed.addField(`${t('commands:help.minecraft')} (${minecraft.size})`, minecraft.map(c => `\`${server.prefix}${c.config.name}\``).join(', '))
    embed.addField(`${t('commands:help.misc')} (${misc.size})`, misc.map(c => `\`${server.prefix}${c.config.name}\``).join(', '))
    embed.addField(`${t("commands:help.social")} (${social.size})`, social.map(c => `\`${server.prefix}${c.config.name}\``).join(', '))
    embed.addBlankField(true)
    embed.addField(t('commands:help.addUrl'), t('commands:help.inUrl'))

    message.author.send(embed).then(() => {
      message.reply(t('commands:sendDM'))
    }).catch(() => {
      message.chinoReply("error", t('commands:dmClosed'))
    })
  }
}