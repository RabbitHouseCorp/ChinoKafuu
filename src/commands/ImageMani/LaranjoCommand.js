const Command = require("../../structures/command")
const jimp = require("jimp")
module.exports = class LaranjoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "laranjo",
            category: "image",
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }

    async execute({message, args, server}, t) {
        let img = jimp.read("https://cdn.discordapp.com/attachments/554048737648050179/610011657632219147/laranjo-meme-cke.jpg")
        if (!args[0]) return message.chinoReply("error", t("commands:laranjo.args-null"))
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(685, 494)
                image.print(font, 20, 30, args.join(" "), 600)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "laranjo.png"}]})
                })
            })
        })
    }
}