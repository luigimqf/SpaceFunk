const { useQueue } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

const data = {
  name: "move",
  description: "Move a song in the queue to a new position!",
  options: [
    {
      name: "current-position",
      description: "Music number in the queue to move",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "new-position",
      description: "New position in the queue for the music",
      type: ApplicationCommandOptionType.Number,
      required: true,
    }
  ]
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guildId);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  if (!queue.tracks.toArray()[0])
    return interaction.reply({
      content: "There's no music in the queue!",
      epheremal: true,
    });

  const song = queue.tracks.toArray()[interaction.options.getNumber("current-position") - 1];

  if (!song)
    return interaction.reply({
      content: "Music not found in the queue!",
      epheremal: true,
    });

  const newPosition = interaction.options.getNumber("new-position");

  if (newPosition < 1 || newPosition > queue.tracks.length)
    return interaction.reply({
      content: "Invalid position!",
      epheremal: true,
    });

  queue.moveTrack(song, newPosition - 1);

  const embed = new EmbedBuilder()
    .setAuthor({name: 'Positions switched',iconURL:client.user.displayAvatarURL()})
    .setDescription(`Music **${song.title}** moved to positon **${newPosition}**`)
    .setThumbnail(song.thumbnail)
    .setColor('#8e44ad')
    .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  return interaction.reply({embeds: [embed]});
}

module.exports = { data, run };