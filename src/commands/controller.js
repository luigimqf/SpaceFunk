const { useMainPlayer, useQueue } = require("discord-player");
const {
  EmbedBuilder,
  Application,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const path = require("path");
const fs = require("fs");
const data = {
  name: "controller",
  description: "Controll the music player!",
};

async function run({ interaction, client }) {

  const buttonsPath = path.resolve(__dirname, "..", "buttons", "player");

  const buttonsFiles = fs.readdirSync(buttonsPath).filter((file) => file.endsWith(".js"));

  const buttons = buttonsFiles.map((file) => require(path.resolve(buttonsPath, file)));

  const components = buttons.map(button => button.button);

  const row = new ActionRowBuilder().addComponents(components);

  const reply = await interaction.reply({
    content: "Controller",
    components: [row],
  });

  const collector = reply.createMessageComponentCollector();

  collector.on("collect", async (i) => {
    const button = buttons.find((button) => button.key === i.customId);

    if (!button) return i.reply({ content: "This button is not implemented yet!", ephemeral: true });

    await button.action({ interaction: i, queue: useMainPlayer(i.guild) });
  });
}

module.exports = { data, run };
