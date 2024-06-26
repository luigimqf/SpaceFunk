const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const createQueueButton = require("../utils/createQueueButtons");
const durationToSeconds = require("../utils/durationToSeconds");
const secondsToTimerString = require("../utils/secondsToTimerString");

const data = {
  name: "queue",
  description: "Shows musics in queue!",
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guildId);
  secondsToTimerString;
  if (!queue || !queue.isPlaying()) {
    return interaction.reply({
      content: "I'm not playing anything!",
      ephemeral: true,
    });
  }

  if (!queue.tracks.toArray()[0])
    return interaction.reply({
      content: "There's no music in the queue!",
      epheremal: true,
    });

  const songs = queue.tracks.size;
  const nextSongs =
    songs > 10
      ? `and **${songs - 10}** music(s)...`
      : `**${songs}** in playlist...`;

  const tracks = queue.tracks
    .toArray()
    .map(
      (track, index) =>
        `**${index + 1}**. **[${track.title}](${track.url}) | [${
          track.author
        }](${track.url})** - \`${track.duration}\` - \`${
          track.requestedBy.username
        }\``
    );

  const queueDurationInSeconds = queue.tracks.toArray().reduce(
    (acc, track) => acc + durationToSeconds(track.duration),
    durationToSeconds(queue.currentTrack.duration)
  );
  const formatedQueueDuration = secondsToTimerString(queueDurationInSeconds);

  const { rows, buttons } = createQueueButton();

  const embed = new EmbedBuilder()
    .setColor("#8e44ad")
    .setAuthor({
      name: `Server queue - ${interaction.guild.name}`,
      iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
    })
    .setDescription(
      `▶️ Playing: **[${queue.currentTrack.title}](${queue.currentTrack.url}) | [${queue.currentTrack.author}](${
        queue.currentTrack.url
      })** - \`${queue.currentTrack.duration}\` - \`${queue.currentTrack.requestedBy.username}\`\n\n${tracks.slice(0, 10).join("\n")}\n\n\`${formatedQueueDuration}\`\n\n${nextSongs}`
    )
    .setFooter({
      text: `Command executed by ${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp()
    .toJSON();

  const reply = await interaction.reply({ embeds: [embed], components: rows });

  const collector = reply.createMessageComponentCollector();

  collector.on("collect", async (i) => {
    const button = buttons.find((button) => button.key === i.customId);

    if (!button)
      return i.reply({ content: "Button not implemented!", ephemeral: true });

    await button.action({ interaction: i, client });
  });
}

module.exports = { data, run };
