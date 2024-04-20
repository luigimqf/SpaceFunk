const { useQueue } = require("discord-player");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const data = {
  name: "remove",
  description: "Remove a specific music from the queue!",
  options: [
    {
      name: "query",
      description: "The name/URL of the song to remove",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "number",
      description: "Music position in the queue to remove",
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

  const track = interaction.options.getString("query");
  const number = interaction.options.getNumber("number");

  if (!track && !number)
    return interaction.reply({content:"You need to specify the queue position or song name!", epheremal: true});

  if(!queue.tracks.toArray()[0]) return interaction.reply({ content: "There's no music in the queue", ephemeral: true });
  
  if (track) {
    const track_to_remove = queue.tracks
      .toArray()
      .find(
        (x) => x.title.toLowerCase() === track.toLowerCase() || x.url === track
      );
    if (!track_to_remove)
      return interaction.reply("Music not found!");

    queue.removeTrack(track_to_remove);
    embed
      .setAuthor({
        name: "Remove music",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`⏭️ Music removed: **${track_to_remove.title}**`)
      .setColor("#8e44ad")
      .setFooter({
        text: `Command executed by: ${interaction.user.tag}`,
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
      return interaction.reply("Music not found!");

    queue.removeTrack(indexTrack);
    embed
      .setAuthor({
        name: "Remove music",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`⏭️ Music removed: **${indexTrack.title}**`)
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
}

module.exports = { data, run };
