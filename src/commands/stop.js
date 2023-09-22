const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: "stop",
  description: "Para a música e limpa a queue",
}

async function run({interaction,client}) {
  const queue = useQueue(interaction.guildId);

  if (!queue || !queue.isPlaying())
    return interaction.reply({
      content: "Não estou tocando nada no momento!",
      epheremal: true,
    });

  queue.delete();

  const embed = new EmbedBuilder()
    .setAuthor({name: '🌀 Queue eliminada!',iconURL:client.user.displayAvatarURL()})
    .setColor("#8e44ad")
    .setFooter({text: `Comando executado por ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({embeds: [embed]});
}

module.exports = { data, run }