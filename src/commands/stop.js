const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: "stop",
  description: "Destroy the queue!",
}

async function run({interaction,client}) {
  const queue = useQueue(interaction.guildId);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  queue.delete();

  const embed = new EmbedBuilder()
    .setAuthor({name: '🌀 Queue purged!',iconURL:client.user.displayAvatarURL()})
    .setColor("#8e44ad")
    .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({embeds: [embed]});
}

module.exports = { data, run }