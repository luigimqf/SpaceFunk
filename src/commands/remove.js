const { useQueue } = require("discord-player");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const data = {
  name: "remove",
  description: "Remove uma música da fila!",
  options: [
    {
      name: "song",
      description: "O nome/url da música que você deseja remover",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "number",
      description: "A posição da música na fila",
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
    return interaction.reply({content:"Você precisa especificar a posição na fila ou nome da música!", epheremal: true});

  if (track) {
    const track_to_remove = queue.tracks
      .toArray()
      .find(
        (x) => x.title.toLowerCase() === track.toLowerCase() || x.url === track
      );
    if (!track_to_remove)
      return interaction.reply("Não encontrei essa música na fila!");

    queue.removeTrack(track_to_remove);
    embed
      .setAuthor({
        name: "Música removida",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`⏭️ Música removida: **${track_to_remove.title}**`)
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

    queue.removeTrack(indexTrack);
    embed
      .setAuthor({
        name: "Música removida",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`⏭️ Música removida: **${indexTrack.title}**`)
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
