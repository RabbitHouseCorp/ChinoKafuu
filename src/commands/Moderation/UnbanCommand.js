const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")
module.exports = class UnbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unban',
      category: 'mod',
      aliases: ['desbanir'],
      UserPermission: ["BAN_MEMBERS"],
      ClientPermission: ["BAN_MEMBERS"],
      OnlyDevs: false,
      hidden: false,
    })
  } 
  async run({message, args, server}, t) {
        
    if (!args[0]) return message.chinoReply('error', t('commands:mention-null'))
    let member = await message.guild.fetchBans()
    let ban
    ban = member.find(b => b.username === args[0]) || member.get(args[0].replace(/[!@<>]/g, "")) || member.find(b => b.tag === args[0])
    if (!ban) return message.chinoReply("error", t("commands:unban.not-found"))
    let reason = args.slice(1).join(" ")
    if (!reason) {
      reason = t("commands:no-reason")
    }
    const embed = new RichEmbed()
    .setTitle(t('commands:unban.title', {member: ban.tag}))
    .setColor(this.client.colors.moderation)
    .setThumbnail(ban.displayAvatarURL)
    .addField(t('commands:punishment.embed.memberName'), ban.tag, true)
    .addField(t('commands:punishment.embed.memberID'), ban.id, true)
    .addField(t('commands:punishment.embed.staffName'), message.author.tag, true)
    .addField(t('commands:punishment.embed.reason'), reason, true)

    message.guild.unban(ban.id).then(() => {
      message.channel.send(embed)
    })
  }
}
