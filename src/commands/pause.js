const { useMainPlayer, useQueue, usePlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: "pause",
  description: "Pause the current music!",
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  if(queue.node.isPaused()) return interaction.reply({content: "⏸️ Music already paused!", epheremal: true});

  const success = queue.node.setPaused(true);

  const embed = new EmbedBuilder()
    .setAuthor({name: success ? '⏸️ Music paused ' : '❌ Unable to pause the music!',iconURL:client.user.displayAvatarURL()})
    .setColor(success ? '#8e44ad' : '#ff0000')
    .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  return interaction.reply({embeds: [embed]});

}

module.exports = { data, run };
