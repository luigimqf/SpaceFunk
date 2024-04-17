const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const data = {
  name: 'skip',
  description: 'Pula a música atual!',
}

async function run ({interaction,client}) {
  const queue = useQueue(interaction.guild);

  if(!queue) return interaction.reply({content: "Não estou tocando nada no momento!", epheremal: true});
  
  const nextTrack = queue.tracks.toArray()[0];

  if(!nextTrack) return interaction.reply({content: "Não há músicas na fila!", epheremal:true});

  const success = queue.node.skip();

  const embed = new EmbedBuilder()
    .setAuthor({name: success ? 'Música pulada!' : '❌ Não foi possível pular a música!',iconURL:client.user.displayAvatarURL()})
    .setColor(success ? '#8e44ad' : '#ff0000').setDescription(success ? `⏭️ Indo para a música: **${nextTrack.title}**` : '')
    .setFooter({text: `Comando executado por ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  return interaction.reply({embeds: [embed]});
}

module.exports = { data, run };