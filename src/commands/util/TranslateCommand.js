const Command = require("../../structures/command")
const request = require("request")
module.exports = class TranslateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "translate",
            aliases: ["traduzir"],
            category: "util"
        })
    }

    run({ message, args, server }, t) {
     
        if (!args[1]) return message.chinoReply("error", t("commands:translate.args-null"))
        let url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${args[0]}&dt=t&q=${args.slice(1).join("+")}&ie=UTF-8&oe=UTF-8`
        request(encodeURI(url), function (err, response, body) {
            if (err) {
                args[0] = "en"
            }
            let translateMatch = body.match(/^\[\[\[".+?",/)[0]
            translateMatch = translateMatch.substring(4, translateMatch.length - 2)
            let translate = `${translateMatch}`.split("\\n").join(" ")
            message.chinoReply("map", translate)
        })
    }
}