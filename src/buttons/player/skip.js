const { ButtonBuilder, ButtonStyle } = require("discord.js");
const { useQueue } = require("discord-player");

async function action({ interaction}) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.node.isPlaying()) {
    return interaction.reply("I'm not playing anything!", { ephemeral: true });
  }

  const success = queue.node.skip();

  return interaction.reply(
    { 
      content: success ? "Música pulada ✅" : "Failed to skip song! ❌",
      ephemeral: true,
    }
  );
}
const button = new ButtonBuilder()
  .setCustomId("skip")
  .setLabel("Skip")
  .setStyle(ButtonStyle.Primary);

module.exports = { action, button, key: "skip"};