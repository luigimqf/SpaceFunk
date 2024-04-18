const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: 'skip',
  description: 'Skip to the next music!',
}

async function run ({interaction,client}) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }
  
  const nextTrack = queue.tracks.toArray()[0];

  if(!nextTrack) return interaction.reply({content: "There's no music in the queue!", epheremal:true});

  const success = queue.node.skip();

  const embed = new EmbedBuilder()
    .setAuthor({name: success ? 'Music skipped!' : '❌ Unable to skip music!',iconURL:client.user.displayAvatarURL()})
    .setColor(success ? '#8e44ad' : '#ff0000').setDescription(success ? `⏭️ Going to music: **${nextTrack.title}**` : '')
    .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  return interaction.reply({embeds: [embed]});
}

module.exports = { data, run };