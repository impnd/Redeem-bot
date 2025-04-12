const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');
const path = require('path');
const devConfig = require('./config/devConfig.json');

require('dotenv').config();


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  validationsPath: path.join(__dirname, 'validations'),
  devGuildIds: devConfig.guilds,
  devUserIds: devConfig.users,
  devRoleIds: devConfig.roles,
  skipBuiltInValidations: true,
  bulkRegister: true,
});

client.login(process.env.BOT_TOKEN);