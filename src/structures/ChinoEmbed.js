const { RichEmbed } = require('discord.js');

module.exports = class ChinoEmbed extends RichEmbed {
    constructor(user, data = {}) {
        super(data)
        this.setColor('#6b8dff')
        if (user) this.setFooter(user.tag, user.avatarURL).setTimestamp()
    }
}
