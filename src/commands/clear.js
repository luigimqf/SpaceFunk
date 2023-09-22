const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: "clear",
  description: "Limpa a queue de músicas",
};

async function run({ interaction, client }) {

  const queue = useQueue(interaction.guildId);

  if(!queue || !queue.isPlaying()) return interaction.reply({ content: "Não estou tocando nada no momento", ephemeral: true});

  if(!queue.tracks.toArray()[1]) return interaction.reply({ content: "Não há músicas na queue", ephemeral: true });

  queue.tracks.clear();

  const embed = new EmbedBuilder()
    .setAuthor({name: '🌀 Queue limpa!',iconURL:client.user.displayAvatarURL()})
    .setColor("#8e44ad")
    .setFooter({text: `Comando executado por ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({ embeds: [embed] });
}

module.exports = { data, run };
