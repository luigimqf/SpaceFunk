const { ButtonBuilder, ButtonStyle } = require("discord.js");
const { useQueue } = require("discord-player");

async function action({ interaction, client, reply, rows }) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  queue.delete();

  return interaction.reply(
    { 
      content:"🌀 Queue eliminated!",
      ephemeral: true,
    }
  );
}
const button = new ButtonBuilder()
  .setCustomId("stop")
  .setLabel("Stop")
  .setStyle(ButtonStyle.Danger)
  .setEmoji("1230581199718580324")

module.exports = { action, button, key: "stop"};