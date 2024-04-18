const { ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

async function action({ interaction, client, reply, rows }) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({
      content: "I'm not playing anything!",
      ephemeral: true,
    });
  }

  if (!queue.history.previousTrack)
    return interaction.reply({
      content: "There's no music history",
      ephemeral: true,
    });

  const nextCurrentTrack = queue.history.tracks.data[0];

  queue.history.back();

  const copiedQueue = { ...queue };
  const copiedTracks = [queue.currentTrack, ...copiedQueue.tracks.toArray()];

  const tracks = copiedTracks.map(
    (track, index) =>
      `**${index + 1}**. **[${track.title}](${track.url}) | [${track.author}](${
        track.url
      })** - \`${track.duration}\` - \`${track.requestedBy.username}\``
  );

  const nextSongs =
    copiedTracks.length > 10
      ? `and **${copiedTracks.length - 10}** music(s)...`
      : `**${copiedTracks.length}** in playlist...`;

  const embed = new EmbedBuilder()
    .setColor("#8e44ad")
    .setAuthor({
      name: `Server queue - ${interaction.guild.name}`,
      iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
    })
    .setDescription(
      `▶️ Playing: **[${nextCurrentTrack.title}](${
        nextCurrentTrack.url
      })**\n\n${tracks.slice(0, 10).join("\n")}\n\n${nextSongs}`
    )
    .setFooter({
      text: `Command executed by ${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp()
    .toJSON();

  reply.edit({ embeds: [embed], components: rows });

  return interaction.deferUpdate();
}
const button = new ButtonBuilder()
  .setCustomId("previous")
  .setLabel("Previous")
  .setStyle(ButtonStyle.Primary)
  .setEmoji("1230581278366236693")

module.exports = { action, button, key: "previous" };
