require('dotenv').config()

const PluginManager = require('./src/utils/plugins/PluginManager');
const DatabaseStore = require('./src/utils/plugins/store/DatabaseStore');
const BotStore = require('./src/utils/plugins/store/BotStore');
const LavalinkStore = require('./src/utils/plugins/store/LavalinkStore');

// BotStore
const pluginManager = new PluginManager()


pluginManager.addPlugins(
  new DatabaseStore(),
  new LavalinkStore(),
  new BotStore(),
)