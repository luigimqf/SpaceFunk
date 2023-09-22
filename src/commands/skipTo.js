const { useQueue } = require("discord-player");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const data = {
  name: "skipto",
  description: "Pula para a música desejada!",
  options: [
    {
      name: "song",
      description: "the name/url of the track you want to skip to",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "number",
      description: "the place in the queue the song is in",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guild);
  const embed = new EmbedBuilder();

  if (!queue || !queue.isPlaying())
    return interaction.reply({content: "Não estou tocando nada no momento!", epheremal: true});

  const track = interaction.options.getString("song");
  const number = interaction.options.getNumber("number");

  if (!track && !number)
    return interaction.reply({content:"Você precisa especificar o número ou nome da música!", epheremal: true});

  if (track) {
    const track_skipTo = queue.tracks
      .toArray()
      .find(
        (x) => x.title.toLowerCase() === track.toLowerCase() || x.url === track
      );
    if (!track_skipTo)
      return interaction.reply("Não encontrei essa música na fila!");

    queue.node.skipTo(track_skipTo);
    embed
      .setAuthor({
        name: "Música pulada",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`⏭️ Tocando agora: ${track_skipTo.title}`)
      .setColor("#8e44ad")
      .setFooter({
        text: `Comando executado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .toJSON();

    return interaction.reply({
      embeds: [embed],
    });
  }

  if (number) {
    const indexNumber = number - 1;

    const indexTrack = queue.tracks.toArray()[indexNumber];

    if (!indexTrack.title)
      return interaction.reply("Não encontrei essa música na fila!");

    queue.node.skipTo(indexTrack);
    embed
      .setAuthor({
        name: "Música pulada",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`⏭️ Tocando agora: **${indexTrack.title}**`)
      .setColor("#8e44ad")
      .setFooter({
        text: `Comando executado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .toJSON();
    return interaction.reply({
      embeds: [embed],
    });
  }
}

module.exports = { data, run };
