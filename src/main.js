const { Client, GatewayIntentBits } = require("discord.js");
const { CommandKit } = require("commandkit");
const path = require("path");
const dotenv = require("dotenv");
const { Player } = require("discord-player");

dotenv.config();

const { TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.config = require('./config')

const player = new Player(client, client.config.opt.discordPlayer);

player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
});

client.login(TOKEN);
