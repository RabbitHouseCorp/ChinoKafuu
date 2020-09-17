const config = require("../../config.json")
const mongoose = require("mongoose")
mongoose.connect(config.mongoose, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if (err) return console.log(`(x) Error to connecting to database \n${err}`)
	console.log("Successfully connected to database!")
})

let Guild = new mongoose.Schema({
	_id: { type: String },
	prefix: { type: String, default: config.prefix },
	channelReport: { type: String, default: "" },
	reportModule: { type: Boolean, default: false },
	lang: { type: String, default: "en-US" },
	punishChannel: { type: String, default: "" },
	punishModule: { type: Boolean, default: false },
	partner: { type: Boolean, default: false },
	animu: { type: Boolean, default: false },
	animuChannel: { type: String, default: "" },
	antiflood: {
		type: Object,
		default: {
			enabled: false,
			messagesLimit: 5
		}
	}
})

let User = new mongoose.Schema({
	_id: { type: String },
	yens: { type: Number, default: 0 },
	timeDaily: { type: String, default: "000000000000" },
	afk: { type: Boolean, default: false },
	afkReason: { type: String, default: null },
	blacklist: { type: Boolean, default: false },
	blacklistReason: { type: String, default: null },
	aboutme: { type: String, default: "\"A Chino é minha amiga!\" Você pode mudar isto usando k.sobremim" },
	profileColor: { type: String, default: "#6b8dff" },
	isMarry: { type: Boolean, default: false },
	marryWith: { type: String, default: "" },
	rep: { type: Number, default: 0 },
	repTime: { type: String, default: "000000000000" },
	shipValue: { type: String, default: null }
})

let Bot = new mongoose.Schema({
	_id: { type: String },
	maintenance: { type: Boolean, default: false },
	maintenanceReason: { type: String, default: "" }
})

let Guilds = mongoose.model("Guilds", Guild)
module.exports.Guilds = Guilds
let Users = mongoose.model("Users", User)
module.exports.Users = Users
let Bots = mongoose.model("Bots", Bot)
module.exports.Bots = Bots