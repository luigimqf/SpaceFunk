const { useQueue } = require("discord-player");
const { ButtonBuilder, ButtonStyle } = require("discord.js");

async function action({ interaction }) {
  const queue = useQueue(interaction.guild);
  
  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  if(!queue.node.isPaused()) return interaction.reply({
    content: "▶️ Music is already playing",
    ephemeral: true,
  });


  queue.node.setPaused(false);

  return interaction.deferUpdate();
}
const button = new ButtonBuilder()
  .setCustomId("resume")
  .setLabel("Resume")
  .setStyle(ButtonStyle.Primary)
  .setEmoji("1230634084099952682")

module.exports = { action, button, key: "resume"};