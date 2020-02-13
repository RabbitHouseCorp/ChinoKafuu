const lavalinkManager = require('../lavalink/lavalinkManager');
const DBL = require('dblapi.js');

const STATUS = require('../structures/status.json').status;

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  replaceStatus(status = 'café é a minha bebida favorita.') {
    const { guilds, users, config } = this.client;
    return status
      .replace(/{users}/gi, users.size)
      .replace(/{guilds}/gi, guilds.size)
      .replace(/{prefix}/gi, config.prefix);
  }

  async run() {
    console.log(`${this.client.user.username} has be connected to Discord`);

    const dbl = new DBL(this.client.config.dbltoken, this.client);
    dbl.on('posted', () => console.log('Connected to DBL'));

    this.client.owner = await this.client.fetchUser('395788326835322882');
    this.client.lavalinkManager = new lavalinkManager(this.client);

    const changePresence = () => {
      const presence = STATUS.sort(() => (Math.random() > 0.5 ? -1 : 1))[0];
      this.client.user.setPresence({
        game: {
          ...presence,
          name: this.replaceStatus(presence.name)
        }
      });
    };

    changePresence();
    setInterval(() => changePresence, 30000);
  }
};
