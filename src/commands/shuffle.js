const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: 'shuffle',
  description: 'shuffle musics in the queue!',
}

async function run ({interaction,client}) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  if(!queue.tracks.toArray()[0]) return interaction.reply({ content: "There's no music in the queue!", ephemeral: true });

  queue.tracks.shuffle();

  const embed = new EmbedBuilder()
    .setAuthor({name: '🌀 Queue shuffled!',iconURL:client.user.displayAvatarURL()})
    .setColor("#8e44ad")
    .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({ embeds: [embed] });
}

module.exports = { data, run };