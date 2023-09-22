const { useMainPlayer, useQueue, usePlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: "pause",
  description: "Pausa a música atual!",
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guild);

  if(!queue) return interaction.reply({content: "Não estou tocando nada no momento!", epheremal: true});

  if(queue.node.isPaused()) return interaction.reply({content: "⏸️ A música já está pausada!", epheremal: true});

  const success = queue.node.setPaused(true);

  const embed = new EmbedBuilder()
    .setAuthor({name: success ? '⏸️ Música pausada! ' : '❌ Não foi possível pausar a música!',iconURL:client.user.displayAvatarURL()})
    .setColor(success ? '#8e44ad' : '#ff0000')
    .setFooter({text: `Comando executado por ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  return interaction.reply({embeds: [embed]});

}

module.exports = { data, run };
