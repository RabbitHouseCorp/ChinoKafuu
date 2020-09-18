const Command = require("../../structures/command")
const Anilist = require("anilist-node")
const anilist = new Anilist()
const { MessageEmbed } = require("discord.js")
module.exports = class MangaCommand extends Command {
    constructor(client) {
        super(client, {
            name: "manga",
            category: "misc",
            aliases: ["mangá"],
            UserPermission: null,
            ClientPermission: ["EMBED_LINKS"]
        })
    }
    run({ message, args, server }, t) {

        const search = args.join(" ")
        if (!search) return message.chinoReply("error", t("commands:manga.args-null"))

        anilist.search("manga", search).then(async manga => {
            if (!manga.media[0]) return message.chinoReply("error", t("commands:manga.not-found", { args: search }))
            let result = await anilist.media.manga(manga.media[0].id)
            let startDate = {
                year: result.startDate.year ?? "????",
                month: result.startDate.month ?? "??",
                day: result.startDate.day ?? "??"
            }

            let endDate = {
                year: result.endDate.year ?? "????",
                month: result.endDate.month ?? "??",
                day: result.endDate.day ?? "??"
            }

            const characters = []
            if (result.characters) {
                for (const c of result.characters) {
                    characters.push(`${c.name}`)
                }
            }

            if (!characters[0]) characters.push("????")
            const type = result.format.charAt(0).toUpperCase() + result.format.slice(1).toLowerCase()
            const status = result.status.charAt(0).toUpperCase() + result.status.slice(1).toLowerCase()

            const embed = new MessageEmbed()
            embed.setColor(this.client.colors.default)
            embed.setURL(result.siteUrl)
            embed.setTitle(result.title.userPreferred)
            embed.setThumbnail(result.coverImage.large)
            embed.setDescription(result.description.replace(/(<\/b>|<b>|<br>|<Br>|<bR>|<BR>)/g, "\u200B"))
            embed.addField(t("commands:manga.type"), type, true)
            embed.addField(t("commands:manga.status"), status, true)
            embed.addField(t("commands:manga.vols"), result.volumes ?? "??", true)
            embed.addField(t("commands:manga.chapters"), result.chapters ?? "??", true)
            embed.addField(t("commands:manga.score"), result.meanScore, true)
            embed.addField(t("commands:manga.start-and-end"), `${startDate.month}/${startDate.day}/${startDate.year} - ${endDate.month}/${endDate.day}/${endDate.year}`, true)
            embed.addField(t("commands:manga.genres"), result.genres.join(", "), true)
            embed.addField(t("commands:manga.characters"), characters.join(", ").slice(0, 1020), true)

            message.channel.send(embed)
        })
    }
}