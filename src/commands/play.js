const { useMainPlayer } = require("discord-player");
const {
  EmbedBuilder,
  Application,
  ApplicationCommandOptionType,
} = require("discord.js");

const data = {
  name: "play",
  description: "Play a song!",
  options: [
    {
      name: "query",
      description: "Music URL or search query",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

async function run({ interaction, client }) {
  const player = useMainPlayer();

  const channel = interaction.member.voice.channel;

  if (!channel) return interaction.reply({content: "Try joining a voice channel first!", ephemeral: true});

  const query = interaction.options.getString("url", true);

  const embed = new EmbedBuilder()
    .setAuthor({ name: "Loading music(s)..." })
    .setColor("#8e44ad");

  const reply = await interaction.reply({ embeds: [embed] });

  try {
    const { track } = await player.play(channel, query, {
      requestedBy: interaction.user,
    });

    if (track.playlist) {
      embed
        .setAuthor({
          name: `Playlist added to queue!`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `▶️ Added to queue: **${track.playlist.tracks.length} musics** `
        )
        .setFooter({
          text: `Command executed by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp()
        .toJSON();
      await reply.edit({ embeds: [embed] });
      return;
    }

    embed
      .setAuthor({
        name: `Music added to queue!`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(track.thumbnail)
      .setDescription(`▶️  Added to queue: **${track.title}**`)
      .setFooter({
        text: `Command executed by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .toJSON();
      
    await reply.edit({ embeds: [embed] });
    return;
  } catch (error) {
    embed
      .setAuthor({
        name: `Failed to play music!`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`❌ An error occurred`)
      .setFooter({
        text: `Command executed by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .toJSON();
    await reply.edit({ embeds: [embed] });
    return;
  }
}

module.exports = { data, run };
