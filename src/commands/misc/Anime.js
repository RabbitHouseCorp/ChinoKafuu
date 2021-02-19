const Command = require("../../structures/command")
const malScraper = require("mal-scraper")
const { MessageEmbed } = require("discord.js")
module.exports = class AnimeCommand extends Command {
	constructor(client) {
		super(client, {
			name: "anime",
			category: "misc",
			aliases: [],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"]
		})
	}
	run({ message, args, server }, t) {

		const search = args.join(" ")
		if (!search) return message.chinoReply("error", t("commands:anime.args-null"))

		malScraper.getInfoFromName(search).then(anime => {
			const embed = new MessageEmbed()
				.setThumbnail(anime.picture)
				.setColor(this.client.colors.default)
				.setTitle(t("commands:anime.sinopse"))
				.setDescription(anime.synopsis)
				.addField(t("commands:anime.title"), anime.englishTitle ? anime.englishTitle : anime.japaneseTitle, true)
				.addField(t("commands:anime.type"), anime.type, true)
				.addField(t("commands:anime.episode"), anime.episodes, true)
				.addField(t("commands:anime.rating"), anime.rating, true)
				.addField(t("commands:anime.StartAndEnd"), anime.aired, true)
				.addField(t("commands:anime.score"), anime.score, true)
				.addField(t("commands:anime.status"), anime.scoreStats, true)
				.addField(t("commands:anime.duration"), anime.duration, true)
				.addField(t("commands:anime.rank"), anime.ranked, true)
				.addField(t("commands:anime.popularity"), anime.popularity, true)
				.addField("Trailer", `[${t("commands:click-here")}](${anime.trailer})`, true)
				.addField(t("commands:anime.genres"), `${anime.genres.join(", ")}`, true)

			message.channel.send(embed)
		}).catch((err) => {
			console.log(err.stack)
			message.chinoReply("error", t("commands:anime.NotFound", { args: search }))
		})
	}
}