const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(
  config.mongoose,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err)
      return console.log(
        `(x) Não consegui me conectar no banco de dados \n${err.stack}`
      );
    console.log('(>) Eu me conectei no meu banco de dados!');
  }
);

const Guild = new mongoose.Schema({
  _id: { type: String },
  prefix: { type: String, default: config.prefix },
  channelReport: { type: String, default: '' },
  reportModule: { type: Boolean, default: false },
  lang: { type: String, default: 'en-US' },
  commandNull: { type: Boolean, default: false },
  punishChannel: { type: String, default: '' },
  punishModule: { type: Boolean, default: false },
  partner: { type: Boolean, default: false }
});

const User = new mongoose.Schema({
  _id: { type: String },
  yens: { type: Number, default: 0 },
  timeDaily: { type: String, default: '000000000000' },
  afk: { type: Boolean, default: false },
  afkReason: { type: String, default: null },
  blacklist: { type: Boolean, default: false },
  blacklistReason: { type: String, default: null },
  aboutme: {
    type: String,
    default: '"A Chino é minha amiga!" Você pode mudar isto usando k.sobremim'
  },
  profileColor: { type: String, default: '#6b8dff' },
  isMarry: { type: Boolean, default: false },
  marryWith: { type: String, default: 'Com ninguém' },
  rep: { type: Number, default: 0 },
  repTime: { type: String, default: '000000000000' }
});

const Guilds = mongoose.model('Guilds', Guild);
const Users = mongoose.model('Users', User);

exports.Guilds = Guilds;
exports.Users = Users;
