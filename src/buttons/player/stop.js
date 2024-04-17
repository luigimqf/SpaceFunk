const { ButtonBuilder, ButtonStyle } = require("discord.js");
const { useQueue } = require("discord-player");

async function action({ interaction}) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.node.isPlaying()) {
    return interaction.reply("I'm not playing anything!", { ephemeral: true });
  }

  const success = queue.delete();

  return interaction.reply(
    { 
      content: success ? "🌀 Queue eliminada!" : "❌ Falha ao eliminar a queue" ,
      ephemeral: true,
    }
  );
}
const button = new ButtonBuilder()
  .setCustomId("stop")
  .setLabel("Stop")
  .setStyle(ButtonStyle.Primary);

module.exports = { action, button, key: "stop"};