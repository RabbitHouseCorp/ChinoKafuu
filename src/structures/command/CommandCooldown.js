module.exports = class CommandCooldown {
    constructor() {
        this.users = new Map()
    }

    addUser(id, time) {
        if (time === 0) {
            return
        }
        const users = this.users
        this.users.set(id, {
            userID: id,
            timeSet: time + Date.now(),
            timeout: setTimeout(function() {
                clearTimeout(users.get(id).timeout)
                users.delete(id)
            }, time),
            locked: true,
            delete: function() {
                clearTimeout(this.users.get(id).timeout)
                return this.users.delete(users)
            }
        })        
    }

    removeUser(id) {
        return this.users.get(id).delete()
    }
}