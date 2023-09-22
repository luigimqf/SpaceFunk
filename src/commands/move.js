const { useQueue } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

const data = {
  name: "move",
  description: "Move uma música na fila",
  options: [
    {
      name: "song",
      description: "Posição da música na fila",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "position",
      description: "Nova posição da música na fila",
      type: ApplicationCommandOptionType.Number,
      required: true,
    }
  ]
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guildId);

  if (!queue || !queue.isPlaying())
    return interaction.reply({
      content: "Não estou tocando nada no momento!",
      epheremal: true,
    });

  if (!queue.tracks.toArray()[0])
    return interaction.reply({
      content: "Não há músicas na queue",
      epheremal: true,
    });

  const song = queue.tracks.toArray()[interaction.options.getNumber("song") - 1];

  if (!song)
    return interaction.reply({
      content: "Não encontrei essa música na queue",
      epheremal: true,
    });

  const newPosition = interaction.options.getNumber("position");

  if (newPosition < 1 || newPosition > queue.tracks.length)
    return interaction.reply({
      content: "Posição inválida",
      epheremal: true,
    });

  queue.moveTrack(song, newPosition - 1);

  const embed = new EmbedBuilder()
    .setAuthor({name: 'Posições alteradas',iconURL:client.user.displayAvatarURL()})
    .setDescription(`Música **${song.title}** movida para a posição **${newPosition}**`)
    .setThumbnail(song.thumbnail)
    .setColor('#8e44ad')
    .setFooter({text: `Comando executado por ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  return interaction.reply({embeds: [embed]});
}

module.exports = { data, run };