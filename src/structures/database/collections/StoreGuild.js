const mongoose = require('mongoose')
const StoreGuild = new mongoose.Schema({
    time: {type: Number, default: 0},
    end: {type: Number, default: 0},
    id: {type: String, default: ''},
    id_hash: {type: String, default: ''},
    name: {type: String, default: ''},
    type: {type: Number, default: 0},
    functions: {type: Object, default: []},
    price_yens: {type: Number, default: 0},
    price_cubes: {type: Number, default: 0},
    disabled: {type: Boolean, default: 0},
    notification: {type: String, default: ''},
    tax: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    inventory: {type: Number, default: 0},
    users: {type: Object, default: []},
    roles: {type: Object, default: []},
    role_marketplace: {type: Object, default: []},

})

module.exports = mongoose.model('StoreGuild', StoreGuild)
