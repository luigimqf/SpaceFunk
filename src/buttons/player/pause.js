const { useQueue } = require("discord-player");
const { ButtonBuilder, ButtonStyle } = require("discord.js");

async function action({ interaction }) {
  const queue = useQueue(interaction.guild);
  
  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  if(queue.node.isPaused()) return interaction.reply({
    content: "⏸️ Music already paused!",
    ephemeral: true,
  });

  queue.node.setPaused(true);

  return interaction.deferUpdate();
}
const button = new ButtonBuilder()
  .setCustomId("pause")
  .setLabel("Pause")
  .setStyle(ButtonStyle.Primary)
  .setEmoji("1230581248938872964")

module.exports = { action, button, key: "pause"};