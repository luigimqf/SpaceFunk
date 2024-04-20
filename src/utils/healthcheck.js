const { Client } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const { TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

function healthCheck() {
  const guild = client.guilds.cache.size;

  if (guild === 0) {
    console.error("No guilds found. Exiting...");
    return false;
  }

  return true;
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  healthCheck();
});

client.login(TOKEN);
