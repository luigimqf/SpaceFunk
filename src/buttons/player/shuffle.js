const { ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const shuffleArray = require("../../utils/shuffleArray");

async function action({ interaction, client, rows }) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({
      content: "I'm not playing anything!",
      ephemeral: true,
    });
  }

  if (!queue.tracks.toArray()[0])
    return interaction.reply({
      content: "There's no music in the queue!",
      ephemeral: true,
    });

  const shuffledTracks = shuffleArray(queue.tracks.toArray());

  queue.clear();

  shuffledTracks.map((track) => queue.addTrack(track));

  const tracks = shuffledTracks.map(
    (track, index) =>
      `**${index + 1}**. **[${track.title}](${track.url}) | [${track.author}](${
        track.url
      })** - \`${track.duration}\` - \`${track.requestedBy.username}\``
  );

  const nextSongs =
    queue.size > 10
      ? `and **${queue.tracks.size - 10}** music(s)...`
      : `**${queue.tracks.size}** in playlist...`;

  const embed = new EmbedBuilder()
    .setColor("#8e44ad")
    .setAuthor({
      name: `Server queue - ${interaction.guild.name}`,
      iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
    })
    .setDescription(
      `▶️ Playing: **[${queue.currentTrack.title}](${
        queue.currentTrack.url
      })**\n\n${tracks.slice(0, 10).join("\n")}\n\n${nextSongs}`
    )
    .setFooter({
      text: `Command executed by ${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp()
    .toJSON();

  return interaction.update({ embeds: [embed], components: rows });
}
const button = new ButtonBuilder()
  .setCustomId("shuffle")
  .setLabel("Shuffle Queue")
  .setStyle(ButtonStyle.Success)
  .setEmoji("1230583261021999145");

module.exports = { action, button, key: "shuffle" };
