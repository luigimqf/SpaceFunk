const { useQueue } = require("discord-player");
const { ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

async function action({ interaction, client, reply, rows }) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({
      content: "I'm not playing anything!",
      ephemeral: true,
    });
  }

  const nextTrack = queue.tracks.toArray()[0];

  if (!nextTrack)
    return interaction.reply({
      content: "There's no music in the queue",
      ephemeral: true,
    });

  queue.node.skip();

  const copiedQueue = { ...queue };
  const copiedTracks = [...copiedQueue.tracks.toArray()];
  const nextCurrentTrack = copiedTracks.shift();

  const tracks = copiedTracks.map(
    (track, index) =>
      `**${index + 1}**. **[${track.title}](${track.url}) | [${track.author}](${
        track.url
      })** - \`${track.duration}\` - \`${track.requestedBy.username}\``
  );

  const nextSongs =
    copiedQueue.tracks.size > 10
      ? `and **${copiedQueue.tracks.size - 1 - 10}** music(s)...`
      : `**${copiedQueue.tracks.size - 1}** in playlist...`;

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

  return interaction.update({ embeds: [embed], components: rows });

}

const button = new ButtonBuilder()
  .setCustomId("skip")
  .setLabel("Skip")
  .setStyle(ButtonStyle.Primary)
  .setEmoji("1230581263983837254");

module.exports = { action, button, key: "skip" };
