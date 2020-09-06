const i18next = require("i18next");

module.exports = class ChinoAntiFlood {
    constructor(client) {
        this.client = client;

        this.users = new Map()
        this.messagesLimit = 5;
    }
    test({ message, server }, t) {
        if (server.antiflood.enabled) {

            let user = this.users.get(message.author.id)
            if (user) {

                this.check({ message, server }, t)
                user.messages = user.messages + 1

            } else {
                this.users.set(message.author.id, {
                    messages: 1,
                })
            }
            setTimeout(() => {
                this.remove(message.author.id)
            }, 10000)
        }
    }

    check({ message, server }, t) {
        let user = this.users.get(message.author.id)
        t = i18next.getFixedT(server.lang)
        if (user) {
            if (user.messages >= server.antiflood.messagesLimit - 1) {
                message.chinoReply("chino_pout", t("events:antiflood.message"))
                user.warned = true;
                this.remove(message.author.id)
            }
        }
    }

    remove(id) {
        let user = this.users.get(id)
        if (user) {
            this.users.delete(id)
        }
    }
} 