module.exports = class Command {
    constructor(client, options) {
        this.client = client;

        this.config = {
            name: options.name || null,
            category: options.category || "util",
            aliases: options.aliases || [],
            UserPermission: options.UserPermission || null,
            ClientPermission: options.ClientPermission || null,
            OnlyDevs: options.OnlyDevs || false,
            hidden: false
        }
    }

    setT (t) {
        this.config.t = t
    }
  
    getT() {
        return this.config.t
    }
}