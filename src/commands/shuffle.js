const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: 'shuffle',
  description: 'Embaralha a fila de músicas!',
}

async function run ({interaction,client}) {
  const queue = useQueue(interaction.guild);

  if(!queue || !queue.isPlaying()) return interaction.reply({ content: "Não estou tocando nada no momento", ephemeral: true});

  if(!queue.tracks.toArray()[0]) return interaction.reply({ content: "Não há músicas na fila", ephemeral: true });

  queue.tracks.shuffle();

  const embed = new EmbedBuilder()
    .setAuthor({name: '🌀 As tracks foram embaralhadas!',iconURL:client.user.displayAvatarURL()})
    .setColor("#8e44ad")
    .setFooter({text: `Comando executado por ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({ embeds: [embed] });
}

module.exports = { data, run };