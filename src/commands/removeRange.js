const { useQueue } = require("discord-player");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const data = {
  name: "remove-range",
  description: "Remove a range of songs from the queue!",
  options: [
    {
      name: "initial",
      description: "Initial position in the queue to remove",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "final",
      description: "End position in the queue to remove",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guild);
  const embed = new EmbedBuilder();

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  const rangeInitial = interaction.options.getNumber("initial");
  const rangeEnd = interaction.options.getNumber("final");

  if (!rangeInitial && !rangeEnd)
  return interaction.reply({
    content: "You need to specify the initial and final position in the queue!",
    epheremal: true,
  });

  if(!queue.tracks.toArray()[1]) return interaction.reply({ content: "There's no music in the queue", ephemeral: true });

  const tracks_to_remove = queue.tracks
    .toArray()
    .slice(rangeInitial - 1, rangeEnd - 1);

  if (!tracks_to_remove)
    return interaction.reply("Unable to find the musics in the queue!");

    tracks_to_remove.map((track) => {
    queue.removeTrack(track);
    })

  embed
    .setAuthor({
      name: "Range of songs removed!",
      iconURL: client.user.displayAvatarURL(),
    })
    .setDescription(`⏭️ Removed songs: **${tracks_to_remove.length}**`)
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

module.exports = { data, run };
