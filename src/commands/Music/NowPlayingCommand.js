const Command = require("../../structures/command")
const { RichEmbed } = require("discord.js")
const moment = require("moment")
let youtube = require("youtube-info")
require("moment-duration-format")
module.exports = class NowPlayingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "nowplaying",
            category: "music",
            aliases:["playingnow", "np"],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }

    execute({message, args, server}, t) {

        if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:dj-module.queue-null"))
        if (!this.client.player.get(message.guild.id).nowPlaying) return message.chinoReply("error", t("commands:dj-module.queue-null"))
        if (!message.member.voiceChannel) return message.chinoReply('error', t('commands:dj-module.channel-null'))
        if (message.guild.me.voiceChannel && message.member.voiceChannel !== message.guild.me.voiceChannel) return message.chinoReply('error', t('commands:dj-module.another-channel'))
        message.channel.send(t("commands:np.waiting")).then(msg => {
            youtube(this.client.player.get(message.guild.id).nowPlaying.identifier).then(info => {
                let start = moment.duration(this.client.player.get(message.guild.id).player.state.position).format("dd:hh:mm:ss")
                let end = moment.duration(this.client.player.get(message.guild.id).nowPlaying.length).format("dd:hh:mm:ss")
                let volume = `${this.client.player.get(message.guild.id).player.state.volume}/150`
                const embed = new RichEmbed()
                .setColor(this.client.colors.default)
                .setURL(info.url)
                .setThumbnail(info.thumbnailUrl)
                .setTitle(t("commands:np.nowplaying"))
                .addField(t("commands:np.name"), info.title)
                .addField(t("commands:np.time"), `${start}/${end}`)
                .addField(t("commands:np.volume"), volume)
                .addField(t("commands:np.url"), info.url)

                msg.edit(embed)
            })
        })
    }
}