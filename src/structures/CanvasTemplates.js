const Canvas = require("canvas")
module.exports = class CanvasTemplates {
    static async generateProfile({ member, user, avatar, marryWith }, t) {
        const canvas = Canvas.createCanvas(1080, 720)
        const ctx = canvas.getContext("2d")
        ctx.fillStyle = "#6585FF"
        ctx.fillRect(0, 0, canvas.width, canvas.height, true, false)

        ctx.rotate(0.05)
        ctx.fillStyle = "rgb(133, 158, 255)"
        ctx.fillRect(20, canvas.height / 2 + 30, canvas.width + 100, canvas.height, true, false)

        ctx.rotate(-0.05)
        ctx.fillStyle = "#6585FF"
        ctx.roundRect((canvas.width - 30) - 180, canvas.height - 30 - 180, 180, 180, 20, true, false)
        ctx.fillStyle = "rgb(133, 158, 255)"

        let userImg = await Canvas.loadImage(avatar)
        let yen = await Canvas.loadImage("https://cdn.discordapp.com/attachments/504668288798949376/694694476777521202/emoji.png")
        let ring = await Canvas.loadImage("https://cdn.discordapp.com/attachments/504668288798949376/694700468441579580/emoji.png")
        let roundedImage = await ctx.roundImageCanvas(userImg, 250, 250)
        ctx.drawImage(roundedImage, 25, 10, 240, 240)

        ctx.roundRect((canvas.width - 30) - 180, 30, 180, 180, 20, true, false)

        ctx.fillStyle = "#fff"
        ctx.font = "bold 70px Product Sans"
        ctx.fillText(member.tag, 30, 310)

        ctx.textAlign = "center"
        ctx.font = "bold 40px Product Sans"
        ctx.fillText("REP", 962.5, 100)
        ctx.fillText(user.rep, 962.5, 170)
        ctx.fillText("Yens ", 933, 570)
        ctx.drawImage(yen, 983, 523, 60, 60)
        ctx.fillText(user.yens, 962.5, 640)
        if (user.isMarry) {
            ctx.font = "40px Product Sans"
            ctx.textAlign = "left"
            ctx.fillText(`${t("commands:profile.marred")}: ${marryWith.tag}`, 90, 367.5)
            ctx.fillStyle = "#6585FF"
            ctx.fillRect(30, 330, 40, 50, true)
            ctx.drawImage(ring, 20, 320, 55, 55)
        }

        ctx.textAlign = "left"
        ctx.fillStyle = "#fff"
        ctx.font = "bold 50px Product Sans"
        ctx.fillText(`${t("commands:profile.aboutme")}:`, 30, 520)
        ctx.font = "35px Product Sans"
        ctx.fillText(ctx.getLines(user.aboutme, 800).join("\n"), 30, 570)
        return canvas.toBuffer()
    }
}