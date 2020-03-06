const { Message } = require("discord.js")
const emotes = require("./structures/emotes")
const { CanvasRenderingContext2D } = require("canvas")
module.exports = class ProtoTypes {
	static start() {
		Message.prototype.chinoReply = async function send(emoji, message, ...args) {

			emoji = emotes[emoji]
			return this.channel.send(`${emoji ? emoji : "🐛"} **|** ${this.author}, ${message}`, ...args)
		}

		CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, width, height, radius, fill, stroke) {
			if (typeof stroke === "undefined") {
				stroke = true
			}
			if (typeof radius === "undefined") {
				radius = 5
			}
			if (typeof radius === "number") {
				radius = { tl: radius, tr: radius, br: radius, bl: radius }
			} else {
				var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
				for (var side in defaultRadius) {
					radius[side] = radius[side] || defaultRadius[side]
				}
			}
			this.beginPath()
			this.moveTo(x + radius.tl, y)
			this.lineTo(x + width - radius.tr, y)
			this.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
			this.lineTo(x + width, y + height - radius.br)
			this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
			this.lineTo(x + radius.bl, y + height)
			this.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
			this.lineTo(x, y + radius.tl)
			this.quadraticCurveTo(x, y, x + radius.tl, y)
			this.closePath()
			if (fill) {
				this.fill()
			}
			if (stroke) {
				this.stroke()
			}

		}

	}
}
