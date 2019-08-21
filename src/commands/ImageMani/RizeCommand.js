const Command = require("../../structures/command")
const jimp = require("jimp")
module.exports = class RizeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rize",
            category: "image",
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }

    async execute({message, args, server}, t) {
        let img = jimp.read('https://cdn.discordapp.com/attachments/554048737648050179/591089188464492544/rize_tedeza__gochuumon_wa_usagi_desu_ka___by_sylvestriz_dcdv3a3-pre.png')
        if (!args[0]) return message.chinoReply("error", t("commands:rize.args-null"))
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(1192, 670)
                image.print(font, 260, 110, args.join(" "), 400)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "rize.png"}]})
                })
            })
        })
    }
}