const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: "previous",
  description: "Volta para a música anterior",
}

async function run({ interaction, client }) {

  const queue = useQueue(interaction.guildId);

  if(!queue || !queue.isPlaying()) return interaction.reply({ content: "Não estou tocando nada no momento", ephemeral: true});

  if(!queue.history.previousTrack) return interaction.reply({ content: "Não há músicas anteriores", ephemeral: true });

  await queue.history.back();

  const embed = new EmbedBuilder()
    .setAuthor({name:"Voltando para a música anterior",iconURL:client.user.displayAvatarURL()})
    .setColor("#8e44ad")
    .setDescription(`⏮️ Voltando para a música **${queue.currentTrack.title}**`)
    .setFooter({text: `Comando executado por ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({ embeds: [embed] });
}

module.exports = { data, run };