const Canvas = require("canvas")
const Command = require("../../structures/command")
const { MessageAttachment, MessageEmbed } = require("discord.js")
module.exports = class ShipCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ship",
            aliases: ["shippar"],
            category: "social",
            ClientPermission: ["ATTACH_FILES", "EMBED_LINKS"]
        })
    }

    async run({ message, args, server }, t) {
        if (!args[0]) return message.chinoReply("error", t("commands:mention-null"))
        if (!args[1]) return message.chinoReply("error", "usuário secundário não encontrado, tente menciona-lo da próxima vez.")
        let user1 = await this.client.shardManager.getUsers(args[0].replace(/[<@!>]/g, ""))
        let user2 = await this.client.shardManager.getUsers(args[1].replace(/[<@!>]/g, ""))
        let value1 = await this.client.database.Users.findById(user1.id)
        let value2 = await this.client.database.Users.findById(user2.id)
        if (!value1) return message.chinoReply("error", t("commands:mention-null"))
        if (!value2) return message.chinoReply("error", t("commands:mention-null"))
        if (value1.shipValue === "null") {
            value1.shipValue = Math.floor(Math.random() * 55)
            value1.save()
        }
        if (value2.shipValue === "null") {
            value2.shipValue = Math.floor(Math.random() * 55)
            value2.save()
        }
        const canvas = Canvas.createCanvas(1536, 612);
        const ctx = canvas.getContext("2d");
        let image = await Canvas.loadImage(`${user1.displayAvatarURL}?size=2048`.replace("webp", "png"))
        let image2 = await Canvas.loadImage(`${user2.displayAvatarURL}?size=2048`.replace("webp", "png"))
        let heart = await Canvas.loadImage("https://canary.discordapp.com/assets/0483f2b648dcc986d01385062052ae1c.svg")
        let value = Number(value1.shipValue) + Number(value2.shipValue)
        if (Number(value) >= 100) {
            value = 100
        }
        ctx.drawImage(image, 0, 0, 512, 512);
        ctx.drawImage(heart, 578, 60, 380, 380);
        ctx.drawImage(image2, 1024, 0, 512, 512);
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff2b60";
        ctx.strokeStyle = "#ff2b60";

        ctx.font = "small-caps bold 90px sans-serif";
        ctx.strokeText(value.toString() + "%", canvas.width / 2, 512);

        ctx.fillText(value.toString() + "%", canvas.width / 2, 512);
        const width = (value / 100) * canvas.width;
        ctx.fillStyle = "rgba(255,58,101,0.23)";
        ctx.roundRect(
            10,
            canvas.height - 80,
            canvas.width - 20,
            canvas.height - 552,
            30,
            true,
            true
        );
        ctx.fillStyle = "rgba(201,21,40,0.87)";

        ctx.roundRect(
            10,
            canvas.height - 80,
            width - 15,
            canvas.height - 552,
            30,
            true,
            true
        );
        let username1 = user1.username
        let username2 = user2.username
        let mix = `${username1.substring(0, username1.length / 2) + username2.substring(username2.length / 2, username2.length)}`.replace(" ", "")

        let buf = canvas.toBuffer();
        let attachment = new MessageAttachment(buf, "ship.png")
        const embed = new MessageEmbed()
            .setDescription(`\`${username1} + ${username2} = ${mix}\``)
            .attachFiles(attachment)
            .setImage("attachment://ship.png")
            .setColor(this.client.colors.default)

        message.channel.send(embed)
    }
}