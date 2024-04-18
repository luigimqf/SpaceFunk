const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: "previous",
  description: "Volta para a música anterior",
}

async function run({ interaction, client }) {

  const queue = useQueue(interaction.guildId);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  if(!queue.history.previousTrack) return interaction.reply({ content: "There's no music history", ephemeral: true });

  await queue.history.back();

  const embed = new EmbedBuilder()
    .setAuthor({name:"Going back to the previous music",iconURL:client.user.displayAvatarURL()})
    .setColor("#8e44ad")
    .setDescription(`⏮️ Previous music **${queue.currentTrack.title}**`)
    .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({ embeds: [embed] });
}

module.exports = { data, run };