const { useQueue } = require("discord-player");
const { ButtonBuilder, ButtonStyle } = require("discord.js");

async function action({ interaction }) {
  const queue = useQueue(interaction.guild);
  
  if(!queue) return interaction.reply({content: "Não estou tocando nada no momento!", epheremal: true});

  if(queue.node.isPaused()) return interaction.reply({content: "⏸️ A música já está pausada!", epheremal: true});

  const success = queue.node.setPaused(true);

  return interaction.reply(
    {
      content: success ? "⏸️ Música pausada!" : "❌ Não foi possível pausar a música",
      ephemeral: true,
    }
  );
}
const button = new ButtonBuilder()
  .setCustomId("pause")
  .setLabel("Pause")
  .setStyle(ButtonStyle.Primary);

module.exports = { action, button, key: "pause"};