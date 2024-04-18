const { useQueue } = require("discord-player");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const data = {
  name: "skipto",
  description: "Skip to a specific music in the queue!",
  options: [
    {
      name: "song",
      description: "Music name or URL to skip to!",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "number",
      description: "Music position in the queue to skip to!",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guild);
  const embed = new EmbedBuilder();

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  const track = interaction.options.getString("song");
  const number = interaction.options.getNumber("number");

  if (!track && !number)
    return interaction.reply({content:"You need to specify a music name or position in the queue!", epheremal: true});

  if(!queue.tracks.toArray()[0]) return interaction.reply({ content: "There's no music in the queue", ephemeral: true });

  if (track) {
    const track_skipTo = queue.tracks
      .toArray()
      .find(
        (x) => x.title.toLowerCase() === track.toLowerCase() || x.url === track
      );
    if (!track_skipTo)
      return interaction.reply({content: "Music not found!", ephemeral: true});

    queue.node.skipTo(track_skipTo);
    embed
      .setAuthor({
        name: "Music skipped!",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`⏭️ Playing now: ${track_skipTo.title}`)
      .setColor("#8e44ad")
      .setFooter({
        text: `Command executed by ${interaction.user.tag}`,
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
